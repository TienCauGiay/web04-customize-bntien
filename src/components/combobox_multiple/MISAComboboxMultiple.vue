<template>
  <div class="cbb-multiple" id="cbb-multiple">
    <div class="input-cbb-mutiple">
      <input class="textfield-cbb-multiple" type="text" />
      <div class="icon-cbb-multiple" v-if="isShowIconPlus">
        <div class="icon-l plus-green-icon"></div>
      </div>
    </div>
    <div class="e-icon-cbb">
      <div class="function-icon"></div>
    </div>
  </div>
  <div class="select-item-cbb-multiple" style="position: relative" v-if="false">
    <div class="form-cbb-menu">
      <div class="form-cbb-menu-title">
        <div class="col-1-cbb-menu-item">Mã nhóm KH</div>
        <div class="col-2-cbb-menu-item">Tên nhóm KH, NCC</div>
      </div>
      <div class="form-cbb-menu-item">
        <div class="col-1-cbb-menu-item">Mã nhóm KH, NCC fjdkfsfhsjfsfhj</div>
        <div class="col-2-cbb-menu-item">
          Tên nhóm KH, NCC fksfsjfksfjskfjskfskfhskfhsfjhkjfdsjfskfskfksfklsjfl
        </div>
        <div class="checked-green-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAComboboxMultiple",

  props: ["isShowIconPlus"],
};
</script>

<style scoped>
@import url(./MISAComboboxMultiple.css);
</style>
