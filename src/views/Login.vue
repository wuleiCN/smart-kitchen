<template>
  <div class="login">
    <el-card>
      <h3>香道云厨</h3>
      <h4>香道云厨智慧厨房管理平台</h4>
      <el-form
        ref="ruleForm"
        :model="form"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model.trim="form.username"
            prefix-icon="el-icon-user-solid"
            placeholder="账号/手机号码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="form.password"
            prefix-icon="el-icon-s-cooperation"
            placeholder="请输入密码"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-link target="_blank">忘记密码?</el-link>
        </el-form-item>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="Login">确 定</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login, getUser } from "@/api/Login.js";
import Cookies from "js-cookie";
// import { setSession } from "@/utils/auth.js";
// import { getMenus } from "@/api/menus";
// import tk from "@/utils/token.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号/手机号码", trigger: "blur" },
          {
            min: 2,
            max: 11,
            message: "长度在 2 到 11 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    Login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            const { data: res } = await login(this.form)
            Cookies.set("TOKEN_KEY", res.Token);
          } catch (error) {
            this.$message.error("连接超时，请稍后重试！");
            console.log(error);
          }
          const { data: info } = await getUser();
          // getMenus().then((data) => {
          //   console.log(data);
          //   setSession("ROUTES_KEY", data.data);
          // });
          // setSession("USER_INFO", info);
          this.$store.dispatch("updateLoadMenus", true);
          console.log(info);
          this.$router.push({ path: "/" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url(http://118.190.153.247:9000/Content/images/login.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  .el-card {
    width: 600px;
    margin-left: 50%;
    transform: translate(-50%, 50%);
    h3 {
      font-family: "Lucida Sans", "trebuchet MS", Arial, Helvetica;
      font-size: 20px;
      text-align: center;
      font-weight: normal;
      color: #444;
    }
    h4 {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #a9a9a9;
    }
    .el-form-item__content {
      line-height: 0;
    }
    .el-button {
      transform: translateX(355px);
    }
  }
}
</style>
