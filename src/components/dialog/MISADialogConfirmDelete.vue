<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-warning-delete-employee"
  >
    <div class="title-dialog">
      <h1>
        {{ this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.CONFIRM_DELETE }}
      </h1>
      <div class="close-icon" @click="btnNoConfirmDelete"></div>
    </div>
    <div class="dialog-content">
      <div class="warning-yellow-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>
          {{
            this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT
              .CONFIRM_DELETE_PRE
          }}
          &lt;{{ this.employeeCodeDelete }}&gt;
          {{ this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.END }}
        </p>
      </div>
    </div>
    <div class="dialog-warning-delete-footer">
      <misa-button-extra
        @click="btnNoConfirmDelete"
        :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].BUTTON.NO"
      ></misa-button-extra>
      <misa-button-default
        @click="btnConfirmDelete"
        :textButtonDefault="this.$_MISAResource[this.$_LANG_CODE].BUTTON.YES"
      ></misa-button-default>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogConfirmDelete",
  props: ["employeeCodeDelete"],
  methods: {
    /**
     * Mô tả: Hàm gọi sự kiện xóa nhân viên khi người dùng chọn có trong component cha (EmployeeList)
     * created by : BNTIEN
     * created date: 29-05-2023 08:33:41
     */
    btnConfirmDelete() {
      this.$emit("confirmYesDeleteEmployee");
    },

    /**
     * Mô tả: Hàm gọi sự kiện hủy xóa nhân viên khi người dùng chọn không trong component cha (EmployeeList)
     * created by : BNTIEN
     * created date: 29-05-2023 08:35:00
     */
    btnNoConfirmDelete() {
      this.$emit("confirmNoDeleteEmployee");
    },
  },
};
</script>

<style>
@import url(@/css/base/dialog.css);
</style>
