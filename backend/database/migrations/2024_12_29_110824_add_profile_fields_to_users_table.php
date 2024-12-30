<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProfileFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('school')->nullable(); // Add the school field
            $table->string('address')->nullable(); // Add the address field
            $table->integer('age')->nullable(); // Add the age field
            $table->enum('gender', ['male', 'female'])->nullable(); // Add the gender field
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['school', 'address', 'age', 'gender']);
        });
    }
}
