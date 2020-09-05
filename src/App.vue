<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue"
export default {
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    Vue.__shop_scope = {
      loading: () => {
        this.loading = true;
      },
      unloading: () => {
        this.loading = false;
      }
    };
  }
};
</script>

<style lang="scss">
</style>
