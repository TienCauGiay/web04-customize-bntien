import {createRouter, createWebHistory} from 'vue-router';
import EmployeeList from '@/views/employee/EmployeeList';
import SettingPage from '@/views/setting/Setting';
import CategoryPage from '@/views/category/Category';
import SystemAccount from '@/views/account/system_account/SystemAccount';

/**
 * Mô tả: Định nghĩa các router
 * created by : BNTIEN
 * created date: 01-06-2023 13:11:40
 */
const routers = [
    {path: "/employee", component: EmployeeList, name: "EmployeeListRouter"},
    {path: "/setting", component: SettingPage, name: "SettingRouter"},
    {path: "/category", component: CategoryPage, name: "CategoryRouter"},
    {path: "/system-account", component: SystemAccount, name: "SystemAccountRouter"},
]

/**
 * Mô tả: Khởi tạo vue router
 * created by : BNTIEN
 * created date: 01-06-2023 13:11:54
 */
const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routers
})

export default vueRouter;