<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Company;
use App\Models\PaymentMode;
use App\Scopes\CompanyScope;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        try {
            $companies = Company::withoutGlobalScope(CompanyScope::class)->get();
            foreach ($companies as $company) {
                $exists = PaymentMode::withoutGlobalScope(CompanyScope::class)
                    ->where('company_id', $company->id)
                    ->where(function ($q) {
                        $q->where('name', 'UPI')->orWhere('mode_type', 'upi');
                    })
                    ->exists();

                if (!$exists) {
                    $paymentMode = new PaymentMode();
                    $paymentMode->name = 'UPI';
                    $paymentMode->mode_type = 'upi';
                    $paymentMode->upi_id = '';
                    $paymentMode->company_id = $company->id;
                    $paymentMode->save();
                }
            }
        } catch (\Exception $e) {
            \Log::warning('Error seeding UPI payment mode: ' . $e->getMessage());
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};
