<template>
  <div class="receipt-payment" id="receipt-payment">
    <div class="cash-info-money">
      <div class="cash-info-money-item" style="border-left: 4px solid #00a9f2">
        <div class="cash-info-money-item-text">
          {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.totalReceive }}
        </div>
        <div class="cash-info-money-item-number" :title="'Bấm vào để xem chi tiết'">
          {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.moneyOne }}
        </div>
      </div>
      <div class="cash-info-money-item" style="border-left: 4px solid #ff7f2c">
        <div class="cash-info-money-item-text">
          {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.totalPayment }}
        </div>
        <div class="cash-info-money-item-number" :title="'Bấm vào để xem chi tiết'">
          {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.moneyOne }}
        </div>
      </div>
      <div class="cash-info-money-item" style="border-left: 4px solid #74cb2f">
        <div class="cash-info-money-item-text">
          {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.fundBalance }}
        </div>
        <div class="cash-info-money-item-number" :title="'Bấm vào để xem chi tiết'">
          {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.moneyTwo }}
        </div>
      </div>
      <button class="refresh-cash-money">
        <div class="icon-l refresh-icon" style="scale: 0.6 0.6"></div>
      </button>
      <div class="time-cash-money">
        {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.figureUpTo }}
      </div>
    </div>
    <div class="receipt-payment-content">
      <div class="receipt-payment-content-action">
        <div class="content-action-left">
          <div class="container-direction-arrow">
            <div class="icon-l direction-arrow"></div>
          </div>
          <button
            :disabled="isDisableExcuteBatch"
            class="delete-multiple"
            @click="onShowExcuteBatch"
            :class="{ 'no-disable': !isDisableExcuteBatch }"
            ref="DeleteMulti"
          >
            <div class="select-function-delete">
              <span>{{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.EXCUTE_BATCH }}</span>
              <div class="delete-multiple-icon">
                <div class="function-icon-disable"></div>
              </div>
            </div>
            <div class="menu-delete" v-show="isShowMenuExcuteBatch">
              <div class="menu-item-delete" @click="onShowDialogDeleteMulti">
                {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DELETE }}
              </div>
              <div class="menu-item-delete" @click="onUnNote">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.unNote }}
              </div>
            </div>
          </button>
          <button class="delete-multiple filter-provider" :class="'no-disable'">
            <div class="select-function-delete">
              <span>Lọc</span>
              <div class="delete-multiple-icon">
                <div class="function-icon-disable"></div>
              </div>
            </div>
            <div class="menu-delete" v-show="false">
              <div class="menu-item-delete">
                {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DELETE }}
              </div>
            </div>
          </button>
          <button class="filter-receipt">
            <div class="select-filter-receipt">
              <span>{{ textFilterReceipt }}</span>
              <div class="filter-receipt-icon" @click="isShowFilterReceipt = !isShowFilterReceipt">
                <div class="function-icon-disable"></div>
              </div>
              <div class="filter-receipt-menu" v-show="isShowFilterReceipt">
                <div
                  class="filter-receipt-menu-item"
                  v-for="(item, index) in optionFilterReceipt"
                  :key="index"
                  @click="selectFilter(index)"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </button>
          <div class="filter-receipt-text">
            {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.nextYearPresent }}
          </div>
        </div>
        <div class="content-action-right">
          <div class="search-entity">
            <input
              type="search"
              :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.placeholderSearch"
              v-model="textSearch"
              @keydown.enter="onSearchReceipt"
              @input="autoSearch"
            />
            <div class="search-icon icon-tb" @click="onSearchReceipt"></div>
          </div>
          <div
            @click="refreshData"
            class="refresh-icon icon-tb"
            :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.REFRESH"
            style="margin-top: 3px"
          ></div>
          <div
            @click="exportData"
            class="excel-small-icon icon-tb"
            :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.EXCEL"
            style="margin-top: 3px"
          ></div>
          <div class="setting-icon icon-tb" :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.SETTING_MAIN"></div>
          <div class="insert-data">
            <misa-button-default
              :textButtonDefault="this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.receive"
            ></misa-button-default>
            <button>
              <div class="dropdown-white-icon"></div>
            </button>
          </div>
          <div class="insert-data">
            <misa-button-default
              :textButtonDefault="this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.payment"
              @click="btnOpenFormDetail"
            ></misa-button-default>
            <button @click="isShowMenuInsert = !isShowMenuInsert">
              <div class="dropdown-white-icon"></div>
              <div class="menu-select-insert-data" v-show="isShowMenuInsert">
                <div class="item-select-insert-data" @click="btnOpenFormDetail">
                  {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.paymentV2 }}
                </div>
                <div class="item-select-insert-data">
                  {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.payByBill }}
                </div>
                <div class="item-select-insert-data">
                  {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.taxPayer }}
                </div>
                <div class="item-select-insert-data">
                  {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.submitInsurance }}
                </div>
                <div class="item-select-insert-data">
                  {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.paySalary }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="receipt-payment-content-main">
        <table>
          <thead>
            <tr>
              <th type="checkbox" class="entity-border-left">
                <div class="th-checkbox">
                  <input class="checkbox-select-row" type="checkbox" @click="checkAllSelect" :checked="isCheckAll" />
                </div>
              </th>
              <th class="text-center col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.accountingDate }}
              </th>
              <th class="text-center col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.receiptDate }}
              </th>
              <th class="col-width-120">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.receiptNumber }}
              </th>
              <th class="text-right col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.numberMoney }}
              </th>
              <th class="col-width-250">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.reason }}
              </th>
              <th class="col-width-150">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.obj }}
              </th>
              <th class="col-width-120">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.codeObj }}
              </th>
              <th class="col-width-350">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.address }}
              </th>
              <th type="feat" class="text-center entity-border-right e-birthday">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.tableHeader.feature }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-show="dataTable.TotalRecord"
              v-for="item in dataTable.Data"
              :key="item.ReceiptId"
              @dblclick="onViewFormDetail(item)"
              :class="[{ checkedRow: checkRow().includes(item.ReceiptId) }, { unNoted: !item.IsNoted }]"
            >
              <td class="entity-border-left" @dblclick.stop>
                <div class="th-checkbox">
                  <input
                    class="checkbox-select-row"
                    type="checkbox"
                    @click="checkRow(item.ReceiptId)"
                    :checked="checkRow().includes(item.ReceiptId)"
                  />
                </div>
              </td>
              <td class="text-center col-width-150">
                {{ helperCommon.formatDate(item.AccountingDate) }}
              </td>
              <td class="text-center col-width-150">
                {{ helperCommon.formatDate(item.ReceiptDate) }}
              </td>
              <td class="col-width-120 color-blue" :title="item.ReceiptNumber">
                <span @click="onViewFormDetail(item)">{{ item.ReceiptNumber }}</span>
              </td>
              <td
                class="text-right col-width-150"
                :title="item.TotalMoney"
                :class="{ 'color-money-red': item.TotalMoney < 0 }"
              >
                {{ helperCommon.formatCurrency(item.TotalMoney) }}
              </td>
              <td class="col-width-250" :title="item.Reason">
                {{ item.Reason }}
              </td>
              <td class="col-width-150" :title="item.ProviderName">
                {{ item.ProviderName }}
              </td>
              <td class="col-width-120" :title="item.ProviderId">
                {{ item.ProviderCode }}
              </td>
              <td class="col-width-350" :title="item.Address">
                {{ item.Address }}
              </td>
              <td class="text-center entity-border-right e-birthday function-table" @dblclick.stop>
                <span @click="onViewFormDetail(item)" style="font-weight: 500">
                  {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.view }}
                </span>
                <div class="function-table-content" @click="onOpenFeatureMenu($event, item)">
                  <div class="function-icon-table function-icon-select"></div>
                </div>
              </td>
            </tr>
            <tr class="tr-last-child">
              <td></td>
              <td class="text-center">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.total }}
              </td>
              <td colspan="2"></td>
              <td class="text-right" :class="{ 'color-money-red': totalAmount < 0 }">
                {{ helperCommon.formatCurrency(totalAmount) }}
              </td>
              <td colspan="4"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <teleport to="#app">
          <div
            class="menu-function-select"
            v-show="isShowColFeature"
            :style="{
              left: `${this.positionFeatureMenu.left}px`,
              top: `${this.positionFeatureMenu.top}px`,
            }"
          >
            <template v-if="!this.selectedReceipt.IsNoted">
              <div @click="toggleNote">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.note }}
              </div>
              <div @click="onDeleteReceipt">
                {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DELETE }}
              </div>
              <div @click="onDupliCateReceipt">
                {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.DUPLICATE }}
              </div>
            </template>
            <template v-if="this.selectedReceipt.IsNoted">
              <div @click="toggleNote">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.unNote }}
              </div>
              <div @click="onDupliCateReceipt">
                {{ this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.duplicate }}
              </div>
            </template>
          </div>
        </teleport>
        <img
          v-show="isShowLoadding && this.dataTable.TotalRecord !== undefined"
          class="loading"
          :class="{ 'loadding-form-detail': isShowFormDetail }"
          src="../../../assets//img/loading.svg"
          alt="loading"
        />
        <div v-if="!this.dataTable.TotalRecord || this.dataTable.TotalRecord === 0" class="no-data">
          {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.NO_DATA }}
        </div>
      </div>
      <div id="pagination" class="pagination">
        <p>
          {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.TOTAL }}:
          <b>{{ this.dataTable.TotalRecord ? this.dataTable.TotalRecord : 0 }}</b>
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
                  :class="{
                    'active-record-item': indexSelectedRecord === index,
                  }"
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
    </div>
    <div v-if="isOverlay" id="container-overlay" class="container-overlay" @closeFormDetail="onCloseFormDetail"></div>
    <PaymentDetail
      v-if="isShowFormDetail"
      @closeFormDetail="onCloseFormDetail"
      :receiptSelected="receiptUpdate"
      :statusFormMode="isStatusFormMode"
    ></PaymentDetail>
    <!-- dialog employee confirm delete -->
    <misa-dialog-confirm-delete
      :isDeleteMultiple="isDeleteMultipleDialog"
      :contentDeleteMultiple="this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.contentDeleteMultiple"
      :contentDelete="`${
        this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.contentDelete
      }${receiptNumberDeleteSelected}${this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.END}`"
      v-if="isShowDialogConfirmDelete"
    ></misa-dialog-confirm-delete>
    <!-- dialog employee input data not blank -->
    <misa-dialog-error
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      :title="titleDialogError"
    ></misa-dialog-error>
    <!-- toast message -->
    <misa-toast-success v-if="isShowToastMessage" :contentToast="contentToastSuccess"></misa-toast-success>
  </div>
</template>

<script>
import PaymentDetail from "../payment_detail/PaymentDetail.vue";
import helperCommon from "@/scripts/helper.js";
import receiptService from "@/services/receipt.js";

export default {
  name: "ReceiptPayment",

  components: {
    PaymentDetail,
  },

  async created() {
    // Gọi hàm lấy dữ liệu danh sách phiếu thu/chi
    this.dataTable = await this.getListReceipt(20, 1, "", this.statusFilter);
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
    this.$_MISAEmitter.on("refreshDataTable", async () => {
      this.statusFilter = null;
      this.dataTable = await this.getListReceipt(20, 1, "", this.statusFilter);
    });
    this.$_MISAEmitter.on("confirmYesDeleteEntity", async () => {
      await this.btnConfirmYesDeleteReceipt();
    });
    this.$_MISAEmitter.on("confirmNoDeleteEntity", () => {
      this.btnConfirmNoDeleteReceipt();
    });
    this.$_MISAEmitter.on("confirmYesDeleteMultiple", async () => {
      await this.btnConfirmYesDeleteMultipleReceipt();
    });
    this.$_MISAEmitter.on("closeToastMessage", () => {
      this.isShowToastMessage = false;
    });

    this.$_MISAEmitter.on("closeDialogError", () => {
      this.onCloseDialogDataError();
    });
  },

  mounted() {
    // Lắng nghe sự kiện click trên toàn bộ màn hình
    window.addEventListener("click", this.handleClickOutsidePaging);
    window.addEventListener("click", this.handleClickOutsideDeleteMulti);
    window.addEventListener("click", this.handleClickOutsideFeature);
  },

  data() {
    return {
      // Biến quy định trạng thái hiển thị menu item tất cả
      isShowFilterReceipt: false,
      // Biến quy định text trong button tất cả
      textFilterReceipt: this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.all,
      // select option filter
      optionFilterReceipt: this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.optionReceipt,
      // Biến quy định trạng thái hiển thị menu insert
      isShowMenuInsert: false,
      // Khai báo biến quy định trạng thái hiển thị của form chi tiết
      isShowFormDetail: false,
      // Khai báo biến quy định trạng thái hiển thị overlay
      isOverlay: false,
      // Khai báo biến quy định trạng thái hiển thị của các chức năng ở cột cuối của table
      isShowColFeature: false,
      // Khai báo biến quy định trạng thái hiển thị của các item select paging
      isShowPaging: false,
      // Khai báo biến kiểm tra xem form chi tiết đang ở trạng thái thêm hay sửa
      isStatusFormMode: this.$_MISAEnum.FORM_MODE.Add,
      // Khai báo trạng thái hiển thị của toast message
      isShowToastMessage: false,
      // Khai báo dữ liệu duyệt trên 1 trang table
      dataTable: [],
      // Khai báo 1 phiếu chi được chọn để xử lí hàm sửa
      receiptUpdate: {},
      // Khai báo số bản ghi mặc định được hiển thi trên table
      selectedRecord: this.$_MISAEnum.RECORD.RECORD_DEFAULT,
      // Khai báo list số bản ghi có thể lựa chọn để hiển thị trên trang
      recordOptions: this.$_MISAEnum.RECORD.RECORD_OPTIONS,
      // Khai báo ReceiptId của phiếu chi cần xóa
      receiptIdDeleteSelected: "",
      // Khai báo ReceiptNumber của phiếu chi cần xóa
      receiptNumberDeleteSelected: "",
      // Khai báo biến quy định trạng thái ẩn hiển dialog confirm delete
      isShowDialogConfirmDelete: false,
      // Khai báo biến lưu nội dung của toast message
      contentToastSuccess: "",
      // Tái sử dụng hàm formatDate trong helperCommon
      helperCommon: helperCommon,
      // Khai báo biến lưu nội dung tìm kiếm
      textSearch: "",
      // Khai báo trang hiện tại trong phân trang
      currentPage: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo số trang tối đa hiển thị trong phân trang
      maxVisiblePages: this.$_MISAEnum.RECORD.MAX_VISIBLE_PAGE,
      // Khai báo biến quy định trạng thái hiển thị loadding
      isShowLoadding: false,
      // Khai báo biến lưu chỉ số index được chọn trong paging
      indexSelectedRecord: this.$_MISAEnum.RECORD.INDEX_SELECTED_DEFAULT,
      // Khai báo biến quy định sau 1 khoảng thời gian mới bắt đầu tìm kiếm
      searchReceiptTimeout: null,
      // Khai báo biến quy định trạng thái hiển thị của menu thực hiện hàng loạt
      isShowMenuExcuteBatch: false,
      // Khai báo biến lưu danh sách id cần xóa
      ids: [],
      // Khai báo biến kiểm tra xem dialog hiển thị hỏi xóa ít hay xóa nhiều
      isDeleteMultipleDialog: null,
      // Khai báo biến tùy chỉnh top, left cho feature menu
      positionFeatureMenu: {},
      // Khai báo biến lưu receipt khi bấm vào col feature
      selectedReceipt: {},
      // Biến quy định trạng thái hiện thị dialog data not null
      isShowDialogDataNotNull: false,
      // Biến lưu tiêu đề dialog data not null
      titleDialogError: null,
      // Biến lưu nội dung lỗi dialog data not null
      dataNotNull: [],
      // Biến lưu trạng thái lọc theo điều kiện thu/chi/tất cả
      statusFilter: null,
    };
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
     * Mô tả: Nếu đang ở trang đầu thì button prev không hoạt động
     * created by : BNTIEN
     * created date: 27-06-2023 11:19:25
     */
    isFirstPage() {
      return this.currentPage === this.$_MISAEnum.RECORD.CURRENT_PAGE;
    },
    /**
     * Mô tả: Nếu đang ở trang cuối thì button next không hoạt động
     * created by : BNTIEN
     * created date: 27-06-2023 11:19:25
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
     * created date: 04-06-2023 02:49:32
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
    /**
     * Mô tả: Kiểm tra xem button thực hiện hàng loạt có ở trạng thái disable hay không
     * created by : BNTIEN
     * created date: 27-06-2023 23:26:41
     */
    isDisableExcuteBatch() {
      return this.ids.length < 2;
    },
    /**
     * Mô tả: Kiểm tra list ids chứa tất cả id trong dataTable hay không
     * created by : BNTIEN
     * created date: 28-06-2023 08:41:29
     */
    isCheckAll() {
      if (!this.dataTable.Data) return false;
      if (this.dataTable.Data.length == 0) return false;
      for (let i = 0; i < this.dataTable.Data.length; i++) {
        if (!this.ids.includes(this.dataTable.Data[i].ReceiptId)) {
          return false;
        }
      }
      return true;
    },
    /**
     * Mô tả: Tính toán tổng tiền trong table
     * created by : BNTIEN
     * created date: 04-08-2023 05:59:39
     */
    totalAmount() {
      if (this.dataTable.Data) {
        return this.dataTable.Data.map((x) => x.TotalMoney).reduce((total, current) => total + current, 0);
      }
      return 0;
    },
  },

  methods: {
    /**
     * Mô tả: Hàm lấy dữ liệu phiếu thu/chi từ api
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:20
     */
    async getListReceipt(selectedRecord, currentPage, textSearch, keyFilter) {
      try {
        this.isShowLoadding = true;
        const resfilter = await receiptService.getFilter(selectedRecord, currentPage, textSearch, keyFilter);
        this.isShowLoadding = false;
        return resfilter.data;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiên load lại toàn bộ dữ liệu khi click vào icon refresh
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:31
     */
    async refreshData() {
      this.selectedRecord = this.$_MISAEnum.RECORD.RECORD_DEFAULT;
      this.indexSelectedRecord = this.$_MISAEnum.RECORD.INDEX_SELECTED_DEFAULT;
      this.textSearch = "";
      this.statusFilter = null;
      this.dataTable = await this.getListReceipt(20, 1, "", this.statusFilter);
    },
    /**
     * Mô tả: Hàm xử lí sự kiên mở form chi tiết khi click vào button thêm mới phiếu chi
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:01
     */
    btnOpenFormDetail() {
      this.isShowFormDetail = true;
      this.isOverlay = true;
      this.receiptUpdate.ReceiptNumber = "";
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
      this.receiptUpdate = {};
      this.refreshData();
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng mở các menu feature ở cột cuối của table khi click vào icon drop
     * created by : BNTIEN
     * created date: 29-05-2023 07:48:54
     */
    onOpenFeatureMenu(e, receipt) {
      try {
        // chặn sự liện lan ra các phần tử cha
        e.stopPropagation();
        this.selectedReceipt = receipt;
        this.isShowColFeature = true;
        const positionIcon = e.target.getBoundingClientRect();
        const left = positionIcon.right - 110;
        let top = 0;
        if (positionIcon.bottom > 500) {
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
     * Mô tả: Hàm xử lí sự kiện đóng mở lựa chọn số phần tử hiển thị trên 1 trang trong table
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:05
     */
    onShowSelectPaging() {
      this.isShowPaging = !this.isShowPaging;
    },
    /**
     * Mô tả: Hàm xử lí xem thông tin phiếu chi
     * created by : BNTIEN
     * created date: 29-05-2023 07:49:56
     */
    onViewFormDetail(receipt) {
      if (receipt.ReceiptType == true) {
        this.receiptUpdate = receipt;
        this.isShowFormDetail = true;
        this.isOverlay = true;
        this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.View;
      }
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
    onSelectedRecord(record, index) {
      this.selectedRecord = record;
      this.indexSelectedRecord = index;
      this.currentPage = this.$_MISAEnum.RECORD.CURRENT_PAGE;
      this.updateDataTable();
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào item xóa phiếu chi thì hiển thị dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 29-05-2023 07:50:15
     */
    onDeleteReceipt() {
      this.isShowDialogConfirmDelete = true;
      this.isDeleteMultipleDialog = false;
      this.isOverlay = true;
      this.receiptIdDeleteSelected = this.selectedReceipt.ReceiptId;
      this.receiptNumberDeleteSelected = this.selectedReceipt.ReceiptNumber;
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng xác nhận xóa 1 phiếu chi
     * created by : BNTIEN
     * created date: 28-05-2023 21:09:01
     */
    async btnConfirmYesDeleteReceipt() {
      try {
        this.isShowLoadding = true;
        const res = await receiptService.delete(this.receiptIdDeleteSelected);
        this.isShowLoadding = false;
        this.isShowDialogConfirmDelete = false;
        this.isOverlay = false;
        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) && res.data > 0) {
          this.isDeleteMultipleDialog = false;
          this.contentToastSuccess = this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_DELETE;
          this.onShowToastMessage();
          this.dataTable = await this.getListReceipt(20, 1, "", null);
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào button không trong dialog xác nhận xóa
     * created by : BNTIEN
     * created date: 29-05-2023 07:51:41
     */
    btnConfirmNoDeleteReceipt() {
      this.isShowDialogConfirmDelete = false;
      this.isDeleteMultipleDialog = false;
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
     * Mô tả: Hàm nhân bản 1 phiếu chi
     * created by : BNTIEN
     * created date: 28-06-2023 13:59:30
     */
    onDupliCateReceipt() {
      try {
        this.selectedReceipt.IsNoted = false;
        this.receiptUpdate = this.selectedReceipt;
        this.isShowFormDetail = true;
        this.isOverlay = true;
        this.isStatusFormMode = this.$_MISAEnum.FORM_MODE.Add;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm tìm kiếm phiếu chi
     * created by : BNTIEN
     * created date: 04-06-2023 00:20:21
     */
    async onSearchReceipt() {
      try {
        this.currentPage = this.$_MISAEnum.RECORD.CURRENT_PAGE;
        if (!this.textSearch.trim()) {
          this.textSearch = "";
        }
        this.isShowLoadding = true;
        const filtered = await receiptService.getFilter(
          this.selectedRecord,
          this.currentPage,
          this.textSearch.trim(),
          this.statusFilter
        );
        this.isShowLoadding = false;
        this.dataTable = filtered.data;
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Tự động tìm kiếm sau 1 khoảng thời gian người dùng không nhập dữ liệu
     * created by : BNTIEN
     * created date: 27-06-2023 11:44:30
     */
    async autoSearch() {
      try {
        clearTimeout(this.searchReceiptTimeout);
        this.searchReceiptTimeout = setTimeout(async () => {
          await this.onSearchReceipt();
        }, 500);
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
        this.isShowLoadding = true;
        const resfilter = await receiptService.getFilter(
          this.selectedRecord,
          this.currentPage,
          this.textSearch.trim(),
          null
        );
        this.isShowLoadding = false;
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
     * Mô tả: xử lí sự kiện khi người dùng click ra ngoài select paging
     * created by : BNTIEN
     * created date: 08-06-2023 04:50:25
     */
    handleClickOutsidePaging(event) {
      if (!this.$refs.PagingMenu.contains(event.target)) {
        this.isShowPaging = false;
      }
    },

    /**
     * Mô tả: xử lí sự kiện click ra ngoài menu thực hiện hàng loạt
     * created by : BNTIEN
     * created date: 30-06-2023 21:53:38
     */
    handleClickOutsideDeleteMulti(event) {
      if (!this.$refs.DeleteMulti.contains(event.target)) {
        this.isShowMenuExcuteBatch = false;
      }
    },

    /**
     * Mô tả: xử lí sự kiện click ngoài menu feature
     * created by : BNTIEN
     * created date: 03-07-2023 00:03:06
     */
    handleClickOutsideFeature() {
      this.isShowColFeature = false;
    },

    /**
     * Mô tả: Hàm ẩn hiện menu thực hiện hàng loạt
     * created by : BNTIEN
     * created date: 27-06-2023 23:37:04
     */
    onShowExcuteBatch() {
      this.isShowMenuExcuteBatch = !this.isShowMenuExcuteBatch;
    },

    /**
     * Mô tả: Hàm kiểm tra xem checkbox từng hàng đã chọn chưa, nếu rồi thì bỏ chọn và ngược lại
     * created by : BNTIEN
     * created date: 28-06-2023 09:30:13
     */
    checkRow(id) {
      try {
        if (!id) return this.ids;
        if (this.ids.includes(id)) {
          this.ids.splice(this.ids.indexOf(id), 1);
          return this.ids;
        }
        this.ids.push(id);
        return this.ids;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí hàm chọn tất cả ở ô checkbox thead
     * created by : BNTIEN
     * created date: 28-06-2023 09:31:07
     */
    checkAllSelect() {
      try {
        if (this.isCheckAll) {
          this.dataTable.Data.map((item) => {
            if (this.ids.includes(item.ReceiptId)) {
              this.ids.splice(this.ids.indexOf(item.ReceiptId), 1);
            }
          });
        } else {
          if (this.dataTable.Data) {
            this.dataTable.Data.map((item) => {
              if (!this.ids.includes(item.ReceiptId)) {
                this.ids.push(item.ReceiptId);
              }
            });
          }
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hiển thị form xác nhận xóa nhiều
     * created by : BNTIEN
     * created date: 28-06-2023 10:34:10
     */
    onShowDialogDeleteMulti() {
      this.isShowDialogConfirmDelete = !this.isShowDialogConfirmDelete;
      this.isOverlay = true;
      this.isDeleteMultipleDialog = true;
    },
    /**
     * Mô tả: Hàm thực hiện xóa nhiều phiếu chi theo list id đã chọn
     * created by : BNTIEN
     * created date: 28-06-2023 09:36:08
     */
    async btnConfirmYesDeleteMultipleReceipt() {
      try {
        this.isShowLoadding = true;
        // Lấy các chứng từ không xóa được (đã ghi sổ) để thông báo
        const receiptNoDelete = this.dataTable.Data.filter((row) => row.IsNoted && this.ids.includes(row.ReceiptId));
        const res = await receiptService.deleteMutiple(this.ids);
        this.isShowLoadding = false;
        this.isShowDialogConfirmDelete = false;
        this.isOverlay = false;

        if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status)) {
          if (res.data == this.ids.length) {
            this.contentToastSuccess = this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_DELETE;
            this.onShowToastMessage();
            this.ids = [];
          } else if (res.data < this.ids.length) {
            this.dataNotNull.push(
              `${this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.numberReceiptHandle} ${
                this.ids.length
              }`
            );
            this.dataNotNull.push(
              `${this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.numberReceiptSuccess} ${
                res.data
              }`
            );
            this.dataNotNull.push(
              `${this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.numberReceiptNotSuccess} ${
                this.ids.length - res.data
              }`
            );
            if (receiptNoDelete && receiptNoDelete.length > 0) {
              const receiptNumbers = receiptNoDelete.map((row) => row.ReceiptNumber);
              this.dataNotNull.push(
                `${
                  this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.recetptNoted
                } ${receiptNumbers.join(", ")}, ${
                  this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.pleaseCheck
                }`
              );
            }
            this.titleDialogError =
              this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.titleResultHandleReceipt;
            this.isShowDialogDataNotNull = true;
            this.isOverlay = true;
          }
        }

        this.dataTable = await this.getListReceipt(20, 1, "", null);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Lọc theo phiếu thu/chi
     * created by : BNTIEN
     * created date: 06-08-2023 17:15:49
     */
    async selectFilter(index) {
      try {
        this.isShowFilterReceipt = false;
        this.textFilterReceipt = this.optionFilterReceipt[index];
        if (index == 0) {
          this.statusFilter = null;
        } else if (index == 1) {
          this.statusFilter = false;
        } else if (index == 2) {
          this.statusFilter = true;
        }
        this.dataTable = await this.getListReceipt(
          this.selectedRecord,
          this.currentPage,
          this.textSearch,
          this.statusFilter
        );
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Đóng dialog data not null
     * created by : BNTIEN
     * created date: 06-08-2023 20:04:33
     */
    onCloseDialogDataError() {
      this.dataNotNull = [];
      this.isShowDialogDataNotNull = false;
      this.isOverlay = false;
    },

    /**
     * Mô tả: toggle ghi sổ/ bỏ ghi
     * created by : BNTIEN
     * created date: 06-08-2023 17:20:39
     */
    async toggleNote() {
      try {
        await receiptService.updateNote(this.selectedReceipt);
        await this.refreshData();
      } catch (error) {
        this.dataNotNull.push(error.Data);
        this.titleDialogError =
          this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.FORM_PAYMENT.freeText.noteNotSuccess;
        this.isShowDialogDataNotNull = true;
        this.isOverlay = true;
      }
    },

    /**
     * Mô tả: Xử lí xuất dữ liệu ra excel
     * created by : BNTIEN
     * created date: 08-08-2023 16:06:47
     */
    async exportData() {
      try {
        this.isShowLoadding = true;
        await receiptService.exportData(this.textSearch, this.statusFilter);
        this.isShowLoadding = false;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Bỏ ghi các phiếu đã ghi sổ
     * created by : BNTIEN
     * created date: 09-08-2023 05:38:21
     */
    async onUnNote() {
      try {
        if (this.ids && this.ids.length > 0) {
          const res = await receiptService.updateMultipleNote(this.ids, false);
          if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) && res.data > 0) {
            this.contentToastSuccess =
              this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.LIST_RECEIPT.freeText.unNoteSuccess;
            this.onShowToastMessage();
            this.dataTable = await this.getListReceipt(20, 1, "", null);
          }
        }
      } catch {
        return;
      }
    },
  },

  beforeUnmount() {
    // Hủy các sự kiện đã đăng kí
    this.$_MISAEmitter.off("onShowToastMessage");
    this.$_MISAEmitter.off("onShowToastMessageUpdate");
    this.$_MISAEmitter.off("setFormModeAdd");
    this.$_MISAEmitter.off("refreshDataTable");
    this.$_MISAEmitter.off("confirmYesDeleteEntity");
    this.$_MISAEmitter.off("confirmNoDeleteEntity");
    this.$_MISAEmitter.off("confirmYesDeleteMultiple");
    this.$_MISAEmitter.off("closeToastMessage");
    this.$_MISAEmitter.off("closeDialogError");
    window.removeEventListener("click", this.handleClickOutsidePaging);
    window.removeEventListener("click", this.handleClickOutsideDeleteMulti);
    window.removeEventListener("click", this.handleClickOutsideFeature);
  },
};
</script>

<style scoped>
@import url(./ReceiptPayment.css);

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

.no-disable {
  border: 1px solid black;
}

.no-disable:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

.checkedRow {
  background-color: #f9ecca;
}

.checkedRow td:first-child,
.checkedRow td:last-child {
  background-color: #f9ecca;
}

.loadding-form-detail {
  left: 50%;
}

.no-data {
  position: fixed;
  top: 50%;
  left: 50%;
}

#receipt-payment .menu-function-select {
  width: 60px;
}

.unNoted {
  color: var(--color-btn-default);
}

.color-blue {
  color: #007aff;
}

.color-blue span:hover {
  text-decoration: underline;
}

.color-money-red {
  color: red;
}
</style>
