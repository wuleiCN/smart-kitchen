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
      <el-form v-if="active === 0" ref="alertRef" :model="alertForm" :rules="alertRule">
        <el-form-item label="生产批次" label-width="120px" prop="BatchNo">
          <el-input v-model="alertForm.BatchNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="设备型号" label-width="120px" prop="ModelId">
          <el-select v-model="alertForm.ModelId">
            <el-option
              v-for="item in alarmList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
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
      <el-form v-if="active === 1" ref="alertRef" :model="alertForm">
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
      <el-form v-if="active === 2" ref="alertRef">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success" />
      </el-form>
      <!-- 第四步 -->
      <el-form v-if="active === 3" ref="alertRef">
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
import { getAlarmModelList } from "@/api/systemSetting/customerDevices";
import { getAlarmDeviceList, registerAlarmDevice } from "@/api/device/LBJ.js";
export default {
  components: {
    UploadExcelComponent,
    Pagination
  },
  data() {
    return {
      active: 0,
      alarmList: [],
      alertForm: {
        BatchNo: "",
        ModelId: "",
        BatchFile: [],
        RegistOn: new Date().getTime(),
        Dealer: this.$store.state.userInfo.Id
      },
      file: false,
      fileValue: "",
      tableData: [],
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      alertRule: {
        BatchNo: [
          { required: true, message: "请输入生产批次!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        ModelId: [
          { required: true, message: "请输入设备型号!", trigger: "change" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getAlarmModelListInfo();
    this.getAlarmListInfo()
  },
  methods: {
    // 获取报警型号分页列表
    async getAlarmListInfo() {
      try {
        const data = await getAlarmDeviceList({
          offset: this.page.resultSize,
          limit: (this.page.pageNo - 1) * this.page.resultSize,
          order: "asc"
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取报警设备型号
    async getAlarmModelListInfo() {
      try {
        const data = await getAlarmModelList();
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
      this.$refs.alertRef.validate(async (valid) => {
        console.log("PER")
        if (valid) {
          if (this.active++ > 2) {
            this.active = 3;
          }
          if (this.active === 2) {
            console.log(this.active);
            this.status = true;
            console.log(this.progressPercent);
            registerAlarmDevice(this.alertForm)
              .then((data) => {
                if (data.data.success) {
                  this.progressPercent = 100;
                  console.log(data);
                } else {
                  this.progressPercent = 90
                  this.status = false
                  this.$message.error(data.data.message)
                }
              })
              .catch((err) => {
                this.status = false;
                console.log(err);
              });
          }
        } else {
          this.$message.error("请填写必填项！");
        }
      });
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
      this.alertForm.BatchFile = v.results;
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
