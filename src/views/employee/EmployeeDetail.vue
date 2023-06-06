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
        <p><b>THÔNG TIN NHÂN VIÊN</b></p>
        <div class="employee-check">
          <input type="checkbox" />
          <span>Là khách hàng</span>
        </div>
        <div class="employee-check">
          <input type="checkbox" />
          <span>Là nhà cung cấp</span>
        </div>
      </div>
      <div class="employee-content">
        <div class="half-content">
          <div class="col-md-n">
            <label>Mã <span class="s-require">*</span></label>
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
            <label>Tên <span class="s-require">*</span></label>
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
            <label>Ngày sinh</label>
            <misa-input
              type="date"
              v-model="employee.DateOfBirth"
              :value="formattedDate"
              :tabindex="5"
            ></misa-input>
          </div>
          <div class="col-md-tb">
            <label>Giới tính</label>
            <div class="e-gender">
              <input
                v-model="employee.GenderName"
                :value="
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER.Male
                "
                type="radio"
                name="gender"
                :tabindex="6"
              />
              <span>Nam</span>
              <input
                v-model="employee.GenderName"
                :value="
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER
                    .Female
                "
                type="radio"
                name="gender"
                :tabindex="7"
              />
              <span>Nữ</span>
              <input
                v-model="employee.GenderName"
                :value="
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER
                    .Other
                "
                type="radio"
                name="gender"
                :tabindex="8"
              />
              <span>Khác</span>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l" style="position: relative">
            <label>Đơn vị <span class="s-require">*</span></label>
            <div
              class="e-cbb"
              id="e-cbb"
              :class="{ 'border-red': isBorderRed.Unit && !employee.UnitName }"
            >
              <div class="e-textfield-cbb">
                <misa-input
                  ref="unitEmployee"
                  placeholder="-- Chọn Đơn Vị --"
                  :value="employee.UnitName"
                  @input="onSearchChange"
                  :tabindex="3"
                  :titleContent="
                    !employee.UnitName
                      ? this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                          .UNIT_NOT_NULL
                      : ''
                  "
                  @keydown="onKeyDownUnit"
                ></misa-input>
              </div>
              <div class="e-icon-cbb" @click="onShowSelectUnit">
                <div class="function-icon"></div>
              </div>
            </div>
            <div
              class="col-md-l select-unit"
              :class="{ 'select-unit-block': isShowSelectUnit }"
            >
              <ul v-show="isShowSelectUnit" @click="onShowSelectUnit">
                <li
                  v-for="(unit, index) in listUnitSearch"
                  :key="index"
                  @click="onSelectedUnit(unit.UnitName)"
                  :class="{ 'cbb-selected': index == indexUnitSelected }"
                >
                  {{ unit.UnitName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-tb">
            <label title="Số chứng minh nhân dân">Số CMND</label>
            <misa-input
              v-model="employee.CMNDNumber"
              :tabindex="9"
            ></misa-input>
          </div>
          <div class="col-md-n">
            <label>Ngày cấp</label>
            <misa-input
              type="date"
              v-model="employee.CMNDDate"
              :value="formattedDateCMND"
              :tabindex="9"
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Chức danh</label>
            <misa-input
              v-model="employee.TitleProfessional"
              :tabindex="4"
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Nơi cấp</label>
            <misa-input
              v-model="employee.CMNDAddress"
              :tabindex="10"
            ></misa-input>
          </div>
        </div>
        <div class="full-content" id="content-null"></div>
        <div class="full-content">
          <label>Địa chỉ</label>
          <misa-input
            v-model="employee.EmployeeAddress"
            :tabindex="11"
          ></misa-input>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label title="Điện thoại di động">ĐT di động</label>
              <misa-input
                v-model="employee.PhoneNumber"
                :tabindex="12"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label title="Điện thoại cố định">ĐT cố định</label>
              <misa-input
                v-model="employee.PhoneLandline"
                :tabindex="13"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Email</label>
              <misa-input v-model="employee.Email" :tabindex="14"></misa-input>
            </div>
          </div>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label>Tài khoản ngân hàng</label>
              <misa-input
                v-model="employee.BankAccount"
                :tabindex="15"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Tên ngân hàng</label>
              <misa-input
                v-model="employee.BankName"
                :tabindex="16"
              ></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Chi nhánh</label>
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
            :textButtonExtra="'Hủy'"
            @click="btnCancel"
            :tabindex="18"
          ></misa-button-extra>
        </div>
        <div class="action-right">
          <misa-button-extra
            :textButtonExtra="'Cất'"
            @click="btnSave"
            :tabindex="19"
          ></misa-button-extra>
          <misa-button-default
            :textButtonDefault="'Cất và thêm'"
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
import unitService from "@/services/unit.js";
import helperCommon from "@/scripts/helper";
export default {
  name: "EmployeeDetail",
  props: ["employeeSelected", "statusFormMode"],
  created() {
    this.loadData();
  },
  mounted() {
    // focus vào ô đầu tiên khi mở form chi tiết
    this.$refs.codeEmployee.$el.focus();
  },
  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị của combobox chọn đơn vị
      isShowSelectUnit: false,
      // Khai báo đối tượng employee
      employee: {},
      // Khai báo danh sách các đơn vị
      listUnit: [],
      // Khai báo danh sách đơn vị tìm kiếm
      listUnitSearch: [],
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
      indexUnitSelected: 0,
    };
  },

  methods: {
    /**
     * Mô tả: Hàm xử lí sự kiện bấm lên xuống enter để chọn đơn vị
     * created by : BNTIEN
     * created date: 06-06-2023 22:02:18
     */
    onKeyDownUnit(event) {
      const maxLength = this.listUnitSearch.length;
      if (maxLength == 0) {
        return;
      } else {
        if (event.keyCode == this.$_MISAEnum.KEY_CODE.DOWN) {
          // Bấm xuống
          if (this.indexUnitSelected < maxLength - 1) {
            this.indexUnitSelected++;
          }
        } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.UP) {
          if (this.indexUnitSelected > 0) {
            this.indexUnitSelected--;
          }
        } else if (event.keyCode == this.$_MISAEnum.KEY_CODE.ENTER) {
          this.employee.UnitName =
            this.listUnitSearch[this.indexUnitSelected].UnitName;
          this.isShowSelectUnit = false;
        }
      }
    },
    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search unit
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    onSearchChange() {
      const newValue = event.target.value;
      const searchTerm = this.removeVietnameseAccents(
        newValue.toLowerCase().trim()
      );
      if (!searchTerm) {
        this.listUnitSearch = this.listUnit;
      } else {
        const filteredUnits = this.listUnit.filter((u) => {
          const uName = this.removeVietnameseAccents(u.UnitName.toLowerCase());
          return uName.includes(searchTerm);
        });
        this.listUnitSearch = filteredUnits;
        this.isShowSelectUnit = true;
      }
    },
    /**
     * Mô tả: Hàm lấy danh sách department từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:10
     */
    async getListUnit() {
      try {
        const res = await unitService.getAll();
        this.listUnit = res.data;
        this.listUnitSearch = res.data;
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
      this.getListUnit();
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
    onShowSelectUnit() {
      this.isShowSelectUnit = !this.isShowSelectUnit;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn đơn vị
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedUnit(unit) {
      this.employee.UnitName = unit;
    },
    /**
     * Mô tả: Hàm kiểm tra các ô bắt buộc phải nhập dữ liệu
     * created by : BNTIEN
     * created date: 02-06-2023 15:04:13
     */
    checkDataNotNull() {
      if (!this.employee.EmployeeCode) {
        this.isBorderRed.Code = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.CODE
        );
      }
      if (!this.employee.FullName) {
        this.isBorderRed.Name = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.NAME
        );
      }
      if (!this.employee.UnitName) {
        this.isBorderRed.Unit = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.UNIT
        );
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
        !this.employee.UnitName
      ) {
        this.isShowDialogDataNotNull = true;
        return false;
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
      this.checkDataNotNull();
      // Gọi hàm hiển thị dialog data not null
      if (this.showDialogDataNotNull()) {
        if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
          // Nếu form ở trạng thái thêm mới
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeById = {};
            const res = await employeeService.getById(
              this.employee.EmployeeCode
            );
            employeeById = res.data;
            if (!employeeById) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              let unitAdd = this.listUnit.find(
                (unit) => unit.UnitName === this.employee.UnitName
              );
              this.employee.UnitID = unitAdd.UnitID;
              const res = await employeeService.create(this.employee);
              if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
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
            const res = await employeeService.getById(
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
      this.checkDataNotNull();
      // Gọi hàm hiển thị dialog data not null
      if (this.showDialogDataNotNull()) {
        if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
          // Nếu form ở trạng thái thêm mới
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let employeeById = {};
            const res = await employeeService.getById(
              this.employee.EmployeeCode
            );
            employeeById = res.data;
            if (!employeeById) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              let unitAdd = this.listUnit.find(
                (unit) => unit.UnitName === this.employee.UnitName
              );
              this.employee.UnitID = unitAdd.UnitID;
              const res = await employeeService.create(this.employee);
              if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
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
            const res = await employeeService.getById(
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
      }
      if (!this.employee.FullName) {
        this.$refs.nameEmployee.$el.focus();
        return;
      }
      if (!this.employee.UnitName) {
        this.$refs.unitEmployee.$el.focus();
        return;
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
          this.employeeSelected.EmployeeID,
          this.employee
        );
        if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
          this.isShowDialogDataChange = false;
          this.employee = {};
          this.$_MISAEmitter.emit("setFormModeAdd");
          this.$refs.codeEmployee.$el.focus();
        } else {
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
    formattedDateCMND: {
      get() {
        if (this.employee.CMNDDate) {
          const isoDateCMND = this.employee.CMNDDate;
          const formattedDateCMND = isoDateCMND.split(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SPLIT_DATE
          )[0];
          return formattedDateCMND;
        }
        return "";
      },
      set(newDate) {
        this.employee.CMNDDate = newDate;
      },
    },
  },
};
</script>

<style scoped>
@import url(@/css/detailinfoemployee.css);

.select-unit-block {
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
