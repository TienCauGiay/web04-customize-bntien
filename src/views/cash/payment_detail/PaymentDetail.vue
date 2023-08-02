<template>
  <div id="info-payment-detail" ref="PaymentDetail">
    <div class="header-layout">
      <div class="top-header">
        <div class="top-header-left">
          <div class="top-header-left-icon">
            <div class="refresh-time-icon"></div>
          </div>
          <div class="name-payment-slip">Phiếu chi PC00019</div>
          <div class="top-header-select-option">
            <div class="content-header-select-option">
              1. Trả tiền nhà cung cấp (không theo hóa đơn)
            </div>
            <button
              class="header-icon-arrow"
              @click="isShowOptionHeader = !isShowOptionHeader"
            >
              <div class="function-icon"></div>
            </button>
            <div class="menu-select-option-header" v-show="isShowOptionHeader">
              <template
                v-for="(item, index) in this.$_MISAResource[this.$_LANG_CODE]
                  .RECEIPT_PAYMENT.FORM_PAYMENT.optionHeader"
                :key="index"
              >
                <div
                  class="item-select-option-header"
                  @click="selectedPage(item, index)"
                >
                  {{ item }}
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="top-header-right">
          <div class="guide-use">
            <div class="top-header-right-icon">
              <div class="guide-icon"></div>
            </div>
            <a>Hướng dẫn</a>
          </div>
          <div class="container-icon">
            <div class="setting-big-icon"></div>
          </div>
          <div class="container-icon">
            <div class="question-icon"></div>
          </div>
          <div class="container-icon">
            <div class="close-icon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="body-layout">
      <div class="body-layout-input">
        <div class="layout-input-cotent">
          <div class="layout-input-cotent-left">
            <div class="row">
              <div class="layout-input-cotent-left-3">
                <div class="label-input">Mã nhà cung cấp</div>
                <div class="container-input-payment-detail">
                  <div class="text-input">
                    <misa-combobox-select-single
                      :propCode="'EmployeeCode'"
                      :propId="'EmployeeId'"
                      :propName="'FullName'"
                      :nameColFirst="'Mã nhân viên'"
                      :nameColSecond="'Tên nhân viên'"
                      :isBorderRedCBB="{ EmployeeId: false, FullName: false }"
                      :errorsCBB="errors"
                      :entityCBB="{
                        EmployeeCode: 1,
                        EmployeeId: 1,
                        FullName: 1,
                      }"
                      :listEntitySearchCBB="[
                        { EmployeeCode: 1, EmployeeId: 1, FullName: 1 },
                      ]"
                    ></misa-combobox-select-single>
                  </div>
                  <div class="dola-money">
                    <div class="dola-icon"></div>
                  </div>
                </div>
              </div>
              <div class="layout-input-cotent-left-4">
                <div class="label-input">Tên nhà cung cấp</div>
                <div class="container-input-payment-detail">
                  <misa-input></misa-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="layout-input-cotent-left-3">
                <div class="label-input">Người nhận</div>
                <div class="container-input-payment-detail">
                  <misa-input></misa-input>
                </div>
              </div>
              <div class="layout-input-cotent-left-4">
                <div class="label-input">Địa chỉ</div>
                <div class="container-input-payment-detail">
                  <misa-input></misa-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="layout-input-cotent-left-7">
                <div class="label-input">Lí do chi</div>
                <div class="container-input-payment-detail">
                  <misa-input></misa-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="layout-input-cotent-left-3">
                <div class="label-input">Nhân viên</div>
                <div class="container-input-payment-detail">
                  <div class="text-input-2">
                    <misa-combobox-select-single
                      :propCode="'EmployeeCode'"
                      :propId="'EmployeeId'"
                      :propName="'FullName'"
                      :nameColFirst="'Mã nhân viên'"
                      :nameColSecond="'Tên nhân viên'"
                      :isBorderRedCBB="{ EmployeeId: false, FullName: false }"
                      :errorsCBB="errors"
                      :entityCBB="{
                        EmployeeCode: 1,
                        EmployeeId: 1,
                        FullName: 1,
                      }"
                      :listEntitySearchCBB="[
                        { EmployeeCode: 1, EmployeeId: 1, FullName: 1 },
                      ]"
                    ></misa-combobox-select-single>
                  </div>
                </div>
              </div>
              <div class="layout-input-cotent-left-4">
                <div class="label-input">Kèm theo</div>
                <div class="quantity">
                  <misa-input :placeholder="'Số lượng'"></misa-input>
                  <div>chứng từ gốc</div>
                </div>
              </div>
            </div>
            <div class="small-row">
              <div>Tham chiếu</div>
              <div class="select-reference">...</div>
            </div>
          </div>
          <div class="layout-input-cotent-right"></div>
        </div>
        <div class="layout-input-total"></div>
      </div>
      <div class="body-layout-table"></div>
      <div class="body-layout-attach"></div>
    </div>
    <div class="footer-layout">
      <div class="footer-layout-left">
        <button class="btn-black">Hủy</button>
      </div>
      <div class="footer-layout-right">
        <button class="btn-black">Cất</button>
        <div class="select-button">
          <button class="btn-green">Cất và Thêm</button>
          <div class="boundary-btn"></div>
          <button class="btn-green-icon">
            <div class="dropdown-white-icon"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentDetail",

  data() {
    return {
      // Biến quy định trạng thái hiển thị menu chọn phiếu chi
      isShowOptionHeader: false,
    };
  },
};
</script>

<style scoped>
@import url(./PaymentDetail.css);

input {
  height: 28px;
  border-radius: 2px;
  border: 1px solid #babec5;
}
</style>
