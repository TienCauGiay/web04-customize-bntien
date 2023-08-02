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
                  <misa-input
                    :placeholder="'Số lượng'"
                    :class="'right-to-left'"
                  ></misa-input>
                  <div>chứng từ gốc</div>
                </div>
              </div>
            </div>
            <div class="small-row">
              <div>Tham chiếu</div>
              <div class="select-reference">...</div>
            </div>
          </div>
          <div class="layout-input-cotent-right">
            <div class="row-input-cotent-right">
              <div class="label-input">Ngày hạch toán</div>
              <misa-input type="date"></misa-input>
            </div>
            <div class="row-input-cotent-right">
              <div class="label-input">Ngày phiếu chi</div>
              <misa-input type="date"></misa-input>
            </div>
            <div class="row-input-cotent-right">
              <div class="label-input">Số phiếu chi</div>
              <misa-input></misa-input>
            </div>
          </div>
        </div>
        <div class="layout-input-total">
          <div class="text-total-money">Tổng tiền</div>
          <div class="total-money">0,00</div>
        </div>
      </div>
      <div class="body-layout-table">
        <div class="body-layout-table-title">Hạch toán</div>
        <div class="body-layout-table-input">
          <table class="table-input" id="table-input-payment-detail">
            <thead class="table-input-title">
              <tr>
                <th class="table-col-1 text-center">#</th>
                <th class="table-col-2">Diễn giải</th>
                <th class="table-col-3">TK nợ</th>
                <th class="table-col-4">Tk có</th>
                <th class="table-col-5 text-right" style="padding-right: 12px">
                  Số tiền
                </th>
                <th class="table-col-6"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="table-col-1 text-center">1</td>
                <td class="table-col-2"><misa-input></misa-input></td>
                <td class="table-col-3"><misa-input></misa-input></td>
                <td class="table-col-4"><misa-input></misa-input></td>
                <td class="table-col-5 text-right">
                  <misa-input :class="'right-to-left'"></misa-input>
                </td>
                <td class="table-col-6">
                  <div class="delete-row-table-input">
                    <div class="delete-icon"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td>0,00</td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="6">
                <misa-button-extra
                  :textButtonExtra="'Thêm dòng'"
                ></misa-button-extra>
                <misa-button-extra
                  :textButtonExtra="'Xóa hết dòng'"
                ></misa-button-extra>
              </td>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="body-layout-attach">
        <div class="body-layout-attach-text">
          <div class="body-layout-attach-top">
            <div class="attach-icon"></div>
          </div>
          <div class="attach-text">Đính kèm</div>
          <div class="attach-max-memory">Dung lượng tối đa 5MB</div>
        </div>
        <div class="body-layout-attach-center">
          <button class="attach-center-acction">
            Kéo/thả tệp vào đây hoặc bấm vào đây
          </button>
        </div>
      </div>
    </div>
    <div class="footer-layout">
      <div class="footer-layout-left">
        <button @click="btnCancel" class="btn-black">Hủy</button>
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
