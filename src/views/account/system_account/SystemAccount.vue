<template>
  <div class="content-title">
    <h1>{{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.title }}</h1>
    <div class="all-category">
      <div class="prev-icon icon-tb"></div>
      <router-link to="/category">
        <div class="all-category-text">
          {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ALL_CATEGORY }}
        </div>
      </router-link>
    </div>
  </div>
  <div class="content-main-body">
    <div class="content-action">
      <div class="search-account">
        <input
          type="search"
          :placeholder="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.placeholderSearch"
          name="search-account"
          v-model="textSearch"
          @keydown.enter="onSearchAccount"
          @input="autoSearch"
        />
        <div class="search-icon icon-tb" @click="onSearchAccount"></div>
      </div>
      <div class="expand-account" @click="expandTree">
        {{
          statusExpand.isExpand
            ? this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.unExpand
            : this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.expand
        }}
      </div>
      <div
        @click="refreshData"
        class="refresh-icon icon-tb"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.REFRESH"
      ></div>
      <div
        @click="exportData"
        class="excel-icon icon-tb"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.EXCEL"
      ></div>
      <div class="utilities" @click="isShowUtilities = !isShowUtilities">
        <div class="utilities-text">
          {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.tranferAccount }}
        </div>
      </div>
      <div class="insert-data">
        <misa-button-default
          :textButtonDefault="this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ADD_EMPLOYEE"
          @click="btnOpenFormDetail"
        ></misa-button-default>
        <misa-button-icon></misa-button-icon>
      </div>
    </div>
    <div id="list-account-system" class="list-entity">
      <form action="">
        <table>
          <thead>
            <tr>
              <th class="as-account-number-1 col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.colTableName.accountNumber }}
              </th>
              <th class="as-account-name col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.colTableName.accountName }}
              </th>
              <th class="as-nature col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.colTableName.nature }}
              </th>
              <th class="as-name-english col-width-250">
                {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.colTableName.accountNameEnglish }}
              </th>
              <th class="as-explain col-width-350">
                {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.colTableName.explain }}
              </th>
              <th class="as-status col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.colTableName.state }}
              </th>
              <th class="text-center as-feature entity-border-right function-table">
                {{ this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.colTableName.feature }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in dataTable.Data" :key="item.AccountId">
              <tr
                :class="{
                  'text-bold': item.IsParent == this.$_MISAEnum.BOOL.TRUE,
                }"
                v-if="
                  item.IsRoot == this.$_MISAEnum.BOOL.TRUE ||
                  (this.rowParents[item.ParentId].isMinus && this.rowParents[item.ParentId].showChildren)
                "
                @dblclick="onUpdateFormDetail(item)"
              >
                <td :class="`as-account-number-${item.Grade}`" class="col-width-150">
                  <div class="td-col-1-account">
                    <span
                      @dblclick.stop
                      :class="[
                        {
                          'plus-square-icon':
                            item.IsParent == this.$_MISAEnum.BOOL.TRUE && !this.rowParents[item.AccountId].isMinus,
                        },
                        {
                          'minus-square-icon':
                            item.IsParent == this.$_MISAEnum.BOOL.TRUE && this.rowParents[item.AccountId].isMinus,
                        },
                      ]"
                      @click="handleToggleRow(item, index)"
                    ></span>
                    <span>{{ item.AccountNumber }}</span>
                  </div>
                </td>
                <td class="as-account-name col-width-150" :title="item.AccountName">
                  {{ item.AccountName }}
                </td>
                <td class="as-nature col-width-150" :title="item.Nature">{{ item.Nature }}</td>
                <td class="as-name-english col-width-250" :title="item.AccountNameEnglish">
                  {{ item.AccountNameEnglish }}
                </td>
                <td class="as-explain col-width-350" :title="item.Explain">{{ item.Explain }}</td>
                <td class="as-status col-width-150">
                  {{
                    item.State == this.$_MISAEnum.STATE.Using
                      ? this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.valueState.usingAccount
                      : this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.valueState.stopUsingAccount
                  }}
                </td>
                <td class="text-center as-feature entity-border-right function-table" @dblclick.stop>
                  <span @click="onUpdateFormDetail(item)">
                    {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.UPDATE }}
                  </span>
                  <div class="function-table-content" @click="onOpenFeatureMenu($event, item)">
                    <div class="function-icon-table function-icon-select"></div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </form>
      <teleport to="#app">
        <div
          id="menu-function-select-account"
          class="menu-function-select"
          v-if="isShowColFeature"
          :style="{
            left: `${this.positionFeatureMenu.left}px`,
            top: `${this.positionFeatureMenu.top}px`,
          }"
        >
          <div @click="onDupliCateAccount">
            {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DUPLICATE }}
          </div>
          <div @click="onDeleteAccount">
            {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DELETE }}
          </div>
          <!-- <div>
            {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.TRANFER_ACCOUNT }}
          </div> -->
          <div @click="onToggleUsing">{{ this.textStateAccount }}</div>
        </div>
      </teleport>
      <img
        v-show="isShowLoading && this.dataTable.TotalRecord !== undefined"
        class="loading"
        :class="{ 'loadding-form-detail': isShowFormDetail }"
        src="../../../assets/img/loading.svg"
        alt="loading"
      />
      <div v-if="!this.dataTable.TotalRecord || this.dataTable.TotalRecord === 0" class="no-data">
        {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.NO_DATA }}
      </div>
    </div>
    <div class="pagination">
      <p>
        {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.TOTAL }}:
        <b>{{ textSearch ? recordTextSearch : this.dataTable.TotalRecord ? this.dataTable.TotalRecord : 0 }}</b>
        {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.RECORD }}
      </p>
      <div class="pagination-detail">
        <div class="pagination-detail-pagesize" :class="{ 'active-record': isShowPaging }" ref="PagingMenu">
          <div id="pagination-detail-pagesize-content" class="pagination-detail-pagesize-content">
            {{ selectedRecord }}
            {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.RECORD_ON_PAGE }}
          </div>
          <div id="menu-paging-select" class="menu-paging-select" @click="onShowSelectPaging">
            <div class="function-icon" :class="{ 'rotate-function-icon': isShowPaging }"></div>
            <ul id="menu-paging" class="menu-paging" v-show="isShowPaging">
              <li
                class="menu-paging-record"
                v-for="(record, index) in recordOptions"
                :key="index"
                @click="onSelectedRecord(record, index)"
                :class="{ 'active-record-item': indexSelectedRecord === index }"
              >
                {{ record }}
                {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.RECORD_ON_PAGE }}
              </li>
            </ul>
          </div>
        </div>
        <div class="pagination-page-number">
          <ul class="page-number">
            <button
              @click="goToPage(this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.PREVIOUS)"
              :disabled="isFirstPage"
            >
              {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGING_PRE }}
            </button>
            <button
              v-for="pageNumber in this.visiblePageNumbers"
              :key="pageNumber"
              @click="goToPage(pageNumber)"
              :class="{ 'active-page': pageNumber === this.currentPage }"
            >
              {{ pageNumber }}
            </button>
            <button
              @click="goToPage(this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.NEXT)"
              :disabled="isLastPage"
            >
              {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGING_NEXT }}
            </button>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="isOverlay" id="container-overlay" class="container-overlay" @closeFormDetail="onCloseFormDetail"></div>
    <!-- form thêm mới, sửa tìa khoản -->
    <SystemAccountDetail
      v-if="isShowFormDetail"
      @closeFormDetail="onCloseFormDetail"
      :accountSelected="accountUpdate"
      :statusFormMode="isStatusFormMode"
    ></SystemAccountDetail>
    <!-- dialog account confirm delete -->
    <misa-dialog-confirm-delete
      :contentDelete="`${this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.contentDelete}${accountNumberDeleteSelected}${
        this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.END
      }`"
      v-if="isShowDialogConfirmDelete"
    ></misa-dialog-confirm-delete>
    <!-- dialog account error -->
    <misa-dialog-error
      v-if="isShowDialogDataError"
      :valueNotNull="dataError"
      :title="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.deleteFailed"
    ></misa-dialog-error>
    <!-- toast message -->
    <misa-toast-success v-if="isShowToastMessage" :contentToast="contentToastSuccess"></misa-toast-success>
    <misa-dialog-handle-task v-if="isShowToggleState"></misa-dialog-handle-task>
  </div>
</template>

<script>
import SystemAccountDetail from "../system_account_detail/SystemAccountDetail.vue";
import accountService from "@/services/account.js";

export default {
  name: "SystemAccount",

  components: {
    SystemAccountDetail,
  },

  created() {
    // Lấy danh sách tài khoản hệ thống
    this.getListAccount();
    // Đăng kí các sự kiện
    this.$_MISAEmitter.on("closeDialogError", () => {
      if (!this.isShowFormDetail) {
        this.isOverlay = false;
      }
      this.isShowDialogDataError = false;
      this.dataError = [];
    });
    this.$_MISAEmitter.on("confirmYesDeleteEntity", async () => {
      await this.btnConfirmYesDeleteAccount();
    });
    this.$_MISAEmitter.on("confirmNoDeleteEntity", () => {
      this.btnConfirmNoDeleteAccount();
    });
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
    this.$_MISAEmitter.on("refreshDataTable", async () => {
      await this.getListAccount();
    });
    this.$_MISAEmitter.on("closeToastMessage", () => {
      this.isShowToastMessage = false;
    });

    this.$_MISAEmitter.on("confirmYesTaskEntity", async () => {
      await this.confirmUpdateStateChildren();
    });

    this.$_MISAEmitter.on("confirmNoTaskEntity", async () => {
      await this.confirmNoUpdateStateChildren();
    });

    this.$_MISAEmitter.on("closeTaskEntity", () => {
      this.isShowToggleState = false;
      this.isOverlay = false;
    });
  },

  mounted() {
    // Lắng nghe sự kiện click trên toàn bộ màn hình
    window.addEventListener("click", this.handleClickOutsidePaging);
    window.addEventListener("click", this.handleClickOutsideFeature);
  },

  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị overlay
      isOverlay: false,
      // Khai báo biến quy định trang thái hiển thị form detail
      isShowFormDetail: false,
      // Khai báo biến quy định trạng thái hiển thị columns feature
      isShowColFeature: false,
      // Khai báo biến quy định trạng thái hiển thị loading
      isShowLoading: false,
      // Khai báo dữ liệu duyệt trên 1 trang table
      dataTable: [],
      // Khai báo số bản ghi mặc định được hiển thi trên table
      selectedRecord: this.$_MISAEnum.RECORD.RECORD_DEFAULT,
      // Khai báo trang hiện tại trong phân trang
      currentPage: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo list số bản ghi có thể lựa chọn để hiển thị trên trang
      recordOptions: this.$_MISAEnum.RECORD.RECORD_OPTIONS,
      // Khai báo số trang tối đa hiển thị trong phân trang
      maxVisiblePages: this.$_MISAEnum.RECORD.MAX_VISIBLE_PAGE,
      // Khai báo biến quy định trạng thái hiển thị của các item select paging
      isShowPaging: false,
      // Khai báo biến lưu chỉ số index được chọn trong paging
      indexSelectedRecord: this.$_MISAEnum.RECORD.INDEX_SELECTED_DEFAULT,
      // Khai báo biến tùy chỉnh top, left cho feature menu
      positionFeatureMenu: {},
      // Khai báo biến kiểm tra xem form chi tiết đang ở trạng thái thêm hay sửa
      isStatusFormMode: this.$_MISAEnum.FORM_MODE.Add,
      // Khai báo trạng thái hiển thị của toast message
      isShowToastMessage: false,
      // Khai báo biến lưu nội dung của toast message
      contentToastSuccess: "",
      // Khai báo 1 tài khoản được chọn để xử lí hàm sửa
      accountUpdate: {},
      // Khai báo AccountId của tài khoản cần xóa
      accountIdDeleteSelected: "",
      // Khai báo AccountNumber của tài khoản cần xóa
      accountNumberDeleteSelected: "",
      // Khai báo biến quy định trạng thái ẩn hiển dialog confirm delete
      isShowDialogConfirmDelete: false,
      // Khai báo biến lưu nội dung tìm kiếm
      textSearch: "",
      // Khai báo biến quy định sau 1 khoảng thời gian mới bắt đầu tìm kiếm
      searchAccountTimeout: null,
      // Khai báo biến lưu account khi bấm vào col feature
      selectedAccount: {},
      // Khai báo biến lưu các dòng có con
      rowParents: {},
      // Khai báo biến quy định có đang ở trạng thái mở rộng hay không
      statusExpand: { isExpand: false, isClicked: false },
      // Khai báo biến quy định trạng thái hiển thị dialog dataError
      isShowDialogDataError: false,
      // Danh sách dữ liệu lỗi của dialog dataError
      dataError: [],
      // Khai báo biến lưu text là đang sử dụng hay ngưng sử dụng
      textStateAccount: "",
      // Biến quy định trạng thái hiển thị dialog xác nhận thay đổi
      isShowToggleState: false,
      // Biến lưu số lượng bản ghi khi textSearch khác rỗng
      recordTextSearch: 0,
    };
  },

  computed: {
    /**
     * Mô tả: Tính tổng số trang trong phân trang
     * created by : BNTIEN
     * created date: 12-08-2023 11:11:27
     */
    totalPages() {
      return Math.ceil(this.dataTable.TotalRecord / this.selectedRecord);
    },
    /**
     * Mô tả: Nếu đang ở trang đầu thì button prev không hoạt động
     * created by : BNTIEN
     * created date: 12-08-2023 11:11:27
     */
    isFirstPage() {
      return this.currentPage === this.$_MISAEnum.RECORD.CURRENT_PAGE;
    },
    /**
     * Mô tả: Nếu đang ở trang cuối thì button next không hoạt động
     * created by : BNTIEN
     * created date: 12-08-2023 11:11:27
     */
    isLastPage() {
      if (!this.totalPages || this.totalPages === 0) {
        return true;
      }
      return this.currentPage === this.totalPages;
    },
    /**
     * Mô tả: Tính tổng số trang sẽ hiển thị
     * created by : BNTIEN
     * created date: 12-08-2023 11:11:27
     */
    visiblePageNumbers() {
      if (!this.dataTable.TotalRecord || this.dataTable.TotalRecord === 0) {
        return [];
      }

      let startPage = Math.max(this.currentPage - Math.floor(this.maxVisiblePages / 2), 1);
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

  methods: {
    /**
     * Mô tả: Gọi api lấy danh sách tài khoản
     * created by : BNTIEN
     * created date: 19-07-2023 03:36:08
     */
    async getListAccount() {
      try {
        this.isShowLoading = true;
        const resfilter = await accountService.getFilter(this.selectedRecord, this.currentPage, "");
        this.isShowLoading = false;
        this.dataTable = resfilter.data;

        // set giá trị cho các dòng có con: key là id của dòng, value là 1 object
        this.statusExpand.isExpand = false;
        this.statusExpand.isClicked = false;
        this.rowParents = {};
        this.setRowParent(this.dataTable.Data, false);
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiên load lại toàn bộ dữ liệu khi click vào icon refresh
     * created by : BNTIEN
     * created date: 20-07-2023 04:59:26
     */
    async refreshData() {
      this.statusExpand.isExpand = false;
      this.statusExpand.isClicked = false;
      this.selectedRecord = this.$_MISAEnum.RECORD.RECORD_DEFAULT;
      this.indexSelectedRecord = this.$_MISAEnum.RECORD.INDEX_SELECTED_DEFAULT;
      this.textSearch = "";
      this.currentPage = this.$_MISAEnum.RECORD.CURRENT_PAGE;
      await this.getListAccount();
    },
    /**
     * Mô tả: Hàm mở form detail
     * created by : BNTIEN
     * created date: 18-07-2023 08:35:50
     */
    btnOpenFormDetail() {
      this.isOverlay = true;
      this.isShowFormDetail = true;
    },

    /**
     * Mô tả: Hàm đóng form detail
     * created by : BNTIEN
     * created date: 18-07-2023 16:56:27
     */
    onCloseFormDetail() {
      this.isOverlay = false;
      this.isShowFormDetail = false;
      this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Add;
      this.accountUpdate = {};
    },

    /**
     * Mô tả: Hiển thị menu feature
     * created by : BNTIEN
     * created date: 18-07-2023 17:15:45
     */
    onOpenFeatureMenu(e, account) {
      try {
        // chặn sự liện lan ra các phần tử cha
        e.stopPropagation();
        this.textStateAccount =
          account.State == this.$_MISAEnum.BOOL.TRUE
            ? this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.valueState.stopUsingAccount
            : this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.valueState.useAccount;
        this.selectedAccount = account;
        this.isShowColFeature = true;
        const positionIcon = e.target.getBoundingClientRect();
        const left = positionIcon.right - 110;
        let top = 0;
        if (positionIcon.bottom > 450) {
          top = positionIcon.bottom - 100;
        } else {
          top = positionIcon.bottom + 10;
        }
        this.positionFeatureMenu = { left: left, top: top };
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm cập nhật trạng thái show/hide cho dòng con parentId và gọi đệ quy
     * created by : BNTIEN
     * created date: 20-07-2023 20:59:17
     */
    updateStatusShowChildren(parentId, status) {
      // Nếu rowParents tồn tại key là parentId (đang là cha)
      if (this.rowParents[parentId]) {
        this.rowParents[parentId].showChildren = status;
        // Lấy mảng các key trong rowParents sau đó map để duyệt từng key
        Object.keys(this.rowParents).map((key) => {
          if (this.rowParents[key].parentId == parentId) {
            this.updateStatusShowChildren(key, status);
          }
        });
      }
    },

    /**
     * Mô tả: Hàm set giá trị cho rowParents
     * created by : BNTIEN
     * created date: 22-07-2023 12:47:33
     */
    setRowParent(data, status) {
      for (const row of data) {
        if (row.IsParent == this.$_MISAEnum.BOOL.TRUE) {
          this.rowParents[row.AccountId] = {
            isMinus: status,
            isClicked: status,
            showChildren: status,
            parentId: row.ParentId,
          };
        }
      }
    },

    /**
     * Mô tả: Hàm đóng mở cây account
     * created by : BNTIEN
     * created date: 19-07-2023 09:11:35
     */
    async handleToggleRow(item, index) {
      try {
        if (!this.rowParents[item.AccountId].isMinus) {
          if (!this.rowParents[item.AccountId].isClicked) {
            this.isShowLoading = true;
            const reschildrens = await accountService.getAllChildren(item.AccountId);
            this.isShowLoading = false;
            this.dataTable.Data.splice(index + 1, 0, ...reschildrens.data);
            // set giá trị cho các dòng có con: key là id của dòng, value là 1 object
            this.setRowParent(reschildrens.data, false);
            this.rowParents[item.AccountId].isClicked = true;
          }
          this.rowParents[item.AccountId].isMinus = true;
          this.updateStatusShowChildren(item.AccountId, true);
        } else {
          this.rowParents[item.AccountId].isMinus = false;
          this.updateStatusShowChildren(item.AccountId, false);
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm mở rộng các node con của các gốc ban đầu
     * created by : BNTIEN
     * created date: 22-07-2023 01:23:49
     */
    async expandTree() {
      // Mở rộng dataTable
      if (!this.statusExpand.isExpand) {
        // Nếu chưa mở rộng lần nào, tức là chưa gọi api
        if (!this.statusExpand.isClicked) {
          this.isShowLoading = true;
          const res = await accountService.getExpand(this.selectedRecord, this.currentPage, this.textSearch);
          this.isShowLoading = false;
          this.dataTable.Data = res.data;
        }
        this.rowParents = {};
        this.setRowParent(this.dataTable.Data, true);
      } else {
        // Thu gọn dataTable
        this.dataTable.Data.filter(
          (x) => x.IsRoot == this.$_MISAEnum.BOOL.TRUE && x.IsParent == this.$_MISAEnum.BOOL.TRUE
        ).map((row) => {
          this.rowParents[row.AccountId].isMinus = false;
          this.updateStatusShowChildren(row.AccountId, false);
        });
      }
      this.statusExpand.isClicked = true;
      this.statusExpand.isExpand = !this.statusExpand.isExpand;
    },

    /**
     * Mô tả: Cập nhật danh sách dữ liệu hiển thị dựa trên dataTable
     * created by : BNTIEN
     * created date: 19-07-2023 16:01:27
     */
    async updateDataTable() {
      try {
        this.isShowLoading = true;
        const resfilter = await accountService.getFilter(this.selectedRecord, this.currentPage, this.textSearch);
        this.isShowLoading = false;
        this.dataTable = resfilter.data;

        this.statusExpand.isExpand = false;
        this.statusExpand.isClicked = false;

        this.rowParents = {};
        this.setRowParent(this.dataTable.Data, false);
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện click vào các item lựa chọn số bản ghi hiển thị trên table
     * created by : BNTIEN
     * created date: 19-07-2023 15:22:52
     */
    onSelectedRecord(record, index) {
      this.selectedRecord = record;
      this.indexSelectedRecord = index;
      this.currentPage = this.$_MISAEnum.RECORD.CURRENT_PAGE;
      this.updateDataTable();
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào item xóa tài khoản thì hiển thị dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 20-07-2023 05:06:02
     */
    async onDeleteAccount() {
      if (this.selectedAccount.IsParent == this.$_MISAEnum.BOOL.TRUE) {
        this.dataError.push(this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.contentDeleteFailed);
        this.isShowDialogDataError = true;
      } else if (this.selectedAccount.IsParent == this.$_MISAEnum.BOOL.FALSE) {
        this.accountIdDeleteSelected = this.selectedAccount.AccountId;
        this.accountNumberDeleteSelected = this.selectedAccount.AccountNumber;
        this.isShowDialogConfirmDelete = true;
      }
      this.isOverlay = true;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng mở lựa chọn số phần tử hiển thị trên 1 trang trong table
     * created by : BNTIEN
     * created date: 19-07-2023 15:29:36
     */
    onShowSelectPaging() {
      this.isShowPaging = !this.isShowPaging;
    },
    /**
     * Mô tả: Hàm xử lí cập nhật thông tin tài khoản
     * created by : BNTIEN
     * created date: 20-07-2023 05:01:16
     */
    onUpdateFormDetail(account) {
      this.accountUpdate = account;
      this.isShowFormDetail = true;
      this.isOverlay = true;
      this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Edit;
    },
    /**
     * Mô tả: Hàm set isStatusFormMode = ADD
     * created by : BNTIEN
     * created date: 20-07-2023 05:04:23
     */
    setFormModeAdd() {
      this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Add;
    },

    /**
     * Mô tả:  Hàm xử lí sự kiện khi người dùng xác nhận xóa 1 tài khoản
     * created by : BNTIEN
     * created date: 20-07-2023 05:25:57
     */
    async btnConfirmYesDeleteAccount() {
      try {
        this.isShowLoading = true;
        const res = await accountService.delete(this.accountIdDeleteSelected);
        this.isShowLoading = false;
        this.isShowDialogConfirmDelete = false;
        this.isOverlay = false;
        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) && res.data > 0) {
          this.contentToastSuccess = this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_DELETE;
          this.onShowToastMessage();
          await this.getListAccount();
        }
      } catch (error) {
        this.isShowLoading = false;
        this.isShowDialogConfirmDelete = false;
        this.dataError.push(error.Data);
        this.isShowDialogDataError = true;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào button không trong dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 20-07-2023 05:25:11
     */
    btnConfirmNoDeleteAccount() {
      this.isShowDialogConfirmDelete = false;
      this.isOverlay = false;
    },

    /**
     * Mô tả:  Hàm xử lí sự kiện mở toast mesage
     * created by : BNTIEN
     * created date: 20-07-2023 05:24:56
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
     * created date: 20-07-2023 05:24:42
     */
    btnCloseToastMessage() {
      this.isShowToastMessage = false;
    },
    /**
     * Mô tả: Hàm nhân bản 1 tài khoản
     * created by : BNTIEN
     * created date: 20-07-2023 05:24:04
     */
    onDupliCateAccount() {
      try {
        this.accountUpdate = this.selectedAccount;
        this.isShowFormDetail = true;
        this.isOverlay = true;
        this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Add;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Cập nhật trạng thái các tài khoản
     * created by : BNTIEN
     * created date: 26-07-2023 20:03:22
     */
    async updateStateAccount(account, state, isUpdateChildren) {
      try {
        this.isShowLoading = true;
        const res = await accountService.updateState(account, state, isUpdateChildren);
        this.isShowLoading = false;
        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) && res.data > 0) {
          this.$_MISAEmitter.emit(
            "onShowToastMessageUpdate",
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_UPDATE
          );
          await this.getListAccount();
        }
      } catch (error) {
        this.isShowLoading = false;
        this.dataError.push(error.Data);
        this.isShowDialogDataError = true;
      }
    },

    /**
     * Mô tả: Hàm thay đổi trạng thái 1 tài khoản
     * created by : BNTIEN
     * created date: 22-07-2023 14:15:53
     */
    async onToggleUsing() {
      try {
        // Nếu tài khoản đang ở trạng thái sử dụng => ngưng sử dụng nó và tất cả các con của nó
        if (this.selectedAccount.State == this.$_MISAEnum.BOOL.TRUE) {
          this.updateStateAccount(
            this.selectedAccount,
            this.$_MISAEnum.STATE.StopUsing,
            this.$_MISAEnum.UPDATE_CHILDREN.TRUE
          );
        } else {
          // Nếu tài khoản đó đang là cha thì hỏi có muốn cập nhật trạng thái cho các con của nó không
          if (this.selectedAccount.IsParent == this.$_MISAEnum.BOOL.TRUE) {
            this.isShowToggleState = true;
            this.isOverlay = true;
          } else {
            this.updateStateAccount(
              this.selectedAccount,
              this.$_MISAEnum.STATE.Using,
              this.$_MISAEnum.UPDATE_CHILDREN.TRUE
            );
          }
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí hàm cập nhật cả trạng thái các con
     * created by : BNTIEN
     * created date: 26-07-2023 17:09:01
     */
    async confirmUpdateStateChildren() {
      try {
        this.isShowToggleState = false;
        this.updateStateAccount(
          this.selectedAccount,
          this.$_MISAEnum.STATE.Using,
          this.$_MISAEnum.UPDATE_CHILDREN.TRUE
        );
        this.isOverlay = false;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí hàm không cập nhật trạng thái các con
     * created by : BNTIEN
     * created date: 26-07-2023 17:09:01
     */
    async confirmNoUpdateStateChildren() {
      try {
        this.isShowToggleState = false;
        this.updateStateAccount(
          this.selectedAccount,
          this.$_MISAEnum.STATE.Using,
          this.$_MISAEnum.UPDATE_CHILDREN.FALSE
        );
        this.isOverlay = false;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm tìm kiếm tài khoản theo mã hoặc tên
     * created by : BNTIEN
     * created date: 20-07-2023 05:20:10
     */
    async onSearchAccount() {
      try {
        this.currentPage = this.$_MISAEnum.RECORD.CURRENT_PAGE;
        // Nếu giá trị tìm kiếm rỗng, gọi api filter
        if (!this.textSearch.trim()) {
          this.textSearch = "";
          this.isShowLoading = true;
          const filteredAccounts = await accountService.getFilter(
            this.selectedRecord,
            this.currentPage,
            this.textSearch.trim()
          );
          this.isShowLoading = false;
          this.dataTable = filteredAccounts.data;

          this.statusExpand.isExpand = false;
          this.statusExpand.isClicked = false;
          this.rowParents = {};
          this.setRowParent(this.dataTable.Data, false);
        } else {
          // Nếu giá trị tìm kiếm khác rỗng, gọi api search
          this.isShowLoading = true;
          const searchAccounts = await accountService.getBySearch(
            this.selectedRecord,
            this.currentPage,
            this.textSearch.trim()
          );
          this.isShowLoading = false;
          this.dataTable = searchAccounts.data;
          this.dataTable.TotalRecord = this.dataTable.Data.filter((x) => x.IsRoot == this.$_MISAEnum.BOOL.TRUE).length;
          this.recordTextSearch = this.dataTable.Data.length;

          this.statusExpand.isExpand = true;
          this.statusExpand.isClicked = true;
          this.rowParents = {};
          this.setRowParent(this.dataTable.Data, true);
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Tự động tìm kiếm sau 1 khoảng thời gian người dùng không nhập dữ liệu
     * created by : BNTIEN
     * created date: 20-07-2023 05:15:41
     */
    async autoSearch() {
      try {
        clearTimeout(this.searchAccountTimeout);
        this.searchAccountTimeout = setTimeout(async () => {
          await this.onSearchAccount();
        }, 500);
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Di chuyển giữa các trang trong phân trang
     * created by : BNTIEN
     * created date: 04-06-2023 01:49:32
     */
    async goToPage(p) {
      let newPage;
      if (p === this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.PREVIOUS && this.currentPage > 1) {
        newPage = this.currentPage - 1;
      } else if (
        p === this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.NEXT &&
        this.currentPage < this.totalPages
      ) {
        newPage = this.currentPage + 1;
      } else if (
        typeof p === this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.NUMBER &&
        p >= 1 &&
        p <= this.totalPages
      ) {
        newPage = p;
      }

      if (newPage !== undefined && newPage !== this.currentPage) {
        this.currentPage = newPage;
        await this.updateDataTable();
      }
    },
    /**
     * Mô tả: Xuất excel
     * created by : BNTIEN
     * created date: 12-08-2023 17:39:51
     */
    async exportData() {
      try {
        this.isShowLoading = true;
        await accountService.exportData(this.textSearch);
        this.isShowLoading = false;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: xử lí sự kiện khi người dùng click ra ngoài select paging
     * created by : BNTIEN
     * created date: 20-07-2023 05:12:13
     */
    handleClickOutsidePaging(event) {
      if (!this.$refs.PagingMenu.contains(event.target)) {
        this.isShowPaging = false;
      }
    },
    /**
     * Mô tả: xử lí sự kiện click ngoài menu feature
     * created by : BNTIEN
     * created date: 20-07-2023 05:11:58
     */
    handleClickOutsideFeature() {
      this.isShowColFeature = false;
    },
  },

  beforeUnmount() {
    // Hủy các sự kiện đã đăng kí
    this.$_MISAEmitter.off("closeDialogError");
    this.$_MISAEmitter.off("confirmYesDeleteEntity");
    this.$_MISAEmitter.off("confirmNoDeleteEntity");
    this.$_MISAEmitter.off("onShowToastMessage");
    this.$_MISAEmitter.off("onShowToastMessageUpdate");
    this.$_MISAEmitter.off("setFormModeAdd");
    this.$_MISAEmitter.off("refreshDataTable");
    this.$_MISAEmitter.off("closeToastMessage");
    this.$_MISAEmitter.off("confirmYesTaskEntity");
    this.$_MISAEmitter.off("confirmNoTaskEntity");
    this.$_MISAEmitter.off("closeTaskEntity");
    window.removeEventListener("click", this.handleClickOutsidePaging);
    window.removeEventListener("click", this.handleClickOutsideFeature);
  },
};
</script>

<style scoped>
@import url(./SystemAccount.css);

.text-bold {
  font-weight: 700;
}

.text-bold td:last-child {
  font-weight: 400;
}

.rotate-function-icon {
  transform: rotate(180deg);
}

.active-page {
  border: 1px solid var(--color-border-default);
  font-weight: 700;
}

.active-record {
  border: 1px solid var(--color-btn-default);
}

input[type="checkbox"] {
  accent-color: #2ca01c;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.active-record-item {
  background-color: var(--color-btn-default);
  color: white;
}

.loadding-form-detail {
  left: 50%;
}

.no-data {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
