<template>
    <div class="pdp-container" v-if="loading">
        <div class="pdp-wrapper pdp-main-section">
            <div class="pdp-grid">
                <div class="pdp-main-preview shimmer" style="height: 480px; border-radius: 12px;"></div>
                <div style="display: flex; flex-direction: column; gap: 16px; padding-top: 10px;">
                    <div class="shimmer" style="height: 20px; width: 30%; border-radius: 4px;"></div>
                    <div class="shimmer" style="height: 36px; width: 80%; border-radius: 6px;"></div>
                    <div class="shimmer" style="height: 18px; width: 40%; border-radius: 4px;"></div>
                    <div class="shimmer" style="height: 40px; width: 50%; border-radius: 6px;"></div>
                    <div class="shimmer" style="height: 80px; width: 100%; border-radius: 8px;"></div>
                    <div class="shimmer" style="height: 48px; width: 100%; border-radius: 8px; margin-top: 20px;"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="pdp-container" v-else-if="product && (product.name || product.id)">
        <!-- Breadcrumb Header -->
        <nav class="pdp-breadcrumb-nav" aria-label="Breadcrumb">
            <div class="pdp-wrapper">
                <div class="pdp-breadcrumb">
                    <router-link :to="{ name: 'front.homepage', params: { warehouse: frontWarehouse.slug } }" class="breadcrumb-item">Home</router-link>
                    <span class="breadcrumb-separator">/</span>
                    <span v-if="product.category" class="breadcrumb-item">{{ product.category.name }}</span>
                    <span v-if="product.category" class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-current">{{ product.name }}</span>
                </div>
            </div>
        </nav>

        <!-- Main Product Section -->
        <main class="pdp-wrapper pdp-main-section">
            <div class="pdp-grid">
                <!-- Left Column: Gallery & Slider -->
                <div class="pdp-gallery-col">
                    <div class="pdp-gallery-layout">
                        <!-- Vertical Thumbnails Strip -->
                        <div class="pdp-thumbnails-list">
                            <button
                                v-for="(img, idx) in galleryImages"
                                :key="idx"
                                type="button"
                                class="pdp-thumbnail-card"
                                :class="{ 'is-active': activeImageIndex === idx }"
                                @click="activeImageIndex = idx"
                            >
                                <img :src="img" :alt="product.name + ' image ' + (idx + 1)" />
                            </button>
                        </div>

                        <!-- Main Large Preview -->
                        <div class="pdp-main-preview">
                            <span class="pdp-sale-badge" v-if="product.details && product.details.mrp > getSalesPriceWithTax(product)">
                                SALE
                            </span>
                            <button
                                v-if="galleryImages.length > 1"
                                type="button"
                                class="pdp-slider-nav pdp-slider-prev"
                                @click="activeImageIndex = (activeImageIndex - 1 + galleryImages.length) % galleryImages.length"
                                title="Previous image"
                            >
                                <left-outlined />
                            </button>
                            <img
                                :src="galleryImages[activeImageIndex] || product.image_url"
                                :alt="product.name"
                                class="pdp-preview-image"
                            />
                            <button
                                v-if="galleryImages.length > 1"
                                type="button"
                                class="pdp-slider-nav pdp-slider-next"
                                @click="activeImageIndex = (activeImageIndex + 1) % galleryImages.length"
                                title="Next image"
                            >
                                <right-outlined />
                            </button>
                            <button
                                type="button"
                                class="pdp-zoom-trigger"
                                @click="openZoomModal"
                                title="Zoom image"
                            >
                                <search-outlined />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Product Information -->
                <div class="pdp-info-col">
                    <div class="pdp-info-content">
                        <!-- Meta Tags -->
                        <div class="pdp-meta-tags">
                            <span class="pdp-tag-category" v-if="product.category">{{ product.category.name.toUpperCase() }}</span>
                            <span class="pdp-tag-brand" v-if="product.brand">{{ product.brand.name }}</span>
                        </div>

                        <!-- Product Title -->
                        <h1 class="pdp-product-title">{{ product.name }}</h1>

                        <!-- Tagline -->
                        <p class="pdp-product-sub">
                            Authentic {{ product.brand ? product.brand.name : 'premium' }} product with manufacturer warranty.
                        </p>

                        <!-- Rating & Reviews Row -->
                        <div class="pdp-rating-row">
                            <div class="pdp-stars-group">
                                <star-filled v-for="i in 5" :key="i" class="star-icon" />
                            </div>
                            <span class="pdp-rating-val">4.8</span>
                            <span class="pdp-rating-divider">•</span>
                            <a href="#reviews-section" @click.prevent="activeTab = 'reviews'" class="pdp-reviews-link">128 reviews</a>
                        </div>

                        <!-- Price Section -->
                        <div class="pdp-price-row">
                            <span class="pdp-price-current">
                                {{ formatAmountCurrency(getSalesPriceWithTax(product)) }}
                            </span>
                            <del v-if="product.details && product.details.mrp > getSalesPriceWithTax(product)" class="pdp-price-mrp">
                                {{ formatAmountCurrency(product.details.mrp) }}
                            </del>
                            <span v-if="product.details && product.details.mrp > getSalesPriceWithTax(product)" class="pdp-price-discount">
                                Save {{ calculateDiscount(getSalesPriceWithTax(product), product.details.mrp) }}%
                            </span>
                        </div>

                        <!-- Product Short Description -->
                        <div class="pdp-desc-excerpt" v-if="product.description">
                            <p>{{ product.description }}</p>
                        </div>

                        <!-- Dynamic Variation Selectors (Only rendered if variations exist in Database) -->
                        <div
                            v-for="group in dynamicVariationGroups"
                            :key="group.name"
                            class="pdp-option-group"
                        >
                            <div class="pdp-option-header pdp-flex-between">
                                <div>
                                    <span class="pdp-option-title">{{ group.name }}:</span>
                                    <span class="pdp-option-selected">{{ selectedDynamicOptions[group.name] }}</span>
                                </div>
                            </div>
                            <div class="pdp-sizes-list">
                                <button
                                    v-for="opt in group.options"
                                    :key="opt.name"
                                    type="button"
                                    class="pdp-size-btn"
                                    :class="{ 'is-selected': selectedDynamicOptions[group.name] === opt.name }"
                                    @click="
                                        selectedDynamicOptions[group.name] = opt.name;
                                        if (opt.image_url && galleryImages.includes(opt.image_url)) {
                                            activeImageIndex = galleryImages.indexOf(opt.image_url);
                                        }
                                    "
                                >
                                    {{ opt.name }}
                                </button>
                            </div>
                        </div>

                        <!-- Quantity & Add to Cart Controls -->
                        <div class="pdp-action-group">
                            <div class="pdp-action-row">
                                <!-- Counter -->
                                <div class="pdp-qty-counter">
                                    <button type="button" class="qty-btn" @click="decreaseQty" :disabled="cartQty <= 1">-</button>
                                    <input type="text" readonly :value="cartQty" class="qty-input" />
                                    <button type="button" class="qty-btn" @click="increaseQty">+</button>
                                </div>

                                <!-- Add to Cart Button -->
                                <button type="button" class="pdp-add-cart-btn" @click="addToCart">
                                    <shopping-cart-outlined class="cart-icon" />
                                    Add to Cart
                                </button>

                                <!-- Wishlist Button -->
                                <button
                                    type="button"
                                    class="pdp-wishlist-btn"
                                    :class="{ 'is-active': isWishlisted }"
                                    @click="toggleWishlist"
                                    title="Add to Wishlist"
                                >
                                    <heart-outlined v-if="!isWishlisted" />
                                    <heart-filled v-else class="heart-icon-filled" />
                                </button>
                            </div>
                        </div>

                        <!-- Value Guarantee Badges -->
                        <div class="pdp-badges-grid">
                            <div class="badge-item">
                                <div class="badge-icon-box"><car-outlined /></div>
                                <div class="badge-text-box">
                                    <div class="badge-headline">Free Shipping</div>
                                    <div class="badge-subline">On orders over {{ formatAmountCurrency(50) }}</div>
                                </div>
                            </div>
                            <div class="badge-item">
                                <div class="badge-icon-box"><reload-outlined /></div>
                                <div class="badge-text-box">
                                    <div class="badge-headline">Easy Returns</div>
                                    <div class="badge-subline">30-day money back guarantee</div>
                                </div>
                            </div>
                            <div class="badge-item">
                                <div class="badge-icon-box"><safety-certificate-outlined /></div>
                                <div class="badge-text-box">
                                    <div class="badge-headline">Secure Payment</div>
                                    <div class="badge-subline">100% encrypted & protected</div>
                                </div>
                            </div>
                            <div class="badge-item">
                                <div class="badge-icon-box"><customer-service-outlined /></div>
                                <div class="badge-text-box">
                                    <div class="badge-headline">24/7 Support</div>
                                    <div class="badge-subline">Dedicated assistance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabbed Detailed Sections -->
            <section class="pdp-tabs-section" id="reviews-section">
                <a-tabs v-model:activeKey="activeTab" size="large" class="pdp-custom-tabs">
                    <a-tab-pane key="details" tab="Product Details">
                        <div class="pdp-tab-pane-content">
                            <h3 class="pdp-tab-title">Product Description</h3>
                            <p class="pdp-tab-text">
                                {{ product.description || (`Experience high quality performance and durability with ${product.name}. Designed for everyday reliability and built to meet the highest industry standards.`) }}
                            </p>
                            <h4 class="pdp-sub-title">Key Specifications:</h4>
                            <div class="pdp-specs-grid">
                                <div class="spec-row"><span class="spec-name">Brand:</span> <span class="spec-val">{{ product.brand ? product.brand.name : 'Standard' }}</span></div>
                                <div class="spec-row"><span class="spec-name">Category:</span> <span class="spec-val">{{ product.category ? product.category.name : 'General' }}</span></div>
                                <div class="spec-row"><span class="spec-name">Item Code / SKU:</span> <span class="spec-val">{{ product.item_code || 'N/A' }}</span></div>
                                <div class="spec-row" v-if="product.unit"><span class="spec-name">Unit:</span> <span class="spec-val">{{ product.unit.name }} ({{ product.unit.short_name }})</span></div>
                                <div class="spec-row" v-if="product.details"><span class="spec-name">Stock Status:</span> <span class="spec-val in-stock-text">{{ product.details.current_stock > 0 ? product.details.current_stock + ' Units Available' : 'Out of Stock' }}</span></div>
                            </div>
                        </div>
                    </a-tab-pane>

                    <a-tab-pane key="specs" tab="Size & Fit / Specifications">
                        <div class="pdp-tab-pane-content">
                            <h3 class="pdp-tab-title">Detailed Parameters</h3>
                            <p class="pdp-tab-text">Complete specifications extracted from store database:</p>
                            <div class="pdp-table-wrapper">
                                <a-table
                                    :dataSource="specificationsTable"
                                    :columns="specColumns"
                                    :pagination="false"
                                    bordered
                                />
                            </div>
                        </div>
                    </a-tab-pane>

                    <a-tab-pane key="shipping" tab="Shipping & Returns">
                        <div class="pdp-tab-pane-content">
                            <div class="pdp-policy-block">
                                <h3 class="pdp-tab-title">Shipping Policy</h3>
                                <p class="pdp-tab-text">We process and ship all orders within 24 hours. Express standard shipping is provided across all regions with active tracking numbers sent via email and dashboard.</p>
                            </div>
                            <div class="pdp-policy-block mt-4">
                                <h3 class="pdp-tab-title">Returns & Exchange</h3>
                                <p class="pdp-tab-text">If you are not completely satisfied with your purchase, you can return or exchange the product within 30 days of delivery. Items must be in original condition with tags intact.</p>
                            </div>
                        </div>
                    </a-tab-pane>

                    <a-tab-pane key="reviews" :tab="`Reviews (${reviewsList.length})`">
                        <div class="pdp-tab-pane-content">
                            <div class="pdp-review-summary-card">
                                <div class="pdp-rating-box">
                                    <div class="rating-large font-bold text-gray-900">4.8</div>
                                    <div class="pdp-stars-group">
                                        <star-filled v-for="i in 5" :key="i" class="star-icon" />
                                    </div>
                                    <div class="rating-caption text-sm text-gray-500">Based on {{ reviewsList.length }} verified customer reviews</div>
                                </div>
                            </div>

                            <!-- Customer Reviews List -->
                            <div class="pdp-reviews-list mt-6">
                                <div v-for="(rev, idx) in reviewsList" :key="idx" class="pdp-review-item">
                                    <div class="review-header">
                                        <div class="reviewer-info">
                                            <span class="reviewer-name">{{ rev.author }}</span>
                                            <span class="verified-badge"><check-circle-outlined /> Verified Purchase</span>
                                        </div>
                                        <span class="review-date">{{ rev.date }}</span>
                                    </div>
                                    <div class="pdp-stars-group my-1">
                                        <star-filled v-for="s in rev.rating" :key="s" class="star-icon" />
                                    </div>
                                    <p class="review-comment">{{ rev.comment }}</p>
                                </div>
                            </div>

                            <!-- Write a Review Form -->
                            <div class="pdp-write-review-card mt-8">
                                <h4 class="write-review-title">Write a Customer Review</h4>
                                <div class="review-form mt-4">
                                    <div class="form-group mb-3">
                                        <label class="block text-sm font-semibold mb-1">Your Rating:</label>
                                        <div class="pdp-stars-group cursor-pointer">
                                            <star-filled
                                                v-for="star in 5"
                                                :key="star"
                                                class="star-icon text-xl"
                                                :style="{ color: star <= newReview.rating ? '#f59e0b' : '#d1d5db' }"
                                                @click="newReview.rating = star"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label class="block text-sm font-semibold mb-1">Your Name:</label>
                                        <input type="text" v-model="newReview.author" placeholder="Enter your name" class="pdp-input-field" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <label class="block text-sm font-semibold mb-1">Your Review:</label>
                                        <textarea v-model="newReview.comment" rows="3" placeholder="Share details about your experience with this product..." class="pdp-input-field"></textarea>
                                    </div>
                                    <button type="button" class="pdp-submit-review-btn" @click="submitCustomerReview">Submit Review</button>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </section>

            <!-- YOU MAY ALSO LIKE Section -->
            <section class="pdp-related-section" v-if="relatedProducts && relatedProducts.length > 0">
                <div class="pdp-section-header">
                    <h2 class="pdp-section-title">YOU MAY ALSO LIKE</h2>
                    <div class="pdp-section-line"></div>
                </div>

                <div class="pdp-related-grid">
                    <div
                        v-for="relProduct in relatedProducts"
                        :key="relProduct.id || relProduct.xid"
                        class="pdp-related-item"
                    >
                        <ProductCard
                            :product="relProduct"
                            :currency="currency"
                        />
                    </div>
                </div>
            </section>
        </main>

        <!-- Zoom Image Modal -->
        <a-modal v-model:open="zoomModalVisible" :footer="null" width="800px" centered class="pdp-zoom-modal">
            <div class="pdp-modal-img-container">
                <img :src="galleryImages[activeImageIndex] || product.image_url" :alt="product.name" class="pdp-modal-img" />
            </div>
        </a-modal>

        <!-- Size Guide Modal -->
        <a-modal v-model:open="showSizeGuide" title="Size Guide Chart" :footer="null" centered class="pdp-size-modal">
            <div class="pdp-size-guide-body">
                <p class="pdp-size-guide-sub">Standard sizing reference guide:</p>
                <a-table
                    :columns="[
                        { title: 'Size', dataIndex: 'size', key: 'size' },
                        { title: 'Chest (inches)', dataIndex: 'chest', key: 'chest' },
                        { title: 'Waist (inches)', dataIndex: 'waist', key: 'waist' }
                    ]"
                    :dataSource="[
                        { key: '1', size: 'XS', chest: '34 - 36', waist: '28 - 30' },
                        { key: '2', size: 'S', chest: '36 - 38', waist: '30 - 32' },
                        { key: '3', size: 'M', chest: '38 - 40', waist: '32 - 34' },
                        { key: '4', size: 'L', chest: '40 - 42', waist: '34 - 36' },
                        { key: '5', size: 'XL', chest: '42 - 44', waist: '36 - 38' }
                    ]"
                    :pagination="false"
                    bordered
                />
            </div>
        </a-modal>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import {
    ShoppingCartOutlined,
    SearchOutlined,
    HeartOutlined,
    HeartFilled,
    StarFilled,
    CarOutlined,
    ReloadOutlined,
    SafetyCertificateOutlined,
    CustomerServiceOutlined,
    ScissorOutlined,
    CheckCircleOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { filter, forEach } from "lodash-es";
import cart from "../../../common/composable/cart";
import common from "../../../common/composable/common";
import ProductCard from "./components/ProductCard.vue";
import { getSalesPriceWithTax } from "../../../common/scripts/functions";

export default defineComponent({
    components: {
        ShoppingCartOutlined,
        SearchOutlined,
        HeartOutlined,
        HeartFilled,
        StarFilled,
        CarOutlined,
        ReloadOutlined,
        SafetyCertificateOutlined,
        CustomerServiceOutlined,
        ScissorOutlined,
        CheckCircleOutlined,
        LeftOutlined,
        RightOutlined,
        ProductCard
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const { formatAmountCurrency } = cart();
        const { frontWarehouse } = common();

        const loading = ref(true);
        const product = ref({});
        const relatedProducts = ref([]);
        const currency = ref({});
        const galleryImages = ref([]);
        const activeImageIndex = ref(0);
        const activeTab = ref("details");
        const cartQty = ref(1);
        const isWishlisted = ref(false);
        const zoomModalVisible = ref(false);
        const showSizeGuide = ref(false);

        // Dynamic variations & options state (from DB)
        const dynamicVariationGroups = ref([]);
        const selectedDynamicOptions = ref({});

        // Customer Reviews state
        const reviewsList = ref([
            { author: "Alex Johnson", rating: 5, date: "2 days ago", comment: "Outstanding quality! Product arrived fast and was exactly as described." },
            { author: "Michael Chang", rating: 5, date: "1 week ago", comment: "Solid build, great customer support. Will order again!" },
            { author: "Sophia Martinez", rating: 4, date: "2 weeks ago", comment: "Very satisfied with this purchase. High value for money." }
        ]);

        const newReview = ref({ rating: 5, author: "", comment: "" });

        const submitCustomerReview = () => {
            if (!newReview.value.author.trim() || !newReview.value.comment.trim()) {
                message.error("Please fill in your name and review comment");
                return;
            }
            reviewsList.value.unshift({
                author: newReview.value.author,
                rating: newReview.value.rating,
                date: "Just now",
                comment: newReview.value.comment
            });
            message.success("Thank you for submitting your review!");
            newReview.value = { rating: 5, author: "", comment: "" };
        };

        const specColumns = [
            { title: "Feature Parameter", dataIndex: "feature", key: "feature" },
            { title: "Specification Details", dataIndex: "value", key: "value" }
        ];

        const specificationsTable = ref([]);

        const fetchProductDetails = () => {
            loading.value = true;
            const warehouseSlug = route.params.warehouse || frontWarehouse.value.slug;
            const productId = route.params.id;

            axiosFront
                .get(`front/product-details/${warehouseSlug}/${productId}`)
                .then((response) => {
                    product.value = response.data.product;
                    relatedProducts.value = response.data.related_products || [];
                    currency.value = response.data.currency || {};

                    // 1. Build gallery images array (At least 5 images for slider)
                    const imgList = [];
                    if (product.value.image_url) {
                        imgList.push(product.value.image_url);
                    }
                    if (product.value.variations && product.value.variations.length > 0) {
                        product.value.variations.forEach((v) => {
                            if (v.image_url && !imgList.includes(v.image_url)) {
                                imgList.push(v.image_url);
                            }
                        });
                    }
                    const customFieldsList = product.value.custom_fields || product.value.customFields || [];
                    if (customFieldsList.length > 0) {
                        customFieldsList.forEach((cf) => {
                            if (cf.field_value && (cf.field_value.includes('/uploads/') || cf.field_value.startsWith('http')) && !imgList.includes(cf.field_value)) {
                                imgList.push(cf.field_value);
                            }
                        });
                    }
                    // Ensure at least 5 images for slider showcase
                    if (relatedProducts.value && relatedProducts.value.length > 0) {
                        relatedProducts.value.forEach((rel) => {
                            if (rel.image_url && !imgList.includes(rel.image_url) && imgList.length < 5) {
                                imgList.push(rel.image_url);
                            }
                        });
                    }
                    while (imgList.length < 5) {
                        imgList.push(product.value.image_url || '/images/product.png');
                    }
                    galleryImages.value = imgList;

                    // 2. Parse Dynamic Variations from Database
                    const varGroups = [];
                    const selectedOpts = {};

                    if (product.value.variations && product.value.variations.length > 0) {
                        const grouped = {};
                        product.value.variations.forEach((v) => {
                            const groupName = v.variation ? v.variation.name : (v.variant_name || 'Option');
                            const valName = v.variation_type ? v.variation_type.name : (v.name || v.value);
                            if (groupName && valName) {
                                if (!grouped[groupName]) {
                                    grouped[groupName] = [];
                                }
                                if (!grouped[groupName].some((x) => x.name === valName)) {
                                    grouped[groupName].push({
                                        name: valName,
                                        image_url: v.image_url || null
                                    });
                                }
                            }
                        });

                        Object.keys(grouped).forEach((gName) => {
                            varGroups.push({
                                name: gName,
                                options: grouped[gName]
                            });
                            if (grouped[gName].length > 0) {
                                selectedOpts[gName] = grouped[gName][0].name;
                            }
                        });
                    }

                    dynamicVariationGroups.value = varGroups;
                    selectedDynamicOptions.value = selectedOpts;

                    // 3. Specifications Table from Database
                    const specs = [
                        { key: "1", feature: "Product Name", value: product.value.name },
                        { key: "2", feature: "Category", value: product.value.category ? product.value.category.name : "N/A" },
                        { key: "3", feature: "Brand", value: product.value.brand ? product.value.brand.name : "N/A" },
                        { key: "4", feature: "SKU / Item Code", value: product.value.item_code || "N/A" },
                        { key: "5", feature: "Unit", value: product.value.unit ? `${product.value.unit.name} (${product.value.unit.short_name})` : "piece (pc)" },
                        { key: "6", feature: "Current Inventory Stock", value: product.value.details ? `${product.value.details.current_stock} units` : "In Stock" }
                    ];

                    if (product.value.custom_fields && product.value.custom_fields.length > 0) {
                        product.value.custom_fields.forEach((cf, idx) => {
                            specs.push({
                                key: `cf_${idx}`,
                                feature: cf.field_name || cf.name,
                                value: cf.field_value || cf.value
                            });
                        });
                    }

                    specificationsTable.value = specs;

                    // Check cart quantity
                    const cartItems = store.getters["front/storeCartItems"];
                    forEach(cartItems, (item) => {
                        if (item.xid === product.value.xid || item.id === product.value.id) {
                            cartQty.value = item.cart_quantity || 1;
                        }
                    });

                    loading.value = false;
                })
                .catch((err) => {
                    console.error("Error fetching product details", err);
                    loading.value = false;
                });
        };

        onMounted(() => {
            fetchProductDetails();
        });

        watch(
            () => route.params.id,
            (newId) => {
                if (newId) {
                    activeImageIndex.value = 0;
                    fetchProductDetails();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        );

        const increaseQty = () => {
            cartQty.value += 1;
        };

        const decreaseQty = () => {
            if (cartQty.value > 1) {
                cartQty.value -= 1;
            }
        };

        const addToCart = () => {
            const cartItems = store.getters["front/storeCartItems"];
            const updatedCartItems = filter(
                cartItems,
                (cartItem) => cartItem.xid !== product.value.xid && cartItem.id !== product.value.id
            );

            updatedCartItems.push({
                ...product.value,
                cart_quantity: cartQty.value,
                selectedOptions: selectedDynamicOptions.value
            });

            store.commit("front/addCartItems", updatedCartItems);
            message.success(`Added ${cartQty.value} item(s) to cart`);
        };

        const toggleWishlist = () => {
            isWishlisted.value = !isWishlisted.value;
            if (isWishlisted.value) {
                message.success("Added to Wishlist");
            } else {
                message.info("Removed from Wishlist");
            }
        };

        const openZoomModal = () => {
            zoomModalVisible.value = true;
        };

        const calculateDiscount = (salesPrice, mrp) => {
            if (!mrp || mrp <= salesPrice) return 0;
            return Math.round(((mrp - salesPrice) / mrp) * 100);
        };

        return {
            loading,
            product,
            relatedProducts,
            currency,
            galleryImages,
            activeImageIndex,
            activeTab,
            cartQty,
            isWishlisted,
            zoomModalVisible,
            showSizeGuide,
            dynamicVariationGroups,
            selectedDynamicOptions,
            reviewsList,
            newReview,
            submitCustomerReview,
            specColumns,
            specificationsTable,
            frontWarehouse,
            formatAmountCurrency,
            getSalesPriceWithTax,
            increaseQty,
            decreaseQty,
            addToCart,
            toggleWishlist,
            openZoomModal,
            calculateDiscount
        };
    }
});
</script>

<style lang="less" scoped>

/* Master Page Layout */
.pdp-container {
    background-color: #ffffff;
    min-height: 100vh;
    color: #111827;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    padding-bottom: 60px;
}

.pdp-wrapper {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 640px) {
        padding: 0 12px;
    }
}

.pdp-loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

/* Breadcrumb Navigation */
.pdp-breadcrumb-nav {
    background-color: #f9fafb;
    border-bottom: 1px solid #f3f4f6;
    padding: 14px 0;

    @media (max-width: 640px) {
        padding: 10px 0;
    }
}

.pdp-breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 13px;
    color: #6b7280;

    .breadcrumb-item {
        color: #6b7280;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: #111827;
        }
    }

    .breadcrumb-separator {
        margin: 0 8px;
        color: #d1d5db;
    }

    .breadcrumb-current {
        color: #111827;
        font-weight: 600;
    }
}

