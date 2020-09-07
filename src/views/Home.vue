<template>
  <div>
    <el-card class="f-card">
      <div style="background-color: #df5138;">
        <a href="javascript:;">
          <i class="el-icon-message-solid" style="color: #df5138;"></i>
        </a>
      </div>
      <div>
        <h4>当前告警：10条</h4>
        <span>
          <p>本月新增告警：</p>
          <div style="background: #ffce55;">12 条</div>
        </span>
        <span>
          <p>本月已处置告警</p>
          <div style="background: #53A93F;">12 条</div>
        </span>
        <el-button size="mini" plain>>> 详情</el-button>
      </div>
    </el-card>
    <el-card class="r-card">
      <div style="background-color: #ffce55;">
        <a href="javascript:;">
          <i class="el-icon-s-order" style="color: #ffce55;"></i>
        </a>
      </div>
      <div>
        <h4>当前工单：10条</h4>
        <span>
          <p>本月新增工单：</p>
          <div style="background: #ffce55;">12 条</div>
        </span>
        <span>
          <p>本月已竣工工单</p>
          <div style="background: #53A93F;">12 条</div>
        </span>
        <el-button size="mini" plain>>> 详情</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { dataInit, msgCount } from "@/api/systemSetting/dataInit.js";
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const { data: res } = await msgCount();
      await dataInit();
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  width: 400px;
  height: 180px;
  float: left;
  margin: 20px 0 0 25px;
  border: 0;
  .el-card__body {
    width: 400px;
    height: 180px;
    padding: 0;
    & div:nth-child(1) {
      display: block;
      float: left;
      width: 180px;
      height: 180px;
      & a i {
        font-size: 28px;
        line-height: 58px;
      }
    }
    div:nth-child(1) a {
      display: block;
      float: left;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      margin-left: 50%;
      margin-top: 50%;
      transform: translate(-50%, -50%);
    }
    & div:nth-child(2) {
      display: block;
      float: left;
      width: 220px;
      height: 100%;
      padding: 5px 10px;
      background-image: linear-gradient(to left, #fff, #f3f3f3);
      h4 {
        display: block;
        font-size: 17px;
        line-height: 26px;
        margin: 2px;
        position: relative;
        font-family: "Lucida Sans", "trebuchet MS", Arial, Helvetica;
        font-weight: 700;
        color: #e46f61;
      }
      span {
        position: relative;
        margin: 0;
        p {
          display: block;
          width: 100%;
          height: 43px;
          padding: 10px 0;
          font-size: 11px;
          margin: 0;
          color: #999999;
          border-bottom: 1px #eeeeee solid;
        }
        div {
          position: absolute;
          width: 45px;
          height: 22px;
          padding: 0;
          top: 7px;
          left: 150px;
          line-height: 22px;
          font-size: 12px;
          text-align: center;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
    .el-button {
      float: right;
      margin: 10px;
      font-size: 12px;
      text-align: center;
      width: 58px;
      height: 36px;
      span {
        right: 5px;
      }
    }
  }
}
</style>
