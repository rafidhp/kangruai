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
        Schema::create('discovery_assesments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->text('personality_result')->nullable();
            $table->text('strengths_result')->nullable();
            $table->text('values_result')->nullable();
            $table->json('skills_score');
            $table->timestamps();
        });

        Schema::create('discovery_career_roadmaps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->json('recommended_careers');
            $table->json('recommended_majors')->nullable();
            $table->text('roadmap_summary');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discovery_assesments');
        Schema::dropIfExists('discovery_career_roadmaps');
    }
};
