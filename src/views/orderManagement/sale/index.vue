<template>
  <div>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        size="mini"
      >
        <el-table-column prop="date" label="工单号" align="left" />
        <el-table-column prop="name" label="所属客户" align="center" />
        <el-table-column prop="name" label="创建日期" align="center" />
        <el-table-column prop="name" label="修改日期" align="center" />
        <el-table-column prop="name" label="工单状态" align="center" />
        <el-table-column prop="name" label="备注" align="center" />
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
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      tableData: [],
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      }
    };
  },
  methods: {
    editData(v) {
      console.log(v);
    },
    deleteData(v) {
      console.log(v);
    },
    // 分页
    pagination() {
      console.log(this.page);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  position: relative;
  border: 0;
  margin: 20px;
  padding: 0;
  .el-card__body {
    padding: 0;
  }
}
</style>
