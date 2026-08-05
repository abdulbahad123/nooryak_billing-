<template>
    <div class="login-main-container">
        <a-row class="main-container-div">
            <a-col :xs="24" :sm="24" :md="24" :lg="8">
                <a-row class="login-left-div">
                    <a-col
                        :xs="{ span: 20, offset: 2 }"
                        :sm="{ span: 20, offset: 2 }"
                        :md="{ span: 16, offset: 4 }"
                        :lg="{ span: 16, offset: 4 }"
                    >
                        <a-card
                            v-if="resetPassword"
                            :title="null"
                            class="login-div"
                            :bordered="innerWidth <= 768 ? true : false"
                        >
                            <a-form layout="vertical">
                                <div class="login-logo">
                                    <img
                                        class="login-img-logo"
                                        :src="globalSetting.light_logo_url"
                                    />
                                </div>
                                <br />
                                <div
                                    style="
                                        text-align: left;
                                        margin-top: 10px;
                                        margin-bottom: 30px;
                                    "
                                >
                                    <div
                                        style="
                                            font-weight: bold;
                                            font-size: 18px;
                                            margin-bottom: 2px;
                                        "
                                    >
                                        {{ $t("user.sign_in") }}
                                    </div>
                                    <div style="margin-bottom: 14px">
                                        {{ $t("messages.please_login_to_your_account") }}
                                    </div>
                                </div>
                                <a-alert
                                    v-if="onRequestSend.error != ''"
                                    :message="onRequestSend.error"
                                    type="error"
                                    show-icon
                                    class="mb-20 mt-10"
                                />
                                <a-alert
                                    v-if="onRequestSend.success"
                                    :message="$t('messages.login_success')"
                                    type="success"
                                    show-icon
                                    class="mb-20 mt-10"
                                />
                                <a-form-item
                                    :label="$t('user.email_phone')"
                                    name="email"
                                    :help="rules.email ? rules.email.message : null"
                                    :validateStatus="rules.email ? 'error' : null"
                                >
                                    <a-input
                                        v-model:value="credentials.email"
                                        @pressEnter="onSubmit"
                                        :placeholder="
                                            $t('common.placeholder_default_text', [
                                                $t('user.email_phone'),
                                            ])
                                        "
                                    />
                                </a-form-item>

                                <a-form-item
                                    :label="$t('user.password')"
                                    name="password"
                                    :help="rules.password ? rules.password.message : null"
                                    :validateStatus="rules.password ? 'error' : null"
                                >
                                    <a-input-password
                                        v-model:value="credentials.password"
                                        @pressEnter="onSubmit"
                                        :placeholder="
                                            $t('common.placeholder_default_text', [
                                                $t('user.password'),
                                            ])
                                        "
                                    />
                                </a-form-item>

                                <a-form-item class="mt-30 mb-0">
                                    <a-button
                                        :loading="loading"
                                        @click="onSubmit"
                                        class="login-btn"
                                        block
                                        type="primary"
                                    >
                                        {{ $t("menu.login") }}
                                    </a-button>
                                </a-form-item>
                                <a-form-item
                                    class="mt-10"
                                    style="text-align: center; font-weight: bold"
                                >
                                    <a :loading="loading" @click="onResetPass">
                                        {{ $t("menu.reset_password") }}
                                    </a>
                                </a-form-item>
                                <a-form-item
                                    v-if="appType === 'saas' && !isSubdomainModuleEnabled"
                                    class="mt-10"
                                    style="text-align: center; font-weight: bold"
                                >
                                    <a-button
                                        style="font-weight: bold"
                                        type="link"
                                        :loading="loading"
                                        @click="
                                            () =>
                                                $router.push({
                                                    name: 'superadmin.register',
                                                })
                                        "
                                    >
                                        {{ $t("front_website.register") }}
                                    </a-button>
                                </a-form-item>
                            </a-form>
                            <DemoCredentials :credentials="credentials" />
                        </a-card>
                        <a-card
                            v-else
                            :title="null"
                            class="login-div"
                            :bordered="innerWidth <= 768 ? true : false"
                        >
                            <a-alert
                                v-if="onResetRequest.success"
                                :message="$t('messages.reset_success')"
                                type="success"
                                show-icon
                                class="mb-20 mt-10"
                            />
                            <a-form layout="vertical" v-else>
                                <div class="login-logo mb-30">
                                    <img
                                        class="login-img-logo"
                                        :src="globalSetting.light_logo_url"
                                    />
                                </div>
                                <br />
                                <a-alert
                                    v-if="onResetRequest.error != ''"
                                    :message="onResetRequest.error"
                                    type="error"
                                    show-icon
                                    class="mb-20 mt-10"
                                    style="margin-top: 40px"
                                />

                                <a-form-item
                                    :label="$t('user.email_phone')"
                                    name="email"
                                    :help="rules.email ? rules.email.message : null"
                                    :validateStatus="rules.email ? 'error' : null"
                                    style="margin-top: 32px"
                                >
                                    <a-input
                                        v-model:value="resetCredential.email"
                                        :placeholder="
                                            $t('common.placeholder_default_text', [
                                                $t('user.email_phone'),
                                            ])
                                        "
                                    />
                                </a-form-item>

                                <a-form-item class="mt-30 mb-0">
                                    <a-button
                                        :loading="loading"
                                        @click="onReset"
                                        class="login-btn"
                                        block
                                        type="primary"
                                    >
                                        {{ $t("menu.reset") }}
                                    </a-button>
                                </a-form-item>
                                <a-form-item class="mt-10">
                                    <a-form-item
                                        style="text-align: center; font-weight: bold"
                                    >
                                        <a :loading="loading" @click="onResetClose">
                                            <ArrowLeftOutlined /> {{ $t("common.back") }}
                                        </a>
                                    </a-form-item>
                                </a-form-item>
                            </a-form>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :xs="0" :sm="0" :md="24" :lg="16">
                <div class="right-login-div">
                    <img class="right-image" :src="loginBackground" @error="(e) => e.target.style.opacity = '0'" />
                    <div class="hero-overlay-content">
                        <div class="hero-badge">⚡ Nooryak Billing &amp; POS Solution</div>
                        <h1 class="hero-title">Smart Retail &amp; Inventory Management</h1>
                        <p class="hero-desc">Streamline your store operations, real-time stock sync, multi-warehouse management, and customer invoicing effortlessly.</p>
                        <div class="hero-pills">
                            <div class="pill-item">✨ Real-time Stock Sync</div>
                            <div class="pill-item">🧾 Thermal &amp; PDF Invoices</div>
                            <div class="pill-item">📊 Reports &amp; Analytics</div>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import common from "../../../common/composable/common";
