<template>
  <div id="info-payment-detail" ref="PaymentDetail">
    <div class="header-layout">
      <div class="top-header">
        <div class="top-header-left">
          <div class="top-header-left-icon">
            <div class="refresh-time-icon"></div>
          </div>
          <div class="name-payment-slip">{{ receipt.ReceiptNumber }}</div>
          <div class="top-header-select-option">
            <div class="content-header-select-option">
              {{ textSelectLayout }}
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
                  :class="{ 'selected-layout': index == indexSelectedLayout }"
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
              <div class="guide-icon icon-l"></div>
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
                <div class="container-input-payment-detail" id="cbb-provider">
                  <div class="text-input">
                    <misa-combobox-select-single
                      :propId="'ProviderId'"
                      :propCode="'ProviderCode'"
                      :propName="'ProviderName'"
                      :isShowCode="true"
                      :haederCBB="[
                        'Đối tượng',
                        'Tên đối tượng',
                        'Mã số thuế',
                        'Địa chỉ',
                        'Điện thoại',
                      ]"
                      :bodyCBB="[
                        'ProviderCode',
                        'ProviderName',
                        'TaxCode',
                        'Address',
                        'PhoneNumber',
                      ]"
                      :isBorderRedCBB="isBorderRed"
                      :errorsCBB="errors"
                      :entityCBB="receipt"
                      :listEntitySearchCBB="listProviderSearch"
                    ></misa-combobox-select-single>
                  </div>
                  <div class="dola-money">
                    <div class="dola-icon icon-l"></div>
                  </div>
                </div>
              </div>
              <div class="layout-input-cotent-left-4">
                <div class="label-input">Tên nhà cung cấp</div>
                <div class="container-input-payment-detail">
                  <div class="container-input">
                    <misa-input
                      ref="ProviderName"
                      v-model="receipt.ProviderName"
                      :class="{ 'border-red': isBorderRed.ProviderName }"
                      @input="setIsBorderRed('ProviderName')"
                      @mouseenter="isHovering.ProviderName = true"
                      @mouseleave="isHovering.ProviderName = false"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="isHovering.ProviderName && isBorderRed.ProviderName"
                    >
                      {{ errors["ProviderName"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="layout-input-cotent-left-3">
                <div class="label-input">Người nhận</div>
                <div class="container-input-payment-detail">
                  <div class="container-input">
                    <misa-input
                      ref="ReceiveName"
                      v-model="receipt.ReceiveName"
                      :class="{ 'border-red': isBorderRed.ReceiveName }"
                      @input="setIsBorderRed('ReceiveName')"
                      @mouseenter="isHovering.ReceiveName = true"
                      @mouseleave="isHovering.ReceiveName = false"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="isHovering.ReceiveName && isBorderRed.ReceiveName"
                    >
                      {{ errors["ReceiveName"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="layout-input-cotent-left-4">
                <div class="label-input">Địa chỉ</div>
                <div class="container-input-payment-detail">
                  <div class="container-input">
                    <misa-input
                      ref="Address"
                      v-model="receipt.Address"
                      :class="{ 'border-red': isBorderRed.Address }"
                      @input="setIsBorderRed('Address')"
                      @mouseenter="isHovering.Address = true"
                      @mouseleave="isHovering.Address = false"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="isHovering.Address && isBorderRed.Address"
                    >
                      {{ errors["Address"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="layout-input-cotent-left-7">
                <div class="label-input">Lí do chi</div>
                <div class="container-input-payment-detail">
                  <div class="container-input">
                    <misa-input
                      ref="Reason"
                      v-model="receipt.Reason"
                      :class="{ 'border-red': isBorderRed.Reason }"
                      @input="setIsBorderRed('Reason')"
                      @mouseenter="isHovering.Reason = true"
                      @mouseleave="isHovering.Reason = false"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="isHovering.Reason && isBorderRed.Reason"
                    >
                      {{ errors["Reason"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="layout-input-cotent-left-3">
                <div class="label-input">Nhân viên</div>
                <div class="container-input-payment-detail">
                  <div class="text-input-2" id="cbb-employee">
                    <misa-combobox-select-single
                      :propCode="'EmployeeCode'"
                      :propId="'EmployeeId'"
                      :propName="'FullName'"
                      :haederCBB="[
                        'Mã nhân viên',
                        'Tên nhân viên',
                        'Đơn vị',
                        'ĐT di động',
                      ]"
                      :bodyCBB="[
                        'EmployeeCode',
                        'FullName',
                        'DepartmentName',
                        'PhoneNumber',
                      ]"
                      :isBorderRedCBB="isBorderRed"
                      :errorsCBB="errors"
                      :entityCBB="receipt"
                      :listEntitySearchCBB="listEmployeeSearch"
                    ></misa-combobox-select-single>
                  </div>
                </div>
              </div>
              <div class="layout-input-cotent-left-4">
                <div class="label-input">Kèm theo</div>
                <div class="quantity">
                  <misa-input
                    :placeholder="'Số lượng'"
                    ref="QuantityAttach"
                    v-model="receipt.QuantityAttach"
                    :class="[
                      { 'border-red': isBorderRed.QuantityAttach },
                      'right-to-left',
                    ]"
                    @input="setIsBorderRed('QuantityAttach')"
                    @mouseenter="isHovering.QuantityAttach = true"
                    @mouseleave="isHovering.QuantityAttach = false"
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
              <div class="container-input">
                <misa-input
                  ref="AccountingDate"
                  type="date"
                  v-model="receipt.AccountingDate"
                  :value="formattedDateAccounting"
                  :class="{
                    'border-red': isBorderRed.AccountingDate,
                  }"
                  @input="setIsBorderRed('AccountingDate')"
                  @mouseenter="isHovering.AccountingDate = true"
                  @mouseleave="isHovering.AccountingDate = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="isHovering.AccountingDate && isBorderRed.AccountingDate"
                >
                  {{ errors["AccountingDate"] }}
                </div>
              </div>
            </div>
            <div class="row-input-cotent-right">
              <div class="label-input">Ngày phiếu chi</div>
              <div class="container-input">
                <misa-input
                  ref="ReceiptDate"
                  type="date"
                  v-model="receipt.ReceiptDate"
                  :value="formattedReceiptDate"
                  :class="{
                    'border-red': isBorderRed.ReceiptDate,
                  }"
                  @input="setIsBorderRed('ReceiptDate')"
                  @mouseenter="isHovering.ReceiptDate = true"
                  @mouseleave="isHovering.ReceiptDate = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="isHovering.ReceiptDate && isBorderRed.ReceiptDate"
                >
                  {{ errors["ReceiptDate"] }}
                </div>
              </div>
            </div>
            <div class="row-input-cotent-right">
              <div class="label-input">Số phiếu chi</div>
              <div class="container-input">
                <misa-input
                  ref="ReceiptNumber"
                  v-model="receipt.ReceiptNumber"
                  :class="{ 'border-red': isBorderRed.ReceiptNumber }"
                  @input="setIsBorderRed('ReceiptNumber')"
                  @mouseenter="isHovering.ReceiptNumber = true"
                  @mouseleave="isHovering.ReceiptNumber = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="
                    isHovering.ReceiptNumber &&
                    (isBorderRed.ReceiptNumber || !receipt.ReceiptNumber) &&
                    errors['ReceiptNumber']
                  "
                >
                  {{ errors["ReceiptNumber"] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layout-input-total">
          <div class="text-total-money">Tổng tiền</div>
          <div class="total-money">{{ receipt.TotalMoney }}</div>
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
              <template
                v-for="(item, index) in receipt.AccountantList"
                :key="index"
              >
                <tr>
                  <td class="table-col-1 text-center">{{ index + 1 }}</td>
                  <td class="table-col-2">
                    <misa-input v-model="item.Description"></misa-input>
                  </td>
                  <td class="table-col-3" id="td-3-form-cbb">
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="item"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listAccountDebt"
                      :propName="'AccountName'"
                      :valueInput="item.AccountDebtNumber"
                      :propCode="'AccountDebtNumber'"
                      :propBorderRed="'AccountDebtId'"
                      :textColFirst="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountNumber
                      "
                      :textColSecond="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountName
                      "
                    ></misa-form-combobox>
                  </td>
                  <td class="table-col-4" id="td-4-form-cbb">
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="item"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listAccountBalance"
                      :propName="'AccountName'"
                      :valueInput="item.AccountBalanceNumber"
                      :propCode="'AccountBalanceNumber'"
                      :propBorderRed="'AccountBalanceId'"
                      :textColFirst="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountNumber
                      "
                      :textColSecond="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountName
                      "
                    ></misa-form-combobox>
                  </td>
                  <td class="table-col-5 text-right">
                    <misa-input
                      :class="'right-to-left'"
                      v-model="item.Money"
                    ></misa-input>
                  </td>
                  <td class="table-col-6" @click="deleteRowAccountant(index)">
                    <div class="delete-row-table-input">
                      <div class="delete-icon"></div>
                    </div>
                  </td>
                </tr>
              </template>
              <tr>
                <td colspan="4"></td>
                <td class="table-col-5 text-right" style="padding-right: 24px">
                  0,00
                </td>
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
            <div class="attach-icon icon-l"></div>
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
        <button class="btn-black" @click="btnSave">Cất</button>
        <div class="select-button">
          <button class="btn-green" @click="btnSaveAndAdd">Cất và Thêm</button>
          <div class="boundary-btn"></div>
          <button class="btn-green-icon">
            <div class="dropdown-white-icon"></div>
          </button>
        </div>
      </div>
    </div>
    <!-- dialog employee input data not blank -->
    <misa-dialog-data-not-null
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      :title="this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID"
    ></misa-dialog-data-not-null>
    <!-- dialog employee id Exist -->
    <misa-dialog-data-exist
      v-if="isShowDialogCodeExist"
      :textProp="
        this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
          .exist_pre
      "
      :textEntityCodeExist="contentReceiptNumberExist"
    ></misa-dialog-data-exist>
    <!-- dialog employee save and close -->
    <misa-dialog-data-change
      v-if="isShowDialogDataChange"
    ></misa-dialog-data-change>
  </div>
</template>

<script>
import receiptService from "@/services/receipt.js";
import employeeService from "@/services/employee.js";
import providerService from "@/services/provider.js";
import accountService from "@/services/account.js";
import accountantService from "@/services/accountant.js";
import helperCommon from "@/scripts/helper.js";
export default {
  name: "PaymentDetail",

  props: ["receiptSelected", "statusFormMode"],

  created() {
    this.loadData();

    this.$_MISAEmitter.on("cancelDialogDataChange", () => {
      this.onCancelDialogDataChange();
    });
    this.$_MISAEmitter.on("noDialogDataChange", () => {
      this.onNoDialogDataChange();
    });
    this.$_MISAEmitter.on("yesDialogDataChange", async () => {
      await this.onYesDialogDataChange();
    });

    this.$_MISAEmitter.on("closeDialogCodeExist", () => {
      this.btnCloseDialogCodeExist();
    });

    this.$_MISAEmitter.on("closeDialogDataError", () => {
      this.onCloseDialogSaveAndAdd();
    });

    this.$_MISAEmitter.on("onSelectedEntityCBBSingle", (data, propId) => {
      if (propId == "EmployeeId") {
        this.onSelectedEmployee(data);
      }
      if (propId == "ProviderId") {
        this.onSelectedProvider(data);
      }
    });
    this.$_MISAEmitter.on("onSearchChangeCBBSingle", (newValue, propId) => {
      if (propId == "EmployeeId") {
        this.onSearchChangeEmployee(newValue);
      }
      if (propId == "ProviderId") {
        this.onSearchChangeProvider(newValue);
      }
    });
    this.$_MISAEmitter.on("onKeyDownEntityCBBSingle", (index, propId) => {
      if (propId == "EmployeeId") {
        this.onKeyDownEmployeeCBBSingle(index);
      }
      if (propId == "ProviderId") {
        this.onKeyDownProviderCBBSingle(index);
      }
    });
    this.$_MISAEmitter.on(
      "handleScrollCBBSingle",
      async (textSearch, propId) => {
        if (propId == "EmployeeId") {
          await this.handleScrollEmployeeCBB(textSearch);
        }
        if (propId == "ProviderId") {
          await this.handleScrollProviderCBB(textSearch);
        }
      }
    );

    this.$_MISAEmitter.on("onSelectedEntityFormCBB", (data, propCode) => {
      if (propCode == "AccountDebtNumber") {
        this.selectedDebt(data);
      }
      if (propCode == "AccountBalanceNumber") {
        this.selectedBalance(data);
      }
    });
  },

  mounted() {
    // focus vào ô đầu tiên khi mở form chi tiết
    this.focusCode();
    // Đăng kí các sự kiện
    this.$refs.PaymentDetail.addEventListener("keydown", this.handleKeyDown);
  },

  data() {
    return {
      // Biến quy định trạng thái hiển thị menu chọn phiếu chi
      isShowOptionHeader: false,
      // Khai báo mảng lưu các thuộc tính cần validate theo thứ tự, phục vụ cho việc focus, hiển thị lỗi theo thứ tự
      receiptProperty: [
        "ProviderId",
        "ProviderCode",
        "ProviderName",
        "ReceiveName",
        "Address",
        "Reason",
        "EmployeeId",
        "FullName",
        "QuantityAttach",
        "AccountingDate",
        "ReceiptDate",
        "ReceiptNumber",
      ],
      // Khai báo biến lưu text cbb chọn layout
      textSelectLayout:
        this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
          .optionHeader[0],
      // Chỉ số ban đầu trong cbb chọn layout
      indexSelectedLayout: 0,
      // Khai báo đối tượng employee
      receipt: {},
      // Khai báo danh sách nhà cung cấp tìm kiếm
      listProviderSearch: [],
      // Khai báo danh sách nhà cung cấp tìm kiếm
      listEmployeeSearch: [],
      // Khai báo trạng thái hiển thị của dialog cảnh báo dữ liệu k được để trống
      isShowDialogDataNotNull: false,
      // Khai báo biến xác định nội dung trường nào k được để trống
      dataNotNull: [],
      // Khai báo trạng thái hiển thị của dialog cảnh báo mã nhân viên đã tồn tại
      isShowDialogCodeExist: false,
      // Khai báo biến xác định thông tin của mã nhân viên đã tồn tại
      contentReceiptNumberExist: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: {},
      // Khai báo biên lưu mã nhân viên tự động sinh ra
      newReceiptNumber: null,
      // Khai báo biến lưu title form mode
      titleFormMode: this.$_MISAResource[this.$_LANG_CODE].FORM.ADD_EMPLOYEE,
      // Khai báo biến chứa danh sách đối tượng lỗi
      errors: {},
      // Khai báo biến chứa danh sách các ô input khi hover
      isHovering: {},
      // Khai báo số bản ghi mặc định được hiển thi trong cbb nhà cung cấp
      selectedRecordProvider: this.$_MISAEnum.RECORD.RECORD_DEFAULT,
      // Khai báo trang hiện tại trong phân trang cbb nhà cung cấp
      currentPageProvider: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo số bản ghi mặc định được hiển thi trong cbb nhân viên
      selectedRecordEmployee: this.$_MISAEnum.RECORD.RECORD_DEFAULT,
      // Khai báo trang hiện tại trong phân trang cbb nhân viên
      currentPageEmployee: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Biến lưu timeout search employee
      searchEmployeeTimeout: null,
      // Biến lưu timeout search provider
      searchProviderTimeout: null,
      // Biến chứa danh sách tài khoản nợ
      listAccountDebt: [],
      // Trang hiện tại
      currentPageDebt: 1,
      // Biến chứa danh sách tài khoản nợ
      listAccountBalance: [],
      // Trang hiện tại
      currentPageBalance: 1,
    };
  },

  computed: {
    /**
     * Mô tả: Hàm tính toán ngày hạch toán
     * created by : BNTIEN
     * created date: 04-08-2023 14:33:35
     */
    formattedDateAccounting: {
      get() {
        if (this.receipt.AccountingDate) {
          const isoDate = this.receipt.AccountingDate;
          const formattedDate = isoDate.split(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SPLIT_DATE
          )[0];
          return formattedDate;
        }
        return "";
      },
      set(newDate) {
        this.receipt.AccountingDate = newDate;
      },
    },

    /**
     * Mô tả: Hàm tính toán ngày cấp chứng minh nhân dân
     * created by : BNTIEN
     * created date: 01-06-2023 02:41:35
     */
    formattedReceiptDate: {
      get() {
        if (this.receipt.ReceiptDate) {
          const isoDate = this.receipt.ReceiptDate;
          const formattedReceiptDate = isoDate.split(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SPLIT_DATE
          )[0];
          return formattedReceiptDate;
        }
        return "";
      },
      set(newDate) {
        this.receipt.ReceiptDate = newDate;
      },
    },
  },

  methods: {
    /**
     * Mô tả: Lấy nhân viên có giá trị lớn nhất trong hệ thống
     * created by : BNTIEN
     * created date: 24-06-2023 09:57:13
     */
    async getNewCode() {
      try {
        let maxReceiptNumber = await receiptService.getCodeMax();
        this.newReceiptNumber = maxReceiptNumber.data;
      } catch {
        return;
      }
    },
    /**
     * Mô tả:  Hàm lấy danh sách provider từ api
     * created by : BNTIEN
     * created date: 04-08-2023 14:36:54
     */
    async getListProvider() {
      try {
        const res = await providerService.getFilter(
          this.selectedRecordProvider,
          this.currentPageProvider,
          ""
        );
        this.listProviderSearch = res.data;
      } catch {
        return;
      }
    },

    /**
     * Mô tả:  Hàm lấy danh sách employee từ api
     * created by : BNTIEN
     * created date: 04-08-2023 14:36:54
     */
    async getListEmployee() {
      try {
        const res = await employeeService.getFilter(
          this.selectedRecordEmployee,
          this.currentPageEmployee,
          ""
        );
        this.listEmployeeSearch = res.data;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Lấy danh sách tài khoản nợ
     * created by : BNTIEN
     * created date: 05-08-2023 15:25:56
     */
    async getListDebt() {
      try {
        const res = await accountService.getDebt(20, this.currentPageDebt, "");
        this.listAccountDebt = [...this.listAccountDebt, ...res.data];
      } catch {
        this.listAccountDebt = [];
      }
    },
    /**
     * Mô tả: Lấy danh sách tài khoản có
     * created by : BNTIEN
     * created date: 05-08-2023 15:25:56
     */
    async getListBalance() {
      try {
        const res = await accountService.getBalance(
          20,
          this.currentPageBalance,
          ""
        );
        this.listAccountBalance = [...this.listAccountBalance, ...res.data];
      } catch {
        this.listAccountBalance = [];
      }
    },
    /**
     * Mô tả: Lấy danh sách hạch toán theo receipt id
     * created by : BNTIEN
     * created date: 05-08-2023 20:53:02
     */
    async getAccountant() {
      try {
        if (this.statusFormMode == this.$_MISAEnum.FORM_MODE.Edit) {
          const res = await accountantService.getByReceiptId(
            this.receipt.ReceiptId
          );
          this.receipt.AccountantList = res.data;
        } else {
          this.receipt.AccountantList = [];
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: gọi api lấy dữ liệu
     * created by : BNTIEN
     * created date: 30-05-2023 14:57:33
     */
    async loadData() {
      try {
        await this.getNewCode();
        await this.getListProvider();
        await this.getListEmployee();
        await this.getListDebt();
        await this.getListBalance();
        // Nếu form ở trạng thái thêm mới
        // Chuyển đối tượng sang chuỗi json
        let res = JSON.stringify(this.receiptSelected);
        // Chuyển đổi chuỗi json thành đối tượng employee
        this.receipt = JSON.parse(res);
        if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
          // Sinh mã tự động
          this.receipt.ReceiptNumber = this.newReceiptNumber;
          // Gán title cho form mode thêm mới
          this.titleFormMode =
            this.$_MISAResource[this.$_LANG_CODE].FORM.ADD_EMPLOYEE;
        } else {
          // Gán title cho form mode thêm sửa
          this.titleFormMode =
            this.$_MISAResource[this.$_LANG_CODE].FORM.UPDATE_EMPLOYEE;
        }
        await this.getAccountant();
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm focus vào ô input mã nhân viên
     * created by : BNTIEN
     * created date: 27-06-2023 01:53:48
     */
    focusCode() {
      this.$_MISAEmitter.emit("focusInputCBBSelectSingle");
    },

    /**
     * Mô tả: Hàm kiểm tra xem employee có thay đổi sau khi mở form detail không
     * created by : BNTIEN
     * created date: 30-06-2023 00:21:22
     */
    hasDataChanged() {
      return (
        JSON.stringify(this.receiptSelected) !== JSON.stringify(this.receipt)
      );
    },
    /**
     * Mô tả: Hàm sử lí sự kiện khi click vào icon close
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:28
     */
    async onCloseFormDetail() {
      // Kiểm tra xem giữ liệu có thay đổi hay không (Trường hợp có thay đổi)
      if (this.hasDataChanged()) {
        this.isShowDialogDataChange = true;
      } else {
        this.$emit("closeFormDetail");
      }
    },
    /**
     * Mô tả: Hàm set các lỗi nhập liệu phía fontend
     * created by : BNTIEN
     * created date: 11-07-2023 16:36:05
     */
    setError(key) {
      try {
        this.errors[key] =
          this.$_MISAResource[
            this.$_LANG_CODE
          ].RECEIPT_PAYMENT.FORM_PAYMENT.validateNotNull[key];
        this.isBorderRed[key] = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
            .validateNotNull[key]
        );
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm set các lỗi nhập liệu phía fontend
     * created by : BNTIEN
     * created date: 11-07-2023 16:36:05
     */
    setErrorMaxLength(key) {
      try {
        this.errors[key] =
          this.$_MISAResource[
            this.$_LANG_CODE
          ].RECEIPT_PAYMENT.FORM_PAYMENT.maxLength[key].Warning;
        this.isBorderRed[key] = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
            .maxLength[key].Warning
        );
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Validate lỗi nhập liệu phía fontend
     * created by : BNTIEN
     * created date: 11-07-2023 10:07:22
     */
    validateReceipt() {
      try {
        for (const refInput of this.receiptProperty) {
          switch (refInput) {
            case "ReceiptNumber":
              if (helperCommon.isEmptyInput(this.receipt[refInput])) {
                this.setError(refInput);
              } else if (
                helperCommon.isMaxLengthInput(
                  this.receipt[refInput],
                  this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
                    .Limit
                )
              ) {
                this.setErrorMaxLength(refInput);
              }
              break;
            // case "DepartmentId":
            //   break;
            // case "DepartmentName":
            //   if (helperCommon.isEmptyInput(this.employee[refInput])) {
            //     this.setError(refInput);
            //   }
            //   break;
            // case "DateOfBirth":
            // case "IdentityDate":
            //   if (this.employee[refInput]) {
            //     if (helperCommon.isInvalidDate(this.employee[refInput])) {
            //       this.setError(refInput);
            //     }
            //   }
            //   break;
            // case "IdentityNumber":
            //   if (this.employee[refInput]) {
            //     if (
            //       helperCommon.isMaxLengthInput(
            //         this.employee[refInput],
            //         this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
            //           .Limit
            //       )
            //     ) {
            //       this.setErrorMaxLength(refInput);
            //     } else if (helperCommon.isNumber(this.employee[refInput])) {
            //       this.setError(refInput);
            //     }
            //   }
            //   break;
            // case "Email":
            //   if (this.employee[refInput]) {
            //     if (
            //       helperCommon.isMaxLengthInput(
            //         this.employee[refInput],
            //         this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
            //           .Limit
            //       )
            //     ) {
            //       this.setErrorMaxLength(refInput);
            //     } else if (
            //       helperCommon.isFormatEmail(this.employee[refInput])
            //     ) {
            //       this.setError(refInput);
            //     }
            //   }
            //   break;
            default:
              // if (this.employee[refInput]) {
              //   if (
              //     helperCommon.isMaxLengthInput(
              //       this.employee[refInput],
              //       this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
              //         .Limit
              //     )
              //   ) {
              //     this.setErrorMaxLength(refInput);
              //   }
              // }
              break;
          }
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm xử lí lỗi nhập liệu người dùng khi backend trả về lỗi
     * created by : BNTIEN
     * created date: 29-06-2023 07:07:16
     */
    handleErrorInputReceipt(errors, receiptProperty) {
      const responseHandle = helperCommon.handleErrorInput(
        errors,
        receiptProperty
      );
      this.errors = responseHandle.error;
      this.isBorderRed = responseHandle.isBorderRed;
      this.dataNotNull = responseHandle.dataNotNull;
      if (this.dataNotNull.length > 0) {
        this.isShowDialogDataNotNull = true;
      }
    },
    /**
     * Mô tả: Hàm kiểm tra xem mã nhân viên đã tồn tại trong database hay chưa
     * created by : BNTIEN
     * created date: 29-06-2023 23:46:11
     */
    async checkReceiptExists() {
      try {
        const res = await receiptService.getByCode(this.receipt.ReceiptNumber);
        return res.data;
      } catch {
        return null;
      }
    },
    /**
     * Mô tả: Hàm xử lí khi mã nhân viên đã tồn tại trong hệ thống
     * created by : BNTIEN
     * created date: 30-06-2023 00:30:22
     */
    handleReceiptExisted(receiptExisted) {
      this.isShowDialogCodeExist = true;
      this.isBorderRed.ReceiptNumber = true;
      this.errors["ReceiptNumber"] = `${
        this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
          .exist_pre
      }
       ${receiptExisted.ReceiptNumber} ${
        this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_DETAIL_END
      }`;
      this.contentReceiptNumberExist = receiptExisted.ReceiptNumber;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    async btnSave() {
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        this.validateReceipt();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
        } else {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let receiptByCode = await this.checkReceiptExists();
            if (!receiptByCode) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              const res = await receiptService.create(this.receipt);
              if (
                this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(
                  res.status
                ) &&
                res.data > 0
              ) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                    .SUCCESS_CTEATE
                );
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.handleReceiptExisted(receiptByCode);
            }
          } catch (error) {
            this.handleErrorInputReceipt(error, this.receiptProperty);
          }
        }
      } else {
        // Nếu form ở trạng thái sửa
        // Kiểm tra xem dữ liệu có thay đổi hay k (Trường hợp đã thay đổi)
        if (this.hasDataChanged()) {
          this.validateReceipt();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let receiptByCode = await this.checkReceiptExists();
              // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại nhưng trùng với nhân viên đang sửa
              if (
                !receiptByCode ||
                receiptByCode.ReceiptNumber ===
                  this.receiptSelected.ReceiptNumber
              ) {
                const res = await receiptService.update(
                  this.receiptSelected.ReceiptId,
                  this.receipt
                );
                if (
                  this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) &&
                  res.data > 0
                ) {
                  this.$_MISAEmitter.emit(
                    "onShowToastMessageUpdate",
                    this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                      .SUCCESS_UPDATE
                  );
                }
              } else {
                // Nếu mã nhân viên đã tồn tại trong hệ thống
                this.handleReceiptExisted(receiptByCode);
              }
            } catch (error) {
              this.handleErrorInputReceipt(error, this.receiptProperty);
            }
          }
        } else {
          this.$emit("closeFormDetail");
        }
      }
      // }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nut cất và thêm trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:23
     */
    async btnSaveAndAdd() {
      // Nếu form ở trạng thái thêm mới
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        this.validateReceipt();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
        } else {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let receiptByCode = await this.checkReceiptExists();
            if (!receiptByCode) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              const res = await receiptService.create(this.receipt);
              if (
                this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(
                  res.status
                ) &&
                res.data > 0
              ) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                    .SUCCESS_CTEATE
                );
                this.employee = {};
                this.isBorderRed = {};
                this.$_MISAEmitter.emit("refreshDataTable");
                await this.getNewCode();
                this.receipt.ReceiptNumber = this.newReceiptNumber;
                this.focusCode();
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.handleReceiptExisted(receiptByCode);
            }
          } catch (error) {
            this.handleErrorInputReceipt(error, this.receiptProperty);
          }
        }
        // Nếu form ở trạng thái sửa
      } else {
        // Kiểm tra xem dữ liệu có thay đổi hay k
        if (this.hasDataChanged()) {
          this.validateReceipt();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let receiptByCode = await this.checkReceiptExists();
              // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại trùng với nhân viên đang sửa
              if (
                !receiptByCode ||
                receiptByCode.EmployeeCode ===
                  this.employeeSelected.EmployeeCode
              ) {
                const res = await employeeService.update(
                  this.employeeSelected.EmployeeId,
                  this.employee
                );
                this.employee = {};
                this.$_MISAEmitter.emit("setFormModeAdd");
                await this.getNewCode();
                this.receipt.ReceiptNumber = this.newReceiptNumber;
                this.focusCode();
                this.$_MISAEmitter.emit("refreshDataTable");
                if (
                  this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) &&
                  res.data > 0
                ) {
                  this.$_MISAEmitter.emit(
                    "onShowToastMessageUpdate",
                    this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                      .SUCCESS_UPDATE
                  );
                }
              } else {
                // Nếu mã nhân viên đã tồn tại trong hệ thống
                this.handleReceiptExisted(receiptByCode);
              }
            } catch (error) {
              this.handleErrorInputReceipt(error, this.receiptProperty);
            }
          }
        } else {
          this.employee = {};
          this.$_MISAEmitter.emit("setFormModeAdd");
          this.focusCode();
        }
      }
    },
    /**
     * Mô tả: Hàm đóng dialog cảnh báo dữ liệu k được để trống và focus vào các ô trống
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:59
     */
    onCloseDialogSaveAndAdd() {
      this.isShowDialogDataNotNull = false;
      this.dataNotNull = [];
      let listPropError = [];
      for (const key in this.isBorderRed) {
        if (this.isBorderRed[key] === true) {
          listPropError.push(key);
        }
      }
      // thêm thuộc tính DepartmentName vào listPropError để xử lí focus nếu chưa có
      if (
        listPropError.includes("ProviderId") &&
        !listPropError.includes("ProviderName")
      ) {
        listPropError.push("ProviderName");
      }
      if (
        listPropError.includes("EmployeeId") &&
        !listPropError.includes("FullName")
      ) {
        listPropError.push("FullName");
      }
      for (const prop of this.receiptProperty) {
        if (listPropError.includes(prop)) {
          // đợi DOM cập nhật trước khi thực thi focus
          if (prop === "ProviderId" || prop === "ProviderName") {
            this.$nextTick(() => {
              this.$_MISAEmitter.emit("focusInputCBBSelectSingle");
            });
          } else if (prop === "EmployeeId" || prop === "FullName") {
            this.$nextTick(() => {
              this.$_MISAEmitter.emit("focusInputCBBSelectSingle");
            });
          } else {
            this.$nextTick(() => {
              this.$refs[prop].focus();
            });
          }
          return;
        }
      }
    },

    /**
     * Mô tả: Hàm bỏ border red khi dữ liệu thay đổi
     * created by : BNTIEN
     * created date: 29-06-2023 22:03:38
     */
    setIsBorderRed(prop) {
      if (prop in this.isBorderRed) {
        this.isBorderRed[prop] = false;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào nút hủy trong form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:20
     */
    btnCancel() {
      this.$emit("closeFormDetail");
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng dialog cảnh báo mã nhân viên đã tồn tại
     * created by : BNTIEN
     * created date: 29-05-2023 08:28:19
     */
    btnCloseDialogCodeExist() {
      this.isShowDialogCodeExist = false;
      this.focusCode();
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button hủy trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:40:13
     */
    onCancelDialogDataChange() {
      this.isShowDialogDataChange = false;
      this.focusCode();
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button không trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:42:10
     */
    onNoDialogDataChange() {
      this.$emit("closeFormDetail");
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button có trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:43:38
     */
    async onYesDialogDataChange() {
      this.isShowDialogDataChange = false;
      await this.btnSave();
    },

    /**
     * Mô tả: Hàm reset tabindex về ô input mã nhân viên khi tab nhảy đến icon close
     * created by : BNTIEN
     * created date: 01-06-2023 14:24:19
     */
    resetTab() {
      this.focusCode();
    },

    /**
     * Mô tả: xử lí sự kiện khi bấm esc khi đang ở form detail
     * created by : BNTIEN
     * created date: 01-07-2023 01:05:25
     */
    async handleKeyDown(event) {
      if (event.key === "Escape") {
        // Nếu phím được nhấn là Esc, thực hiện hàm onCloseFormDetail
        await this.onCloseFormDetail();
      } else if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn phím Ctrl + S
        this.btnSave();
      } else if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn tổ hợp phím Ctrl + Shift + S
        this.btnSaveAndAdd();
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn nhân viên mua hàng
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedEmployee(employee) {
      this.receipt.FullName = employee.FullName;
      this.receipt.EmployeeId = employee.EmployeeId;
      this.isBorderRed.FullName = false;
    },

    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search employee và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    async onSearchChangeEmployee(newValue) {
      this.isBorderRed.FullName = false;
      this.isBorderRed.EmployeeId = false;
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchEmployeeTimeout);
        this.receipt.FullName = newValue;
        delete this.receipt.EmployeeId;
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchEmployeeTimeout = setTimeout(async () => {
          const newListEmployee = await employeeService.getFilter(
            20,
            1,
            newValue
          );
          this.listEmployeeSearch = newListEmployee.data;
        }, 500);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí sự kiện keydown cbb nhân viên mua hàng
     * created by : BNTIEN
     * created date: 01-08-2023 08:33:33
     */
    onKeyDownEmployeeCBBSingle(index) {
      this.receipt.FullName = this.listEmployeeSearch.Data[index].FullName;
      this.receipt.EmployeeId = this.listEmployeeSearch.Data[index].EmployeeId;
      this.isBorderRed.FullName = false;
    },

    /**
     * Mô tả: scroll cbb employee
     * created by : BNTIEN
     * created date: 05-08-2023 11:39:17
     */
    async handleScrollEmployeeCBB(textSearch) {
      try {
        this.currentPageEmployee += 1;
        const filtered = await employeeService.getFilter(
          20,
          this.currentPageEmployee,
          textSearch
        );
        this.listEmployeeSearch.Data = [
          ...this.listEmployeeSearch.Data,
          ...filtered.data.Data,
        ];
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn nhân viên mua hàng
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedProvider(provider) {
      this.receipt.ProviderId = provider.ProviderId;
      this.receipt.ProviderName = provider.ProviderName;
      this.receipt.ProviderCode = provider.ProviderCode;
      this.receipt.Address = provider.Address;
      this.receipt.Reason = `Chi tiền cho ${provider.ProviderName}`;
      this.isBorderRed.ProviderName = false;
    },

    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search employee và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    async onSearchChangeProvider(newValue) {
      this.isBorderRed.ProviderName = false;
      this.isBorderRed.ProviderId = false;
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchProviderTimeout);
        this.receipt.ProviderName = newValue;
        delete this.receipt.ProviderId;
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchProviderTimeout = setTimeout(async () => {
          const newListProvider = await providerService.getFilter(
            20,
            1,
            newValue
          );
          this.listProviderSearch = newListProvider.data;
        }, 500);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí sự kiện keydown cbb nhân viên mua hàng
     * created by : BNTIEN
     * created date: 01-08-2023 08:33:33
     */
    onKeyDownProviderCBBSingle(index) {
      this.receipt.ProviderName =
        this.listProviderSearch.Data[index].ProviderName;
      this.receipt.ProviderId = this.listProviderSearch.Data[index].ProviderId;
      this.receipt.ProviderCode =
        this.listProviderSearch.Data[index].ProviderCode;
      this.receipt.Address = this.listProviderSearch.Data[index].Address;
      this.receipt.Reason = `Chi tiền cho ${this.listProviderSearch.Data[index].ProviderName}`;
      this.isBorderRed.ProviderName = false;
    },

    /**
     * Mô tả: scroll cbb provider
     * created by : BNTIEN
     * created date: 05-08-2023 11:39:17
     */
    async handleScrollProviderCBB(textSearch) {
      try {
        this.currentPageProvider += 1;
        const filtered = await providerService.getFilter(
          20,
          this.currentPageProvider,
          textSearch
        );
        this.listProviderSearch.Data = [
          ...this.listProviderSearch.Data,
          ...filtered.data.Data,
        ];
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm chọn layout
     * created by : BNTIEN
     * created date: 04-08-2023 23:55:34
     */
    selectedPage(item, index) {
      this.textSelectLayout = item;
      this.indexSelectedLayout = index;
      this.isShowOptionHeader = false;
    },

    /**
     * Mô tả: Chọn tài khoản nợ
     * created by : BNTIEN
     * created date: 05-08-2023 20:05:15
     */
    selectedDebt(accountDebt) {
      console.log(accountDebt);
    },
    /**
     * Mô tả: Chọn tài khoản nợ
     * created by : BNTIEN
     * created date: 05-08-2023 20:05:15
     */
    selectedBalance(accountBalance) {
      // do somthing
      console.log(accountBalance);
    },
  },

  beforeUnmount() {
    this.$_MISAEmitter.off("cancelDialogDataChange");
    this.$_MISAEmitter.off("noDialogDataChange");
    this.$_MISAEmitter.off("yesDialogDataChange");
    this.$_MISAEmitter.off("closeDialogCodeExist");
    this.$_MISAEmitter.off("closeDialogDataError");
    this.$_MISAEmitter.off("onSelectedEntityCBBSingle");
    this.$_MISAEmitter.off("onSearchChangeCBBSingle");
    this.$_MISAEmitter.off("onKeyDownEntityCBBSingle");
    this.$_MISAEmitter.off("onSelectedEntityFormCBB");
    // Xóa các sự kiện đã đăng kí
    this.$refs.PaymentDetail.removeEventListener("keydown", this.handleKeyDown);
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

.selected-layout {
  background-color: var(--color-btn-default);
  color: #fff;
}
</style>
