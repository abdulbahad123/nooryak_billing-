import { notification, Modal } from "ant-design-vue";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import { find, includes, remove, replace } from "lodash-es";
import store from "../store";

import AuthRoutes from "./auth";
import DashboardRoutes from "./dashboard";
import ProductRoutes from "./products";
import StockRoutes from "./stocks";
import ExpensesRoutes from "./expenses";
import UserRoutes from "./users";
import SettingRoutes from "./settings";
import ReportsRoutes from "./reports";
import SetupAppRoutes from "./setupApp";
import StaffRoutes from "./hrm/staff";
import LeaveRoutes from "./hrm/leaves";
import HolidayRoutes from "./hrm/holiday";
import AttendanceRoutes from "./hrm/attendance";
import PayrollRoutes from "./hrm/payroll";
import AppreciationRoutes from "./hrm/appreciations";
import HrmDashboardRoutes from "./hrm/hrmDashboard";
import HrmSettingsRoutes from "./hrm/hrmSettings";
import { checkUserPermission } from "../../common/scripts/functions";

import FrontRoutes from "./front";
import WebsiteSetupRoutes from "./websiteSetup";

const appType = window.config.app_type;
const allActiveModules = window.config.modules;

const isAdminCompanySetupCorrect = () => {
    var appSetting = store.state.auth.appSetting;

    if (appSetting.x_currency_id == null || appSetting.x_warehouse_id == null) {
        return false;
    }

    return true;
};

const isSuperAdminCompanySetupCorrect = () => {
    var appSetting = store.state.auth.appSetting;

    if (
        appSetting.x_currency_id == null ||
        appSetting.white_label_completed == false
    ) {
        return false;
    }

    return true;
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...FrontRoutes,
        {
            path: "",
            redirect: "/admin/login",
        },
        ...WebsiteSetupRoutes,
        ...ProductRoutes,
        ...StockRoutes,
        ...ExpensesRoutes,
        ...AuthRoutes,
        ...DashboardRoutes,
        ...UserRoutes,
        ...ReportsRoutes,
        ...SettingRoutes,
        ...StaffRoutes,
        ...LeaveRoutes,
        ...HolidayRoutes,
        ...AttendanceRoutes,
        ...PayrollRoutes,
        ...AppreciationRoutes,
        ...HrmDashboardRoutes,
        ...HrmSettingsRoutes,
    ],
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

// Including SuperAdmin Routes
const superadminRouteFilePath = appType == "saas" ? "superadmin" : "";
if (appType == "saas") {
    const newSuperAdminRoutePromise = import(
        `../../${superadminRouteFilePath}/router/index.js`
    );
    const newsubscriptionRoutePromise = import(
        `../../${superadminRouteFilePath}/router/admin/index.js`
    );

    Promise.all([newSuperAdminRoutePromise, newsubscriptionRoutePromise]).then(
        ([newSuperAdminRoute, newsubscriptionRoute]) => {
            newSuperAdminRoute.default.forEach((route) =>
                router.addRoute(route)
            );
            newsubscriptionRoute.default.forEach((route) =>
                router.addRoute(route)
            );
            SetupAppRoutes.forEach((route) => router.addRoute(route));
        }
    );
} else {
    SetupAppRoutes.forEach((route) => router.addRoute(route));
}

const checkLogFog = (to, from, next) => {
    const pathParts = to.name ? to.name.split('.') : [];

    if (pathParts.length > 0 && pathParts[0] == 'superadmin') {
        if (to.meta.requireAuth && store.getters['auth/isLoggedIn'] && store.state.auth.user && !store.state.auth.user.is_superadmin) {
            store.dispatch('auth/logout');
            next({ name: 'admin.login' });
        } else if (to.meta.requireAuth && isSuperAdminCompanySetupCorrect() == false && pathParts[1] != 'setup_app') {
            next({ name: 'superadmin.setup_app.index' });
        } else if (to.meta.requireAuth && !store.getters['auth/isLoggedIn']) {
            next({ name: 'admin.login' });
        } else if (to.meta.requireUnauth && store.getters['auth/isLoggedIn']) {
            next({ name: 'superadmin.dashboard.index' });
        } else {
            next();
        }
    } else if (pathParts.length > 0 && pathParts[0] == 'admin') {
        if (to.meta.requireAuth && !store.getters['auth/isLoggedIn']) {
            store.dispatch('auth/logout');
            next({ name: 'admin.login' });
        } else if (to.meta.requireAuth && isAdminCompanySetupCorrect() == false && pathParts[1] != 'setup_app') {
            next({ name: 'admin.setup_app.index' });
        } else if (to.meta.requireUnauth && store.getters['auth/isLoggedIn']) {
            next({ name: 'admin.dashboard.index' });
        } else {
            var permission = to.meta.permission;
            if (pathParts[1] == 'stock' && typeof to.meta.permission == 'function') {
                permission = replace(to.meta.permission(to), '-', '_');
            }
            if (!to.meta.permission || checkUserPermission(permission, store.state.auth.user)) {
                next();
            } else {
                next({ name: 'admin.dashboard.index' });
            }
        }
    } else {
        next();
    }
};

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.appModule && !includes(allActiveModules, to.meta.appModule)) {
        next({ name: 'admin.dashboard.index' });
        return;
    }
    checkLogFog(to, from, next);
});

export default router;