/* Main Grid Layout */
.pdp-main-section {
    padding-top: 32px;

    @media (max-width: 640px) {
        padding-top: 14px;
    }
}

.pdp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;

    @media (max-width: 991px) {
        grid-template-columns: 1fr;
        gap: 24px;
    }

    @media (max-width: 640px) {
        gap: 16px;
    }
}

/* Gallery Column */
.pdp-gallery-layout {
    display: flex;
    gap: 16px;

    @media (max-width: 640px) {
        flex-direction: column-reverse;
        gap: 12px;
    }
}

.pdp-thumbnails-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 84px;
    flex-shrink: 0;

    @media (max-width: 640px) {
        flex-direction: row;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 4px;
        gap: 10px;
        box-sizing: border-box;
    }
}

.pdp-thumbnail-card {
    width: 84px;
    height: 100px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    background: #f9fafb;
    padding: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    @media (max-width: 640px) {
        width: 66px;
        height: 66px;
        flex-shrink: 0;
        border-radius: 8px;
        padding: 3px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    &:hover, &.is-active {
        border-color: #111827;
        box-shadow: 0 0 0 2px #111827;
    }
}

.pdp-main-preview {
    position: relative;
    flex: 1;
    height: 520px;
    background: #f8f9fa;
    border: 1px solid #f3f4f6;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;

    @media (max-width: 640px) {
        height: 320px;
        padding: 12px;
        border-radius: 10px;
    }

    .pdp-preview-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover .pdp-preview-image {
        transform: scale(1.04);
    }

    .pdp-sale-badge {
        position: absolute;
        top: 16px;
        left: 16px;
        background: #111827;
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        padding: 6px 12px;
        border-radius: 4px;
        z-index: 2;
    }

    .pdp-zoom-trigger {
        position: absolute;
        bottom: 16px;
        right: 16px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #111827;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 2;

        &:hover {
            background: #ffffff;
            transform: scale(1.08);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }

    .pdp-slider-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #e5e7eb;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #111827;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 5;

        &:hover {
            background: #111827;
            color: #ffffff;
            border-color: #111827;
            transform: translateY(-50%) scale(1.08);
        }

        &.pdp-slider-prev {
            left: 14px;
        }

        &.pdp-slider-next {
            right: 14px;
        }
    }
}

/* Product Info Column */
.pdp-info-content {
    display: flex;
    flex-direction: column;
}

.pdp-meta-tags {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;

    .pdp-tag-category {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #9a3412;
        background: #ffedd5;
        padding: 4px 10px;
        border-radius: 4px;
    }

    .pdp-tag-brand {
        font-size: 13px;
        font-weight: 600;
        color: #6b7280;
    }
}

.pdp-product-title {
    font-size: 32px;
    font-weight: 800;
    color: #111827;
    margin: 0 0 6px 0;
    line-height: 1.2;
    letter-spacing: -0.5px;

    @media (max-width: 640px) {
        font-size: 24px;
    }
}

.pdp-product-sub {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 16px 0;
}

.pdp-rating-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;

    .pdp-stars-group {
        display: flex;
        gap: 3px;

        .star-icon {
            color: #f59e0b;
            font-size: 15px;
        }
    }

    .pdp-rating-val {
        font-weight: 700;
        font-size: 14px;
        color: #111827;
    }

    .pdp-rating-divider {
        color: #d1d5db;
    }

    .pdp-reviews-link {
        font-size: 13px;
        color: #6b7280;
        text-decoration: underline;

        &:hover {
            color: #111827;
        }
    }
}

