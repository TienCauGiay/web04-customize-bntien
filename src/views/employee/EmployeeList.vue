<template>
  <div class="content-title">
    <h1>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.EMPLOYEE }}</h1>
    <misa-button-default
      :textButtonDefault="
        this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ADD_EMPLOYEE
      "
      @click="btnOpenFormDetail"
    ></misa-button-default>
  </div>
  <div class="content-main-body">
    <div class="content-action">
      <div class="search-employee">
        <input
          type="search"
          :placeholder="
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
              .PLACEHOLDER_SEARCH
          "
          name="search-employee"
          id="search-employee"
          v-model="textSearch"
          @keydown.enter="onSearchEmployee"
        />
        <div class="search-icon icon-tb" @click="onSearchEmployee"></div>
      </div>
      <div
        @click="refreshData"
        class="refresh-icon icon-tb"
        id="btn-refresh"
      ></div>
    </div>
    <div id="list-employee" class="list-employee">
      <form action="">
        <table id="tbEmployeeList" ref="tableEmployeeList">
          <thead>
            <tr>
              <th type="checkbox" class="employee-border-left">
                <input class="checkbox-select-row" type="checkbox" />
              </th>
              <th class="e-id">
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME.CODE
                }}
              </th>
              <th>
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .FULLNAME
                }}
              </th>
              <th class="e-gender-table">
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME.GENDER
                }}
              </th>
              <th type="date" class="text-center e-birthday">
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME.DOB
                }}
              </th>
              <th>
                <span
                  :title="
                    this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                      .TITLE_IDENTITY_NUMBER
                  "
                  >{{
                    this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                      .IDENTITY_NUMBER
                  }}</span
                >
              </th>
              <th>
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .POSITION
                }}
              </th>
              <th>
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .DEPARTMENT
                }}
              </th>
              <th>
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .BANK_ACCOUNT
                }}
              </th>
              <th>
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .BANK_NAME
                }}
              </th>
              <th
                :title="
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .TITLE_BANK_BRANCH
                "
              >
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .BANK_BRANCH
                }}
              </th>
              <th
                type="feat"
                class="text-center employee-border-right e-birthday"
              >
                {{
                  this.$_MISAResource[this.$_LANG_CODE].EMPLOYEE_COL_NAME
                    .FEATURE
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-show="!isShowLoadding"
              v-for="(item, index) in dataTable.Data"
              :key="item.EmployeeId"
              @dblclick="onUpdateFormDetail(item)"
            >
              <td class="employee-border-left" @dblclick.stop>
                <input class="checkbox-select-row" type="checkbox" />
              </td>
              <td class="e-id">{{ item.EmployeeCode }}</td>
              <td>{{ item.FullName }}</td>
              <td class="e-gender-table">
                {{
                  item.Gender === 0
                    ? this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER
                        .Male
                    : item.Gender === 1
                    ? this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER
                        .Female
                    : this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.GENDER
                        .Other
                }}
              </td>
              <td class="text-center e-birthday">
                {{ formatDate(item.DateOfBirth) }}
              </td>
              <td>{{ item.IdentityNumber }}</td>
              <td>{{ item.PositionName }}</td>
              <td>{{ item.DepartmentName }}</td>
              <td>{{ item.BankAccount }}</td>
              <td>{{ item.BankName }}</td>
              <td>{{ item.BankBranch }}</td>
              <td
                class="text-center employee-border-right e-birthday function-table"
                @dblclick.stop
              >
                <span>{{
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.UPDATE
                }}</span>
                <div
                  class="function-table-content"
                  @click="onShowColFeature(index)"
                  ref="functionTableContent"
                >
                  <div class="function-icon-table function-icon-select">
                    <ul
                      class="menu-function-select"
                      v-show="isShowColFeature[index]"
                      ref="featureMenu"
                    >
                      <li @click="onDupliCateEmployee(item)">
                        {{
                          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                            .DUPLICATE
                        }}
                      </li>
                      <li
                        class="menu-function-select-delete-employee"
                        @click="
                          onDeleteEmployee(
                            item.EmployeeId,
                            item.EmployeeCode,
                            index
                          )
                        "
                      >
                        {{
                          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                            .DELETE
                        }}
                      </li>
                      <li>
                        {{
                          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                            .STOP_USING
                        }}
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
            <img
              v-show="isShowLoadding"
              class="loading"
              src="../../assets/img/loading.svg"
              alt="loading"
            />
          </tbody>
        </table>
      </form>
    </div>
    <div id="pagination" class="pagination">
      <p>
        {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.TOTAL }}:
        <b>{{ this.dataTable.TotalRecord }}</b>
        {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.RECORD }}
      </p>
      <div class="pagination-detail">
        <div
          class="pagination-detail-pagesize"
          :class="{ 'active-record': isShowPaging }"
          ref="pagingMenu"
        >
          <div
            id="pagination-detail-pagesize-content"
            class="pagination-detail-pagesize-content"
          >
            {{ selectedRecord }}
            {{
              this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.RECORD_ON_PAGE
            }}
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
                {{ record }}
                {{
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                    .RECORD_ON_PAGE
                }}
              </li>
            </ul>
          </div>
        </div>
        <div class="pagination-page-number">
          <ul class="page-number">
            <li
              @click="
                goToPage(
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE
                    .PREVIOUS
                )
              "
            >
              {{
                this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGING_PRE
              }}
            </li>
            <li
              v-for="pageNumber in this.visiblePageNumbers"
              :key="pageNumber"
              @click="goToPage(pageNumber)"
              :class="{ 'active-page': pageNumber === this.currentPage }"
            >
              {{ pageNumber }}
            </li>
            <li
              @click="
                goToPage(
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.NEXT
                )
              "
            >
              {{
                this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGING_NEXT
              }}
            </li>
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
      :statusFormMode="isStatusFormMode"
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
import helperCommon from "@/scripts/helper.js";
import employeeService from "@/services/employee.js";
export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
  },
  mounted() {
    // Lắng nghe sự kiện click trên toàn bộ màn hình
    window.addEventListener("click", this.handleClickOutsidePaging);
    // window.addEventListener("click", this.handleClickOutsideFeature);
  },
  computed: {
    /**
     * Mô tả: Tính tổng số trang trong phân trang
     * created by : BNTIEN
     * created date: 04-06-2023 02:49:32
     */
    totalPages() {
      return Math.ceil(this.dataTable.TotalRecord / this.selectedRecord);
    },
    /**
     * Mô tả: Tính tổng số trang sẽ hiển thị
     * created by : BNTIEN
     * created date: 04-06-2023 02:49:32
     */
    visiblePageNumbers() {
      let startPage = Math.max(
        this.currentPage - Math.floor(this.maxVisiblePages / 2),
        1
      );
      let endPage = startPage + this.maxVisiblePages - 1;

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(endPage - this.maxVisiblePages + 1, 1);
      }

      const visiblePages = [];
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      return visiblePages;
    },
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
      isStatusFormMode: this.$_MISAEnum.FORM_MODE.Add,
      // Khai báo trạng thái hiển thị của toast message
      isShowToastMessage: false,
      // Khai báo dữ liệu duyệt trên 1 trang table
      dataTable: [],
      // Khai báo 1 nhân viên được chọn để xử lí hàm sửa
      employeeUpdate: {},
      // khai báo 1 nhân viên được chọn để nhân bản
      employeeDuplidate: {},
      // Khai báo số bản ghi mặc định được hiển thi trên table
      selectedRecord: this.$_MISAEnum.RECORD.RECORD_DEFAULT,
      // Khai báo list số bản ghi có thể lựa chọn để hiển thị trên trang
      recordOptions: this.$_MISAEnum.RECORD.RECORD_OPTIONS,
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
      // Khai báo biến lưu nội dung tìm kiếm
      textSearch: "",
      // Khai báo trang hiện tại trong phân trang
      currentPage: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo số trang tối đa hiển thị trong phân trang
      maxVisiblePages: this.$_MISAEnum.RECORD.MAX_VISIBLE_PAGE,
      // Khai báo biến lưu chỉ số được chọn của menu item table
      selectedIndexFeature: null,
      // Khai báo biến quy định trạng thái hiển thị loadding
      isShowLoadding: false,
    };
  },
  created() {
    // Gọi hàm lấy dữ liệu danh sách nhân viên
    this.getListEmployee();
    // Đăng kí các sự kiện
    this.$_MISAEmitter.on("onShowToastMessage", (data) => {
      this.contentToastSuccess = data;
      this.onShowToastMessage();
    });
    this.$_MISAEmitter.on("onShowToastMessageUpdate", (data) => {
      this.contentToastSuccess = data;
      this.onShowToastMessage();
    });
    this.$_MISAEmitter.on("setFormModeAdd", () => {
      this.setFormModeAdd();
    });
    this.$_MISAEmitter.on("refreshDataTable", () => {
      this.getListEmployee();
    });
  },
  methods: {
    /**
     * Mô tả: Hàm xử lí sự kiên mở form chi tiết khi click vào button thêm mới nhân viên
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:01
     */
    async btnOpenFormDetail() {
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
      this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Add;
      this.employeeUpdate = {};
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng mở các item ở cột cuối của table khi click vào icon drop
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:54
     */
    onShowColFeature(index) {
      try {
        this.isShowColFeature[index] = !this.isShowColFeature[index];
        // this.selectedIndexFeature = index;
        const tableY = this.$refs.tableEmployeeList.getBoundingClientRect().y;
        const ulY =
          this.$refs.functionTableContent[index].getBoundingClientRect().y;

        // Kiểm tra nếu phần tử bị che khuất ở trên hoặc bị che khuất ở dưới
        if (tableY - ulY > -300) {
          // Nếu bị che khuất ở trên, hiển thị xuống dưới
          this.$refs.featureMenu[index].style.top = "15px";
        } else {
          // Nếu bị che khuất ở dưới, hiển thị lên trên
          this.$refs.featureMenu[index].style.top = "-90px";
        }
      } catch {
        return;
      }
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
        this.isShowLoadding = true;
        const resfilter = await employeeService.getFilter(
          this.selectedRecord,
          this.currentPage,
          ""
        );
        this.dataTable = resfilter.data;
        this.isShowLoadding = false;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiên load lại toàn bộ dữ liệu khi click vào icon refresh
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:31
     */
    async refreshData() {
      // window.removeEventListener("click", this.handleClickOutsideFeature);
      await this.getListEmployee();
      this.selectedRecord = this.$_MISAEnum.RECORD.RECORD_DEFAULT;
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
      this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Edit;
    },
    /**
     * Mô tả: Hàm set isStatusFormMode = ADD
     * created by : BNTIEN
     * created date: 03-06-2023 15:37:14
     */
    setFormModeAdd() {
      this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Add;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện click vào các item lựa chọn số bản ghi hiển thị trên table
     * created by : BNTIEN
     * created date: 29-05-2023 07:50:06
     */
    onSelectedRecord(record) {
      this.selectedRecord = record;
      this.currentPage = this.$_MISAEnum.RECORD.CURRENT_PAGE;
      this.updateDataTable();
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
        const res = await employeeService.delete(this.employeeIdDeleteSelected);
        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
          this.isShowDialogConfirmDelete = false;
          this.isOverlay = false;
          this.contentToastSuccess =
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_DELETE;
          this.onShowToastMessage();
          await this.getListEmployee();
        }
      } catch (error) {
        console.log(error);
        return;
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
     * Mô tả: Hàm xử lí sự kiện mở toast mesage
     * created by : BNTIEN
     * created date: 31-05-2023 00:42:10
     */
    onShowToastMessage() {
      this.isShowToastMessage = true;
      setTimeout(() => {
        this.isShowToastMessage = false;
      }, 3000);
    },

    /**
     * Mô tả: Hàm xử lí sự kiện đóng toast mesage
     * created by : BNTIEN
     * created date: 31-05-2023 00:42:10
     */
    btnCloseToastMessage() {
      this.isShowToastMessage = false;
    },
    async onDupliCateEmployee(employeeDup) {
      try {
        this.employeeDuplidate = employeeDup;
        let maxEmployeeCode = await employeeService.getCodeMax();
        let lenghtMaxCode = maxEmployeeCode.data.length;
        const newEmployeeCode = `NV-${(
          parseInt(maxEmployeeCode.data.substring(3)) + 1
        )
          .toString()
          .padStart(lenghtMaxCode - 3, "0")}`;
        console.log(newEmployeeCode);
        this.employeeDuplidate.EmployeeCode = newEmployeeCode;
        const res = await employeeService.create(this.employeeDuplidate);
        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(res.status)) {
          this.contentToastSuccess =
            this.$_MISAResource[
              this.$_LANG_CODE
            ].TEXT_CONTENT.SUCCESS_DUPLICATE;
          this.onShowToastMessage();
          await this.getListEmployee();
          this.employeeDuplidate = {};
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm tìm kiếm nhân viên theo mã hoặc tên
     * created by : BNTIEN
     * created date: 04-06-2023 00:20:21
     */
    async onSearchEmployee() {
      try {
        this.currentPage = this.$_MISAEnum.RECORD.CURRENT_PAGE;
        if (!this.textSearch.trim()) {
          this.textSearch = "";
        }
        const filteredEmployees = await employeeService.getFilter(
          this.selectedRecord,
          this.currentPage,
          this.textSearch.trim()
        );
        this.dataTable = filteredEmployees.data;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Cập nhật danh sách dữ liệu hiển thị dựa trên currentPage và pageSize
     * created by : BNTIEN
     * created date: 04-06-2023 01:49:06
     */
    async updateDataTable() {
      try {
        if (!this.textSearch.trim()) {
          this.textSearch = "";
        }
        const resfilter = await employeeService.getFilter(
          this.selectedRecord,
          this.currentPage,
          this.textSearch.trim()
        );
        this.dataTable = resfilter.data;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Di chuyển giữa các trang trong phân trang
     * created by : BNTIEN
     * created date: 04-06-2023 01:49:32
     */
    goToPage(p) {
      let newPage;
      if (
        p ===
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.PREVIOUS &&
        this.currentPage > 1
      ) {
        newPage = this.currentPage - 1;
      } else if (
        p === this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.NEXT &&
        this.currentPage < this.totalPages
      ) {
        newPage = this.currentPage + 1;
      } else if (
        typeof p ===
          this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.NUMBER &&
        p >= 1 &&
        p <= this.totalPages
      ) {
        newPage = p;
      }

      if (newPage !== undefined && newPage !== this.currentPage) {
        this.currentPage = newPage;
        this.updateDataTable();
      }
    },
    /**
     * Mô tả: xử lí sự kiện khi người dùng click ra ngoài select paging
     * created by : BNTIEN
     * created date: 08-06-2023 04:50:25
     */
    handleClickOutsidePaging(event) {
      if (!this.$refs.pagingMenu.contains(event.target)) {
        this.isShowPaging = false;
      }
    },

    // handleClickOutsideFeature(event) {
    //   try {
    //     const functionTableContent =
    //       this.$refs.functionTableContent[this.selectedIndexFeature];

    //     // Kiểm tra nếu functionTableContent không undefined và không null
    //     if (functionTableContent) {
    //       // Kiểm tra nếu event.target không nằm trong functionTableContent hoặc không phải là functionTableContent
    //       if (
    //         !functionTableContent.contains(event.target) &&
    //         event.target !== functionTableContent
    //       ) {
    //         this.isShowColFeature[this.selectedIndexFeature] = false;
    //       }
    //     }
    //   } catch {
    //     return;
    //   }
    // },
  },

  beforeUnmount() {
    // Hủy các sự kiện đã đăng kí
    this.$_MISAEmitter.off("onShowToastMessage");
    this.$_MISAEmitter.off("onShowToastMessageUpdate");
    this.$_MISAEmitter.off("setFormModeAdd");
    this.$_MISAEmitter.off("refreshDataTable");
    window.removeEventListener("click", this.handleClickOutsidePaging);
    // window.removeEventListener("click", this.handleClickOutsideFeature);
  },
};
</script>

<style scoped>
@import url(@/css/maincontent.css);
@import url(@/css/pagingemployee.css);

.rotate-function-icon {
  transform: rotate(180deg);
}

.active-page {
  border: 1px solid var(--color-border-default);
}

.active-record {
  border: 1px solid var(--color-btn-default);
}

input[type="checkbox"] {
  accent-color: #2ca01c;
  width: 16px;
  height: 16px;
}

/* Bỏ dấu x ở ô input có type = search */
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}
</style>
