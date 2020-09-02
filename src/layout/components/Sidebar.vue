<template>
  <div>
    <el-aside width="220px">
      <el-menu
        :default-active="activeMenu"
        :collapse-transition="true"
        mode="vertical"
        router
        unique-opened
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <div v-for="(item,index) in routes" :key="index" :index="item.path">
          <el-submenu :index="item.path">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group
              v-for="(v,i) in item.children"
              :key="i"
              :index="item.path+'/'+v.path"
            >
              <el-submenu v-if="v.children" :index="item.path+'/'+v.path">
                <template slot="title">
                  <i :class="v.meta.icon"></i>
                  <span>{{ v.name }}</span>
                </template>
                <el-menu-item
                  v-for="(value,num) in v.children"
                  :key="num"
                  :index="item.path+'/'+v.path+'/'+value.path"
                >{{ value.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="item.path+'/'+v.path">{{ v.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      routes: []
    };
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    }
  },
  created() {
    this.routes = this.$router.options.routes;
    this.routes.shift();
    console.log(this.routes);
  }
};
</script>

<style lang="sass" scoped>

</style>