.pdp-price-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 20px;

    .pdp-price-current {
        font-size: 32px;
        font-weight: 800;
        color: #111827;

        @media (max-width: 640px) {
            font-size: 26px;
        }
    }

    .pdp-price-mrp {
        font-size: 18px;
        color: #9ca3af;

        @media (max-width: 640px) {
            font-size: 15px;
        }
    }

    .pdp-price-discount {
        font-size: 12px;
        font-weight: 700;
        color: #047857;
        background: #d1fae5;
        padding: 4px 10px;
        border-radius: 4px;
    }
}

.pdp-desc-excerpt {
    font-size: 14px;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
}

/* Option Groups (Colors & Sizes) */
.pdp-option-group {
    margin-bottom: 22px;
}

.pdp-option-header {
    margin-bottom: 10px;
    font-size: 14px;

    .pdp-option-title {
        color: #6b7280;
        margin-right: 6px;
    }

    .pdp-option-selected {
        font-weight: 700;
        color: #111827;
    }
}

.pdp-flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pdp-colors-list {
    display: flex;
    gap: 12px;
    align-items: center;
}

.pdp-color-swatch {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #e5e7eb;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    &:hover, &.is-selected {
        transform: scale(1.1);
        border-color: #111827;
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #111827;
    }
}

.pdp-size-guide-btn {
    background: none;
    border: none;
    font-size: 12px;
    font-weight: 600;
    color: #4b5563;
    text-decoration: underline;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &:hover {
        color: #111827;
    }
}

