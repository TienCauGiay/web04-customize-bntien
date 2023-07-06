import { createApp } from 'vue'
import App from './App.vue'
import MISAInputText from './components/input/MISAInputText.vue';
import MISADialogConfirmDelete from './components/dialog/MISADialogConfirmDelete.vue';
import MISADialogDataChange from './components/dialog/MISADialogDataChange.vue';
import MISADialogDataExist from './components/dialog/MISADialogDataExist.vue';
import MISADialogDataNotNull from './components/dialog/MISADialogDataNotNull.vue';
import MISAButtonDefault from './components/button/MISAButtonDefault.vue';
import MISAButtonExtra from './components/button/MISAButtonExtra.vue';
import MISAToastSuccess from './components/toast/MISAToastSuccess.vue';
import MISACombobox from './components/combobox/MISACombobox.vue';
import MISAEnum from './scripts/enum.js';
import MISAResource from './scripts/resource.js';
import vueRouter from './router/router.js';
import MISAEmitter from 'tiny-emitter/instance'

var app = createApp(App);
app.component("misa-input", MISAInputText);
app.component("misa-dialog-confirm-delete", MISADialogConfirmDelete);
app.component("misa-dialog-data-change", MISADialogDataChange);
app.component("misa-dialog-data-exist", MISADialogDataExist);
app.component("misa-dialog-data-not-null", MISADialogDataNotNull);
app.component("misa-button-default", MISAButtonDefault);
app.component("misa-button-extra", MISAButtonExtra);
app.component("misa-toast-success", MISAToastSuccess);
app.component("misa-combobox", MISACombobox);
app.config.globalProperties.$_MISAEnum = MISAEnum;
app.config.globalProperties.$_MISAResource = MISAResource;
app.config.globalProperties.$_MISAEmitter = MISAEmitter;
app.config.globalProperties.$_LANG_CODE = 'vn-VI';
app.use(vueRouter);
app.mount('#app');
