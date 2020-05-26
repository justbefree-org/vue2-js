/*
 * @Author: Just be free
 * @Date:   2019-12-10 16:33:59
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-12-20 10:40:34
 */

import Vue from "vue";
import { print } from "@/lib/console.js";

Vue.mixin({
  methods: {
    print(...args) {
      print(...args);
    }
  }
});
