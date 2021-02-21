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
        <el-table-column prop="Code" label="设备编码" align="left" />
        <el-table-column prop="ComNumber" label="设备型号编码" width="240" align="center" />
        <el-table-column prop="BatchNo" label="生产批次" align="center" />
        <el-table-column prop="AlertDeviceModel" label="型号名称" align="center" />
        <el-table-column prop="StatusName" label="状态" align="center" />
        <el-table-column prop="RegistOn" label="注册日期" align="center">
          <template #default="{row: time}">{{ time.RegistOn }}</template>
        </el-table-column>
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
          <!-- <el-select v-model="select.ModelId" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select> -->
          <Select :url="deviceType" :foo.sync="updataType" />
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
          <Select :url="deviceType" :foo.sync="updataType" />
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <Select :url="deviceStatus" :foo.sync="editData.Status" />
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
import Batch from "@/views/deviceManagement/FF/Batch";
import Pagination from "@/components/Pagination";
import Select from "@/components/InferFace"
import Selection from "@/components/Select-card"
import { getFiresByQuery, updateFireModel } from "@/api/device/FF.js";
export default {
  components: {
    Pagination,
    Select,
    Selection
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
      tableData: [],
      updataType: "",
      loading: true,
      // 注册参数
      addForm: {
        BatchNo: "",
        Code: "",
        ComNumber: "",
        ModelId: ""
      },
      // 修改参数
      editForm: [],
      dialogAddDataVisible: false,
      dialogEditDataVisible: false,
      value: "",
      deviceType: "getDeviceType",
      deviceStatus: "getDeviceStatus",
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
      }
    };
  },
  watch: {
    updataStatus(e, v) {
      console.log(e, v, this.updataStatus);
    }
  },
  created() {
    this.getFiresList();
  },
  methods: {
    // 灭火设备信息列表
    async getFiresList() {
      try {
        const { data: res } = await getFiresByQuery({
          offset: (this.page.pageNo - 1) * this.page.resultSize,
          limit: this.page.resultSize,
          order: "asc"
        });
        this.tableData = res.rows
        this.page.total = res.total
        this.loading = false
        console.log(res);
      } catch (error) {
        this.$message.error("链接超时！")
        this.loading = false
      }
    },
    getFireByQueryList() {},
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
    // 展示设备注册弹框
    registOn() {
      this.dialogAddDataVisible = true;
    },
    addFormClose() {
      this.$refs.addFormRef.resetFields();
      this.dialogAddDataVisible = false;
    },
    // 设备注册
    async addFormEnter() {
      this.dialogAddDataVisible = false;
      console.log("add--->");
    },
    // 修改设备信息
    editData(v) {
      this.editForm = v;
      this.dialogEditDataVisible = true;
      console.log(v);
    },
    async editFormEnter() {
      updateFireModel(this.editForm)
        .then((data) => {
          if (data.data.success) {
            this.getAlarmList();
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
    editFormClose() {},
    get() {
      console.log(Batch);
    },
    selection() {}
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
