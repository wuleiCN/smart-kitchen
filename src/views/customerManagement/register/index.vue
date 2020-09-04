<template>
  <div class="content">
    <el-card>
      <el-steps :active="active" finish-status="success">
        <el-step title="公司基本信息" />
        <el-step title="开户行信息" />
        <el-step title="人员信息" />
      </el-steps>
      <!-- 第一步 -->
      <el-form v-if="active === 0">
        <el-form-item label="公司类别" label-width="120px">
          <el-radio v-model="menuCag" label="1">代理商</el-radio>
          <el-radio v-model="menuCag" label="2">加盟商</el-radio>
          <el-radio v-model="menuCag" label="3">合作商</el-radio>
        </el-form-item>
        <el-form-item label="公司名称" label-width="120px">
          <el-input autocomplete="off" />
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
        <el-form-item label="详细地址" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
      </el-form>
      <!-- 第二步 -->
      <el-form v-if="active === 1">
        <el-form-item label="统一社会信息码" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="开户银行" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="银行账号" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
      </el-form>
      <!-- 第三步 -->
      <el-form v-if="active === 2">
        <el-form-item label="法人代表" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="系统管理员" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-button @click="next">上一步</el-button>
      <el-button v-if="active < 2" @click="prev">下一步</el-button>
      <el-button v-else @click="finished">完成</el-button>
    </el-card>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  data() {
    return {
      active: 0,
      menuCag: "1",
      options: regionData,
      value: []
    };
  },
  methods: {
    prev() {
      if (this.active++ >= 2) {
        this.active = 3;
      }
    },
    next() {
      if (this.active-- <= 0) {
        this.active = 0;
      }
    },
    finished() {
      console.log("ok");
    },
    cascaderHandle(v) {
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
