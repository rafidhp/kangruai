<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProfile extends Model
{
    use SoftDeletes;

    protected $table = 'user_profiles';
    protected $fillable = [
        'user_id',
        'education_level',
        'major',
        'job_title',
    ];

    public function user() {
        return $this->hasOne(User::class);
    }
}
