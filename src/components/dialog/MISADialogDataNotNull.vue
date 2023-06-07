<template>
  <div class="overlay-dialog">
    <div
      class="dialog-employee position-display-center"
      id="dialog-danger-employee"
    >
      <div class="title-dialog">
        <h1>Lưu ý !</h1>
        <div class="close-icon" @click="btnClose"></div>
      </div>
      <div class="dialog-content">
        <div class="danger-red-icon dialog-content-icon"></div>
        <div class="dialog-content-main">
          <li v-for="(item, index) in this.valueNotNull" :key="index">
            {{ item }}
          </li>
        </div>
      </div>
      <div class="dialog-danger-footer">
        <misa-button-default
          :textButtonDefault="'Đóng'"
          @click="btnClose"
        ></misa-button-default>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialogDataNotNull",
  props: ["valueNotNull"],
  methods: {
    /**
     * Mô tả: Hàm gọi sự kiện cất và thêm trong component cha (EmployeeDetail)
     * created by : BNTIEN
     * created date: 29-05-2023 08:35:28
     */
    btnClose() {
      this.$emit("closeBtnSaveAndAdd");
    },
  },
};
</script>

<style>
@import url(@/css/base/dialog.css);
</style>
