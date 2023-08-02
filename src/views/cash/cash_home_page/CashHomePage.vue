<template>
  <div class="container-cash">
    <div class="menu-cash">
      <div class="menu-cash-left">
        <div class="menu-cash-item">
          <router-link to="/cash/cash-process">Quy trình</router-link>
        </div>
        <div class="menu-cash-item">
          <router-link to="/cash/receipt-payment">Thu, chi tiền</router-link>
        </div>
        <div class="menu-cash-item"><a>Kiểm kê</a></div>
        <div class="menu-cash-item"><a>Dự báo dòng tiền</a></div>
        <div class="menu-cash-item"><a>Báo cáo</a></div>
      </div>
      <div class="setup-show-cash">
        <div class="category-icon"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "CashHomePage",
};
</script>

<style scoped>
@import url(./CashHomePage.css);
</style>