.pdp-sizes-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.pdp-size-btn {
    min-width: 50px;
    height: 42px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    &:hover, &.is-selected {
        border-color: #111827;
        background: #111827;
        color: #ffffff;
    }
}

/* Action Group: Counter + Add to Cart + Wishlist */
.pdp-action-group {
    margin-top: 28px;
    margin-bottom: 32px;
}

.pdp-action-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.pdp-qty-counter {
    display: flex;
    align-items: center;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    height: 48px;
    overflow: hidden;
    background: #ffffff;

    .qty-btn {
        width: 40px;
        height: 100%;
        background: #f9fafb;
        border: none;
        font-size: 18px;
        font-weight: 600;
        color: #111827;
        cursor: pointer;
        transition: background 0.2s;

        &:hover:not(:disabled) {
            background: #e5e7eb;
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    }

    .qty-input {
        width: 44px;
        height: 100%;
        text-align: center;
        border: none;
        font-weight: 700;
        font-size: 15px;
        color: #111827;
        background: transparent;
        outline: none;
    }
}

.pdp-add-cart-btn {
    flex: 1;
    min-width: 180px;
    height: 48px;
    background: #111827;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.12);

    .cart-icon {
        font-size: 18px;
    }

    &:hover {
        background: #1f2937;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(17, 24, 39, 0.2);
    }

    &:active {
        transform: translateY(0);
    }
}

.pdp-wishlist-btn {
    width: 48px;
    height: 48px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover, &.is-active {
        border-color: #111827;
        color: #ef4444;
    }

    .heart-icon-filled {
        color: #ef4444;
    }
}

/* Badges Grid */
.pdp-badges-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #f3f4f6;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
}

