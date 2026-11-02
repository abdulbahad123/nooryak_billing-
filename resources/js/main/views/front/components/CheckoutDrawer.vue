<template>
    <a-button type="link" @click="showDrawer">
        <a-badge :count="totalCartItems">
            <shopping-cart-outlined
                :style="{
                    fontSize: '24px',
                    color: '#fff',
                    verticalAlign: 'middle',
                }"
            />
        </a-badge>
    </a-button>
    <a-drawer
        v-model:open="visible"
        :width="innerWidth <= 768 ? '80%' : 500"
        placement="right"
        :closable="false"
        :headerStyle="{ backgroundColor: '#eef2ff' }"
    >
        <template #title>
            <shopping-outlined :style="{ fontSize: '20px' }" />
            Shopping Cart
        </template>
        <template #extra>
            <a-button type="link" @click="closeDrawer">
                <close-outlined :style="{ fontSize: '14px' }" />
            </a-button>
        </template>

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
                            <small :style="{ color: 'rgba(0, 0, 0, 0.45)' }">
                                Price:
                                {{ formatAmountCurrency(getSalesPriceWithTax(item)) }}
                            </small>
                        </template>
                        <template #avatar>
                            <a-avatar :src="item.image_url" size="large" />
                        </template>
                        <template #description>
                            {{
                                formatAmountCurrency(
                                    getSalesPriceWithTax(item) * item.cart_quantity
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
                        <a-button type="link" @click="removeItem(item.xid)">
                            <delete-outlined
                                :style="{ fontSize: '20px', color: '#f87171' }"
                            />
                        </a-button>
                    </template>
                </a-list-item>
            </template>
        </a-list>

        <template #footer>
            <div class="drawer-footer-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 15px; font-weight: 600; color: #4b5563;">Subtotal:</span>
                    <span style="font-size: 18px; font-weight: 700; color: #1890ff;">{{ formatAmountCurrency(total) }}</span>
                </div>
                <div v-if="!isLoggedIn">
                    <a-row :gutter="8">
                        <a-col :span="12">
                            <a-button
                                type="default"
                                block
                                :loading="guestLoading"
                                @click="proceedGuestCheckout"
                                style="border-color: #1890ff; color: #1890ff; font-weight: 600;"
                            >
                                <user-outlined />
                                Guest Checkout
                            </a-button>
                        </a-col>
                        <a-col :span="12">
                            <a-button type="primary" @click="proceedCheckout" block>
                                Checkout
                                <right-outlined />
                            </a-button>
                        </a-col>
                    </a-row>
                </div>
                <div v-else>
                    <a-button type="primary" size="large" @click="proceedCheckout" block>
                        Proceed to Checkout
                        <right-outlined />
                    </a-button>
                </div>
            </div>
        </template>
    </a-drawer>
</template>
<script>
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import {
    ShoppingCartOutlined,
    ShoppingOutlined,
    CloseOutlined,
    DeleteOutlined,
    RightOutlined,
    UserOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import cart from "../../../..//common/composable/cart";
import { getSalesPriceWithTax } from "../../../../common/scripts/functions";

export default defineComponent({
    emits: ["openLoginModal"],
    components: {
        ShoppingCartOutlined,
        ShoppingOutlined,
        CloseOutlined,
        DeleteOutlined,
        RightOutlined,
        UserOutlined,
    },
    setup(props, { emit }) {
        const store = useStore();
        const router = useRouter();
        const {
            products,
            updateCart,
            removeItem,
            total,
            formatAmountCurrency,
            frontWarehouse,
        } = cart();

        const visible = computed({
            get: () => store.state.front.cartDrawerVisible,
            set: (val) => store.commit("front/updateCartDrawerVisible", val)
        });

        const showDrawer = () => store.commit("front/updateCartDrawerVisible", true);
        const closeDrawer = () => store.commit("front/updateCartDrawerVisible", false);

        const isLoggedIn = computed(() => {
            return store.getters["front/isLoggedIn"];
        });

        const guestLoading = ref(false);

        const proceedGuestCheckout = () => {
            guestLoading.value = true;
            axiosFront
                .post("front/guest-login", { warehouse: frontWarehouse.value.slug })
                .then((response) => {
                    guestLoading.value = false;
                    const res = response.data;
                    store.commit("front/updateUser", res.user);
                    store.commit("front/updateToken", res.token);
                    store.commit("front/updateExpires", res.expires_in);
                    visible.value = false;
                    router.push({
                        name: "front.checkout",
                        params: { warehouse: frontWarehouse.value.slug },
                    });
                })
                .catch(() => {
                    guestLoading.value = false;
                    emit("openLoginModal");
                });
        };

        const proceedCheckout = () => {
            visible.value = false;

            if (isLoggedIn.value) {
                router.push({
                    name: "front.checkout",
                    params: { warehouse: frontWarehouse.value.slug },
                });
            } else {
                emit("openLoginModal");
            }
        };

        return {
            visible,
            showDrawer,
            closeDrawer,
            totalCartItems: computed(() => store.getters["front/totalCartItems"]),

            products,
            removeItem,
            updateCart,
            formatAmountCurrency,
            total,
            getSalesPriceWithTax,
            proceedCheckout,
            proceedGuestCheckout,
            guestLoading,
            isLoggedIn,
            frontWarehouse,
            innerWidth: window.innerWidth,
        };
    },
});
</script>
