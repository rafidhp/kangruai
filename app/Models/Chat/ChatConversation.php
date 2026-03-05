<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class ChatConversation extends Model
{
    use SoftDeletes;

    protected $table = 'chat_conversations';
    protected $fillable = [
        'user_id',
        'phase',
        'title',
        'is_active',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function chatMessage() {
        return $this->hasMany(ChatMessage::class, 'conversation_id');
    }
}
