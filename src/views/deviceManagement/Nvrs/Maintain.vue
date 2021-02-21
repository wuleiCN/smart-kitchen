
<template>
  <div>
    <Selection :types="3" @selection="selection" @registOn="registOn" />
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
        <el-table-column prop="brandName" label="设备品牌" width="120" align="center" />
        <el-table-column prop="Name" label="设备名称" width="200" align="center" />
        <el-table-column prop="AreaId" label="安装区域" width="120" align="center" />
        <el-table-column prop="modleName" label="设备型号" width="200" align="center" />
        <el-table-column prop="IP" label="IP地址" width="200" align="center" />
        <el-table-column prop="UserName" label="设备登录用户" width="200" align="center" />
        <el-table-column prop="Password" label="设备登录密码" width="200" align="center" />
        <el-table-column prop="Port" label="登录端口" width="200" align="center" />
        <el-table-column prop="Channel" label="NVR通道号" width="200" align="center" />
        <el-table-column prop="Comment" label="备注" width="200" align="center" />
        <el-table-column prop="statusName" label="设备状态" width="120" align="center" />
        <el-table-column prop="CompanyId" label="所属单位" width="240" align="center" />
        <el-table-column prop="CustomerId" label="所属客户" width="240" align="center" />
        <el-table-column prop="RegistOn" label="注册日期" width="160" align="center">
          <template #default="{row: time}">{{ time.RegistOn }}</template>
        </el-table-column>
        <el-table-column prop="RegistOn" label="修改日期" width="160" align="center">
          <template #default="{row: time}">{{ time.ModiOn }}</template>
        </el-table-column>
        <el-table-column prop="RegistOn" label="注销日期" width="160" align="center">
          <template #default="{row: time}">{{ time.DestroiedOn }}</template>
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
        <el-form-item label="设备型号" label-width="120px" prop="ModelId">
          <el-select v-model="addForm.ModelId" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备品牌" label-width="120px" prop="Brand">
          <el-select v-model="addForm.Brand" filterable placeholder="请选择">
            <el-option
              v-for="item in Brand"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Nvr代码" label-width="120px" prop="Code">
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
      <el-form ref="editFormRef" :model="editForm" :rules="rules">
        <el-form-item label="设备型号" label-width="120px" prop="ModelId">
          <el-select v-model="editForm.ModelId" filterable placeholder="请选择">
            <el-option
              v-for="item in devicesModel"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="摄像机品牌" label-width="120px" prop="Brand">
          <el-select v-model="editForm.Brand" filterable placeholder="请选择">
            <el-option
              v-for="item in Brand"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态" label-width="120px" prop="Code">
          <Select :url="deviceStatus" :foo.sync="editForm.Status" />
        </el-form-item>
        <el-form-item label="摄像机代码" label-width="120px" prop="Code">
          <el-input v-model="editForm.Code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="摄像机名称" label-width="120px" prop="Code">
          <el-input v-model="editForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="IP地址" label-width="120px" prop="Code">
          <el-input v-model="editForm.IP" autocomplete="off" placeholder="格式：192.168.1.11" />
        </el-form-item>
        <el-form-item label="设备登录用户" label-width="120px" prop="Code">
          <el-input v-model="editForm.UserName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="设备登录密码" label-width="120px" prop="Code">
          <el-input v-model="editForm.Password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="登录端口" label-width="120px" prop="Code">
          <el-input v-model="editForm.Port" autocomplete="off" />
        </el-form-item>
        <el-form-item label="NVR通道号" label-width="120px" prop="Code">
          <el-input v-model="editForm.Channel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="人脸智能" label-width="120px">
          <el-switch v-model="editForm.FaceAI" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="人体识别" label-width="120px">
          <el-switch v-model="editForm.HumanAI" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="注册日期" label-width="120px">
          <span>{{ editForm.RegistOn | dateFormat }}</span>
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
  getNvrsByCompany,
  NvrsRegist,
  NvrsUpdate,
  NrvsDelete,
  NrvsDestroy
} from "@/api/device/Nvrs"
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
      Brand: [],
      tableData: [],
      dialogAddDataVisible: false,
      dialogEditDataVisible: false,
      distroyId: "",
      addForm: {
        Brand: "",
        Code: "",
        Name: "",
        IP: "",
        UserName: "",
        Password: "",
        Port: "",
        Channel: "",
        Comment: "",
        Status: "",
        RegistOn: new Date().getTime()
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
        Brand: [
          { required: true, message: "请输入设备品牌!", trigger: "change" }
        ],
        Status: [
          { required: true, message: "请输入设备状态!", trigger: "change" }
        ],
        Code: [
          { required: true, message: "请输入设备编码!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        UserName: [
          { required: true, message: "请输入设备登录用户!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        Password: [
          { required: true, message: "请输入设备登录密码!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        Name: [
          { required: true, message: "请输入设备名称!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        Port: [
          { required: true, message: "请输入登录端口!", trigger: "blur" },
          {
            min: 2,
            message: "长度在 2 个字符以上",
            trigger: "blur"
          }
        ],
        Channel: [
          { required: true, message: "请输入NVR通道号!", trigger: "blur" },
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
      // 获取设备品牌
      const { data: info } = await enumList["getCameraBrand"]()
      this.status = res
      this.Brand = info
      console.log(res, info);
    },
    // 设备型号信息
    async getDeviceModelList() {
      try {
        const { data: res } = await getDeviceModels()
        this.devicesModel = res.filter(v => v.Type === 3)
        console.log(res, this.devicesModel);
      } catch (err) {
        console.log(err);
      }
    },
    // 获取设备信息
    async getDeviesInfo() {
      try {
        const { data: res } = await getNvrsByCompany({
          company: "4DEE5709-6096-40C7-9D0C-793E391D57B9",
          limit: this.page.resultSize,
          offset: this.page.resultSize * this.page.pageNo
        })
        res.map(e => {
          this.status.forEach(i => {
            if (e.Status === i.value) e.statusName = i.name
          })
          this.Brand.forEach(v => {
            if (e.Brand === v.value) e.brandName = v.name
          })
          e.modleName = this.devicesModel.find(i => e.ModelId === i.Id).Name
        });
        this.tableData = res
        // this.page.total = res.total
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
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          try {
            const { data: res } = await NvrsUpdate()
            if (res.success) this.$message.success("修改成功！")
            else this.$message.error("修改失败！")
            this.dialogEditDataVisible = false
          } catch (error) {
            this.$message.error("修改失败！")
            this.dialogEditDataVisible = false
            console.log(error);
          }
        } else {
          console.log("error!");
          return false;
        }
      });
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
        await NrvsDelete({ Id: v.Id })
        this.$message({
          type: "success",
          message: "注销成功!"
        });
      }).catch(() => {
        this.$message({
          type: "error",
          message: "注销失败!"
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
        await NrvsDestroy({ Id: v.Id })
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
      this.$refs.addFormRef.resetFields()
      this.dialogAddDataVisible = false
    },
    async addFormEnter() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          try {
            const { data: res } = await NvrsRegist(this.addForm)
            if (res.success) this.$message.success("注册成功!")
            else this.$message.error("注册失败!")
            Object.assign(this.$data.addForm, this.$options.data().addForm)
            this.dialogAddDataVisible = false
          } catch (error) {
            this.dialogAddDataVisible = false
            this.$message.success("注册失败!")
            Object.assign(this.$data.addForm, this.$options.data().addForm)
          }
        } else {
          console.log("error!");
          return false;
        }
      });
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
