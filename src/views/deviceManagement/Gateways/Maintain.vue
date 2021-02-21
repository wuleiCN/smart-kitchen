
<template>
  <div>
    <Selection :types="0" @selection="selection" @registOn="registOn" />
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
        <el-table-column prop="BatchNo" label="生产批次" width="120" align="center" />
        <el-table-column prop="Name" label="设备名称" width="120" align="center" />
        <el-table-column prop="AreaId" label="安装区域" width="120" align="center" />
        <el-table-column prop="ModelId" label="设备型号" width="200" align="center" />
        <el-table-column prop="RegistOn" label="人脸识别" align="center">
          <template #default="{row: Has}">
            <el-switch v-model="Has.HasFaceAI" disabled active-color="#13ce66" inactive-color="#ff4949" />
          </template>
        </el-table-column>
        <el-table-column prop="RegistOn" label="485接口" align="center">
          <template #default="{row: Has}">
            <el-switch v-model="Has.HasSerial485" disabled active-color="#13ce66" inactive-color="#ff4949" />
          </template>
        </el-table-column>
        <el-table-column prop="statusName" label="设备状态" width="120" align="center" />
        <el-table-column prop="CompanyId" label="所属单位" width="240" align="center" />
        <el-table-column prop="CustomerId" label="所属客户" width="240" align="center" />
        <el-table-column prop="RegistOn" label="注册日期" width="160" align="center">
          <template #default="{row: time}">{{ time.RegistOn }}</template>
        </el-table-column>
        <el-table-column #default="{row: data}" label="操作" width="180" align="center" fixed="right">
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-warning" type="text" @click="destroyData(data)">注销</el-button>
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
    <!-- 注册 -->
    <el-dialog title="添加" :visible.sync="dialogAddDataVisible" @close="addFormClose">
      <el-form ref="addFormRef" :model="addForm" :rules="rules">
        <el-form-item label="设备型号" label-width="80px" prop="ModelId">
          <el-select v-model="addForm.ModelId" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备代码" label-width="80px" prop="Code">
          <el-input v-model="addForm.Code" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addFormEnter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogEditDataVisible" @close="editFormClose">
      <el-form ref="addFormRef" :model="editForm" :rules="rules">
        <el-form-item label="设备型号" label-width="80px" prop="ModelId">
          <el-select v-model="editForm.ModelId" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="网关名称" label-width="80px" prop="Name">
          <el-input v-model="editForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="网关名称" label-width="80px" prop="Code">
          <el-input v-model="editForm.Code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="机器代码" label-width="80px" prop="MachineCode">
          <el-input v-model="editForm.MachineCode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="人脸智能" label-width="80px">
          <el-switch v-model="editForm.HasFaceAI" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="485接口" label-width="80px">
          <el-switch v-model="editForm.HasSerial485" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="设备状态" label-width="80px" prop="Statuses">
          <Select :url="deviceStatus" :foo.sync="editForm.Statuses" />
        </el-form-item>
        <el-form-item label="注册日期" label-width="80px">
          <el-input v-model="editForm.RegistOn" autocomplete="off" disabled />
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
import Selection from "@/components/Select-card"
import Select from "@/components/InferFace"
import Pagination from "@/components/Pagination";
import {
  getByAdvanceWithPage,
  GatewaysRegist,
  GatewaysUpdate,
  GatewaysDestroy,
  GatewaysDelete
} from "@/api/device/Getways"
import * as enumList from "@/api/Dictionary.js";
import { getDeviceModels } from "@/api/device/select.js"
export default {
  components: {
    Selection,
    Pagination,
    Select
  },
  props: {},
  data() {
    return {
      select: "",
      loading: true,
      status: [],
      tableData: [],
      dialogAddDataVisible: false,
      dialogEditDataVisible: false,
      distroyId: "",
      addForm: {
        ModelId: "",
        Code: ""
      },
      editForm: {},
      deviceType: "getDeviceType",
      deviceStatus: "getDeviceStatus",
      devicesModel: [],
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      rules: {
        ModelId: [
          { required: true, message: "请输入设备类型!", trigger: "change" }
        ],
        Code: [
          { required: true, message: "请输入设备编码!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        MachineCode: [
          { required: true, message: "请输入机器代码!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        Name: [
          { required: true, message: "请输入网关名称!", trigger: "blur" },
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
  created() {
    this.getDeviceStatus()
    this.getDeviceModelList()
  },
  mounted() {
    this.getDeviesInfo()
  },
  methods: {
    // 获取设备状态
    async getDeviceStatus() {
      const { data: res } = await enumList["getDeviceStatus"]()
      this.status = res
      console.log(res);
    },
    // 设备型号信息
    async getDeviceModelList() {
      try {
        const { data: res } = await getDeviceModels()
        this.devicesModel = res.filter(v => v.Type === 0)
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    // 获取设备信息
    async getDeviesInfo() {
      try {
        const { data: res } = await getByAdvanceWithPage({
          company: "4DEE5709-6096-40C7-9D0C-793E391D57B9",
          limit: this.page.resultSize,
          offset: this.page.resultSize * this.page.pageNo
        })
        res.rows.map(e => {
          this.status.forEach(i => {
            if (e.Status === i.value) e.statusName = i.name
          })
        });
        this.tableData = res.rows
        this.page.total = res.total
        this.loading = false
        console.log(res);
      } catch (error) {
        this.$message.warning("连接超时！请稍后重试")
        this.loading = false
        console.log(error);
      }
    },
    // 分页
    pagination() {
      this.getDeviesInfo()
    },
    // 修改弹框
    editData(v) {
      this.dialogEditDataVisible = true
      this.editForm = JSON.parse(JSON.stringify(v))
      console.log(v);
    },
    async editFormEnter() {
      try {
        const { data: res } = await GatewaysUpdate()
        if (res.success) this.$message.success("修改成功！")
        else this.$message.error("修改失败！")
        this.dialogEditDataVisible = false
      } catch (error) {
        this.$message.error("修改失败！")
        this.dialogEditDataVisible = false
        console.log(error);
      }
    },
    editFormClose() {
      this.editForm = {}
      this.dialogEditDataVisible = false
    },
    // 注销弹框
    destroyData(v) {
      this.$confirm("此操作将永久注销该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await GatewaysDestroy({ Id: v.Id })
        this.$message({
          type: "success",
          message: "注销成功!"
        });
      }).catch(() => {
        this.$message({
          type: "error",
          message: "注销失败！"
        });
      });
      // this.dialogDestroyDataVisible = true
      console.log(v);
    },
    // 删除弹框
    deleteData(v) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await GatewaysDelete({ Id: v.Id })
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }).catch(() => {
        this.$message({
          type: "error",
          message: "删除失败！"
        });
      });
    },
    // 查询弹框
    selection(v) {
      console.log(v);
    },
    // 注册弹框
    registOn() {
      this.dialogAddDataVisible = true
      this.getDeviceModelList()
    },
    addFormClose() {
      Object.assign(this.$data.addForm, this.$options.data().addForm)
      this.dialogAddDataVisible = false
    },
    async addFormEnter() {
      try {
        const { data: res } = await GatewaysRegist(this.addForm)
        if (res.success) this.$message.success("注册成功!")
        else this.$message.error("注册失败!")
        Object.assign(this.$data.addForm, this.$options.data().addForm)
        this.dialogAddDataVisible = false
      } catch (error) {
        this.dialogAddDataVisible = false
        this.$message.error("注册失败!")
        Object.assign(this.$data.addForm, this.$options.data().addForm)
        console.log("注册失败！", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  .el-table {
    .el-button:nth-child(2) {
      color: #e6a23c;
    }
    .el-button:nth-child(3) {
      color: #f56c6c;
    }
  }
}
</style>
