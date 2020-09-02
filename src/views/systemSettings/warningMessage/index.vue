<template>
  <div>
    <el-card>
      <el-form>
        <el-form-item label="号码" label-width="120px">
          <el-input v-model="number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容" label-width="120px">
          <el-input v-model="content" autocomplete="off" />
        </el-form-item>
        <el-form-item label-width="120px">
          <el-button size="small " icon="el-icon-s-operation" type="success" @click="test">测试</el-button>
          <el-button size="small " icon="el-icon-s-operation" type="success">跨域测试</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 12307310013,
      content: "51防区报警"
    };
  },
  methods: {
    test() {
      console.log(this.$router.options.routes);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  margin: 10px 20px;
  background: #FBFBFBFB;
  .el-card__body {
    padding: 20px 20px 0 20px;
    .el-form-item {
      margin-bottom: 15px;
    }
  }
}
</style>
