<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiBaseController;
use App\Http\Requests\Api\OnlineOrders\IndexRequest;
use App\Models\Order;
use Examyou\RestAPI\ApiResponse;
use Illuminate\Http\Request;

class OnlineOrdersController extends ApiBaseController
{
	protected $model = Order::class;

	protected $indexRequest = IndexRequest::class;

	protected function modifyIndex($query)
	{
		$request = request();
		$warehouse = warehouse();

		$query = $query->where('orders.order_type', "online-orders");

		// Dates Filters
		if ($request->has('dates') && $request->dates != "") {
			$dates = explode(',', $request->dates);
			$startDate = $dates[0];
			$endDate = $dates[1];

			$query = $query->whereRaw('orders.order_date >= ?', [$startDate])
				->whereRaw('orders.order_date <= ?', [$endDate]);
		}

		// Can see only order of warehouses which is assigned to him
		$query = $query->where('orders.warehouse_id', $warehouse->id);

		return $query;
	}

	public function cancelOrder($id)
	{
		$order = Order::where('unique_id', $id)->first();

		if ($order->order_type == "online-orders" && $order->order_status != 'delivered') {
			$order->cancelled = 1;
			$order->cancelled_by = auth('api')->user()->id;
			$order->save();

			return ApiResponse::make('Success', []);
		}
	}

	public function confirmOrder(Request $request, $id)
	{
		$order = Order::where('unique_id', $id)->first();

		if ($order->order_type == "online-orders" && $order->order_status == 'ordered' && $order->cancelled != 1) {
			$order->order_status = "confirmed";
			$order->save();

			return ApiResponse::make('Success', []);
		}
	}

	public function changeOrderStatus(Request $request, $id)
	{
		$order = Order::where('unique_id', $id)->first();

		if (
			$order->order_type == "online-orders" &&
			$order->order_status != 'ordered' &&
			$order->order_status != 'delivered' &&
			$order->cancelled != 1 &&
			($request->order_status == 'confirmed' || $request->order_status == 'processing' || $request->order_status == 'shipping')
		) {
			$order->order_status = $request->order_status;
			$order->save();

			return ApiResponse::make('Success', []);
		}
	}

	public function markAsDelivered(Request $request, $id)
	{
		$order = Order::where('unique_id', $id)->first();

		if (
			$order->order_type == "online-orders" &&
			$order->cancelled != 1 &&
			($order->order_status == 'confirmed' || $order->order_status == 'processing' || $order->order_status == 'shipping')
		) {
			$order->order_status = "delivered";
			$order->save();

			return ApiResponse::make('Success', []);
		}
	}

	public function approvePayment(Request $request, $id)
	{
		$order = Order::withoutGlobalScope(\App\Scopes\CompanyScope::class)
			->where('unique_id', $id)
			->orWhere('id', $id)
			->first();

		if (!$order) {
			throw new \Exception("Order not found");
		}

		$order->payment_status = 'paid';
		$order->paid_amount = $order->total;
		$order->due_amount = 0;
		$order->save();

		// Create Payment record and OrderPayment if none exists
		$existingOrderPayment = \App\Models\OrderPayment::where('order_id', $order->id)->first();
		if (!$existingOrderPayment) {
			$paymentMode = \App\Models\PaymentMode::withoutGlobalScope(\App\Scopes\CompanyScope::class)
				->where('company_id', $order->company_id)
				->where(function ($q) {
					$q->where('name', 'UPI')->orWhere('mode_type', 'upi');
				})
				->first();

			if (!$paymentMode) {
				$paymentMode = \App\Models\PaymentMode::withoutGlobalScope(\App\Scopes\CompanyScope::class)
					->where('company_id', $order->company_id)
					->first();
			}

			$payment = new \App\Models\Payment();
			$payment->warehouse_id = $order->warehouse_id;
			$payment->payment_type = "in";
			$payment->date = \Carbon\Carbon::now();
			$payment->amount = $order->total;
			$payment->unused_amount = 0;
			$payment->paid_amount = $order->total;
			$payment->payment_mode_id = $paymentMode ? $paymentMode->id : null;
			$payment->user_id = $order->user_id;
			$payment->notes = $order->notes ?: 'UPI Payment Approved';
			$payment->company_id = $order->company_id;
			$payment->save();

			$payment->payment_number = \App\Classes\Common::getTransactionNumber('payment-in', $payment->id);
			$payment->save();

			$orderPayment = new \App\Models\OrderPayment();
			$orderPayment->order_id = $order->id;
			$orderPayment->payment_id = $payment->id;
			$orderPayment->amount = $order->total;
			$orderPayment->save();
		}

		return ApiResponse::make('Payment Approved Successfully', [
			'order' => $order
		]);
	}

	public function rejectPayment(Request $request, $id)
	{
		$order = Order::withoutGlobalScope(\App\Scopes\CompanyScope::class)
			->where('unique_id', $id)
			->orWhere('id', $id)
			->first();

		if (!$order) {
			throw new \Exception("Order not found");
		}

		$order->payment_status = 'unpaid';
		$order->paid_amount = 0;
		$order->due_amount = $order->total;
		$order->save();

		// Remove any associated order payments
		$orderPayments = \App\Models\OrderPayment::where('order_id', $order->id)->get();
		foreach ($orderPayments as $op) {
			\App\Models\Payment::where('id', $op->payment_id)->delete();
			$op->delete();
		}

		return ApiResponse::make('Payment Disapproved', [
			'order' => $order
		]);
	}
}
