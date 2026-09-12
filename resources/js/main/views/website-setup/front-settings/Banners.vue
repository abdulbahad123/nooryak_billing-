<template>
    <a-card
        :title="$t('front_setting.banners')"
        class="page-content-container mt-20 mb-20"
    >
        <a-form layout="vertical" class="mb-20">
            <!-- Top Banner 1 / Slider 1 -->
            <a-typography-title :level="5" :style="{ marginBottom: '15px' }">
                {{ $t("front_setting.top_banners_1") }} (Hero Slider 1)
            </a-typography-title>
            <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="8" :lg="8">
                    <FileUploader
                        key="bottom_banners_1"
                        :fileUrls="data.bottom_banners_1_details"
                        :fileNames="addEditForm.formData.bottom_banners_1"
                        @uploadSuccess="bottomBanner1UploadSuccess"
                    />
                </a-col>
                <a-col :xs="24" :sm="24" :md="16" :lg="16" v-if="bannerTexts[0]">
                    <a-row :gutter="12">
                        <a-col :span="12">
                            <a-form-item label="Banner Tag">
                                <a-input v-model:value="bannerTexts[0].tag" placeholder="UPGRADE YOUR WORLD" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Button Text">
                                <a-input v-model:value="bannerTexts[0].button_text" placeholder="Shop Now" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Banner Title">
                                <a-input v-model:value="bannerTexts[0].title" placeholder="Latest Electronics For A Smarter You" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Banner Subtitle">
                                <a-input v-model:value="bannerTexts[0].subtitle" placeholder="Top brands | Great deals | Trusted quality" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-divider />

            <!-- Top Banner 2 / Slider 2 -->
            <a-typography-title :level="5" :style="{ marginBottom: '15px' }">
                {{ $t("front_setting.top_banners_2") }} (Hero Slider 2)
            </a-typography-title>
            <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="8" :lg="8">
                    <FileUploader
                        key="bottom_banners_2"
                        :fileUrls="data.bottom_banners_2_details"
                        :fileNames="addEditForm.formData.bottom_banners_2"
                        @uploadSuccess="bottomBanner2UploadSuccess"
                    />
                </a-col>
                <a-col :xs="24" :sm="24" :md="16" :lg="16" v-if="bannerTexts[1]">
                    <a-row :gutter="12">
                        <a-col :span="12">
                            <a-form-item label="Banner Tag">
                                <a-input v-model:value="bannerTexts[1].tag" placeholder="PREMIUM TECH SHOWCASE" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Button Text">
                                <a-input v-model:value="bannerTexts[1].button_text" placeholder="Explore Deals" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Banner Title">
                                <a-input v-model:value="bannerTexts[1].title" placeholder="Next Gen Gadgets & Accessories" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Banner Subtitle">
                                <a-input v-model:value="bannerTexts[1].subtitle" placeholder="Best prices | Fast shipping | Guaranteed quality" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-divider />

            <!-- Top Banner 3 / Slider 3 -->
            <a-typography-title :level="5" :style="{ marginBottom: '15px' }">
                {{ $t("front_setting.top_banners_3") }} (Hero Slider 3)
            </a-typography-title>
            <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="8" :lg="8">
                    <FileUploader
                        key="bottom_banners_3"
                        :fileUrls="data.bottom_banners_3_details"
                        :fileNames="addEditForm.formData.bottom_banners_3"
                        @uploadSuccess="bottomBanner3UploadSuccess"
                    />
                </a-col>
                <a-col :xs="24" :sm="24" :md="16" :lg="16" v-if="bannerTexts[2]">
                    <a-row :gutter="12">
                        <a-col :span="12">
                            <a-form-item label="Banner Tag">
                                <a-input v-model:value="bannerTexts[2].tag" placeholder="EXCLUSIVE PROMOTION" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Button Text">
                                <a-input v-model:value="bannerTexts[2].button_text" placeholder="Buy Now" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Banner Title">
                                <a-input v-model:value="bannerTexts[2].title" placeholder="Smart Home & Entertainment Systems" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Banner Subtitle">
                                <a-input v-model:value="bannerTexts[2].subtitle" placeholder="Transform your lifestyle with modern appliances" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-divider />

            <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="12" :lg="12">
                    <a-typography-title :level="5" :style="{ marginBottom: '20px' }">
                        {{ $t("front_setting.bottom_banners") }}
                    </a-typography-title>
                    <FileUploader
                        key="top_banners_details"
                        :fileUrls="data.top_banners_details"
                        :fileNames="addEditForm.formData.top_banners"
                        @uploadSuccess="topBannerUploadSuccess"
                    />
                </a-col>
            </a-row>

            <a-row :gutter="16" class="mt-30">
                <a-col :xs="24" :sm="24" :md="24" :lg="24">
                    <a-form-item>
                        <a-button type="primary" @click="onSubmit">
                            <template #icon> <SaveOutlined /> </template>
                            {{ $t("common.update") }}
                        </a-button>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-card>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import {
    SaveOutlined,
    SearchOutlined,
    DeleteOutlined,
    PlusOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons-vue";
import DyanmicForm from "./DyanmicForm.vue";
import FileUploader from "./FileUploader.vue";

export default defineComponent({
    props: ["formData", "data", "rules"],
    emits: ["onSubmit"],
    components: {
        SaveOutlined,
        SearchOutlined,
        DeleteOutlined,
        PlusOutlined,
        MinusCircleOutlined,
        DyanmicForm,
        FileUploader,
    },
    setup(props, { emit }) {
        const addEditForm = reactive({
            formSubmitting: false,
            formData: props.formData,
        });

        const bannerTexts = ref([
            { tag: "", title: "", subtitle: "", button_text: "", category_slug: "" },
            { tag: "", title: "", subtitle: "", button_text: "", category_slug: "" },
            { tag: "", title: "", subtitle: "", button_text: "", category_slug: "" },
        ]);

        onMounted(() => {
            addEditForm.formData = props.formData;
            initBannerTexts(props.formData.top_banners_text);
        });

        watch(
            () => props.formData,
            (newVal) => {
                if (newVal) {
                    addEditForm.formData = newVal;
                    if (newVal.top_banners_text) {
                        initBannerTexts(newVal.top_banners_text);
                    }
                }
            },
            { deep: true, immediate: true }
        );

        const initBannerTexts = (existingTexts) => {
            if (Array.isArray(existingTexts) && existingTexts.length > 0) {
                for (let i = 0; i < 3; i++) {
                    if (existingTexts[i]) {
                        bannerTexts.value[i] = {
                            tag: existingTexts[i].tag || "",
                            title: existingTexts[i].title || "",
                            subtitle: existingTexts[i].subtitle || "",
                            button_text: existingTexts[i].button_text || "",
                            category_slug: existingTexts[i].category_slug || "",
                        };
                    }
                }
            }
        };

        const onSubmit = () => {
            addEditForm.formData.top_banners_text = bannerTexts.value;
            emit("onSubmit", addEditForm.formData);
        };

        const topBannerUploadSuccess = (uploadData) => {
            addEditForm.formData.top_banners = uploadData;
            onSubmit();
        };

        const bottomBanner1UploadSuccess = (uploadData) => {
            addEditForm.formData.bottom_banners_1 = uploadData;
            onSubmit();
        };

        const bottomBanner2UploadSuccess = (uploadData) => {
            addEditForm.formData.bottom_banners_2 = uploadData;
            onSubmit();
        };

        const bottomBanner3UploadSuccess = (uploadData) => {
            addEditForm.formData.bottom_banners_3 = uploadData;
            onSubmit();
        };

        return {
            addEditForm,
            bannerTexts,
            onSubmit,
            topBannerUploadSuccess,
            bottomBanner1UploadSuccess,
            bottomBanner2UploadSuccess,
            bottomBanner3UploadSuccess,
        };
    },
});
</script>

<style></style>
