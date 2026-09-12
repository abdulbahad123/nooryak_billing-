<template>
    <a-button type="link" @click="showDrawer" class="wishlist-header-btn">
        <a-badge :count="totalWishlistItems">
            <heart-outlined
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
        :width="innerWidth <= 768 ? '85%' : 480"
        placement="right"
        :closable="false"
        :headerStyle="{ backgroundColor: '#fff0f2' }"
    >
        <template #title>
            <heart-filled :style="{ fontSize: '20px', color: '#ef4444', marginRight: '8px' }" />
            My Wishlist
        </template>
        <template #extra>
            <a-button type="link" @click="closeDrawer">
                <close-outlined :style="{ fontSize: '14px' }" />
            </a-button>
        </template>

        <a-empty v-if="products.length === 0" description="Your wishlist is empty" class="my-10" />

        <a-list
            v-else
            class="demo-loadmore-list"
            item-layout="horizontal"
            :data-source="products"
        >
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta>
                        <template #title>
                            <router-link
                                :to="{
                                    name: 'front.product.details',
                                    params: {
                                        warehouse: frontWarehouse.slug,
                                        id: item.xid || item.slug || item.id,
                                    },
                                }"
                                @click="closeDrawer"
                                style="color: #111827; font-weight: 600;"
                            >
                                {{ item.name }}
                            </router-link>
                            <br />
                            <small style="color: #6b7280">
                                Price: {{ formatAmountCurrency(getSalesPriceWithTax(item)) }}
                            </small>
                        </template>
                        <template #avatar>
                            <a-avatar :src="item.image_url" size="large" shape="square" />
                        </template>
                    </a-list-item-meta>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <a-button type="primary" size="small" @click="addToCart(item)">
                            <shopping-cart-outlined />
                        </a-button>
                        <a-button type="link" danger size="small" @click="removeItem(item.xid || item.id)">
                            <delete-outlined :style="{ fontSize: '18px' }" />
                        </a-button>
                    </div>
                </a-list-item>
            </template>
        </a-list>
    </a-drawer>
</template>

<script>
import { defineComponent, computed } from "vue";
import { HeartOutlined, HeartFilled, CloseOutlined, DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import cart from "../../../../common/composable/cart";
import common from "../../../../common/composable/common";
import { getSalesPriceWithTax } from "../../../../common/scripts/functions";

export default defineComponent({
    components: {
        HeartOutlined,
        HeartFilled,
        CloseOutlined,
        DeleteOutlined,
        ShoppingCartOutlined,
    },
    setup() {
        const store = useStore();
        const { formatAmountCurrency } = cart();
        const { frontWarehouse } = common();

        const visible = computed({
            get: () => store.state.front.wishlistDrawerVisible,
            set: (val) => store.commit("front/updateWishlistDrawerVisible", val)
        });

        const showDrawer = () => store.commit("front/updateWishlistDrawerVisible", true);
        const closeDrawer = () => store.commit("front/updateWishlistDrawerVisible", false);

        const products = computed(() => store.getters["front/storeWishlistItems"]);
        const totalWishlistItems = computed(() => store.getters["front/totalWishlistItems"]);

        const removeItem = (itemKey) => {
            store.commit("front/removeWishlistItem", itemKey);
            message.info("Item removed from wishlist");
        };

        const addToCart = (product) => {
            const cartItems = store.getters["front/storeCartItems"];
            const updatedCartItems = cartItems.filter(
                (item) => item.xid !== product.xid && item.id !== product.id
            );

            updatedCartItems.push({
                ...product,
                cart_quantity: 1,
            });

            store.commit("front/addCartItems", updatedCartItems);
            store.commit("front/updateCartDrawerVisible", true);
            message.success("Item added to cart");
        };

        return {
            visible,
            showDrawer,
            closeDrawer,
            products,
            totalWishlistItems,
            removeItem,
            addToCart,
            formatAmountCurrency,
            getSalesPriceWithTax,
            frontWarehouse,
            innerWidth: window.innerWidth,
        };
    },
});
</script>

<style lang="less" scoped>
.wishlist-header-btn {
    padding: 0 8px;
}
</style>
