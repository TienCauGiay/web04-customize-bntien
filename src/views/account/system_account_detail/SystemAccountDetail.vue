<template>
  <div
    id="detail-add-system-account"
    class="position-display-right"
    ref="FormDetailSystemAccount"
  >
    <div class="form-detail-toolbar">
      <div
        class="question-icon icon-tb"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.HELP"
      ></div>
      <div
        @click="onCloseFormDetail"
        class="close-icon icon-tb"
        id="system-account-exit"
        @keydown.tab.prevent="resetTab($event.target.value)"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.EXIST"
      ></div>
    </div>
    <div class="form-detail-main">
      <div class="system-account-title">
        <p>
          <b>Thêm tài khoản</b>
        </p>
      </div>
      <div class="form-detail-content">
        <div class="full-content">
          <div class="col-md-quater">
            <label>
              Số tài khoản
              <span class="s-require">*</span>
            </label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false"></div>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>
              Tên tài khoản
              <span class="s-require">*</span>
            </label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false"></div>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label> Tên tiếng anh </label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false"></div>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-half">
            <label> Tài khoản tổng hợp </label>
            <misa-combobox
              :isBorderRedCBB="isBorderRed"
              :entityCBB="tktk"
              :errorsCBB="errors"
              :listEntitySearchCBB="listtkthearch"
              :propName="'tName'"
              :propId="'tID'"
            ></misa-combobox>
          </div>
          <div class="col-md-half">
            <label>
              Tính chất
              <span class="s-require">*</span>
            </label>
            <misa-combobox
              :isBorderRedCBB="isBorderRed"
              :entityCBB="tktk"
              :errorsCBB="errors"
              :listEntitySearchCBB="listtkthearch"
              :propName="'tName'"
              :propId="'tID'"
            ></misa-combobox>
          </div>
        </div>
        <div class="full-content-area">
          <div class="col-md-l">
            <label> Diễn giải </label>
            <misa-input-textarea></misa-input-textarea>
          </div>
        </div>
        <div class="full-content">
          <div class="employee-check">
            <input type="checkbox" />
            <span>Có hạch toán ngoại tệ</span>
          </div>
        </div>
        <div class="system-account-track-detail">
          <div class="title-track-detail">
            <div class="title-track-detail-icon">
              <div class="function-icon" style="scale: 1.5 1.5"></div>
            </div>
            <div class="title-track-detail-text">Theo dõi chi tiết theo</div>
          </div>
          <div class="content-track-detail">
            <div class="content-track-detail-row">
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Đối tượng</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Tài khoản ngân hàng</span>
                </div>
              </div>
            </div>
            <div class="content-track-detail-row">
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Đối tượng THCP</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Công trình</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
            </div>
            <div class="content-track-detail-row">
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Đơn đặt hàng</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Hợp đồng bán</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
            </div>
            <div class="content-track-detail-row">
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Hợp đồng mua</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Khoản mục CP</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
            </div>
            <div class="content-track-detail-row">
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Đơn vị</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
              <div class="content-track-detail-halfrow">
                <div class="employee-check">
                  <input type="checkbox" />
                  <span>Mã thông kê</span>
                </div>
                <misa-select-option></misa-select-option>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-detail-action">
        <div class="action-left">
          <misa-button-extra
            :textButtonExtra="
              this.$_MISAResource[this.$_LANG_CODE].BUTTON.CANCEL
            "
            @click="btnCancel"
            :tabindex="22"
          ></misa-button-extra>
        </div>
        <div class="action-right">
          <misa-button-extra
            :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].BUTTON.SAVE"
            @click="btnSave"
            :tabindex="20"
            :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.SAVE"
          ></misa-button-extra>
          <misa-button-default
            :textButtonDefault="
              this.$_MISAResource[this.$_LANG_CODE].BUTTON.SAVE_AND_ADD
            "
            @click="btnSaveAndAdd"
            :tabindex="21"
            :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.SAVE_AND_ADD"
          ></misa-button-default>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemAccountDetail",

  data() {
    return {
      isBorderRed: { tName: false, tID: false },
      tktk: { tName: "", tID: "" },
      listtkthearch: [],
      errors: { tName: "", tID: "" },
    };
  },
};
</script>

<style scoped>
@import url(./SystemAccountDetail.css);

input {
  height: 26px !important;
}
</style>
