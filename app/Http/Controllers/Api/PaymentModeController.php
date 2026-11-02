<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiBaseController;
use App\Http\Requests\Api\PaymentMode\IndexRequest;
use App\Http\Requests\Api\PaymentMode\StoreRequest;
use App\Http\Requests\Api\PaymentMode\UpdateRequest;
use App\Http\Requests\Api\PaymentMode\DeleteRequest;
use App\Models\Payment;
use App\Models\PaymentMode;
use Examyou\RestAPI\Exceptions\ApiException;

class PaymentModeController extends ApiBaseController
{
    protected $model = PaymentMode::class;

    protected $indexRequest = IndexRequest::class;
    protected $storeRequest = StoreRequest::class;
    protected $updateRequest = UpdateRequest::class;
    protected $deleteRequest = DeleteRequest::class;

    protected function modifyIndex($query)
    {
        $company = company();
        $companyId = $company ? $company->id : null;
        if (!$companyId) {
            $user = auth('api')->user();
            if ($user && $user->company_id) {
                $companyId = $user->company_id;
            }
        }

        if ($companyId) {
            $upiMode = PaymentMode::withoutGlobalScope(\App\Scopes\CompanyScope::class)
                ->where('company_id', $companyId)
                ->where(function ($q) {
                    $q->where('name', 'UPI')
                      ->orWhere('mode_type', 'upi');
                })
                ->first();

            if (!$upiMode) {
                $newUpi = new PaymentMode();
                $newUpi->name = 'UPI';
                $newUpi->mode_type = 'upi';
                $newUpi->upi_id = '';
                $newUpi->company_id = $companyId;
                $newUpi->save();
            }
        }

        return $query;
    }

    public function destroying($paymentMode)
    {
        // Can not delete payment mode if it assigned to any payment
        $paymentModeCount = Payment::where('payment_mode_id', $paymentMode->id)->count();
        if ($paymentModeCount > 0) {
            throw new ApiException("Payment mode assigned to payment. Delete that first and try again.");
        }

        return $paymentMode;
    }
}
