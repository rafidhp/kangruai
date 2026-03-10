<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdaptationController extends Controller
{
    public function index() {
        return inertia::render(
            'adaptation'
        );
    }
}
