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
        Schema::table('courses', function (Blueprint $table) {
            $table->decimal('price', 8, 2)->nullable(); // Price with 2 decimal places
            $table->integer('duration')->nullable(); // Duration in minutes or hours
            $table->string('instructor')->nullable(); // Instructor name
            $table->unsignedTinyInteger('rating')->default(0); // Rating from 1 to 5
            $table->string('image_url')->nullable(); // Store image URL from Firebase
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['price', 'duration', 'instructor', 'rating', 'image_url']);
        });
    }
};
