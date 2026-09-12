<template>
    <div class="home-page-container">
        <div class="home-wrapper">
            <!-- 1. Hero Banner Slider Section -->
            <section class="hero-banner-section">
                <a-carousel autoplay :arrows="false" class="hero-carousel">
                    <div
                        v-for="(banner, index) in heroBanners"
                        :key="index"
                        class="hero-slide"
                    >
                        <div class="hero-card">
                            <!-- Left Side: Dynamic Content from Dashboard -->
                            <div class="hero-left-content">
                                <span class="hero-tag">{{ banner.tag || banner.sub_title || 'Upgrade Your World' }}</span>
                                <h1 class="hero-title" v-if="banner.title" v-html="banner.title"></h1>
                                <h1 class="hero-title" v-else>Latest Electronics<br /><span class="highlight-text">For A Smarter You</span></h1>
                                <p class="hero-sub">{{ banner.subtitle || banner.description || 'Top brands | Great deals | Trusted quality' }}</p>
                                <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: [banner.category_slug || 'electronics'] } }" class="hero-cta-btn">
                                    {{ banner.button_text || 'Shop Now' }} <right-outlined />
                                </router-link>
                            </div>

                            <!-- Right Side: Hero Banner Image -->
                            <div class="hero-right-media">
                                <img :src="banner.url" alt="Hero Banner" class="hero-banner-img" />
                            </div>
                        </div>
                    </div>
                </a-carousel>
            </section>

            <!-- 2. Shop by Category Auto Slider -->
            <section class="category-slider-section">
                <div class="section-top-bar">
                    <div>
                        <h2 class="section-title">Shop by Category</h2>
                        <p class="section-subtitle">Explore top categories with exclusive deals</p>
                    </div>
                    <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug } }" class="view-all-link">
                        View All <right-outlined />
                    </router-link>
                </div>

                <div class="category-slider-wrapper">
                    <a-carousel
                        autoplay
                        :arrows="false"
                        :dots="false"
                        :slides-to-show="categorySlidesToShow"
                        :slides-to-scroll="1"
                        class="category-carousel"
                    >
                        <div
                            v-for="cat in (frontSettings.featured_categories_details && frontSettings.featured_categories_details.length ? frontSettings.featured_categories_details : defaultCategories)"
                            :key="cat.id || cat.name"
                            class="cat-slide-item"
                        >
                            <router-link
                                :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: [cat.slug || 'all'] } }"
                                class="avatar-cat-card"
                            >
                                <div class="avatar-circle">
                                    <img :src="cat.image_url || '/images/category.png'" :alt="cat.name" class="avatar-img" />
                                </div>
                                <span class="avatar-cat-name">{{ cat.name }}</span>
                            </router-link>
                        </div>
                    </a-carousel>
                </div>
            </section>

            <!-- 3. Triple Offer Cards Row -->
            <section class="triple-offers-section">
                <div class="triple-grid">
                    <!-- Card 1: Mobile Fest -->
                    <div class="offer-card dark-blue-card">
                        <div class="offer-card-info">
                            <span class="offer-card-tag">MOBILE FEST</span>
                            <h3 class="offer-card-title">Up to 50% Off</h3>
                            <p class="offer-card-sub">Latest Smartphones.<br />Top Brands. Best Prices.</p>
                            <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: ['mobiles'] } }" class="offer-card-btn light-btn">
                                Shop Now <right-outlined />
                            </router-link>
                        </div>
                        <img :src="(frontSettings.bottom_banners_1_details && frontSettings.bottom_banners_1_details[0]) ? frontSettings.bottom_banners_1_details[0].url : '/uploads/banners/hero_banner.png'" alt="Mobile Fest" class="offer-card-img" />
                    </div>

                    <!-- Card 2: Laptops -->
                    <div class="offer-card light-blue-card">
                        <div class="offer-card-info">
                            <span class="offer-card-tag text-blue-600">LAPTOPS</span>
                            <h3 class="offer-card-title text-gray-900">Power Your Potential</h3>
                            <p class="offer-card-sub text-gray-600">Up to <strong class="text-blue-600">40% Off</strong></p>
                            <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: ['desktops'] } }" class="offer-card-btn blue-btn">
                                Shop Now <right-outlined />
                            </router-link>
                        </div>
                        <img :src="(frontSettings.bottom_banners_2_details && frontSettings.bottom_banners_2_details[0]) ? frontSettings.bottom_banners_2_details[0].url : '/uploads/banners/gadgets_banner.png'" alt="Laptops" class="offer-card-img" />
                    </div>

                    <!-- Card 3: Home Appliances -->
                    <div class="offer-card peach-card">
                        <div class="offer-card-info">
                            <span class="offer-card-tag text-orange-600">HOME APPLIANCES</span>
                            <h3 class="offer-card-title text-gray-900">For a Better Everyday</h3>
                            <p class="offer-card-sub text-gray-600">Up to <strong class="text-orange-600">60% Off</strong></p>
                            <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: ['furniture'] } }" class="offer-card-btn blue-btn">
                                Shop Now <right-outlined />
                            </router-link>
                        </div>
                        <img :src="(frontSettings.bottom_banners_3_details && frontSettings.bottom_banners_3_details[0]) ? frontSettings.bottom_banners_3_details[0].url : '/uploads/banners/furniture_banner.png'" alt="Home Appliances" class="offer-card-img" />
                    </div>
                </div>
            </section>

            <!-- 4. Featured Products Section -->
            <section class="store-section">
                <div class="section-top-bar">
                    <div>
                        <h2 class="section-title">Featured Products</h2>
                        <p class="section-subtitle">Handpicked just for you</p>
                    </div>
                    <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug } }" class="view-all-link">
                        View All <right-outlined />
                    </router-link>
                </div>

                <!-- Loading Skeleton -->
                <div v-if="loading" class="products-grid">
                    <ProductCardSkeleton v-for="i in 6" :key="i" />
                </div>

                <!-- Products Grid -->
                <div v-else class="products-grid">
                    <ProductCard
                        v-for="product in featuredProducts"
                        :key="product.id || product.xid"
                        :product="product"
                        :currency="currency"
                    />
                </div>
            </section>

            <!-- 5. Limited Period Offer Section -->
            <section class="store-section offer-timer-section">
                <div class="section-top-bar flex-between-wrap">
                    <div>
                        <h2 class="section-title">Limited Period Offer on Mobiles</h2>
                        <p class="section-subtitle">Grab the best deals before they're gone!</p>
                    </div>

                    <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: ['mobiles'] } }" class="view-all-link">
                        View All <right-outlined />
                    </router-link>
                </div>

                <div class="products-grid">
                    <ProductCard
                        v-for="product in featuredProducts.slice(0, 6)"
                        :key="product.id || product.xid"
                        :product="product"
                        :currency="currency"
                    />
                </div>
            </section>

            <!-- 6. Double Promo Banners Row -->
            <section class="double-banner-section">
                <div class="double-grid">
                    <!-- Banner 1: Best Gadgets -->
                    <div class="double-banner-card dark-gadget-bg">
                        <div class="double-banner-info">
                            <h3 class="double-banner-title">Best Gadgets<br />For a Smarter Lifestyle</h3>
                            <p class="double-banner-tag">Up to <span class="highlight-yellow">60% OFF</span></p>
                            <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug } }" class="double-banner-btn light-pill-btn">
                                Shop Now <right-outlined />
                            </router-link>
                        </div>
                        <img :src="(frontSettings.bottom_banners_2_details && frontSettings.bottom_banners_2_details[0]) ? frontSettings.bottom_banners_2_details[0].url : '/uploads/banners/gadgets_banner.png'" alt="Gadgets" class="double-banner-img" />
                    </div>

                    <!-- Banner 2: Home Furniture -->
                    <div class="double-banner-card cream-home-bg">
                        <div class="double-banner-info">
                            <h3 class="double-banner-title text-gray-900">Make Your Home<br />More Beautiful</h3>
                            <p class="double-banner-sub text-gray-600">Stylish Furniture for Modern Living</p>
                            <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug, slug: ['furniture'] } }" class="double-banner-btn blue-pill-btn">
                                Shop Now <right-outlined />
                            </router-link>
                        </div>
                        <img :src="(frontSettings.bottom_banners_3_details && frontSettings.bottom_banners_3_details[0]) ? frontSettings.bottom_banners_3_details[0].url : '/uploads/banners/furniture_banner.png'" alt="Home Furniture" class="double-banner-img" />
                    </div>
                </div>
            </section>

            <!-- 7. Dynamic Backend Product Card Sections -->
            <section
                v-for="frontProductCard in frontProductCards"
                :key="frontProductCard.id"
                class="store-section"
            >
                <div class="section-top-bar">
                    <div>
                        <h2 class="section-title">{{ frontProductCard.title }}</h2>
                        <p class="section-subtitle" v-if="frontProductCard.subtitle">{{ frontProductCard.subtitle }}</p>
                    </div>
                    <router-link :to="{ name: 'front.categories', params: { warehouse: frontWarehouse.slug } }" class="view-all-link">
                        View All <right-outlined />
                    </router-link>
                </div>

                <div class="products-grid">
                    <ProductCard
                        v-for="product in frontProductCard.products_details"
                        :key="product.xid || product.id"
                        :product="product"
                        :currency="currency"
                    />
                </div>
            </section>

            <!-- 8. Value Guarantee Badges Row -->
            <section class="value-guarantee-bar">
                <div class="guarantee-grid">
                    <div class="guarantee-item">
                        <div class="guarantee-icon"><car-outlined /></div>
                        <div>
                            <div class="guarantee-head">Free Shipping</div>
                            <div class="guarantee-sub">On orders over {{ formatAmountCurrency(500) }}</div>
                        </div>
                    </div>
                    <div class="guarantee-item">
                        <div class="guarantee-icon"><reload-outlined /></div>
                        <div>
                            <div class="guarantee-head">Easy Returns</div>
                            <div class="guarantee-sub">7 days hassle free</div>
                        </div>
                    </div>
                    <div class="guarantee-item">
                        <div class="guarantee-icon"><safety-certificate-outlined /></div>
                        <div>
                            <div class="guarantee-head">Secure Payment</div>
                            <div class="guarantee-sub">100% encrypted</div>
                        </div>
                    </div>
                    <div class="guarantee-item">
                        <div class="guarantee-icon"><customer-service-outlined /></div>
                        <div>
                            <div class="guarantee-head">24/7 Support</div>
                            <div class="guarantee-sub">We're here to help</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
