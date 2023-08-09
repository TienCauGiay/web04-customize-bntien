<template>
  <div id="info-payment-detail" ref="PaymentDetail">
    <div class="header-layout">
      <div class="top-header">
        <div class="top-header-left">
          <div class="top-header-left-icon">
            <div class="refresh-time-icon"></div>
          </div>
          <div class="name-payment-slip">
            Phiếu chi {{ receipt.ReceiptNumber }}
          </div>
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
          <div class="container-icon" @click="btnCancel" :title="'Đóng (ESC)'">
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
                      :isReadonlyCBB="
                        statusForm == this.$_MISAEnum.FORM_MODE.View ||
                        receipt.IsNoted
                      "
                      ref="ProviderId"
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
                      :class="[
                        { 'border-red': isBorderRed.ProviderName },
                        {
                          'readonly-input':
                            statusForm == this.$_MISAEnum.FORM_MODE.View,
                        },
                      ]"
                      @input="setIsBorderRed('ProviderName')"
                      @mouseenter="isHovering.ProviderName = true"
                      @mouseleave="isHovering.ProviderName = false"
                      :readonly="statusForm == this.$_MISAEnum.FORM_MODE.View"
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
                      :class="[
                        { 'border-red': isBorderRed.ReceiveName },
                        {
                          'readonly-input':
                            statusForm == this.$_MISAEnum.FORM_MODE.View,
                        },
                      ]"
                      @input="setIsBorderRed('ReceiveName')"
                      @mouseenter="isHovering.ReceiveName = true"
                      @mouseleave="isHovering.ReceiveName = false"
                      :readonly="statusForm == this.$_MISAEnum.FORM_MODE.View"
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
                      :class="[
                        { 'border-red': isBorderRed.Address },
                        {
                          'readonly-input':
                            statusForm == this.$_MISAEnum.FORM_MODE.View,
                        },
                      ]"
                      @input="setIsBorderRed('Address')"
                      @mouseenter="isHovering.Address = true"
                      @mouseleave="isHovering.Address = false"
                      :readonly="statusForm == this.$_MISAEnum.FORM_MODE.View"
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
                      :class="[
                        { 'border-red': isBorderRed.Reason },
                        {
                          'readonly-input':
                            statusForm == this.$_MISAEnum.FORM_MODE.View,
                        },
                      ]"
                      @input="setIsBorderRed('Reason')"
                      @mouseenter="isHovering.Reason = true"
                      @mouseleave="isHovering.Reason = false"
                      :readonly="statusForm == this.$_MISAEnum.FORM_MODE.View"
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
                      :isReadonlyCBB="
                        statusForm == this.$_MISAEnum.FORM_MODE.View
                      "
                      ref="EmployeeId"
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
                      {
                        'readonly-input':
                          statusForm == this.$_MISAEnum.FORM_MODE.View,
                      },
                    ]"
                    @input="setIsBorderRed('QuantityAttach')"
                    @mouseenter="isHovering.QuantityAttach = true"
                    @mouseleave="isHovering.QuantityAttach = false"
                    :readonly="statusForm == this.$_MISAEnum.FORM_MODE.View"
                    :maxLength="11"
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
                  :class="[
                    {
                      'border-red': isBorderRed.AccountingDate,
                    },
                    {
                      'readonly-input':
                        statusForm == this.$_MISAEnum.FORM_MODE.View ||
                        receipt.IsNoted,
                    },
                  ]"
                  @input="setIsBorderRed('AccountingDate')"
                  @mouseenter="isHovering.AccountingDate = true"
                  @mouseleave="isHovering.AccountingDate = false"
                  :readonly="
                    statusForm == this.$_MISAEnum.FORM_MODE.View ||
                    receipt.IsNoted
                  "
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
                  :class="[
                    {
                      'border-red': isBorderRed.ReceiptDate,
                    },
                    {
                      'readonly-input':
                        statusForm == this.$_MISAEnum.FORM_MODE.View ||
                        receipt.IsNoted,
                    },
                  ]"
                  @input="setIsBorderRed('ReceiptDate')"
                  @mouseenter="isHovering.ReceiptDate = true"
                  @mouseleave="isHovering.ReceiptDate = false"
                  :readonly="
                    statusForm == this.$_MISAEnum.FORM_MODE.View ||
                    receipt.IsNoted
                  "
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
                  :class="[
                    { 'border-red': isBorderRed.ReceiptNumber },
                    {
                      'readonly-input':
                        statusForm == this.$_MISAEnum.FORM_MODE.View ||
                        receipt.IsNoted,
                    },
                  ]"
                  @input="setIsBorderRed('ReceiptNumber')"
                  @mouseenter="isHovering.ReceiptNumber = true"
                  @mouseleave="isHovering.ReceiptNumber = false"
                  :readonly="
                    statusForm == this.$_MISAEnum.FORM_MODE.View ||
                    receipt.IsNoted
                  "
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
          <div
            class="total-money"
            :class="{ 'color-money-red': TotalMoney < 0 }"
          >
            {{ helperCommon.formatCurrency(TotalMoney) }}
          </div>
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
                <tr @click="focusRow(index)">
                  <td class="table-col-1 text-center">{{ index + 1 }}</td>
                  <td class="table-col-2">
                    <misa-input
                      v-model="item.Description"
                      :class="[
                        {
                          'readonly-input-table':
                            statusForm == this.$_MISAEnum.FORM_MODE.View,
                        },
                      ]"
                      :readonly="statusForm == this.$_MISAEnum.FORM_MODE.View"
                      :maxLength="255"
                    ></misa-input>
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
                      :isReadonlyCBB="
                        statusForm == this.$_MISAEnum.FORM_MODE.View ||
                        receipt.IsNoted
                      "
                      :ref="`AccountDebtId${index}`"
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
                      :isReadonlyCBB="
                        statusForm == this.$_MISAEnum.FORM_MODE.View ||
                        receipt.IsNoted
                      "
                      :ref="`AccountBalanceId${index}`"
                    ></misa-form-combobox>
                  </td>
                  <td class="table-col-5 text-right">
                    <misa-input
                      v-model="item.Money"
                      :class="[
                        {
                          'readonly-input-table':
                            statusForm == this.$_MISAEnum.FORM_MODE.View ||
                            receipt.IsNoted,
                        },
                        'right-to-left',
                        { 'color-money-red': item.Money < 0 },
                      ]"
                      :readonly="
                        statusForm == this.$_MISAEnum.FORM_MODE.View ||
                        receipt.IsNoted
                      "
                      :maxLength="15"
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
                <td
                  class="table-col-5 text-right"
                  style="padding-right: 24px"
                  :class="{ 'color-money-red': TotalMoney < 0 }"
                >
                  {{ helperCommon.formatCurrency(TotalMoney) }}
                </td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="6">
                <misa-button-extra
                  :textButtonExtra="'Thêm dòng'"
                  @click="btnAddRowAccountant"
                  :disabled="
                    statusForm == this.$_MISAEnum.FORM_MODE.View ||
                    receipt.IsNoted
                  "
                ></misa-button-extra>
                <misa-button-extra
                  :textButtonExtra="'Xóa hết dòng'"
                  @click="deleteAllRowAccountant"
                  :disabled="
                    statusForm == this.$_MISAEnum.FORM_MODE.View ||
                    receipt.IsNoted
                  "
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
      <template v-if="statusForm != this.$_MISAEnum.FORM_MODE.View">
        <div class="footer-layout-left">
          <button @click="btnCancel" class="btn-black">Hủy</button>
        </div>
        <div class="footer-layout-right">
          <button class="btn-black" @click="btnSave">Cất</button>
          <div class="select-button">
            <button class="btn-green" @click="btnSaveAndAdd">
              Cất và Thêm
            </button>
            <div class="boundary-btn"></div>
            <button class="btn-green-icon">
              <div class="dropdown-white-icon"></div>
            </button>
          </div>
        </div>
      </template>
      <template
        v-if="statusForm == this.$_MISAEnum.FORM_MODE.View && !receipt.IsNoted"
      >
        <div class="footer-layout-left">
          <div class="footer-layout-left-header">
            <button class="btn-black">
              <div class="previous-icon"></div>
            </button>
            <button class="btn-black">
              <div class="next-icon"></div>
            </button>
          </div>
          <div class="footer-layout-left-body">
            <div class="print-button">
              <button>
                <div class="print-button-icon-left">
                  <div class="print-icon"></div>
                </div>
                <div class="print-button-text">In</div>
              </button>
              <button class="print-button-icon-left">
                <div class="dropdown-white-icon"></div>
              </button>
            </div>
          </div>
        </div>
        <div class="footer-layout-right">
          <div class="footer-layout-center"></div>
          <div class="footer-layout-right-header">
            <div class="print-button">
              <button style="border-radius: 4px">
                <div class="utiliti-icon"></div>
                <div>Tiện ích</div>
              </button>
            </div>
          </div>
          <div class="footer-layout-right-body">
            <button
              @click="statusForm = this.$_MISAEnum.FORM_MODE.Edit"
              class="btn-black"
            >
              Sửa
            </button>
            <button @click="btnNote">Ghi sổ</button>
          </div>
        </div>
      </template>
      <template
        v-if="statusForm == this.$_MISAEnum.FORM_MODE.View && receipt.IsNoted"
      >
        <div class="footer-layout-left">
          <div class="footer-layout-left-header">
            <button class="btn-black">
              <div class="previous-icon"></div>
            </button>
            <button class="btn-black">
              <div class="next-icon"></div>
            </button>
          </div>
          <div class="footer-layout-left-body">
            <div class="print-button">
              <button>
                <div class="print-button-icon-left">
                  <div class="print-icon"></div>
                </div>
                <div class="print-button-text">In</div>
              </button>
              <button class="print-button-icon-left">
                <div class="dropdown-white-icon"></div>
              </button>
            </div>
          </div>
        </div>
        <div class="footer-layout-right">
          <div class="footer-layout-center"></div>
          <div class="footer-layout-right-header">
            <div class="print-button">
              <button style="border-radius: 4px">
                <div class="utiliti-icon"></div>
                <div>Tiện ích</div>
              </button>
            </div>
          </div>
          <div class="footer-layout-right-body">
            <button
              @click="statusForm = this.$_MISAEnum.FORM_MODE.Edit"
              class="btn-black"
            >
              Sửa nhanh
            </button>
            <button @click="btnUnNote">Bỏ ghi</button>
          </div>
        </div>
      </template>
    </div>
    <!-- dialog employee input data not blank -->
    <misa-dialog-data-not-null
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      :title="titleDataNotnull"
    ></misa-dialog-data-not-null>
    <!-- dialog employee id Exist -->
    <misa-dialog-handle-exist
      v-if="isShowDialogHandleExist"
      :contentExist="contentReceiptNumberExist"
    ></misa-dialog-handle-exist>
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

    this.$_MISAEmitter.on("closeDialogHandleExist", () => {
      this.btnCloseDialogCodeExist();
    });

    this.$_MISAEmitter.on("confirmHandleExist", async () => {
      await this.btnConfirmCodeExist();
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

    this.$_MISAEmitter.on("handleScrollCBBformCBB", async (propCode) => {
      if (propCode == "AccountDebtNumber") {
        await this.handleScrollDebt();
      }
      if (propCode == "AccountBalanceNumber") {
        await this.handleScrollBalance();
      }
    });

    this.$_MISAEmitter.on(
      "onSearchChangeFormCBB",
      async (newValue, propCode) => {
        if (propCode == "AccountDebtNumber") {
          await this.onSearchChangeDebt(newValue);
        }
        if (propCode == "AccountBalanceNumber") {
          await this.onSearchChangeBalance(newValue);
        }
      }
    );

    this.$_MISAEmitter.on("onKeyDownFormCBB", (index, propCode) => {
      if (propCode == "AccountDebtNumber") {
        this.onKeyDownAccountDebt(index);
      }
      if (propCode == "AccountBalanceNumber") {
        this.onKeyDownAccountBalance(index);
      }
    });
  },

  mounted() {
    this.$refs.ProviderId.focus();
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
        "AccountDebtId",
        "AccountBalanceId",
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
      isShowDialogHandleExist: false,
      // Khai báo biến xác định nội dung dữ liệu tồn tại
      contentReceiptNumberExist: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: {},
      // Khai báo biên lưu mã nhân viên tự động sinh ra
      newReceiptNumber: null,
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
      // Biến lưu timeout search debt
      searchDebtTimeout: null,
      // Biến chứa danh sách tài khoản nợ
      listAccountBalance: [],
      // Trang hiện tại
      currentPageBalance: 1,
      // Biến lưu timeout search balance
      searchBalanceTimeout: null,
      // Biến lưu dòng hiện tại đang được chọn trong table hạch toán
      indexSelectRow: 0,
      // Biến lưu title data not null
      titleDataNotnull: "",
      // Biến lưu trạng thái form
      statusForm: null,
      // Biến lưu trạng thái đang bấm vào button thêm hay cất và thêm
      statusSave: null,
      // Tái sử dụng helper
      helperCommon: helperCommon,
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

    TotalMoney() {
      if (this.receipt.AccountantList) {
        const total = this.receipt.AccountantList.reduce(
          (total, item) => total + parseFloat(item.Money || 0),
          0
        );
        return total;
      } else {
        return 0;
      }
    },
  },

  watch: {
    "receipt.Reason": function (newVal, oldVal) {
      if (
        this.receipt.AccountantList &&
        this.receipt.AccountantList.length > 0
      ) {
        this.receipt.AccountantList.map((row) => {
          if (oldVal == row.Description) {
            row.Description = newVal;
          }
        });
      }
    },

    "receipt.AccountingDate": function (newVal, oldVal) {
      if (
        oldVal == undefined ||
        helperCommon.setNewDate(oldVal) == this.receipt.ReceiptDate
      ) {
        this.receipt.ReceiptDate = helperCommon.setNewDate(newVal);
      }
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
     * Mô tả: Tạo 1 dòng hạch toán mới
     * created by : BNTIEN
     * created date: 08-08-2023 08:52:43
     */
    setNewAccountant() {
      this.receipt.AccountantList = [];
      const debtDefault = this.listAccountDebt.find(
        (x) =>
          x.UserObjectDebt != this.$_MISAEnum.OBJ_ACCOUNT.Customer &&
          x.UserObjectDebt != this.$_MISAEnum.OBJ_ACCOUNT.Employee
      );
      const balanceDefault = this.listAccountBalance.find(
        (x) =>
          x.UserObjectBalance != this.$_MISAEnum.OBJ_ACCOUNT.Customer &&
          x.UserObjectBalance != this.$_MISAEnum.OBJ_ACCOUNT.Employee
      );
      let accountant = { Description: this.receipt.Reason, Money: 0 };
      if (debtDefault) {
        accountant.AccountDebtId = debtDefault.AccountDebtId;
        accountant.AccountDebtNumber = debtDefault.AccountDebtNumber;
        accountant.UserObjectDebt = debtDefault.UserObjectDebt;
        accountant.IsParentDebt = debtDefault.IsParentDebt;
      }
      if (balanceDefault) {
        accountant.AccountBalanceId = balanceDefault.AccountBalanceId;
        accountant.AccountBalanceNumber = balanceDefault.AccountBalanceNumber;
        accountant.UserObjectBalance = balanceDefault.UserObjectBalance;
        accountant.IsParentBalance = balanceDefault.IsParentBalance;
      }
      this.receipt.AccountantList.push(accountant);
    },
    /**
     * Mô tả: Lấy danh sách hạch toán theo receipt id
     * created by : BNTIEN
     * created date: 05-08-2023 20:53:02
     */
    async getAccountant() {
      try {
        if (this.receipt.ReceiptId) {
          const res = await accountantService.getByReceiptId(
            this.receipt.ReceiptId
          );
          this.receipt.AccountantList = res.data;
        } else {
          this.setNewAccountant();
        }
      } catch {
        this.receipt.AccountantList = [];
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
        this.statusForm = this.statusFormMode;
        if (this.statusFormMode == this.$_MISAEnum.FORM_MODE.Add) {
          // Sinh mã tự động
          this.AutoSetReceipt();
        }
        await this.getAccountant();
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Tự động sịnh các trường
     * created by : BNTIEN
     * created date: 08-08-2023 08:59:04
     */
    AutoSetReceipt() {
      this.receipt.ReceiptType = true;
      this.receipt.ReceiptNumber = this.newReceiptNumber;
      this.receipt.Reason = "Chi tiền cho";
      this.receipt.AccountingDate = helperCommon.setNewDate(new Date());
      this.receipt.ReceiptDate = this.receipt.AccountingDate;
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
                  this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT
                    .FORM_PAYMENT.maxLength[refInput].Limit
                )
              ) {
                this.setErrorMaxLength(refInput);
              }
              break;
            case "ProviderCode":
              if (this.receipt.ProviderCode && !this.receipt.ProviderId) {
                this.errors.ProviderId = `Mã nhà cung cấp <${this.receipt.ProviderCode}> không tồn tại trong hệ thống.`;
                this.isBorderRed.ProviderId = true;
                this.dataNotNull.push(
                  `Mã nhà cung cấp <${this.receipt.ProviderCode}> không tồn tại trong hệ thống.`
                );
              }
              break;
            case "FullName":
              if (this.receipt.FullName && !this.receipt.EmployeeId) {
                this.errors.FullName = `Nhân viên <${this.receipt.FullName}> không tồn tại trong hệ thống.`;
                this.isBorderRed.FullName = true;
                this.dataNotNull.push(
                  `Nhân viên <${this.receipt.FullName}> không tồn tại trong hệ thống.`
                );
              }
              break;
            case "AccountingDate":
              if (helperCommon.isEmptyInput(this.receipt[refInput])) {
                this.setError(refInput);
              }
              if (
                new Date(this.receipt.ReceiptDate) >
                new Date(this.receipt.AccountingDate)
              ) {
                this.errors.AccountingDate = `Ngày hạch toán phải lớn hơn hoặc bằng ngày chứng từ ${this.receipt.ReceiptDate}`;
                this.isBorderRed.AccountingDate = true;
                this.dataNotNull.push(
                  `Ngày hạch toán phải lớn hơn hoặc bằng ngày chứng từ ${helperCommon.formatDate(
                    this.receipt.ReceiptDate
                  )}`
                );
              }
              break;
            case "ProviderId":
            case "EmployeeId":
              break;
            case "ReceiptDate":
              if (helperCommon.isEmptyInput(this.receipt[refInput])) {
                this.setError(refInput);
              }
              break;
            default:
              if (this.receipt[refInput]) {
                if (
                  helperCommon.isMaxLengthInput(
                    this.receipt[refInput],
                    this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT
                      .FORM_PAYMENT.maxLength[refInput].Limit
                  )
                ) {
                  this.setErrorMaxLength(refInput);
                }
              }
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
        this.titleDataNotnull =
          this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
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
      this.isShowDialogHandleExist = true;
      this.isBorderRed.ReceiptNumber = true;
      this.errors["ReceiptNumber"] = `${
        this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
          .exist_pre
      }${receiptExisted.ReceiptNumber}> ${
        this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_DETAIL_END
      }`;
      this.contentReceiptNumberExist = `${
        this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
          .exist_pre
      }${receiptExisted.ReceiptNumber}${
        this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT
          .exist_end
      }`;
    },
    /**
     * Mô tả: Hàm kiểm tra xem có ghi sổ được không
     * created by : BNTIEN
     * created date: 06-08-2023 09:47:34
     */
    checkIsNoted() {
      if (
        this.receipt.AccountantList &&
        this.receipt.AccountantList.length == 0
      ) {
        return false;
      }
      let checkNoted = true;
      this.receipt.AccountantList.map((x) => {
        // Nếu tài khoản nợ không theo nhà cung cấp, có nghĩa nó theo khách hàng hoặc nhân viên
        if (
          x.UserObjectDebt == this.$_MISAEnum.OBJ_ACCOUNT.Customer ||
          x.UserObjectDebt == this.$_MISAEnum.OBJ_ACCOUNT.Provider
        ) {
          checkNoted = false;
          this.dataNotNull.push(
            `<TK nợ: ${x.AccountDebtNumber}> không theo nhà cung cấp, vui lòng kiểm tra lại`
          );
        } else {
          // Nếu theo nhà cung cấp nhưng chưa chọn nhà cung cấp
          if (!this.receipt.ProviderId) {
            checkNoted = false;
            this.dataNotNull.push(
              `Tài khoản ${x.AccountDebtNumber} chi tiết theo <Nhà cung cấp>, chứng từ hạch toán thiếu <Nhà cung cấp>`
            );
          }
        }
        if (
          x.UserObjectBalance == this.$_MISAEnum.OBJ_ACCOUNT.Customer ||
          x.UserObjectBalance == this.$_MISAEnum.OBJ_ACCOUNT.Provider
        ) {
          checkNoted = false;
          this.dataNotNull.push(
            `<TK có: ${x.AccountBalanceNumber}> không theo nhà cung cấp, vui lòng kiểm tra lại`
          );
        } else {
          // Nếu theo nhà cung cấp nhưng chưa chọn nhà cung cấp
          if (!this.receipt.ProviderId) {
            checkNoted = false;
            this.dataNotNull.push(
              `Tài khoản ${x.AccountBalanceNumber} chi tiết theo <Nhà cung cấp>, chứng từ hạch toán thiếu <Nhà cung cấp>`
            );
          }
        }
      });
      return checkNoted;
    },

    /**
     * Mô tả: validate hạch toán
     * created by : BNTIEN
     * created date: 07-08-2023 14:58:52
     */
    validateAccountant() {
      let checkReturn = false;
      if (
        this.receipt.AccountantList &&
        this.receipt.AccountantList.length > 0
      ) {
        checkReturn = this.receipt.AccountantList.some((item, index) => {
          if (!item.AccountDebtId) {
            this.dataNotNull.push("Tài khoản nợ không được để trống");
            this.isBorderRed.AccountDebtId = true;
            this.indexSelectRow = index;
            return true; // Thoát khỏi vòng lặp ngay lập tức khi thỏa mãn điều kiện này
          }
          if (!item.AccountBalanceId) {
            this.dataNotNull.push("Tài khoản có không được để trống");
            this.isBorderRed.AccountBalanceId = true;
            this.indexSelectRow = index;
            return true; // Thoát khỏi vòng lặp ngay lập tức khi thỏa mãn điều kiện này
          }
          return false; // Không thoát khỏi vòng lặp nếu không có điều kiện nào thỏa mãn
        });
      }
      return checkReturn;
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    async btnSave() {
      this.statusSave = this.$_MISAEnum.STATUS_BUTTON.Save;
      if (this.statusForm === this.$_MISAEnum.FORM_MODE.Add) {
        this.validateReceipt();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
          this.titleDataNotnull =
            this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
        } else {
          try {
            if (
              !this.receipt.AccountantList ||
              this.receipt.AccountantList.length == 0
            ) {
              this.dataNotNull.push("Bạn phải nhập chứng từ chi tiết.");
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            if (this.validateAccountant()) {
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let receiptByCode = await this.checkReceiptExists();
            // Nếu mã nhân viên chưa tồn tại trong hệ thống
            if (!receiptByCode) {
              this.receipt.TotalMoney = this.TotalMoney;
              // Kiểm tra xem có ghi sổ được không
              this.receipt.IsNoted = this.checkIsNoted();
              let receiptInserted = await receiptService.create(this.receipt);
              this.receipt.ReceiptId = receiptInserted.data;
              this.receipt.AccountantList.map(
                (x) => (x.ReceiptId = receiptInserted.data)
              );
              this.statusForm = this.$_MISAEnum.FORM_MODE.View;
              if (this.dataNotNull.length > 0) {
                this.isShowDialogDataNotNull = true;
                this.titleDataNotnull = "Ghi sổ không thành công";
              } else {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  "Ghi sổ thành công"
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
      } else if (this.statusForm === this.$_MISAEnum.FORM_MODE.Edit) {
        // Nếu form ở trạng thái sửa
        this.validateReceipt();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
          this.titleDataNotnull =
            this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
        } else {
          try {
            if (
              !this.receipt.AccountantList ||
              this.receipt.AccountantList.length == 0
            ) {
              this.dataNotNull.push("Bạn phải nhập chứng từ chi tiết.");
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            if (this.validateAccountant()) {
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let receiptByCode = await this.checkReceiptExists();
            // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại nhưng trùng với nhân viên đang sửa
            if (
              !receiptByCode ||
              receiptByCode.ReceiptNumber === this.receipt.ReceiptNumber
            ) {
              // Nếu số phiếu chi chưa tồn tại trong hệ thống
              this.receipt.TotalMoney = this.TotalMoney;
              // Kiểm tra xem có ghi sổ được không
              this.receipt.IsNoted = this.checkIsNoted();
              await receiptService.update(this.receipt.ReceiptId, this.receipt);
              this.statusForm = this.$_MISAEnum.FORM_MODE.View;
              if (this.dataNotNull.length > 0) {
                this.isShowDialogDataNotNull = true;
                this.titleDataNotnull = "Ghi sổ không thành công";
              } else {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  "Ghi sổ thành công"
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
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nut cất và thêm trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:23
     */
    async btnSaveAndAdd() {
      this.statusSave = this.$_MISAEnum.STATUS_BUTTON.SaveAndAdd;
      // Nếu form ở trạng thái thêm mới
      if (this.statusForm === this.$_MISAEnum.FORM_MODE.Add) {
        this.validateReceipt();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
          this.titleDataNotnull =
            this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
        } else {
          try {
            if (
              !this.receipt.AccountantList ||
              this.receipt.AccountantList.length == 0
            ) {
              this.dataNotNull.push("Bạn phải nhập chứng từ chi tiết.");
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            if (this.validateAccountant()) {
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let receiptByCode = await this.checkReceiptExists();
            if (!receiptByCode) {
              this.receipt.TotalMoney = this.TotalMoney;
              // Kiểm tra xem có ghi sổ được không
              this.receipt.IsNoted = this.checkIsNoted();
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              await receiptService.create(this.receipt);
              this.receipt = {};
              this.isBorderRed = {};
              await this.getNewCode();
              this.AutoSetReceipt();
              this.setNewAccountant();
              if (this.dataNotNull.length > 0) {
                this.isShowDialogDataNotNull = true;
                this.titleDataNotnull = "Ghi sổ không thành công";
              } else {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  "Ghi sổ thành công"
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
        // Nếu form ở trạng thái sửa
      } else {
        this.validateReceipt();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
          this.titleDataNotnull =
            this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
        } else {
          try {
            if (
              !this.receipt.AccountantList ||
              this.receipt.AccountantList.length == 0
            ) {
              this.dataNotNull.push("Bạn phải nhập chứng từ chi tiết.");
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            if (this.validateAccountant()) {
              this.titleDataNotnull =
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID;
              this.isShowDialogDataNotNull = true;
              return;
            }
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let receiptByCode = await this.checkReceiptExists();
            // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại trùng với nhân viên đang sửa
            if (
              !receiptByCode ||
              receiptByCode.ReceiptNumber === this.receipt.ReceiptNumber
            ) {
              this.receipt.TotalMoney = this.TotalMoney;
              // Kiểm tra xem có ghi sổ được không
              this.receipt.IsNoted = this.checkIsNoted();
              await receiptService.update(this.receipt.ReceiptId, this.receipt);
              this.receipt = {};
              await this.getNewCode();
              this.AutoSetReceipt();
              this.setNewAccountant();
              if (this.dataNotNull.length > 0) {
                this.isShowDialogDataNotNull = true;
                this.titleDataNotnull = "Ghi sổ không thành công";
              } else {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  "Ghi sổ thành công"
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
        !listPropError.includes("ProviderCode")
      ) {
        listPropError.push("ProviderCode");
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
          if (prop === "ProviderId" || prop === "ProviderCode") {
            this.$refs.ProviderId.focus();
          } else if (prop === "EmployeeId" || prop === "FullName") {
            this.$refs.EmployeeId.focus();
          } else if (prop == "AccountDebtId") {
            this.$refs[`AccountDebtId${this.indexSelectRow}`][0].focus();
          } else if (prop == "AccountBalanceId") {
            this.$refs[`AccountBalanceId${this.indexSelectRow}`][0].focus();
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
      this.isShowDialogHandleExist = false;
    },

    /**
     * Mô tả: Vẫn thêm phiếu chi bằng cách tăng tự động số phiếu chi khi nó tồn tại
     * created by : BNTIEN
     * created date: 08-08-2023 08:11:29
     */
    async btnConfirmCodeExist() {
      this.isShowDialogHandleExist = false;
      this.isBorderRed.ReceiptNumber = false;
      this.errors["ReceiptNumber"] = "";
      this.receipt.ReceiptNumber = this.newReceiptNumber;
      if (this.statusSave == this.$_MISAEnum.STATUS_BUTTON.Save) {
        await this.btnSave();
      } else if (this.statusSave == this.$_MISAEnum.STATUS_BUTTON.SaveAndAdd) {
        await this.btnSaveAndAdd();
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button hủy trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:40:13
     */
    onCancelDialogDataChange() {
      this.isShowDialogDataChange = false;
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
     * Mô tả: xử lí sự kiện khi bấm esc khi đang ở form detail
     * created by : BNTIEN
     * created date: 01-07-2023 01:05:25
     */
    async handleKeyDown(event) {
      if (event.key === "Escape") {
        // Nếu phím được nhấn là Esc, thực hiện hàm onCloseFormDetail
        this.$emit("closeFormDetail");
      } else if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn phím Ctrl + S
        await this.btnSave();
      } else if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn tổ hợp phím Ctrl + Shift + S
        await this.btnSaveAndAdd();
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
      this.receipt.EmployeeId = provider.EmployeeId;
      this.receipt.FullName = provider.FullName;
      if (provider.IsPersonal) {
        this.receipt.ReceiveName = provider.ProviderName;
      }
      this.receipt.Address = provider.Address;
      this.receipt.Reason = `Chi tiền cho ${provider.ProviderName}`;
      this.receipt.AccountantList.map((x) => {
        x.Description = `Chi tiền cho ${provider.ProviderName}`;
      });
      this.isBorderRed.ProviderName = false;
    },

    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search employee và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    async onSearchChangeProvider(newValue) {
      this.isBorderRed.ProviderCode = false;
      this.isBorderRed.ProviderId = false;
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchProviderTimeout);
        this.receipt.ProviderCode = newValue;
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
      this.receipt.EmployeeId = this.listProviderSearch.Data[index].EmployeeId;
      this.receipt.FullName = this.listProviderSearch.Data[index].FullName;
      if (this.listProviderSearch.Data[index].IsPersonal) {
        this.receipt.ReceiveName =
          this.listProviderSearch.Data[index].ProviderName;
      }
      this.receipt.Address = this.listProviderSearch.Data[index].Address;
      this.receipt.Reason = `Chi tiền cho ${this.listProviderSearch.Data[index].ProviderName}`;
      this.receipt.AccountantList.map((x) => {
        x.Description = `Chi tiền cho ${this.listProviderSearch.Data[index].ProviderName}`;
      });
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
     * Mô tả: Chọn dòng đang được sửa trong table hạch toán
     * created by : BNTIEN
     * created date: 05-08-2023 22:04:27
     */
    focusRow(index) {
      this.indexSelectRow = index;
    },

    /**
     * Mô tả: Chọn tài khoản nợ
     * created by : BNTIEN
     * created date: 05-08-2023 20:05:15
     */
    selectedDebt(accountDebt) {
      this.receipt.AccountantList[this.indexSelectRow].AccountDebtId =
        accountDebt.AccountDebtId;
      this.receipt.AccountantList[this.indexSelectRow].AccountDebtNumber =
        accountDebt.AccountDebtNumber;
      this.receipt.AccountantList[this.indexSelectRow].IsParentDebt =
        accountDebt.IsParentDebt;
      this.receipt.AccountantList[this.indexSelectRow].UserObjectDebt =
        accountDebt.UserObjectDebt;
      this.isBorderRed.AccountDebtId = false;
    },
    /**
     * Mô tả: Scroll tài khoản nợ
     * created by : BNTIEN
     * created date: 08-08-2023 04:49:32
     */
    async handleScrollDebt() {
      try {
        this.currentPageDebt += 1;
        await this.getListDebt();
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Tìm kiếm tài khoản nợ
     * created by : BNTIEN
     * created date: 08-08-2023 05:24:57
     */
    async onSearchChangeDebt(newValue) {
      this.isBorderRed.AccountDebtId = false;
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchDebtTimeout);
        this.receipt.AccountantList[this.indexSelectRow].AccountDebtId = "";
        this.receipt.AccountantList[this.indexSelectRow].AccountDebtNumber = "";
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchDebtTimeout = setTimeout(async () => {
          const newListDebt = await accountService.getDebt(20, 1, newValue);
          this.listAccountDebt = newListDebt.data;
        }, 500);
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Bấm enter trong cbb tài khoản nợ
     * created by : BNTIEN
     * created date: 09-08-2023 09:02:29
     */
    onKeyDownAccountDebt(index) {
      this.receipt.AccountantList[this.indexSelectRow].AccountDebtId =
        this.listAccountDebt[index].AccountDebtId;
      this.receipt.AccountantList[this.indexSelectRow].AccountDebtNumber =
        this.listAccountDebt[index].AccountDebtNumber;
      this.receipt.AccountantList[this.indexSelectRow].IsParentDebt =
        this.listAccountDebt[index].IsParentDebt;
      this.receipt.AccountantList[this.indexSelectRow].UserObjectDebt =
        this.listAccountDebt[index].UserObjectDebt;
    },
    /**
     * Mô tả: Tìm kiếm tài khoản nợ
     * created by : BNTIEN
     * created date: 08-08-2023 05:24:57
     */
    async onSearchChangeBalance(newValue) {
      try {
        this.isBorderRed.AccountBalanceId = false;
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchBalanceTimeout);
        this.receipt.AccountantList[this.indexSelectRow].AccountBalanceId = "";
        this.receipt.AccountantList[this.indexSelectRow].AccountBalanceNumber =
          "";
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchBalanceTimeout = setTimeout(async () => {
          const newListBalance = await accountService.getBalance(
            20,
            1,
            newValue
          );
          this.listAccountBalance = newListBalance.data;
        }, 500);
      } catch {
        return;
      }
    },
    onKeyDownAccountBalance(index) {
      this.receipt.AccountantList[this.indexSelectRow].AccountBalanceId =
        this.listAccountBalance[index].AccountBalanceId;
      this.receipt.AccountantList[this.indexSelectRow].AccountBalanceNumber =
        this.listAccountBalance[index].AccountBalanceNumber;
      this.receipt.AccountantList[this.indexSelectRow].IsParentBalance =
        this.listAccountBalance[index].IsParentBalance;
      this.receipt.AccountantList[this.indexSelectRow].UserObjectBalance =
        this.listAccountBalance[index].UserObjectBalance;
    },
    /**
     * Mô tả: Chọn tài khoản nợ
     * created by : BNTIEN
     * created date: 05-08-2023 20:05:15
     */
    selectedBalance(accountBalance) {
      this.receipt.AccountantList[this.indexSelectRow].AccountBalanceId =
        accountBalance.AccountBalanceId;
      this.receipt.AccountantList[this.indexSelectRow].AccountBalanceNumber =
        accountBalance.AccountBalanceNumber;
      this.receipt.AccountantList[this.indexSelectRow].IsParentBalance =
        accountBalance.IsParentBalance;
      this.receipt.AccountantList[this.indexSelectRow].UserObjectBalance =
        accountBalance.UserObjectBalance;
      this.isBorderRed.AccountBalanceId = false;
    },
    /**
     * Mô tả: Scroll tài khoản nợ
     * created by : BNTIEN
     * created date: 08-08-2023 04:49:32
     */
    async handleScrollBalance() {
      try {
        this.currentPageBalance += 1;
        await this.getListBalance();
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm thêm 1 dòng hạch toán
     * created by : BNTIEN
     * created date: 05-08-2023 21:52:20
     */
    btnAddRowAccountant() {
      if (
        this.receipt.AccountantList &&
        this.receipt.AccountantList.length > 0
      ) {
        this.receipt.AccountantList.push({
          ...this.receipt.AccountantList[
            this.receipt.AccountantList.length - 1
          ],
        });
      } else if (
        !this.receipt.AccountantList ||
        this.receipt.AccountantList.length == 0
      )
        this.receipt.AccountantList.push({
          ReceiptId: this.receipt.ReceiptId,
          Description: "",
          Money: 0,
        });
    },

    /**
     * Mô tả: Xóa 1 dòng hạch toán
     * created by : BNTIEN
     * created date: 05-08-2023 21:50:18
     */
    deleteRowAccountant(index) {
      if (
        this.statusForm !== this.$_MISAEnum.FORM_MODE.View &&
        !this.receipt.IsNoted
      ) {
        this.receipt.AccountantList.splice(index, 1);
      }
    },

    /**
     * Mô tả: Xóa tất cả dòng hạch toán
     * created by : BNTIEN
     * created date: 05-08-2023 21:52:08
     */
    deleteAllRowAccountant() {
      if (this.receipt.AccountantList.length > 0) {
        this.receipt.AccountantList.splice(
          0,
          this.receipt.AccountantList.length
        );
      }
    },

    /**
     * Mô tả: Ghi sổ 1 phiếu thu/chi
     * created by : BNTIEN
     * created date: 06-08-2023 15:32:31
     */
    async btnNote() {
      // Kiểm tra xem có ghi sổ được không
      const checkNoted = this.checkIsNoted();
      if (checkNoted) {
        const res = await receiptService.updateNote(this.receipt);
        this.receipt.IsNoted = !this.receipt.IsNoted;
        if (
          this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) &&
          res.data > 0
        ) {
          this.$_MISAEmitter.emit("onShowToastMessage", "Ghi sổ thành công");
        }
      } else {
        this.isShowDialogDataNotNull = true;
        this.titleDataNotnull = "Ghi sổ không thành công";
      }
    },

    /**
     * Mô tả: Hàm bỏ ghi 1 phiếu thu/chi
     * created by : BNTIEN
     * created date: 06-08-2023 15:39:26
     */
    async btnUnNote() {
      await receiptService.updateNote(this.receipt);
      this.receipt.IsNoted = !this.receipt.IsNoted;
    },
  },

  beforeUnmount() {
    this.$_MISAEmitter.off("cancelDialogDataChange");
    this.$_MISAEmitter.off("noDialogDataChange");
    this.$_MISAEmitter.off("yesDialogDataChange");
    this.$_MISAEmitter.off("closeDialogHandleExist");
    this.$_MISAEmitter.off("closeDialogDataError");
    this.$_MISAEmitter.off("onSelectedEntityCBBSingle");
    this.$_MISAEmitter.off("onSearchChangeCBBSingle");
    this.$_MISAEmitter.off("onKeyDownEntityCBBSingle");
    this.$_MISAEmitter.off("onSelectedEntityFormCBB");
    this.$_MISAEmitter.off("handleScrollCBBformCBB");
    this.$_MISAEmitter.off("onSearchChangeFormCBB");
    this.$_MISAEmitter.off("onKeyDownFormCBB");
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

.border-red {
  border: 1px solid red;
}

.readonly-input {
  background-color: #eff0f2;
}

.readonly-input-table {
  background-color: #fff;
  border: unset;
}

.readonly-input-table:hover {
  background-color: #fff8cb;
  border: unset;
}

.readonly-input-table:focus {
  background-color: #f9ecca;
  border: unset;
}

.color-money-red {
  color: red;
}
</style>
