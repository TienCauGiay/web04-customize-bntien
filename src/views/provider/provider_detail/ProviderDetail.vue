<template>
  <div id="detail-info-provider" class="position-display-center" ref="FormDetailProvider">
    <div class="form-detail-toolbar">
      <div class="question-icon icon-tb" :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.HELP"></div>
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
          <b>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.infoProvider }}</b>
        </p>
        <div class="entity-check">
          <input type="radio" name="typeObject" :checked="!this.provider.IsPersonal" @click="handleClickInstitute" />
          <span @click="handleClickInstitute">{{
            this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.organization
          }}</span>
        </div>
        <div class="entity-check">
          <input type="radio" name="typeObject" :checked="this.provider.IsPersonal" @click="handleClickPersonal" />
          <span @click="handleClickPersonal">{{
            this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.personal
          }}</span>
        </div>
        <div class="entity-check" id="provider-title-input-checkbox">
          <input type="checkbox" :checked="provider.IsCustomer" @click="toggleCheckboxCustomer" />
          <span @click="toggleCheckboxCustomer">{{
            this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.isCustomer
          }}</span>
        </div>
      </div>
      <div class="form-detail-content">
        <!-- Là tổ chức -->
        <template v-if="!this.provider.IsPersonal">
          <div class="half-content">
            <div class="col-md-n">
              <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.taxCode }}</label>
              <div class="container-input">
                <misa-input
                  v-model="provider.TaxCode"
                  ref="TaxCode"
                  :class="{ 'border-red': isBorderRed.TaxCode }"
                  @input="setIsBorderRed('TaxCode')"
                  @mouseenter="isHovering.TaxCode = true"
                  @mouseleave="isHovering.TaxCode = false"
                ></misa-input>
                <div class="misa-tooltip" v-if="isHovering.TaxCode && isBorderRed.TaxCode">
                  {{ errors["TaxCode"] }}
                </div>
              </div>
            </div>
            <div class="col-md-tb">
              <label>
                {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.providerCode }}
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
              <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.phoneNumber }}</label>
              <div class="container-input">
                <misa-input
                  v-model="provider.PhoneNumber"
                  ref="PhoneNumber"
                  :class="{ 'border-red': isBorderRed.PhoneNumber }"
                  @input="setIsBorderRed('PhoneNumber')"
                  @mouseenter="isHovering.PhoneNumber = true"
                  @mouseleave="isHovering.PhoneNumber = false"
                ></misa-input>
                <div class="misa-tooltip" v-if="isHovering.PhoneNumber && isBorderRed.PhoneNumber">
                  {{ errors["PhoneNumber"] }}
                </div>
              </div>
            </div>
            <div class="col-md-tb">
              <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.website }}</label>
              <div class="container-input">
                <misa-input
                  v-model="provider.Website"
                  ref="Website"
                  :class="{ 'border-red': isBorderRed.Website }"
                  @input="setIsBorderRed('Website')"
                  @mouseenter="isHovering.Website = true"
                  @mouseleave="isHovering.Website = false"
                ></misa-input>
                <div class="misa-tooltip" v-if="isHovering.Website && isBorderRed.Website">
                  {{ errors["Website"] }}
                </div>
              </div>
            </div>
          </div>
          <div class="half-content">
            <div class="col-md-l">
              <label>
                {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.providerName }}
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
              <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.groupProvider }}</label>
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
              <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.address }}</label>
              <div class="container-input">
                <misa-input-textarea
                  v-model="provider.Address"
                  ref="Address"
                  :class="{ 'border-red': isBorderRed.Address }"
                  @input="setIsBorderRed('Address')"
                  @mouseenter="isHovering.Address = true"
                  @mouseleave="isHovering.Address = false"
                  :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderAddress"
                ></misa-input-textarea>
                <div class="misa-tooltip" v-if="isHovering.Address && isBorderRed.Address">
                  {{ errors["Address"] }}
                </div>
              </div>
            </div>
          </div>
          <div class="half-content">
            <div class="col-md-l">
              <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.purchasStaff }}</label>
              <misa-combobox-select-single
                :propId="'EmployeeId'"
                :propCode="'EmployeeCode'"
                :propName="'FullName'"
                :haederCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.headerCBBEmployee"
                :bodyCBB="['EmployeeCode', 'FullName']"
                :isBorderRedCBB="isBorderRed"
                :errorsCBB="errors"
                :entityCBB="provider"
                :listEntitySearchCBB="listEmployeeSearch"
                ref="EmployeeId"
              ></misa-combobox-select-single>
            </div>
          </div>
        </template>
        <!-- Là cá nhân -->
        <div class="half-content" v-if="this.provider.IsPersonal">
          <div class="col-md-tb">
            <label>
              {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.providerCode }}
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
            <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.taxCode }}</label>
            <div class="container-input">
              <misa-input
                v-model="provider.TaxCode"
                ref="TaxCode"
                :class="{ 'border-red': isBorderRed.TaxCode }"
                @input="setIsBorderRed('TaxCode')"
                @mouseenter="isHovering.TaxCode = true"
                @mouseleave="isHovering.TaxCode = false"
              ></misa-input>
              <div class="misa-tooltip" v-if="isHovering.TaxCode && isBorderRed.TaxCode">
                {{ errors["TaxCode"] }}
              </div>
            </div>
          </div>
        </div>
        <div class="half-content" id="group-provider" v-if="this.provider.IsPersonal">
          <div class="col-md-l">
            <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.groupProvider }}</label>
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
            <label
              >{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.providerName }}
              <span class="s-require">*</span>
            </label>
            <misa-combobox
              :isBorderRedCBB="isBorderRed"
              :entityCBB="provider"
              :errorsCBB="errors"
              :listEntitySearchCBB="listVocative"
              :propName="'Vocative'"
              :propId="'Id'"
              :placeholderInputCBB="
                this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderVocative
              "
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
                :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderProviderName"
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
            <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.purchasStaff }}</label>
            <misa-combobox-select-single
              :propId="'EmployeeId'"
              :propCode="'EmployeeCode'"
              :propName="'FullName'"
              :haederCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.headerCBBEmployee"
              :bodyCBB="['EmployeeCode', 'FullName']"
              :isBorderRedCBB="isBorderRed"
              :errorsCBB="errors"
              :entityCBB="provider"
              :listEntitySearchCBB="listEmployeeSearch"
              ref="EmployeeId"
            ></misa-combobox-select-single>
          </div>
        </div>
        <div class="half-content-2" v-if="this.provider.IsPersonal">
          <div class="col-md-l">
            <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.address }}</label>
            <div class="container-input">
              <misa-input-textarea
                v-model="provider.Address"
                ref="Address"
                :class="{ 'border-red': isBorderRed.Address }"
                @input="setIsBorderRed('Address')"
                @mouseenter="isHovering.Address = true"
                @mouseleave="isHovering.Address = false"
                :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderAddress"
              ></misa-input-textarea>
              <div class="misa-tooltip" v-if="isHovering.Address && isBorderRed.Address">
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
              {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.infoContact }}
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('termPayment')"
              :class="{ 'active-layout': selectLayout.termPayment }"
            >
              {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.termPayment }}
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('bankAccount')"
              :class="{ 'active-layout': selectLayout.bankAccount }"
            >
              {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.bankAccount }}
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('addressOther')"
              :class="{ 'active-layout': selectLayout.addressOther }"
            >
              {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.addressOther }}
            </button>
            <button
              class="select-layout-item"
              @click="handleSelectLayout('note')"
              :class="{ 'active-layout': selectLayout.note }"
            >
              {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.note }}
            </button>
          </div>
          <!-- Là Tổ chức nhưng không là khách hàng -->
          <div
            class="content-select-layout"
            v-if="!this.provider.IsPersonal && selectLayout.infoContact && !provider.IsCustomer"
          >
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-n" style="position: relative">
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.personalContact }}</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listVocative"
                    :propName="'Vocative'"
                    :propId="'Id'"
                    :placeholderInputCBB="
                      this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderVocative
                    "
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
                      :placeholder="
                        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderProviderName
                      "
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.NameContacter &&
                        (isBorderRed.NameContacter || !provider.NameContacter) &&
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
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.lawyer }}</label>
                  <div class="container-input">
                    <misa-input
                      ref="Lawyer"
                      v-model="provider.Lawyer"
                      :class="{ 'border-red': isBorderRed.Lawyer }"
                      @input="setIsBorderRed('Lawyer')"
                      @mouseenter="isHovering.Lawyer = true"
                      @mouseleave="isHovering.Lawyer = false"
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.lawyer"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="isHovering.Lawyer && (isBorderRed.Lawyer || !provider.Lawyer) && errors['Lawyer']"
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
                        (isBorderRed.EmailContacter || !provider.EmailContacter) &&
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
                      :placeholder="
                        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.phoneNumberContacter
                      "
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberContacter &&
                        (isBorderRed.PhoneNumberContacter || !provider.PhoneNumberContacter) &&
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
            v-if="!this.provider.IsPersonal && selectLayout.infoContact && provider.IsCustomer"
          >
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-n" style="position: relative">
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.personalContact }}</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listVocative"
                    :propName="'Vocative'"
                    :propId="'Id'"
                    :placeholderInputCBB="
                      this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderVocative
                    "
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
                      :placeholder="
                        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderProviderName
                      "
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.NameContacter &&
                        (isBorderRed.NameContacter || !provider.NameContacter) &&
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
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.nameReceiver }}</label>
                  <div class="container-input">
                    <misa-input
                      ref="NameReceiver"
                      v-model="provider.NameReceiver"
                      :class="{ 'border-red': isBorderRed.NameReceiver }"
                      @input="setIsBorderRed('NameReceiver')"
                      @mouseenter="isHovering.NameReceiver = true"
                      @mouseleave="isHovering.NameReceiver = false"
                      :placeholder="
                        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.placeholderProviderName
                      "
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
                      :placeholder="'Email'"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.EmailContacter &&
                        (isBorderRed.EmailContacter || !provider.EmailContacter) &&
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
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.emails"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.EmailReceiver &&
                        (isBorderRed.EmailReceiver || !provider.EmailReceiver) &&
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
                      :placeholder="
                        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.phoneNumberContacter
                      "
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberContacter &&
                        (isBorderRed.PhoneNumberContacter || !provider.PhoneNumberContacter) &&
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
                      :placeholder="
                        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.phoneNumberContacter
                      "
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberReceiver &&
                        (isBorderRed.PhoneNumberReceiver || !provider.PhoneNumberReceiver) &&
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
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.lawyer }}</label>
                  <div class="container-input">
                    <misa-input
                      ref="Lawyer"
                      v-model="provider.Lawyer"
                      :class="{ 'border-red': isBorderRed.Lawyer }"
                      @input="setIsBorderRed('Lawyer')"
                      @mouseenter="isHovering.Lawyer = true"
                      @mouseleave="isHovering.Lawyer = false"
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.lawyer"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="isHovering.Lawyer && (isBorderRed.Lawyer || !provider.Lawyer) && errors['Lawyer']"
                    >
                      {{ errors["Lawyer"] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Là cá nhân nhưng không là khách hàng -->
          <div class="content-select-layout" v-if="this.provider.IsPersonal && selectLayout.infoContact">
            <div class="content-select-layout-row">
              <div class="half-content">
                <div class="col-md-l">
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.infoContact }}</label>
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
                        (isBorderRed.EmailContacter || !provider.EmailContacter) &&
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
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.infoIdentity }}</label>
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
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.identityNumber"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.IdentityNumberContacter &&
                        (isBorderRed.IdentityNumberContacter || !provider.IdentityNumberContacter) &&
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
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.phonePersonal"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneNumberContacter &&
                        (isBorderRed.PhoneNumberContacter || !provider.PhoneNumberContacter) &&
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
                      v-if="isHovering.IdentityDateContacter && isBorderRed.IdentityDateContacter"
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
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.phoneLandline"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.PhoneLandlineContacter &&
                        (isBorderRed.PhoneLandlineContacter || !provider.PhoneLandlineContacter) &&
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
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.identityPlace"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="
                        isHovering.IdentityPlace &&
                        (isBorderRed.IdentityPlace || !provider.IdentityPlace) &&
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
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.lawyer }}</label>
                  <div class="container-input">
                    <misa-input
                      ref="Lawyer"
                      v-model="provider.Lawyer"
                      :class="{ 'border-red': isBorderRed.Lawyer }"
                      @input="setIsBorderRed('Lawyer')"
                      @mouseenter="isHovering.Lawyer = true"
                      @mouseleave="isHovering.Lawyer = false"
                      :placeholder="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.lawyer"
                    ></misa-input>
                    <div
                      class="misa-tooltip"
                      v-if="isHovering.Lawyer && (isBorderRed.Lawyer || !provider.Lawyer) && errors['Lawyer']"
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
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.termPayment }}</label>
                    <misa-combobox-select-single
                      :propCode="'TermPaymentCode'"
                      :propId="'TermPaymentId'"
                      :propName="'TermPaymentName'"
                      :haederCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.headerCBBTermPayment"
                      :bodyCBB="['TermPaymentCode', 'TermPaymentName']"
                      :isBorderRedCBB="isBorderRed"
                      :errorsCBB="errors"
                      :entityCBB="provider"
                      :listEntitySearchCBB="listTermPayment"
                      ref="TermPaymentId"
                    ></misa-combobox-select-single>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.numberDayOwed }}</label>
                    <div class="container-input">
                      <misa-number
                        ref="NumberDayOwed"
                        v-model="provider.NumberDayOwed"
                        :class="[{ 'border-red': isBorderRed.NumberDayOwed }, 'right-to-left']"
                        @input="setIsBorderRed('NumberDayOwed')"
                        @mouseenter="isHovering.NumberDayOwed = true"
                        @mouseleave="isHovering.NumberDayOwed = false"
                        :maxLength="10"
                      ></misa-number>
                      <div
                        class="misa-tooltip"
                        v-if="
                          isHovering.NumberDayOwed &&
                          (isBorderRed.NumberDayOwed || !provider.NumberDayOwed) &&
                          errors['NumberDayOwed']
                        "
                      >
                        {{ errors["NumberDayOwed"] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.amountDebt }}</label>
                    <div class="container-input">
                      <misa-number
                        ref="AmountDebt"
                        v-model="provider.AmountDebt"
                        :class="[{ 'border-red': isBorderRed.AmountDebt }, 'right-to-left']"
                        @input="setIsBorderRed('AmountDebt')"
                        @mouseenter="isHovering.AmountDebt = true"
                        @mouseleave="isHovering.AmountDebt = false"
                        :maxLength="14"
                      ></misa-number>
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
                  <div class="col-md-quater" style="position: relative" id="multiple-cbb-no-icon">
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.accountPayable }}</label>
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="provider"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listPayable"
                      :propName="'AccountName'"
                      :valueInput="provider.AccountPayableNumber"
                      :propCode="'AccountPayableNumber'"
                      :propBorderRed="'AccountPayableId'"
                      :textColFirst="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty.accountNumber"
                      :textColSecond="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty.accountName"
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
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.termPayment }}</label>
                    <misa-combobox-select-single
                      :propCode="'TermPaymentCode'"
                      :propId="'TermPaymentId'"
                      :propName="'TermPaymentName'"
                      :haederCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.headerCBBTermPayment"
                      :bodyCBB="['TermPaymentCode', 'TermPaymentName']"
                      :isBorderRedCBB="isBorderRed"
                      :errorsCBB="errors"
                      :entityCBB="provider"
                      :listEntitySearchCBB="listTermPayment"
                      ref="TermPaymentId"
                    ></misa-combobox-select-single>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.numberDayOwed }}</label>
                    <div class="container-input">
                      <misa-number
                        ref="NumberDayOwed"
                        v-model="provider.NumberDayOwed"
                        :class="[{ 'border-red': isBorderRed.NumberDayOwed }, 'right-to-left']"
                        @input="setIsBorderRed('NumberDayOwed')"
                        @mouseenter="isHovering.NumberDayOwed = true"
                        @mouseleave="isHovering.NumberDayOwed = false"
                        :maxLength="10"
                      ></misa-number>
                      <div
                        class="misa-tooltip"
                        v-if="
                          isHovering.NumberDayOwed &&
                          (isBorderRed.NumberDayOwed || !provider.NumberDayOwed) &&
                          errors['NumberDayOwed']
                        "
                      >
                        {{ errors["NumberDayOwed"] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-quater" style="position: relative">
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.amountDebt }}</label>
                    <div class="container-input">
                      <misa-number
                        ref="AmountDebt"
                        v-model="provider.AmountDebt"
                        :class="[{ 'border-red': isBorderRed.AmountDebt }, 'right-to-left']"
                        @input="setIsBorderRed('AmountDebt')"
                        @mouseenter="isHovering.AmountDebt = true"
                        @mouseleave="isHovering.AmountDebt = false"
                        :maxLength="14"
                      ></misa-number>
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
                  <div class="col-md-quater" style="position: relative" id="multiple-cbb-no-icon">
                    <label>{{
                      this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.accountReceivable
                    }}</label>
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="provider"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listReceivable"
                      :propName="'AccountName'"
                      :valueInput="provider.AccountReceivableNumber"
                      :propCode="'AccountReceivableNumber'"
                      :propBorderRed="'AccountReceivableId'"
                      :textColFirst="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty.accountNumber"
                      :textColSecond="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty.accountName"
                    ></misa-form-combobox>
                  </div>
                  <div class="col-md-quater" style="position: relative" id="multiple-cbb-no-icon">
                    <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.accountPayable }}</label>
                    <misa-form-combobox
                      :isBorderRedFormCBB="isBorderRed"
                      :entityFormCBB="provider"
                      :errorsFormCBB="errors"
                      :listEntitySearchFormCBB="listPayable"
                      :propName="'AccountName'"
                      :valueInput="provider.AccountPayableNumber"
                      :propCode="'AccountPayableNumber'"
                      :propBorderRed="'AccountPayableId'"
                      :textColFirst="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty.accountNumber"
                      :textColSecond="this.$_MISAResource[this.$_LANG_CODE].ACCOUNT.form.textProperty.accountName"
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
              'overflow-auto': selectLayout.bankAccount || selectLayout.addressOther,
            }"
          >
            <table class="table-input" id="table-input-account">
              <thead class="table-input-title">
                <tr>
                  <th class="table-input-col-1">
                    {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.accountNumber }}
                  </th>
                  <th class="table-input-col-2">
                    {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.bankName }}
                  </th>
                  <th class="table-input-col-3">
                    {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.bankBranch }}
                  </th>
                  <th class="table-input-col-4">
                    {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.cityOfBank }}
                  </th>
                  <th class="table-input-col-5"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in provider.AccountProviders" :key="index">
                  <tr v-if="item.Flag != this.$_MISAEnum.STATUS_FLAG.Delete">
                    <td class="table-input-col-1">
                      <misa-input v-model="item.AccountNumber" ref="AccountNumber"></misa-input>
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
                    <td class="table-input-col-5" @click="deleteRowAccount(index)">
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
                    :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.addRow"
                    @click="btnAddRowAccount"
                  ></misa-button-extra>
                  <misa-button-extra
                    :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.deleteAllRow"
                    @click="deleteAllRowAccount"
                  ></misa-button-extra>
                </td>
              </tfoot>
            </table>
          </div>
          <div class="content-select-layout" id="address-Other" v-if="selectLayout.addressOther">
            <div class="content-select-layout-half">
              <div class="half-content">
                <div class="col-md-l cbb-has-label" style="position: relative">
                  <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.location }}</label>
                  <misa-combobox
                    :isBorderRedCBB="isBorderRed"
                    :entityCBB="provider"
                    :errorsCBB="errors"
                    :listEntitySearchCBB="listCountry.Search"
                    :propName="'LocationCountry'"
                    :propId="'LocationId'"
                    :placeholderInputCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.country"
                    :indexSelectedCBB="
                      listCountry.All.findIndex((obj) => obj.LocationCode == locationDefault.LocationCode)
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
                    :placeholderInputCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.city"
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
                    :placeholderInputCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.district"
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
                    :placeholderInputCBB="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.village"
                  ></misa-combobox>
                </div>
              </div>
            </div>
            <div
              id="delivery-address"
              class="content-select-layout-half"
              :class="{
                'overflow-auto': selectLayout.bankAccount || selectLayout.addressOther,
              }"
            >
              <table class="table-input" id="table-input-address-other">
                <thead class="table-input-title">
                  <tr>
                    <th class="delivery-1" colspan="2">
                      {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.deliveryAddress }}
                    </th>
                    <th class="delivery-2">
                      <input type="checkbox" @click="handleLikeAddressProvider" :checked="checkedDeliveryAddress" />
                    </th>
                    <th class="delivery-3" style="font-weight: 400">
                      {{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.likeAddressProvider }}
                    </th>
                    <th class="delivery-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(item, index) in provider.DeliveryAddresses" :key="index">
                    <tr class="table-input-has-data" v-if="item.Flag != this.$_MISAEnum.STATUS_FLAG.Delete">
                      <td colspan="4">
                        <misa-input v-model="item.DeliveryAddressName" ref="DeliveryAddressName"></misa-input>
                      </td>
                      <td class="delivery-4">
                        <div class="delete-row-table-input" @click="deleteRowAddress(index)">
                          <div class="delete-icon"></div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
                <tfoot>
                  <td colspan="4">
                    <misa-button-extra
                      :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.addRow"
                      @click="btnAddRowAddress"
                    ></misa-button-extra>
                    <misa-button-extra
                      :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.deleteAllRow"
                      @click="btnDeleteAllRowAddress"
                    ></misa-button-extra>
                  </td>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="content-select-layout" v-if="selectLayout.note" id="content-select-layout-note">
            <label>{{ this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.note }}</label>
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
            :textButtonExtra="this.$_MISAResource[this.$_LANG_CODE].BUTTON.CANCEL"
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
            :textButtonDefault="this.$_MISAResource[this.$_LANG_CODE].BUTTON.SAVE_AND_ADD"
            @click="btnSaveAndAdd"
            :title="this.$_MISAResource[this.$_LANG_CODE].TOOLTIP.SAVE_AND_ADD"
          ></misa-button-default>
        </div>
      </div>
    </div>
    <!-- dialog input data not blank -->
    <misa-dialog-data-not-null
      v-if="isShowDialogDataNotNull"
      :valueNotNull="dataNotNull"
      :title="this.$_MISAResource[this.$_LANG_CODE].DIALOG.TITLE.DATA_INVALID"
    ></misa-dialog-data-not-null>
    <!-- dialog id Exist -->
    <misa-dialog-data-exist
      v-if="isShowDialogCodeExist"
      :textProp="this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.providerCode"
      :textEntityCodeExist="contentProviderCodeExist"
    ></misa-dialog-data-exist>
    <!-- dialog save and close -->
    <misa-dialog-data-change v-if="isShowDialogDataChange"></misa-dialog-data-change>
    <img v-show="isShowLoading" class="loading-form" src="../../../assets/img/loading.svg" alt="loading" />
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
      this.handleSelectLayout("infoContact");
      this.$emit("closeFormDetail");
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

    this.$_MISAEmitter.on("handleScrollCBBSelectMultiple", async (textSearch) => {
      await this.handleScrollCBBGroup(textSearch);
    });

    this.$_MISAEmitter.on("onSearchChangeCBBSelectMultiple", async (textSearch) => {
      await this.onSearchChangeGroup(textSearch);
    });

    this.$_MISAEmitter.on("onSelectedEntityCBB", async (data, propName) => {
      if (propName == "Vocative") {
        this.provider.Vocative = data.Vocative;
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

    this.$_MISAEmitter.on("handleScrollCBBSingle", async (textSearch, propId) => {
      if (propId == "EmployeeId") {
        await this.handleScrollEmployeeCBB(textSearch);
      }
      if (propId == "TermPaymentId") {
        await this.handleScrollTermPaymentCBB(textSearch);
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

    this.$_MISAEmitter.on("handleScrollCBBformCBB", async (propCode, textSearch) => {
      if (propCode == "AccountReceivableNumber") {
        await this.handleScrollReceivable(textSearch);
      }
      if (propCode == "AccountPayableNumber") {
        await this.handleScrollPayable(textSearch);
      }
    });

    this.$_MISAEmitter.on("onSearchChangeFormCBB", async (newValue, propCode) => {
      if (propCode == "AccountReceivableNumber") {
        await this.onSearchChangeReceivable(newValue);
      }
      if (propCode == "AccountPayableNumber") {
        await this.onSearchChangePayable(newValue);
      }
    });

    this.$_MISAEmitter.on("onKeyDownFormCBB", (index, propCode) => {
      if (propCode == "AccountReceivableNumber") {
        this.onKeyDownReceivable(index);
      }
      if (propCode == "AccountPayableNumber") {
        this.onKeyDownPayable(index);
      }
    });
  },

  mounted() {
    // focus vào ô đầu tiên khi mở form chi tiết
    this.focusCode();
    // Đăng kí các sự kiện
    this.$refs.FormDetailProvider.addEventListener("keydown", this.handleKeyDown);
  },

  data() {
    return {
      // Khai báo mảng lưu các thuộc tính cần validate theo thứ tự, phục vụ cho việc focus, hiển thị lỗi theo thứ tự
      providerProperty: this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.providerProperty,
      // Khai báo đối tượng provider
      provider: {},
      // Khai báo trạng thái hiển thị của dialog cảnh báo dữ liệu k được để trống
      isShowDialogDataNotNull: false,
      // Khai báo biến xác định nội dung trường nào k được để trống
      dataNotNull: [],
      // Khai báo trạng thái hiển thị của dialog cảnh báo mã nhà cung cấp đã tồn tại
      isShowDialogCodeExist: false,
      // Khai báo biến xác định thông tin của mã nhà cung cấp đã tồn tại
      contentProviderCodeExist: "",
      // Khai báo biến quy định trang thái hiển thị dialog dữ liệu đã bị thay đổi
      isShowDialogDataChange: false,
      // Khai báo biến xác định border red
      isBorderRed: {},
      // Khai báo biên lưu mã nhà cung cấp tự động sinh ra
      newProviderCode: null,
      // Khai báo biến chứa danh sách đối tượng lỗi
      errors: {},
      // Khai báo biến chứa danh sách các ô input khi hover
      isHovering: {},
      // Khai báo danh sách xưng hô
      listVocative: this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.listVocative,
      // Biến quy định layout nào đang được chọn
      selectLayout: this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.selectLayout,
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
      locationDefault: this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.locationDefault,
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
      // Trang hiện tại trong cbb term payment
      currentPageTermPayment: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo biến lưu danh sách tài khoản công nợ phải thu
      listReceivable: [],
      // trang hiện tại của tài khoản công nợ phải thu
      currentPageReceivable: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo biến quy định sau 1 khoảng thời gian mới thực hiện tìm kiếm ở combobox tài khoản nợ phải thu
      searchReceivableTimeout: null,
      // Khai báo biến lưu danh sách tài khoản công nợ phải trả
      listPayable: [],
      // trang hiện tại của tài khoản công nợ phải trả
      currentPagePayable: this.$_MISAEnum.RECORD.CURRENT_PAGE,
      // Khai báo biến quy định sau 1 khoảng thời gian mới thực hiện tìm kiếm ở combobox tài khoản nợ phải trả
      searchPayableTimeout: null,
      // Khai báo biến lưu số dòng địa chỉ giao hàng
      rowNumberAddress: [1],
      // Biến lưu danh sách tài khoản ngân hàng trước khi bị thay đổi ở chức năng sửa
      accountProviderOlds: [],
      // Biến lưu danh sách địa chỉ giao hàng trước khi bị thay đổi ở chức năng sửa
      deliveryAddressOlds: [],
      // Xác định trạng thái checkbox giống địa chỉ nhà cung cấp
      checkedDeliveryAddress: false,
      // Biến quy định trạng thái hiển thị loading
      isShowLoading: false,
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
     * Mô tả: Lấy mã nhà cung cấp có giá trị lớn nhất trong hệ thống
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
        this.listCountry.Search = this.listCountry.All;
        this.listCity.All = await this.getListLocation(2, this.locationDefault.LocationCode);
        this.listCity.Search = this.listCity.All;
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
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm focus vào ô input mã số thuế
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
    hasDataChanged(obj1, obj2) {
      return JSON.stringify(obj1) !== JSON.stringify(obj2);
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
     * Mô tả: Tìm kiếm phân trang nhân viên mua hàng
     * created by : BNTIEN
     * created date: 30-07-2023 00:10:44
     */
    async getListEmployee() {
      try {
        const res = await employeeService.getFilter(20, this.currentPageEmployee, "");
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
        const res = await termPamentService.getFilter(pageSize, pageNumber, textSearch);
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
        const res = await accountService.getReceivable(pageSize, pageNumber, textSearch);
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
        const res = await accountService.getPayable(pageSize, pageNumber, textSearch);
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
          const res = await accountProviderService.getByProviderId(this.provider.ProviderId);
          this.provider.AccountProviders = res.data;
          this.accountProviderOlds = JSON.parse(JSON.stringify(res.data));
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
          const res = await deliveryAddressService.getByProviderId(this.provider.ProviderId);
          this.provider.DeliveryAddresses = res.data;
          this.deliveryAddressOlds = JSON.parse(JSON.stringify(res.data));
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
      if (this.hasDataChanged(this.providerSelected, this.provider)) {
        this.isShowDialogDataChange = true;
      } else {
        this.handleSelectLayout("infoContact");
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
        this.errors[key] = this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateNotNull[key];
        this.isBorderRed[key] = true;
        this.dataNotNull.push(this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateNotNull[key]);
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
        this.errors[key] = this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[key].Warning;
        this.isBorderRed[key] = true;
        this.dataNotNull.push(this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[key].Warning);
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
                  this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[refInput].Limit
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
                this.errors.FullName = `${this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.employee}${
                  this.provider.FullName
                }${this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.end}`;
                this.isBorderRed.FullName = true;
                this.dataNotNull.push(
                  `${this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.employee}${
                    this.provider.FullName
                  }${this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.end}`
                );
                this.isShowDialogDataNotNull = true;
                return;
              }
              break;
            case "TermPaymentName":
              if (this.provider.TermPaymentName && !this.provider.TermPaymentId) {
                this.errors.TermPaymentName = `${
                  this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.termPayment
                }${this.provider.TermPaymentName}${
                  this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.end
                }`;
                this.isBorderRed.TermPaymentName = true;
                this.dataNotNull.push(
                  `${this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.termPayment}${
                    this.provider.TermPaymentName
                  }${this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.end}`
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
                    this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[refInput].Limit
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
                    this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[refInput].Limit
                  )
                ) {
                  this.setErrorMaxLength(refInput);
                } else if (helperCommon.isFormatEmail(this.provider[refInput])) {
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
                    this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.maxLength[refInput].Limit
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
      const responseHandle = helperCommon.handleErrorInput(errors, providerProperty);
      this.errors = responseHandle.error;
      this.isBorderRed = responseHandle.isBorderRed;
      this.dataNotNull = responseHandle.dataNotNull;
      if (this.dataNotNull.length > 0) {
        this.isShowDialogDataNotNull = true;
      }
    },
    /**
     * Mô tả: Hàm kiểm tra xem mã nhà cung cấp đã tồn tại trong database hay chưa
     * created by : BNTIEN
     * created date: 29-06-2023 23:46:11
     */
    async checkProviderExists() {
      try {
        this.isShowLoading = true;
        const res = await providerService.getByCode(this.provider.ProviderCode);
        this.isShowLoading = false;
        return res.data;
      } catch {
        return null;
      }
    },
    /**
     * Mô tả: Hàm xử lí khi mã nhà cung cấp đã tồn tại trong hệ thống
     * created by : BNTIEN
     * created date: 30-06-2023 00:30:22
     */
    handleProviderExisted(providerExisted) {
      this.isShowDialogCodeExist = true;
      this.isBorderRed.ProviderCode = true;
      this.errors["ProviderCode"] = `${
        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.textProperty.providerCode
      } <${providerExisted.ProviderCode}> ${this.$_MISAResource[this.$_LANG_CODE].DIALOG.CONTENT.EXIST_DETAIL_END}`;
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
          this.provider.GroupIds = this.provider.GroupProvider.map((x) => x.GroupId);
        } else {
          this.provider.GroupIds = [];
        }
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Validate tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 09-08-2023 15:15:03
     */
    validateAccount() {
      let accountNumbers = [];
      if (this.statusFormMode === this.$_MISAEnum.FORM_MODE.Add) {
        accountNumbers = this.provider.AccountProviders.map((item) => item.AccountNumber);
      } else {
        accountNumbers = this.provider.AccountProviders.filter(
          (row) => row.Flag != this.$_MISAEnum.STATUS_FLAG.Delete
        ).map((item) => item.AccountNumber);
      }
      const accountNumberSet = new Set(accountNumbers);
      if (accountNumbers.length !== accountNumberSet.size) {
        return true;
      }
      return false;
    },

    /**
     * Mô tả: Xử lí dữ liệu tài khoản ngân hàng của các dòng xem có thay đổi không
     * created by : BNTIEN
     * created date: 09-08-2023 19:17:36
     */
    handleAccount() {
      if (this.accountProviderOlds && this.accountProviderOlds.length > 0) {
        for (let i = 0; i < this.accountProviderOlds.length; i++) {
          if (this.hasDataChanged(this.accountProviderOlds[i], this.provider.AccountProviders[i])) {
            if (this.provider.AccountProviders[i].Flag != this.$_MISAEnum.STATUS_FLAG.Delete) {
              this.provider.AccountProviders[i].Flag = this.$_MISAEnum.STATUS_FLAG.Update;
            }
          } else {
            this.provider.AccountProviders[i].Flag = this.$_MISAEnum.STATUS_FLAG.NoChange;
          }
        }
      }
    },

    /**
     * Mô tả: Xử lí dữ liệu tài khoản ngân hàng của các dòng xem có thay đổi không
     * created by : BNTIEN
     * created date: 09-08-2023 19:17:36
     */
    handleDeliveryAddress() {
      if (this.deliveryAddressOlds && this.deliveryAddressOlds.length > 0) {
        for (let i = 0; i < this.deliveryAddressOlds.length; i++) {
          if (this.hasDataChanged(this.deliveryAddressOlds[i], this.provider.DeliveryAddresses[i])) {
            if (this.provider.DeliveryAddresses[i].Flag != this.$_MISAEnum.STATUS_FLAG.Delete) {
              this.provider.DeliveryAddresses[i].Flag = this.$_MISAEnum.STATUS_FLAG.Update;
            }
          } else {
            this.provider.DeliveryAddresses[i].Flag = this.$_MISAEnum.STATUS_FLAG.NoChange;
          }
        }
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
            if (this.validateAccount()) {
              this.dataNotNull.push(this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.account);
              this.isShowDialogDataNotNull = true;
              return;
            }
            // Kiểm tra xem mã nhà cung cấp đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let providerByCode = await this.checkProviderExists();
            // Nếu mã nhà cung cấp chưa tồn tại trong hệ thống
            if (!providerByCode) {
              this.setGroupIds();
              if (this.provider.NumberDayOwed && typeof this.provider.NumberDayOwed === "string") {
                this.provider.NumberDayOwed = this.provider.NumberDayOwed.replace(/\./g, "");
              }
              if (this.provider.AmountDebt && typeof this.provider.NumberDayOwed === "string") {
                this.provider.AmountDebt = this.provider.AmountDebt.replace(/\./g, "");
              }
              this.isShowLoading = true;
              const res = await providerService.create(this.provider);
              this.isShowLoading = false;
              if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(res.status) && res.data > 0) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_CTEATE
                );
                this.handleSelectLayout("infoContact");
                this.$emit("closeFormDetail");
                this.$_MISAEmitter.emit("refreshDataTable");
              }
            } else {
              // Nếu mã nhà cung cấp đã tồn tại trong hệ thống
              this.handleProviderExisted(providerByCode);
            }
          } catch (error) {
            this.isShowLoading = false;
            this.handleErrorInputProvider(error, this.providerProperty);
          }
        }
      } else {
        // Nếu form ở trạng thái sửa
        // Kiểm tra xem dữ liệu có thay đổi hay k (Trường hợp đã thay đổi)
        if (this.hasDataChanged(this.providerSelected, this.provider)) {
          this.validateProvider();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              if (this.validateAccount()) {
                this.dataNotNull.push(this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.account);
                this.isShowDialogDataNotNull = true;
                return;
              }
              // Kiểm tra xem mã nhà cung cấp đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let providerByCode = await this.checkProviderExists();
              // Nếu mã nhà cung cấp chưa tồn tại trong hệ thống hoặc tồn tại nhưng trùng với nhà cung cấp đang sửa
              if (!providerByCode || providerByCode.ProviderCode === this.providerSelected.ProviderCode) {
                this.setGroupIds();
                this.handleAccount();
                this.handleDeliveryAddress();
                if (this.provider.NumberDayOwed && typeof this.provider.NumberDayOwed === "string") {
                  this.provider.NumberDayOwed = this.provider.NumberDayOwed.replace(/\./g, "");
                }
                if (this.provider.AmountDebt && typeof this.provider.NumberDayOwed === "string") {
                  this.provider.AmountDebt = this.provider.AmountDebt.replace(/\./g, "");
                }
                this.isShowLoading = true;
                const res = await providerService.update(this.providerSelected.ProviderId, this.provider);
                this.isShowLoading = false;
                if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) && res.data > 0) {
                  this.$_MISAEmitter.emit(
                    "onShowToastMessageUpdate",
                    this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_UPDATE
                  );
                  this.handleSelectLayout("infoContact");
                  this.$emit("closeFormDetail");
                  this.$_MISAEmitter.emit("refreshDataTable");
                }
              } else {
                // Nếu mã nhà cung cấp đã tồn tại trong hệ thống
                this.handleProviderExisted(providerByCode);
              }
            } catch (error) {
              this.isShowLoading = false;
              this.handleErrorInputProvider(error, this.providerProperty);
            }
          }
        } else {
          this.handleSelectLayout("infoContact");
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
            if (this.validateAccount()) {
              this.dataNotNull.push(this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.account);
              this.isShowDialogDataNotNull = true;
              return;
            }
            // Kiểm tra xem mã nhà cung cấp đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
            let providerByCode = await this.checkProviderExists();
            if (!providerByCode) {
              // Nếu mã nhà cung cấp chưa tồn tại trong hệ thống
              this.setGroupIds();
              if (this.provider.NumberDayOwed && typeof this.provider.NumberDayOwed === "string") {
                this.provider.NumberDayOwed = this.provider.NumberDayOwed.replace(/\./g, "");
              }
              if (this.provider.AmountDebt && typeof this.provider.NumberDayOwed === "string") {
                this.provider.AmountDebt = this.provider.AmountDebt.replace(/\./g, "");
              }
              this.isShowLoading = true;
              const res = await providerService.create(this.provider);
              this.isShowLoading = false;
              if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusCreated(res.status) && res.data > 0) {
                this.$_MISAEmitter.emit(
                  "onShowToastMessage",
                  this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_CTEATE
                );
                this.provider = {};
                this.isBorderRed = {};
                this.$_MISAEmitter.emit("refreshDataTable");
                await this.getNewCode();
                this.provider.ProviderCode = this.newProviderCode;
                this.focusCode();
              }
            } else {
              // Nếu mã nhà cung cấp đã tồn tại trong hệ thống
              this.handleProviderExisted(providerByCode);
            }
          } catch (error) {
            this.isShowLoading = false;
            this.handleErrorInputProvider(error, this.providerProperty);
          }
        }
        // Nếu form ở trạng thái sửa
      } else {
        // Kiểm tra xem dữ liệu có thay đổi hay k
        if (this.hasDataChanged(this.providerSelected, this.provider)) {
          this.validateProvider();
          if (this.dataNotNull.length > 0) {
            this.isShowDialogDataNotNull = true;
          } else {
            try {
              if (this.validateAccount()) {
                this.dataNotNull.push(this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.validateLoggic.account);
                this.isShowDialogDataNotNull = true;
                return;
              }
              // Kiểm tra xem mã nhà cung cấp đã tồn tại trong database chưa, nếu đã tồn tại thì thông báo cho người dùng
              let providerByCode = await this.checkProviderExists();
              // Nếu mã nhà cung cấp chưa tồn tại trong hệ thống hoặc tồn tại trùng với nhà cung cấp đang sửa
              if (!providerByCode || providerByCode.ProviderCode === this.providerSelected.ProviderCode) {
                this.setGroupIds();
                this.handleAccount();
                this.handleDeliveryAddress();
                if (this.provider.NumberDayOwed && typeof this.provider.NumberDayOwed === "string") {
                  this.provider.NumberDayOwed = this.provider.NumberDayOwed.replace(/\./g, "");
                }
                if (this.provider.AmountDebt && typeof this.provider.NumberDayOwed === "string") {
                  this.provider.AmountDebt = this.provider.AmountDebt.replace(/\./g, "");
                }
                this.isShowLoading = true;
                const res = await providerService.update(this.providerSelected.ProviderId, this.provider);
                this.isShowLoading = false;
                this.provider = {};
                this.$_MISAEmitter.emit("setFormModeAdd");
                await this.getNewCode();
                this.provider.ProviderCode = this.newProviderCode;
                this.focusCode();
                this.$_MISAEmitter.emit("refreshDataTable");
                if (this.$_MISAEnum.CHECK_STATUS.isResponseStatusOk(res.status) && res.data > 0) {
                  this.$_MISAEmitter.emit(
                    "onShowToastMessageUpdate",
                    this.$_MISAResource[this.$_LANG_CODE].TEXT_CONTENT.SUCCESS_UPDATE
                  );
                }
              } else {
                // Nếu mã nhà cung cấp đã tồn tại trong hệ thống
                this.handleProviderExisted(providerByCode);
              }
            } catch (error) {
              this.isShowLoading = false;
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
      if (listPropError.includes("EmployeeId") && !listPropError.includes("FullName")) {
        listPropError.push("FullName");
      }

      if (listPropError.includes("TermPaymentId") && !listPropError.includes("TermPaymentName")) {
        listPropError.push("TermPaymentName");
      }

      for (const prop of this.providerProperty) {
        if (listPropError.includes(prop)) {
          // đợi DOM cập nhật trước khi thực thi focus
          if (prop === "EmployeeId" || prop === "FullName") {
            this.$nextTick(() => {
              this.$refs.EmployeeId.focus();
            });
          } else if (prop === "TermPaymentId" || prop === "TermPaymentName") {
            this.$nextTick(() => {
              this.$refs.TermPaymentId.focus();
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
      this.handleSelectLayout("infoContact");
      this.$emit("closeFormDetail");
    },
    /**
     * Mô tả: Hàm xử lí sự kiện đóng dialog cảnh báo mã nhà cung cấp đã tồn tại
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
     * Mô tả: Hàm xử lí sự kiện khi bấm vào button có trong dialog dữ liệu đã bị thay đổi
     * created by : BNTIEN
     * created date: 30-05-2023 23:43:38
     */
    async onYesDialogDataChange() {
      this.isShowDialogDataChange = false;
      await this.btnSave();
    },

    /**
     * Mô tả: Hàm reset tabindex về ô input mã nhà cung cấp khi tab nhảy đến icon close
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
      this.$nextTick(() => {
        this.$refs.TaxCode.focus();
      });
    },

    /**
     * Mô tả: Xử lí sự kiện click vào radio cá nhân
     * created by : BNTIEN
     * created date: 28-07-2023 13:43:49
     */
    handleClickPersonal() {
      this.provider.IsPersonal = true;
      this.$nextTick(() => {
        this.$refs.ProviderCode.focus();
      });
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
          this.provider.GroupProvider = this.provider.GroupProvider.filter((x) => x.GroupId != group.GroupId);
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
        this.provider.GroupProvider = this.provider.GroupProvider.filter((x) => x.GroupId != data.GroupId);
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
        const filteredGroups = await groupService.getFilter(20, this.currentPageGroup, textSearchGroup);
        this.listGroupSearch.Data = [...this.listGroupSearch.Data, ...filteredGroups.data.Data];
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
        this.isShowLoading = true;
        const filteredGroups = await groupService.getFilter(20, 1, textSearchGroup);
        this.isShowLoading = false;
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
          this.isShowLoading = true;
          const newListEmployee = await employeeService.getFilter(20, 1, newValue);
          this.isShowLoading = false;
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
     * Mô tả: scroll cbb employee
     * created by : BNTIEN
     * created date: 05-08-2023 11:39:17
     */
    async handleScrollEmployeeCBB(textSearch) {
      try {
        this.currentPageEmployee += 1;
        const filtered = await employeeService.getFilter(20, this.currentPageEmployee, textSearch);
        this.listEmployeeSearch.Data = [...this.listEmployeeSearch.Data, ...filtered.data.Data];
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Hàm xử lí sự kiện khi người dùng chọn điều khoản thanh toán
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
     * Mô tả: Lắng nghe sự thay đổi text trong input search điều khoản thanh toán và tìm kiếm trong combobox
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
          this.isShowLoading = true;
          const newListTermPayment = await termPamentService.getFilter(20, 1, newValue);
          this.isShowLoading = false;
          this.listTermPayment = newListTermPayment.data;
        }, 500);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Xử lí sự kiện keydown cbb điều khoản thanh toán
     * created by : BNTIEN
     * created date: 01-08-2023 08:33:33
     */
    onKeyDownTermPaymentCBBSingle(index) {
      this.provider.TermPaymentName = this.listTermPayment.Data[index].TermPaymentName;
      this.provider.TermPaymentId = this.listTermPayment.Data[index].TermPaymentId;
      this.provider.NumberDayOwed = this.listTermPayment.Data[index].NumberDayOwed;
      this.isBorderRed.TermPaymentName = false;
    },

    /**
     * Mô tả: Xử lí hàm scroll điều khoản thanh toán
     * created by : BNTIEN
     * created date: 05-08-2023 11:27:41
     */
    async handleScrollTermPaymentCBB(textSearch) {
      try {
        this.currentPageTermPayment += 1;
        const filtered = await termPamentService.getFilter(20, this.currentPageTermPayment, textSearch);
        this.listTermPayment.Data = [...this.listTermPayment.Data, ...filtered.data.Data];
      } catch {
        return;
      }
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
        Flag: this.$_MISAEnum.STATUS_FLAG.Add,
      });
      const accountNumbers = this.provider.AccountProviders.filter(
        (row) => row.Flag != this.$_MISAEnum.STATUS_FLAG.Delete
      );
      this.$nextTick(() => {
        this.$refs.AccountNumber[accountNumbers.length - 1].focus();
      });
    },

    /**
     * Mô tả: Xóa 1 dòng tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 30-07-2023 21:59:03
     */
    deleteRowAccount(index) {
      if (this.provider.AccountProviders[index].Flag == this.$_MISAEnum.STATUS_FLAG.Add) {
        this.provider.AccountProviders.splice(index, 1);
      } else {
        this.provider.AccountProviders[index].Flag = this.$_MISAEnum.STATUS_FLAG.Delete;
      }
    },

    /**
     * Mô tả: Xóa tất cả dòng tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 01-08-2023 15:49:29
     */
    deleteAllRowAccount() {
      // Xóa những cái có Flag bằng 1, có nghĩa là mới thêm vào
      this.provider.AccountProviders = this.provider.AccountProviders.filter(
        (row) => row.Flag != this.$_MISAEnum.STATUS_FLAG.Add
      );
      // Cập nhật những thằng có Flag khác 1 thành 3, hiểu là đã xóa
      this.provider.AccountProviders.map((row) => {
        row.Flag = this.$_MISAEnum.STATUS_FLAG.Delete;
      });
    },

    /**
     * Mô tả: Thêm 1 dòng địa chỉ
     * created by : BNTIEN
     * created date: 01-08-2023 16:04:10
     */
    btnAddRowAddress() {
      this.provider.DeliveryAddresses.push({
        DeliveryAddressName: "",
        Flag: this.$_MISAEnum.STATUS_FLAG.Add,
      });
      const deliveryAddress = this.provider.DeliveryAddresses.filter(
        (row) => row.Flag != this.$_MISAEnum.STATUS_FLAG.Delete
      );
      this.$nextTick(() => {
        this.$refs.DeliveryAddressName[deliveryAddress.length - 1].focus();
      });
    },

    /**
     * Mô tả: Xóa 1 dòng địa chỉ giao hàng
     * created by : BNTIEN
     * created date: 30-07-2023 21:59:03
     */
    deleteRowAddress(index) {
      if (this.provider.DeliveryAddresses[index].Flag == this.$_MISAEnum.STATUS_FLAG.Add) {
        this.provider.DeliveryAddresses.splice(index, 1);
      } else {
        this.provider.DeliveryAddresses[index].Flag = this.$_MISAEnum.STATUS_FLAG.Delete;
      }
    },

    /**
     * Mô tả: Xóa tất cả dòng tài khoản ngân hàng
     * created by : BNTIEN
     * created date: 01-08-2023 15:49:29
     */
    btnDeleteAllRowAddress() {
      // Xóa những cái có Flag bằng 1, có nghĩa là mới thêm vào
      this.provider.DeliveryAddresses = this.provider.DeliveryAddresses.filter(
        (row) => row.Flag != this.$_MISAEnum.STATUS_FLAG.Add
      );
      // Cập nhật những thằng có Flag khác 1 thành 3, hiểu là đã xóa
      this.provider.DeliveryAddresses.map((row) => {
        row.Flag = this.$_MISAEnum.STATUS_FLAG.Delete;
      });
    },

    /**
     * Mô tả: xử lí click checkbox giống địa chỉ nhà cung cấp
     * created by : BNTIEN
     * created date: 09-08-2023 21:57:25
     */
    handleLikeAddressProvider() {
      if (!this.checkedDeliveryAddress) {
        this.btnDeleteAllRowAddress();
        this.provider.DeliveryAddresses.push({
          DeliveryAddressName: this.provider.Address,
          Flag: this.$_MISAEnum.STATUS_FLAG.Add,
        });
      }
      this.checkedDeliveryAddress = !this.checkedDeliveryAddress;
    },

    /**
     * Mô tả: Tìm kiếm trong cbb xưng hô
     * created by : BNTIEN
     * created date: 09-08-2023 09:35:37
     */
    onSearchChangeVocative(textSearch) {
      this.listVocative = this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.listVocative.filter((x) =>
        x.Vocative.includes(textSearch)
      );
    },

    /**
     * Mô tả: Bấm phím trong cbb xưng hô
     * created by : BNTIEN
     * created date: 09-08-2023 09:46:15
     */
    onKeyDownVocativeCBB(index) {
      this.provider.Vocative = this.listVocative =
        this.$_MISAResource[this.$_LANG_CODE].PROVIDER.form.listVocative[index].Vocative;
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
          this.listCity.Search = this.listCity.All;

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
          this.listDistrict.All = await this.getListLocation(3, data.LocationCode);
          this.listDistrict.Search = this.listDistrict.All;
          this.provider.LocationDistrict = "";
          this.provider.LocationVillage = "";
          this.listVillage = { All: [], Search: [] };
        }
      }
      if (propName == "LocationDistrict") {
        if (data.LocationDistrict != this.provider.LocationDistrict) {
          this.provider.LocationDistrict = data.LocationDistrict;
          this.isBorderRed.LocationDistrict = false;
          this.listVillage.All = await this.getListLocation(4, data.LocationCode);
          this.listVillage.Search = this.listVillage.All;
          this.provider.LocationVillage = "";
        }
      }
      if (propName == "LocationVillage") {
        this.provider.LocationVillage = data.LocationVillage;
        this.isBorderRed.LocationVillage = false;
      }
    },

    /**
     * Mô tả: Tìm kiếm vị trí địa lí
     * created by : BNTIEN
     * created date: 09-08-2023 09:54:07
     */
    onSearchChangeLocation(newValue, propName) {
      if (propName == "LocationCountry") {
        this.listCountry.Search = this.listCountry.All.filter((x) => x.LocationCountry.includes(newValue));
      }
      if (propName == "LocationCity") {
        this.listCity.Search = this.listCity.All.filter((x) => x.LocationCity.includes(newValue));
      }
      if (propName == "LocationDistrict") {
        this.listDistrict.Search = this.listDistrict.All.filter((x) => x.LocationDistrict.includes(newValue));
      }
      if (propName == "LocationVillage") {
        this.listVillage.Search = this.listVillage.All.filter((x) => x.LocationVillage.includes(newValue));
      }
    },

    /**
     * Mô tả: Chọn cbb vị trí địa lí
     * created by : BNTIEN
     * created date: 09-08-2023 10:01:54
     */
    async onKeyDownLocationCBB(index, propName) {
      if (propName == "LocationCountry") {
        if (this.listCountry.Search[index].LocationCountry != this.provider.LocationCountry) {
          this.provider.LocationCountry = this.listCountry.Search[index].LocationCountry;
          this.isBorderRed.LocationCountry = false;
          this.listCity.All = await this.getListLocation(2, this.listCountry.Search[index].LocationCode);
          this.listCity.Search = this.listCity.All;

          this.provider.LocationCity = "";
          this.provider.LocationDistrict = "";
          this.provider.LocationVillage = "";
          this.listDistrict = { All: [], Search: [] };
          this.listVillage = { All: [], Search: [] };
        }
      }
      if (propName == "LocationCity") {
        if (this.listCity.Search[index].LocationCity != this.provider.LocationCity) {
          this.provider.LocationCity = this.listCity.Search[index].LocationCity;
          this.isBorderRed.LocationCity = false;
          this.listDistrict.All = await this.getListLocation(3, this.listCity.Search[index].LocationCode);
          this.listDistrict.Search = this.listDistrict.All;
          this.provider.LocationDistrict = "";
          this.provider.LocationVillage = "";
          this.listVillage = { All: [], Search: [] };
        }
      }
      if (propName == "LocationDistrict") {
        if (this.listDistrict.Search[index].LocationDistrict != this.provider.LocationDistrict) {
          this.provider.LocationDistrict = this.listDistrict.Search[index].LocationDistrict;
          this.isBorderRed.LocationDistrict = false;
          this.listVillage.All = await this.getListLocation(4, this.listDistrict.Search[index].LocationCode);
          this.listVillage.Search = this.listVillage.All;
          this.provider.LocationVillage = "";
        }
      }
      if (propName == "LocationVillage") {
        this.provider.LocationVillage = this.listVillage.Search[index].LocationVillage;
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
     * Mô tả: scrool cbb tài khoản nợ
     * created by : BNTIEN
     * created date: 10-08-2023 09:17:12
     */
    async handleScrollReceivable(textSearch) {
      try {
        this.currentPageReceivable += 1;
        const newListReceivable = await this.getListReceivalbe(20, this.currentPageReceivable, textSearch);
        this.listReceivable = [...this.listReceivable, ...newListReceivable];
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Tìm kiếm tài khoản công nợ phải thu
     * created by : BNTIEN
     * created date: 10-08-2023 09:51:15
     */
    async onSearchChangeReceivable(newValue) {
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchReceivableTimeout);
        this.provider.AccountReceivableId = "";
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchReceivableTimeout = setTimeout(async () => {
          this.isShowLoading = true;
          this.listReceivable = await this.getListReceivalbe(20, 1, newValue);
          this.isShowLoading = false;
        }, 500);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Chọn tài khoản công nợ phải thu bằng phím
     * created by : BNTIEN
     * created date: 10-08-2023 09:05:15
     */
    onKeyDownReceivable(index) {
      this.provider.AccountReceivableId = this.listReceivable[index].AccountReceivableId;
      this.provider.AccountReceivableNumber = this.listReceivable[index].AccountReceivableNumber;
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

    /**
     * Mô tả: scroll cbb tài khoản công nợ phải trả
     * created by : BNTIEN
     * created date: 10-08-2023 09:48:36
     */
    async handleScrollPayable(textSearch) {
      try {
        this.currentPagePayable += 1;
        const newListPayable = await this.getListPayable(20, this.currentPagePayable, textSearch);
        this.listPayable = [...this.listPayable, ...newListPayable];
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Tìm kiếm tài khoản công nợ phải trả
     * created by : BNTIEN
     * created date: 10-08-2023 09:51:15
     */
    async onSearchChangePayable(newValue) {
      try {
        // Xóa bỏ timeout trước đó nếu có
        clearTimeout(this.searchPayableTimeout);
        this.provider.AccountPayableId = "";
        if (!newValue.trim()) {
          newValue = "";
        }
        this.searchPayableTimeout = setTimeout(async () => {
          this.isShowLoading = true;
          this.listPayable = await this.getListPayable(20, 1, newValue);
          this.isShowLoading = false;
        }, 500);
      } catch {
        return;
      }
    },

    /**
     * Mô tả: Chọn tài khoản công nợ phải trả bằng phím
     * created by : BNTIEN
     * created date: 10-08-2023 09:07:39
     */
    onKeyDownPayable(index) {
      this.provider.AccountPayableId = this.listPayable[index].AccountPayableId;
      this.provider.AccountPayableNumber = this.listPayable[index].AccountPayableNumber;
      this.isBorderRed.AccountPayableNumber = false;
    },

    /**
     * Mô tả: xử lí sự kiện khi bấm esc khi đang ở form detail
     * created by : BNTIEN
     * created date: 01-07-2023 01:05:25
     */
    async handleKeyDown(event) {
      if (event.key === "Escape") {
        // Nếu phím được nhấn là Esc, thực hiện hàm onCloseFormDetail
        await this.onCloseFormDetail();
      } else if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn phím Ctrl + S
        this.btnSave();
      } else if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn tổ hợp phím Ctrl + Shift + S
        this.btnSaveAndAdd();
      }
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
    this.$_MISAEmitter.off("handleScrollCBBSingle");
    this.$_MISAEmitter.off("onSelectedEntityCBB");
    this.$_MISAEmitter.off("onSearchChangeCBB");
    this.$_MISAEmitter.off("onKeyDownEntityCBB");
    this.$_MISAEmitter.off("onSelectedEntityFormCBB");
    this.$_MISAEmitter.off("handleScrollCBBformCBB");
    this.$_MISAEmitter.off("onSearchChangeFormCBB");
    this.$_MISAEmitter.off("onKeyDownFormCBB");
    this.$refs.FormDetailProvider.removeEventListener("keydown", this.handleKeyDown);
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