import {
    RightOutlined,
    LeftOutlined,
    SafetyCertificateOutlined,
    ReloadOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CarOutlined,
    CustomerServiceOutlined,
    MobileOutlined,
    LaptopOutlined,
    DesktopOutlined,
    AudioOutlined,
    CameraOutlined,
    HomeOutlined,
    ShopOutlined,
    SkinOutlined,
    SmileOutlined,
    AppstoreOutlined
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import ProductCard from "./components/ProductCard.vue";
import ProductCardSkeleton from "./components/ProductCardSkeleton.vue";
import cart from "../../../common/composable/cart";
import common from "../../../common/composable/common";

export default defineComponent({
    components: {
        RightOutlined,
        LeftOutlined,
        SafetyCertificateOutlined,
        ReloadOutlined,
        CheckCircleOutlined,
        ClockCircleOutlined,
        CarOutlined,
        CustomerServiceOutlined,
        MobileOutlined,
        LaptopOutlined,
        DesktopOutlined,
        AudioOutlined,
        CameraOutlined,
        HomeOutlined,
        ShopOutlined,
        SkinOutlined,
        SmileOutlined,
        AppstoreOutlined,
        ProductCard,
        ProductCardSkeleton,
    },
    setup() {
        const { frontWarehouse } = common();
        const { formatAmountCurrency } = cart();
        const route = useRoute();
        const loading = ref(true);
        const frontSettings = ref({});
        const frontProductCards = ref([]);
        const featuredProducts = ref([]);
        const currency = ref({});
        const windowWidth = ref(window.innerWidth);

        // Countdown Timer
        const countdown = ref({ days: '02', hours: '14', mins: '36', secs: '22' });
        let timerInterval = null;

        const startTimer = () => {
            let totalSeconds = 2 * 86400 + 14 * 3600 + 36 * 60 + 22;
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    const d = Math.floor(totalSeconds / 86400);
                    const h = Math.floor((totalSeconds % 86400) / 3600);
                    const m = Math.floor((totalSeconds % 3600) / 60);
                    const s = totalSeconds % 60;

                    countdown.value = {
                        days: d < 10 ? '0' + d : d.toString(),
                        hours: h < 10 ? '0' + h : h.toString(),
                        mins: m < 10 ? '0' + m : m.toString(),
                        secs: s < 10 ? '0' + s : s.toString(),
                    };
                }
            }, 1000);
        };

        const categoryPills = [
            { name: "Mobiles", slug: "mobiles", icon: "mobile-outlined" },
            { name: "Laptops", slug: "desktops", icon: "laptop-outlined" },
            { name: "Televisions", slug: "televisions", icon: "desktop-outlined" },
            { name: "Headphones", slug: "headphones", icon: "audio-outlined" },
            { name: "Smartwatches", slug: "soundbars", icon: "mobile-outlined" },
            { name: "Cameras", slug: "monitors", icon: "camera-outlined" },
            { name: "Home Appliances", slug: "furniture", icon: "home-outlined" },
            { name: "Furniture", slug: "furniture", icon: "shop-outlined" },
            { name: "Fashion", slug: "clothes", icon: "skin-outlined" },
            { name: "Beauty", slug: "clothes", icon: "smile-outlined" },
            { name: "Toys & Kids", slug: "clothes", icon: "smile-outlined" },
            { name: "More", slug: "all", icon: "appstore-outlined" },
        ];

        const defaultCategories = [
            { name: "Mobiles", slug: "mobiles", image_url: "/uploads/categories/category_5.png" },
            { name: "Laptops", slug: "desktops", image_url: "/uploads/categories/category_8.png" },
            { name: "Televisions", slug: "televisions", image_url: "/uploads/categories/category_5.png" },
            { name: "Audio", slug: "headphones", image_url: "/uploads/categories/category_18.png" },
            { name: "Cameras", slug: "monitors", image_url: "/uploads/categories/category_10.png" },
            { name: "Home Appliances", slug: "furniture", image_url: "/uploads/categories/category_3.png" },
            { name: "Furniture", slug: "furniture", image_url: "/uploads/categories/category_3.png" },
            { name: "Clothing", slug: "clothes", image_url: "/uploads/categories/category_8.png" },
            { name: "Shoes", slug: "shoes", image_url: "/uploads/categories/category_8.png" },
            { name: "Beauty", slug: "beauty", image_url: "/uploads/categories/category_18.png" },
            { name: "Toys & Kids", slug: "toys", image_url: "/uploads/categories/category_10.png" },
            { name: "Groceries", slug: "groceries", image_url: "/uploads/categories/category_3.png" },
        ];

        const heroBanners = computed(() => {
            const list = [];
            if (frontSettings.value.bottom_banners_1_details && frontSettings.value.bottom_banners_1_details.length) {
                list.push(...frontSettings.value.bottom_banners_1_details);
            }
            if (frontSettings.value.top_banners_details && frontSettings.value.top_banners_details.length) {
                frontSettings.value.top_banners_details.forEach(item => {
                    if (!list.some(b => b.url === item.url)) {
                        list.push(item);
                    }
                });
            }
            if (list.length > 0) {
                return list;
            }
            return [{ url: '/uploads/banners/hero_banner.png' }];
        });

        onMounted(() => {
            startTimer();
            window.addEventListener('resize', () => {
                windowWidth.value = window.innerWidth;
            });

            axiosFront
                .get(`front/homepage/${frontWarehouse.value.slug}`)
                .then((response) => {
                    currency.value = response.data.currency;
                    frontSettings.value = response.data.front_settings;
                    frontProductCards.value = response.data.front_product_cards;
                    featuredProducts.value =
                        frontSettings.value.featured_products_details;
                    loading.value = false;
                })
                .catch(() => {
                    loading.value = false;
                });
        });

        onUnmounted(() => {
            if (timerInterval) clearInterval(timerInterval);
        });

        const categorySlidesToShow = computed(() => {
            if (windowWidth.value <= 480) return 2;
            if (windowWidth.value <= 768) return 3;
            if (windowWidth.value <= 1024) return 4;
            return 6;
        });

        return {
            loading,
            frontSettings,
            heroBanners,
            frontProductCards,
            featuredProducts,
            currency,
            countdown,
            categoryPills,
            defaultCategories,
            frontWarehouse,
            formatAmountCurrency,
            windowWidth,
            categorySlidesToShow,
        };
    },
});
</script>

