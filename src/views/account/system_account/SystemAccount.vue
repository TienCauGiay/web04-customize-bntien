<template>
  <div class="content-title">
    <h1>Hệ thống tài khoản</h1>
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
          placeholder="Tìm kiếm theo số, tên tài khoản"
          name="search-account"
          v-model="textSearch"
          @keydown.enter="onSearchEmployee"
          @input="autoSearch"
        />
        <div class="search-icon icon-tb" @click="onSearchEmployee"></div>
      </div>
      <div class="extend-account">Mở rộng</div>
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
        <div class="utilities-text">Chuyển tài khoản hạch toán</div>
        <div class="function-icon-disable"></div>
        <div class="utilities-synchronized" v-if="isShowUtilities">
          {{
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
              .UTILITIES_SYNCHRONIZED
          }}
        </div>
      </div>
      <div class="insert-data">
        <misa-button-default
          :textButtonDefault="
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.ADD_EMPLOYEE
          "
          @click="btnOpenFormDetail"
        ></misa-button-default>
        <misa-button-icon></misa-button-icon>
      </div>
    </div>
    <div class="list-entity"></div>
    <div class="pagination">
      <p>
        {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.TOTAL }}:
        <b>0</b>
        {{ this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.RECORD }}
      </p>
      <div class="pagination-detail">
        <div
          class="pagination-detail-pagesize"
          :class="{ 'active-record': isShowPaging }"
          ref="PagingMenu"
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
                @click="onSelectedRecord(record, index)"
                :class="{ 'active-record-item': indexSelectedRecord === index }"
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
            <button
              @click="
                goToPage(
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE
                    .PREVIOUS
                )
              "
              :disabled="isFirstPage"
            >
              {{
                this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGING_PRE
              }}
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
              @click="
                goToPage(
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGE.NEXT
                )
              "
              :disabled="isLastPage"
            >
              {{
                this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.PAGING_NEXT
              }}
            </button>
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
    <SystemAccountDetail
      v-if="isShowFormDetail"
      @closeFormDetail="onCloseFormDetail"
      :employeeSelected="employeeUpdate"
      :statusFormMode="isStatusFormMode"
    ></SystemAccountDetail>
  </div>
</template>

<script>
import SystemAccountDetail from "../system_account_detail/SystemAccountDetail.vue";

export default {
  name: "SystemAccount",

  components: {
    SystemAccountDetail,
  },

  data() {
    return {
      // Khai báo biến quy định trạng thái hiển thị overlay
      isOverlay: true,
      // Khai báo biến quy định trang thái hiển thị form detail
      isShowFormDetail: true,
    };
  },

  methods: {
    /**
     * Mô tả: Hàm mở form detail
     * created by : BNTIEN
     * created date: 18-07-2023 08:35:50
     */
    btnOpenFormDetail() {
      this.isOverlay = true;
      this.isShowFormDetail = true;
    },
  },
};
</script>

<style scoped>
@import url(./SystemAccount.css);
</style>
