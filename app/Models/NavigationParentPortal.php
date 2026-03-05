<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavigationParentPortal extends Model
{
    protected $table = 'navigation_parent_portals';
    protected $fillable = [
        'user_id',
        'parent_user_id',
        'discussion_notes',
        'status',
    ];

    public function user() {
        return $this->belongTo(User::class, 'user_id');
    }

    public function parentUser() {
        return $this->belongTo(User::class, 'parent_user_id');
    }
}