<style lang="less" scoped>
.home-page-container {
    background: #f4f6f8;
    min-height: 100vh;
    padding-bottom: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    max-width: 100%;
    overflow-x: hidden;
}

.home-wrapper {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 640px) {
        padding: 0 12px;
    }
}

/* Hero Banner Section */
.hero-banner-section {
    margin-top: 24px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        margin-top: 16px;
        margin-bottom: 24px;
    }
}

.hero-carousel {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

    :deep(.slick-dots) {
        bottom: 16px;
        li button {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 4px;
        }
        li.slick-active button {
            background: #2563eb;
            width: 24px;
        }
    }
}

.hero-slide {
    position: relative;
}

.hero-card {
    position: relative;
    min-height: 400px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 48px;
    gap: 24px;
    overflow: hidden;

    @media (max-width: 991px) {
        padding: 24px 28px;
        min-height: 340px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 20px 16px;
        min-height: auto;
        gap: 16px;
    }
}

.hero-left-content {
    flex: 1;
    max-width: 500px;
    z-index: 2;

    @media (max-width: 768px) {
        max-width: 100%;
        width: 100%;
    }

    .hero-tag {
        display: inline-block;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 1px;
        color: #38bdf8;
        text-transform: uppercase;
        margin-bottom: 6px;
    }

    .hero-title {
        font-size: 36px;
        font-weight: 900;
        color: #ffffff;
        margin: 6px 0 10px 0;
        line-height: 1.15;
        letter-spacing: -0.5px;

        @media (max-width: 991px) {
            font-size: 28px;
        }

        @media (max-width: 640px) {
            font-size: 22px;
        }

        .highlight-text {
            color: #60a5fa;
        }
    }

    .hero-sub {
        font-size: 14px;
        color: #94a3b8;
        margin-bottom: 20px;

        @media (max-width: 640px) {
            font-size: 12px;
            margin-bottom: 14px;
        }
    }

    .hero-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #2563eb;
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
        padding: 10px 24px;
        border-radius: 24px;
        text-decoration: none;
        box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
        transition: all 0.2s;

        &:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
        }
    }
}

