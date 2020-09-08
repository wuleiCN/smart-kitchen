<template>
  <div class="content">
    <el-card>
      <el-steps :active="active" finish-status="success">
        <el-step title="公司基本信息" />
        <el-step title="开户行信息" />
        <el-step title="人员信息" />
      </el-steps>
      <!-- 第一步 -->
      <el-form v-if="active === 0" ref="formRule" :model="companyForm" :rules="rules">
        <el-form-item label="公司类别" label-width="120px">
          <el-radio v-model="companyForm.Type" label="1">代理商</el-radio>
          <el-radio v-model="companyForm.Type" label="2">加盟商</el-radio>
          <el-radio v-model="companyForm.Type" label="3">合作商</el-radio>
        </el-form-item>
        <el-form-item label="公司名称" label-width="120px" prop="Name">
          <el-input v-model="companyForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="省/市/县" label-width="120px">
          <el-cascader
            v-model="value"
            placeholder="搜索："
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            filterable
            clearable
            @change="cascaderHandle"
          />
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px" prop="Address">
          <el-input v-model="companyForm.Address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <!-- 第二步 -->
      <el-form v-if="active === 1" ref="formRule" :model="companyForm" :rules="rules">
        <el-form-item label="统一社会信息码" label-width="120px">
          <el-input v-model="companyForm.CreditNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开户银行" label-width="120px">
          <el-input v-model="companyForm.Bank" autocomplete="off" />
        </el-form-item>
        <el-form-item label="银行账号" label-width="120px">
          <el-input v-model="companyForm.Account" autocomplete="off" />
        </el-form-item>
      </el-form>
      <!-- 第三步 -->
      <el-form v-if="active === 2" ref="formRule" :model="companyForm" :rules="rules">
        <el-form-item label="法人代表" label-width="120px">
          <el-input v-model="companyForm.Master" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" label-width="120px">
          <el-input v-model="companyForm.MasterPhone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="120px">
          <el-input v-model="companyForm.MasterEmail" autocomplete="off" />
        </el-form-item>
        <el-form-item label="系统管理员" label-width="120px" prop="Admin">
          <el-input v-model="companyForm.Admin" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" label-width="120px" prop="AdminPhone">
          <el-input v-model="companyForm.AdminPhone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="120px">
          <el-input v-model="companyForm.AdminEmail" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-button @click="next">上一步</el-button>
      <el-button v-if="active < 2" @click="prev">下一步</el-button>
      <el-button v-else @click="finished">完成</el-button>
    </el-card>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { Register } from "@/api/company/register.js";
export default {
  data() {
    return {
      active: 0,
      options: regionData,
      value: [],
      companyForm: {
        Type: "1",
        Name: "",
        Address: "",
        CreditNo: "",
        Bank: "",
        Account: "",
        Master: "",
        MasterEmail: "",
        MasterPhone: "",
        Admin: "",
        AdminPhone: "",
        AdminEmail: ""
      },
      rules: {
        Name: [
          { required: true, message: "请输入公司名称!", trigger: "blur" },
          {
            min: 2,
            max: 22,
            message: "长度在 2 到 22 个字符",
            trigger: "blur"
          }
        ],
        Address: [
          { required: true, message: "请输入详细地址!", trigger: "blur" },
          {
            min: 2,
            message: "长度在2个字符以上",
            trigger: "blur"
          }
        ],
        Admin: [
          {
            required: true,
            message: "请输入系统管理员名称！",
            trigger: "blur"
          },
          {
            min: 2,
            message: "长度在2个字符以上",
            trigger: "blur"
          }
        ],
        AdminPhone: [
          { required: true, message: "请输入联系电话！", trigger: "blur" },
          {
            min: 2,
            message: "长度在2个字符以上",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    prev() {
      this.$refs.formRule.validate((valid) => {
        if (valid) {
          if (this.active++ >= 2) {
            this.active = 3;
          }
        }
      });
    },
    next() {
      if (this.active-- <= 0) {
        this.active = 0;
      }
    },
    finished() {
      this.$refs.formRule.validate(async (valid) => {
        if (valid) {
          const data = await Register(this.companyForm);
          if (data.status === 200 && data.data.success) {
            Object.assign(
              this.$data.companyForm,
              this.$options.data().companyForm
            );
            this.active = 0;
            this.$message.success("注册成功！");
          } else {
            Object.assign(
              this.$data.companyForm,
              this.$options.data().companyForm
            );
            this.active = 0;
            this.$message.error("注册失败！");
          }
          console.log(data);
        }
      });
    },
    cascaderHandle(v) {
      this.companyForm.Province = CodeToText[v[0]];
      this.companyForm.City = CodeToText[v[1]];
      this.companyForm.Country = CodeToText[v[2]];
      console.log(v);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  ::v-deep .el-card {
    width: 60%;
    .el-card__body {
      padding: 20px 20px 10px 20px;
      .el-steps {
        padding: 0 10px 10px;
      }
      .el-form-item {
        margin-bottom: 15px;
        .el-input {
          width: 380px;
        }
      }
      .el-button {
        transform: translateX(550px);
      }
    }
  }
}
</style>
