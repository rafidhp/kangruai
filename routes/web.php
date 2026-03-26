<?php

use App\Http\Controllers\AdaptationController;
use App\Http\Controllers\BridgeController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiscoveryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function() {
    return redirect()->route('login');
})->name('home');

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // dashboard route
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // discovery routes
    Route::controller(DiscoveryController::class)->group(function () {
        Route::get('/discovery', 'index')->name('discovery');
        Route::post('/discovery/assesment', 'discoveryAssesment')->name('discovery.assesment');
    });
    
    // real-talk routes
    Route::controller(ChatController::class)->group(function () {
        Route::get('/real-talk', 'index')->name('chat');
        Route::post('/real-talk/send', 'send')->name('chat.send');
    });

    // adaptation routes
    Route::controller(AdaptationController::class)->group(function () {
        Route::get('/adaptation', 'index')->name('adaptation');
    });

    // bridge routes
    Route::controller(BridgeController::class)->group(function () {
        Route::get('/bridge', 'index')->name('bridge');
    });
});

require __DIR__.'/settings.php';
