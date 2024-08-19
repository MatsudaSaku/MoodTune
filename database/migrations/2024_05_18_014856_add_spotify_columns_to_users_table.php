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
        Schema::table('users', function (Blueprint $table) {
            $table->string('spotify_id')->unique()->nullable()->after('password');
            $table->string('spotify_access_token')->nullable()->after('spotify_id');
            $table->string('spotify_refresh_token')->nullable()->after('spotify_access_token');
            $table->timestamp('spotify_token_expires_at')->nullable()->after('spotify_refresh_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('spotify_id');
            $table->dropColumn('spotify_access_token');
            $table->dropColumn('spotify_refresh_token');
            $table->dropColumn('spotify_token_expires_at');
        });
    }
};
