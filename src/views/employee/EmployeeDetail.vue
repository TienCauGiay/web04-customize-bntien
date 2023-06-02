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
                  v-model="employee.UnitName"
                  :tabindex="3"
                  :titleContent="
                    !employee.UnitName
                      ? this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                          .UNIT_NOT_NULL
                      : ''
                  "
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
                  v-for="(unit, index) in listUnit"
                  :key="index"
                  @click="onSelectedUnit(unit.UnitName)"
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
            @click="btnClose"
            :tabindex="19"
          ></misa-button-extra>
          <misa-button-default
            :textButtonDefault="'Cất và thêm'"
            @click="btnSaveAndClose"
            :tabindex="20"
          ></misa-button-default>
        </div>
      </div>
    </div>
    <!-- dialog employee input data not blank -->
    <misa-dialog-data-not-null
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      @closeBtnSaveAndClose="onCloseBtnSaveAndClose"
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
import apiEmployeemanage from "@/scripts/services.js";
export default {
  name: "EmployeeDetail",
  props: ["employeeSelected", "statusEdit"],
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
      // Khai báo trạng thái hiển thị của dialog cảnh báo dữ liệu k được để trống
      isShowDialogDataNotNull: false,
      // Khai báo biến xác định nội dung trường nào k được để trống
      dataNotNull: "",
      // Khai báo trạng thái hiển thị của dialog cảnh báo mã nhân viên đã tồn tại
      isShowDialogCodeExist: false,
      // Khai báo biến xác định thông tin của mã nhân viên đã tồn tại
      contentEmployeeCodeExist: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: {},
    };
  },

  methods: {
    /**
     * Mô tả: Hàm lấy danh sách department từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:10
     */
    async getListUnit() {
      try {
        const res = await apiEmployeemanage.getListAllObject(
          `/${this.$_MISAResource[this.$_LANG_CODE].TABLE_NAME.UNIT}`
        );
        this.listUnit = res.data;
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
      if (this.statusEdit !== this.$_MISAEnum.FORM_MODE.Edit) {
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
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    btnClose() {
      if (
        JSON.stringify(this.employeeSelected) !== JSON.stringify(this.employee)
      ) {
        this.isShowDialogDataChange = true;
      } else {
        this.onCloseFormDetail();
      }
    },
    /**
     * Mô tả: Hàm ckeck border red của các ô bắt buộc phải nhập dữ liệu
     * created by : BNTIEN
     * created date: 02-06-2023 15:04:13
     */
    checkBorder() {
      if (!this.employee.EmployeeCode) {
        this.isBorderRed.Code = true;
      }
      if (!this.employee.FullName) {
        this.isBorderRed.Name = true;
      }
      if (!this.employee.UnitName) {
        this.isBorderRed.Unit = true;
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nut cất và thêm trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:23
     */
    async btnSaveAndClose() {
      try {
        this.checkBorder();
        // Kiểm tra xem các trường bắt buộc đã được nhập dữ liệu chưa, nếu chưa thì thông báo cho người dùng
        if (!this.employee.EmployeeCode) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull =
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.CODE;
          return;
        }
        if (!this.employee.FullName) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull =
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.NAME;
          return;
        }
        if (!this.employee.UnitName) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull =
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.UNIT;
          return;
        }
        // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
        let employeeById = {};
        const res = await apiEmployeemanage.getObjectById(
          `/${this.$_MISAResource[this.$_LANG_CODE].TABLE_NAME.EMPLOYEE}`,
          `/${this.employee.EmployeeCode}`
        );
        employeeById = res.data;
        if (!employeeById) {
          // Nếu mã nhân viên chưa tồn tại trong hệ thống
          let unitAdd = this.listUnit.find(
            (unit) => unit.UnitName === this.employee.UnitName
          );
          this.employee.UnitID = unitAdd.UnitID;
          const res = await apiEmployeemanage.postObject(
            `/${this.$_MISAResource[this.$_LANG_CODE].TABLE_NAME.EMPLOYEE}`,
            this.employee
          );
          if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
            this.$_MISAEmitter.emit(
              "onShowToastMessage",
              this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_CTEATE
            );
            this.employee = {};
            this.isBorderRed = {};
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
    },
    /**
     * Mô tả: Hàm đóng dialog cảnh báo dữ liệu k được để trống và focus vào các ô trống
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:59
     */
    onCloseBtnSaveAndClose() {
      this.isShowDialogDataNotNull = false;
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
      this.onCloseFormDetail();
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button có trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:43:38
     */
    async onYesDialogDataChange() {
      try {
        const res = await apiEmployeemanage.putObject(
          `/${this.$_MISAResource[this.$_LANG_CODE].TABLE_NAME.EMPLOYEE}`,
          this.employee
        );
        console.log(res);
        this.onCloseFormDetail();
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

input[type="radio"]:checked {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  border-radius: 50%;
  background-color: var(--color-btn-default);
}
</style>