import apiAdmin from "../../../common/composable/apiAdmin";
import DemoCredentials from "./DemoCredentials.vue";

export default defineComponent({
    components: {
        DemoCredentials,
        ArrowLeftOutlined,
    },
    setup() {
        const { addEditRequestAdmin, loading, rules } = apiAdmin();
        const { globalSetting, appType } = common();
        const loginBackground = globalSetting.value.login_image_url;
        const store = useStore();
        const router = useRouter();
        const resetPassword = ref(true);
        const resetCredential = reactive({
            email: "",
        });
        const credentials = reactive({
            email: null,
            password: null,
        });
        const onRequestSend = ref({
            error: "",
            success: "",
        });

        const onResetRequest = ref({
            error: "",
            success: "",
        });

        const onResetPass = () => {
            resetErrorMessages();

            resetPassword.value = false;
        };

        const onResetClose = () => {
            resetPassword.value = true;

            resetErrorMessages();
        };

        const resetErrorMessages = () => {
            onRequestSend.value = {
                error: "",
                success: "",
            };
            onResetRequest.value = {
                error: "",
                success: "",
            };
            rules.value = {};
        };

        const onReset = () => {
            addEditRequestAdmin({
                url: "auth/forgot-password",
                data: resetCredential,
                success: (response) => {
                    onResetRequest.value = {
                        error: "",
                        success: true,
                    };
                },
                error: (err) => {
                    onResetRequest.value = {
                        error: err.error.message ? err.error.message : "",
                        success: false,
                    };
                },
            });
        };

        const onSubmit = () => {
            onRequestSend.value = {
                error: "",
                success: false,
            };

            addEditRequestAdmin({
                url: "auth/login",
                data: credentials,
                success: (response) => {
                    const user = response.user;
                    store.commit("auth/updateUser", user);
                    store.commit("auth/updateToken", response.token);
                    store.commit("auth/updateExpires", response.expires_in);
                    store.commit(
                        "auth/updateVisibleSubscriptionModules",
                        response.visible_subscription_modules
                    );

                    if (appType == "non-saas") {
                        store.dispatch("auth/updateAllWarehouses");
                        store.commit("auth/updateWarehouse", response.user.warehouse);

                        router.push({
                            name: "admin.dashboard.index",
                            params: { success: true },
                        });
                    } else {
                        if (user.is_superadmin && user.user_type == "super_admins") {
                            store.commit("auth/updateApp", response.app);
                            store.commit(
                                "auth/updateEmailVerifiedSetting",
                                response.email_setting_verified
                            );
                            router.push({
                                name: "superadmin.dashboard.index",
                                params: { success: true },
                            });
                        } else {
                            store.commit("auth/updateApp", response.app);
                            store.commit(
                                "auth/updateEmailVerifiedSetting",
                                response.email_setting_verified
                            );
                            store.commit(
                                "auth/updateAddMenus",
                                response.shortcut_menus.credentials
                            );
                            store.dispatch("auth/updateAllWarehouses");
                            store.commit("auth/updateWarehouse", response.user.warehouse);
                            router.push({
                                name: "admin.dashboard.index",
                                params: { success: true },
                            });
                        }
                    }
                },
                error: (err) => {
                    onRequestSend.value = {
                        error: err.error.message ? err.error.message : "",
                        success: false,
                    };
                },
            });
        };

        return {
            appType,
            loading,
            rules,
            credentials,
            onSubmit,
            onRequestSend,
            globalSetting,
            loginBackground,

            innerWidth: window.innerWidth,
            onResetPass,
            onResetClose,
            resetPassword,
            onReset,
            resetCredential,
            onResetRequest,
        };
    },
});
</script>

