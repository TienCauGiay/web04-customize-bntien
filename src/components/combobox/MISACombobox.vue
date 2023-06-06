<template>
  <div class="mcombobox">
    <input
      class="mcombobox-input"
      type="text"
      :tabindex="this.tabIndex"
      v-model="textSearch"
      @keydown="onChangeText"
    />
    <button class="mcombobox-button" @click="btnOnShow">
      <div class="function-icon"></div>
    </button>
    <div class="mcombobox-data" v-show="isShow">
      <div
        class="mcombobox-item"
        v-for="(item, index) in itemsFilter"
        :key="index"
        @click="onSelectItem(item)"
        :class="{ 'mcombobox-item-selected': index == indexSelected }"
      >
        {{ item[propText] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISACombobox",
  props: ["listData", "propText", "tabIndex"],
  created() {
    this.items = this.listData;
    this.itemsFilter = this.listData;
  },
  data() {
    return {
      items: [],
      itemsFilter: [],
      isShow: false,
      itemSelected: {},
      indexSelected: 0,
      textSearch: "",
    };
  },
  watch: {
    textSearch: function (newValue) {
      const propText = this.propText;
      this.itemsFilter = this.items.filter((x) =>
        x[propText].includes(newValue)
      );
      this.isShow = true;
    },
  },
  methods: {
    btnOnShow() {
      this.isShow = true;
    },
    onSelectItem(item) {
      const text = item[this.propText];
      this.itemSelected[this.propText] = text;
      this.isShow = false;
    },
    onChangeText(event) {
      console.log(event.keyCode);
      const maxLenght = this.itemsFilter.lenght;
      if (maxLenght == 0) {
        return;
      } else {
        if (event.keyCode == this.$_MISAEnum.KEY_CODE.UP) {
          // bấm lên
          if (this.indexSelected > 0) {
            this.indexSelected--;
          }
        } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.DOWN) {
          // bấm xuống
          if (this.indexSelected < maxLenght) {
            this.indexSelected++;
          }
        }
      }
    },
  },
};
</script>

<style>
@import url(./MISACombobox.css);
</style>
