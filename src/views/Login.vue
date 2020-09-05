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
            v-model="form.username"
            prefix-icon="el-icon-user-solid"
            placeholder="账号/手机号码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
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
        <el-button type="primary" @click="login">确 定</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/api/Login.js";
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
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = await login(this.form);
          console.log(data);
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
