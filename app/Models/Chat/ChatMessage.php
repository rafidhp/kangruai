<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    protected $table = 'chat_messages';
    protected $fillable = [
        'conversation_id',
        'sender',
        'message',
        'metadata',
    ];

    public function conversation() {
        return $this->belongsTo(ChatConversation::class, 'conversation_id');
    }
}
