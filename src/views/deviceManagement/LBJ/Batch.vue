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
        <el-form-item label="生产批次" label-width="120px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="设备型号" label-width="120px">
          <el-select v-model="alarmValue">
            <el-option
              v-for="item in alarmList"
              :key="item.Id"
              :label="item.Name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-model="fileValue" label="批量文件" label-width="120px">
          <div>
            <el-input
              v-model="fileValue"
              autocomplete="off"
              :style="{width: 380 -(fileValue ? 89*2 : 89) +'px'}"
              :disabled="true"
            />
            <el-button v-if="fileValue" type="danger" icon="el-icon-delete" @click="remvoeFile">删除</el-button>
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
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          size="mini"
        >
          <el-table-column prop="date" label="设备编码" align="left" />
          <el-table-column prop="name" label="设备型号编码" width="240" align="center" />
          <el-table-column prop="name" label="生产批次" align="center" />
          <el-table-column prop="name" label="型号名称" align="center" />
        </el-table>
        <Pagination
          class="pagination"
          :page.sync="page.pageNo"
          :total="page.total"
          :limit.sync="page.resultSize"
          @pagination="pagination"
        />
      </el-form>
      <!-- 第三步 -->
      <el-form v-if="active === 2">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
      </el-form>
      <!-- 第四步 -->
      <el-form v-if="active === 3">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          size="mini"
        >
          <el-table-column prop="date" label="设备编码" align="left" />
          <el-table-column prop="name" label="设备型号编码" width="240" align="center" />
          <el-table-column prop="name" label="生产批次" align="center" />
          <el-table-column prop="name" label="型号名称" align="center" />
        </el-table>
        <Pagination
          class="pagination"
          :page.sync="page.pageNo"
          :total="page.total"
          :limit.sync="page.resultSize"
          @pagination="pagination"
        />
      </el-form>
      <el-button class="step_btn" @click="next">上一步</el-button>
      <el-button v-if="active < 3" class="step_btn" @click="prev">下一步</el-button>
      <el-button v-else class="step_btn" @click="finished">完成</el-button>
    </el-card>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index";
import Pagination from "@/components/Pagination";
// import { getBatchTemplate } from "@/api/device/LBJ.js";
import { getAlarmList } from "@/api/systemSetting/customerDevices";
export default {
  components: {
    UploadExcelComponent,
    Pagination
  },
  data() {
    return {
      active: 0,
      alarmList: [],
      alarmValue: "",
      file: false,
      fileValue: "",
      tableData: [],
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getAlarmListInfo();
  },
  methods: {
    // 获取灭火设备型号
    async getAlarmListInfo() {
      try {
        const data = await getAlarmList();
        this.alarmList = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 分页
    pagination() {
      console.log(this.page);
    },
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
    // 模板下载
    downloadTemplate() {
      import("@/vendor/Export2Excel.js").then((excel) => {
        const tMultiHeader = [
          ["注：请严格按模板示例填写批量注册设备信息", "", ""]
        ];
        const tHeader = ["设备编码", "通讯号码", "备注"];
        const data = [];
        const merges = ["A1:C1"];
        excel.export_json_to_excel({
          multiHeader: tMultiHeader,
          header: tHeader,
          data,
          merges,
          filename: "报警设备批量注册-20200912",
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
    .pagination {
      float: none !important;
    }
    .el-table th,
    .el-table tr {
      background-color: #e6e6e6;
    }
    .el-progress {
      margin: 25px 20px;
    }
  }
}
</style>