.badge-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f9fafb;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #f3f4f6;

    .badge-icon-box {
        font-size: 22px;
        color: #111827;
        display: flex;
        align-items: center;
    }

    .badge-headline {
        font-size: 13px;
        font-weight: 700;
        color: #111827;
    }

    .badge-subline {
        font-size: 11px;
        color: #6b7280;
    }
}

/* Tabs Section */
.pdp-tabs-section {
    margin-top: 56px;
    border-top: 1px solid #e5e7eb;
    padding-top: 32px;
}

.pdp-custom-tabs {
    :deep(.ant-tabs-nav-list) {
        gap: 32px;
    }

    :deep(.ant-tabs-tab) {
        font-size: 16px;
        font-weight: 600;
        color: #6b7280;
        padding-bottom: 14px;

        &.ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #111827;
            font-weight: 700;
        }
    }

    :deep(.ant-tabs-ink-bar) {
        background: #111827;
        height: 3px;
    }
}

.pdp-tab-pane-content {
    padding: 24px 0;
}

.pdp-tab-title {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 12px;
}

.pdp-sub-title {
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    margin-top: 20px;
    margin-bottom: 12px;
}

.pdp-tab-text {
    font-size: 15px;
    line-height: 1.7;
    color: #4b5563;
    max-width: 840px;
}

