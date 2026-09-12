<template>
	<a-menu
		v-model:selectedKeys="selectedKeys"
		v-model:openKeys="openKeys"
		style="width: 100%"
		mode="inline"
	>
		<template v-for="category in allCategories" :key="category.xid">
			<a-sub-menu
				v-if="category.children && category.children.length"
				:key="category.xid"
			>
				<template #icon>
					<a-avatar :size="16" :src="category.image_url" />
				</template>
				<template #title>{{ category.name }}</template>
				<CategoryMenu :categories="category.children" />
			</a-sub-menu>
			<a-menu-item v-else :key="category.xid">
				<router-link
					:to="{
						name: 'front.categories',
						params: { warehouse: frontWarehouse.slug, slug: [category.slug] },
					}"
				>
					<a-avatar :size="16" :src="category.image_url" />
					{{ category.name }}
				</router-link>
			</a-menu-item>
		</template>
	</a-menu>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import {
	MailOutlined,
	CalendarOutlined,
	AppstoreOutlined,
	SettingOutlined,
} from "@ant-design/icons-vue";
import { sortBy } from "lodash-es";
import CategoryMenu from "./CategroyMenu.vue";
import common from "../../../../common/composable/common";

export default defineComponent({
	props: ["catSelectedKeys", "catOpenKeys"],
	components: {
		MailOutlined,
		CalendarOutlined,
		AppstoreOutlined,
		SettingOutlined,
		CategoryMenu,
	},
	setup(props) {
		const allCategories = ref([]);
		const selectedKeys = ref([]);
		const openKeys = ref([]);

		onMounted(() => {
			selectedKeys.value = props.catSelectedKeys;
			getCategories();
		});

		const getCategories = () => {
			axiosFront.post("front/categories").then((response) => {
				const allCategoriesArray = [];
				var listArray = response.data.categories;
				// listArray = sortBy(listArray, "x_parent_id");

				listArray.forEach((node) => {
					// No parentId means top level
					if (!node.x_parent_id) return allCategoriesArray.push(node);

					// Insert node as child of parent in listArray array
					const parentIndex = listArray.findIndex(
						(el) => el.xid === node.x_parent_id
					);
					if (!listArray[parentIndex].children) {
						return (listArray[parentIndex].children = [node]);
					}

					listArray[parentIndex].children.push(node);
				});

				allCategories.value = allCategoriesArray;
			});
		};

		const getPath = (model, xid) => {
			var path,
				item = model.xid;

			if (!model || typeof model !== "object") return;

			if (model.xid === xid) return [item];

			(model.children || []).some((child) => (path = getPath(child, xid)));
			return path && [item].concat([...path]);
		};

		watch(props, (newVal, oldVal) => {
			selectedKeys.value = newVal.catSelectedKeys;

			let parentIds = [];
			if (selectedKeys.value && selectedKeys.value.length > 0 && selectedKeys.value[0]) {
				allCategories.value.forEach((nodeItem) => {
					const result = getPath(nodeItem, selectedKeys.value[0]);
					if (result != undefined && result.includes(selectedKeys.value[0])) {
						parentIds = result;
					}
				});
			}

			openKeys.value = parentIds;
		});

		const { frontWarehouse } = common();

		return {
			selectedKeys,
			openKeys,
			allCategories,
			frontWarehouse,
		};
	},
});
</script>
