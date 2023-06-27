<template>
  <div class="content-header">
    <div class="header-title">
      <div id="gn" class="three-dashes-icon icon-tb"></div>
      <p>
        {{
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
            .NAME_COMPANY_SELECTED
        }}
      </p>
      <div class="dropdown-grey-icon icon-tb"></div>
    </div>
    <div class="header-action">
      <div
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.ALERT"
        class="toast-notification-icon icon-l"
      ></div>
      <div class="info-user">
        <div class="avatar-icon icon-l"></div>
        <p>
          {{
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
              .NAME_ACCOUNT_LOGIN
          }}
        </p>
        <div class="dropdown-grey-icon icon-tb"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>

<style>
@import url(@/css/headercontent.css);
</style>
