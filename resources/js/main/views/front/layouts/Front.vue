<template>
    <a-layout v-if="frontWarehouse.online_store_enabled == 1" class="main-front-layout">
        <!-- Top Header Navigation Bar -->
        <header class="main-header">
            <div class="header-wrapper">
                <!-- Brand Logo -->
                <div class="brand-box" v-if="frontWarehouse && frontWarehouse.slug">
                    <router-link
                        :to="{
                            name: 'front.homepage',
                            params: { warehouse: frontWarehouse.slug },
                        }"
                        class="brand-logo-link"
                    >
                        <div class="logo-flex">
                            <template v-if="frontSettings && frontSettings.header_logo">
                                <img :src="frontSettings.header_logo_url" alt="Store Logo" class="brand-header-img" style="max-height: 42px; width: auto; object-fit: contain;" />
                            </template>
                            <template v-else-if="frontWarehouse && frontWarehouse.logo">
                                <img :src="frontWarehouse.logo_url" alt="Store Logo" class="brand-header-img" style="max-height: 42px; width: auto; object-fit: contain;" />
                            </template>
                            <template v-else>
                                <div class="logo-icon-wrap">
                                    <shopping-outlined class="logo-shopping-icon" />
                                </div>
                                <div class="logo-text-wrap">
                                    <span class="logo-title">Electronifly</span>
                                    <span class="logo-subtitle" v-if="windowWidth >= 480">Smart Choices, Brighter Lives.</span>
                                </div>
                            </template>
                        </div>
                    </router-link>
                </div>

                <!-- Central Search Bar (Desktop) -->
                <div class="header-search-container" v-if="windowWidth >= 768">
                    <div class="search-input-group">
                        <select class="category-select-dropdown" v-model="selectedSearchCategory">
                            <option value="">All Categories</option>
                            <option value="mobiles">Mobiles</option>
                            <option value="laptops">Laptops</option>
                            <option value="televisions">Televisions</option>
                            <option value="headphones">Headphones</option>
                        </select>
                        <input
                            type="text"
                            class="search-text-input"
                            placeholder="Search for products, brands and more..."
                            v-model="searchValue"
                            @keyup.enter="performSearch"
                        />
                        <button type="button" class="search-submit-btn" @click="performSearch">
                            <search-outlined />
                        </button>
                    </div>
                </div>

                <!-- Right Header Actions (Wishlist, Cart, Account) -->
                <div class="header-actions">
                    <div class="header-action-item">
                        <WishlistDrawer />
                    </div>

                    <div class="header-action-item">
                        <CheckoutDrawer @openLoginModal="openLoginModal" />
                    </div>

                    <div class="header-action-item">
                        <a-dropdown v-if="isLoggedIn">
                            <button type="button" class="action-btn account-btn">
                                <user-outlined class="action-icon" />
                                <span class="action-label" v-if="windowWidth >= 768">Account</span>
                            </button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="dashboard">
                                        <router-link :to="{ name: 'front.dashboard', params: { warehouse: frontWarehouse.slug } }">
                                            Dashboard
                                        </router-link>
                                    </a-menu-item>
                                    <a-menu-item key="orders">
                                        <router-link :to="{ name: 'front.orders', params: { warehouse: frontWarehouse.slug } }">
                                            My Orders
                                        </router-link>
                                    </a-menu-item>
                                    <a-menu-divider />
                                    <a-menu-item key="logout" @click="logoutUser">
                                        Logout
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <button type="button" class="action-btn account-btn" @click="openLoginModal" v-else>
                            <user-outlined class="action-icon" />
                            <span class="action-label" v-if="windowWidth >= 768">Account</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Search Bar (<768px) -->
            <div class="mobile-search-container" v-if="windowWidth < 768">
                <div class="mobile-search-input-group">
                    <input
                        type="text"
                        class="search-text-input"
                        placeholder="Search for products, brands..."
                        v-model="searchValue"
                        @keyup.enter="performSearch"
                    />
                    <button type="button" class="search-submit-btn" @click="performSearch">
                        <search-outlined />
                    </button>
                </div>
            </div>
        </header>

        <!-- Secondary Category Navigation Strip (6 Categories Limit) -->
        <nav class="subheader-cat-nav">
            <div class="subheader-wrapper">
                <div class="cat-links-scroll">
                    <router-link
                        v-for="cat in (categories && categories.length ? categories.slice(0, 6) : defaultNavCategories.slice(0, 6))"
                        :key="cat.id || cat.slug"
                        :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: [cat.slug] } }"
                        class="cat-nav-link"
                    >
                        {{ cat.name }}
                    </router-link>
                </div>
                <div class="sub-nav-right-utility" v-if="windowWidth >= 992">
                    <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: ['all'] } }" class="utility-link">
                        <gift-outlined /> Offers
                    </router-link>
                    <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug } }" class="utility-link">
                        <customer-service-outlined /> Support
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- Main Body -->
        <a-layout-content class="main-body-content">
            <router-view></router-view>
            <Footer />
        </a-layout-content>

        <Login
            :modalVisible="loginModalVisible"
            @modalClosed="loginModalClosed"
        />
    </a-layout>

    <div v-else class="no-online-store-container">
        <a-result
            status="warning"
            :title="$t('warehouse.no_online_store_exists')"
        ></a-result>
    </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
    SearchOutlined,
    UserOutlined,
    ShoppingOutlined,
    GiftOutlined,
    CustomerServiceOutlined
} from "@ant-design/icons-vue";
import common from "../../../../common/composable/common";
import Footer from "./Footer.vue";
import CheckoutDrawer from "../components/CheckoutDrawer.vue";
import WishlistDrawer from "../components/WishlistDrawer.vue";
import Login from "../components/Login.vue";

