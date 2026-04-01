<?php

namespace App\Models\Adaptation;

use App\Models\Discovery\DiscoveryCareerRoadmap;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class AdaptationActiveRoadmap extends Model
{
    protected $table = 'adaptation_active_roadmaps';
    protected $fillable = [
        'user_id',
        'career_roadmap_id',
        'roadmap_update_id',
        'is_current',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function careerRoadmap() {
        return $this->belongsTo(DiscoveryCareerRoadmap::class, 'career_roadmap_id');
    }

    public function roadmapUpdate() {
        return $this->belongsTo(AdaptationRoadmapUpdate::class, 'roadmap_update_id');
    }
}
