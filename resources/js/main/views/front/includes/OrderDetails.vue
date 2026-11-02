<template>
    <div v-if="order.cancelled">
        <a-alert
            :message="$t('online_orders.order_cancelled')"
            :description="$t('online_orders.order_cancelled_message')"
            type="error"
            show-icon
        >
            <template #icon><stop-outlined /></template>
        </a-alert>
    </div>
    <div v-else>
        <order-status :orderStatus="order.order_status" />
    </div>

    <div class="item-desc mt-40">
        <span>{{ $t("online_orders.order_summary") }}</span>
    </div>
    <div class="mt-20 pl-15">
        <a-descriptions :title="null" :column="2" :labelStyle="{ fontWeight: 'bold' }">
            <a-descriptions-item :label="$t('stock.order_id')">
                {{ order.invoice_number }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('common.total')">
                {{ formatAmountCurrency(order.total) }}
            </a-descriptions-item>

            <a-descriptions-item :label="$t('user.name')">
                {{ order.shipping_address.name }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('user.email')">
                {{ order.shipping_address.email }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('user.phone')">
                {{ order.shipping_address.phone }}
            </a-descriptions-item>

            <a-descriptions-item :label="$t('payments.payment_status')">
                <PaymentStatus :paymentStatus="order.payment_status" />
            </a-descriptions-item>
            <a-descriptions-item :label="$t('stock.status')">
                <OrderStatusTag :data="order" />
            </a-descriptions-item>

            <a-descriptions-item :label="$t('stock.shipping_address')">
                {{ order.shipping_address.shipping_address }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('stock.billing_address')">
                {{ order.shipping_address.address }}
            </a-descriptions-item>

            <a-descriptions-item label="Payment Notes" v-if="order.notes">
                {{ order.notes }}
            </a-descriptions-item>
        </a-descriptions>
    </div>

    <!-- Payment Proof Banner (Visible on Dashboard and Admin) -->
    <div v-if="order.document_url || order.document" class="payment-proof-section mt-20 mb-20">
        <a-card :bordered="true" size="small" style="border-radius: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding: 4px;">
                <div style="display: flex; align-items: center; gap: 14px;">
                    <a :href="order.document_url" target="_blank" v-if="order.document_url">
                        <img
                            :src="order.document_url"
                            alt="Payment Proof Receipt"
                            style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.06);"
                        />
                    </a>
                    <div>
                        <div style="font-weight: 700; font-size: 14px; color: #1e293b; display: flex; align-items: center; gap: 6px;">
                            <check-circle-outlined style="color: #16a34a; font-size: 16px;" />
                            UPI Payment Proof
                        </div>
                        <div style="color: #64748b; font-size: 12px; margin-top: 2px;" v-if="order.notes">
                            {{ order.notes }}
                        </div>
                        <div style="color: #94a3b8; font-size: 11px; margin-top: 1px;" v-if="order.document">
                            File: {{ order.document }}
                        </div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <a-button
                        type="primary"
                        ghost
                        size="small"
                        :href="order.document_url"
                        target="_blank"
                        v-if="order.document_url"
                    >
                        <eye-outlined /> View Full Proof
                    </a-button>

                    <template v-if="detailView === 'admin'">
                        <a-button
                            v-if="order.payment_status !== 'paid'"
                            type="primary"
                            size="small"
                            style="background: #16a34a; border-color: #16a34a;"
                            @click="approvePayment(order)"
                            :loading="approving"
                        >
                            <check-outlined /> Approve Payment
                        </a-button>
                        <a-button
                            v-else
                            danger
                            size="small"
                            @click="rejectPayment(order)"
                            :loading="rejecting"
                        >
                            <close-outlined /> Disapprove
                        </a-button>
                    </template>
                </div>
            </div>
        </a-card>
    </div>

    <a-row class="mt-20">
        <a-col :span="24">
            <a-table
                :columns="columns"
                :row-key="(record) => record.id"
                :data-source="order.items"
                :pagination="false"
            >
                <template #bodyCell="{ index, column, record }">
                    <template v-if="column.dataIndex === 'id'">
                        {{ index + 1 }}
                    </template>
                    <template v-if="column.dataIndex === 'product_id'">
                        <a-list-item>
                            <a-list-item-meta>
                                <template #avatar>
                                    <a-avatar
                                        :src="record.product.image_url"
                                        size="large"
                                        shape="square"
                                    />
                                </template>
                                <template #title>
                                    {{ record.product.name }}
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                    <template v-if="column.dataIndex === 'unit_price'">
                        {{ formatAmountCurrency(record.unit_price) }}
                    </template>
                    <template v-if="column.dataIndex === 'subtotal'">
                        {{ formatAmountCurrency(record.subtotal) }}
                    </template>
                </template>
            </a-table>
        </a-col>
    </a-row>

    <a-row class="mt-30">
        <a-col :span="18"></a-col>
        <a-col :span="6">
            <div class="pd-10">
                <a-row>
                    <a-col :span="12">{{ $t("product.subtotal") }}</a-col>
                    <a-col :span="12" class="text-right">
                        {{ formatAmountCurrency(order.subtotal) }}
                    </a-col>
                </a-row>
                <a-row class="mt-10">
                    <a-col :span="12">{{ $t("product.discount") }}</a-col>
                    <a-col :span="12" class="text-right">
                        {{ formatAmountCurrency(order.discount) }}
                    </a-col>
                </a-row>
                <a-row class="mt-10">
                    <a-col :span="12">{{ $t("stock.order_tax") }}</a-col>
                    <a-col :span="12" class="text-right">
                        {{ formatAmountCurrency(order.tax_amount) }}
                    </a-col>
                </a-row>
                <a-row class="mt-10">
                    <a-col :span="12">{{ $t("stock.shipping") }}</a-col>
                    <a-col :span="12" class="text-right">
                        {{ formatAmountCurrency(order.shipping) }}
                    </a-col>
                </a-row>
            </div>
            <div class="item-total pd-10">
                <a-row class="mt-10">
                    <a-col :span="12">{{ $t("stock.grand_total") }}</a-col>
                    <a-col :span="12" class="text-right">
                        {{ formatAmountCurrency(order.total) }}
                    </a-col>
                </a-row>
            </div>
        </a-col>
    </a-row>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { StopOutlined, CheckCircleOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import cart from "../../../../common/composable/cart";
import { useStore } from "vuex";
import common from "../../../../common/composable/common";
import OrderStatus from "./OrderStatus.vue";
import PaymentStatus from "../../../../common/components/order/PaymentStatus.vue";
import { buildAddress } from "../../../../common/scripts/functions";
import OrderStatusTag from "../../../../common/components/order/OrderStatus.vue";

export default defineComponent({
    props: {
        order: {
            default: {},
        },
        detailView: {
            default: "front",
        },
    },
    components: {
        OrderStatus,
        PaymentStatus,
        StopOutlined,
        CheckCircleOutlined,
        EyeOutlined,
        CheckOutlined,
        CloseOutlined,
        OrderStatusTag,
    },
    setup(props, { emit }) {
        const cartObj = cart();
        const commonObj = common();
        const store = useStore();
        const warehouseCurrency = computed(() => store.state.front.warehouseCurrency);
        const approving = ref(false);
        const rejecting = ref(false);

        const columns = [
            {
                title: "#",
                dataIndex: "id",
            },
            {
                title: "Product",
                dataIndex: "product_id",
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
            },
            {
                title: "Price",
                dataIndex: "unit_price",
            },
            {
                title: "Total",
                dataIndex: "subtotal",
            },
        ];

        const formatAmountCurrency = (amount) => {
            if (props.detailView == "admin") {
                return commonObj.formatAmountCurrency(amount);
            } else {
                return cartObj.formatAmountCurrency(amount);
            }
        };

        const approvePayment = (order) => {
            approving.value = true;
            axiosAdmin
                .post(`online-orders/approve-payment/${order.unique_id}`)
                .then(() => {
                    approving.value = false;
                    order.payment_status = "paid";
                    order.paid_amount = order.total;
                    order.due_amount = 0;
                    notification.success({
                        message: "Success",
                        description: `Payment for order #${order.invoice_number} approved and marked as Paid!`,
                    });
                })
                .catch((err) => {
                    approving.value = false;
                    notification.error({
                        message: "Error",
                        description: err?.response?.data?.message || "Failed to approve payment.",
                    });
                });
        };

        const rejectPayment = (order) => {
            rejecting.value = true;
            axiosAdmin
                .post(`online-orders/reject-payment/${order.unique_id}`)
                .then(() => {
                    rejecting.value = false;
                    order.payment_status = "unpaid";
                    order.paid_amount = 0;
                    order.due_amount = order.total;
                    notification.warning({
                        message: "Payment Disapproved",
                        description: `Payment for order #${order.invoice_number} has been disapproved.`,
                    });
                })
                .catch((err) => {
                    rejecting.value = false;
                    notification.error({
                        message: "Error",
                        description: err?.response?.data?.message || "Failed to disapprove payment.",
                    });
                });
        };

        return {
            columns,
            formatAmountCurrency,
            buildAddress,
            warehouseCurrency,
            approving,
            rejecting,
            approvePayment,
            rejectPayment,
        };
    },
});
</script>

<style lang="less">
.item-desc {
    background-color: #f5f5f5;
    padding: 15px;

    span {
        font-weight: 600;
        font-size: 18px;
    }
}

.item-total {
    background-color: #f5f5f5;
    font-weight: bold;
}
</style>
