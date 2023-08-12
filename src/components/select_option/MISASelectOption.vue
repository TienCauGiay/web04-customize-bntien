<template>
  <div style="position: relative">
    <div class="a-cbb" id="a-cbb">
      <input
        type="text"
        class="a-textfield-cbb"
        :class="{ noDisabled: !isDisabledMenu }"
        :value="itemSelected[propName]"
        readonly
        @keydown="onKeyDownEntity"
      />
      <button
        :disabled="isDisabledMenu"
        class="a-icon-cbb"
        :class="{ noDisabled: !isDisabledMenu }"
        @click="this.isShowMenuSelect = !this.isShowMenuSelect"
      >
        <div class="function-icon"></div>
      </button>
    </div>
    <div class="col-md-l a-select-entity" v-if="isShowMenuSelect">
      <ul>
        <template v-for="(item, index) in listData" :key="index">
          <li
            ref="EntitySelectedItem"
            @click="handleSelectItem(item, index)"
            :class="{ 'item-selected': index == indexSelected }"
          >
            {{ item[propName] }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISASelectOption",

  props: ["listData", "propName", "propCode", "isDisabledMenu", "valueSelected"],

  created() {
    this.$_MISAEmitter.on("selectedDefaultItem", () => {
      this.itemSelected = this.listData[0];
    });
    this.$_MISAEmitter.on("unSelectedDefaultItem", () => {
      this.itemSelected = {};
    });
    this.$_MISAEmitter.on("closeMenuSelectOption", () => {
      this.isShowMenuSelect = false;
    });
  },

  mounted() {
    this.itemSelected[this.propName] = this.valueSelected;
  },

  data() {
    return {
      // Biến quy định trạng thái hiển thị menu
      isShowMenuSelect: false,
      // Biến lưu item được chọn
      itemSelected: {},
      // Biến lưu vị trí được chọn
      indexSelected: 0,
    };
  },

  methods: {
    /**
     * Mô tả: Hàm xử scroll theo khi bấm lên xuống
     * created by : BNTIEN
     * created date: 11-08-2023 10:21:18
     */
    scrollIndex(index, checkKeyCode) {
      try {
        const element = this.$refs.EntitySelectedItem[index];
        if (checkKeyCode === this.$_MISAEnum.KEY_CODE.DOWN) {
          element.scrollIntoView({
            block: this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SCROLL.END,
          });
        } else if (checkKeyCode === this.$_MISAEnum.KEY_CODE.UP) {
          element.scrollIntoView({
            block: this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SCROLL.START,
          });
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí keydowm lên xuống, enter
     * created by : BNTIEN
     * created date: 11-08-2023 10:21:26
     */
    onKeyDownEntity(event) {
      if (!this.isDisabledMenu) {
        try {
          const maxLength = this.listData.length;
          if (maxLength == 0) {
            return;
          } else {
            if (event.keyCode == this.$_MISAEnum.KEY_CODE.DOWN) {
              // Bấm xuống
              if (this.isShowMenuSelect) {
                if (this.indexSelected < maxLength - 1) {
                  this.indexSelected++;
                } else if (this.indexSelected == maxLength - 1) {
                  this.indexSelected = 0;
                }
                // scroll focus theo item được chọn
                this.scrollIndex(this.indexSelected, this.$_MISAEnum.KEY_CODE.DOWN);
              } else {
                this.isShowMenuSelect = true;
              }
            } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.UP) {
              // Bấm lên
              if (this.isShowMenuSelect) {
                if (this.indexSelected > 0) {
                  this.indexSelected--;
                } else if (this.indexSelected == 0) {
                  this.indexSelected = maxLength - 1;
                }
                // scroll focus theo item được chọn
                this.scrollIndex(this.indexSelected, this.$_MISAEnum.KEY_CODE.UP);
              } else {
                this.isShowMenuSelect = true;
              }
            } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.ENTER) {
              // Bấm enter
              if (this.isShowMenuSelect) {
                this.itemSelected = this.listData[this.indexSelected];
                this.$_MISAEmitter.emit(
                  "onKeyDownSelectOption",
                  this.listData[this.indexSelected][this.propCode],
                  this.propCode.substring(0, this.propCode.length - 4)
                );
                this.isShowMenuSelect = false;
              } else {
                this.isShowMenuSelect = true;
              }
            }
          }
        } catch {
          return;
        }
      }
    },
    /**
     * Mô tả: Chọn giá trị
     * created by : BNTIEN
     * created date: 11-08-2023 10:17:42
     */
    handleSelectItem(item, index) {
      this.itemSelected = item;
      this.indexSelected = index;
      this.isShowMenuSelect = false;
      this.$_MISAEmitter.emit(
        "onSelectedSelectOption",
        item[this.propCode],
        this.propCode.substring(0, this.propCode.length - 4)
      );
    },
  },

  beforeUnmount() {
    this.$_MISAEmitter.off("selectedDefaultItem");
    this.$_MISAEmitter.off("unSelectedDefaultItem");
    this.$_MISAEmitter.off("closeMenuSelectOption");
  },
};
</script>

<style scoped>
@import url(./MISASelectOption.css);

.item-selected {
  background-color: var(--color-btn-default);
  color: #ffffff;
}

.item-selected:hover {
  background-color: var(--color-btn-default);
  color: #ffffff;
}

.noDisabled {
  background-color: #ffffff;
}

button.noDisabled:hover {
  background-color: var(--color-border-default);
}
</style>
