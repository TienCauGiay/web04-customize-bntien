import {createRouter, createWebHistory} from 'vue-router';
import EmployeeList from '@/views/employee/EmployeeList';
import CategoryPage from '@/views/category/Category';
import SystemAccount from '@/views/account/system_account/SystemAccount';
import ProviderList from '@/views/provider/provider_list/ProviderList';
import CashHomePage from '@/views/cash/cash_home_page/CashHomePage';
import CashProcess from '@/views/cash/cash_process/CashProcess';
import ReceiptPayment from '@/views/cash/receipt_payment/ReceiptPayment';

/**
 * Mô tả: Định nghĩa các router
 * created by : BNTIEN
 * created date: 01-06-2023 13:11:40
 */
const routers = [
    {path: "/category", component: CategoryPage, name: "CategoryRouter"},
    {path: "/category/employee", component: EmployeeList, name: "EmployeeListRouter"},
    {path: "/category/system-account", component: SystemAccount, name: "SystemAccountRouter"},
    {path: "/category/provider", component: ProviderList, name: "ProviderListRouter"},
    {
        path: "/cash", 
        component: CashHomePage, 
        name: "CashHomePageRouter",
        children: [
            {
                path: 'cash-process',
                component: CashProcess,
                name: "CashProcess"
            },
            {
                path: "receipt-payment", 
                component: ReceiptPayment, 
                name: "ReceiptPaymentRouter"
            },
        ]
    },
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