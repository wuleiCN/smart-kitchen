<template>
  <div>
    <el-select v-model="value" :clearable="clearable" placeholder="请选择" @change="changed(value)">
      <el-option
        v-for="option in options$"
        :key="option.value"
        :value="option.value"
        :label="option.name"
      />
    </el-select>
  </div>
</template>

<script>
import * as enumList from "@/api/Dictionary.js";
export default {
  name: "Select",
  props: {
    url: { type: String, default: undefined },
    clearable: { type: Boolean, default: false },
    foo: { type: [String, Number], default: undefined }
  },
  data() {
    return {
      options$: [],
      value: this.foo !== "" ? this.foo : ""
    };
  },
  watch: {
    foo(e, v) {
      this.value = e
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      console.log(enumList);
      try {
        const { data: res } = await enumList[this.url]();
        this.options$ = res;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    changed(v) {
      this.$emit("updata:foo", v)
      console.log(v, this.$attrs);
    }
  }
};
</script>
