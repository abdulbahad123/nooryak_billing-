<template>
    <div class="product" v-if="currentProduct && (currentProduct.xid || currentProduct.id)" @click="navigateToDetails">
        <div class="product-top">
            <button
                type="button"
                class="card-wishlist-btn"
                @click.stop.prevent="toggleWishlist"
                :title="isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'"
            >
                <heart-outlined v-if="!isWishlisted" />
                <heart-filled v-else style="color: #ef4444;" />
            </button>
            <router-link
                :to="{
                    name: 'front.product.details',
                    params: {
                        warehouse: frontWarehouse.slug,
                        id: currentProduct.xid || currentProduct.slug || currentProduct.id,
                    },
                }"
                class="card-img-link"
            >
                <img :src="currentProduct.image_url" class="img-fit" />
            </router-link>
        </div>
        <div class="product-bottom">
            <div class="card-header-info">
                <h5 class="product-title">
                    <router-link
                        :to="{
                            name: 'front.product.details',
                            params: {
                                warehouse: frontWarehouse.slug,
                                id: currentProduct.xid || currentProduct.slug || currentProduct.id,
                            },
                        }"
                        class="title-link"
                    >
                        {{ currentProduct.name }}
                    </router-link>
                </h5>
                <span class="product-category" v-if="currentProduct.category">{{ currentProduct.category.name }}</span>
            </div>

            <!-- Rating Row -->
            <div class="card-rating-row">
                <span class="star-rating"><star-filled class="star-icon" /> 4.6</span>
                <span class="rating-count">(1.2K)</span>
            </div>

            <!-- Price & Discount Row -->
            <div class="card-price-container">
                <div class="price-box">
                    <span class="current-price-text">
                        {{ formatAmountCurrency(getSalesPriceWithTax(currentProduct)) }}
                    </span>
                    <del v-if="currentProduct.details && currentProduct.details.mrp > getSalesPriceWithTax(currentProduct)" class="mrp-price-text">
                        {{ formatAmountCurrency(currentProduct.details.mrp) }}
                    </del>
                </div>
                <span v-if="currentProduct.details && currentProduct.details.mrp > getSalesPriceWithTax(currentProduct)" class="card-discount-tag">
                    {{ calculateDiscount(getSalesPriceWithTax(currentProduct), currentProduct.details.mrp) }}% OFF
                </span>
            </div>

            <!-- Full-width Add to Cart Button -->
            <div class="card-action-box mt-3">
                <div v-if="currentProduct.cart_quantity > 0" class="card-qty-group">
                    <button
                        type="button"
                        class="qty-card-btn"
                        @click="
                            currentProduct.cart_quantity -= 1;
                            addItem(currentProduct);
                        "
                    >
                        <minus-outlined />
                    </button>
                    <span class="qty-card-val">{{ currentProduct.cart_quantity }}</span>
                    <button
                        type="button"
                        class="qty-card-btn"
                        @click="
                            currentProduct.cart_quantity += 1;
                            addItem(currentProduct);
                        "
                    >
                        <plus-outlined />
                    </button>
                </div>
                <button
                    v-else
                    type="button"
                    class="card-add-btn"
                    @click="
                        currentProduct.cart_quantity++;
                        addItem(currentProduct);
                    "
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined, HeartOutlined, HeartFilled, StarFilled } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { filter, forEach } from "lodash-es";
import cart from "../../../../common/composable/cart";
import common from "../../../../common/composable/common";
import { getSalesPriceWithTax } from "../../../../common/scripts/functions";

