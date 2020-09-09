<template>
  <div>
    <el-aside :width="isCollapse ? '' : '220px'">
      <div class="fold">
        <a @click="isCollapse = !isCollapse">
          <i v-show="!isCollapse" class="el-icon-s-fold"></i>
          <i v-show="isCollapse" class="el-icon-s-unfold"></i>
        </a>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse-transition="false"
        mode="vertical"
        router
        unique-opened
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <div v-for="(item,index) in routes" :key="index" :index="item.path">
          <el-submenu :index="item.path">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span v-show="!isCollapse">{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group
              v-for="(v,i) in item.children"
              :key="i"
              :index="item.path+'/'+v.path"
            >
              <el-submenu v-if="v.children" :index="item.path+'/'+v.path">
                <template slot="title">
                  <i :class="v.meta.icon"></i>
                  <span v-show="!isCollapse">{{ v.meta.title }}</span>
                </template>
                <el-menu-item
                  v-for="(value,num) in v.children"
                  :key="num"
                  :index="item.path+'/'+v.path+'/'+value.path"
                >
                  <template slot="title">
                    <i :class="v.meta.icon"></i>
                    <span v-show="!isCollapse">{{ value.meta.title }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="item.path+'/'+v.path">
                <template slot="title">
                  <i :class="v.meta.icon"></i>
                  <span v-show="!isCollapse">{{ v.meta.title }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
// import { getToken } from "@/utils/auth.js"
export default {
  name: "Sidebar",
  data() {
    return {
      routes: [],
      isCollapse: true
    };
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    }
  },
  created() {
    this.routes = [];
    // this.routes = getToken("ROUTES_KEY")
    this.routes = this.$router.options.routes;
    this.routes = this.routes.slice(2);
    console.log(this.routes);
  },
  methods: {
    // getRoutes() {
    //   this.routes = []
    //   this.routes = this.$router.options.routes;
    //   this.routes.shift();
    //   console.log(this.routes);
    // }
  }
};
</script>

<style lang="scss" scoped>
.fold {
  display: block;
  width: 100%;
  height: 40px;
  a {
    display: block;
    width: 40px;
    height: 40px;
    text-align: center;
    margin-left: 50%;
    transform: translateX(-50%);
    i:before {
      font-size: 40px;
    }
  }
}
</style>
