<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUpiIdToPaymentModesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('payment_modes') && !Schema::hasColumn('payment_modes', 'upi_id')) {
            Schema::table('payment_modes', function (Blueprint $table) {
                $table->string('upi_id')->nullable()->default(null)->after('mode_type');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('payment_modes') && Schema::hasColumn('payment_modes', 'upi_id')) {
            Schema::table('payment_modes', function (Blueprint $table) {
                $table->dropColumn('upi_id');
            });
        }
    }
}
