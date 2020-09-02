<template>
  <div>
    <el-card>
      <el-button size="mini" round icon="el-icon-search" style="  background-color: #03B3B2;color: #fff">初始化数据</el-button>
    </el-card>
    <el-card>message</el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card:nth-child(1) {
  height: 70px;
  margin: 20px;
}
::v-deep .el-card:nth-child(2) {
  height: 600px;
  margin: 0 20px;
}
</style>
