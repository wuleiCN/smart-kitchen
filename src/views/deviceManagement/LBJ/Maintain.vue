<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="设备编码" label-width="80px">
              <el-input v-model="select.Code" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备型号编码" label-width="96px">
              <el-input v-model="select.ComNumber" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产批次" label-width="80px">
              <el-input v-model="select.BatchNo" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="型号名称" label-width="80px">
              <el-input v-model="select.AlertDeviceModel" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="状态" label-width="80px">
              <el-select v-model="select.StatusName" filterable placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册日期" label-width="90px">
              <el-date-picker
                v-model="select.RegistOn"
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
              @click="getAlarmByQueryList"
            >查 询</el-button>
            <el-button type="success" size="small" icon="el-icon-plus" @click="registOn">设备注册</el-button>
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
          <el-select v-model="select.ModelId" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
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
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-select v-model="editForm.StatusName" filterable placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
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
  getAlarmDeviceList,
  getAlarmByQuery,
  registerAlarm,
  updataAlarmDevice,
  deleteAlarmDevice
} from "@/api/device/LBJ.js";
import { getAlarmModelList } from "@/api/systemSetting/customerDevices.js";
export default {
  components: {
    Pagination
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
      // 设备信息列表
      tableData: [],
      statusOptions: [
        "在库",
        "售出",
        "安装",
        "工作",
        "待机",
        "布防",
        "撤防",
        "注销"
      ],
      // 查询条件参数
      select: {
        BatchNo: "",
        Code: "",
        ComNumber: "",
        Models: "",
        Statuses: "",
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
      // 设备型号
      devicesModel: "",
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
    this.getAlarmList();
    this.getAlarmModel();
  },
  methods: {
    // 报警设备列表
    async getAlarmList() {
      try {
        const { data: res } = await getAlarmDeviceList({
          offset: (this.page.pageNo - 1) * this.page.resultSize,
          limit: this.page.resultSize,
          order: "asc"
        });
        this.tableData = res.rows;
        this.page.total = res.total;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    // 设备型号列表
    async getAlarmModel() {
      getAlarmModelList()
        .then((data) => {
          this.devicesModel = data.data;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 条件查询
    async getAlarmByQueryList() {
      try {
        const { data: res } = await getAlarmByQuery({
          BatchNo: this.select.BatchNo,
          Code: this.select.Code,
          ComNumber: this.select.ComNumber,
          Models: this.select.Models,
          Statuses: this.select.Statuses,
          RegistOnFrom: this.select.RegistOn.length
            ? this.select.RegistOn[0].getTime()
            : "",
          RegistOnTo: this.select.RegistOn.length
            ? this.select.RegistOn[1].getTime()
            : "",
          offset: (this.page.pageNo - 1) * this.page.resultSize,
          limit: this.page.resultSize,
          order: "asc"
        });
        console.log(res, this.select.RegistOn.length);
      } catch (error) {
        console.log(error);
      }
    },
    // 展示设备注册弹框
    registOn() {
      this.dialogAddDataVisible = true;
    },
    // 分页
    pagination() {
      this.getAlarmList({});
      console.log(this.page);
    },
    addFormClose() {
      this.$refs.addFormRef.resetFields();
      this.dialogAddDataVisible = false;
    },
    // 设备注册
    async addFormEnter() {
      registerAlarm()
        .then((data) => {
          if (data.data.message) {
            this.getAlarmList();
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
    // 删除设备
    async deleteData(v) {
      deleteAlarmDevice().then(data => {
        this.getAlarmList()
        this.$message.success("删除设备成功！")
      }).catch(err => {
        this.$message.error("删除设备失败！")
        console.log(err);
      })
      console.log(v);
    },
    val(v) {
      console.log(v);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card:nth-child(1) {
  margin: 20px;
  .el-dialog__header {
    background: #f5f5f5;
  }
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
    }
  }
  .el-dialog__footer {
    background: #f5f5f5;
    padding: 0 10px 10px;
  }
}
</style>
