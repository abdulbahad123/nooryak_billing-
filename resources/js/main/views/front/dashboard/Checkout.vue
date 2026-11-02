<template>
    <div class="mt-30 mb-30">
        <a-row type="flex" justify="center">
            <a-col :span="20">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link
                            :to="{
                                name: 'front.homepage',
                                params: { warehouse: frontWarehouse.slug },
                            }"
                        >
                            {{ $t("front.home") }}
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link
                            :to="{
                                name: 'front.dashboard',
                                params: { warehouse: frontWarehouse.slug },
                            }"
                        >
                            {{ $t("front.dashboard") }}
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link
                            :to="{
                                name: 'front.orders',
                                params: { warehouse: frontWarehouse.slug },
                            }"
                        >
                            {{ $t("front.my_orders") }}
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>{{ $t("front.checkout_page") }}</a-breadcrumb-item>
                </a-breadcrumb>

                <a-row :gutter="[30, 30]" class="mt-30">
                    <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                        <a-card
                            :title="null"
                            :bordered="false"
                            :style="{ borderRadius: '10px' }"
                            class="dashboard-container"
                        >
                            <a-row>
                                <a-col :span="24">
                                    <a-alert
                                        v-if="selectedAddress == null"
                                        :message="$t('front.select_shipping_address')"
                                        type="error"
                                        class="mb-10"
                                        show-icon
                                    />

                                    <a-typography-title :level="3">
                                        1. {{ $t("front.address_details") }}
                                    </a-typography-title>
                                    <UserAddress @onAddressSelection="addressSelected" />
                                    <a-divider />

                                    <a-typography-title :level="3">
                                        2. {{ $t("front.payment_details") }}
                                    </a-typography-title>
                                    <a-row :gutter="[20, 20]" class="mt-20">
                                        <!-- Cash on Delivery Option -->
                                        <a-col :xs="24" :sm="24" :md="12" :lg="12">
                                            <div
                                                class="payment-method-card"
                                                :class="{ active: paymentMethod === 'cod' }"
                                                @click="paymentMethod = 'cod'"
                                            >
                                                <div class="method-header">
                                                    <div class="icon-text">
                                                        <wallet-outlined class="method-icon mr-10" />
                                                        <div>
                                                            <div class="method-title">{{ $t("front.cash_on_delivery") }}</div>
                                                            <div class="method-desc">Pay with cash upon delivery</div>
                                                        </div>
                                                    </div>
                                                    <a-radio :checked="paymentMethod === 'cod'" />
                                                </div>
                                            </div>
                                        </a-col>

                                        <!-- UPI Payment Option -->
                                        <a-col :xs="24" :sm="24" :md="12" :lg="12">
                                            <div
                                                class="payment-method-card"
                                                :class="{ active: paymentMethod === 'upi' }"
                                                @click="paymentMethod = 'upi'"
                                            >
                                                <div class="method-header">
                                                    <div class="icon-text">
                                                        <qrcode-outlined class="method-icon upi-icon mr-10" />
                                                        <div>
                                                            <div class="method-title">
                                                                UPI Payment
                                                                <span class="upi-badge">Instant</span>
                                                            </div>
                                                            <div class="method-desc">Scan QR or pay via any UPI app</div>
                                                        </div>
                                                    </div>
                                                    <a-radio :checked="paymentMethod === 'upi'" />
                                                </div>
                                            </div>
                                        </a-col>
                                    </a-row>

                                    <!-- Dynamic UPI Payment Details Panel -->
                                    <div v-if="paymentMethod === 'upi'" class="upi-payment-panel mt-25">
                                        <div class="upi-panel-header">
                                            <div class="panel-title">
                                                <qrcode-outlined /> Dynamic UPI Payment
                                            </div>
                                            <div class="panel-subtitle">
                                                Scan the QR code or copy the UPI ID below to pay via GPay, PhonePe, Paytm, or any UPI app.
                                            </div>
                                        </div>

                                        <a-row :gutter="[24, 24]" class="mt-20" align="middle">
                                            <!-- Dynamic QR Code Column -->
                                            <a-col :xs="24" :sm="24" :md="10" class="text-center">
                                                <div class="qr-code-wrapper">
                                                    <img
                                                        :src="qrCodeUrl"
                                                        alt="UPI QR Code"
                                                        class="upi-qr-image"
                                                    />
                                                    <div class="qr-amount-pill mt-10">
                                                        Amount: <strong>{{ formatAmountCurrency(total) }}</strong>
                                                    </div>
                                                    <div class="upi-apps-logos mt-10">
                                                        <span class="app-tag">GPay</span>
                                                        <span class="app-tag">PhonePe</span>
                                                        <span class="app-tag">Paytm</span>
                                                        <span class="app-tag">BHIM</span>
                                                    </div>
                                                </div>
                                            </a-col>

                                            <!-- UPI ID & Details Column -->
                                            <a-col :xs="24" :sm="24" :md="14">
                                                <div class="upi-details-form">
                                                    <!-- Dynamic UPI ID with Copy -->
                                                    <div class="upi-id-box mb-20">
                                                        <label class="detail-label">Store UPI ID</label>
                                                        <div class="upi-copy-group">
                                                            <span class="upi-id-text">{{ activeUpiId }}</span>
                                                            <a-button
                                                                type="primary"
                                                                size="small"
                                                                @click.stop="copyUpiId"
                                                                class="copy-btn"
                                                            >
                                                                <copy-outlined /> {{ copiedUpi ? "Copied!" : "Copy UPI ID" }}
                                                            </a-button>
                                                        </div>
                                                    </div>

                                                    <!-- UTR / Reference Input -->
                                                    <div class="utr-input-box mb-20">
                                                        <label class="detail-label">Transaction Reference / UTR No. (Optional)</label>
                                                        <a-input
                                                            v-model:value="upiUtr"
                                                            placeholder="e.g. 12-digit UTR number"
                                                            size="large"
                                                        />
                                                    </div>

                                                    <!-- Payment Proof Upload Area -->
                                                    <div class="proof-upload-box">
                                                        <label class="detail-label">Upload Payment Proof / Screenshot</label>
                                                        
                                                        <div v-if="!paymentProofFile" class="upload-dropzone" @click="triggerProofFileInput">
                                                            <input
                                                                type="file"
                                                                ref="proofFileInput"
                                                                style="display: none;"
                                                                accept="image/*"
                                                                @change="handleProofUpload"
                                                            />
                                                            <div v-if="uploadingProof" class="upload-loading">
                                                                <a-spin />
                                                                <span class="ml-10">Uploading proof...</span>
                                                            </div>
                                                            <div v-else class="upload-prompt">
                                                                <upload-outlined class="upload-icon" />
                                                                <div class="upload-text">Click to upload payment receipt/screenshot</div>
                                                                <small class="upload-hint">PNG, JPG, WEBP up to 5MB</small>
                                                            </div>
                                                        </div>

                                                        <!-- Uploaded Proof Preview -->
                                                        <div v-else class="uploaded-proof-preview">
                                                            <img :src="paymentProofUrl" alt="Proof" class="proof-thumbnail" />
                                                            <div class="proof-info">
                                                                <div class="proof-name">
                                                                    <check-circle-outlined style="color: #52c41a;" />
                                                                    Payment Proof Attached
                                                                </div>
                                                                <small class="proof-file-text">{{ paymentProofFile }}</small>
                                                            </div>
                                                            <a-button
                                                                type="link"
                                                                danger
                                                                @click="removeProof"
                                                                class="remove-proof-btn"
                                                            >
                                                                <delete-outlined /> Remove
                                                            </a-button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <a-divider />

                                    <a-row :gutter="[30, 10]" class="mt-40">
                                        <a-col
                                            :xs="24"
                                            :sm="24"
                                            :md="24"
                                            :lg="12"
                                            :xl="12"
                                        >
                                            <a-button type="primary" size="large" block>
                                                <router-link
                                                    :to="{
                                                        name: 'front.homepage',
                                                        params: {
                                                            warehouse:
                                                                frontWarehouse.slug,
                                                        },
                                                    }"
                                                >
                                                    <RollbackOutlined />
                                                    {{ $t("front.continue_shopping") }}
                                                </router-link>
                                            </a-button>
                                        </a-col>
                                        <a-col
                                            :xs="24"
                                            :sm="24"
                                            :md="24"
                                            :lg="12"
                                            :xl="12"
                                        >
                                            <a-button
                                                type="primary"
                                                size="large"
                                                @click="confirmOrder"
                                                :disabled="
                                                    products.length == 0 ||
                                                    selectedAddress == null
                                                "
                                                :loading="loading"
                                                block
                                            >
                                                {{ $t("front.confirm_order") }}
                                                <RightOutlined />
                                            </a-button>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                        <a-card
                            :title="null"
                            :bordered="false"
                            :style="{ borderRadius: '10px' }"
                        >
                            <a-list
                                class="demo-loadmore-list"
                                item-layout="horizontal"
                                :data-source="products"
                            >
                                <template #renderItem="{ item }">
                                    <a-list-item>
                                        <a-list-item-meta>
                                            <template #title>
                                                {{ item.name }}
                                                <br />
                                                <small
                                                    :style="{
                                                        color: 'rgba(0, 0, 0, 0.45)',
                                                    }"
                                                >
                                                    Price:
                                                    {{
                                                        formatAmountCurrency(
                                                            getSalesPriceWithTax(item)
                                                        )
                                                    }}
                                                </small>
                                            </template>
                                            <template #avatar>
                                                <a-avatar
                                                    :src="item.image_url"
                                                    size="large"
                                                />
                                            </template>
                                            <template #description>
                                                {{
                                                    formatAmountCurrency(
                                                        getSalesPriceWithTax(item) *
                                                            item.cart_quantity
                                                    )
                                                }}
                                            </template>
                                        </a-list-item-meta>
                                        <div>
                                            <a-input-number
                                                v-model:value="item.cart_quantity"
                                                :min="1"
                                                :style="{ width: '60px' }"
                                                @change="updateCart"
                                            />
                                        </div>
                                        <template #actions>
                                            <a-button
                                                type="link"
                                                @click="removeItem(item.xid)"
                                            >
                                                <delete-outlined
                                                    :style="{
                                                        fontSize: '20px',
                                                        color: '#f87171',
                                                    }"
                                                />
                                            </a-button>
                                        </template>
                                    </a-list-item>
                                </template>
                            </a-list>

                            <a-divider />
                            <div class="item-total pd-10">
                                <a-row class="mt-10">
                                    <a-col :span="12">{{
                                        $t("stock.grand_total")
                                    }}</a-col>
                                    <a-col :span="12" class="text-right">
                                        {{ formatAmountCurrency(total) }}
                                    </a-col>
                                </a-row>
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, createVNode } from "vue";
import {
    DeleteOutlined,
    WalletOutlined,
    RollbackOutlined,
    RightOutlined,
    ExclamationCircleOutlined,
    QrcodeOutlined,
    CopyOutlined,
    UploadOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons-vue";
import { Modal, notification } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import cart from "../../../../common/composable/cart";
import UserAddress from "./address/Index.vue";
import { getSalesPriceWithTax } from "../../../../common/scripts/functions";
import apiFront from "../../../../common/composable/apiFront";

export default defineComponent({
    components: {
        DeleteOutlined,
        WalletOutlined,
        RollbackOutlined,
        RightOutlined,
        UserAddress,
        ExclamationCircleOutlined,
        QrcodeOutlined,
        CopyOutlined,
        UploadOutlined,
        CheckCircleOutlined,
    },
    setup() {
        const {
            products,
            updateCart,
            removeItem,
            subtotal,
            totalTax,
            total,
            formatAmountCurrency,
            frontWarehouse,
        } = cart();
        const selectedAddress = ref(null);
        const paymentMethod = ref("cod");
        const storeUpiId = ref("");
        const copiedUpi = ref(false);
        const upiUtr = ref("");
        const paymentProofFile = ref("");
        const paymentProofUrl = ref("");
        const uploadingProof = ref(false);
        const proofFileInput = ref(null);

        const { t } = useI18n();
        const router = useRouter();
        const store = useStore();
        const { loading, addEditRequestFront } = apiFront();

        const activeUpiId = computed(() => {
            return storeUpiId.value || (frontWarehouse.value?.slug ? `${frontWarehouse.value.slug}@upi` : "merchant@upi");
        });

        const upiUrl = computed(() => {
            const amount = parseFloat(total.value || 0).toFixed(2);
            const merchantName = frontWarehouse.value?.name || "Online Store";
            return `upi://pay?pa=${activeUpiId.value}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Order Payment')}`;
        });

        const qrCodeUrl = computed(() => {
            return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(upiUrl.value)}`;
        });

        const fetchPaymentMethods = () => {
            if (frontWarehouse.value && frontWarehouse.value.slug) {
                axiosFront
                    .get(`front/payment-methods/${frontWarehouse.value.slug}`)
                    .then((response) => {
                        const data = response.data;
                        if (data && data.upi_id) {
                            storeUpiId.value = data.upi_id;
                        }
                    })
                    .catch(() => {});
            }
        };

        onMounted(() => {
            fetchPaymentMethods();
        });

        const addressSelected = (addressId) => {
            selectedAddress.value = addressId;
        };

        const copyUpiId = () => {
            const idToCopy = activeUpiId.value;
            if (!idToCopy) return;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(idToCopy).then(() => {
                    copiedUpi.value = true;
                    setTimeout(() => (copiedUpi.value = false), 2500);
                    notification.success({
                        message: t("common.success") || "Copied",
                        description: `UPI ID (${idToCopy}) copied to clipboard!`,
                        placement: "bottomRight",
                    });
                });
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = idToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                copiedUpi.value = true;
                setTimeout(() => (copiedUpi.value = false), 2500);
                notification.success({
                    message: t("common.success") || "Copied",
                    description: `UPI ID (${idToCopy}) copied to clipboard!`,
                    placement: "bottomRight",
                });
            }
        };

        const triggerProofFileInput = () => {
            if (proofFileInput.value) {
                proofFileInput.value.click();
            }
        };

        const handleProofUpload = (e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (!file) return;

            uploadingProof.value = true;
            const formData = new FormData();
            formData.append("image", file);
            formData.append("folder", "orders");

            axiosFront
                .post("front/upload-file", formData)
                .then((response) => {
                    uploadingProof.value = false;
                    paymentProofFile.value = response.data.file;
                    paymentProofUrl.value = response.data.file_url;
                    notification.success({
                        message: t("common.success") || "Success",
                        description: "Payment proof uploaded successfully!",
                        placement: "bottomRight",
                    });
                })
                .catch((err) => {
                    uploadingProof.value = false;
                    notification.error({
                        message: t("common.error") || "Error",
                        description: err?.response?.data?.message || "Failed to upload payment proof.",
                        placement: "bottomRight",
                    });
                });
        };

        const removeProof = () => {
            paymentProofFile.value = "";
            paymentProofUrl.value = "";
        };

        const confirmOrder = () => {
            if (paymentMethod.value === "upi" && !paymentProofFile.value) {
                Modal.confirm({
                    title: "No Payment Proof Attached",
                    icon: createVNode(ExclamationCircleOutlined),
                    content: "You have selected UPI payment but have not attached a payment screenshot. Would you like to confirm anyway?",
                    okText: "Confirm Order",
                    cancelText: "Upload Proof",
                    onOk() {
                        proceedWithOrder();
                    },
                });
                return;
            }

            proceedWithOrder();
        };

        const proceedWithOrder = () => {
            Modal.confirm({
                title: t("front.confirm_order"),
                icon: createVNode(ExclamationCircleOutlined),
                content: t("front.confirm_order_message"),
                okText: t("common.yes"),
                cancelText: t("common.no"),
                onOk() {
                    const orderPayload = {
                        products: products.value,
                        address_id: selectedAddress.value,
                        warehouse: frontWarehouse.value.slug,
                        payment_method: paymentMethod.value,
                        document: paymentProofFile.value,
                        notes: paymentMethod.value === "upi"
                            ? `UPI Payment (Ref/UTR: ${upiUtr.value || 'N/A'})`
                            : "Cash on Delivery",
                    };

                    addEditRequestFront({
                        url: `front/self/checkout-orders/${frontWarehouse.value.slug}`,
                        data: orderPayload,
                        successMessage: t("front.order_placed_message"),
                        success: (res) => {
                            store.commit("front/addCartItems", []);
                            router.push({
                                name: "front.checkout.success",
                                params: {
                                    uniqueId: res.unique_id,
                                    warehouse: frontWarehouse.value.slug,
                                },
                            });
                        },
                    });
                },
                onCancel() {
                    loading.value = false;
                },
            });
        };

        return {
            products,
            removeItem,
            updateCart,
            formatAmountCurrency,
            subtotal,
            total,
            totalTax,
            selectedAddress,
            addressSelected,
            paymentMethod,
            storeUpiId,
            activeUpiId,
            upiUrl,
            qrCodeUrl,
            copiedUpi,
            copyUpiId,
            upiUtr,
            paymentProofFile,
            paymentProofUrl,
            uploadingProof,
            proofFileInput,
            triggerProofFileInput,
            handleProofUpload,
            removeProof,
            getSalesPriceWithTax,
            confirmOrder,
            loading,
            frontWarehouse,
        };
    },
});
</script>
<style lang="less">
.payment-method-card {
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    background: #ffffff;
    padding: 16px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
        border-color: #93c5fd;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    }

    &.active {
        border-color: #2563eb;
        background: #f8fafc;
        box-shadow: 0 0 0 1px #2563eb;
    }

    .method-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon-text {
            display: flex;
            align-items: center;

            .method-icon {
                font-size: 24px;
                color: #2563eb;

                &.upi-icon {
                    color: #7c3aed;
                }
            }

            .method-title {
                font-size: 15px;
                font-weight: 600;
                color: #1f2937;
                display: flex;
                align-items: center;
                gap: 8px;

                .upi-badge {
                    font-size: 11px;
                    font-weight: 700;
                    padding: 2px 7px;
                    background: #f3e8ff;
                    color: #7c3aed;
                    border-radius: 12px;
                    text-transform: uppercase;
                }
            }

            .method-desc {
                font-size: 12px;
                color: #6b7280;
                margin-top: 2px;
            }
        }
    }
}

.upi-payment-panel {
    background: #fdfefe;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);

    .upi-panel-header {
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 12px;

        .panel-title {
            font-size: 16px;
            font-weight: 700;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .panel-subtitle {
            font-size: 13px;
            color: #64748b;
            margin-top: 4px;
        }
    }

    .qr-code-wrapper {
        background: #ffffff;
        padding: 16px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        display: inline-block;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

        .upi-qr-image {
            width: 170px;
            height: 170px;
            display: block;
            margin: 0 auto;
            border-radius: 6px;
        }

        .qr-amount-pill {
            background: #eff6ff;
            color: #1e40af;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 13px;
            display: inline-block;
        }

        .upi-apps-logos {
            display: flex;
            gap: 6px;
            justify-content: center;

            .app-tag {
                background: #f1f5f9;
                color: #475569;
                font-size: 10px;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: 4px;
            }
        }
    }

    .detail-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: #334155;
        margin-bottom: 6px;
    }

    .upi-copy-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 8px 12px;

        .upi-id-text {
            font-family: monospace;
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
            word-break: break-all;
        }

        .copy-btn {
            font-size: 12px;
            font-weight: 600;
        }
    }

    .upload-dropzone {
        border: 2px dashed #cbd5e1;
        border-radius: 10px;
        background: #f8fafc;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            border-color: #3b82f6;
            background: #eff6ff;
        }

        .upload-icon {
            font-size: 26px;
            color: #3b82f6;
            margin-bottom: 6px;
        }

        .upload-text {
            font-size: 13px;
            font-weight: 600;
            color: #1e293b;
        }

        .upload-hint {
            font-size: 11px;
            color: #94a3b8;
        }
    }

    .uploaded-proof-preview {
        display: flex;
        align-items: center;
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 10px;
        padding: 10px 14px;
        gap: 12px;

        .proof-thumbnail {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #86efac;
        }

        .proof-info {
            flex: 1;

            .proof-name {
                font-size: 13px;
                font-weight: 600;
                color: #166534;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .proof-file-text {
                font-size: 11px;
                color: #4ade80;
                display: block;
                word-break: break-all;
            }
        }

        .remove-proof-btn {
            padding: 0;
            font-weight: 600;
        }
    }
}
</style>
