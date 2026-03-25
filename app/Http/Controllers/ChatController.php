<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;
use App\Services\AI\GeminiService;
use App\Models\Chat\ChatConversation;
use App\Models\Chat\ChatMessage;

class ChatController extends Controller
{
    public function index() {
        return inertia::render(
            'chat'
        );
    }

    public function send(Request $request, GeminiService $gemini) {
        $request->validate([
            'message' => 'required|string'
        ]);

        $user = Auth::user();
        $conversation = ChatConversation::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'test',
            'is_active' => true,
        ]);

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
