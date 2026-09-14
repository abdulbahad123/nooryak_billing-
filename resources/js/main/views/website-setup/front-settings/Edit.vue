<template>
    <AdminPageHeader>
        <template #header>
            <a-page-header :title="$t(`menu.front_settings`)" class="p-0" />
        </template>
        <template #breadcrumb>
            <a-breadcrumb separator="-" style="font-size: 12px">
                <a-breadcrumb-item>
                    <router-link :to="{ name: 'admin.dashboard.index' }">
                        {{ $t(`menu.dashboard`) }}
                    </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ $t("menu.website_setup") }}
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ $t("menu.front_settings") }}
                </a-breadcrumb-item>
            </a-breadcrumb>
        </template>
    </AdminPageHeader>

    <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4" class="bg-setting-sidebar">
            <div class="setting-sidebar">
                <perfect-scrollbar
                    :options="{
                        wheelSpeed: 1,
                        swipeEasing: true,
                        suppressScrollX: true,
                    }"
                >
                    <a-menu v-model:selectedKeys="activeKey">
                        <a-menu-item key="featured_categories">
                            {{ $t("front_setting.featured_categories") }}
                        </a-menu-item>
                        <a-menu-item key="featured_producs">
                            {{ $t("front_setting.featured_products") }}
                        </a-menu-item>
                        <a-menu-item key="social_links">
                            {{ $t("front_setting.social_links") }}
                        </a-menu-item>
                        <a-menu-item key="footers">
                            {{ $t("front_setting.footers") }}
                        </a-menu-item>
                        <a-menu-item key="banners">
                            {{ $t("front_setting.banners") }}
                        </a-menu-item>
                    </a-menu>
                </perfect-scrollbar>
            </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
            <admin-page-table-content>
                <a-alert
                    v-if="renderError"
                    message="Frontend Component Error"
                    type="error"
                    show-icon
                    class="mb-20"
                >
                    <template #description>
                        <div><strong>Error:</strong> {{ renderError.message }}</div>
                        <div style="white-space: pre-wrap; font-family: monospace; font-size: 11px; margin-top: 10px; background: #fff0f0; padding: 10px; border: 1px solid #ffccc7; max-height: 200px; overflow: auto;">
                            {{ renderError.stack }}
                        </div>
                    </template>
                </a-alert>

                <a-alert
                    v-if="apiError"
                    message="API Data Loading Error"
                    type="error"
                    show-icon
                    class="mb-20"
                >
                    <template #description>
                        <div>{{ apiError }}</div>
                    </template>
                </a-alert>

                <template v-if="frontSettingsData && frontSettingsData.xid">
                    <FeaturedCategories
                        v-show="activeKey[0] == 'featured_categories'"
                        :formData="formData"
                        :data="frontSettingsData"
                        :rules="rules"
                        @onSubmit="onSubmit"
                    />
                    <FeaturedProducts
                        v-show="activeKey[0] == 'featured_producs'"
                        :formData="formData"
                        :data="frontSettingsData"
                        :rules="rules"
                        @onSubmit="onSubmit"
                    />
                    <SocialLinks
                        v-show="activeKey[0] == 'social_links'"
                        :formData="formData"
                        :data="frontSettingsData"
                        :rules="rules"
                        @onSubmit="onSubmit"
                    />
                    <Footers
                        v-show="activeKey[0] == 'footers'"
                        :formData="formData"
                        :data="frontSettingsData"
                        :rules="rules"
                        @onSubmit="onSubmit"
                    />
                    <Banners
                        v-show="activeKey[0] == 'banners'"
                        :formData="formData"
                        :data="frontSettingsData"
                        :rules="rules"
                        @onSubmit="onSubmit"
                    />
                </template>
            </admin-page-table-content>
        </a-col>
    </a-row>
</template>

<script>
import { defineComponent, ref, onMounted, watch, onErrorCaptured } from "vue";
import { notification, message } from "ant-design-vue";
import {
    HomeOutlined,
    ShoppingOutlined,
    SettingOutlined,
    LogoutOutlined,
    SaveOutlined,
} from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import processRequest from "../../../../common/plugins/processRequest";
import FeaturedProducts from "./FeaturedProducts.vue";
import FeaturedCategories from "./FeaturedCategories.vue";
import SocialLinks from "./SocialLinks.vue";
import Footers from "./Footers.vue";
import Banners from "./Banners.vue";
import common from "../../../../common/composable/common";
import AdminPageHeader from "../../../../common/layouts/AdminPageHeader.vue";

