<template>
  <div class="main-cash">
    <div class="main-cash-left">
      <div class="main-cash-content">
        <div class="main-cash-content-title">{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.title }}</div>
        <div class="main-cash-content-body">
          <div class="receive">
            <div class="title-button">{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.receive }}</div>
            <div class="menu-process">
              <div class="menu-item-process" v-for="(item, index) in receiveMenu" :key="index">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="payment">
            <div class="title-button">{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.payment }}</div>
            <div class="menu-process">
              <div class="menu-item-process" v-for="(item, index) in paymentMenu" :key="index">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="audit">
            <div class="title-button">{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.audit }}</div>
            <div class="menu-process">
              <div class="menu-item-process" v-for="(item, index) in auditMenu" :key="index">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-cash-action">
        <a class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="customer-icon"></div>
          </div>
          <div class="cash-action-item-text">
            {{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.customer }}
          </div>
        </a>
        <router-link to="/provider" class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="provider-icon"></div>
          </div>
          <div class="cash-action-item-text">
            {{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.provider }}
          </div>
        </router-link>
        <router-link to="/employee" class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="employee-green-icon"></div>
          </div>
          <div class="cash-action-item-text">
            {{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.employee }}
          </div>
        </router-link>
        <a class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="option-icon"></div>
          </div>
          <div class="cash-action-item-text">{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.main.option }}</div>
        </a>
      </div>
    </div>
    <div class="main-cash-right">
      <div class="main-cash-right-title">{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.right.title }}</div>
      <div class="main-cash-right-content">
        <div class="cash-right-content-item">
          <li>
            <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.right.balanceByDay }}</a>
          </li>
        </div>
        <div class="cash-right-content-item">
          <li>
            <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.right.cashFlow }}</a>
          </li>
        </div>
        <div class="cash-right-content-item">
          <li>
            <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.right.cashCollectionDiary }}</a>
          </li>
        </div>
        <div class="cash-right-content-item">
          <li>
            <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.right.detailAccounting }}</a>
          </li>
        </div>
        <div class="cash-right-content-item">
          <li>
            <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.right.cashPaymentDiary }}</a>
          </li>
        </div>
      </div>
      <div class="main-cash-right-footer">
        <a>{{ this.$_MISAResource[this.$_LANG_CODE].CASH.process.right.allReport }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CashProcess",

  data() {
    return {
      // Danh sách menu thu tiền
      receiveMenu: this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.PROCESS.receiveMenu,
      // Danh sách menu chi tiền
      paymentMenu: this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.PROCESS.paymentMenu,
      // Danh sách menu kiểm kê quỹ
      auditMenu: this.$_MISAResource[this.$_LANG_CODE].RECEIPT_PAYMENT.PROCESS.auditMenu,
    };
  },
};
</script>

<style scoped>
@import url(./CashProcess.css);
</style>
