
<template>
  <div>
    <Selection @selection="selection" @registOn="registOn" />
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        size="mini"
      >
        <el-table-column prop="Code" label="设备编码" width="200" align="center" />
        <el-table-column prop="ComNumber" label="通讯号码" width="120" align="center" />
        <el-table-column prop="BatchNo" label="生产批次" width="120" align="center" />
        <el-table-column prop="Name" label="设备名称" width="120" align="center" />
        <el-table-column prop="AreaId" label="安装区域" width="120" align="center" />
        <el-table-column prop="ModelId" label="设备型号" width="120" align="center" />
        <el-table-column prop="Type" label="设备类别" width="120" align="center" />
        <el-table-column prop="CompanyId" label="所属单位" width="240" align="center" />
        <el-table-column prop="CustomerId" label="所属客户" width="240" align="center" />
        <el-table-column prop="StatusName" label="状态" width="120" align="center" />
        <el-table-column prop="RegistOn" label="注册日期" width="160" align="center" fixed="right">
          <template #default="{row: time}">{{ time.RegistOn }}</template>
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
import Selection from "@/components/Select-card"
import {
  getDeviceList,
  getDeviceModels,
  GetAreas
} from "@/api/device/select.js"
// import Select from "@/components/InferFace"
export default {
  components: {
    Pagination,
    Selection
  },
  data() {
    return {
      pickerOptions: {
        // 日期条件
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end])
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
      // 设备信息列表
      tableData: [],
      // 设备型号
      devicesModel: [],
      // 设备安装区域
      areas: [],
      loading: true,
      deviceModel: "getDeviceModels",
      deviceStatus: "getDeviceStatus",
      // 查询条件参数
      select: {
        CompanyId: "4DEE5709-6096-40C7-9D0C-793E391D57B9",
        CustomerId: "",
        AreaId: "",
        Code: "",
        Name: "",
        Models: "",
        Statuses: "",
        Types: "",
        RegistOn: []
      },
      // 修改参数
      editForm: {},
      updataType: "",
      updataStatus: "",
      // 页码
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getDevicesList();
    this.getAreasInfo();
    this.getDeviceModelList()
  },
  methods: {
    // 设备列表
    async getDevicesList() {
      try {
        const { data: res } = await getDeviceList({
          ...this.select,
          offset: this.page.resultSize * (this.page.pageNo - 1),
          limit: this.page.resultSize,
          order: "asc"
        });
        this.tableData = res.rows;
        this.page.total = res.total;
        this.loading = false
        console.log(res);
      } catch (error) {
        this.$message.error("连接超时！")
        this.loading = false
        console.log(error);
      }
    },
    // 条件查询
    getDevicesByQueryList() {
      this.getDevicesList()
      Object.assign(this.$data.select, this.$options.data().select)
    },
    // 设备型号信息
    async getDeviceModelList() {
      try {
        const { data: res } = await getDeviceModels()
        this.devicesModel = res
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    // 设备安装区域信息
    async getAreasInfo() {
      try {
        const { data: res } = await GetAreas()
        this.areas = res
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    // 分页
    pagination() {
      this.getDevicesList();
      console.log(this.page);
    },
    selection(v) {
      console.log(v);
    },
    registOn() {}
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