.hero-right-media {
    flex: 1.4;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 680px;
    width: 100%;
    height: 100%;
    z-index: 2;

    @media (max-width: 768px) {
        max-width: 100%;
        height: auto;
    }
}

.hero-banner-img {
    width: 100%;
    height: 100%;
    max-height: 380px;
    object-fit: contain;
    border-radius: 14px;

    @media (max-width: 768px) {
        max-height: 220px;
    }
}

.custom-slick-arrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #0f172a;
    display: flex !important;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 3;
    transition: all 0.2s;

    &:hover {
        background: #ffffff;
        transform: scale(1.1);
    }
}

.slick-prev-btn {
    left: 20px;
}

.slick-next-btn {
    right: 20px;
}

/* Category Auto Slider Section */
.category-slider-section {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px 28px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    margin-bottom: 40px;

    @media (max-width: 768px) {
        padding: 16px;
        margin-bottom: 24px;
        border-radius: 12px;
    }
}

.category-slider-wrapper {
    position: relative;
    margin-top: 18px;
}

.category-carousel {
    position: relative;
    padding: 0 4px;

    :deep(.slick-list) {
        margin: 0 -8px;
    }

    :deep(.slick-slide) {
        padding: 0 8px;
    }

    .cat-slide-item {
        outline: none;
    }

    .avatar-cat-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        padding: 18px 10px;
        background: #f8fafc;
        border: 1px solid #f1f5f9;
        border-radius: 14px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        @media (max-width: 640px) {
            padding: 14px 8px;
            gap: 8px;
        }

        .avatar-circle {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

            @media (max-width: 640px) {
                width: 58px;
                height: 58px;
            }

            .avatar-img {
                width: 70%;
                height: 70%;
                object-fit: contain;
                transition: transform 0.3s ease;
            }
        }

        .avatar-cat-name {
            font-size: 13px;
            font-weight: 700;
            color: #0f172a;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;

            @media (max-width: 640px) {
                font-size: 11px;
            }
        }

        &:hover {
            background: #ffffff;
            border-color: #2563eb;
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
            transform: translateY(-4px);

            .avatar-circle {
                border-color: #2563eb;
                background: #eff6ff;
                transform: scale(1.05);

                .avatar-img {
                    transform: scale(1.12);
                }
            }

            .avatar-cat-name {
                color: #2563eb;
            }
        }
    }
}

