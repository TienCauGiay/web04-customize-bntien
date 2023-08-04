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
import employeeService from "@/services/employee.js";
import providerService from "@/services/provider.js";
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
      employeeProperty: [
        "EmployeeCode",
        "FullName",
        "DepartmentId",
        "DepartmentName",
        "PositionName",
        "DateOfBirth",
        "IdentityNumber",
        "IdentityDate",
        "IdentityPlace",
        "Address",
        "PhoneNumber",
        "PhoneLandline",
        "Email",
        "BankAccount",
        "BankName",
        "BankBranch",
      ],
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
      contentEmployeeCodeExist: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: {},
      // Khai báo biến quy định sau 1 khoảng thời gian mới thực hiện tìm kiếm ở combobox
      searchDepartmentTimeout: null,
      // Khai báo biên lưu mã nhân viên tự động sinh ra
      newEmployeeCode: null,
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
        let maxEmployeeCode = await employeeService.getCodeMax();
        this.newEmployeeCode = maxEmployeeCode.data;
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
     * Mô tả: gọi api lấy dữ liệu
     * created by : BNTIEN
     * created date: 30-05-2023 14:57:33
     */
    async loadData() {
      try {
        await this.getNewCode();
        await this.getListProvider();
        await this.getListEmployee();
        // Nếu form ở trạng thái thêm mới
        // Chuyển đối tượng sang chuỗi json
        let res = JSON.stringify(this.employeeSelected);
        // Chuyển đổi chuỗi json thành đối tượng employee
        this.employee = JSON.parse(res);
        if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
          // Sinh mã tự động
          this.employee.EmployeeCode = this.newEmployeeCode;
          // Gán title cho form mode thêm mới
          this.titleFormMode =
            this.$_MISAResource[this.$_LANG_CODE].FORM.ADD_EMPLOYEE;
        } else {
          // Gán title cho form mode thêm sửa
          this.titleFormMode =
            this.$_MISAResource[this.$_LANG_CODE].FORM.UPDATE_EMPLOYEE;
        }
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
     * Mô tả: Xử lí chọn và bỏ chọn ô checkbox customer
     * created by : BNTIEN
     * created date: 24-06-2023 09:56:15
     */
    handleCustomerCheckboxChange() {
      if (this.employee.IsCustomer === this.$_MISAEnum.CUSTOMER) {
        this.employee.IsCustomer = null; // Bỏ chọn ô input nếu đã được chọn trước đó
      } else {
        this.employee.IsCustomer = this.$_MISAEnum.CUSTOMER;
      }
    },
    /**
     * Mô tả: xử lí chọn và bỏ chọn ô checkbox provider
     * created by : BNTIEN
     * created date: 24-06-2023 09:56:48
     */
    handleProviderCheckboxChange() {
      if (this.employee.IsProvider === this.$_MISAEnum.PROVIDER) {
        this.employee.IsProvider = null; // Bỏ chọn ô input nếu đã được chọn trước đó
      } else {
        this.employee.IsProvider = this.$_MISAEnum.PROVIDER;
      }
    },

    /**
     * Mô tả: Hàm kiểm tra xem employee có thay đổi sau khi mở form detail không
     * created by : BNTIEN
     * created date: 30-06-2023 00:21:22
     */
    hasDataChanged() {
      return (
        JSON.stringify(this.employeeSelected) !== JSON.stringify(this.employee)
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
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn đơn vị
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedDepartment(department) {
      this.employee.DepartmentName = department.DepartmentName;
      this.employee.DepartmentId = department.DepartmentId;
      this.isBorderRed.DepartmentName = false;
    },
    /**
     * Mô tả: Hàm set các lỗi nhập liệu phía fontend
     * created by : BNTIEN
     * created date: 11-07-2023 16:36:05
     */
    setError(key) {
      try {
        this.errors[key] = this.$_MISAResource[this.$_LANG_CODE].VALIDATE[key];
        this.isBorderRed[key] = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].VALIDATE[key]
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
          this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[key].Warning;
        this.isBorderRed[key] = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[key].Warning
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
    validateEmployee() {
      try {
        for (const refInput of this.employeeProperty) {
          switch (refInput) {
            case "EmployeeCode":
            case "FullName":
              if (helperCommon.isEmptyInput(this.employee[refInput])) {
                this.setError(refInput);
              } else if (
                helperCommon.isMaxLengthInput(
                  this.employee[refInput],
                  this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
                    .Limit
                )
              ) {
                this.setErrorMaxLength(refInput);
              }
              break;
            case "DepartmentId":
              break;
            case "DepartmentName":
              if (helperCommon.isEmptyInput(this.employee[refInput])) {
                this.setError(refInput);
              }
              break;
            case "DateOfBirth":
            case "IdentityDate":
              if (this.employee[refInput]) {
                if (helperCommon.isInvalidDate(this.employee[refInput])) {
                  this.setError(refInput);
                }
              }
              break;
            case "IdentityNumber":
              if (this.employee[refInput]) {
                if (
                  helperCommon.isMaxLengthInput(
                    this.employee[refInput],
                    this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
                      .Limit
                  )
                ) {
                  this.setErrorMaxLength(refInput);
                } else if (helperCommon.isNumber(this.employee[refInput])) {
                  this.setError(refInput);
                }
              }
              break;
            case "Email":
              if (this.employee[refInput]) {
                if (
                  helperCommon.isMaxLengthInput(
                    this.employee[refInput],
                    this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
                      .Limit
                  )
                ) {
                  this.setErrorMaxLength(refInput);
                } else if (
                  helperCommon.isFormatEmail(this.employee[refInput])
                ) {
                  this.setError(refInput);
                }
              }
              break;
            default:
              if (this.employee[refInput]) {
                if (
                  helperCommon.isMaxLengthInput(
                    this.employee[refInput],
                    this.$_MISAResource[this.$_LANG_CODE].MAXLENGTH[refInput]
                      .Limit
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
    handleErrorInputEmployee(errors, employeeProperty) {
      const responseHandle = helperCommon.handleErrorInput(
        errors,
        employeeProperty
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
    async checkEmployeeExists() {
      try {
        const res = await employeeService.getByCode(this.employee.EmployeeCode);
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
    handleEmployeeExisted(employeeExisted) {
      this.isShowDialogCodeExist = true;
      this.isBorderRed.EmployeeCode = true;
      this.errors["EmployeeCode"] = `${
        this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_PRE
      }
       ${employeeExisted.EmployeeCode} ${
        this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_DETAIL_END
      }`;
      this.contentEmployeeCodeExist = employeeExisted.EmployeeCode;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    async btnSave() {
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        this.validateEmployee();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
        } else {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeByCode = await this.checkEmployeeExists();
            if (!employeeByCode) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              const res = await employeeService.create(this.employee);
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
                this.$emit("closeFormDetail");
                this.$_MISAEmitter.emit("refreshDataTable");
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.handleEmployeeExisted(employeeByCode);
            }
          } catch (error) {
            this.handleErrorInputEmployee(error, this.employeeProperty);
          }
        }
      } else {
        // Nếu form ở trạng thái sửa
        // Kiểm tra xem dữ liệu có thay đổi hay k (Trường hợp đã thay đổi)
        if (this.hasDataChanged()) {
          this.validateEmployee();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let employeeByCode = await this.checkEmployeeExists();
              // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại nhưng trùng với nhân viên đang sửa
              if (
                !employeeByCode ||
                employeeByCode.EmployeeCode ===
                  this.employeeSelected.EmployeeCode
              ) {
                const res = await employeeService.update(
                  this.employeeSelected.EmployeeId,
                  this.employee
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
                  this.$emit("closeFormDetail");
                  this.$_MISAEmitter.emit("refreshDataTable");
                }
              } else {
                // Nếu mã nhân viên đã tồn tại trong hệ thống
                this.handleEmployeeExisted(employeeByCode);
              }
            } catch (error) {
              this.handleErrorInputEmployee(error, this.employeeProperty);
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
        this.validateEmployee();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
        } else {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeByCode = await this.checkEmployeeExists();
            if (!employeeByCode) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              const res = await employeeService.create(this.employee);
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
                this.employee.EmployeeCode = this.newEmployeeCode;
                this.focusCode();
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.handleEmployeeExisted(employeeByCode);
            }
          } catch (error) {
            this.handleErrorInputEmployee(error, this.employeeProperty);
          }
        }
        // Nếu form ở trạng thái sửa
      } else {
        // Kiểm tra xem dữ liệu có thay đổi hay k
        if (this.hasDataChanged()) {
          this.validateEmployee();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let employeeByCode = await this.checkEmployeeExists();
              // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại trùng với nhân viên đang sửa
              if (
                !employeeByCode ||
                employeeByCode.EmployeeCode ===
                  this.employeeSelected.EmployeeCode
              ) {
                const res = await employeeService.update(
                  this.employeeSelected.EmployeeId,
                  this.employee
                );
                this.employee = {};
                this.$_MISAEmitter.emit("setFormModeAdd");
                await this.getNewCode();
                this.employee.EmployeeCode = this.newEmployeeCode;
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
                this.handleEmployeeExisted(employeeByCode);
              }
            } catch (error) {
              this.handleErrorInputEmployee(error, this.employeeProperty);
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
        listPropError.includes("DepartmentId") &&
        !listPropError.includes("DepartmentName")
      ) {
        listPropError.push("DepartmentName");
      }
      for (const prop of this.employeeProperty) {
        if (listPropError.includes(prop)) {
          // đợi DOM cập nhật trước khi thực thi focus
          if (prop === "DepartmentId" || prop === "DepartmentName") {
            this.$nextTick(() => {
              this.$_MISAEmitter.emit("focusInputCBB");
            });
          } else {
            this.$nextTick(() => {
              this.$refs[prop].focus();
            });
          }
          return;
        }

        // else if(prop === "DateOfBirth" || prop === "IdentityDate"){
        //     this.$nextTick(() => {
        //       this.$refs[prop].$el.focus();
        //     });
        //   }
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
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn nhân viên mua hàng
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedProvider(provider) {
      this.receipt.ProviderName = provider.ProviderName;
      this.receipt.ProviderCode = provider.ProviderCode;
      this.receipt.ProviderId = provider.ProviderId;
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
      this.isBorderRed.ProviderName = false;
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
</style>
