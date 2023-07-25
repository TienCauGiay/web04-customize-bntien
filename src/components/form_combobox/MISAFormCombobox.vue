<template>
  <div class="form-cbb">
    <div class="e-textfield-cbb">
      <div class="container-input">
        <misa-input ref="ParentId" :value="searchGeneralAccount"></misa-input>
        <div class="misa-tooltip" v-if="false">Test</div>
      </div>
    </div>
    <div
      class="e-icon-cbb"
      @click="this.isShowMenuGeneralAccount = !this.isShowMenuGeneralAccount"
    >
      <div class="function-icon"></div>
    </div>
    <div class="form-cbb-menu" v-if="false" @scroll="handleScroll">
      <div class="form-cbb-menu-title">
        <div>
          {{
            this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty
              .accountNumber
          }}
        </div>
        <div>
          {{
            this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty
              .accountName
          }}
        </div>
      </div>
      <template v-for="item in accounts" :key="item.AccountId">
        <div
          class="form-cbb-menu-item"
          @click="selectedGeneralAccount(item)"
          :class="{
            'text-bold': item.IsParent == this.$_MISAEnum.BOOL.TRUE,
          }"
        >
          <div :class="`form-cbb-menu-item-${item.Grade}`">
            {{ item.AccountNumber }}
          </div>
          <div>{{ item.AccountName }}</div>
        </div>
      </template>
      <!-- <div
                  class="form-cbb-menu-item"
                  style="justify-content: center; position: relative"
                >
                  <img
                    class="form-cbb-loading"
                    src="../../../assets/img/loading.svg"
                    alt="loading"
                  />
                </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAFormCombobox",
};
</script>

<style></style>
