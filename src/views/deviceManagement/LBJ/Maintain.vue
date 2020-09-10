<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="设备编码" label-width="80px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备型号编码" label-width="96px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产批次" label-width="80px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="型号名称" label-width="80px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="状态" label-width="80px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册日期" label-width="90px">
              <el-date-picker
                v-model="dateValue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="val"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button
              type="info"
              size="small"
              icon="el-icon-search"
              style="margin-left: 30px;"
              @click="get"
            >查 询</el-button>
            <el-button type="success" size="small" icon="el-icon-plus" @click="get">设备注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
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
        <el-table-column prop="name" label="状态" align="center" />
        <el-table-column prop="name" label="注册日期" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <Pagination
      :page.sync="page.pageNo"
      :total="page.total"
      :limit.sync="page.resultSize"
      @pagination="pagination"
    />
  </div>
</template>

<script>
import Batch from "@/views/deviceManagement/FF/Batch";
import Pagination from "@/components/Pagination";
// import { getAlarmList } from "@/api/device/LBJ.js";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dateValue: [],
      tableData: [],
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      }
    };
  },
  created() {},
  methods: {
    // 报警设备列表
    async getAlarmDeviceList() {
      // const data = await getAlarmList();
      // console.log(data);
    },
    // 分页
    pagination() {
      console.log(this.page);
    },
    dialogVisibleInputCancel() {
      this.$refs.rejectionBasiRef.resetFields();
      this.$refs.rejectionStroRef.resetFields();
      this.strongWarning.number = "";
      this.rejectionDialog.isInputDialogVisible = false;
    },
    val(v) {
      console.log(v);
    },
    get() {
      console.log(Batch);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card:nth-child(1) {
  margin: 20px;
  .el-card__body {
    padding: 20px 20px 0;
    .el-col-8 {
      height: 50px;
    }
    .el-form-item {
      width: 90%;
      .el-form-item__label {
        height: 34px;
        line-height: 34px;
      }
      .el-form-item__content {
        height: 34px;
        line-height: 34px;
        margin-left: 80px;
        width: 86%;
        .el-input,
        .el-input__inner {
          width: 210px;
          height: 34px;
          line-height: 34px;
          margin: 0;
          // width: 139%;
          transform: translateX(-4px);
        }
        .el-date-editor {
          height: 34px;
          line-height: 34px;
          width: 243px;
          span {
            margin-bottom: 7px;
          }
          input:nth-last-child(2) {
            margin-left: 10%;
          }
        }
      }
    }
  }
}
::v-deep .el-card:nth-child(2) {
  position: relative;
  border: 0;
  margin: 20px;
  padding: 0;
  .el-card__body {
    padding: 0;
  }
}
</style>
