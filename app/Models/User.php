<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Fortify\TwoFactorAuthenticatable;

use App\Models\Discovery\DiscoveryAssesment;
use App\Models\Discovery\DiscoveryCareerRoadmap;
use App\Models\Adaptation\AdaptationRoadmapUpdate;
use App\Models\Adaptation\AdaptationActiveRoadmap;
use App\Models\Adaptation\AdaptationExperienceRecommendation;
use App\Models\Chat\ChatConversation;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function userProfile() {
        return $this->hasOne(userProfile::class);
    }

    public function discoveryAssesment() {
        return $this->hasOne(DiscoveryAssesment::class);
    }

    public function discoveryCareerRoadmap() {
        return $this->hasOne(DiscoveryCareerRoadmap::class);
    }

    public function adaptationRoadmapUpdate() {
        return $this->hasMany(AdaptationRoadmapUpdate::class, 'user_id');
    }

    public function adaptationActiveRoadmap() {
        return $this->hasMany(AdaptationActiveRoadmap::class);
    }

    public function adaptationExperienceRecommendation() {
        return $this->hasOne(AdaptationExperienceRecommendation::class);
    }

    public function parentPortal() {
        return $this->hasOne(NavigationParentPortal::class, 'user_id');
    }

    public function childrenPortal() {
        return $this->hasMany(NavigationParentPortal::class, 'parent_user_id');
    }

    // chats
    public function chatConversation() {
        return $this->hasMany(ChatConversation::class, 'user_id');
    }
}
