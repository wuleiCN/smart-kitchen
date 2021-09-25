<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="工单号" label-width="90px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
          <el-col :span="12">
            <el-form-item label="工单类型" label-width="90px">
              <Select :url="orderType" :foo.sync="updataType" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单状态" label-width="90px">
              <Select :url="orderStatus" :foo.sync="updataType" />
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
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        size="mini"
      >
        <el-table-column prop="CustomerName" label="客户名称" align="left" />
        <el-table-column prop="Id" label="工单号" align="center" />
        <el-table-column prop="typeName" label="工单类别" align="center" />
        <el-table-column prop="CreatedOn" label="创建日期" align="center" />
        <el-table-column prop="name" label="修改日期" align="center" />
        <!-- <el-table-column prop="name" label="ModiBy" align="center" /> -->
        <el-table-column prop="statusName" label="工单状态" align="center" />
        <el-table-column prop="Comment" label="备注" align="center" />
        <el-table-column prop="ReturnReason" label="退单原因" align="center" />
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
import Select from "@/components/InferFace"
import { getMonitorList } from "@/api/orders/monitor";
import { getList } from "@/api/customer/maintain.js";
import * as enumList from "@/api/Dictionary.js";
export default {
  components: {
    Pagination,
    Select
  },
  data() {
    return {
      loading: true,
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
      updataType: "",
      orderStatus: "getOrderStatus",
      orderType: "getOrderType",
      tableData: [],
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getMonitorListInfo();
  },
  methods: {
    // 获取工单监控清单
    async getMonitorListInfo() {
      try {
        const { data: res } = await getMonitorList();
        const { data: list } = await getList()
        const { data: type } = await enumList["getOrderType"]()
        const { data: status } = await enumList["getOrderStatus"]()
        res.map(v => {
          list.forEach(e => {
            if (v.CustomerId === e.Id) v.CustomerName = e.Name
            else v.CustomerName = "默认"
          })
          type.forEach(e => {
            if (v.Type === e.value) v.typeName === e.name
          })
          status.forEach(e => {
            if (v.Status === e.value) v.statusName === e.name
          })
        })
        this.loading = false
        this.tableData = res
        console.log(res, type, status);
      } catch (error) {
        this.loading = false
      }
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
    },
    editData(v) {
      console.log(v);
    },
    deleteData(v) {
      console.log(v);
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
