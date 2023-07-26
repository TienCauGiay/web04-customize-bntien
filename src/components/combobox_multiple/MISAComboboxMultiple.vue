<template>
  <div class="cbb-multiple" id="cbb-multiple">
    <!-- <div class="list-item-selected">
      <template v-for="(item, index) in listDataSelected" :key="item">
        <button>
          <div>{{ item }}</div>
          <div
            class="icon-n close-icon"
            style="scale: 0.4 0.4"
            @click="deleteItem(index)"
          ></div>
        </button>
      </template>
    </div> -->
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

  data() {
    return {
      // Biến quy định trạng thái hiển thị select menu
      isShowSelectMenu: false,
      listDataSelected: [
        "2",
        "aaa",
        "1231231231",
        "656",
        "n12",
        "02492",
        "2",
        "aaa",
      ],
    };
  },

  methods: {
    deleteItem(index) {
      this.listDataSelected.splice(index, 1);
    },
  },
};
</script>

<style scoped>
@import url(./MISAComboboxMultiple.css);
</style>