/* Triple Offer Cards Row */
.triple-offers-section {
    margin-bottom: 40px;

    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
}

.triple-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 991px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}

.offer-card {
    position: relative;
    border-radius: 14px;
    padding: 28px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.dark-blue-card {
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
    color: #ffffff;
}

.light-blue-card {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.peach-card {
    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
}

.offer-card-info {
    position: relative;
    z-index: 2;
    max-width: 60%;

    .offer-card-tag {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1px;
    }

    .offer-card-title {
        font-size: 20px;
        font-weight: 800;
        margin: 4px 0;
        line-height: 1.2;
    }

    .offer-card-sub {
        font-size: 12px;
        margin-bottom: 14px;
    }

    .offer-card-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 700;
        padding: 6px 14px;
        border-radius: 16px;
        text-decoration: none;

        &.light-btn {
            background: #ffffff;
            color: #1e3a8a;
        }

        &.blue-btn {
            background: #2563eb;
            color: #ffffff;
        }
    }
}

.offer-card-img {
    height: 140px;
    width: 120px;
    object-fit: cover;
    border-radius: 8px;
}

/* Common Section Bar & Product Grid */
.store-section {
    margin-bottom: 40px;

    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
}

.section-top-bar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        margin-bottom: 14px;
    }
}

.flex-between-wrap {
    flex-wrap: wrap;
    gap: 16px;
}