export default defineComponent({
    components: {
        SearchOutlined,
        UserOutlined,
        ShoppingOutlined,
        GiftOutlined,
        CustomerServiceOutlined,
        Footer,
        CheckoutDrawer,
        WishlistDrawer,
        Login,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const { frontWarehouse, frontAppSetting } = common();
        const searchValue = ref("");
        const selectedSearchCategory = ref("");
        const loginModalVisible = ref(false);
        const windowWidth = ref(window.innerWidth);
        const categories = ref([]);

        const defaultNavCategories = [
            { name: "Electronics", slug: "electronics" },
            { name: "Mobiles", slug: "mobiles" },
            { name: "Televisions", slug: "televisions" },
            { name: "Computers", slug: "computers" },
            { name: "Home & Furniture", slug: "home-and-furnitures" },
            { name: "Fashion", slug: "fashion" },
            { name: "Groceries", slug: "grocery" },
            { name: "Baby & Kids", slug: "baby-kids" },
        ];

        const onResize = () => {
            windowWidth.value = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener("resize", onResize);

            axiosFront
                .post("front/categories")
                .then((response) => {
                    if (response.data && response.data.categories && response.data.categories.length) {
                        categories.value = response.data.categories;
                    }
                })
                .catch(() => {});
        });

        onUnmounted(() => {
            window.removeEventListener("resize", onResize);
        });

        const openLoginModal = () => {
            loginModalVisible.value = true;
        };

        const loginModalClosed = () => {
            loginModalVisible.value = false;
        };

        const isLoggedIn = computed(() => store.getters["front/isLoggedIn"]);

        const logoutUser = () => {
            store.dispatch("front/logout");
        };

        const performSearch = () => {
            if (searchValue.value.trim() !== "") {
                router.push({
                    name: "front.categories",
                    params: { warehouse: frontWarehouse.value.slug, slug: [selectedSearchCategory.value || 'all'] },
                    query: { search: searchValue.value }
                });
            }
        };

        return {
            frontAppSetting,
            searchValue,
            selectedSearchCategory,
            openLoginModal,
            loginModalClosed,
            loginModalVisible,
            frontWarehouse,
            isLoggedIn,
            logoutUser,
            performSearch,
            windowWidth,
            categories,
            defaultNavCategories,
        };
    },
});
</script>

<style lang="less" scoped>
.main-front-layout {
    min-height: 100vh;
    background: #f4f6f8;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Header Styles */
.main-header {
    background: #2563eb;
    color: #ffffff;
    padding: 12px 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.brand-logo-link {
    text-decoration: none;
}

.logo-flex {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-icon-wrap {
    width: 38px;
    height: 38px;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-shopping-icon {
        font-size: 22px;
        color: #2563eb;
    }
}

.logo-text-wrap {
    display: flex;
    flex-direction: column;
}

.logo-title {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
    line-height: 1.1;
}

.logo-subtitle {
    font-size: 10px;
    color: #dbeafe;
    letter-spacing: 0.2px;
}

/* Search Bar Styles */
.header-search-container {
    flex: 1;
    max-width: 600px;
}

.search-input-group {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    padding: 3px 4px 3px 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.category-select-dropdown {
    border: none;
    background: transparent;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    padding-right: 8px;
    outline: none;
    cursor: pointer;
    border-right: 1px solid #e5e7eb;
}

.search-text-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px 12px;
    font-size: 14px;
    color: #111827;

    &::placeholder {
        color: #9ca3af;
        font-size: 13px;
    }
}

.search-submit-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #2563eb;
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #1d4ed8;
    }
}

/* Actions Styles */
.header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.header-action-item {
    display: flex;
    align-items: center;
}

.action-btn {
    background: transparent;
    border: none;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 6px;
    transition: background 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
    }

    .action-icon {
        font-size: 20px;
    }
}

/* Subheader Category Nav */
.subheader-cat-nav {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.subheader-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cat-links-scroll {
    display: flex;
    align-items: center;
    gap: 24px;
    overflow-x: auto;
    padding: 10px 0;

    &::-webkit-scrollbar {
        display: none;
    }
}

.cat-nav-link {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.2s;

    &:hover, &.router-link-active {
        color: #2563eb;
    }
}

.sub-nav-right-utility {
    display: flex;
    align-items: center;
    gap: 16px;

    .utility-link {
        font-size: 13px;
        font-weight: 600;
        color: #4b5563;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 4px;

        &:hover {
            color: #2563eb;
        }
    }
}

.mobile-search-container {
    padding: 10px 16px 4px 16px;
    max-width: 100%;
}

.mobile-search-input-group {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    padding: 2px 4px 2px 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    .search-text-input {
        flex: 1;
        border: none;
        outline: none;
        padding: 6px 8px;
        font-size: 13px;
        color: #111827;
        width: 100%;
    }

    .search-submit-btn {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #2563eb;
        color: #ffffff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
    }
}

.main-body-content {
    background: #f4f6f8;
    overflow-x: hidden;
}

.no-online-store-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8ff;
}
</style>
