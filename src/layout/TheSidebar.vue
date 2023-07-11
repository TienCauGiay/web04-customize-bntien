<template>
  <div id="sidebar" class="sidebar">
    <div class="sidebar-logo">
      <div class="icon-tb toggle toggle-icon"></div>
      <div class="logo-icon icon-l"></div>
      <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ACCOUNTANT }}</span>
    </div>
    <div class="menu">
      <ul class="nav">
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb overview-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.OVERVIEW }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb cash-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.CASH }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb deposits-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.DEPOSITS }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb bag-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.BAG }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb cart-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.CART }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb bill-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.BILL }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb warehouse-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.WAREHOUSE }}</span>
          </router-link>
        </li>
        <!-- <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb tool-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.TOOL }}</span>
          </router-link>
        </li> -->
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb asset-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.ASSET }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb tax-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.TAX }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb price-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.PRICE }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb synthetic-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.SYNTHETIC }}</span>
          </router-link>
        </li>
        <!-- <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb budget-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.BUDGET }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb report-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.REPORT }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/" class="menu-item-a">
            <i class="icon-tb finance-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.FINANCE }}</span>
          </router-link>
        </li> -->
        <li class="menu-item">
          <router-link to="/employee" class="menu-item-a">
            <i class="icon-tb employee-icon"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.EMPLOYEE }}</span>
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/setting" class="menu-item-a">
            <i class="icon-tb setting-icon" style="scale: 0.85 0.85"></i>
            <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ITEM_SIDEBAR.SETTING }}</span>
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
