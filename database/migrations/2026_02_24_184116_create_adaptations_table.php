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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('previous_roadmap_id')->constrained('discovery_career_roadmaps');
            $table->json('updated_recommendations')->nullable();
            $table->text('updated_reason')->nullable();
            $table->timestamps();
        });

        // pivot table
        Schema::create('adaptation_active_roadmaps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('career_roadmap_id')->constrained('discovery_career_roadmaps')->onDelete('cascade');
            $table->foreignId('roadmap_update_id')->constrained('adaptation_roadmap_updates')->onDelete('cascade');
            $table->boolean('is_current')->default(1);
            $table->timestamps();
        });

        Schema::create('adaptation_experience_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('active_roadmap_id')->constrained('adaptation_active_roadmaps')->onDelete('cascade');
            $table->enum('experience_type', [
                'INTERNSHIP',
                'PROJECT',
                'BUSINESS',
                'COURSE',
                'VOLUNTEER',
                'OTHER'
            ]);
            $table->string('title');
            $table->text('description');
            $table->text('expected_outcome')->nullable();
            $table->enum('status', [
                'RECOMMENDED',
                'IN PROGRESS',
                'COMPLETED',
                'SKIPPED'
            ])->default('RECOMMENDED');
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
