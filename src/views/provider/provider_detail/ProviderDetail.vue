<template>
  <div
    id="detail-info-provider"
    class="position-display-center"
    ref="FormDetailProvider"
  >
    <div class="form-detail-toolbar">
      <div
        class="question-icon icon-tb"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.HELP"
      ></div>
      <div
        @click="onCloseFormDetail"
        class="close-icon icon-tb"
        id="employee-exit"
        @keydown.tab.prevent="resetTab($event.target.value)"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.EXIST"
      ></div>
    </div>
    <div class="form-detail-main">
      <div class="provider-title">
        <p>
          <b>Thông tin nhà cung cấp</b>
        </p>
        <div class="employee-check">
          <input type="radio" name="typeObject" />
          <span>Tổ chức</span>
        </div>
        <div class="employee-check">
          <input type="radio" name="typeObject" />
          <span>Cá nhân</span>
        </div>
        <div class="employee-check" id="provider-title-input-checkbox">
          <input type="checkbox" />
          <span>Là khách hàng</span>
        </div>
      </div>
      <div class="form-detail-content">
        <div class="half-content">
          <div class="col-md-n">
            <label> Mã số thuế </label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false">abc</div>
            </div>
          </div>
          <div class="col-md-tb">
            <label>
              Mã nhà cung cấp
              <span class="s-require">*</span>
            </label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false">abc</div>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-n">
            <label>Điện thoại</label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false">abc</div>
            </div>
          </div>
          <div class="col-md-tb">
            <label> Website </label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false">abc</div>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>
              Tên nhà cung cấp
              <span class="s-require">*</span>
            </label>
            <div class="container-input">
              <misa-input></misa-input>
              <div class="misa-tooltip" v-if="false">abc</div>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label> Nhóm nhà cung cấp </label>
            <misa-combobox-multiple
              :isShowIconPlus="true"
            ></misa-combobox-multiple>
          </div>
        </div>
        <div class="half-content-2">
          <div class="col-md-l">
            <label>Địa chỉ</label>
            <misa-input-textarea
              :placeholder="'VD: Số 82 Duy Tân, Dịch Vọng'"
            ></misa-input-textarea>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Nhân viên mua hàng</label>
            <misa-combobox-multiple
              :isShowIconPlus="true"
            ></misa-combobox-multiple>
          </div>
        </div>
        <div class="full-content-2">
          <div class="select-layout">
            <button
              class="select-layout-item"
              @click="handleSelectLayout('infoContact')"
              :class="{ 'active-layout': selectLayout.infoContact }"
            >
              Thông tin liên hệ
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('termPayment')"
              :class="{ 'active-layout': selectLayout.termPayment }"
            >
              Điều khoản thanh toán
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('bankAccount')"
              :class="{ 'active-layout': selectLayout.bankAccount }"
            >
              Tài khoản ngân hàng
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('addressOther')"
              :class="{ 'active-layout': selectLayout.addressOther }"
            >
              Địa chỉ khác
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('note')"
              :class="{ 'active-layout': selectLayout.note }"
            >
              Ghi chú
            </button>
          </div>
          <div class="content-select-layout" v-if="selectLayout.infoContact">
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-n" style="position: relative">
                  <label>Người liên hệ</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="account"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listNatureSearch"
                    :propName="'Nature'"
                    :propId="'NatureId'"
                    :placeholderInputCBB="'Xưng hô'"
                  ></misa-combobox>
                </div>
                <div class="col-md-tb">
                  <label class="label-hide-text">hide</label>
                  <misa-input :placeholder="'Họ và tên'"></misa-input>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l">
                  <label>Đại diện theo PL</label>
                  <misa-input :placeholder="'Đại diện theo PL'"></misa-input>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-l">
                  <misa-input :placeholder="'Email'"></misa-input>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-tb">
                  <misa-input :placeholder="'Số điện thoại'"></misa-input>
                </div>
              </div>
            </div>
          </div>
          <div
            class="content-select-layout"
            id="content-select-layout"
            v-if="selectLayout.termPayment"
          >
            <div class="content-select-layout-row">
              <div class="full-content">
                <div class="full-content-quarter">
                  <div class="col-md-quater" style="position: relative">
                    <label>Người liên hệ</label>
                    <misa-combobox-multiple
                      :isShowIconPlus="true"
                    ></misa-combobox-multiple>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>Số ngày được nợ</label>
                    <misa-input></misa-input>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>Số nợ tối đa</label>
                    <misa-input></misa-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row">
              <div class="full-content">
                <div class="full-content-quarter">
                  <div
                    class="col-md-quater"
                    style="position: relative"
                    id="multiple-cbb-no-icon"
                  >
                    <label>Tài khoản công nợ phải trả</label>
                    <misa-combobox-multiple
                      :isShowIconPlus="false"
                    ></misa-combobox-multiple>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-select-layout" v-if="selectLayout.bankAccount">
            <table class="table-input">
              <thead class="table-input-title">
                <tr>
                  <th class="table-input-col-1">Số tài khoản</th>
                  <th class="table-input-col-2">Tên ngân hàng</th>
                  <th class="table-input-col-3">Chi nhánh</th>
                  <th class="table-input-col-4">Tỉnh/TP của ngân hàng</th>
                  <th class="table-input-col-5"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="table-input-col-1"><misa-input></misa-input></td>
                  <td class="table-input-col-2"><misa-input></misa-input></td>
                  <td class="table-input-col-3"><misa-input></misa-input></td>
                  <td class="table-input-col-4"><misa-input></misa-input></td>
                  <td class="table-input-col-5">
                    <div class="delete-row-table-input">
                      <div class="delete-icon"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <td colspan="5">
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
          <div
            class="content-select-layout"
            id="address-Other"
            v-if="selectLayout.addressOther"
          >
            <div class="content-select-layout-half">
              <div class="half-content">
                <div class="col-md-l" style="position: relative">
                  <label>Vị trí địa lý</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="account"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listNatureSearch"
                    :propName="'Nature'"
                    :propId="'NatureId'"
                    :placeholderInputCBB="'Quốc gia'"
                  ></misa-combobox>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l" style="position: relative">
                  <label class="label-hide-text">hide</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="account"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listNatureSearch"
                    :propName="'Nature'"
                    :propId="'NatureId'"
                    :placeholderInputCBB="'Tỉnh/Thành phố'"
                  ></misa-combobox>
                </div>
              </div>
              <div class="half-content">
                <misa-combobox
                  :isBorderRedCBB="isBorderRed"
                  :entityCBB="account"
                  :errorsCBB="errors"
                  :listEntitySearchCBB="listNatureSearch"
                  :propName="'Nature'"
                  :propId="'NatureId'"
                  :placeholderInputCBB="'Quận/Huyện'"
                ></misa-combobox>
              </div>
              <div class="half-content">
                <misa-combobox
                  :isBorderRedCBB="isBorderRed"
                  :entityCBB="account"
                  :errorsCBB="errors"
                  :listEntitySearchCBB="listNatureSearch"
                  :propName="'Nature'"
                  :propId="'NatureId'"
                  :placeholderInputCBB="'Xã/Phường'"
                ></misa-combobox>
              </div>
            </div>
            <div class="content-select-layout-half">
              <table class="table-input" id="table-input-address-other">
                <thead class="table-input-title">
                  <tr>
                    <th class="table-input-col-4" colspan="2">
                      Địa chỉ giao hàng
                    </th>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th style="font-weight: 400">Giống địa chỉ nhà cung cấp</th>
                    <th class="table-input-col-5"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="table-input-col-4" colspan="4">
                      <misa-input></misa-input>
                    </td>
                    <td class="table-input-col-5">
                      <div class="delete-row-table-input">
                        <div class="delete-icon"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <td colspan="4">
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
          <div
            class="content-select-layout"
            v-if="selectLayout.note"
            id="content-select-layout-note"
          >
            <label>Ghi chú</label>
            <misa-input-textarea></misa-input-textarea>
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
  name: "ProviderDetail",

  data() {
    return {
      //  --------------------------------------------
      // Khai báo mảng lưu các thuộc tính cần validate theo thứ tự, phục vụ cho việc focus, hiển thị lỗi theo thứ tự
      accountProperty: [
        "AccountNumber",
        "AccountName",
        "AccountNameEnglish",
        "ParentId",
        "Nature",
        "Explain",
      ],
      // Khai báo đối tượng employee
      account: {},
      // Khai báo danh sách đơn vị tìm kiếm
      listNatureSearch: [
        { Id: 1, Nature: "Dư nợ" },
        { Id: 2, Nature: "Dư có" },
        { Id: 3, Nature: "Lưỡng tính" },
        { Id: 4, Nature: "Không có số dư" },
      ],
      // Khai báo trạng thái hiển thị của dialog cảnh báo dữ liệu k được để trống
      isShowDialogDataNotNull: false,
      // Khai báo biến xác định nội dung trường nào k được để trống
      dataNotNull: [],
      // Khai báo trạng thái hiển thị của dialog cảnh báo mã nhân viên đã tồn tại
      isShowDialogCodeExist: false,
      // Khai báo biến xác định thông tin của mã nhân viên đã tồn tại
      contentAccountNumberExist: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: {},
      // Khai báo biến lưu title form mode
      titleFormMode: this.$_MISAResource[this.$_LANG_CODE].FORM.ADD_EMPLOYEE,
      // Khai báo biến chứa danh sách đối tượng lỗi
      errors: {},
      // Khai báo biến chứa danh sách các ô input khi hover
      isHovering: {},
      // Khai báo biến quy định trạng thái hiển thị menu tài khoản tổng hợp
      isShowMenuGeneralAccount: false,
      // Biến chứa danh sách tất cả tài khoản
      accounts: [],
      // Khai báo biến tìm kiếm tài khoản tổng hợp
      searchGeneralAccount: "",
      // Trang hiện tại
      pageNumber: 1,
      // Số lượng tài khoản được tải mỗi lần
      pageSize: 10,
      //  --------------------------------------------
      // Biến quy định layout nào đang được chọn
      selectLayout: {
        infoContact: false,
        termPayment: false,
        bankAccount: false,
        addressOther: true,
        note: false,
      },
    };
  },

  methods: {
    /**
     * Mô tả: Hàm xử lí chọn layout tương ứng
     * created by : BNTIEN
     * created date: 25-07-2023 11:32:35
     */
    handleSelectLayout(layout) {
      for (const key in this.selectLayout) {
        if (Object.hasOwnProperty.call(this.selectLayout, key)) {
          if (key == layout) {
            this.selectLayout[key] = true;
          } else {
            this.selectLayout[key] = false;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
@import url(./ProviderDetail.css);

input {
  height: 26px !important;
}

.active-layout {
  background-color: rgb(159, 207, 225);
  height: 30px;
}
</style>
