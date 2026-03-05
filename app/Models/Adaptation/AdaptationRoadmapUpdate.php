<?php

namespace App\Models\Adaptation;

use App\Models\DiscoveryCareerRoadmap;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class AdaptationRoadmapUpdate extends Model
{
    protected $table = 'adaptation_roadmap_updates';
    protected $fillable = [
        'user_id',
        'previous_roadmap_id',
        'updated_recommendations',
        'updated_reason',
        'updated_roadmap_summary',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function previousRoadmap() {
        return $this->belongsTo(DiscoveryCareerRoadmap::class, 'previous_roadmap_id');
    }

    public function adaptationActiveRoadmap() {
        return $this->hasMany(AdaptationActiveRoadmap::class, 'roadmap_update_id');
    }
}
