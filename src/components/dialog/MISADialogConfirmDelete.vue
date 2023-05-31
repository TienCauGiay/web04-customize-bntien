<template>
  <div
    class="dialog-employee position-display-center"
    id="dialog-warning-delete-employee"
  >
    <div class="dialog-content">
      <div class="warning-yellow-icon dialog-content-icon"></div>
      <div class="dialog-content-main">
        <p>
          Bạn có thực sự muốn xóa nhân viên &lt;{{
            this.employeeCodeDelete
          }}&gt; không?
        </p>
      </div>
    </div>
    <div class="dialog-warning-delete-footer">
      <misa-button-extra
        @click="btnNoConfirmDelete"
        :textButtonExtra="'Không'"
      ></misa-button-extra>
      <misa-button-default
        class="btn-no-minwwidth"
        @click="btnConfirmDelete"
        :textButtonDefault="'Có'"
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