.section-title {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.5px;

    @media (max-width: 640px) {
        font-size: 20px;
    }
}

.section-subtitle {
    font-size: 13px;
    color: #64748b;
    margin: 4px 0 0 0;

    @media (max-width: 640px) {
        font-size: 12px;
    }
}

.view-all-link {
    font-size: 13px;
    font-weight: 700;
    color: #2563eb;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        color: #1d4ed8;
    }
}

/* Products Grid */
.products-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 991px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    @media (max-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
}

/* Shop by Category Avatar Grid */
.category-avatar-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;

    @media (max-width: 991px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
}

.avatar-cat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    padding: 16px 12px;
    border-radius: 12px;
    border: 1px solid #f1f5f9;
    text-decoration: none;
    transition: all 0.2s;

    .avatar-circle {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        overflow: hidden;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .avatar-cat-name {
        font-size: 13px;
        font-weight: 700;
        color: #1e293b;
        text-align: center;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-color: #2563eb;
        .avatar-cat-name {
            color: #2563eb;
        }
    }
}

/* Countdown Timer Box */
.countdown-timer-box {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 8px 16px;
    border-radius: 24px;

    .timer-label {
        font-size: 12px;
        font-weight: 700;
        color: #ef4444;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .timer-units {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .time-box {
        display: flex;
        flex-direction: column;
        align-items: center;

        .time-val {
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
        }

        .time-unit {
            font-size: 9px;
            color: #64748b;
            text-transform: uppercase;
        }
    }

    .time-colon {
        font-weight: 800;
        color: #94a3b8;
    }
}

/* Double Banner Section */
.double-banner-section {
    margin-bottom: 40px;

    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
}

.double-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}

.double-banner-card {
    position: relative;
    border-radius: 16px;
    padding: 32px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    @media (max-width: 640px) {
        padding: 20px;
        height: auto;
        min-height: 180px;
    }
}

.dark-gadget-bg {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
}

.cream-home-bg {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.double-banner-info {
    position: relative;
    z-index: 2;
    max-width: 60%;

    .double-banner-title {
        font-size: 22px;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 8px;

        @media (max-width: 640px) {
            font-size: 18px;
        }
    }

    .double-banner-tag {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 16px;

        .highlight-yellow {
            color: #facc15;
        }

        @media (max-width: 640px) {
            font-size: 12px;
            margin-bottom: 12px;
        }
    }

    .double-banner-sub {
        font-size: 13px;
        margin-bottom: 16px;

        @media (max-width: 640px) {
            font-size: 12px;
            margin-bottom: 12px;
        }
    }

    .double-banner-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 700;
        padding: 8px 18px;
        border-radius: 20px;
        text-decoration: none;

        &.light-pill-btn {
            background: #ffffff;
            color: #0f172a;
        }

        &.blue-pill-btn {
            background: #2563eb;
            color: #ffffff;
        }
    }
}

.double-banner-img {
    height: 180px;
    width: 180px;
    object-fit: cover;
    border-radius: 12px;

    @media (max-width: 640px) {
        height: 120px;
        width: 120px;
    }
}

/* Guarantee Bar */
.value-guarantee-bar {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
    margin-bottom: 40px;

    @media (max-width: 768px) {
        padding: 16px;
        margin-bottom: 24px;
        border-radius: 12px;
    }
}

.guarantee-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}

.guarantee-item {
    display: flex;
    align-items: center;
    gap: 14px;

    .guarantee-icon {
        font-size: 26px;
        color: #2563eb;
    }

    .guarantee-head {
        font-size: 14px;
        font-weight: 700;
        color: #0f172a;
    }

    .guarantee-sub {
        font-size: 12px;
        color: #64748b;
    }
}
</style>
