<?php

namespace App\Http\Controllers;

use App\Services\DiscoveryAssessmentService;
use Illuminate\Support\Facades\Auth;
use App\Services\AI\GeminiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Discovery\DiscoveryAssesment;
use App\Models\Discovery\DiscoveryCareerRoadmap;

class DiscoveryController extends Controller
{
    public function index() {
        $user = Auth::user();
        $discoveryAssessment = DiscoveryAssesment::where('user_id', $user->id)->first();
        $discoveryCareer = DiscoveryCareerRoadmap::where('user_id', $user->id)->first();

        return inertia::render('discovery', [
            'discoveryAssessment' => $discoveryAssessment,
            'industries' => $discoveryAssessment?->industries_matches ?? [],
            'discoveryCareer' => $discoveryCareer,
        ]);
    }

    public function discoveryAssesment(Request $request, GeminiService $gemini, DiscoveryAssessmentService $assessmentService) {
        $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'integer|min:0|max:3',
        ]);

        $user = Auth::user();
        $dna = $assessmentService->calculateDNA($request->answers);

        if (count($request->answers) !== count(config('discovery_assessment.questions'))) {
            abort(422, 'Invalid assessment submission.');
        }

        $assessment = DiscoveryAssesment::updateOrCreate(
            ['user_id' => $user->id],
            ['skills_score' => $dna],
        );

        $messages = $this->buildDiscoveryPrompt($dna);
        $aiResponse = $gemini->generate($messages);

        if (!$aiResponse) {
            return back()->withErrors('AI analysis failed.');
        }

        $result = json_decode($aiResponse, true);
        $industries = $this->formatIndustries(
            $result['industries_matches'] ?? []
        );

        $assessment->update([
            'personality_result' => $result['personality_result'] ?? null,
            'strengths_result' => $result['strengths_result'] ?? null,
            'motivation_words' => $result['motivation_words'] ?? null,
            'industries_matches' => $industries,
        ]);

        DiscoveryCareerRoadmap::updateOrCreate(
            ['user_id' => $user->id],
            [
                'recommended_careers' => $result['recommended_careers'] ?? [],
                'recommended_majors' => $result['recommended_majors'] ?? [],
                'roadmap_summary' => $result['roadmap_summary'] ?? '',
            ]
        );

        return back()->with('success', 'Discovery Assessment completed! 🧬');
    }

    private function buildDiscoveryPrompt(array $dna) {
        $user = Auth::user();

        return [
            [
                "role" => "user",
                "parts" => [[
                    "text" => "
                        You are an AI Career Psychologist.

                        Analyze the user's psychological DNA scores and generate a structured career discovery result.

                        DNA SCORES:
                        " . json_encode($dna, JSON_PRETTY_PRINT) . "

                        USER NAME: 
                        ". $user->name ."

                        INSTRUCTIONS:
                        - Interpret personality scientifically.
                        - Identify dominant strengths.
                        - Infer personal values.
                        - Recommend suitable careers.
                        - Recommend suitable university majors.
                        - Create a short career growth roadmap summary.

                        IMPORTANT RULES:
                        - Return ONLY valid JSON.
                        - Do NOT add explanation text.
                        - Do NOT use markdown.
                        - Output must match EXACT structure below.

                        SCORING RULES FOR INDUSTRIES MATCHES:
                        - Give each industry a score between 0 and 100.
                        - Score represents user's compatibility and growth potential.
                        - Use these interpretations:

                        0-30   = Low growth potential
                        31-70  = Medium growth potential
                        71-90  = High growth potential
                        91-100 = Very High growth potential

                        - Distribute scores realistically based on DNA SCORES.
                        - Do NOT give similar scores to all industries.
                        - Score EACH industry from 0-100.
                        - Scores must reflect psychological compatibility.
                        - Use realistic distribution (not all high).

                        MOTIVATION WORDS NOTES:
                        Motivation Words are short inspirational messages designed to encourage users to take action toward their goals.
                        Generate motivational words based on the user's identified goals derived from their DNA Scores. Be concise (2 sentences).
                        The message should feel personal, empowering, and forward-looking — inspiring confidence and progress without being overly long or overly brief.
                        Use encouraging language, focus on growth and potential, and end with a subtle sense of action or purpose.
                        Keep the tone supportive, optimistic, and relatable for students or young learners. Use user name to give the impression of being closer to the user.

                        ADDITIONAL NOTES:
                        - Personality result is personality analysis results from AI.
                        - Strengths result is user core strengths analysis.
                        - Roadmap Summary is reccommended user's learning roadmap summary.
                        - Identify all user's personality based on DNA SCORES.
                        - If the recommendation has points, just give 3 recommendations and dont give or (/) and additional description in the point.
                        - Dont give a description if the recommendation point-shaped

                        OUTPUT FORMAT:

                        {
                            \"personality_result\": \"string\",
                            \"strengths_result\": \"string\",
                            \"industries_matches\": {
                                \"Creative Technology\": number,
                                \"Biotech & Health\": number,
                                \"Digital Marketing\": number,
                                \"Social Enterprise\": number,
                                \"Engineering\": number,
                                \"Education Tech\": number
                            },
                            \"motivation_words\": \"string\",
                            \"recommended_careers\": [\"string\"],
                            \"recommended_majors\": [\"string\"],
                            \"roadmap_summary\": \"string\"
                        }
                    "
                ]]
            ]
        ];
    }

    private function calculateGrowth(int $score): string {
        return match (true) {
            $score <= 30 => 'Low',
            $score <= 70 => 'Medium',
            $score <= 90 => 'High',
            default => 'Very High',
        };
    }

    private function formatIndustries(array $industries): array {
        $result = [];

        foreach ($industries as $name => $score) {
            $score = (int) $score;
            $result[] = [
                'name' => $name,
                'match' => $score,
                'growth' => $this->calculateGrowth($score),
            ];
        }
        return $result;
    }
}
