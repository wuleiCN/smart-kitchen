<template>
  <div>
    <Selection :types="2" @selection="selection" @registOn="registOn" />
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        size="mini"
      >
        <el-table-column prop="Code" label="设备编码" width="240" align="left" />
        <el-table-column prop="ComNumber" label="通讯号码" width="120" align="center" />
        <el-table-column prop="BatchNo" label="生产批次" width="120" align="center" />
        <el-table-column prop="Name" label="设备名称" width="120" align="center" />
        <el-table-column prop="AreaId" label="安装区域" width="120" align="center" />
        <el-table-column prop="ModelId" label="设备型号" width="120" align="center" />
        <el-table-column prop="Type" label="设备类别" width="120" align="center" />
        <el-table-column prop="CompanyId" label="所属单位" width="240" align="center" />
        <el-table-column prop="CustomerId" label="所属客户" width="240" align="center" />
        <el-table-column prop="StatusName" label="状态" width="120" align="center" />
        <el-table-column prop="RegistOn" label="注册日期" width="120" align="center">
          <template #default="{row: time}">{{ time.RegistOn }}</template>
        </el-table-column>
        <el-table-column #default="{row: data}" label="操作" width="120" align="center" fixed="right">
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
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogAddDataVisible" @close="addFormClose">
      <el-form ref="addFormRef" :model="addForm" :rules="rules">
        <el-form-item label="生产批次" label-width="100px" prop="BatchNo">
          <el-input v-model="addForm.BatchNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="设备编码" label-width="100px" prop="Code">
          <el-input v-model="addForm.Code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="通讯号码" label-width="100px" prop="ComNumber">
          <el-input v-model="addForm.ComNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="设备型号" label-width="100px">
          <el-select v-model="select.Models" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
          <!-- <Select :url="deviceModel" :foo.sync="updataType" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addFormEnter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogEditDataVisible" @close="editFormClose">
      <el-form ref="editFormRef" :model="editForm" :rules="rules">
        <el-form-item label="生产批次" label-width="100px" prop="BatchNo">
          <el-input v-model="editForm.BatchNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="设备编码" label-width="100px" prop="Code">
          <el-input v-model="editForm.Code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="通讯号码" label-width="100px" prop="ComNumber">
          <el-input v-model="editForm.ComNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="设备型号" label-width="100px">
          <el-select v-model="editForm.ModelId" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
          <!-- <Select :url="deviceModel" :foo.sync="updataType" /> -->
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <Select :url="deviceStatus" :foo.sync="editForm.Status" />
        </el-form-item>
        <el-form-item label="注册日期" label-width="100px" prop="date1">
          <el-date-picker
            v-model="editForm.RegistOn"
            type="date"
            placeholder="注册日期"
            style="width: 100%;"
            disabled
          />
        </el-form-item>
        <el-form-item label="销售日期" label-width="100px" prop="date1">
          <el-date-picker
            v-model="editForm.SaledOn"
            type="date"
            placeholder="销售日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="安装日期" label-width="100px" prop="date1">
          <el-date-picker
            v-model="editForm.InstalledOn"
            type="date"
            placeholder="安装日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="最近维保日期" label-width="100px" prop="date1">
          <el-date-picker
            v-model="editForm.MaintancedOn"
            type="date"
            placeholder="最近维保日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="最近维修日期" label-width="100px" prop="date1">
          <el-date-picker
            v-model="editForm.RepairedOn"
            type="date"
            placeholder="最近维修日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="下次维保日期" label-width="100px" prop="date1">
          <el-date-picker
            v-model="editForm.NextMaintAt"
            type="date"
            placeholder="下次维保日期"
            style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormClose">取 消</el-button>
        <el-button type="primary" @click="editFormEnter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  registerAlarm,
  updataAlarmDevice,
  deleteAlarmDevice
} from "@/api/device/LBJ.js";
import {
  getDeviceList,
  getDeviceModels,
  GetAreas
} from "@/api/device/select.js"
import Select from "@/components/InferFace"
import Selection from "@/components/Select-card"
export default {
  components: {
    Pagination,
    Select,
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
      // 注册参数
      addForm: {
        BatchNo: "",
        Code: "",
        ComNumber: "",
        ModelId: ""
      },
      // 修改参数
      editForm: {},
      updataType: "",
      updataStatus: "",
      dialogAddDataVisible: false,
      dialogEditDataVisible: false,
      // 页码
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      rules: {
        BatchNo: [
          { required: true, message: "请输入生产批次!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        Code: [
          { required: true, message: "请输入设备编码!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        ComNumber: [
          { required: true, message: "请输入设备型号编码!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ]
        // ModelId: [
        //   { required: true, message: "请输入型号名称!", trigger: "change" }
        // ]
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
    // 展示设备注册弹框
    registOn() {
      this.dialogAddDataVisible = true;
    },
    // 分页
    pagination() {
      this.getDevicesList();
      console.log(this.page);
    },
    addFormClose() {
      this.$refs.addFormRef.resetFields();
      this.dialogAddDataVisible = false;
    },
    // 设备注册
    async addFormEnter() {
      registerAlarm(this.addForm)
        .then((data) => {
          if (data.data.success) {
            this.getDevicesList();
            this.$message.success("注册成功！");
          } else {
            this.$message.error("注册失败！" + data.data.message);
          }
          console.log(data);
        })
        .catch((error) => {
          this.$message.error("注册失败！");
          console.log(error);
        });
      this.addForm = {};
      this.dialogAddDataVisible = false;
    },
    // 修改设备信息
    editData(v) {
      this.editForm = v;
      this.dialogEditDataVisible = true;
      console.log(v);
    },
    async editFormEnter() {
      updataAlarmDevice(this.editForm)
        .then((data) => {
          if (data.data.success) {
            this.getDevicesList();
            this.$message.success("更新设备成功！");
            this.dialogEditDataVisible = false;
          } else {
            this.$message.error("更新设备失败！" + data.data.message);
            this.dialogEditDataVisible = false;
          }
          console.log(data);
        })
        .catch((err) => {
          this.$message.error("更新设备失败！");
          this.dialogEditDataVisible = false;
          console.log(err);
        });
      this.dialogEditDataVisible = false;
    },
    editFormClose() {
      this.editForm = {}
      this.dialogEditDataVisible = false
    },
    // 删除设备
    async deleteData(v) {
      deleteAlarmDevice().then(data => {
        this.getDevicesList()
        this.$message.success("删除设备成功！")
      }).catch(err => {
        this.$message.error("删除设备失败！")
        console.log(err);
      })
      console.log(v);
    },
    val(v) {
      console.log(v);
    },
    selection(e) {
      console.log(e);
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
::v-deep .el-dialog {
  width: 600px;
  // height: 330px;
  .el-dialog__body {
    padding: 0;
    .el-form-item {
      height: 38px;
      padding: 0;
      margin-bottom: 17px;
      .el-form-item__label {
        height: 38px;
      }
      .el-input {
        padding: 0 10px;
      }
      .el-select {
        width: 100%;
        i {
          margin-right: 5px;
        }
      }
      .el-input__prefix {
        .el-input__icon {
          padding-left: 10px;
        }
      }
    }
  }
  .el-dialog__footer {
    background: #f5f5f5;
    padding: 0 10px 10px;
  }
}
</style>
