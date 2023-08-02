<template>
  <div class="main-cash">
    <div class="main-cash-left">
      <div class="main-cash-content">
        <div class="main-cash-content-title">NGHIỆP VỤ TIỀN MẶT</div>
        <div class="main-cash-content-body"></div>
      </div>
      <div class="main-cash-action">
        <a class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="customer-icon"></div>
          </div>
          <div class="cash-action-item-text">Khách hàng</div>
        </a>
        <router-link to="/provider" class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="provider-icon"></div>
          </div>
          <div class="cash-action-item-text">Nhà cung cấp</div>
        </router-link>
        <router-link to="/employee" class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="employee-green-icon"></div>
          </div>
          <div class="cash-action-item-text">Nhân viên</div>
        </router-link>
        <a class="cash-acction-item">
          <div class="cash-acction-item-icon">
            <div class="option-icon"></div>
          </div>
          <div class="cash-action-item-text">Tùy chọn</div>
        </a>
      </div>
    </div>
    <div class="main-cash-right">
      <div class="main-cash-right-title">BÁO CÁO</div>
      <div class="main-cash-right-content">
        <div class="cash-right-content-item">
          <li><a>Bảng kê số dư tiền theo ngày</a></li>
        </div>
        <div class="cash-right-content-item">
          <li><a>Dòng tiền</a></li>
        </div>
        <div class="cash-right-content-item">
          <li><a>S03a1-DN: Sổ nhật ký thu tiền</a></li>
        </div>
        <div class="cash-right-content-item">
          <li><a>Sổ kế toán chi tiết quỹ tiền mặt</a></li>
        </div>
        <div class="cash-right-content-item">
          <li><a>S03a2-DN: Sổ nhật ký chi tiền</a></li>
        </div>
      </div>
      <div class="main-cash-right-footer"><a>Tất cả báo cáo</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CashProcess",
};
</script>

<style scoped>
@import url(./CashProcess.css);
</style>
