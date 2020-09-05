<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="工单号" label-width="80px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生成日期" label-width="90px">
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
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工单类型" label-width="80px">
              <el-select v-model="typeValue" filterable>
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="工单状态" label-width="80px">
              <el-select v-model="statusValue" filterable>
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button
        type="info"
        size="small"
        icon="el-icon-search"
        style="margin: 0 0 10px 72px;"
        @click="get"
      >查 询</el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        size="mini"
      >
        <el-table-column prop="date" label="客户名称" align="left" />
        <el-table-column prop="name" label="工单号" align="center" />
        <el-table-column prop="name" label="工单类别" align="center" />
        <el-table-column prop="name" label="创建日期" align="center" />
        <el-table-column prop="name" label="CreatedBy" align="center" />
        <el-table-column prop="name" label="修改日期" align="center" />
        <el-table-column prop="name" label="ModiBy" align="center" />
        <el-table-column prop="name" label="工单状态" align="center" />
        <el-table-column prop="name" label="备注" align="center" />
        <el-table-column prop="name" label="退单原因" align="center" />
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
      typeOptions: [
        {
          value: "选项1",
          label: "创建"
        },
        {
          value: "选项2",
          label: "安装"
        }
      ],
      statusOptions: [
        {
          value: "选项1",
          label: "创建"
        },
        {
          value: "选项2",
          label: "安装"
        }
      ],
      typeValue: "",
      statusValue: "",
      tableData: [],
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      }
    };
  },
  methods: {
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
        .el-input,
        .el-input__inner {
          height: 34px;
          line-height: 34px;
          margin: 0;
          // width: 139%;
          transform: translateX(-4px);
        }
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          height: 34px;
          line-height: 34px;
          width: 387px;
          span {
            margin-bottom: 7px;
          }
          input:nth-last-child(2) {
            margin-left: 15px;
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