export default defineComponent({
    components: {
        FeaturedCategories,
        FeaturedProducts,
        SocialLinks,
        Footers,
        Banners,

        HomeOutlined,
        ShoppingOutlined,
        SettingOutlined,
        LogoutOutlined,
        SaveOutlined,

        AdminPageHeader,
    },
    setup() {
        const { selectedWarehouse } = common();
        const { t } = useI18n();
        const rules = ref({});
        const formData = ref({});
        const frontSettingsData = ref({});
        const activeKey = ref(["featured_categories"]);
        const renderError = ref(null);
        const apiError = ref(null);

        onErrorCaptured((err, instance, info) => {
            console.error("Captured Front Settings error:", err, info);
            renderError.value = {
                message: err ? err.message : "Component render failure",
                stack: err ? err.stack : "",
                info: info,
            };
            return false;
        });

        onMounted(() => {
            setUrlData();
        });

        const setUrlData = () => {
            apiError.value = null;
            const url =
                "front-settings?fields=id,xid,featured_categories,x_featured_categories,featured_products_details,featured_categories_title,featured_categories_subtitle,featured_products,x_featured_products,featured_categories_details,featured_products_title,featured_products_subtitle,facebook_url,twitter_url,instagram_url,linkedin_url,youtube_url,pages_widget,contact_info_widget,links_widget,footer_copyright_text,top_banners,top_banners_details,bottom_banners_1,bottom_banners_1_details,bottom_banners_2,bottom_banners_2_details,bottom_banners_3,bottom_banners_3_details,footer_company_description,header_logo,header_logo_url,footer_logo,footer_logo_url,top_banners_text";

            axiosAdmin
                .get(url)
                .then((response) => {
                    const responseData =
                        response.data && Array.isArray(response.data)
                            ? response.data[0]
                            : response.data;

                    if (!responseData || typeof responseData !== "object") {
                        apiError.value =
                            "Received invalid API data format: " +
                            JSON.stringify(response.data);
                        return;
                    }
                formData.value = {
                    featured_categories: responseData.x_featured_categories || [],
                    featured_categories_title: responseData.featured_categories_title || "",
                    featured_categories_subtitle:
                        responseData.featured_categories_subtitle || "",
                    featured_products: responseData.x_featured_products || [],
                    featured_products_title: responseData.featured_products_title || "",
                    featured_products_subtitle: responseData.featured_products_subtitle || "",
                    facebook_url: responseData.facebook_url || "",
                    twitter_url: responseData.twitter_url || "",
                    instagram_url: responseData.instagram_url || "",
                    linkedin_url: responseData.linkedin_url || "",
                    youtube_url: responseData.youtube_url || "",
                    pages_widget: responseData.pages_widget || [],
                    contact_info_widget: responseData.contact_info_widget || [],
                    links_widget: responseData.links_widget || [],
                    footer_company_description: responseData.footer_company_description || "",
                    footer_copyright_text: responseData.footer_copyright_text || "",
                    top_banners: responseData.top_banners || [],
                    bottom_banners_1: responseData.bottom_banners_1 || [],
                    bottom_banners_2: responseData.bottom_banners_2 || [],
                    bottom_banners_3: responseData.bottom_banners_3 || [],
                    header_logo: responseData.header_logo || "",
                    header_logo_url: responseData.header_logo_url || "",
                    footer_logo: responseData.footer_logo || "",
                    footer_logo_url: responseData.footer_logo_url || "",
                    top_banners_text: responseData.top_banners_text || [],
                };
                frontSettingsData.value = responseData;
            }).catch((err) => {
                console.error("API error in setUrlData:", err);
                const statusStr = (err && err.status) ? ` (HTTP ${err.status})` : (err && err.response && err.response.status ? ` (HTTP ${err.response.status})` : "");
                const msgStr = (err && err.data && err.data.message) || (err && err.data && err.data.error && err.data.error.message) || (err && err.message) || (typeof err === "string" ? err : JSON.stringify(err));
                apiError.value = `${msgStr}${statusStr}`;
            });
        };

        const onSubmit = (formDataObject) => {
            processRequest({
                url: `front-settings/${frontSettingsData.value.xid}`,
                data: {
                    ...formDataObject,
                    _method: "PUT",
                },
                success: (res) => {
                    // Toastr Notificaiton
                    notification.success({
                        placement: "bottomRight",
                        message: t("common.success"),
                        description: t("front.setting_updated_successfully"),
                    });

                    rules.value = {};
                    setUrlData();
                },
                error: (errorRules) => {
                    rules.value = errorRules;
                    message.error(t("common.fix_errors"));
                },
            });
        };

        watch(selectedWarehouse, (newVal, oldVal) => {
            formData.value = {};
            frontSettingsData.value = {};

            setUrlData();
        });

        return {
            rules,
            formData,
            frontSettingsData,
            onSubmit,
            activeKey,
            renderError,
            apiError,
        };
    },
});
</script>

<style lang="less">
.border-right-none {
    border-right: 0px;
}
</style>
