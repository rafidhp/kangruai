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

        return inertia::render('discovery', [
            'discoveryAssessment' => $discoveryAssessment,
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

        $assessment->update([
            'personality_result' => $result['personality_result'] ?? null,
            'strengths_result' => $result['strengths_result'] ?? null,
            'values_result' => $result['values_result'] ?? null,
        ]);

        DiscoveryCareerRoadmap::updateOrCreate(
            ['user_id' => $user->id],
            [
                'recommended_careers' => $result['recommended_careers'] ?? [],
                'recommended_majors' => $result['recommended_majors'] ?? [],
                'roadmap_summary' => $result['roadmap_summary'] ?? '',
            ]
        );

        return back()->with('success', true);
    }

    private function buildDiscoveryPrompt(array $dna) {
        return [
            [
                "role" => "user",
                "parts" => [[
                    "text" => "
                        You are an AI Career Psychologist.

                        Analyze the user's psychological DNA scores and generate a structured career discovery result.

                        DNA SCORES:
                        " . json_encode($dna, JSON_PRETTY_PRINT) . "

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

                        ADDITIONAL NOTES:
                        - Personality result is personality analysis results from AI.
                        - Strengths result is user core strengths analysis.
                        - Values result is principles that are considered important by users.
                        - Roadmap Summary is reccommended user's learning roadmap summary.
                        - Identify user's personality based on DNA SCORES.
                        - If the recommendation has points, just give 3 recommendations.
                        - Dont give a description if the recommendation point-shaped

                        OUTPUT FORMAT:

                        {
                            \"personality_result\": \"string\",
                            \"strengths_result\": \"string\",
                            \"values_result\": \"string\",
                            \"recommended_careers\": [\"string\"],
                            \"recommended_majors\": [\"string\"],
                            \"roadmap_summary\": \"string\"
                        }
                    "
                ]]
            ]
        ];
    }
}
