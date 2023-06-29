<template>
  <div id="detail-info-employee" class="position-display-center">
    <div class="employee-toolbar">
      <div
        class="question-icon icon-tb"
        :tabindex="23"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.HELP"
      ></div>
      <div
        @click="onCloseFormDetail"
        class="close-icon icon-tb"
        id="employee-exit"
        :tabindex="24"
        @keydown.tab.prevent="resetTab($event.target.value)"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.EXIST"
      ></div>
    </div>
    <div class="employee-main">
      <div class="employee-title">
        <p>
          <b>{{ this.titleFormMode }}</b>
        </p>
        <div class="employee-check">
          <input
            type="checkbox"
            :checked="employee.IsCustomer === this.$_MISAEnum.CUSTOMER"
            @change="handleCustomerCheckboxChange"
            :tabindex="18"
          />
          <span>{{
            this.$_MISAResource[this.$_LANG_CODE].FORM.IS_CUSTOMER
          }}</span>
        </div>
        <div class="employee-check">
          <input
            type="checkbox"
            :checked="employee.IsProvider === this.$_MISAEnum.PROVIDER"
            @change="handleProviderCheckboxChange"
            :tabindex="19"
          />
          <span>{{
            this.$_MISAResource[this.$_LANG_CODE].FORM.IS_PROVIDER
          }}</span>
        </div>
      </div>
      <div class="employee-content">
        <div class="half-content">
          <div class="col-md-n">
            <label
              >{{ this.$_MISAResource[this.$_LANG_CODE].FORM.CODE }}
              <span class="s-require">*</span></label
            >
            <misa-input
              ref="EmployeeCode"
              v-model="employee.EmployeeCode"
              :class="{
                'border-red': isBorderRed.EmployeeCode,
              }"
              :tabindex="1"
              :title="
                isBorderRed.EmployeeCode || !employee.EmployeeCode
                  ? errors['EmployeeCode']
                  : ''
              "
            ></misa-input>
          </div>
          <div class="col-md-tb">
            <label
              >{{ this.$_MISAResource[this.$_LANG_CODE].FORM.NAME }}
              <span class="s-require">*</span></label
            >
            <misa-input
              ref="FullName"
              v-model="employee.FullName"
              :class="{ 'border-red': isBorderRed.FullName }"
              :tabindex="2"
              :title="
                isBorderRed.FullName || !employee.FullName
                  ? errors['FullName']
                  : ''
              "
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-n">
            <label>{{ this.$_MISAResource[this.$_LANG_CODE].FORM.DOB }}</label>
            <misa-input
              type="date"
              v-model="employee.DateOfBirth"
              :value="formattedDate"
              :tabindex="5"
              :class="{
                'border-red': isBorderRed.DateOfBirth,
              }"
              :title="isBorderRed.DateOfBirth ? errors['DateOfBirth'] : ''"
              ref="DateOfBirth"
            ></misa-input>
          </div>
          <div class="col-md-tb">
            <label>{{
              this.$_MISAResource[this.$_LANG_CODE].FORM.GENDER
            }}</label>
            <div class="e-gender">
              <input
                v-model="employee.Gender"
                :value="this.$_MISAEnum.GENDER.Male"
                type="radio"
                name="gender"
                :tabindex="6"
              />
              <span>{{
                this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER.Male
              }}</span>
              <input
                v-model="employee.Gender"
                :value="this.$_MISAEnum.GENDER.Female"
                type="radio"
                name="gender"
                :tabindex="7"
              />
              <span>{{
                this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER.Female
              }}</span>
              <input
                v-model="employee.Gender"
                :value="this.$_MISAEnum.GENDER.Other"
                type="radio"
                name="gender"
                :tabindex="8"
              />
              <span>{{
                this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER.Other
              }}</span>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div
            class="col-md-l"
            style="position: relative"
            ref="MenuItemDepartment"
          >
            <label
              >{{ this.$_MISAResource[this.$_LANG_CODE].FORM.DEPARTMENT }}
              <span class="s-require">*</span></label
            >
            <div
              class="e-cbb"
              id="e-cbb"
              :class="{
                'border-red': isBorderRed.DepartmentName,
              }"
            >
              <div class="e-textfield-cbb">
                <misa-input
                  ref="DepartmentName"
                  :placeholder="
                    this.$_MISAResource[this.$_LANG_CODE].FORM
                      .PLACEHOLDER_DEPARTMENT
                  "
                  :value="employee.DepartmentName"
                  @input="onSearchChange"
                  :tabindex="3"
                  :title="
                    isBorderRed.DepartmentName || !employee.DepartmentName
                      ? errors['DepartmentName']
                      : ''
                  "
                  @keydown="onKeyDownDepartment"
                ></misa-input>
              </div>
              <div class="e-icon-cbb" @click="onShowSelectDepartment">
                <div class="function-icon"></div>
              </div>
            </div>
            <div
              class="col-md-l select-department"
              :class="{
                'select-department-block':
                  isShowSelectDepartment && listDepartmentSearch.length > 0,
              }"
            >
              <ul
                v-show="isShowSelectDepartment"
                @click="onShowSelectDepartment"
              >
                <li
                  v-for="(department, index) in listDepartmentSearch"
                  :key="index"
                  @click="onSelectedDepartment(department, index)"
                  :class="{ 'cbb-selected': index == indexDepartmentSelected }"
                  ref="DepartmentSelectedItem"
                >
                  {{ department.DepartmentName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-tb">
            <label
              :title="
                this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.IDENTITY_NUMBER
              "
              >{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.IDENTITY_NUMBER
              }}</label
            >
            <misa-input
              v-model="employee.IdentityNumber"
              :tabindex="9"
              ref="IdentityNumber"
              :class="{
                'border-red': isBorderRed.IdentityNumber,
              }"
              :title="
                isBorderRed.IdentityNumber ? errors['IdentityNumber'] : ''
              "
            ></misa-input>
          </div>
          <div class="col-md-n">
            <label>{{
              this.$_MISAResource[this.$_LANG_CODE].FORM.IDENTITY_DATE
            }}</label>
            <misa-input
              type="date"
              v-model="employee.IdentityDate"
              :value="formattedDateIdentity"
              :tabindex="9"
              :class="{
                'border-red': isBorderRed.IdentityDate,
              }"
              :title="isBorderRed.IdentityDate ? errors['IdentityDate'] : ''"
              ref="IdentityDate"
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>{{
              this.$_MISAResource[this.$_LANG_CODE].FORM.POSITION
            }}</label>
            <misa-input
              v-model="employee.PositionName"
              :tabindex="4"
              ref="PositionName"
              :class="{
                'border-red': isBorderRed.PositionName,
              }"
              :title="isBorderRed.PositionName ? errors['PositionName'] : ''"
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>{{
              this.$_MISAResource[this.$_LANG_CODE].FORM.IDENTITY_ADDRESS
            }}</label>
            <misa-input
              v-model="employee.IdentityPlace"
              :tabindex="10"
              ref="IdentityPlace"
              :class="{
                'border-red': isBorderRed.IdentityPlace,
              }"
              :title="isBorderRed.IdentityPlace ? errors['IdentityPlace'] : ''"
            ></misa-input>
          </div>
        </div>
        <div class="full-content" id="content-null"></div>
        <div class="full-content">
          <label>{{
            this.$_MISAResource[this.$_LANG_CODE].FORM.ADDRESS
          }}</label>
          <misa-input
            v-model="employee.Address"
            :tabindex="11"
            ref="Address"
            :class="{
              'border-red': isBorderRed.Address,
            }"
            :title="isBorderRed.Address ? errors['Address'] : ''"
          ></misa-input>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label
                :title="
                  this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.PHONE_NUMBER
                "
                >{{
                  this.$_MISAResource[this.$_LANG_CODE].FORM.PHONE_NUMBER
                }}</label
              >
              <misa-input
                v-model="employee.PhoneNumber"
                :tabindex="12"
                ref="PhoneNumber"
                :class="{
                  'border-red': isBorderRed.PhoneNumber,
                }"
                :title="isBorderRed.PhoneNumber ? errors['PhoneNumber'] : ''"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label
                :title="
                  this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.PHONE_LANDLINE
                "
                >{{
                  this.$_MISAResource[this.$_LANG_CODE].FORM.PHONE_LANDLINE
                }}</label
              >
              <misa-input
                v-model="employee.PhoneLandline"
                :tabindex="13"
                ref="PhoneLandline"
                :class="{
                  'border-red': isBorderRed.PhoneLandline,
                }"
                :title="
                  isBorderRed.PhoneLandline ? errors['PhoneLandline'] : ''
                "
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.EMAIL
              }}</label>
              <misa-input
                v-model="employee.Email"
                :tabindex="14"
                :class="{
                  'border-red': isBorderRed.Email,
                }"
                :title="isBorderRed.Email ? errors['Email'] : ''"
                ref="Email"
              ></misa-input>
            </div>
          </div>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label>{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.BANK_ACCOUNT
              }}</label>
              <misa-input
                v-model="employee.BankAccount"
                :tabindex="15"
                ref="BankAccount"
                :class="{
                  'border-red': isBorderRed.BankAccount,
                }"
                :title="isBorderRed.BankAccount ? errors['BankAccount'] : ''"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.BANK_NAME
              }}</label>
              <misa-input
                v-model="employee.BankName"
                :tabindex="16"
                ref="BankName"
                :class="{
                  'border-red': isBorderRed.BankName,
                }"
                :title="isBorderRed.BankName ? errors['BankName'] : ''"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.BANK_BRANCH
              }}</label>
              <misa-input
                v-model="employee.BankBranch"
                :tabindex="17"
                ref="BankBranch"
                :class="{
                  'border-red': isBorderRed.BankBranch,
                }"
                :title="isBorderRed.BankBranch ? errors['BankBranch'] : ''"
              ></misa-input>
            </div>
          </div>
        </div>
      </div>
      <div class="employee-action">
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
    <!-- dialog employee input data not blank -->
    <misa-dialog-data-not-null
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      @closeBtnSaveAndAdd="onCloseDialogSaveAndAdd"
    ></misa-dialog-data-not-null>
    <!-- dialog employee id Exist -->
    <misa-dialog-data-exist
      v-if="isShowDialogCodeExist"
      :textEmployeeCodeExist="contentEmployeeCodeExist"
      @closeDialogCodeExist="btnCloseDialogIdExist"
    ></misa-dialog-data-exist>
    <!-- dialog employee save and close -->
    <misa-dialog-data-change
      v-if="isShowDialogDataChange"
      @cancelDialogDataChange="onCancelDialogDataChange"
      @noDialogDataChange="onNoDialogDataChange"
      @yesDialogDataChange="onYesDialogDataChange"
    ></misa-dialog-data-change>
  </div>
