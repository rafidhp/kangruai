<?php

namespace App\Models\Adaptation;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class AdaptationExperienceRecommendation extends Model
{
    protected $table = 'adaptation_experience_recommendations';
    protected $fillable = [
        'user_id',
        'active_roadmap_id',
        'experience_type',
        'title',
        'description',
        'expected_outcome',
        'status',
    ];

    public function user() {
        return $this->belongTo(User::class, 'user_id');
    }

    public function activeRoadmap() {
        return $this->belongsTo(AdaptationActiveRoadmap::class, 'active_roadmap_id');
    }
}
