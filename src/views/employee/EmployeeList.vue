<template>
  <div class="content-title">
    <h1>Nhân viên</h1>
    <misa-button-default
      :textButtonDefault="'Thêm mới nhân viên'"
      @click="btnOpenFormDetail"
    ></misa-button-default>
  </div>
  <div class="content-main-body">
    <div class="content-action">
      <div class="search-employee">
        <input
          type="search"
          placeholder="Tìm theo mã, tên nhân viên"
          name="search-employee"
          id="search-employee"
        />
        <div class="search-icon icon-tb"></div>
      </div>
      <div
        @click="refreshData"
        class="refresh-icon icon-tb"
        id="btn-refresh"
      ></div>
    </div>
    <div id="list-employee" class="list-employee">
      <form action="">
        <table id="tbEmployeeList">
          <thead>
            <tr>
              <th type="checkbox" class="employee-border-left">
                <input class="checkbox-select-row" type="checkbox" />
              </th>
              <th class="e-id">MÃ NHÂN VIÊN</th>
              <th>TÊN NHÂN VIÊN</th>
              <th class="e-id">GIỚI TÍNH</th>
              <th type="date" class="text-center e-birthday">NGÀY SINH</th>
              <th>
                <span title="Số chứng minh nhân dân">Số CMND</span>
              </th>
              <th>CHỨC DANH</th>
              <th>TÊN ĐƠN VỊ</th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN NGÂN HÀNG</th>
              <th title="Chi nhánh tài khoản ngân hàng">
                CHI NHÁNH TK NGÂN HÀNG
              </th>
              <th
                type="feat"
                class="text-center employee-border-right e-birthday"
              >
                CHỨC NĂNG
              </th>
            </tr>
          </thead>
          <!-- Kiểm tra list employees có rỗng hay không, nếu không rỗng mới hiển thị lên table -->
          <tbody v-if="employees.length > 0">
            <tr
              v-for="(item, index) in employees"
              :key="item.EmployeeId"
              @dblclick="onUpdateFormDetail(item)"
            >
              <td class="employee-border-left">
                <input class="checkbox-select-row" type="checkbox" />
              </td>
              <td class="e-id">{{ item.EmployeeCode }}</td>
              <td>{{ item.FullName }}</td>
              <td class="e-id">{{ item.GenderName }}</td>
              <td class="text-center e-birthday">
                {{ formatDate(item.DateOfBirth) }}
              </td>
              <td>{{ item.CMNDNumber }}</td>
              <td>{{ item.TitleProfessional }}</td>
              <td>{{ item.UnitName }}</td>
              <td>{{ item.BankAccount }}</td>
              <td>{{ item.BankName }}</td>
              <td>{{ item.BankBranch }}</td>
              <td
                class="text-center employee-border-right e-birthday"
                id="function-table"
                @dblclick.stop
              >
                <span>Sửa</span>
                <div
                  class="function-table-content"
                  @click="onShowColFeature(index)"
                >
                  <div class="function-icon-table function-icon-select">
                    <ul
                      class="menu-function-select"
                      v-show="isShowColFeature[index]"
                    >
                      <li>Nhân bản</li>
                      <li
                        class="menu-function-select-delete-employee"
                        @click="
                          onDeleteEmployee(
                            item.EmployeeID,
                            item.EmployeeCode,
                            index
                          )
                        "
                      >
                        Xóa
                      </li>
                      <li>Ngừng sử dụng</li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    <div id="pagination" class="pagination">
      <p>Tổng số: <b>1035</b> bản ghi</p>
      <div class="pagination-detail">
        <div class="pagination-detail-pagesize">
          <div
            id="pagination-detail-pagesize-content"
            class="pagination-detail-pagesize-content"
          >
            {{ selectedRecord }} bản ghi trên trang
          </div>
          <div
            id="menu-paging-select"
            class="menu-paging-select"
            @click="onShowSelectPaging"
          >
            <div
              class="function-icon"
              :class="{ 'rotate-function-icon': isShowPaging }"
            ></div>
            <ul id="menu-paging" class="menu-paging" v-show="isShowPaging">
              <li
                class="menu-paging-record"
                v-for="(record, index) in recordOptions"
                :key="index"
                @click="onSelectedRecord(record)"
              >
                {{ record }} bản ghi trên trang
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ul class="page-number">
            <li>Trước</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>Sau</li>
          </ul>
        </div>
      </div>
    </div>
    <div
      v-if="isOverlay"
      id="container-overlay"
      class="container-overlay"
      @closeFormDetail="onCloseFormDetail"
    ></div>
    <!-- employee detail -->
    <EmployeeDetail
      v-if="isShowFormDetail"
      @closeFormDetail="onCloseFormDetail"
      :employeeSelected="employeeUpdate"
      :statusEdit="isStatusEdit"
    ></EmployeeDetail>
    <!-- dialog employee confirm delete -->
    <misa-dialog-confirm-delete
      :employeeCodeDelete="employeeCodeDeleteSelected"
      @confirmYesDeleteEmployee="btnConfirmYesDeleteEmployee"
      @confirmNoDeleteEmployee="btnConfirmNoDeleteEmployee"
      v-if="isShowDialogConfirmDelete"
    ></misa-dialog-confirm-delete>
    <!-- toast message -->
    <misa-toast-success
      v-if="isShowToastMessage"
      :contentToast="contentToastSuccess"
      @closeToastMessage="btnCloseToastMessage"
    ></misa-toast-success>
  </div>
</template>