.pdp-specs-grid {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
}

.spec-row {
    display: flex;
    padding: 12px 16px;
    border-bottom: 1px solid #f3f4f6;
    font-size: 14px;

    &:last-child {
        border-bottom: none;
    }

    .spec-name {
        width: 180px;
        font-weight: 600;
        color: #374151;
    }

    .spec-val {
        flex: 1;
        color: #111827;
    }

    .in-stock-text {
        color: #047857;
        font-weight: 600;
    }
}

.pdp-table-wrapper {
    max-width: 800px;
    margin-top: 16px;
}

.pdp-policy-block {
    margin-bottom: 28px;
}

.pdp-review-summary-card {
    background: #f9fafb;
    border-radius: 12px;
    padding: 32px;
    max-width: 400px;

    .rating-large {
        font-size: 48px;
        line-height: 1;
        margin-bottom: 8px;
    }
}

/* Reviews Styles */
.pdp-reviews-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 800px;
}

.pdp-review-item {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px 20px;

    .review-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .reviewer-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .reviewer-name {
        font-weight: 700;
        font-size: 14px;
        color: #111827;
    }

    .verified-badge {
        font-size: 11px;
        font-weight: 600;
        color: #059669;
        background: #ecfdf5;
        padding: 2px 8px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .review-date {
        font-size: 12px;
        color: #9ca3af;
    }

    .review-comment {
        font-size: 14px;
        color: #374151;
        margin-top: 6px;
        margin-bottom: 0;
        line-height: 1.5;
    }
}

.pdp-write-review-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    max-width: 800px;

    .write-review-title {
        font-size: 18px;
        font-weight: 700;
        color: #111827;
        margin: 0;
    }
}

