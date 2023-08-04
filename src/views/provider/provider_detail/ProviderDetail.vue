<template>
  <div
    id="detail-info-provider"
    class="position-display-center"
    ref="FormDetailProvider"
  >
    <div class="form-detail-toolbar">
      <div
        class="question-icon icon-tb"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.HELP"
      ></div>
      <div
        @click="onCloseFormDetail"
        class="close-icon icon-tb"
        @keydown.tab.prevent="resetTab($event.target.value)"
        :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.EXIST"
      ></div>
    </div>
    <div class="form-detail-main">
      <div class="provider-title">
        <p>
          <b>Thông tin nhà cung cấp</b>
        </p>
        <div class="entity-check">
          <input
            type="radio"
            name="typeObject"
            :checked="!this.provider.IsPersonal"
            @click="handleClickInstitute"
          />
          <span>Tổ chức</span>
        </div>
        <div class="entity-check">
          <input
            type="radio"
            name="typeObject"
            :checked="this.provider.IsPersonal"
            @click="handleClickPersonal"
          />
          <span>Cá nhân</span>
        </div>
        <div class="entity-check" id="provider-title-input-checkbox">
          <input
            type="checkbox"
            :checked="provider.IsCustomer"
            @click="toggleCheckboxCustomer"
          />
          <span>Là khách hàng</span>
        </div>
      </div>
      <div class="form-detail-content">
        <!-- Là tổ chức -->
        <template v-if="!this.provider.IsPersonal">
          <div class="half-content">
            <div class="col-md-n">
              <label> Mã số thuế </label>
              <div class="container-input">
                <misa-input
                  v-model="provider.TaxCode"
                  ref="TaxCode"
                  :class="{ 'border-red': isBorderRed.TaxCode }"
                  @input="setIsBorderRed('TaxCode')"
                  @mouseenter="isHovering.TaxCode = true"
                  @mouseleave="isHovering.TaxCode = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="isHovering.TaxCode && isBorderRed.TaxCode"
                >
                  {{ errors["TaxCode"] }}
                </div>
              </div>
            </div>
            <div class="col-md-tb">
              <label>
                Mã nhà cung cấp
                <span class="s-require">*</span>
              </label>
              <div class="container-input">
                <misa-input
                  ref="ProviderCode"
                  v-model="provider.ProviderCode"
                  :class="{ 'border-red': isBorderRed.ProviderCode }"
                  @input="setIsBorderRed('ProviderCode')"
                  @mouseenter="isHovering.ProviderCode = true"
                  @mouseleave="isHovering.ProviderCode = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="
                    isHovering.ProviderCode &&
                    (isBorderRed.ProviderCode || !provider.ProviderCode) &&
                    errors['ProviderCode']
                  "
                >
                  {{ errors["ProviderCode"] }}
                </div>
              </div>
            </div>
          </div>
          <div class="half-content">
            <div class="col-md-n">
              <label>Điện thoại</label>
              <div class="container-input">
                <misa-input
                  v-model="provider.PhoneNumber"
                  ref="PhoneNumber"
                  :class="{ 'border-red': isBorderRed.PhoneNumber }"
                  @input="setIsBorderRed('PhoneNumber')"
                  @mouseenter="isHovering.PhoneNumber = true"
                  @mouseleave="isHovering.PhoneNumber = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="isHovering.PhoneNumber && isBorderRed.PhoneNumber"
                >
                  {{ errors["PhoneNumber"] }}
                </div>
              </div>
            </div>
            <div class="col-md-tb">
              <label> Website </label>
              <div class="container-input">
                <misa-input
                  v-model="provider.Website"
                  ref="Website"
                  :class="{ 'border-red': isBorderRed.Website }"
                  @input="setIsBorderRed('Website')"
                  @mouseenter="isHovering.Website = true"
                  @mouseleave="isHovering.Website = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="isHovering.Website && isBorderRed.Website"
                >
                  {{ errors["Website"] }}
                </div>
              </div>
            </div>
          </div>
          <div class="half-content">
            <div class="col-md-l">
              <label>
                Tên nhà cung cấp
                <span class="s-require">*</span>
              </label>
              <div class="container-input">
                <misa-input
                  ref="ProviderName"
                  v-model="provider.ProviderName"
                  :class="{ 'border-red': isBorderRed.ProviderName }"
                  @input="setIsBorderRed('ProviderName')"
                  @mouseenter="isHovering.ProviderName = true"
                  @mouseleave="isHovering.ProviderName = false"
                ></misa-input>
                <div
                  class="misa-tooltip"
                  v-if="
                    isHovering.ProviderName &&
                    (isBorderRed.ProviderName || !provider.ProviderName) &&
                    errors['ProviderName']
                  "
                >
                  {{ errors["ProviderName"] }}
                </div>
              </div>
            </div>
          </div>
          <div class="half-content" id="group-provider">
            <div class="col-md-l">
              <label> Nhóm nhà cung cấp </label>
              <misa-combobox-select-multiple
                :listDataSelected="provider.GroupProvider"
                :propCode="'GroupCode'"
                :propId="'GroupId'"
                :propName="'GroupName'"
                :listEntitySearchCBB="listGroupSearch"
              ></misa-combobox-select-multiple>
            </div>
          </div>
          <div class="half-content-2">
            <div class="col-md-l">
              <label>Địa chỉ</label>
              <div class="container-input">
                <misa-input-textarea
                  v-model="provider.Address"
                  ref="Address"
                  :class="{ 'border-red': isBorderRed.Address }"
                  @input="setIsBorderRed('Address')"
                  @mouseenter="isHovering.Address = true"
                  @mouseleave="isHovering.Address = false"
                  :placeholder="'VD: Số 82 Duy Tân, Dịch Vọng'"
                ></misa-input-textarea>
                <div
                  class="misa-tooltip"
                  v-if="isHovering.Address && isBorderRed.Address"
                >
                  {{ errors["Address"] }}
                </div>
              </div>
            </div>
          </div>
          <div class="half-content">
            <div class="col-md-l">
              <label>Nhân viên mua hàng</label>
              <misa-combobox-select-single
                :propId="'EmployeeId'"
                :propCode="'EmployeeCode'"
                :propName="'FullName'"
                :haederCBB="['Mã nhân viên', 'Tên nhân viên']"
                :bodyCBB="['EmployeeCode', 'FullName']"
                :isBorderRedCBB="isBorderRed"
                :errorsCBB="errors"
                :entityCBB="provider"
                :listEntitySearchCBB="listEmployeeSearch"
              ></misa-combobox-select-single>
            </div>
          </div>
        </template>
        <!-- Là cá nhân -->
        <div class="half-content" v-if="this.provider.IsPersonal">
          <div class="col-md-tb">
            <label>
              Mã nhà cung cấp
              <span class="s-require">*</span>
            </label>
            <div class="container-input">
              <misa-input
                ref="ProviderCode"
                v-model="provider.ProviderCode"
                :class="{ 'border-red': isBorderRed.ProviderCode }"
                @input="setIsBorderRed('ProviderCode')"
                @mouseenter="isHovering.ProviderCode = true"
                @mouseleave="isHovering.ProviderCode = false"
              ></misa-input>
              <div
                class="misa-tooltip"
                v-if="
                  isHovering.ProviderCode &&
                  (isBorderRed.ProviderCode || !provider.ProviderCode) &&
                  errors['ProviderCode']
                "
              >
                {{ errors["ProviderCode"] }}
              </div>
            </div>
          </div>
          <div class="col-md-n">
            <label> Mã số thuế </label>
            <div class="container-input">
              <misa-input
                v-model="provider.TaxCode"
                ref="TaxCode"
                :class="{ 'border-red': isBorderRed.TaxCode }"
                @input="setIsBorderRed('TaxCode')"
                @mouseenter="isHovering.TaxCode = true"
                @mouseleave="isHovering.TaxCode = false"
              ></misa-input>
              <div
                class="misa-tooltip"
                v-if="isHovering.TaxCode && isBorderRed.TaxCode"
              >
                {{ errors["TaxCode"] }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="half-content"
          id="group-provider"
          v-if="this.provider.IsPersonal"
        >
          <div class="col-md-l">
            <label>Nhóm nhà cung cấp</label>
            <misa-combobox-select-multiple
              :listDataSelected="provider.GroupProvider"
              :propCode="'GroupCode'"
              :propId="'GroupId'"
              :propName="'GroupName'"
              :listEntitySearchCBB="listGroupSearch"
            ></misa-combobox-select-multiple>
          </div>
        </div>
        <div class="half-content" v-if="this.provider.IsPersonal">
          <div class="col-md-n" style="position: relative">
            <label>Tên nhà cung cấp <span class="s-require">*</span> </label>
            <misa-combobox
              :isBorderRedCBB="isBorderRed"
              :entityCBB="provider"
              :errorsCBB="errors"
              :listEntitySearchCBB="listVocative"
              :propName="'Vocative'"
              :propId="'Id'"
              :placeholderInputCBB="'Xưng hô'"
            ></misa-combobox>
          </div>
          <div class="col-md-tb">
            <label class="label-hide-text">a</label>
            <div class="container-input">
              <misa-input
                ref="ProviderName"
                v-model="provider.ProviderName"
                :class="{ 'border-red': isBorderRed.ProviderName }"
                @input="setIsBorderRed('ProviderName')"
                @mouseenter="isHovering.ProviderName = true"
                @mouseleave="isHovering.ProviderName = false"
                :placeholder="'Họ và tên'"
              ></misa-input>
              <div
                class="misa-tooltip"
                v-if="
                  isHovering.ProviderName &&
                  (isBorderRed.ProviderName || !provider.ProviderName) &&
                  errors['ProviderName']
                "
              >
                {{ errors["ProviderName"] }}
              </div>
            </div>
          </div>
        </div>
        <div class="half-content" v-if="this.provider.IsPersonal">
          <div class="col-md-l">
            <label>Nhân viên mua hàng</label>
            <misa-combobox-select-single
              :propId="'EmployeeId'"
              :propCode="'EmployeeCode'"
              :propName="'FullName'"
              :haederCBB="['Mã nhân viên', 'Tên nhân viên']"
              :bodyCBB="['EmployeeCode', 'FullName']"
              :isBorderRedCBB="isBorderRed"
              :errorsCBB="errors"
              :entityCBB="provider"
              :listEntitySearchCBB="listEmployeeSearch"
            ></misa-combobox-select-single>
          </div>
        </div>
        <div class="half-content-2" v-if="this.provider.IsPersonal">
          <div class="col-md-l">
            <label>Địa chỉ</label>
            <div class="container-input">
              <misa-input-textarea
                v-model="provider.Address"
                ref="Address"
                :class="{ 'border-red': isBorderRed.Address }"
                @input="setIsBorderRed('Address')"
                @mouseenter="isHovering.Address = true"
                @mouseleave="isHovering.Address = false"
                :placeholder="'VD: Số 82 Duy Tân, Dịch Vọng'"
              ></misa-input-textarea>
              <div
                class="misa-tooltip"
                v-if="isHovering.Address && isBorderRed.Address"
              >
                {{ errors["Address"] }}
              </div>
            </div>
          </div>
        </div>
        <div class="full-content-2">
          <div class="select-layout">
            <button
              class="select-layout-item"
              @click="handleSelectLayout('infoContact')"
              :class="{ 'active-layout': selectLayout.infoContact }"
            >
              Thông tin liên hệ
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('termPayment')"
              :class="{ 'active-layout': selectLayout.termPayment }"
            >
              Điều khoản thanh toán
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('bankAccount')"
              :class="{ 'active-layout': selectLayout.bankAccount }"
            >
              Tài khoản ngân hàng
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('addressOther')"
              :class="{ 'active-layout': selectLayout.addressOther }"
            >
              Địa chỉ khác
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('note')"
              :class="{ 'active-layout': selectLayout.note }"
            >
              Ghi chú
            </button>
          </div>
          <!-- Là Tổ chức nhưng không là khách hàng -->
          <div
            class="content-select-layout"
            v-if="
              !this.provider.IsPersonal &&
              selectLayout.infoContact &&
              !provider.IsCustomer
            "
          >
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-n" style="position: relative">
                  <label>Người liên hệ</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listVocative"
                    :propName="'Vocative'"
                    :propId="'Id'"
                    :placeholderInputCBB="'Xưng hô'"
                  ></misa-combobox>
                </div>
                <div class="col-md-tb">
                  <label class="label-hide-text">hide</label>
                  <div class="container-input">
                    <misa-input
                      ref="NameContacter"
                      v-model="provider.NameContacter"
                      :class="{ 'border-red': isBorderRed.NameContacter }"
                      @input="setIsBorderRed('NameContacter')"
                      @mouseenter="isHovering.NameContacter = true"
                      @mouseleave="isHovering.NameContacter = false"
                      :placeholder="'Họ và tên'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.NameContacter &&
                        (isBorderRed.NameContacter ||
                          !provider.NameContacter) &&
                        errors['NameContacter']
                      "
                    >
                      {{ errors["NameContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l">
                  <label>Đại diện theo PL</label>
                  <div class="container-input">
                    <misa-input
                      ref="Lawyer"
                      v-model="provider.Lawyer"
                      :class="{ 'border-red': isBorderRed.Lawyer }"
                      @input="setIsBorderRed('Lawyer')"
                      @mouseenter="isHovering.Lawyer = true"
                      @mouseleave="isHovering.Lawyer = false"
                      :placeholder="'Đại diện theo PL'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.Lawyer &&
                        (isBorderRed.Lawyer || !provider.Lawyer) &&
                        errors['Lawyer']
                      "
                    >
                      {{ errors["Lawyer"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-l">
                  <div class="container-input">
                    <misa-input
                      ref="EmailContacter"
                      v-model="provider.EmailContacter"
                      :class="{ 'border-red': isBorderRed.EmailContacter }"
                      @input="setIsBorderRed('EmailContacter')"
                      @mouseenter="isHovering.EmailContacter = true"
                      @mouseleave="isHovering.EmailContacter = false"
                      :placeholder="'Email'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.EmailContacter &&
                        (isBorderRed.EmailContacter ||
                          !provider.EmailContacter) &&
                        errors['EmailContacter']
                      "
                    >
                      {{ errors["EmailContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-tb">
                  <div class="container-input">
                    <misa-input
                      ref="PhoneNumberContacter"
                      v-model="provider.PhoneNumberContacter"
                      :class="{
                        'border-red': isBorderRed.PhoneNumberContacter,
                      }"
                      @input="setIsBorderRed('PhoneNumberContacter')"
                      @mouseenter="isHovering.PhoneNumberContacter = true"
                      @mouseleave="isHovering.PhoneNumberContacter = false"
                      :placeholder="'Số điện thoại'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberContacter &&
                        (isBorderRed.PhoneNumberContacter ||
                          !provider.PhoneNumberContacter) &&
                        errors['PhoneNumberContacter']
                      "
                    >
                      {{ errors["PhoneNumberContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Là Tổ chức và là khách hàng -->
          <div
            class="content-select-layout"
            v-if="
              !this.provider.IsPersonal &&
              selectLayout.infoContact &&
              provider.IsCustomer
            "
          >
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-n" style="position: relative">
                  <label>Người liên hệ</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listVocative"
                    :propName="'Vocative'"
                    :propId="'Id'"
                    :placeholderInputCBB="'Xưng hô'"
                  ></misa-combobox>
                </div>
                <div class="col-md-tb">
                  <label class="label-hide-text">hide</label>
                  <div class="container-input">
                    <misa-input
                      ref="NameContacter"
                      v-model="provider.NameContacter"
                      :class="{ 'border-red': isBorderRed.NameContacter }"
                      @input="setIsBorderRed('NameContacter')"
                      @mouseenter="isHovering.NameContacter = true"
                      @mouseleave="isHovering.NameContacter = false"
                      :placeholder="'Họ và tên'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.NameContacter &&
                        (isBorderRed.NameContacter ||
                          !provider.NameContacter) &&
                        errors['NameContacter']
                      "
                    >
                      {{ errors["NameContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l">
                  <label>Người nhận hóa đơn điện tử</label>
                  <div class="container-input">
                    <misa-input
                      ref="NameReceiver"
                      v-model="provider.NameReceiver"
                      :class="{ 'border-red': isBorderRed.NameReceiver }"
                      @input="setIsBorderRed('NameReceiver')"
                      @mouseenter="isHovering.NameReceiver = true"
                      @mouseleave="isHovering.NameReceiver = false"
                      :placeholder="'Họ và tên'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.NameReceiver &&
                        (isBorderRed.NameReceiver || !provider.NameReceiver) &&
                        errors['NameReceiver']
                      "
                    >
                      {{ errors["NameReceiver"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-l">
                  <div class="container-input">
                    <misa-input
                      ref="EmailContacter"
                      v-model="provider.EmailContacter"
                      :class="{ 'border-red': isBorderRed.EmailContacter }"
                      @input="setIsBorderRed('EmailContacter')"
                      @mouseenter="isHovering.EmailContacter = true"
                      @mouseleave="isHovering.EmailContacter = false"
                      :placeholder="'EmailContacter'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.EmailContacter &&
                        (isBorderRed.EmailContacter ||
                          !provider.EmailContacter) &&
                        errors['EmailContacter']
                      "
                    >
                      {{ errors["EmailContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l">
                  <div class="container-input">
                    <misa-input
                      ref="EmailReceiver"
                      v-model="provider.EmailReceiver"
                      :class="{ 'border-red': isBorderRed.EmailReceiver }"
                      @input="setIsBorderRed('EmailReceiver')"
                      @mouseenter="isHovering.EmailReceiver = true"
                      @mouseleave="isHovering.EmailReceiver = false"
                      :placeholder="'Email (Ngăn cách nhiều Email bởi dấu chấm phẩy)'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.EmailReceiver &&
                        (isBorderRed.EmailReceiver ||
                          !provider.EmailReceiver) &&
                        errors['EmailReceiver']
                      "
                    >
                      {{ errors["EmailReceiver"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-tb">
                  <div class="container-input">
                    <misa-input
                      ref="PhoneNumberContacter"
                      v-model="provider.PhoneNumberContacter"
                      :class="{
                        'border-red': isBorderRed.PhoneNumberContacter,
                      }"
                      @input="setIsBorderRed('PhoneNumberContacter')"
                      @mouseenter="isHovering.PhoneNumberContacter = true"
                      @mouseleave="isHovering.PhoneNumberContacter = false"
                      :placeholder="'Số điện thoại'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberContacter &&
                        (isBorderRed.PhoneNumberContacter ||
                          !provider.PhoneNumberContacter) &&
                        errors['PhoneNumberContacter']
                      "
                    >
                      {{ errors["PhoneNumberContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-tb">
                  <div class="container-input">
                    <misa-input
                      ref="PhoneNumberReceiver"
                      v-model="provider.PhoneNumberReceiver"
                      :class="{
                        'border-red': isBorderRed.PhoneNumberReceiver,
                      }"
                      @input="setIsBorderRed('PhoneNumberReceiver')"
                      @mouseenter="isHovering.PhoneNumberReceiver = true"
                      @mouseleave="isHovering.PhoneNumberReceiver = false"
                      :placeholder="'Số điện thoại'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberReceiver &&
                        (isBorderRed.PhoneNumberReceiver ||
                          !provider.PhoneNumberReceiver) &&
                        errors['PhoneNumberReceiver']
                      "
                    >
                      {{ errors["PhoneNumberReceiver"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-l">
                  <label>Đại diện theo PL</label>
                  <div class="container-input">
                    <misa-input
                      ref="Lawyer"
                      v-model="provider.Lawyer"
                      :class="{ 'border-red': isBorderRed.Lawyer }"
                      @input="setIsBorderRed('Lawyer')"
                      @mouseenter="isHovering.Lawyer = true"
                      @mouseleave="isHovering.Lawyer = false"
                      :placeholder="'Đại diện theo PL'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.Lawyer &&
                        (isBorderRed.Lawyer || !provider.Lawyer) &&
                        errors['Lawyer']
                      "
                    >
                      {{ errors["Lawyer"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Là cá nhân nhưng không là khách hàng -->
          <div
            class="content-select-layout"
            v-if="this.provider.IsPersonal && selectLayout.infoContact"
          >
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-l">
                  <label>Thông tin liên hệ</label>
                  <div class="container-input">
                    <misa-input
                      ref="EmailContacter"
                      v-model="provider.EmailContacter"
                      :class="{ 'border-red': isBorderRed.EmailContacter }"
                      @input="setIsBorderRed('EmailContacter')"
                      @mouseenter="isHovering.EmailContacter = true"
                      @mouseleave="isHovering.EmailContacter = false"
                      :placeholder="'Email'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.EmailContacter &&
                        (isBorderRed.EmailContacter ||
                          !provider.EmailContacter) &&
                        errors['EmailContacter']
                      "
                    >
                      {{ errors["EmailContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-half">
                  <label>Thông tin CMND/Thẻ căn cước</label>
                  <div class="container-input">
                    <misa-input
                      ref="IdentityNumberContacter"
                      v-model="provider.IdentityNumberContacter"
                      :class="{
                        'border-red': isBorderRed.IdentityNumberContacter,
                      }"
                      @input="setIsBorderRed('IdentityNumberContacter')"
                      @mouseenter="isHovering.IdentityNumberContacter = true"
                      @mouseleave="isHovering.IdentityNumberContacter = false"
                      :placeholder="'Số CMND/Thẻ căn cước'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.IdentityNumberContacter &&
                        (isBorderRed.IdentityNumberContacter ||
                          !provider.IdentityNumberContacter) &&
                        errors['IdentityNumberContacter']
                      "
                    >
                      {{ errors["IdentityNumberContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-half">
                  <div class="container-input">
                    <misa-input
                      ref="PhoneNumberContacter"
                      v-model="provider.PhoneNumberContacter"
                      :class="{
                        'border-red': isBorderRed.PhoneNumberContacter,
                      }"
                      @input="setIsBorderRed('PhoneNumberContacter')"
                      @mouseenter="isHovering.PhoneNumberContacter = true"
                      @mouseleave="isHovering.PhoneNumberContacter = false"
                      :placeholder="'Điện thoại di động'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberContacter &&
                        (isBorderRed.PhoneNumberContacter ||
                          !provider.PhoneNumberContacter) &&
                        errors['PhoneNumberContacter']
                      "
                    >
                      {{ errors["PhoneNumberContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-half">
                  <div class="container-input">
                    <misa-input
                      ref="IdentityDateContacter"
                      type="date"
                      v-model="provider.IdentityDateContacter"
                      :value="formattedDateIdentity"
                      :class="{
                        'border-red': isBorderRed.IdentityDateContacter,
                      }"
                      @input="setIsBorderRed('IdentityDateContacter')"
                      @mouseenter="isHovering.IdentityDateContacter = true"
                      @mouseleave="isHovering.IdentityDateContacter = false"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.IdentityDateContacter &&
                        isBorderRed.IdentityDateContacter
                      "
                    >
                      {{ errors["IdentityDateContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row-2">
              <div class="half-content">
                <div class="col-md-half">
                  <div class="container-input">
                    <misa-input
                      ref="PhoneLandlineContacter"
                      v-model="provider.PhoneLandlineContacter"
                      :class="{
                        'border-red': isBorderRed.PhoneLandlineContacter,
                      }"
                      @input="setIsBorderRed('PhoneLandlineContacter')"
                      @mouseenter="isHovering.PhoneLandlineContacter = true"
                      @mouseleave="isHovering.PhoneLandlineContacter = false"
                      :placeholder="'Điện thoại cố định'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneLandlineContacter &&
                        (isBorderRed.PhoneLandlineContacter ||
                          !provider.PhoneLandlineContacter) &&
                        errors['PhoneLandlineContacter']
                      "
                    >
                      {{ errors["PhoneLandlineContacter"] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l">
                  <div class="container-input">
                    <misa-input
                      ref="IdentityPlace"
                      v-model="provider.IdentityPlace"
                      :class="{
                        'border-red': isBorderRed.IdentityPlace,
                      }"
                      @input="setIsBorderRed('IdentityPlace')"
                      @mouseenter="isHovering.IdentityPlace = true"
                      @mouseleave="isHovering.IdentityPlace = false"
                      :placeholder="'Nơi cấp'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.IdentityPlace &&
                        (isBorderRed.IdentityPlace ||
                          !provider.IdentityPlace) &&
                        errors['IdentityPlace']
                      "
                    >
                      {{ errors["IdentityPlace"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-l">
                  <label> Đại diện theo PL </label>
                  <div class="container-input">
                    <misa-input
                      ref="Lawyer"
                      v-model="provider.Lawyer"
                      :class="{ 'border-red': isBorderRed.Lawyer }"
                      @input="setIsBorderRed('Lawyer')"
                      @mouseenter="isHovering.Lawyer = true"
                      @mouseleave="isHovering.Lawyer = false"
                      :placeholder="'Đại diện theo PL'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.Lawyer &&
                        (isBorderRed.Lawyer || !provider.Lawyer) &&
                        errors['Lawyer']
                      "
                    >
                      {{ errors["Lawyer"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Không là khách hàng -->
          <div
            class="content-select-layout"
            id="content-select-layout"
            v-if="selectLayout.termPayment && !provider.IsCustomer"
          >
            <div class="content-select-layout-row">
              <div class="full-content">
                <div class="full-content-quarter">
                  <div class="col-md-quater" style="position: relative">
                    <label>Điều khoản thanh toán</label>
                    <misa-combobox-select-single
                      :propCode="'TermPaymentCode'"
                      :propId="'TermPaymentId'"
                      :propName="'TermPaymentName'"
                      :haederCBB="[
                        'Mã điều khoản thanh toán',
                        'Tên điều khoản thanh toán',
                      ]"
                      :bodyCBB="['TermPaymentCode', 'TermPaymentName']"
                      :isBorderRedCBB="isBorderRed"
                      :errorsCBB="errors"
                      :entityCBB="provider"
                      :listEntitySearchCBB="listTermPayment"
                    ></misa-combobox-select-single>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>Số ngày được nợ</label>
                    <div class="container-input">
                      <misa-input
                        ref="NumberDayOwed"
                        v-model="provider.NumberDayOwed"
                        :class="[
                          { 'border-red': isBorderRed.NumberDayOwed },
                          'right-to-left',
                        ]"
                        @input="setIsBorderRed('NumberDayOwed')"
                        @mouseenter="isHovering.NumberDayOwed = true"
                        @mouseleave="isHovering.NumberDayOwed = false"
                      ></misa-input>
                      <div
                        class="misa-tooltip"
                        v-if="
                          isHovering.NumberDayOwed &&
                          (isBorderRed.NumberDayOwed ||
                            !provider.NumberDayOwed) &&
                          errors['NumberDayOwed']
                        "
                      >
                        {{ errors["NumberDayOwed"] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>Số nợ tối đa</label>
                    <div class="container-input">
                      <misa-input
                        ref="AmountDebt"
                        v-model="provider.AmountDebt"
                        :class="[
                          { 'border-red': isBorderRed.AmountDebt },
                          'right-to-left',
                        ]"
                        @input="setIsBorderRed('AmountDebt')"
                        @mouseenter="isHovering.AmountDebt = true"
                        @mouseleave="isHovering.AmountDebt = false"
                      ></misa-input>
                      <div
                        class="misa-tooltip"
                        v-if="
                          isHovering.AmountDebt &&
                          (isBorderRed.AmountDebt || !provider.AmountDebt) &&
                          errors['AmountDebt']
                        "
                      >
                        {{ errors["AmountDebt"] }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row">
              <div class="full-content">
                <div class="full-content-quarter">
                  <div
                    class="col-md-quater"
                    style="position: relative"
                    id="multiple-cbb-no-icon"
                  >
                    <label>Tài khoản công nợ phải trả</label>
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="provider"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listPayable"
                      :propName="'AccountName'"
                      :valueInput="provider.AccountPayableNumber"
                      :propCode="'AccountPayableNumber'"
                      :propBorderRed="'AccountPayableId'"
                      :textColFirst="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountNumber
                      "
                      :textColSecond="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountName
                      "
                    ></misa-form-combobox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Là khách hàng -->
          <div
            class="content-select-layout"
            id="content-select-layout"
            v-if="selectLayout.termPayment && provider.IsCustomer"
          >
            <div class="content-select-layout-row">
              <div class="full-content">
                <div class="full-content-quarter">
                  <div class="col-md-quater" style="position: relative">
                    <label>Điều khoản thanh toán</label>
                    <misa-combobox-select-single
                      :propCode="'TermPaymentCode'"
                      :propId="'TermPaymentId'"
                      :propName="'TermPaymentName'"
                      :haederCBB="[
                        'Mã điều khoản thanh toán',
                        'Tên điều khoản thanh toán',
                      ]"
                      :bodyCBB="['TermPaymentCode', 'TermPaymentName']"
                      :isBorderRedCBB="isBorderRed"
                      :errorsCBB="errors"
                      :entityCBB="provider"
                      :listEntitySearchCBB="listTermPayment"
                    ></misa-combobox-select-single>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>Số ngày được nợ</label>
                    <div class="container-input">
                      <misa-input
                        ref="NumberDayOwed"
                        v-model="provider.NumberDayOwed"
                        :class="[
                          { 'border-red': isBorderRed.NumberDayOwed },
                          'right-to-left',
                        ]"
                        @input="setIsBorderRed('NumberDayOwed')"
                        @mouseenter="isHovering.NumberDayOwed = true"
                        @mouseleave="isHovering.NumberDayOwed = false"
                      ></misa-input>
                      <div
                        class="misa-tooltip"
                        v-if="
                          isHovering.NumberDayOwed &&
                          (isBorderRed.NumberDayOwed ||
                            !provider.NumberDayOwed) &&
                          errors['NumberDayOwed']
                        "
                      >
                        {{ errors["NumberDayOwed"] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>Số nợ tối đa</label>
                    <div class="container-input">
                      <misa-input
                        ref="AmountDebt"
                        v-model="provider.AmountDebt"
                        :class="[
                          { 'border-red': isBorderRed.AmountDebt },
                          'right-to-left',
                        ]"
                        @input="setIsBorderRed('AmountDebt')"
                        @mouseenter="isHovering.AmountDebt = true"
                        @mouseleave="isHovering.AmountDebt = false"
                      ></misa-input>
                      <div
                        class="misa-tooltip"
                        v-if="
                          isHovering.AmountDebt &&
                          (isBorderRed.AmountDebt || !provider.AmountDebt) &&
                          errors['AmountDebt']
                        "
                      >
                        {{ errors["AmountDebt"] }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-select-layout-row">
              <div class="full-content">
                <div class="full-content-quarter">
                  <div
                    class="col-md-quater"
                    style="position: relative"
                    id="multiple-cbb-no-icon"
                  >
                    <label>Tài khoản công nợ phải thu</label>
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="provider"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listReceivable"
                      :propName="'AccountName'"
                      :valueInput="provider.AccountReceivableNumber"
                      :propCode="'AccountReceivableNumber'"
                      :propBorderRed="'AccountReceivableId'"
                      :textColFirst="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountNumber
                      "
                      :textColSecond="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountName
                      "
                    ></misa-form-combobox>
                  </div>
                  <div
                    class="col-md-quater"
                    style="position: relative"
                    id="multiple-cbb-no-icon"
                  >
                    <label>Tài khoản công nợ phải trả</label>
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="provider"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listPayable"
                      :propName="'AccountName'"
                      :valueInput="provider.AccountPayableNumber"
                      :propCode="'AccountPayableNumber'"
                      :propBorderRed="'AccountPayableId'"
                      :textColFirst="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountNumber
                      "
                      :textColSecond="
                        this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form
                          .textProperty.accountName
                      "
                    ></misa-form-combobox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="content-select-layout"
            v-if="selectLayout.bankAccount"
            :class="{
              'overflow-auto':
                selectLayout.bankAccount || selectLayout.addressOther,
            }"
          >
            <table class="table-input" id="table-input-account">
              <thead class="table-input-title">
                <tr>
                  <th class="table-input-col-1">Số tài khoản</th>
                  <th class="table-input-col-2">Tên ngân hàng</th>
                  <th class="table-input-col-3">Chi nhánh</th>
                  <th class="table-input-col-4">Tỉnh/TP của ngân hàng</th>
                  <th class="table-input-col-5"></th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-for="(item, index) in provider.AccountProviders"
                  :key="index"
                >
                  <tr>
                    <td class="table-input-col-1">
                      <misa-input v-model="item.AccountNumber"></misa-input>
                    </td>
                    <td class="table-input-col-2">
                      <misa-input v-model="item.BankName"></misa-input>
                    </td>
                    <td class="table-input-col-3">
                      <misa-input v-model="item.BankBranch"></misa-input>
                    </td>
                    <td class="table-input-col-4">
                      <misa-input v-model="item.CityOfBank"></misa-input>
                    </td>
                    <td
                      class="table-input-col-5"
                      @click="deleteRowAccount(index)"
                    >
                      <div class="delete-row-table-input">
                        <div class="delete-icon"></div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
              <tfoot>
                <td colspan="5">
                  <misa-button-extra
                    :textButtonExtra="'Thêm dòng'"
                    @click="btnAddRowAccount"
                  ></misa-button-extra>
                  <misa-button-extra
                    :textButtonExtra="'Xóa hết dòng'"
                    @click="deleteAllRowAccount"
                  ></misa-button-extra>
                </td>
              </tfoot>
            </table>
          </div>
          <div
            class="content-select-layout"
            id="address-Other"
            v-if="selectLayout.addressOther"
            :class="{
              'overflow-auto':
                selectLayout.bankAccount || selectLayout.addressOther,
            }"
          >
            <div class="content-select-layout-half">
              <div class="half-content">
                <div class="col-md-l cbb-has-label" style="position: relative">
                  <label>Vị trí địa lý</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listCountry.Search"
                    :propName="'LocationCountry'"
                    :propId="'LocationId'"
                    :placeholderInputCBB="'Quốc gia'"
                    :indexSelectedCBB="
                      listCountry.All.findIndex(
                        (obj) =>
                          obj.LocationCode == locationDefault.LocationCode
                      )
                    "
                  ></misa-combobox>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l cbb-has-label" style="position: relative">
                  <label class="label-hide-text">hide</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listCity.Search"
                    :propName="'LocationCity'"
                    :propId="'LocationId'"
                    :placeholderInputCBB="'Tỉnh/Thành phố'"
                  ></misa-combobox>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l cbb-no-label" style="position: relative">
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listDistrict.Search"
                    :propName="'LocationDistrict'"
                    :propId="'LocationId'"
                    :placeholderInputCBB="'Quận/Huyện'"
                  ></misa-combobox>
                </div>
              </div>
              <div class="half-content">
                <div class="col-md-l cbb-no-label" style="position: relative">
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listVillage.Search"
                    :propName="'LocationVillage'"
                    :propId="'LocationId'"
                    :placeholderInputCBB="'Xã/Phường'"
                  ></misa-combobox>
                </div>
              </div>
            </div>
            <div class="content-select-layout-half">
              <table class="table-input" id="table-input-address-other">
                <thead class="table-input-title">
                  <tr>
                    <th class="table-input-col-4" colspan="2">
                      Địa chỉ giao hàng
                    </th>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th style="font-weight: 400">Giống địa chỉ nhà cung cấp</th>
                    <th class="table-input-col-5"></th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(item, index) in provider.DeliveryAddresses"
                    :key="index"
                  >
                    <tr class="table-input-has-data">
                      <td class="table-input-col-4" colspan="4">
                        <misa-input
                          v-model="item.DeliveryAddressName"
                        ></misa-input>
                      </td>
                      <td class="table-input-col-5">
                        <div
                          class="delete-row-table-input"
                          @click="deleteRowAddress(index)"
                        >
                          <div class="delete-icon"></div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
                <tfoot>
                  <td colspan="4">
                    <misa-button-extra
                      :textButtonExtra="'Thêm dòng'"
                      @click="btnAddRowAddress"
                    ></misa-button-extra>
                    <misa-button-extra
                      :textButtonExtra="'Xóa hết dòng'"
                      @click="btnDeleteAllRowAddress"
                    ></misa-button-extra>
                  </td>
                </tfoot>
              </table>
            </div>
          </div>
          <div
            class="content-select-layout"
            v-if="selectLayout.note"
            id="content-select-layout-note"
          >
            <label>Ghi chú</label>
            <misa-input-textarea
              v-model="provider.Note"
              ref="Note"
              :class="{ 'border-red': isBorderRed.Note }"
              @input="setIsBorderRed('Note')"
              @mouseenter="isHovering.Note = true"
              @mouseleave="isHovering.Note = false"
            ></misa-input-textarea>
          </div>
        </div>
      </div>
      <div class="form-detail-action">
        <div class="action-left">
          <misa-button-extra
            :textButtonExtra="
              this.$_MISAResource[this.$_LANG_CODE].BUTTON.CANCEL
            "
            @click="btnCancel"
          ></misa-button-extra>
        </div>
        <div class="action-right">
          <misa-button-extra
            :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].BUTTON.SAVE"
            @click="btnSave"
            :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.SAVE"
          ></misa-button-extra>
          <misa-button-default
            :textButtonDefault="
              this.$_MISAResource[this.$_LANG_CODE].BUTTON.SAVE_AND_ADD
            "
            @click="btnSaveAndAdd"
            :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.SAVE_AND_ADD"
          ></misa-button-default>
        </div>
      </div>
    </div>
    <!-- dialog employee input data not blank -->
    <misa-dialog-data-not-null
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      :title="this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID"
    ></misa-dialog-data-not-null>
    <!-- dialog employee id Exist -->
    <misa-dialog-data-exist
      v-if="isShowDialogCodeExist"
      :textProp="this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_PRE"
      :textEntityCodeExist="contentProviderCodeExist"
    ></misa-dialog-data-exist>
    <!-- dialog employee save and close -->
    <misa-dialog-data-change
      v-if="isShowDialogDataChange"
    ></misa-dialog-data-change>
  </div>
</template>

<script>
import providerService from "@/services/provider.js";
import groupService from "@/services/group.js";
import employeeService from "@/services/employee.js";
import locationService from "@/services/location.js";
import termPamentService from "@/services/term_payment.js";
import accountService from "@/services/account.js";
import accountProviderService from "@/services/account_provider.js";
import deliveryAddressService from "@/services/delivery_address.js";
import helperCommon from "@/scripts/helper.js";

export default {
  name: "ProviderDetail",

  props: ["providerSelected", "statusFormMode"],

  created() {
    this.loadData();

    this.$_MISAEmitter.on("cancelDialogDataChange", () => {
      this.onCancelDialogDataChange();
    });
    this.$_MISAEmitter.on("noDialogDataChange", () => {
      this.onNoDialogDataChange();
    });
    this.$_MISAEmitter.on("yesDialogDataChange", async () => {
      await this.onYesDialogDataChange();
    });

    this.$_MISAEmitter.on("closeDialogCodeExist", () => {
      this.btnCloseDialogCodeExist();
    });

    this.$_MISAEmitter.on("closeDialogDataError", () => {
      this.onCloseDialogSaveAndAdd();
    });

    this.$_MISAEmitter.on("toggleCBBSelectMultiple", (group, isUnSelect) => {
      this.toggleSelectGroup(group, isUnSelect);
    });

    this.$_MISAEmitter.on("deleteItemCBBSelectMultiple", (data) => {
      this.deleteGroupProvider(data);
    });

    this.$_MISAEmitter.on(
      "handleScrollCBBSelectMultiple",
      async (textSearch) => {
        await this.handleScrollCBBGroup(textSearch);
      }
    );

    this.$_MISAEmitter.on(
      "onSearchChangeCBBSelectMultiple",
      async (textSearch) => {
        await this.onSearchChangeGroup(textSearch);
      }
    );

    this.$_MISAEmitter.on("onSelectedEntityCBB", async (data, propName) => {
      if (propName == "Vocative") {
        this.onSelectedVocative(data);
      }
      await this.onSelectedLocation(data, propName);
    });
    this.$_MISAEmitter.on("onSearchChangeCBB", (newValue, propName) => {
      if (propName == "Vocative") {
        this.onSearchChangeVocative(newValue);
      }
      this.onSearchChangeLocation(newValue, propName);
    });
    this.$_MISAEmitter.on("onKeyDownEntityCBB", (index, propName) => {
      if (propName == "Vocative") {
        this.onKeyDownVocativeCBB(index);
      }
      this.onKeyDownLocationCBB(index, propName);
    });

    this.$_MISAEmitter.on("onSelectedEntityCBBSingle", (data, propId) => {
      if (propId == "EmployeeId") {
        this.onSelectedEmployee(data);
      }
      if (propId == "TermPaymentId") {
        this.onSelectedTermPayment(data);
      }
    });
    this.$_MISAEmitter.on("onSearchChangeCBBSingle", (newValue, propId) => {
      if (propId == "EmployeeId") {
        this.onSearchChangeEmployee(newValue);
      }
      if (propId == "TermPaymentId") {
        this.onSearchChangeTermPayment(newValue);
      }
    });
    this.$_MISAEmitter.on("onKeyDownEntityCBBSingle", (index, propId) => {
      if (propId == "EmployeeId") {
        this.onKeyDownEmployeeCBBSingle(index);
      }
      if (propId == "TermPaymentId") {
        this.onKeyDownTermPaymentCBBSingle(index);
      }
    });

    this.$_MISAEmitter.on("onSelectedEntityFormCBB", (data, propCode) => {
      if (propCode == "AccountReceivableNumber") {
        this.selectedReceivable(data);
      }
      if (propCode == "AccountPayableNumber") {
        this.selectedPayable(data);
      }
    });
  },

  mounted() {
    // focus vào ô đầu tiên khi mở form chi tiết
    this.focusCode();
    // Đăng kí các sự kiện
    this.$refs.FormDetailProvider.addEventListener(
      "keydown",
      this.handleKeyDown
    );
  },

  data() {
    return {
      // Khai báo mảng lưu các thuộc tính cần validate theo thứ tự, phục vụ cho việc focus, hiển thị lỗi theo thứ tự
      providerProperty: [
        "ProviderCode",
        "ProviderName",
        "TaxCode",
        "Address",
        "PhoneNumber",
        "Website",
        "EmployeeId",
        "FullName",
        "Note",
        "NameContacter",
        "EmailContacter",
        "PhoneNumberContacter",
        "PhoneLandlineContacter",
        "IdentityNumberContacter",
        "IdentityDateContacter",
        "IdentityPlace",
        "Lawyer",
        "NameReceiver",
        "EmailReceiver",
        "PhoneNumberReceiver",
        "TermPaymentId",
        "TermPaymentName",
        "NumberDayOwed",
        "AmountDebt",
        "AccountReceivableId",
        "AccountReceivableNumber",
        "AccountPayableId",
        "AccountPayableNumber",
      ],
      // Khai báo đối tượng provider
      provider: {},
      // Khai báo trạng thái hiển thị của dialog cảnh báo dữ liệu k được để trống
      isShowDialogDataNotNull: false,
      // Khai báo biến xác định nội dung trường nào k được để trống
      dataNotNull: [],
      // Khai báo trạng thái hiển thị của dialog cảnh báo mã nhân viên đã tồn tại
      isShowDialogCodeExist: false,
      // Khai báo biến xác định thông tin của mã nhân viên đã tồn tại
      contentProviderCodeExist: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: {},
      // Khai báo biên lưu mã nhân viên tự động sinh ra
      newProviderCode: null,
      // Khai báo biến chứa danh sách đối tượng lỗi
      errors: {},
      // Khai báo biến chứa danh sách các ô input khi hover
      isHovering: {},
      // Khai báo danh sách xưng hô
      listVocative: [
        { Id: 1, Vocative: "Mr" },
        { Id: 2, Vocative: "Mrs" },
        { Id: 3, Vocative: "Ms" },
        { Id: 4, Vocative: "Ông" },
        { Id: 5, Vocative: "Bà" },
        { Id: 6, Vocative: "Ngài" },
        { Id: 7, Vocative: "Anh" },
      ],

      // Biến quy định layout nào đang được chọn
      selectLayout: {
        infoContact: true,
        termPayment: false,
        bankAccount: false,
        addressOther: false,
        note: false,
      },
      // Khai báo danh sách group
      listGroupSearch: [],
      // Khai báo trang hiện tại của group trong phân trang
      currentPageGroup: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo danh sách group
      listEmployeeSearch: [],
      // Khai báo trang hiện tại của group trong phân trang
      currentPageEmployee: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo biến quy định sau 1 khoảng thời gian mới thực hiện tìm kiếm ở combobox nhân viên mua hàng
      searchEmployeeTimeout: null,
      // Khai báo biến quy định sau 1 khoảng thời gian mới thực hiện tìm kiếm ở combobox điều khoản thanh toán
      searchTermPaymentTimeout: null,
      // Khởi tạo quốc gia mặc định
      locationDefault: { LocationCode: "VN", LocationName: "Việt Nam" },
      // Khai báo biến lưu danh sách quốc gia
      listCountry: { All: [], Search: [] },
      // Khai báo biến lưu danh sách tỉnh
      listCity: { All: [], Search: [] },
      // Khai báo biến lưu danh sách huyện
      listDistrict: { All: [], Search: [] },
      // Khai báo biến lưu danh sách xã
      listVillage: { All: [], Search: [] },
      // Khai báo biến lưu danh sách điều khoản thanh toán
      listTermPayment: [],
      // Khai báo biến lưu danh sách tài khoản công nợ phải thu
      listReceivable: [],
      // Khai báo biến lưu danh sách tài khoản công nợ phải trả
      listPayable: [],
      // Khai báo biến lưu số dòng địa chỉ giao hàng
      rowNumberAddress: [1],
    };
  },

  computed: {
    /**
     * Mô tả: Hàm tính toán ngày cấp chứng minh nhân dân
     * created by : BNTIEN
     * created date: 01-06-2023 02:41:35
     */
    formattedDateIdentity: {
      get() {
        if (this.provider.IdentityDateContacter) {
          const isoDateIdentity = this.provider.IdentityDateContacter;
          const formattedDateIdentity = isoDateIdentity.split(
            this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SPLIT_DATE
          )[0];
          return formattedDateIdentity;
        }
        return "";
      },
      set(newDate) {
        this.provider.IdentityDateContacter = newDate;
      },
    },
  },

  methods: {
    /**
     * Mô tả: Hàm xử lí chọn layout tương ứng
     * created by : BNTIEN
     * created date: 25-07-2023 11:32:35
     */
    handleSelectLayout(layout) {
      for (const key in this.selectLayout) {
        if (Object.hasOwnProperty.call(this.selectLayout, key)) {
          if (key == layout) {
            this.selectLayout[key] = true;
          } else {
            this.selectLayout[key] = false;
          }
        }
      }
    },

    /**
     * Mô tả: Lấy nhân viên có giá trị lớn nhất trong hệ thống
     * created by : BNTIEN
     * created date: 24-06-2023 09:57:13
     */
    async getNewCode() {
      try {
        let maxCode = await providerService.getCodeMax();
        this.newProviderCode = maxCode.data;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: gọi api lấy dữ liệu
     * created by : BNTIEN
     * created date: 30-05-2023 14:57:33
     */
    async loadData() {
      try {
        await this.getNewCode();
        await this.getListGroup();
        await this.getListEmployee();
        this.listTermPayment = await this.getListTermPayment(20, 1, "");
        this.listReceivable = await this.getListReceivalbe(20, 1, "");
        this.listPayable = await this.getListPayable(20, 1, "");
        this.listCountry.All = await this.getListLocation(1, "");
        this.listCountry.Search = await this.getListLocation(1, "");
        this.listCity.All = await this.getListLocation(
          2,
          this.locationDefault.LocationCode
        );
        this.listCity.Search = await this.getListLocation(
          2,
          this.locationDefault.LocationCode
        );
        // Nếu form ở trạng thái thêm mới
        // Chuyển đối tượng sang chuỗi json
        let res = JSON.stringify(this.providerSelected);
        // Chuyển đổi chuỗi json thành đối tượng provider

        this.provider = JSON.parse(res);
        if (this.statusFormMode !== this.$_MISAEnum.FORM_MODE.Edit) {
          // Sinh mã tự động
          this.provider.ProviderCode = this.newProviderCode;
          this.provider.LocationCountry = this.locationDefault.LocationName;
        }
        await this.getAccountProvider();
        await this.getDeliveryAddress();
        console.log(this.provider);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm focus vào ô input mã nhân viên
     * created by : BNTIEN
     * created date: 27-06-2023 01:53:48
     */
    focusCode() {
      this.$refs.TaxCode.focus();
    },

    /**
     * Mô tả: Hàm kiểm tra xem provider có thay đổi sau khi mở form detail không
     * created by : BNTIEN
     * created date: 30-06-2023 00:21:22
     */
    hasDataChanged() {
      return (
        JSON.stringify(this.providerSelected) !== JSON.stringify(this.provider)
      );
    },

    /**
     * Mô tả: Tìm kiếm, phân trang danh sách group
     * created by : BNTIEN
     * created date: 29-07-2023 20:57:23
     */
    async getListGroup() {
      try {
        const res = await groupService.getFilter(20, this.currentPageGroup, "");
        this.listGroupSearch = res.data;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Tìm kiếm phân trang nhân viên mua hàng, tạm thời lấy luôn bảng nhân viên
     * created by : BNTIEN
     * created date: 30-07-2023 00:10:44
     */
    async getListEmployee() {
      try {
        const res = await employeeService.getFilter(
          20,
          this.currentPageEmployee,
          ""
        );
        this.listEmployeeSearch = res.data;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Lấy danh sách vị trí địa lý theo cha
     * created by : BNTIEN
     * created date: 30-07-2023 13:13:57
     */
    async getListLocation(grade, parentCode) {
      try {
        const res = await locationService.getFilter(grade, parentCode);
        return res.data;
      } catch {
        return [];
      }
    },

    /**
     * Mô tả: Lấy danh sách điều khoản thanh toán
     * created by : BNTIEN
     * created date: 01-08-2023 06:13:28
     */
    async getListTermPayment(pageSize, pageNumber, textSearch) {
      try {
        const res = await termPamentService.getFilter(
          pageSize,
          pageNumber,
          textSearch
        );
        return res.data;
      } catch {
        return [];
      }
    },

    /**
     * Mô tả: Lấy danh sách tài khoản công nợ phải thu
     * created by : BNTIEN
     * created date: 01-08-2023 10:20:56
     */
    async getListReceivalbe(pageSize, pageNumber, textSearch) {
      try {
        const res = await accountService.getReceivable(
          pageSize,
          pageNumber,
          textSearch
        );
        return res.data;
      } catch {
        return [];
      }
    },

    /**
     * Mô tả: Lấy danh sách tài khoản công nợ phải trả
     * created by : BNTIEN
     * created date: 01-08-2023 10:20:56
     */
    async getListPayable(pageSize, pageNumber, textSearch) {
      try {
        const res = await accountService.getPayable(
          pageSize,
          pageNumber,
          textSearch
        );
        return res.data;
      } catch {
        return [];
      }
    },

    /**
     * Mô tả: Lấy danh sách tài khoản ngân hàng theo ProviderId
     * created by : BNTIEN
     * created date: 01-08-2023 14:18:52
     */
    async getAccountProvider() {
      try {
        if (this.statusFormMode == this.$_MISAEnum.FORM_MODE.Edit) {
          const res = await accountProviderService.getByProviderId(
            this.provider.ProviderId
          );
          this.provider.AccountProviders = res.data;
        } else {
          this.provider.AccountProviders = [];
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Lấy danh sách địa chỉ giao hàng theo ProviderId
     * created by : BNTIEN
     * created date: 01-08-2023 14:18:52
     */
    async getDeliveryAddress() {
      try {
        if (this.statusFormMode == this.$_MISAEnum.FORM_MODE.Edit) {
          const res = await deliveryAddressService.getByProviderId(
            this.provider.ProviderId
          );
          this.provider.DeliveryAddresses = res.data;
        } else {
          this.provider.DeliveryAddresses = [];
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm sử lí sự kiện khi click vào icon close
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:28
     */
    async onCloseFormDetail() {
      // Kiểm tra xem giữ liệu có thay đổi hay không (Trường hợp có thay đổi)
      if (this.hasDataChanged()) {
        this.isShowDialogDataChange = true;
      } else {
        this.$emit("closeFormDetail");
      }
    },
    /**
     * Mô tả: Hàm set các lỗi nhập liệu phía fontend
     * created by : BNTIEN
     * created date: 11-07-2023 16:36:05
     */
    setError(key) {
      try {
        this.errors[key] =
          this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateNotNull[
            key
          ];
        this.isBorderRed[key] = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateNotNull[
            key
          ]
        );
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm set các lỗi nhập liệu phía fontend
     * created by : BNTIEN
     * created date: 11-07-2023 16:36:05
     */
    setErrorMaxLength(key) {
      try {
        this.errors[key] =
          this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[
            key
          ].Warning;
        this.isBorderRed[key] = true;
        this.dataNotNull.push(
          this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[key]
            .Warning
        );
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Validate lỗi nhập liệu phía fontend
     * created by : BNTIEN
     * created date: 11-07-2023 10:07:22
     */
    validateProvider() {
      try {
        for (const refInput of this.providerProperty) {
          switch (refInput) {
            case "ProviderCode":
            case "ProviderName":
              if (helperCommon.isEmptyInput(this.provider[refInput])) {
                this.setError(refInput);
              } else if (
                helperCommon.isMaxLengthInput(
                  this.provider[refInput],
                  this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[
                    refInput
                  ].Limit
                )
              ) {
                this.setErrorMaxLength(refInput);
              }
              break;
            case "GroupProvider":
            case "EmployeeId":
            case "TermPaymentId":
              break;
            case "FullName":
              if (this.provider.FullName && !this.provider.EmployeeId) {
                this.errors.FullName = `Nhân viên mua hàng <${this.provider.FullName}> không tồn tại`;
                this.isBorderRed.FullName = true;
                this.dataNotNull.push(
                  `Nhân viên mua hàng <${this.provider.FullName}> không tồn tại`
                );
                this.isShowDialogDataNotNull = true;
                return;
              }
              break;
            case "TermPaymentName":
              if (
                this.provider.TermPaymentName &&
                !this.provider.TermPaymentId
              ) {
                this.errors.TermPaymentName = `Điều khoản thanh toán <${this.provider.TermPaymentName}> không tồn tại`;
                this.isBorderRed.TermPaymentName = true;
                this.dataNotNull.push(
                  `Điều khoản thanh toán <${this.provider.TermPaymentName}> không tồn tại`
                );
                this.isShowDialogDataNotNull = true;
                return;
              }
              break;
            case "IdentityNumberContacter":
              if (this.provider[refInput]) {
                if (
                  helperCommon.isMaxLengthInput(
                    this.provider[refInput],
                    this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form
                      .maxLength[refInput].Limit
                  )
                ) {
                  this.setErrorMaxLength(refInput);
                } else if (helperCommon.isNumber(this.provider[refInput])) {
                  this.setError(refInput);
                }
              }
              break;
            case "EmailContacter":
            case "EmailReceiver":
              if (this.provider[refInput]) {
                if (
                  helperCommon.isMaxLengthInput(
                    this.provider[refInput],
                    this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form
                      .maxLength[refInput].Limit
                  )
                ) {
                  this.setErrorMaxLength(refInput);
                } else if (
                  helperCommon.isFormatEmail(this.provider[refInput])
                ) {
                  this.setError(refInput);
                }
              }
              break;
            case "IdentityDateContacter":
              if (this.provider[refInput]) {
                if (helperCommon.isInvalidDate(this.provider[refInput])) {
                  this.setError(refInput);
                }
              }
              break;
            default:
              if (this.provider[refInput]) {
                if (
                  helperCommon.isMaxLengthInput(
                    this.provider[refInput],
                    this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form
                      .maxLength[refInput].Limit
                  )
                ) {
                  this.setErrorMaxLength(refInput);
                }
              }
              break;
          }
        }
      } catch {
        return;
      }
    },
    /**
     * Mô tả: Hàm xử lí lỗi nhập liệu người dùng khi backend trả về lỗi
     * created by : BNTIEN
     * created date: 29-06-2023 07:07:16
     */
    handleErrorInputProvider(errors, providerProperty) {
      const responseHandle = helperCommon.handleErrorInput(
        errors,
        providerProperty
      );
      this.errors = responseHandle.error;
      this.isBorderRed = responseHandle.isBorderRed;
      this.dataNotNull = responseHandle.dataNotNull;
      if (this.dataNotNull.length > 0) {
        this.isShowDialogDataNotNull = true;
      }
    },
    /**
     * Mô tả: Hàm kiểm tra xem mã nhân viên đã tồn tại trong database hay chưa
     * created by : BNTIEN
     * created date: 29-06-2023 23:46:11
     */
    async checkProviderExists() {
      try {
        const res = await providerService.getByCode(this.provider.ProviderCode);
        return res.data;
      } catch {
        return null;
      }
    },
    /**
     * Mô tả: Hàm xử lí khi mã nhân viên đã tồn tại trong hệ thống
     * created by : BNTIEN
     * created date: 30-06-2023 00:30:22
     */
    handleProviderExisted(providerExisted) {
      this.isShowDialogCodeExist = true;
      this.isBorderRed.ProviderCode = true;
      this.errors["ProviderCode"] = `Mã nhà cung cấp
       ${providerExisted.ProviderCode} ${
        this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_DETAIL_END
      }`;
      this.contentProviderCodeExist = providerExisted.ProviderCode;
    },

    /**
     * Mô tả: set giá trị cho list group id
     * created by : BNTIEN
     * created date: 30-07-2023 09:48:50
     */
    setGroupIds() {
      try {
        if (this.provider.GroupProvider) {
          this.provider.GroupIds = this.provider.GroupProvider.map(
            (x) => x.GroupId
          );
        } else {
          this.provider.GroupIds = [];
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nút cất trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:05
     */
    async btnSave() {
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        this.validateProvider();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
        } else {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let providerByCode = await this.checkProviderExists();
            // Nếu mã nhân viên chưa tồn tại trong hệ thống
            if (!providerByCode) {
              this.setGroupIds();
              const res = await providerService.create(this.provider);
              if (
                this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(
                  res.status
                ) &&
                res.data > 0
              ) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                    .SUCCESS_CTEATE
                );
                this.$emit("closeFormDetail");
                this.$_MISAEmitter.emit("refreshDataTable");
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.handleProviderExisted(providerByCode);
            }
          } catch (error) {
            this.handleErrorInputProvider(error, this.providerProperty);
          }
        }
      } else {
        // Nếu form ở trạng thái sửa
        // Kiểm tra xem dữ liệu có thay đổi hay k (Trường hợp đã thay đổi)
        if (this.hasDataChanged()) {
          this.validateProvider();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let providerByCode = await this.checkProviderExists();
              // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại nhưng trùng với nhân viên đang sửa
              if (
                !providerByCode ||
                providerByCode.ProviderCode ===
                  this.providerSelected.ProviderCode
              ) {
                this.setGroupIds();
                const res = await providerService.update(
                  this.providerSelected.ProviderId,
                  this.provider
                );
                if (
                  this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) &&
                  res.data > 0
                ) {
                  this.$_MISAEmitter.emit(
                    "onShowToastMessageUpdate",
                    this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                      .SUCCESS_UPDATE
                  );
                  this.$emit("closeFormDetail");
                  this.$_MISAEmitter.emit("refreshDataTable");
                }
              } else {
                // Nếu mã nhân viên đã tồn tại trong hệ thống
                this.handleProviderExisted(providerByCode);
              }
            } catch (error) {
              this.handleErrorInputProvider(error, this.providerProperty);
            }
          }
        } else {
          this.$emit("closeFormDetail");
        }
      }
      // }
    },
    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng bấm vào nut cất và thêm trên form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:55:23
     */
    async btnSaveAndAdd() {
      // Nếu form ở trạng thái thêm mới
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        this.validateProvider();
        if (this.dataNotNull.length > 0) {
          this.isShowDialogDataNotNull = true;
        } else {
          try {
            // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let providerByCode = await this.checkProviderExists();
            if (!providerByCode) {
              // Nếu mã nhân viên chưa tồn tại trong hệ thống
              this.setGroupIds();
              const res = await providerService.create(this.provider);
              if (
                this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(
                  res.status
                ) &&
                res.data > 0
              ) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                    .SUCCESS_CTEATE
                );
                this.provider = {};
                this.isBorderRed = {};
                this.$_MISAEmitter.emit("refreshDataTable");
                await this.getNewCode();
                this.provider.ProviderCode = this.newProviderCode;
                this.focusCode();
              }
            } else {
              // Nếu mã nhân viên đã tồn tại trong hệ thống
              this.handleProviderExisted(providerByCode);
            }
          } catch (error) {
            this.handleErrorInputProvider(error, this.providerProperty);
          }
        }
        // Nếu form ở trạng thái sửa
      } else {
        // Kiểm tra xem dữ liệu có thay đổi hay k
        if (this.hasDataChanged()) {
          this.validateProvider();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              // Kiểm tra xem mã nhân viên đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let providerByCode = await this.checkProviderExists();
              // Nếu mã nhân viên chưa tồn tại trong hệ thống hoặc tồn tại trùng với nhân viên đang sửa
              if (
                !providerByCode ||
                providerByCode.ProviderCode ===
                  this.providerSelected.ProviderCode
              ) {
                this.setGroupIds();
                const res = await providerService.update(
                  this.providerSelected.ProviderId,
                  this.provider
                );
                this.provider = {};
                this.$_MISAEmitter.emit("setFormModeAdd");
                await this.getNewCode();
                this.provider.ProviderCode = this.newProviderCode;
                this.focusCode();
                this.$_MISAEmitter.emit("refreshDataTable");
                if (
                  this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) &&
                  res.data > 0
                ) {
                  this.$_MISAEmitter.emit(
                    "onShowToastMessageUpdate",
                    this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT
                      .SUCCESS_UPDATE
                  );
                }
              } else {
                // Nếu mã nhân viên đã tồn tại trong hệ thống
                this.handleProviderExisted(providerByCode);
              }
            } catch (error) {
              this.handleErrorInputProvider(error, this.providerProperty);
            }
          }
        } else {
          this.provider = {};
          this.$_MISAEmitter.emit("setFormModeAdd");
          this.focusCode();
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
      let listPropError = [];
      for (const key in this.isBorderRed) {
        if (this.isBorderRed[key] === true) {
          listPropError.push(key);
        }
      }

      // thêm thuộc tính DepartmentName vào listPropError để xử lí focus nếu chưa có
      if (
        listPropError.includes("EmployeeId") &&
        !listPropError.includes("FullName")
      ) {
        listPropError.push("FullName");
      }

      if (
        listPropError.includes("TermPaymentId") &&
        !listPropError.includes("TermPaymentName")
      ) {
        listPropError.push("TermPaymentName");
      }

      for (const prop of this.providerProperty) {
        if (listPropError.includes(prop)) {
          // đợi DOM cập nhật trước khi thực thi focus
          if (prop === "EmployeeId" || prop === "FullName") {
            this.$nextTick(() => {
              this.$_MISAEmitter.emit("focusInputCBBSelectSingle");
            });
          } else if (prop === "TermPaymentId" || prop === "TermPaymentName") {
            this.$nextTick(() => {
              this.$_MISAEmitter.emit("focusInputCBBSelectSingle");
            });
          } else {
            this.$nextTick(() => {
              this.$refs[prop].focus();
            });
          }
          return;
        }
      }
    },

    /**
     * Mô tả: Hàm bỏ border red khi dữ liệu thay đổi
     * created by : BNTIEN
     * created date: 29-06-2023 22:03:38
     */
    setIsBorderRed(prop) {
      if (prop in this.isBorderRed) {
        this.isBorderRed[prop] = false;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi click vào nút hủy trong form chi tiết
     * created by : BNTIEN
     * created date: 29-05-2023 07:56:20
     */
    btnCancel() {
      this.$emit("closeFormDetail");
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng dialog cảnh báo mã nhân viên đã tồn tại
     * created by : BNTIEN
     * created date: 29-05-2023 08:28:19
     */
    btnCloseDialogCodeExist() {
      this.isShowDialogCodeExist = false;
      this.$refs.ProviderCode.focus();
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button hủy trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:40:13
     */
    onCancelDialogDataChange() {
      this.isShowDialogDataChange = false;
      this.focusCode();
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button không trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:42:10
     */
    onNoDialogDataChange() {
      this.$emit("closeFormDetail");
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button có trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:43:38
     */
    async onYesDialogDataChange() {
      this.isShowDialogDataChange = false;
      await this.btnSave();
    },

    /**
     * Mô tả: Hàm reset tabindex về ô input mã nhân viên khi tab nhảy đến icon close
     * created by : BNTIEN
     * created date: 01-06-2023 14:24:19
     */
    resetTab() {
      this.focusCode();
    },

    /**
     * Mô tả: Xử lí sự kiện click vào radio tổ chức
     * created by : BNTIEN
     * created date: 28-07-2023 13:42:36
     */
    handleClickInstitute() {
      this.provider.IsPersonal = false;
    },

    /**
     * Mô tả: Xử lí sự kiện click vào radio các nhân
     * created by : BNTIEN
     * created date: 28-07-2023 13:43:49
     */
    handleClickPersonal() {
      this.provider.IsPersonal = true;
    },

    /**
     * Mô tả: Xử lí toggle check box khách hàng
     * created by : BNTIEN
     * created date: 28-07-2023 13:53:09
     */
    toggleCheckboxCustomer() {
      this.provider.IsCustomer = !this.provider.IsCustomer;
    },

    /**
     * Mô tả: Xử lí toggle select group
     * created by : BNTIEN
     * created date: 29-07-2023 21:47:44
     */
    toggleSelectGroup(group, isUnSelect) {
      try {
        if (isUnSelect) {
          this.provider.GroupProvider = this.provider.GroupProvider.filter(
            (x) => x.GroupId != group.GroupId
          );
        } else {
          if (!this.provider.GroupProvider) {
            this.provider.GroupProvider = [];
          }
          this.provider.GroupProvider.push({
            GroupCode: group.GroupCode,
            GroupId: group.GroupId,
            ProviderId: this.provider.ProviderId,
          });
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xóa 1 item trong cbb nhóm nhà cung cấp
     * created by : BNTIEN
     * created date: 29-07-2023 22:41:39
     */
    deleteGroupProvider(data) {
      try {
        this.provider.GroupProvider = this.provider.GroupProvider.filter(
          (x) => x.GroupId != data.GroupId
        );
      } catch {
        return;
      }
    },

    /**
     * Mô tả: lấy thêm dữ liệu khi scroll đến cuối trong cbb nhóm nhà cung cấp
     * created by : BNTIEN
     * created date: 29-07-2023 22:53:56
     */
    async handleScrollCBBGroup(textSearchGroup) {
      try {
        this.currentPageGroup += 1;
        const filteredGroups = await groupService.getFilter(
          20,
          this.currentPageGroup,
          textSearchGroup
        );
        this.listGroupSearch.Data = [
          ...this.listGroupSearch.Data,
          ...filteredGroups.data.Data,
        ];
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Tìm kiếm trong cbb nhóm nhà cung cấp
     * created by : BNTIEN
     * created date: 29-07-2023 23:23:56
     */
    async onSearchChangeGroup(textSearchGroup) {
      try {
        const filteredGroups = await groupService.getFilter(
          20,
          1,
          textSearchGroup
        );
        this.listGroupSearch = filteredGroups.data;
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn nhân viên mua hàng
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedEmployee(employee) {
      this.provider.FullName = employee.FullName;
      this.provider.EmployeeId = employee.EmployeeId;
      this.isBorderRed.FullName = false;
    },

    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search employee và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    async onSearchChangeEmployee(newValue) {
      this.isBorderRed.FullName = false;
      this.isBorderRed.EmployeeId = false;
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchEmployeeTimeout);
        this.provider.FullName = newValue;
        delete this.provider.EmployeeId;
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchEmployeeTimeout = setTimeout(async () => {
          const newListEmployee = await employeeService.getFilter(
            20,
            1,
            newValue
          );
          this.listEmployeeSearch = newListEmployee.data;
        }, 500);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí sự kiện keydown cbb nhân viên mua hàng
     * created by : BNTIEN
     * created date: 01-08-2023 08:33:33
     */
    onKeyDownEmployeeCBBSingle(index) {
      this.provider.FullName = this.listEmployeeSearch.Data[index].FullName;
      this.provider.EmployeeId = this.listEmployeeSearch.Data[index].EmployeeId;
      this.isBorderRed.FullName = false;
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn nhân viên mua hàng
     * created by : BNTIEN
     * created date: 29-05-2023 07:54:52`
     */
    onSelectedTermPayment(termPayment) {
      this.provider.TermPaymentName = termPayment.TermPaymentName;
      this.provider.TermPaymentId = termPayment.TermPaymentId;
      this.provider.NumberDayOwed = termPayment.NumberDayOwed;
      this.isBorderRed.TermPaymentName = false;
    },

    /**
     * Mô tả: Lắng nghe sự thay đổi text trong input search employee và tìm kiếm trong combobox
     * created by : BNTIEN
     * created date: 06-06-2023 22:31:16
     */
    async onSearchChangeTermPayment(newValue) {
      this.isBorderRed.TermPaymentName = false;
      this.isBorderRed.TermPaymentId = false;
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchTermPaymentTimeout);
        this.provider.TermPaymentName = newValue;
        delete this.provider.TermPaymentId;
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchTermPaymentTimeout = setTimeout(async () => {
          const newListTermPayment = await termPamentService.getFilter(
            20,
            1,
            newValue
          );
          this.listTermPayment = newListTermPayment.data;
        }, 500);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí sự kiện keydown cbb nhân viên mua hàng
     * created by : BNTIEN
     * created date: 01-08-2023 08:33:33
     */
    onKeyDownTermPaymentCBBSingle(index) {
      this.provider.TermPaymentName =
        this.listTermPayment.Data[index].TermPaymentName;
      this.provider.TermPaymentId =
        this.listTermPayment.Data[index].TermPaymentId;
      this.provider.NumberDayOwed =
        this.listTermPayment.Data[index].NumberDayOwed;
      this.isBorderRed.TermPaymentName = false;
    },

    /**
     * Mô tả: Hàm thêm 1 dòng tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 30-07-2023 21:24:11
     */
    btnAddRowAccount() {
      this.provider.AccountProviders.push({
        AccountNumber: "",
        BankName: "",
        BankBranch: "",
        BankAddress: "",
      });
    },

    /**
     * Mô tả: Xóa 1 dòng tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 30-07-2023 21:59:03
     */
    deleteRowAccount(index) {
      this.provider.AccountProviders.splice(index, 1);
    },

    /**
     * Mô tả: Xóa tất cả dòng tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 01-08-2023 15:49:29
     */
    deleteAllRowAccount() {
      if (this.provider.AccountProviders.length > 0) {
        this.provider.AccountProviders.splice(
          0,
          this.provider.AccountProviders.length
        );
      }
    },

    /**
     * Mô tả: Thêm 1 dòng địa chỉ
     * created by : BNTIEN
     * created date: 01-08-2023 16:04:10
     */
    btnAddRowAddress() {
      this.provider.DeliveryAddresses.push({ DeliveryAddressName: "" });
    },

    /**
     * Mô tả: Xóa 1 dòng địa chỉ giao hàng
     * created by : BNTIEN
     * created date: 30-07-2023 21:59:03
     */
    deleteRowAddress(index) {
      this.provider.DeliveryAddresses.splice(index, 1);
    },

    /**
     * Mô tả: Xóa tất cả dòng tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 01-08-2023 15:49:29
     */
    btnDeleteAllRowAddress() {
      if (this.provider.DeliveryAddresses.length > 0) {
        this.provider.DeliveryAddresses.splice(
          0,
          this.provider.DeliveryAddresses.length
        );
      }
    },

    /**
     * Mô tả: Chọn giá trị trong cbb xưng hô
     * created by : BNTIEN
     * created date: 01-08-2023 05:09:12
     */
    onSelectedVocative(data) {
      this.provider.Vocative = data.Vocative;
    },

    /**
     * Mô tả: Chọn vị trí địa lí
     * created by : BNTIEN
     * created date: 01-08-2023 05:25:54
     */
    async onSelectedLocation(data, propName) {
      if (propName == "LocationCountry") {
        if (data.LocationCountry != this.provider.LocationCountry) {
          this.provider.LocationCountry = data.LocationCountry;
          this.isBorderRed.LocationCountry = false;
          this.listCity.All = await this.getListLocation(2, data.LocationCode);
          this.listCity.Search = await this.getListLocation(
            2,
            data.LocationCode
          );

          this.provider.LocationCity = "";
          this.provider.LocationDistrict = "";
          this.provider.LocationVillage = "";
          this.listDistrict = { All: [], Search: [] };
          this.listVillage = { All: [], Search: [] };
        }
      }
      if (propName == "LocationCity") {
        if (data.LocationCity != this.provider.LocationCity) {
          this.provider.LocationCity = data.LocationCity;
          this.isBorderRed.LocationCity = false;
          this.listDistrict.All = await this.getListLocation(
            3,
            data.LocationCode
          );
          this.listDistrict.Search = await this.getListLocation(
            3,
            data.LocationCode
          );
          this.provider.LocationDistrict = "";
          this.provider.LocationVillage = "";
          this.listVillage = { All: [], Search: [] };
        }
      }
      if (propName == "LocationDistrict") {
        if (data.LocationDistrict != this.provider.LocationDistrict) {
          this.provider.LocationDistrict = data.LocationDistrict;
          this.isBorderRed.LocationDistrict = false;
          this.listVillage.All = await this.getListLocation(
            4,
            data.LocationCode
          );
          this.listVillage.Search = await this.getListLocation(
            4,
            data.LocationCode
          );
          this.provider.LocationVillage = "";
        }
      }
      if (propName == "LocationVillage") {
        this.provider.LocationVillage = data.LocationVillage;
        this.isBorderRed.LocationVillage = false;
      }
    },

    /**
     * Mô tả: Chọn tài khoản công nợ phải thu
     * created by : BNTIEN
     * created date: 01-08-2023 10:48:54
     */
    selectedReceivable(account) {
      this.provider.AccountReceivableId = account.AccountReceivableId;
      this.provider.AccountReceivableNumber = account.AccountReceivableNumber;
      this.isBorderRed.AccountReceivableNumber = false;
    },

    /**
     * Mô tả: Chọn tài khoản công nợ phải trả
     * created by : BNTIEN
     * created date: 01-08-2023 10:48:54
     */
    selectedPayable(account) {
      this.provider.AccountPayableId = account.AccountPayableId;
      this.provider.AccountPayableNumber = account.AccountPayableNumber;
      this.isBorderRed.AccountPayableNumber = false;
    },
  },

  beforeUnmount() {
    this.$_MISAEmitter.off("cancelDialogDataChange");
    this.$_MISAEmitter.off("noDialogDataChange");
    this.$_MISAEmitter.off("yesDialogDataChange");
    this.$_MISAEmitter.off("closeDialogCodeExist");
    this.$_MISAEmitter.off("closeDialogDataError");
    this.$_MISAEmitter.off("toggleCBBSelectMultiple");
    this.$_MISAEmitter.off("deleteItemCBBSelectMultiple");
    this.$_MISAEmitter.off("handleScrollCBBSelectMultiple");
    this.$_MISAEmitter.off("onSearchChangeCBBSelectMultiple");
    this.$_MISAEmitter.off("onSelectedEntityCBBSingle");
    this.$_MISAEmitter.off("onSearchChangeCBBSingle");
    this.$_MISAEmitter.off("onKeyDownEntityCBBSingle");
    this.$_MISAEmitter.off("onSelectedEntityCBB");
    this.$_MISAEmitter.off("onSearchChangeCBB");
    this.$_MISAEmitter.off("onKeyDownEntityCBB");
    this.$refs.FormDetailProvider.removeEventListener(
      "keydown",
      this.handleKeyDown
    );
    this.$_MISAEmitter.off("onSelectedEntityFormCBB");
  },
};
</script>

<style scoped>
@import url(./ProviderDetail.css);

input {
  height: 26px;
}

.active-layout {
  background-color: rgb(159, 207, 225);
  height: 30px;
}

#detail-info-provider input[type="checkbox"] {
  height: 20px;
  width: 20px;
}

#detail-info-provider input[type="radio"] {
  height: 20px;
}

#detail-info-provider .table-input-has-data td:first-child {
  border-bottom: 1px solid var(--color-border-default);
}

.border-red {
  border: 1px solid red;
}

#detail-info-provider .overflow-auto {
  overflow: auto;
}
</style>
