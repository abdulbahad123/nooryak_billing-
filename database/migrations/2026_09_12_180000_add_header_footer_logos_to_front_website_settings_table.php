<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('front_website_settings', function (Blueprint $table) {
            if (!Schema::hasColumn('front_website_settings', 'header_logo')) {
                $table->string('header_logo')->nullable()->after('links_widget');
            }
            if (!Schema::hasColumn('front_website_settings', 'footer_logo')) {
                $table->string('footer_logo')->nullable()->after('header_logo');
            }
            if (!Schema::hasColumn('front_website_settings', 'top_banners_text')) {
                $table->text('top_banners_text')->nullable()->after('top_banners');
            }
        });
    }

    public function down(): void
    {
        Schema::table('front_website_settings', function (Blueprint $table) {
            if (Schema::hasColumn('front_website_settings', 'header_logo')) {
                $table->dropColumn('header_logo');
            }
            if (Schema::hasColumn('front_website_settings', 'footer_logo')) {
                $table->dropColumn('footer_logo');
            }
            if (Schema::hasColumn('front_website_settings', 'top_banners_text')) {
                $table->dropColumn('top_banners_text');
            }
        });
    }
};
