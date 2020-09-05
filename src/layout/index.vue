<template>
  <div>
    <el-container>
      <el-header>
        <div class="left-menu">
          <img src="http://118.190.153.247:9000/Scripts/assets/img/logo.png" />
          <h3>香道云厨智慧厨房管理平台</h3>
        </div>
        <div class="right-menu">
          <i class="el-icon-warning"></i>
          <i class="el-icon-message-solid"></i>
          <i class="el-icon-s-order"></i>
          <!-- <el-avatar
            size="medium"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />-->
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <span>张无忌</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <span style="display:block;">
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>
          <i class="el-icon-s-tools"></i>
        </div>
      </el-header>
      <el-container>
        <!-- <el-aside width="220px">Aside</el-aside> -->
        <Sidebar />
        <el-container>
          <el-main>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item
                v-if="$route.name !== '首页'"
              >{{ $route.matched[1].parent.meta.title }}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="$route.name !== '首页'">{{ $route.meta.title }}</el-breadcrumb-item>
              <el-breadcrumb-item
                v-if="$route.matched[1].parent.parent !== undefined"
              >{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="route_name">
              <h1>{{ $route.name }}</h1>
            </div>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
export default {
  name: "Layout",
  components: {
    Sidebar
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$route);
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-header {
  width: 100%;
  height: 45px !important;
  background: #03b3b2;
  .left-menu {
    float: left;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 100%;
    img {
      width: 177px;
      height: 40px;
    }
    h3 {
      font-size: 21px;
      color: #fcfcfc;
      font-weight: bold;
      margin: 0;
    }
  }
  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 10px;
    color: #fcfcfc;
    &:focus {
      outline: none;
    }
    img {
      width: 45px;
      height: 45px;
      margin-right: 5px;
    }
    i {
      margin-right: 25px;
    }
    .avatar-container {
      .avatar-wrapper {
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 26px;
          border-radius: 10px;
          margin-right: 13px;
        }
        span {
          font-size: 14px;
          color: #fcfcfc;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
          color: #fcfcfc;
        }
      }
    }
  }
}
::v-deep .el-main {
  padding: 20px 0;
  height: 715px;
  background: #eee;
  .el-breadcrumb {
    margin-left: 20px;
  }
  .route_name {
    display: block;
    width: 100%;
    height: 40px;
    // margin-top: 10px;
    h1 {
      font-size: 18px;
      font-weight: 300;
      color: #737373;
      line-height: 40px;
      padding-left: 20px;
      margin: 20px 0 0 0;
      background-image: linear-gradient(to right, #fff, #f3f3f3);
      box-shadow: 0px 2px 5px #bbb inset;
      border-left: 0;
    }
  }
}
</style>
