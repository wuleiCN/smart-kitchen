<template>
  <div>
    <el-aside width="220px">
      <el-menu :default-active="activeMenu" :collapse-transition="false" mode="vertical" router class="el-menu-vertical-demo">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/system">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/system/data">数据初始化</el-menu-item>
            <el-menu-item index="/system/menu">系统菜单管理</el-menu-item>
            <el-menu-item index="/system/LBJ">报警型号设备管理</el-menu-item>
            <el-menu-item index="/system/FF">灭火设备型号管理</el-menu-item>
            <el-menu-item index="/system/warning">警告信息测试</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
