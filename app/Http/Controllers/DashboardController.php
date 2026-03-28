<?php

namespace App\Http\Controllers;

use App\Models\Discovery\DiscoveryAssesment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $user = Auth::user();
        $discoveryAssessment = DiscoveryAssesment::where('user_id', $user->id)->first();

        return inertia::render('dashboard', [
            'discoveryAssessment' => $discoveryAssessment,
        ]);
    }
}
