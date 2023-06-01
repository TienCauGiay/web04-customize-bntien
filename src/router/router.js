import {createRouter, createWebHistory} from 'vue-router';
import EmployeeList from '@/views/employee/EmployeeList';
import SettingPage from '@/views/setting/Setting';

/**
 * Mô tả: Định nghĩa các router
 * created by : BNTIEN
 * created date: 01-06-2023 13:11:40
 */
const routers = [
    {path: "/employee", component: EmployeeList, name: "EmployeeListRouter"},
    {path: "/setting", component: SettingPage, name: "SettingRouter"} 
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