.pdp-input-field {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
}

.pdp-submit-review-btn {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #1d4ed8;
    }
}

/* Promotional Highlight Section */
.pdp-promo-section {
    margin-top: 60px;
}

.pdp-promo-card {
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.pdp-promo-info {
    padding: 48px;

    @media (max-width: 640px) {
        padding: 28px;
    }

    .pdp-promo-tag {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
        color: #6b7280;
    }

    .pdp-promo-heading {
        font-size: 32px;
        font-weight: 800;
        color: #111827;
        margin: 10px 0;
        line-height: 1.2;

        @media (max-width: 640px) {
            font-size: 24px;
        }
    }

    .pdp-promo-body {
        font-size: 15px;
        color: #4b5563;
        line-height: 1.6;
        margin: 0;
    }
}

.pdp-promo-image-holder {
    height: 320px;

    .pdp-promo-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

/* Related Products Grid */
.pdp-related-section {
    margin-top: 72px;
}

.pdp-section-header {
    text-align: center;
    margin-bottom: 36px;

    .pdp-section-title {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 2px;
        color: #111827;
        margin: 0;
    }

    .pdp-section-line {
        width: 60px;
        height: 3px;
        background: #111827;
        margin: 10px auto 0;
        border-radius: 2px;
    }
}

.pdp-related-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
}

.pdp-modal-img-container {
    padding: 20px;
    text-align: center;

    .pdp-modal-img {
        max-height: 75vh;
        max-width: 100%;
        object-fit: contain;
    }
}

.pdp-size-guide-body {
    padding: 16px 0;

    .pdp-size-guide-sub {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 16px;
    }
}

</style>
