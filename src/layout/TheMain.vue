<template>
  <div id="content-main" class="content-main">
    <router-view></router-view>
    <MISADialogSystemError></MISADialogSystemError>
  </div>
</template>

<script>
import MISADialogSystemError from "@/components/dialog/MISADialogSystemErrror.vue";
export default {
  name: "TheMain",

  components: {
    MISADialogSystemError,
  },
};
</script>

<style></style>
