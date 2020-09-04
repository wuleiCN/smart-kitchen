<template>
  <div class="content">
    <el-card>
      <el-steps :active="active" finish-status="success">
        <el-step title="注册信息" />
        <el-step title="设备列表" />
        <el-step title="批量注册" />
        <el-step title="注册结果" />
      </el-steps>
      <!-- 第一步 -->
      <el-form v-if="active === 0">
        <el-form-item label="公司名称" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-select>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-model="fileValue" label="详细地址" label-width="120px">
          <div>
            <el-input
              v-model="fileValue"
              autocomplete="off"
              :style="{width: 380 -(fileValue ? 89*2 : 89) +'px'}"
              :disabled="true"
            />
            <el-button
              v-if="fileValue"
              type="success"
              icon="el-icon-folder-opened"
              @click="remvoeFile"
            >删除</el-button>
            <!-- <el-button type="success" icon="el-icon-folder-opened">选择</el-button> -->
            <upload-excel-component :on-success="handleSuccess" />
          </div>
        </el-form-item>
        <el-form-item label-width="120px">
          <el-button type="text" @click="downloadTemplate">批量注册模板下载</el-button>
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
      <el-button class="step_btn" @click="next">上一步</el-button>
      <el-button v-if="active < 3" class="step_btn" @click="prev">下一步</el-button>
      <el-button v-else class="step_btn" @click="finished">完成</el-button>
    </el-card>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index";
export default {
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      active: 0,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: "",
      file: false,
      fileValue: ""
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
    },
    handleSuccess(v) {
      this.fileValue = v.nameFlie;
      console.log(v);
    },
    remvoeFile() {
      this.fileValue = null;
    },
    downloadTemplate() {
      import("@/vendor/Export2Excel.js").then((excel) => {
        const tHeader = ["设备编码", "通讯号码", "备注"];
        const data = [];
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "excel-list",
          autoWidth: true,
          bookType: "xlsx"
        });
      });
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
      .el-form-item:nth-child(3) {
        width: 504px;
      }
      .step_btn {
        transform: translateX(550px);
      }
    }
  }
}
</style>
