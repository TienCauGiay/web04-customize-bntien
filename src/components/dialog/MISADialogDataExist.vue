<template>
  <div class="overlay-dialog">
    <div
      class="dialog-employee position-display-center"
      id="dialog-warning-employee"
    >
      <div class="title-dialog">
        <h1>
          {{ this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID }}
        </h1>
        <div class="close-icon" @click="btnAgree"></div>
      </div>
      <div class="dialog-content">
        <div class="warning-yellow-icon dialog-content-icon"></div>
        <div class="dialog-content-main">
          <p>
            {{ this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_PRE }}
            &lt;{{ this.textEmployeeCodeExist }}&gt;
            {{ this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_END }}
          </p>
        </div>
      </div>
      <div class="dialog-warning-footer">
        <misa-button-default
          :textButtonDefault="
            this.$_MISAResource[this.$_LANG_CODE].BUTTON.AGREE
          "
          @click="btnAgree"
        ></misa-button-default>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogDataExist",
  props: ["textEmployeeCodeExist"],
  methods: {
    /**
     * Mô tả: Hàm gọi sự kiện đóng dialog mã nhân viên đã tồn tại từ component cha (EmployeeDetail)
     * created by : BNTIEN
     * created date: 29-05-2023 08:32:41
     */
    btnAgree() {
      this.$emit("closeDialogCodeExist");
    },
  },
};
</script>

<style scoped>
@import url(@/css/base/dialog.css);

p {
  line-height: 1.5;
}
</style>