<script>
import EmployeeDetail from "./EmployeeDetail.vue";
import apiEmployeemanage from "@/scripts/services.js";
import helperCommon from "@/scripts/helper.js";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
  },
  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị của form chi tiết
      isShowFormDetail: false,
      // Khai báo biến quy định trạng thái hiển thị overlay
      isOverlay: false,
      // Khai báo mảng quy định trạng thái hiển thị của các chức năng ở cột cuối của table
      isShowColFeature: [],
      // Khai báo biến quy định trạng thái hiển thị của các item select paging
      isShowPaging: false,
      // Khai báo biến kiểm tra xem form chi tiết đang ở trạng thái thêm hay sửa
      isStatusEdit: false,
      // Khai báo trạng thái hiển thị của toast message
      isShowToastMessage: false,
      // Khai báo list employee
      employees: [],
      // Khai báo 1 nhân viên được chọn để xử lí hàm sửa
      employeeUpdate: {},
      // Khai báo số bản ghi mặc định được hiển thi trên table
      selectedRecord: this.$_MISAResource.TEXT_CONTENT.RECORD_DEFAULT,
      // Khai báo list số bản ghi có thể lựa chọn để hiển thị trên trang
      recordOptions: this.$_MISAResource.TEXT_CONTENT.RECORD_OPTIONS,
      // Khai báo EmployeeId của nhân viên cần xóa
      employeeIdDeleteSelected: "",
      // Khai báo EmployeeCode của nhân viên cần xóa
      employeeCodeDeleteSelected: "",
      // Khai báo biến quy định trạng thái ẩn hiển dialog confirm delete
      isShowDialogConfirmDelete: false,
      // Khai báo biến lưu nội dung của toast message
      contentToastSuccess: "",
      // Tái sử dụng hàm formatDate trong helperCommon
      formatDate: helperCommon.formatDate,
      // Khai báo biến lưu chỉ số index được chọn để xóa trong table
      selectedIndex: null,
    };
  },
  created() {
    this.getListEmployee();
  },
  methods: {
    /**
     * Mô tả: Hàm xử lí sự kiên mở form chi tiết khi click vào button thêm mới nhân viên
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:01
     */
    btnOpenFormDetail() {
      this.isShowFormDetail = true;
      this.isOverlay = true;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào nút close trong form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:35
     */
    onCloseFormDetail() {
      this.isShowFormDetail = false;
      this.isOverlay = false;
      this.isStatusEdit = false;
      this.employeeUpdate = {};
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng mở các item ở cột cuối của table khi click vào icon drop
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:54
     */
    onShowColFeature(index) {
      this.isShowColFeature[index] = !this.isShowColFeature[index];
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng mở lựa chọn số phần tử hiển thị trên 1 trang trong table
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:05
     */
    onShowSelectPaging() {
      this.isShowPaging = !this.isShowPaging;
    },
    /**
     * Mô tả: Hàm lấy dữ liệu nhân viên từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:20
     */
    async getListEmployee() {
      try {
        const res = await apiEmployeemanage.getListAllObject(
          `/${this.$_MISAResource.TABLE_NAME.EMPLOYEE}`
        );
        this.employees = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiên load lại toàn bộ dữ liệu khi click vào icon refresh
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:31
     */
    refreshData() {
      this.getListEmployee();
    },
    /**
     * Mô tả: Hàm xử lí cập nhật thông tin nhân viên
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:56
     */
    onUpdateFormDetail(employee) {
      this.employeeUpdate = employee;
      this.isShowFormDetail = true;
      this.isOverlay = true;
      this.isStatusEdit = true;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện click vào các item lựa chọn số bản ghi hiển thị trên table
     * created by : BNTIEN
     * created date: 29-05-2023 07:50:06
     */
    onSelectedRecord(record) {
      this.selectedRecord = record;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào item xóa nhân viên thì hiển thị dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 29-05-2023 07:50:15
     */
    onDeleteEmployee(employeeID, employeeCode, index) {
      this.isShowDialogConfirmDelete = true;
      this.isOverlay = true;
      this.employeeIdDeleteSelected = employeeID;
      this.employeeCodeDeleteSelected = employeeCode;
      this.selectedIndex = index;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng xác nhận xóa
     * created by : BNTIEN
     * created date: 28-05-2023 21:09:01
     */
    async btnConfirmYesDeleteEmployee() {
      try {
        const res = await apiEmployeemanage.deleteObjectById(
          `/${this.$_MISAResource.TABLE_NAME.EMPLOYEE}`,
          `/${this.employeeIdDeleteSelected}`
        );
        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
          this.isShowDialogConfirmDelete = false;
          this.isOverlay = false;
          this.contentToastSuccess =
            this.$_MISAResource.TEXT_CONTENT.SUCCESS_DELETE;
          this.isShowToastMessage = true;
          // sau khi xóa thành công thì xóa trên table
          this.employees = this.employees.filter((item, index) => {
            return this.selectedIndex !== index;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào button không trong dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 29-05-2023 07:51:41
     */
    btnConfirmNoDeleteEmployee() {
      this.isShowDialogConfirmDelete = false;
      this.isOverlay = false;
    },

    /**
     * Mô tả: Hàm xử lí sự kiện đóng toast mesage
     * created by : BNTIEN
     * created date: 31-05-2023 00:42:10
     */
    btnCloseToastMessage() {
      this.isShowToastMessage = false;
    },
  },
};
</script>

<style scoped>
@import url(@/css/maincontent.css);
@import url(@/css/pagingemployee.css);

#function-table span:hover {
  cursor: pointer;
}

.rotate-function-icon {
  transform: rotate(180deg);
}
</style>
