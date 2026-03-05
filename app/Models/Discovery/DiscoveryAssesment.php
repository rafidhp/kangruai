<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function user() {
        return $this->belongsTo(User::class);
    }
}
