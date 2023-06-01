<template>
  <div id="sidebar" class="sidebar">
    <div class="sidebar-logo">
      <div class="icon-tb toggle toggle-icon"></div>
      <div class="logo-icon icon-l"></div>
      <span>KẾ TOÁN</span>
    </div>
    <div class="menu">
      <ul class="nav">
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb overview-icon"></i>
            <span>Tổng quan</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/cash" class="menu-item-a">
            <i class="icon-tb cash-icon"></i>
            <span>Tiền mặt</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/deposits" class="menu-item-a">
            <i class="icon-tb deposits-icon"></i>
            <span>Tiền gửi</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/bag" class="menu-item-a">
            <i class="icon-tb bag-icon"></i>
            <span>Mua hàng</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/cart" class="menu-item-a">
            <i class="icon-tb cart-icon"></i>
            <span>Bán hàng</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/bill" class="menu-item-a">
            <i class="icon-tb bill-icon"></i>
            <span>Quản lí hóa đơn</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/warehouse" class="menu-item-a">
            <i class="icon-tb warehouse-icon"></i>
            <span>Kho</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/tool" class="menu-item-a">
            <i class="icon-tb tool-icon"></i>
            <span>Công cụ dụng cụ</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/asset" class="menu-item-a">
            <i class="icon-tb asset-icon"></i>
            <span>Tài sản cố định</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/tax" class="menu-item-a">
            <i class="icon-tb tax-icon"></i>
            <span>Thuế</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb price-icon"></i>
            <span>Giá thành</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/synthetic" class="menu-item-a">
            <i class="icon-tb synthetic-icon"></i>
            <span>Tổng hợp</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/budget" class="menu-item-a">
            <i class="icon-tb budget-icon"></i>
            <span>Ngân sách</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/report" class="menu-item-a">
            <i class="icon-tb report-icon"></i>
            <span>Báo cáo</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/finance" class="menu-item-a">
            <i class="icon-tb finance-icon"></i>
            <span>Phân tích tài chính</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/employee" class="menu-item-a">
            <i class="icon-tb employee-icon"></i>
            <span>Nhân viên</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/setting" class="menu-item-a">
            <i class="icon-tb setting-icon" style="scale: 0.85 0.85"></i>
            <span>Cài đặt</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSidebar",
};
</script>

<style>
@import url(@/css/sidebar.css);
</style>
