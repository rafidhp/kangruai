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
            $table->timestamps();
        });

        Schema::create('discovery_career_roadmaps', function (Blueprint $table) {
            $table->id();
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
