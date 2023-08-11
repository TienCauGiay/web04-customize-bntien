<template>
  <div class="cbb-select-multiple">
    <div class="cbb-select-multiple-main">
      <template v-for="(item, index) in listDataSelected" :key="index">
        <div class="item-select-multiple" v-if="listDataSelected.length > 0">
          <div class="item-select-multiple-text">{{ item[propCode] }}</div>
          <div class="item-select-multiple-icon" @click="deleteItem(item)">
            <div class="close-small-icon icon-n"></div>
          </div>
        </div>
      </template>
      <div class="textfiled-cbb-select-multiple">
        <input class="input-cbb-select-multiple" type="text" v-model="textSearch" @input="onSearchChange" />
      </div>
    </div>
    <div class="cbb-select-multiple-action">
      <div class="select-multiple-action-add">
        <div class="plus-green-icon"></div>
      </div>
      <div class="select-multiple-action-dropdown" @click="this.isShowSelectMenu = !this.isShowSelectMenu">
        <div class="function-icon"></div>
      </div>
    </div>
  </div>
  <div class="select-item-cbb-multiple" style="position: relative" v-if="isShowSelectMenu">
    <div class="form-cbb-menu" id="form-cbb-menu-select-multiple">
      <div class="form-cbb-menu-title">
        <div class="col-1-cbb-menu-item">Mã nhóm KH</div>
        <div class="col-2-cbb-menu-item">Tên nhóm KH, NCC</div>
      </div>
      <div class="form-cbb-main" ref="cbbSelectMultiple" @scroll="handleScroll">
        <template v-for="item in listEntitySearchCBB.Data" :key="item[propId]">
          <div class="form-cbb-menu-item" @click="toggleSelectEntity(item)" v-if="listEntitySearchCBB.Data.length > 0">
            <div class="col-1-cbb-menu-item">{{ item[propCode] }}</div>
            <div class="col-2-cbb-menu-item">
              {{ item[propName] }}
            </div>
            <div class="checked-green-icon" v-show="listCode.includes(item[propCode])"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAComboboxMultiple",

  props: ["listDataSelected", "propId", "propCode", "propName", "listEntitySearchCBB"],

  computed: {
    listCode() {
      if (this.listDataSelected) {
        return this.listDataSelected.map((x) => x[this.propCode]);
      }
      return [];
    },
  },

  data() {
    return {
      // Biến quy định trạng thái hiển thị select menu
      isShowSelectMenu: false,
      // Khai báo biến lưu giá trị tìm kiếm group
      textSearch: "",
    };
  },

  methods: {
    /**
     * Mô tả: Toggle lựa chọn nhóm
     * created by : BNTIEN
     * created date: 29-07-2023 21:35:19
     */
    toggleSelectEntity(item) {
      try {
        const isUnSelect = this.listCode.includes(item[this.propCode]);
        this.$_MISAEmitter.emit("toggleCBBSelectMultiple", item, isUnSelect);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xóa item khi click icon x
     * created by : BNTIEN
     * created date: 29-07-2023 22:36:53
     */
    deleteItem(item) {
      try {
        this.$_MISAEmitter.emit("deleteItemCBBSelectMultiple", item);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm để xử lý khi scroll combobox
     * created by : BNTIEN
     * created date: 29-07-2023 22:45:32
     */
    async handleScroll() {
      try {
        const cbb = this.$refs.cbbSelectMultiple;
        const remainingSpace = cbb.scrollHeight - (cbb.scrollTop + cbb.clientHeight);

        // Kiểm tra xem đã scroll đến cuối combobox chưa
        if (remainingSpace <= 10) {
          // Gọi API để lấy thêm dữ liệu
          await this.$_MISAEmitter.emit("handleScrollCBBSelectMultiple", this.textSearch);
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Tìm kiếm nhóm nhà cung cấp
     * created by : BNTIEN
     * created date: 29-07-2023 23:18:53
     */
    async onSearchChange() {
      try {
        await this.$_MISAEmitter.emit("onSearchChangeCBBSelectMultiple", this.textSearch);
        this.isShowSelectMenu = true;
      } catch {
        return;
      }
    },
  },
};
</script>

<style scoped>
@import url(./MISAComboboxSelectMultiple.css);
</style>