export default {
    props: ["product", "currency"],
    components: {
        ShoppingCartOutlined,
        MinusOutlined,
        PlusOutlined,
        HeartOutlined,
        HeartFilled,
        StarFilled,
    },
    setup(props) {
        const { formatAmountCurrency } = cart();
        const { frontWarehouse } = common();
        const store = useStore();
        const router = useRouter();
        const visible = ref(false);
        const productQuantity = ref(1);
        const currentProduct = ref({});

        const navigateToDetails = (e) => {
            if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) {
                return;
            }
            const targetId = currentProduct.value.xid || currentProduct.value.slug || currentProduct.value.id;
            if (targetId && frontWarehouse.value && frontWarehouse.value.slug) {
                router.push({
                    name: "front.product.details",
                    params: {
                        warehouse: frontWarehouse.value.slug,
                        id: targetId,
                    },
                });
            }
        };

        onMounted(() => {
            const cartItems = store.getters["front/storeCartItems"];
            let productQuantity = 0;

            forEach(cartItems, (iee) => {
                if (iee.xid == props.product.xid) {
                    productQuantity = iee.cart_quantity;
                }
            });

            currentProduct.value = { ...props.product, cart_quantity: productQuantity };
        });

        const addItem = (product) => {
            const cartItems = store.getters["front/storeCartItems"];
            const updatedCartItems = filter(
                cartItems,
                (cartItem) => cartItem.xid != product.xid
            );

            if (product.cart_quantity > 0) {
                updatedCartItems.push({
                    ...product,
                    cart_quantity: product.cart_quantity,
                });
            }

            store.commit("front/addCartItems", updatedCartItems);
            store.commit("front/updateCartDrawerVisible", true);
            message.success(`Item updated in cart`);
        };

        const isWishlisted = computed(() => {
            const itemKey = props.product.xid || props.product.id;
            return store.getters["front/isWishlisted"](itemKey);
        });

        const toggleWishlist = () => {
            store.commit("front/toggleWishlistItem", props.product);
            if (isWishlisted.value) {
                message.success("Added to Wishlist");
            } else {
                message.info("Removed from Wishlist");
            }
        };

        const calculateDiscount = (salesPrice, mrp) => {
            if (!mrp || mrp <= salesPrice) return 0;
            return Math.round(((mrp - salesPrice) / mrp) * 100);
        };

        watch(store.state.front, (newVal, oldVal) => {
            let productQuantity = 0;
            forEach(store.getters["front/storeCartItems"], (iee) => {
                if (iee.xid == currentProduct.value.xid) {
                    productQuantity = iee.cart_quantity;
                }
            });

            currentProduct.value = {
                ...currentProduct.value,
                cart_quantity: productQuantity,
            };
        });

        return {
            currentProduct,
            formatAmountCurrency,
            frontWarehouse,
            visible,
            productQuantity,
            addItem,
            getSalesPriceWithTax,
            isWishlisted,
            toggleWishlist,
            calculateDiscount,
            navigateToDetails,
        };
    },
};
</script>

<style lang="less" scoped>
.product {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    margin-top: 0px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
        border-color: #2563eb;
        box-shadow: 0 8px 24px rgba(37, 99, 235, 0.1);
        transform: translateY(-3px);
    }
}

.card-wishlist-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #64748b;

    &:hover {
        background: #ffffff;
        transform: scale(1.1);
        color: #ef4444;
        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    }
}

.product-top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #f8fafc;
    padding: 16px;
    height: 180px;

    .card-img-link {
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        transition: transform 0.3s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
}

.product-bottom {
    padding: 14px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;

    .card-header-info {
        margin-bottom: 6px;
    }

    .product-category {
        font-weight: 500;
        font-size: 11px;
        color: #94a3b8;
        display: block;
        margin-top: 2px;
    }

    .product-title {
        font-weight: 700;
        font-size: 14px;
        color: #0f172a;
        margin: 0;
        line-height: 1.35;
        height: 38px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        .title-link {
            color: inherit;
            text-decoration: none;
            &:hover {
                color: #2563eb;
            }
        }
    }
}

.card-rating-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;

    .star-rating {
        font-size: 11px;
        font-weight: 700;
        color: #0f172a;
        background: #fef3c7;
        padding: 2px 6px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 3px;

        .star-icon {
            color: #d97706;
        }
    }

    .rating-count {
        font-size: 11px;
        color: #94a3b8;
    }
}

.card-price-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: 4px;

    .price-box {
        display: flex;
        align-items: baseline;
        gap: 6px;
    }

    .current-price-text {
        font-weight: 800;
        font-size: 16px;
        color: #0f172a;
    }

    .mrp-price-text {
        font-weight: 400;
        font-size: 12px;
        color: #94a3b8;
    }

    .card-discount-tag {
        font-size: 10px;
        font-weight: 800;
        color: #16a34a;
        background: #dcfce7;
        padding: 2px 6px;
        border-radius: 4px;
    }
}

.card-action-box {
    margin-top: 10px;

    .card-add-btn {
        width: 100%;
        height: 38px;
        background: #2563eb;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }
    }

    .card-qty-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #2563eb;
        border-radius: 8px;
        height: 38px;
        overflow: hidden;
        background: #ffffff;

        .qty-card-btn {
            width: 36px;
            height: 100%;
            border: none;
            background: #eff6ff;
            color: #2563eb;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                background: #dbeafe;
            }
        }

        .qty-card-val {
            font-weight: 700;
            font-size: 14px;
            color: #0f172a;
        }
    }
}

@media (max-width: 640px) {
    .product-top {
        height: 140px;
        padding: 10px;
    }
    .product-bottom {
        padding: 10px;
    }
    .product-title {
        font-size: 12px;
        height: 32px;
    }
    .current-price-text {
        font-size: 13px !important;
    }
    .mrp-price-text {
        font-size: 10px !important;
    }
    .card-add-btn {
        height: 34px !important;
        font-size: 12px !important;
    }
}
</style>
