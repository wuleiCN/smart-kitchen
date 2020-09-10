<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="公司类别" label-width="110px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司名称" label-width="110px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用码" label-width="110px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="公司地址" label-width="110px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人代表" label-width="110px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册日期" label-width="110px">
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
      </el-form>
      <el-button
        type="success"
        size="small"
        icon="el-icon-search"
        style="margin-left: 90.5%;margin-bottom: 5px;"
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
        <el-table-column prop="date" label="公司类别" align="left" />
        <el-table-column prop="name" label="公司名称" width="160" align="center" />
        <el-table-column prop="name" label="省/直辖市/自治区" width="160" align="center" />
        <el-table-column prop="name" label="地市州" align="center" />
        <el-table-column prop="name" label="县市区" align="center" />
        <el-table-column prop="name" label="详细地址" align="center" />
        <el-table-column prop="name" label="法人代表" align="center" />
        <el-table-column prop="name" label="联系电话" align="center" />
        <el-table-column prop="name" label="系统管理员" align="center" />
        <el-table-column prop="name" label="联系电话" align="center" />
        <el-table-column prop="name" label="公司状态" align="center" />
        <el-table-column prop="address" label="注册日期" align="center" />
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
import { getList } from "@/api/company/maintain";
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
      companyForm: {
        Name: "",
        Types: "",
        CreditNo: "",
        Address: "",
        Master: "",
        Statuses: "",
        RegistOnFrom: new Date().getTime(),
        RegistOnTo: new Date().getTime()
      },
      loading: true,
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getListInfo();
  },
  methods: {
    async getListInfo() {
      try {
        const { data } = await getList();
        if (data.status === 200) {
          this.tableData = data.data;
          this.loading = false;
          console.log(data);
        }
        console.log(data);
      } catch (error) {
        this.$message.error("连接超时！");
        this.loading = false;
      }
    },
    // 分页
    pagination() {
      console.log(this.page);
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
        margin-left: 110px;
        .el-input,
        .el-input__inner {
          height: 34px;
          line-height: 34px;
          margin: 0;
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
