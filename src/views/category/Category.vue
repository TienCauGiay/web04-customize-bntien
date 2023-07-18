<template>
  <div class="category-container">
    <div class="category-title">
      {{ this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE }}
    </div>
    <div class="category-content">
      <div class="category-row">
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.OBJECTS
            }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM.CUSTOMER
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM.PROVIDER
            }}
          </router-link>
          <router-link to="/employee">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM.EMPLOYEE
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .GROUP_CUSTOMER_PROVIDER
            }}
          </router-link>
        </div>
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU
                .SUPPLY_GOODS
            }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .SUPPLY_GOODS
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM.WAREHOUSE
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .GROUP_MATERIAL_GOOD_SERVICE
            }}
          </router-link>
          <router-link to="/">
            {{ this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM.UNIT }}
          </router-link>
        </div>
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.ACCOUNTS
            }}
          </a>
          <router-link to="/system-account">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .ACCOUNT_SYSTEM
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .TRANFER_ACCOUNT
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .ACCOUNT_DEFAULT
            }}
          </router-link>
        </div>
      </div>
      <div class="category-row">
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.EXPENSE
            }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .COSS_AGGREGATION_OBJECT
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .EXPENSE_ITEM
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .CONSTRUCTION
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .TYPE_CONSTRUCTION
            }}
          </router-link>
        </div>
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.BANKS
            }}
          </a>
          <router-link to="/">
            {{ this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM.BANK }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .BANK_ACCOUNT
            }}
          </router-link>
        </div>
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU
                .BRANCH_DEPARTMENT
            }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .ORGANIZATIONAL_STRUCTURE
            }}
          </router-link>
        </div>
      </div>
      <div class="category-row">
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.ASSETS
            }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM.TYPE_TOOL
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .TYPE_ASSETS
            }}
          </router-link>
        </div>
        <div class="category-md-4">
          <a class="title-menu-item">
            {{ this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.TAX }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .SPECIAL_CONSUMPTION_TARIFF
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .RESOURCE_TAX_SCHEDULE
            }}
          </router-link>
        </div>
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.OTHER
            }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .TERM_PAYMENT
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .REVENUE_DISBURSEMENT
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .STATISTICAL_CODE
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .TYPE_MONEY
            }}
          </router-link>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .TYPE_DOCUMENT
            }}
          </router-link>
        </div>
      </div>
      <div class="category-row">
        <div class="category-md-4">
          <a class="title-menu-item">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.TITLE_MEMU.SALARY
            }}
          </a>
          <router-link to="/">
            {{
              this.$_MISAResource[this.$_LANG_CODE].CATEGORY.MENU_ITEM
                .TIME_ATTENDANCE_SYMBOL
            }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryPage",
};
</script>

<style>
@import url(./Category.css);
</style>
