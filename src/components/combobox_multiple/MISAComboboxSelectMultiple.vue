<template>
  <div class="cbb-select-multiple">
    <div class="cbb-select-multiple-main">
      <template v-for="(item, index) in listDataSelected" :key="index">
        <div class="item-select-multiple" v-if="listDataSelected.length > 0">
          <div class="item-select-multiple-text">{{ item }}</div>
          <div class="item-select-multiple-icon">
            <div class="close-small-icon icon-n"></div>
          </div>
        </div>
      </template>
      <div class="textfiled-cbb-select-multiple">
        <input class="input-cbb-select-multiple" type="text" />
      </div>
    </div>
    <div class="cbb-select-multiple-action">
      <div class="select-multiple-action-add">
        <div class="plus-green-icon"></div>
      </div>
      <div
        class="select-multiple-action-dropdown"
        @click="this.isShowSelectMenu = !this.isShowSelectMenu"
      >
        <div class="function-icon"></div>
      </div>
    </div>
  </div>
  <div
    class="select-item-cbb-multiple"
    style="position: relative"
    v-if="isShowSelectMenu"
  >
    <div class="form-cbb-menu" id="form-cbb-menu-select-multiple">
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

  props: ["listDataSelected"],

  data() {
    return {
      // Biến quy định trạng thái hiển thị select menu
      isShowSelectMenu: false,
    };
  },

  methods: {},
};
</script>

<style scoped>
@import url(./MISAComboboxSelectMultiple.css);
</style>