</template>

<script>
import employeeService from "@/services/employee.js";
import departmentService from "@/services/department.js";
import helperCommon from "@/scripts/helper";
export default {
  name: "EmployeeDetail",
  props: ["employeeSelected", "statusFormMode"],
  created() {
    this.loadData();
  },
  mounted() {
    // focus vào ô đầu tiên khi mở form chi tiết
    this.focusCode();
    window.addEventListener("click", this.handleClickOutsideMenuDepartment);
  },
  data() {
    return {
      // Khai báo mảng lưu các thuộc tính cần validate theo thứ tự, phục vụ cho việc focus
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
      // Khai báo biến quy định trạng thái hiển thị của combobox chọn đơn vị
      isShowSelectDepartment: false,
      // Khai báo đối tượng employee
      employee: {},
      // Khai báo danh sách đơn vị tìm kiếm
      listDepartmentSearch: [],
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
      // Tái sử dụng hàm xóa dấu tiếng việt
      removeVietnameseAccents: helperCommon.removeVietnameseAccents,
      // Khai báo chỉ số đang được chọn trong combobox
      indexDepartmentSelected: 0,
      // Tái sử dụng hàm kiểm tra ngày hợp lệ
      isInvalidDate: helperCommon.isInvalidDate,
      // Khai báo biến quy định sau 1 khoảng thời gian mới thực hiện tìm kiếm ở combobox
      searchDepartmentTimeout: null,
      // Khai báo biên lưu mã nhân viên tự động sinh ra
      newEmployeeCode: null,
      // Khai báo biến lưu title form mode
      titleFormMode: this.$_MISAResource[this.$_LANG_CODE].FORM.ADD_EMPLOYEE,
      // Khai báo biến chứa danh sách đối tượng lỗi
      errors: {},
    };
  },
  watch: {
    employee: {
      handler: function () {
        for (let key in this.employee) {
          if (Object.prototype.hasOwnProperty.call(this.isBorderRed, key)) {
            this.isBorderRed[key] = false;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Mô tả: Hàm focus vào ô input mã nhân viên
     * created by : BNTIEN
     * created date: 27-06-2023 01:53:48
     */
    focusCode() {
      this.$refs.EmployeeCode.focus();
    },
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
     * Mô tả: Hàm xử lí sự kiện bấm lên xuống enter để chọn đơn vị
     * created by : BNTIEN
     * created date: 06-06-2023 22:02:18
     */
    onKeyDownDepartment(event) {
      try {
        const maxLength = this.listDepartmentSearch.length;
        if (maxLength == 0) {
          return;
        } else {
          if (event.keyCode == this.$_MISAEnum.KEY_CODE.DOWN) {
            // Bấm xuống
            if (this.isShowSelectDepartment) {
              if (this.indexDepartmentSelected < maxLength - 1) {
                this.indexDepartmentSelected++;
              } else if (this.indexDepartmentSelected == maxLength - 1) {
                this.indexDepartmentSelected = 0;
              }
              // scroll focus theo item được chọn
              this.scrollIndex(
                this.indexDepartmentSelected,
                this.$_MISAEnum.KEY_CODE.DOWN
              );
            } else {
              this.isShowSelectDepartment = true;
            }
          } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.UP) {
            // Bấm lên
            if (this.isShowSelectDepartment) {
              if (this.indexDepartmentSelected > 0) {
                this.indexDepartmentSelected--;
              } else if (this.indexDepartmentSelected == 0) {
                this.indexDepartmentSelected = maxLength - 1;
              }
              // scroll focus theo item được chọn
              this.scrollIndex(
                this.indexDepartmentSelected,
                this.$_MISAEnum.KEY_CODE.UP
              );
            } else {
              this.isShowSelectDepartment = true;
            }
          } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.ENTER) {
            // Bấm enter
            if (this.isShowSelectDepartment) {
              this.employee.DepartmentName =
                this.listDepartmentSearch[
                  this.indexDepartmentSelected
                ].DepartmentName;
              this.employee.DepartmentId =
                this.listDepartmentSearch[
                  this.indexDepartmentSelected
                ].DepartmentId;
              this.isShowSelectDepartment = false;
            } else {
              this.isShowSelectDepartment = true;
            }
          }
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search department và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    async onSearchChange() {
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchDepartmentTimeout);

        let newValue = event.target.value;
        this.employee.DepartmentName = newValue;
        delete this.employee.DepartmentId;
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchDepartmentTimeout = setTimeout(async () => {
          const newListDepartment = await departmentService.getByName(newValue);
          this.listDepartmentSearch = newListDepartment.data;
          this.isShowSelectDepartment = true;
        }, 500);
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
        const element = this.$refs.DepartmentSelectedItem[index];
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
     * Mô tả: Hàm lấy danh sách department từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:10
     */
    async getListDepartment() {
      try {
        const res = await departmentService.getByName("");
        this.listDepartmentSearch = res.data;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    /**
     * Mô tả: gọi api lấy dữ liệu
     * created by : BNTIEN
     * created date: 30-05-2023 14:57:33
     */
    async loadData() {
      await this.getListDepartment();
      await this.getNewCode();
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
        try {
          // Gán title cho form mode thêm sửa
          this.titleFormMode =
            this.$_MISAResource[this.$_LANG_CODE].FORM.UPDATE_EMPLOYEE;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    },
    /**
     * Mô tả: Hàm sử lí sự kiện khi click vào icon close
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:28
     */
    async onCloseFormDetail() {
      // Kiểm tra xem giữ liệu có thay đổi hay không (Trường hợp có thay đổi)
      if (
        JSON.stringify(this.employeeSelected) !== JSON.stringify(this.employee)
      ) {
        this.isShowDialogDataChange = true;
      } else {
        this.$emit("closeFormDetail");
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện ẩn hiện options chọn đơn vị
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:42
     */
    onShowSelectDepartment() {
      this.isShowSelectDepartment = !this.isShowSelectDepartment;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn đơn vị
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedDepartment(department, index) {
      this.employee.DepartmentName = department.DepartmentName;
      this.employee.DepartmentId = department.DepartmentId;
      this.indexDepartmentSelected = index;
    },
    /**
     * Mô tả: Hàm xử lí lỗi nhập liệu người dùng
     * created by : BNTIEN
     * created date: 29-06-2023 07:07:16
     */
    handleErrorInput() {
      delete this.errors.id;
      for (const key of this.employeeProperty) {
        if (key in this.errors) {
          this.dataNotNull.push(this.errors[key]);
          this.isBorderRed[key] = true;
        }
      }
      if (this.dataNotNull.length > 0) {
        this.isShowDialogDataNotNull = true;
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    async btnSave() {
      if (this.employee.EmployeeCode === "") {
        delete this.employee.EmployeeCode;
      }
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        try {
          // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
          let employeeById = {};
          const res = await employeeService.getByCode(
            this.employee.EmployeeCode
          );
          employeeById = res.data;
          if (!employeeById) {
            // Nếu mã nhân viên chưa tồn tại trong hệ thống
            const res = await employeeService.create(this.employee);
            if (
              this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(res.status)
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
            this.isShowDialogCodeExist = true;
            this.isBorderRed.EmployeeCode = true;
            this.errors["EmployeeCode"] = `${
              this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_PRE
            } ${employeeById.EmployeeCode} ${
              this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT
                .EXIST_DETAIL_END
            }`;
            this.contentEmployeeCodeExist = employeeById.EmployeeCode;
          }
        } catch (error) {
          this.errors = error.response.data.Data;
          this.handleErrorInput();
        }
      } else {
        // Nếu form ở trạng thái sửa
        // Kiểm tra xem dữ liệu có thay đổi hay k (Trường hợp đã thay đổi)
        if (
          JSON.stringify(this.employeeSelected) !==
          JSON.stringify(this.employee)
        ) {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeById = {};
            const res = await employeeService.getByCode(
              this.employee.EmployeeCode
            );
            employeeById = res.data;
            // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại nhưng trùng với nhân viên đang sửa
            if (
              !employeeById ||
              employeeById.EmployeeCode === this.employeeSelected.EmployeeCode
            ) {
              const res = await employeeService.update(
                this.employeeSelected.EmployeeId,
                this.employee
              );
              if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
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
              this.isShowDialogCodeExist = true;
              this.isBorderRed.EmployeeCode = true;
              this.errors["EmployeeCode"] = `${
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_PRE
              } ${employeeById.EmployeeCode} ${
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT
                  .EXIST_DETAIL_END
              }`;
              this.contentEmployeeCodeExist = employeeById.EmployeeCode;
            }
          } catch (error) {
            this.errors = error.response.data.Data;
            this.handleErrorInput();
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
      if (this.employee.EmployeeCode === "") {
        delete this.employee.EmployeeCode;
      }
      // Nếu form ở trạng thái thêm mới
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        try {
          // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
          let employeeById = {};
          const res = await employeeService.getByCode(
            this.employee.EmployeeCode
          );
          employeeById = res.data;
          if (!employeeById) {
            // Nếu mã nhân viên chưa tồn tại trong hệ thống
            const res = await employeeService.create(this.employee);
            if (
              this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(res.status)
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
            this.isShowDialogCodeExist = true;
            this.isBorderRed.EmployeeCode = true;
            this.errors["EmployeeCode"] = `${
              this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_PRE
            } ${employeeById.EmployeeCode} ${
              this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT
                .EXIST_DETAIL_END
            }`;
            this.contentEmployeeCodeExist = employeeById.EmployeeCode;
          }
        } catch (error) {
          this.errors = error.response.data.Data;
          this.handleErrorInput();
        }
        // Nếu form ở trạng thái sửa
      } else {
        // Kiểm tra xem dữ liệu có thay đổi hay k
        if (
          JSON.stringify(this.employeeSelected) !==
          JSON.stringify(this.employee)
        ) {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeById = {};
            const res = await employeeService.getByCode(
              this.employee.EmployeeCode
            );
            employeeById = res.data;
            // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại trùng với nhân viên đang sửa
            if (
              !employeeById ||
              employeeById.EmployeeCode === this.employeeSelected.EmployeeCode
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
              if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessageUpdate",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                    .SUCCESS_UPDATE
                );
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.isShowDialogCodeExist = true;
              this.isBorderRed.EmployeeCode = true;
              this.errors["EmployeeCode"] = `${
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_PRE
              } ${employeeById.EmployeeCode} ${
                this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT
                  .EXIST_DETAIL_END
              }`;
              this.contentEmployeeCodeExist = employeeById.EmployeeCode;
            }
          } catch (error) {
            this.errors = error.response.data.Data;
            this.handleErrorInput();
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
          if (prop === "DepartmentId") {
            this.$nextTick(() => {
              this.$refs["DepartmentName"].focus();
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
    btnCloseDialogIdExist() {
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

    handleClickOutsideMenuDepartment(event) {
      if (!this.$refs.MenuItemDepartment.contains(event.target)) {
        this.isShowSelectDepartment = false;
      }
    },
  },

  computed: {
    /**
     * Mô tả: Hàm tính toán ngày sinh nhật
     * created by : BNTIEN
     * created date: 01-06-2023 02:41:01
     */
    formattedDate: {
      get() {
        if (this.employee.DateOfBirth) {
          const isoDate = this.employee.DateOfBirth;
          const formattedDate = isoDate.split(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SPLIT_DATE
          )[0];
          return formattedDate;
        }
        return "";
      },
      set(newDate) {
        this.employee.DateOfBirth = newDate;
      },
    },

    /**
     * Mô tả: Hàm tính toán ngày cấp chứng minh nhân dân
     * created by : BNTIEN
     * created date: 01-06-2023 02:41:35
     */
    formattedDateIdentity: {
      get() {
        if (this.employee.IdentityDate) {
          const isoDateIdentity = this.employee.IdentityDate;
          const formattedDateIdentity = isoDateIdentity.split(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SPLIT_DATE
          )[0];
          return formattedDateIdentity;
        }
        return "";
      },
      set(newDate) {
        this.employee.IdentityDate = newDate;
      },
    },
  },

  beforeUnmount() {
    window.removeEventListener("click", this.handleClickOutsideMenuDepartment);
  },
};
</script>

<style scoped>
@import url(@/css/detailinfoemployee.css);

.select-department-block {
  background-color: #fff;
  border: 1px solid var(--color-border-default);
  z-index: 100;
}

.border-red {
  border: 1px solid red;
}

.e-textfield-cbb .textfield {
  border-radius: 4px 0px 0px 4px;
}

input[type="checkbox"],
input[type="radio"] {
  accent-color: #2ca01c;
  cursor: pointer;
}

input[type="date"]:hover {
  cursor: pointer;
}

.cbb-selected {
  background-color: var(--color-border-default);
  color: var(--color-btn-default);
}
</style>
