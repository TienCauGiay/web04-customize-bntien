<template>
  <div class="container-cash">
    <div class="menu-cash">
      <div class="menu-cash-left">
        <div class="menu-cash-item">
          <router-link to="/cash/cash-process">{{
            this.$_MISAResource[this.$_LANG_CODE].CASH.homePage.title.process
          }}</router-link>
        </div>
        <div class="menu-cash-item">
          <router-link to="/cash/receipt-payment">{{
            this.$_MISAResource[this.$_LANG_CODE].CASH.homePage.title.receiptPayment
          }}</router-link>
        </div>
        <div class="menu-cash-item">
          <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.homePage.title.inventory }}</a>
        </div>
        <div class="menu-cash-item">
          <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.homePage.title.cashFlowForecast }}</a>
        </div>
        <div class="menu-cash-item">
          <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.homePage.title.report }}</a>
        </div>
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
