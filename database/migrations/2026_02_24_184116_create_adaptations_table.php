<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adaptation_roadmap_updates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        // pivot table
        Schema::create('adaptation_active_roadmaps', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('adaptation_experience_recommendations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adaptation_roadmap_updates');
        Schema::dropIfExists('adaptation_active_roadmaps');
        Schema::dropIfExists('adaptation_experience_recommendations');
    }
};
