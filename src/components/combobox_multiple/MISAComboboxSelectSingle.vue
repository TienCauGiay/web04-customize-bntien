<template>
  <div
    class="cbb-multiple"
    id="cbb-multiple"
    :class="{
      'border-red': isBorderRedCBB[propName] || isBorderRedCBB[propId],
    }"
  >
    <div class="input-cbb-mutiple">
      <div class="container-input">
        <misa-input
          ref="InputCBB"
          :value="entityCBB[propName]"
          @input="onSearchChange"
          @keydown="onKeyDownEntity"
          @mouseenter="isHoveringCBB = true"
          @mouseleave="isHoveringCBB = false"
        ></misa-input>
        <div
          class="misa-tooltip"
          v-if="
            isHoveringCBB &&
            (isBorderRedCBB[propName] ||
              isBorderRedCBB[propId] ||
              !entityCBB[propName]) &&
            (errorsCBB[propName] || errorsCBB[propId])
          "
        >
          {{ errorsCBB[propName] ? errorsCBB[propName] : errorsCBB[propId] }}
        </div>
      </div>
    </div>
    <div class="icon-cbb-multiple">
      <div class="icon-l plus-green-icon"></div>
    </div>
    <div
      class="e-icon-cbb"
      @click="this.isShowSelectEntity = !this.isShowSelectEntity"
    >
      <div class="function-icon"></div>
    </div>
  </div>
  <div
    class="select-item-cbb-multiple"
    style="position: relative"
    v-if="isShowSelectEntity"
    @click="this.isShowSelectEntity = !this.isShowSelectEntity"
  >
    <div class="form-cbb-menu" id="form-cbb-menu-select-single">
      <div class="form-cbb-menu-title">
        <div class="col-1-cbb-menu-item">{{ nameColFirst }}</div>
        <div class="col-2-cbb-menu-item">{{ nameColSecond }}</div>
      </div>
      <div class="form-cbb-main" ref="cbbSelectSingle" @scroll="handleScroll">
        <template
          v-for="(item, index) in listEntitySearchCBB.Data"
          :key="item[propId]"
        >
          <div
            class="form-cbb-menu-item"
            @click="onSelectedEntity(item, index)"
            :class="{ 'cbb-selected': index == indexEntitySelected }"
            ref="EntitySelectedItem"
          >
            <div class="col-1-cbb-menu-item">
              {{ item[propCode] }}
            </div>
            <div class="col-2-cbb-menu-item">
              {{ item[propName] }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAComboboxMultiple",

  props: [
    "propId",
    "propCode",
    "propName",
    "nameColFirst",
    "nameColSecond",
    "isBorderRedCBB",
    "entityCBB",
    "errorsCBB",
    "listEntitySearchCBB",
  ],

  data() {
    return {
      // Biến quy định trạng thái hiển thị select menu
      isShowSelectEntity: false,
      // Khai báo biến kiểm tra xem ô input có đang được hover hay không
      isHoveringCBB: false,
      // Khai báo chỉ số đang được chọn trong combobox
      indexEntitySelected: 0,
    };
  },

  mounted() {
    this.$_MISAEmitter.on("focusInputCBBSelectSingle", () => {
      this.$refs["InputCBB"].focus();
    });
    this.$_MISAEmitter.on("closeMenuItemCBBSelectSingle", () => {
      this.isShowSelectEntity = false;
    });
  },

  methods: {
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn nhân viên mua hàng
     * created by : BNTIEN
     * created date: 30-07-2023 08:48:34
     */
    onSelectedEntity(item, index) {
      this.$_MISAEmitter.emit("onSelectedEntityCBBSingle", item, this.propId);
      this.indexEntitySelected = index;
    },

    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    async onSearchChange() {
      try {
        await this.$_MISAEmitter.emit(
          "onSearchChangeCBBSingle",
          event.target.value,
          this.propId
        );
        this.isShowSelectEntity = true;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm xử scroll theo khi bấm lên xuống
     * created by : BNTIEN
     * created date: 07-06-2023 08:37:33
     */
    scrollIndex(index, checkKeyCode) {
      try {
        const element = this.$refs.EntitySelectedItem[index];
        if (checkKeyCode === this.$_MISAEnum.KEY_CODE.DOWN) {
          element.scrollIntoView({
            block:
              this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SCROLL.END,
          });
        } else if (checkKeyCode === this.$_MISAEnum.KEY_CODE.UP) {
          element.scrollIntoView({
            block:
              this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SCROLL.START,
          });
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện bấm lên xuống enter để chọn đơn vị
     * created by : BNTIEN
     * created date: 06-06-2023 22:02:18
     */
    onKeyDownEntity(event) {
      try {
        const maxLength = this.listEntitySearchCBB.Data.length;
        if (maxLength == 0) {
          return;
        } else {
          if (event.keyCode == this.$_MISAEnum.KEY_CODE.DOWN) {
            // Bấm xuống
            if (this.isShowSelectEntity) {
              if (this.indexEntitySelected < maxLength - 1) {
                this.indexEntitySelected++;
              } else if (this.indexEntitySelected == maxLength - 1) {
                this.indexEntitySelected = 0;
              }
              // scroll focus theo item được chọn
              this.scrollIndex(
                this.indexEntitySelected,
                this.$_MISAEnum.KEY_CODE.DOWN
              );
            } else {
              this.isShowSelectEntity = true;
            }
          } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.UP) {
            // Bấm lên
            if (this.isShowSelectEntity) {
              if (this.indexEntitySelected > 0) {
                this.indexEntitySelected--;
              } else if (this.indexEntitySelected == 0) {
                this.indexEntitySelected = maxLength - 1;
              }
              // scroll focus theo item được chọn
              this.scrollIndex(
                this.indexEntitySelected,
                this.$_MISAEnum.KEY_CODE.UP
              );
            } else {
              this.isShowSelectEntity = true;
            }
          } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.ENTER) {
            // Bấm enter
            if (this.isShowSelectEntity) {
              this.$_MISAEmitter.emit(
                "onKeyDownEntityCBBSingle",
                this.indexEntitySelected,
                this.propId
              );
              this.isShowSelectEntity = false;
            } else {
              this.isShowSelectEntity = true;
            }
          }
        }
      } catch {
        return;
      }
    },
  },

  beforeUnmount() {
    this.$_MISAEmitter.off("focusInputCBBSelectSingle");
    this.$_MISAEmitter.off("closeMenuItemCBBSelectSingle");
  },
};
</script>

<style scoped>
@import url(./MISAComboboxSelectSingle.css);

input {
  height: calc(26px - 0.667px * 2);
  width: calc(100% - calc(26px - 0.667px * 2));
  box-sizing: border-box;
  border: unset;
  border-radius: 4px 0 0 4px;
  padding: 0;
}

input:focus {
  border: unset;
}

.border-red {
  border: 1px solid red;
}

#detail-info-provider .cbb-selected {
  background-color: var(--color-btn-default);
  color: #ffffff;
}
</style>
