<?php

namespace App\Models\Discovery;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class DiscoveryAssesment extends Model
{
    protected $table = 'discovery_assesments';
    protected $fillable = [
        'user_id',
        'personality_result',
        'strengths_result',
        'values_result',
        'skills_score',
    ];
    protected $casts = [
        'skills_score' => 'array',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
