<?php

namespace App\Models;

use App\Models\Adaptation\AdaptationActiveRoadmap;
use App\Models\Adaptation\AdaptationRoadmapUpdate;
use Illuminate\Database\Eloquent\Model;

class DiscoveryCareerRoadmap extends Model
{
    protected $table = 'discovery_career_roadmaps';
    protected $fillable = [
        'user_id',
        'recommended_careers',
        'recommended_majors',
        'roadmap_summary',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function adaptationRoadmapUpdate() {
        return $this->hasMany(AdaptationRoadmapUpdate::class, 'previous_roadmap_id');
    }

    public function adaptationActiveRoadmap() {
        return $this->hasMany(AdaptationActiveRoadmap::class, 'career_roadmap_id');
    }
}
