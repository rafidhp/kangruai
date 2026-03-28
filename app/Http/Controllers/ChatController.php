<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Services\AI\GeminiService;
use App\Models\Chat\ChatConversation;
use App\Models\Chat\ChatMessage;
use App\Models\Discovery\DiscoveryAssesment;

class ChatController extends Controller
{
    public function index() {
        $user = Auth::user();
        $userConversation = ChatConversation::where('user_id', $user->id)
                            ->where('is_active', true)
                            ->first();
        $userChat = [];
        if ($userConversation) {
            $userChat = ChatMessage::where(
                'conversation_id',
                $userConversation->id
            )
            ->orderBy('created_at')
            ->get();
        }

        $userChat = collect($userChat)->map(function ($chat) {
            return [
                'sender' => strtolower($chat->sender) === 'user'
                    ? 'user'
                    : 'ai',
                'text' => $chat->message,
            ];
        });

        return inertia('chat', [
            'userChat' => $userChat->values(),
        ]);
    }

    public function send(Request $request, GeminiService $gemini) {
        $request->validate([
            'message' => 'required|string'
        ]);

        $user = Auth::user();
        $discoveryAssessment = DiscoveryAssesment::where('user_id', $user->id)->first();
        $userName = $user->name ?? "Student";
        $assessmentCompleted = $discoveryAssessment !== null;
        $conversation = ChatConversation::where('user_id', $user->id)
            ->where('is_active', true)
            ->first();

        if ($assessmentCompleted) {
            $assessmentData = json_encode([
                'personality_result' => $discoveryAssessment->personality_result ?? null,
                'strengths_result' => $discoveryAssessment->strengths_result ?? null,
                'industries_matches' => $discoveryAssessment->industries_matches ?? null,
                'motivation_words' => $discoveryAssessment->motivation_words ?? null,
                'skills_score' => $discoveryAssessment->skills_score ?? null,
            ]);
        } else {
            $assessmentData = "NO ASSESSMENT DATA";
        }

        $systemPrompt = "
            You are an AI Career Psychologist and personal mentor.

            Your role:
            - Guide users in career exploration and self-development.
            - Speak like a supportive mentor, warm and encouraging.
            - Be insightful but concise.
            - Help users reflect, grow, and take action.

            User Information:
            Name: {$userName}

            Discovery Assessment Data:
            {$assessmentData}

            Rules:
            - Address the user by their name naturally when appropriate.
            - Give thoughtful and motivational responses.
            - Keep answers clear, supportive, and not overly long.
            - Avoid excessive line breaks or double empty lines.
            - Use short paragraphs with smooth flow.

            Tone:
            - Mentor-like, calm, intelligent.
            - Avoid robotic or generic motivational phrases.
            - Sound human and reflective.
        ";

        if (!$assessmentCompleted) {
            $systemPrompt .= "
                Important Condition:
                The user has NOT completed their discovery assessment yet.

                You MUST:
                - Politely encourage the user to complete their assessment first.
                - Explain that personalized guidance will be more accurate after completion.
                - Provide a clickable link using HTML anchor tag format ONLY:
                    <a href=\"/discovery\">Complete your discovery assessment</a>
                - The link must appear naturally inside the sentence.
                - Do NOT output raw URLs unless HTML is not supported.
                - Do NOT mention technical explanations.
                - Do NOT sound pushy or repetitive.
                - Still answer their question briefly, but prioritize guiding them to complete the assessment.

                Formatting Rules:
                - Avoid double line breaks.
                - Maximum one line break between paragraphs.
                - Keep spacing clean and readable.

                Fallback Rule:
                If HTML links are not supported, use this full URL instead:
                https://kangruai.up.railway.app/discovery
            ";
        }

        if (!$conversation) {
            $conversation = ChatConversation::create([
                'user_id' => $user->id,
                'title' => 'New Chat',
                'is_active' => true,
            ]);
        }

        ChatMessage::create([
            'conversation_id' => $conversation->id,
            'sender' => 'USER',
            'message' => $request->message
        ]);

        $history = $conversation->chatMessage()
            ->orderBy('created_at')
            ->get()
            ->map(function ($msg) {
                return [
                    "role" => $msg->sender === 'USER' ? 'user' : 'model',
                    "parts" => [
                        ["text" => $msg->message]
                    ]
                ];
            })
            ->values()
            ->toArray();

        array_unshift($history, [
            "role" => "user",
            "parts" => [
                ["text" => $systemPrompt]
            ]
        ]);

        // send message to api
        $aiReply = $gemini->generate($history);

        if (!$aiReply) {
            $aiReply = "AI failed to respond.";
        }

        ChatMessage::create([
            'conversation_id' => $conversation->id,
            'sender' => 'AI',
            'message' => $aiReply
        ]);

        return response()->json([
            'aiReply' => $aiReply,
        ]);
    }
}
