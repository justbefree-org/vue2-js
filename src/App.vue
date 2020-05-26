<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { freeStyleLog } from "@/lib/fun";
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    freeStyleLog();
  }
};
</script>
<style type="text/css" scoped>
.app-heihgt {
  height: 100%;
}
</style>