<style lang="less">
.login-main-container {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    min-height: 100vh;
    overflow-x: hidden;
}

.main-container-div {
    min-height: 100vh;
}

.login-left-div {
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.05);
    z-index: 10;
}

.login-logo {
    text-align: center;
    padding: 10px 0;
}

.login-img-logo {
    max-width: 220px;
    max-height: 75px;
    object-fit: contain;
    margin: 0 auto;
    display: block;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.02);
    }
}

.login-div {
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    border: 1px solid #f1f5f9;
    padding: 10px;
}

.right-login-div {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at top right, #1e1b4b 0%, #0f172a 100%);
    overflow: hidden;
}

.right-image {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    filter: brightness(0.85) contrast(1.05);
    transition: opacity 0.5s ease;
}

.hero-overlay-content {
    position: absolute;
    bottom: 50px;
    left: 40px;
    right: 40px;
    z-index: 5;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 32px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.hero-badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 20px;
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 14px;
    border: 1px solid rgba(96, 165, 250, 0.3);
}

.hero-title {
    color: #ffffff;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
}

.hero-desc {
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 20px;
}

.hero-pills {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.pill-item {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e2e8f0;
    padding: 6px 14px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
}

.login-btn {
    height: 44px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 8px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border: none;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);

    &:hover {
        background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        box-shadow: 0 6px 16px rgba(37, 99, 235, 0.45);
    }
}

@media (max-width: 991px) {
    .login-left-div {
        min-height: 100vh;
        padding: 20px 0;
    }

    .login-div {
        box-shadow: none;
        border: none;
    }
}
</style>
