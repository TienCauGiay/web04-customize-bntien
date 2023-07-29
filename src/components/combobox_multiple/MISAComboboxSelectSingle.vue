<template>
  <div class="cbb-multiple" id="cbb-multiple">
    <div class="input-cbb-mutiple">
      <input class="textfield-cbb-multiple" type="text" />
    </div>
    <div class="icon-cbb-multiple">
      <div class="icon-l plus-green-icon"></div>
    </div>
    <div
      class="e-icon-cbb"
      @click="this.isShowSelectMenu = !this.isShowSelectMenu"
    >
      <div class="function-icon"></div>
    </div>
  </div>
  <div
    class="select-item-cbb-multiple"
    style="position: relative"
    v-if="isShowSelectMenu"
  >
    <div class="form-cbb-menu" id="form-cbb-menu-select-single">
      <div class="form-cbb-menu-title">
        <div class="col-1-cbb-menu-item">Mã nhóm KH</div>
        <div class="col-2-cbb-menu-item">Tên nhóm KH, NCC</div>
      </div>
      <div class="form-cbb-menu-item">
        <div class="col-1-cbb-menu-item">Mã nhóm KH, NCC fjdkfsfhsjfsfhj</div>
        <div class="col-2-cbb-menu-item">
          Tên nhóm KH, NCC fksfsjfksfjskfjskfskfhskfhsfjhkjfdsjfskfskfksfklsjfl
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAComboboxMultiple",

  data() {
    return {
      // Biến quy định trạng thái hiển thị select menu
      isShowSelectMenu: false,
    };
  },
};
</script>

<style scoped>
@import url(./MISAComboboxSelectSingle.css);
</style>
