<template>
  <div id="detail-info-employee" class="position-display-center">
    <div class="employee-toolbar">
      <div class="question-icon icon-tb" :tabindex="21"></div>
      <div
        @click="onCloseFormDetail"
        class="close-icon icon-tb"
        id="employee-exit"
        :tabindex="22"
        @keydown.tab.prevent="resetTab($event.target.value)"
      ></div>
    </div>
    <div class="employee-main">
      <div class="employee-title">
        <p>
          <b>{{ this.$_MISAResource[this.$_LANG_CODE].FORM.INFO_EMPLOYEE }}</b>
        </p>
        <div class="employee-check">
          <input type="checkbox" :checked="employee.CustomerOrProvider === 1" />
          <span>{{
            this.$_MISAResource[this.$_LANG_CODE].FORM.IS_CUSTOMER
          }}</span>
        </div>
        <div class="employee-check">
          <input type="checkbox" :checked="employee.CustomerOrProvider === 2" />
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
              ref="codeEmployee"
              v-model="employee.EmployeeCode"
              :class="{
                'border-red': isBorderRed.Code && !employee.EmployeeCode,
              }"
              :tabindex="1"
              :titleContent="
                !employee.EmployeeCode
                  ? this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                      .CODE_NOT_NULL
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
              ref="nameEmployee"
              v-model="employee.FullName"
              :class="{ 'border-red': isBorderRed.Name && !employee.FullName }"
              :tabindex="2"
              :titleContent="
                !employee.FullName
                  ? this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                      .NAME_NOT_NULL
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
                'border-red': isBorderRed.DOB && employee.DateOfBirth,
              }"
              ref="dobEmployee"
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
          <div class="col-md-l" style="position: relative">
            <label
              >{{ this.$_MISAResource[this.$_LANG_CODE].FORM.DEPARTMENT }}
              <span class="s-require">*</span></label
            >
            <div
              class="e-cbb"
              id="e-cbb"
              :class="{
                'border-red':
                  isBorderRed.Department && !employee.DepartmentName,
              }"
            >
              <div class="e-textfield-cbb">
                <misa-input
                  ref="departmentEmployee"
                  :placeholder="
                    this.$_MISAResource[this.$_LANG_CODE].FORM
                      .PLACEHOLDER_DEPARTMENT
                  "
                  :value="employee.DepartmentName"
                  @input="onSearchChange"
                  :tabindex="3"
                  :titleContent="
                    !employee.DepartmentName
                      ? this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                          .DEPARTMENT_NOT_NULL
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
              :class="{ 'select-department-block': isShowSelectDepartment }"
            >
              <ul
                v-show="isShowSelectDepartment"
                @click="onShowSelectDepartment"
              >
                <li
                  v-for="(department, index) in listDepartmentSearch"
                  :key="index"
                  @click="
                    onSelectedDepartment(department.DepartmentName, index)
                  "
                  :class="{ 'cbb-selected': index == indexDepartmentSelected }"
                  ref="listValueDepartment"
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
                this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                  .TITLE_IDENTITY_NUMBER
              "
              >{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.IDENTITY_NUMBER
              }}</label
            >
            <misa-input
              v-model="employee.IdentityNumber"
              :tabindex="9"
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
                'border-red': isBorderRed.IdentityDate && employee.IdentityDate,
              }"
              ref="identityDateEmployee"
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
            ></misa-input>
          </div>
        </div>
        <div class="full-content" id="content-null"></div>
        <div class="full-content">
          <label>{{
            this.$_MISAResource[this.$_LANG_CODE].FORM.ADDRESS
          }}</label>
          <misa-input v-model="employee.Address" :tabindex="11"></misa-input>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label
                :title="
                  this.$_MISAResource[this.$_LANG_CODE].FORM.TITLE_PHONE_NUMBER
                "
                >{{
                  this.$_MISAResource[this.$_LANG_CODE].FORM.PHONE_NUMBER
                }}</label
              >
              <misa-input
                v-model="employee.PhoneNumber"
                :tabindex="12"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label
                :title="
                  this.$_MISAResource[this.$_LANG_CODE].FORM
                    .TITLE_PHONE_LANDLINE
                "
                >{{
                  this.$_MISAResource[this.$_LANG_CODE].FORM.PHONE_LANDLINE
                }}</label
              >
              <misa-input
                v-model="employee.PhoneLandline"
                :tabindex="13"
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
                  'border-red': isBorderRed.Email && employee.Email,
                }"
                ref="emailEmployee"
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
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.BANK_NAME
              }}</label>
              <misa-input
                v-model="employee.BankName"
                :tabindex="16"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>{{
                this.$_MISAResource[this.$_LANG_CODE].FORM.BANK_BRANCH
              }}</label>
              <misa-input
                v-model="employee.BankBranch"
                :tabindex="17"
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
            :tabindex="18"
          ></misa-button-extra>
        </div>
        <div class="action-right">
          <misa-button-extra
            :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].BUTTON.SAVE"
            @click="btnSave"
            :tabindex="19"
          ></misa-button-extra>
          <misa-button-default
            :textButtonDefault="
              this.$_MISAResource[this.$_LANG_CODE].BUTTON.SAVE_AND_CLOSE
            "
            @click="btnSaveAndAdd"
            :tabindex="20"
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
  props: ["employeeSelected", "statusFormMode", "newCode"],
  created() {
    this.loadData();
  },
  mounted() {
    // focus vào ô đầu tiên khi mở form chi tiết
    this.$refs.codeEmployee.$el.focus();
    // Nếu form ở trạng thái thêm mới thì sinh mã nhân viên tự động
    if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
      this.employee.EmployeeCode = this.newCode;
    }
  },
  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị của combobox chọn đơn vị
      isShowSelectDepartment: false,
      // Khai báo đối tượng employee
      employee: {},
      // Khai báo danh sách các đơn vị
      listDepartment: [],
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
    };
  },
  watch: {
    // Lắng nghe sự thay đổi dữ liệu trong ô input email
    "employee.Email": function () {
      this.isBorderRed.Email = false;
    },
    // Lắng nghe sự thay đổi dữ liệu trong ô input ngày sinh
    "employee.DateOfBirth": function () {
      this.isBorderRed.DOB = false;
    },
    // Lắng nghe sự thay đổi dữ liệu trong ô input ngày cấp
    "employee.IdentityDate": function () {
      this.isBorderRed.IdentityDate = false;
    },
  },
  methods: {
    /**
     * Mô tả: Hàm xử lí sự kiện bấm lên xuống enter để chọn đơn vị
     * created by : BNTIEN
     * created date: 06-06-2023 22:02:18
     */
    onKeyDownDepartment(event) {
      const maxLength = this.listDepartmentSearch.length;
      if (maxLength == 0) {
        return;
      } else {
        if (event.keyCode == this.$_MISAEnum.KEY_CODE.DOWN) {
          // Bấm xuống
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
        } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.UP) {
          // Bấm lên
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
        } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.ENTER) {
          // Bấm enter
          if (this.isShowSelectDepartment) {
            this.employee.DepartmentName =
              this.listDepartmentSearch[
                this.indexDepartmentSelected
              ].DepartmentName;
            this.isShowSelectDepartment = false;
          } else {
            this.isShowSelectDepartment = true;
          }
        }
      }
    },
    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search department và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    onSearchChange() {
      const newValue = event.target.value;
      this.employee.DepartmentName = newValue;
      const searchTerm = this.removeVietnameseAccents(
        newValue.toLowerCase().trim()
      );
      if (!searchTerm) {
        this.listDepartmentSearch = this.listDepartment;
      } else {
        const filteredDepartments = this.listDepartment.filter((u) => {
          const uName = this.removeVietnameseAccents(
            u.DepartmentName.toLowerCase()
          );
          return uName.includes(searchTerm);
        });
        this.listDepartmentSearch = filteredDepartments;
        this.isShowSelectDepartment = true;
      }
    },
    /**
     * Mô tả: Hàm xử scroll theo khi bấm lên xuống
     * created by : BNTIEN
     * created date: 07-06-2023 08:37:33
     */
    scrollIndex(index, checkKeyCode) {
      const element = this.$refs.listValueDepartment[index];
      if (checkKeyCode === this.$_MISAEnum.KEY_CODE.DOWN) {
        element.scrollIntoView({
          block: this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SCROLL.END,
        });
      } else if (checkKeyCode === this.$_MISAEnum.KEY_CODE.UP) {
        element.scrollIntoView({
          block:
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SCROLL.START,
        });
      }
    },
    /**
     * Mô tả: Hàm lấy danh sách department từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:10
     */
    async getListDepartment() {
      try {
        const res = await departmentService.getAll();
        this.listDepartment = res.data;
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
    loadData() {
      this.getListDepartment();
      // Nếu form ở trạng thái thêm mới
      if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
        this.employee = {};
      } else {
        try {
          // Chuyển đối tượng sang chuỗi json
          let res = JSON.stringify(this.employeeSelected);
          // Chuyển đổi chuỗi json thành đối tượng employee
          this.employee = JSON.parse(res);
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
    onCloseFormDetail() {
      // Gọi sự kiện đóng form chi tiết từ component cha (EmployeeList)
      this.$emit("closeFormDetail");
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
      this.employee.DepartmentName = department;
      this.indexDepartmentSelected = index;
    },
    /**
     * Mô tả: Hàm kiểm tra các ô bắt buộc phải nhập dữ liệu
     * created by : BNTIEN
     * created date: 02-06-2023 15:04:13
     */
    validateData() {
      // Nếu chưa nhập mã nhân viên
      if (!this.employee.EmployeeCode) {
        this.isBorderRed.Code = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.CODE_NOT_NULL
        );
      } else {
        // Nếu mã nhân viên k kết thúc bằng số
        if (
          !this.$_MISAResource.REGEX.END_MUST_NUMBER.test(
            this.employee.EmployeeCode
          )
        ) {
          this.isBorderRed.Code = true;
          this.dataNotNull.push(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
              .CODE_END_MUST_NUMBER
          );
        }
      }
      // Nếu chưa nhập tên nhân viên
      if (!this.employee.FullName) {
        this.isBorderRed.Name = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.NAME_NOT_NULL
        );
      }
      // Nếu chưa chọn đơn vị
      if (!this.employee.DepartmentName) {
        this.isBorderRed.Department = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DEPARTMENT_NOT_NULL
        );
      }
      // Nếu ngày sinh k hợp lệ
      if (this.employee.DateOfBirth) {
        if (!this.isInvalidDate(this.employee.DateOfBirth)) {
          this.isBorderRed.DOB = true;
          this.dataNotNull.push(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DOB_ISVALID
          );
        }
      }
      // Nếu ngày cấp CMND k hợp lệ
      if (this.employee.IdentityDate) {
        if (!this.isInvalidDate(this.employee.IdentityDate)) {
          this.isBorderRed.IdentityDate = true;
          this.dataNotNull.push(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.CMNDDATE_ISVALID
          );
        }
      }
      // Nếu email có dữ liệu nhưng không đúng định dạng
      if (this.employee.Email) {
        if (!this.$_MISAResource.REGEX.EMAIL.test(this.employee.Email)) {
          this.isBorderRed.Email = true;
          this.dataNotNull.push(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.EMAIL_ISVALID
          );
        }
      }
    },
    /**
     * Mô tả: Hàm show dialog data not null
     * created by : BNTIEN
     * created date: 03-06-2023 14:27:28
     */
    showDialogDataNotNull() {
      if (
        !this.employee.EmployeeCode ||
        !this.employee.FullName ||
        !this.employee.DepartmentName
      ) {
        this.isShowDialogDataNotNull = true;
        return false;
      }
      if (
        !this.$_MISAResource.REGEX.END_MUST_NUMBER.test(
          this.employee.EmployeeCode
        )
      ) {
        this.isShowDialogDataNotNull = true;
        return false;
      }
      if (this.employee.DateOfBirth) {
        if (!this.isInvalidDate(this.employee.DateOfBirth)) {
          this.isShowDialogDataNotNull = true;
          return false;
        }
      }
      if (this.employee.IdentityDate) {
        if (!this.isInvalidDate(this.employee.IdentityDate)) {
          this.isShowDialogDataNotNull = true;
          return false;
        }
      }
      if (this.employee.Email) {
        if (!this.$_MISAResource.REGEX.EMAIL.test(this.employee.Email)) {
          this.isShowDialogDataNotNull = true;
          return false;
        }
      }
      return true;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    async btnSave() {
      // Gọi hàm kiểm tra dữ liệu bắt buộc phải nhập
      this.validateData();
      // Nếu dữ liệu nhập vào hợp lệ
      if (this.showDialogDataNotNull()) {
        if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
          // Nếu form ở trạng thái thêm mới
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeById = {};
            const res = await employeeService.getByCode(
              this.employee.EmployeeCode
            );
            employeeById = res.data;
            if (!employeeById) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              let departmentAdd = this.listDepartment.find(
                (department) =>
                  department.DepartmentName === this.employee.DepartmentName
              );
              this.employee.DepartmentId = departmentAdd.DepartmentId;
              const res = await employeeService.create(this.employee);
              if (
                this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(res.status)
              ) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                    .SUCCESS_CTEATE
                );
              }
              this.$emit("closeFormDetail");
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.isShowDialogCodeExist = true;
              this.contentEmployeeCodeExist = employeeById.EmployeeCode;
            }
          } catch (error) {
            console.log(error);
            return;
          }
        } else {
          // Nếu form ở trạng thái sửa
          // Kiểm tra xem dữ liệu có thay đổi hay k
          if (
            JSON.stringify(this.employeeSelected) !==
            JSON.stringify(this.employee)
          ) {
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
              this.isShowDialogDataChange = true;
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.isShowDialogCodeExist = true;
              this.contentEmployeeCodeExist = employeeById.EmployeeCode;
            }
          } else {
            this.$emit("closeFormDetail");
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
      // Gọi hàm kiểm tra dữ liệu bắt buộc phải nhập
      this.validateData();
      // Nếu dữ liệu hợp lệ
      if (this.showDialogDataNotNull()) {
        if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
          // Nếu form ở trạng thái thêm mới
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeById = {};
            const res = await employeeService.getByCode(
              this.employee.EmployeeCode
            );
            employeeById = res.data;
            if (!employeeById) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              let departmentAdd = this.listDepartment.find(
                (department) =>
                  department.DepartmentName === this.employee.DepartmentName
              );
              this.employee.DepartmentId = departmentAdd.DepartmentId;
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
                this.$refs.codeEmployee.$el.focus();
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.isShowDialogCodeExist = true;
              this.contentEmployeeCodeExist = employeeById.EmployeeCode;
            }
          } catch (error) {
            console.log(error);
            return;
          }
        } else {
          // Nếu form ở trạng thái sửa
          // Kiểm tra xem dữ liệu có thay đổi hay k
          if (
            JSON.stringify(this.employeeSelected) !==
            JSON.stringify(this.employee)
          ) {
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
              this.isShowDialogDataChange = true;
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.isShowDialogCodeExist = true;
              this.contentEmployeeCodeExist = employeeById.EmployeeCode;
            }
          } else {
            this.employee = {};
            this.$_MISAEmitter.emit("setFormModeAdd");
            this.$refs.codeEmployee.$el.focus();
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
      if (!this.employee.EmployeeCode) {
        this.$refs.codeEmployee.$el.focus();
        return;
      } else {
        if (
          !this.$_MISAResource.REGEX.END_MUST_NUMBER.test(
            this.employee.EmployeeCode
          )
        ) {
          this.$refs.codeEmployee.$el.focus();
          return;
        }
      }
      if (!this.employee.FullName) {
        this.$refs.nameEmployee.$el.focus();
        return;
      }
      if (!this.employee.DepartmentName) {
        this.$refs.departmentEmployee.$el.focus();
        return;
      }
      if (this.employee.DateOfBirth) {
        if (!this.isInvalidDate(this.employee.DateOfBirth)) {
          this.$refs.dobEmployee.$el.focus();
          return;
        }
      }
      if (this.employee.DateOfBirth) {
        if (!this.isInvalidDate(this.employee.DateOfBirth)) {
          this.$refs.identityDateEmployee.$el.focus();
          return;
        }
      }
      if (this.employee.Email) {
        if (!this.$_MISAResource.REGEX.EMAIL.test(this.employee.Email)) {
          this.$refs.emailEmployee.$el.focus();
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
      this.onCloseFormDetail();
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng dialog cảnh báo mã nhân viên đã tồn tại
     * created by : BNTIEN
     * created date: 29-05-2023 08:28:19
     */
    btnCloseDialogIdExist() {
      this.isShowDialogCodeExist = false;
      this.$refs.codeEmployee.$el.focus();
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
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        this.isShowDialogDataChange = false;
        this.employee = {};
        this.$_MISAEmitter.emit("setFormModeAdd");
        this.$refs.codeEmployee.$el.focus();
      } else {
        this.$emit("closeFormDetail");
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button có trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:43:38
     */
    async onYesDialogDataChange() {
      try {
        const res = await employeeService.update(
          this.employeeSelected.EmployeeId,
          this.employee
        );
        if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
          this.isShowDialogDataChange = false;
          this.employee = {};
          this.$_MISAEmitter.emit("setFormModeAdd");
          this.$refs.codeEmployee.$el.focus();
        } else {
          // cvđ
          this.$emit("closeFormDetail");
        }
        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
          this.$_MISAEmitter.emit(
            "onShowToastMessageUpdate",
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_UPDATE
          );
        }
      } catch (error) {
        console.log(error);
        return;
      }
    },

    /**
     * Mô tả: Hàm reset tabindex về ô input mã nhân viên khi tab nhảy đến icon close
     * created by : BNTIEN
     * created date: 01-06-2023 14:24:19
     */
    resetTab() {
      this.$refs.codeEmployee.$el.focus();
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

input[type="radio"] {
  accent-color: #2ca01c;
}

input[type="checkbox"] {
  accent-color: #2ca01c;
}

.cbb-selected {
  background-color: var(--color-border-default);
  color: var(--color-btn-default);
}
</style>
