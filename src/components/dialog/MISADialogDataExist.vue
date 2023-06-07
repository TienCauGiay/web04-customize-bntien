<template>
  <div class="overlay-dialog">
    <div
      class="dialog-employee position-display-center"
      id="dialog-warning-employee"
    >
      <div class="title-dialog">
        <h1>Thông báo</h1>
        <div class="close-icon" @click="btnAgree"></div>
      </div>
      <div class="dialog-content">
        <div class="warning-yellow-icon dialog-content-icon"></div>
        <div class="dialog-content-main">
          <p>
            Mã nhân viên &lt;{{ this.textEmployeeCodeExist }}&gt; đã tồn tại
            trong hệ thống, vui lòng kiểm tra lại.
          </p>
        </div>
      </div>
      <div class="dialog-warning-footer">
        <misa-button-default
          :textButtonDefault="'Đồng ý'"
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

<style>
@import url(@/css/base/dialog.css);
</style>
