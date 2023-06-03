<template>
  <div class="toast-success">
    <div class="toast-info">
      <div class="check-green-icon"></div>
      <p><b>Thành công!</b> {{ this.contentToast }}</p>
    </div>
    <div class="toast-exits">
      <div class="icon-tb close-icon" @click="onCloseToastMessage"></div>
      <a href="#">Hoàn tác</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAToastSuccess",
  props: ["contentToast"],
  methods: {
    onCloseToastMessage() {
      this.$emit("closeToastMessage");
    },
  },
};
</script>

<style>
@import url(@/css/base/toastmessage.css);
</style>
