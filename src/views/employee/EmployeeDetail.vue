<template>
  <div id="detail-info-employee" class="position-display-center">
    <div class="employee-toolbar">
      <div class="question-icon icon-tb"></div>
      <div
        @click="onCloseFormDetail"
        class="close-icon icon-tb"
        id="employee-exit"
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
            ></misa-input>
          </div>
          <div class="col-md-tb">
            <label>Tên <span class="s-require">*</span></label>
            <misa-input
              ref="nameEmployee"
              v-model="employee.FullName"
              :class="{ 'border-red': isBorderRed.Name && !employee.FullName }"
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
            ></misa-input>
          </div>
          <div class="col-md-tb">
            <label>Giới tính</label>
            <div class="e-gender">
              <input
                type="radio"
                name="gender"
                :checked="
                  employee.GenderName === this.$_MISAEnum.GENDER.Male.TextGender
                "
                @change="selectGender(this.$_MISAEnum.GENDER.Male.TextGender)"
              />
              <span>Nam</span>
              <input
                type="radio"
                name="gender"
                :checked="
                  employee.GenderName ===
                  this.$_MISAEnum.GENDER.Female.TextGender
                "
                @change="selectGender(this.$_MISAEnum.GENDER.Female.TextGender)"
              />
              <span>Nữ</span>
              <input
                type="radio"
                name="gender"
                :checked="
                  employee.GenderName !==
                    this.$_MISAEnum.GENDER.Female.TextGender &&
                  employee.GenderName !== this.$_MISAEnum.GENDER.Male.TextGender
                "
                @change="selectGender(this.$_MISAEnum.GENDER.Other.TextGender)"
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
                ></misa-input>
              </div>
              <i class="function-icon" @click="onShowSelectUnit"></i>
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
            <misa-input v-model="employee.CMNDNumber"></misa-input>
          </div>
          <div class="col-md-n">
            <label>Ngày cấp</label>
            <misa-input
              type="date"
              v-model="employee.CMNDDate"
              :value="formattedDateCMND"
            ></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Chức danh</label>
            <misa-input v-model="employee.TitleProfessional"></misa-input>
          </div>
        </div>
        <div class="half-content">
          <div class="col-md-l">
            <label>Nơi cấp</label>
            <misa-input v-model="employee.CMNDAddress"></misa-input>
          </div>
        </div>
        <div class="full-content" id="content-null"></div>
        <div class="full-content">
          <label>Địa chỉ</label>
          <misa-input v-model="employee.EmployeeAddress"></misa-input>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label title="Điện thoại di động">ĐT di động</label>
              <misa-input v-model="employee.PhoneNumber"></misa-input>
            </div>
            <div class="col-md-quater">
              <label title="Điện thoại cố định">ĐT cố định</label>
              <misa-input v-model="employee.PhoneLandline"></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Email</label>
              <misa-input v-model="employee.Email"></misa-input>
            </div>
          </div>
        </div>
        <div class="full-content">
          <div class="full-content-quarter">
            <div class="col-md-quater">
              <label>Tài khoản ngân hàng</label>
              <misa-input v-model="employee.BankAccount"></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Tên ngân hàng</label>
              <misa-input v-model="employee.BankName"></misa-input>
            </div>
            <div class="col-md-quater">
              <label>Chi nhánh</label>
              <misa-input v-model="employee.BankBranch"></misa-input>
            </div>
          </div>
        </div>
      </div>
      <div class="employee-action">
        <div class="action-left">
          <misa-button-extra
            :textButtonExtra="'Hủy'"
            @click="btnCancel"
          ></misa-button-extra>
        </div>
        <div class="action-right">
          <misa-button-extra
            :textButtonExtra="'Cất'"
            @click="btnClose"
          ></misa-button-extra>
          <misa-button-default
            :textButtonDefault="'Cất và thêm'"
            @click="btnSaveAndClose"
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
    <!-- toast mesage -->
    <misa-toast-success
      v-if="isShowToastMessage"
      :contentToast="contentToastSuccess"
      @closeToastMessage="btnCloseToastMessage"
    ></misa-toast-success>
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
      // Khai báo biến xác định trạng thái hiển thị của toast message
      isShowToastMessage: false,
      // Khai báo nội dung toast message
      contentToastSuccess: "",
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
          `/${this.$_MISAResource.TABLE_NAME.UNIT}`
        );
        this.listUnit = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả: gọi api lấy dữ liệu
     * created by : BNTIEN
     * created date: 30-05-2023 14:57:33
     */
    loadData() {
      this.getListUnit();
      if (!this.statusEdit) {
        this.employee = {};
      } else {
        try {
          // Chuyển đối tượng sang chuỗi json
          let res = JSON.stringify(this.employeeSelected);
          // Chuyển đổi chuỗi json thành đối tượng employee
          this.employee = JSON.parse(res);
        } catch (error) {
          console.log(error);
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
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nut cất và thêm trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:23
     */
    async btnSaveAndClose() {
      try {
        // Kiểm tra xem các trường bắt buộc đã được nhập dữ liệu chưa, nếu chưa thì thông báo cho người dùng
        if (!this.employee.EmployeeCode) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull = this.$_MISAResource.TEXT_CONTENT.CODE;
          this.isBorderRed.Code = true;
          return;
        }
        if (!this.employee.FullName) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull = this.$_MISAResource.TEXT_CONTENT.NAME;
          this.isBorderRed.Name = true;
          return;
        }
        if (!this.employee.UnitName) {
          this.isShowDialogDataNotNull = true;
          this.dataNotNull = this.$_MISAResource.TEXT_CONTENT.UNIT;
          this.isBorderRed.Unit = true;
          return;
        }
        // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
        let employeeById = {};
        const res = await apiEmployeemanage.getObjectById(
          `/${this.$_MISAResource.TABLE_NAME.EMPLOYEE}`,
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
            `/${this.$_MISAResource.TABLE_NAME.EMPLOYEE}`,
            this.employee
          );
          if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
            this.contentToastSuccess =
              this.$_MISAResource.TEXT_CONTENT.SUCCESS_CTEATE;
            this.isShowToastMessage = true;
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
    },
    /**
     * Mô tả: Xử lí xem radio giới tính nào được chọn
     * created by : BNTIEN
     * created date: 30-05-2023 22:32:23
     */
    selectGender(gender) {
      this.employee.GenderName = gender;
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
          `/${this.$_MISAResource.TABLE_NAME.EMPLOYEE}`,
          this.employee
        );
        this.onCloseFormDetail();
        if (this.$_MISAEnum.isResponseStatusOk(res.status)) {
          // Chưa xử lí khi sửa thành công
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện đóng toast message
     * created by : BNTIEN
     * created date: 31-05-2023 01:15:51
     */
    btnCloseToastMessage() {
      this.isShowToastMessage = false;
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
            this.$_MISAResource.TEXT_CONTENT.SPLIT_DATE
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
            this.$_MISAResource.TEXT_CONTENT.SPLIT_DATE
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

i:hover {
  cursor: pointer;
}

.select-unit-block {
  background-color: #fff;
  border: 1px solid var(--color-border-default);
  z-index: 100;
}

.e-textfield-cbb input {
  background-color: white;
}

.e-textfield-cbb input:hover {
  background-color: white;
}

.e-textfield-cbb input:focus {
  border: none;
}

.border-red {
  border: 1px solid red;
}

.toast-success {
  top: -50px;
}
</style>
