<?php

namespace App\Http\Controllers;

use App\Models\Adaptation\AdaptationExperienceRecommendation;
use App\Models\Discovery\DiscoveryCareerRoadmap;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdaptationController extends Controller
{
    public function index() {
        $user = Auth::user();
        $discoveryCareer = DiscoveryCareerRoadmap::where('user_id', $user->id)->first();
        $adaptationExperience = AdaptationExperienceRecommendation::where('user_id', $user->id)->get();

        return inertia::render('adaptation', [
            'discoveryCareer' => $discoveryCareer,
            'adaptationExperience' => $adaptationExperience,
        ]);
    }

    public function addExperience(Request $request) {
        $data = $request->validate([
            'experience_type' => 'required',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'expected_outcome' => 'nullable|string',
            'status' => 'required',
        ]);
        
        $user = Auth::user();
        $discoveryCareer = DiscoveryCareerRoadmap::where('user_id', $user->id)->first();

        AdaptationExperienceRecommendation::create([
            ...$data,
            'user_id' => $user->id,
            'active_roadmap_id' => $discoveryCareer->id,
        ]);

        return back()->withSuccess('Experience has been added!');
    }
}
