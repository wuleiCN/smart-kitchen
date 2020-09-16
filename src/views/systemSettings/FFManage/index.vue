<template>
  <div>
    <el-card>
      <el-button
        size="mini"
        round
        icon="el-icon-plus"
        style="  background-color: #03B3B2;color: #fff"
        @click="dialogAddDataVisible = true"
      >添 加</el-button>
    </el-card>
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;font-size: 13px;"
        row-key="id"
        border
        stripe
        size="mini"
      >
        <el-table-column prop="Name" label="灭火设备型号" width="360" align="left" />
        <el-table-column prop="Standard" label="执行标准" align="center" />
        <el-table-column prop="Medicament" label="灭火药剂" align="center" />
        <el-table-column prop="MedicmentWeight" label="药剂重量(KG)" align="center" />
        <el-table-column prop="PeriodOfValidity" label="有效期(月)" align="center" />
        <el-table-column prop="StatusName" label="型号状态" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogAddDataVisible" @close="addFormClose">
      <el-form :model="fireDeviceFrom">
        <el-form-item label="灭火设备型号" label-width="100px">
          <el-input v-model="fireDeviceFrom.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="执行标准" label-width="100px">
          <el-input v-model="fireDeviceFrom.Standard" autocomplete="off" />
        </el-form-item>
        <el-form-item label="灭火药剂" label-width="100px">
          <el-input v-model="fireDeviceFrom.Medicament" autocomplete="off" />
        </el-form-item>
        <el-form-item label="药剂重量(KG)" label-width="100px">
          <el-input
            v-model="fireDeviceFrom.MedicmentWeight"
            autocomplete="off"
            type="number"
            @input="minlength($event,'MedicmentWeight')"
          />
        </el-form-item>
        <el-form-item label="有效期(月)" label-width="100px">
          <el-input
            v-model="fireDeviceFrom.PeriodOfValidity"
            autocomplete="off"
            type="number"
            @input="minlength($event,'PeriodOfValidity')"
          />
        </el-form-item>
        <el-form-item label="独立/集成设备" label-width="105px">
          <el-switch
            v-model="fireDeviceFrom.WithAlertDevice"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#D9534F"
            :active-text="fireDeviceFrom.WithAlertDevice ? '是' : '否'"
          />
        </el-form-item>
        <el-form-item label="报警设备型号" label-width="100px">
          <el-select v-model="fireDeviceFrom.DefaultAlertDeviceModelId" placeholder="请选择">
            <el-option
              v-for="item in AlarmDevicesList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="型号状态" label-width="100px">
          <el-radio-group v-model="fireDeviceFrom.Status">
            <el-radio :label="1">在用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备图片" label-width="100px" style="height: 93px;">
          <el-upload
            :file-list="urlList"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :on-preview="imgCardPreview"
            :on-remove="imgRemove"
            :on-success="imgUpload"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div
            style="position: absolute;height: 20px;line-height: 20px;color: #aaa;bottom: -71px;"
          >(最多上传1张且不超过1M大小的图片)</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addFormEnter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogEditDataVisible" @close="editFormClose">
      <el-form :model="fireDeviceFrom">
        <el-form-item label="灭火设备型号" label-width="100px">
          <el-input v-model="fireDeviceFrom.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="执行标准" label-width="100px">
          <el-input v-model="fireDeviceFrom.Standard" autocomplete="off" />
        </el-form-item>
        <el-form-item label="灭火药剂" label-width="100px">
          <el-input v-model="fireDeviceFrom.Medicament" autocomplete="off" />
        </el-form-item>
        <el-form-item label="药剂重量(KG)" label-width="100px">
          <el-input
            v-model="fireDeviceFrom.MedicmentWeight"
            autocomplete="off"
            type="number"
            @input="minlength($event,'MedicmentWeight')"
          />
        </el-form-item>
        <el-form-item label="有效期(月)" label-width="100px">
          <el-input
            v-model="fireDeviceFrom.PeriodOfValidity"
            autocomplete="off"
            type="number"
            @input="minlength($event,'PeriodOfValidity')"
          />
        </el-form-item>
        <el-form-item label="独立/集成设备" label-width="105px">
          <el-switch
            v-model="fireDeviceFrom.WithAlertDevice"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#D9534F"
            :active-text="fireDeviceFrom.WithAlertDevice ? '是' : '否'"
          />
        </el-form-item>
        <el-form-item label="报警设备型号" label-width="100px">
          <el-select
            v-model="fireDeviceFrom.DefaultAlertDeviceModelId"
            placeholder="请选择"
            @change="val($event)"
          >
            <el-option
              v-for="item in AlarmDevicesList"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="型号状态" label-width="100px">
          <el-radio-group v-model="fireDeviceFrom.Status">
            <el-radio :label="1">在用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备图片" label-width="100px" style="height: 93px;">
          <el-upload
            :file-list="urlList"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :on-preview="imgCardPreview"
            :on-remove="imgRemove"
            :on-success="imgUpload"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div
            style="position: absolute;height: 20px;line-height: 20px;color: #aaa;bottom: -71px;"
          >(最多上传1张且不超过1M大小的图片)</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormClose">取 消</el-button>
        <el-button type="primary" @click="editFormEnter">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgDialogVisible">
      <el-image style="width: 100%;height: 500px;" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import {
  getFireList,
  getAlarmModelList,
  updataFire,
  addFire,
  deleteFire
} from "@/api/systemSetting/customerDevices.js";
export default {
  data() {
    return {
      loading: true,
      urlList: [],
      tableData: [],
      AlarmDevicesList: [],
      fireDeviceFrom: {
        Status: 1
      },
      dialogEditDataVisible: false,
      dialogAddDataVisible: false,
      dialogImageUrl: "",
      imgDialogVisible: false
    };
  },
  created() {
    this.getFireDevicesList();
    this.getAlarmDevicesList();
  },
  methods: {
    // 获取报警设备型号列表
    async getAlarmDevicesList() {
      try {
        const data = await getAlarmModelList();
        this.AlarmDevicesList = data.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取灭火设备型号列表
    async getFireDevicesList() {
      try {
        const data = await getFireList();
        this.tableData = data.data;
        this.loading = false;
        console.log(data);
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    // 展示修改弹框
    editData(v) {
      if (v.Picture !== "") this.urlList.push({ url: v.Picture });
      this.fireDeviceFrom = v;
      this.dialogEditDataVisible = true;
      console.log(v);
    },
    // 删除
    deleteData(v) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await deleteFire(v.Id);
            this.$message.success("删除成功！");
            this.getFireDevicesList();
          } catch (err) {
            this.$message.error("删除失败！");
            this.getFireDevicesList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 确定修改
    async editFormEnter() {
      this.fireDeviceFrom.Picture = this.urlList.length
        ? this.urlList[0].url
        : "";
      this.fireDeviceFrom.StatusName = this.fireDeviceFrom.Status
        ? "在用"
        : "停用";
      try {
        await updataFire(this.fireDeviceFrom);
        this.$message.success("更新成功！");
        this.getFireDevicesList();
        this.dialogEditDataVisible = false;
      } catch (error) {
        this.$message.error("更新失败！");
        this.getFireDevicesList();
        this.dialogEditDataVisible = false;
      }
      console.log(this.fireDeviceFrom);
    },
    // 取消更新
    editFormClose() {
      this.fireDeviceFrom = { Status: 1 };
      this.urlList = [];
      this.dialogEditDataVisible = false;
    },
    // 添加
    async addFormEnter() {
      this.fireDeviceFrom.Picture = this.urlList.length
        ? this.urlList[0].url
        : "";
      this.fireDeviceFrom.StatusName = this.fireDeviceFrom.Status
        ? "在用"
        : "停用";
      try {
        await addFire(this.fireDeviceFrom);
        this.fireDeviceFrom = { Status: 1 };
        this.urlList = [];
        this.getFireDevicesList();
        this.$message.success("添加成功！");
        this.dialogAddDataVisible = false;
      } catch (error) {
        this.fireDeviceFrom = { Status: 1 };
        this.urlList = [];
        this.getFireDevicesList();
        this.$message.success("添加失败！");
        this.dialogAddDataVisible = false;
      }
    },
    // 取消添加
    addFormClose() {
      this.fireDeviceFrom = { Status: 1 };
      this.urlList = [];
      this.dialogAddDataVisible = false;
    },
    imgRemove(file, fileList) {
      this.urlList = this.urlList.filter((v) => v.url !== file.url);
      console.log(file, this.urlList);
    },
    imgUpload(file, fileList) {
      this.urlList.push({ url: fileList.url });
      console.log(fileList, this.urlList);
    },
    handleExceed() {
      this.$message.warning("当前限制选择 1 个文件");
    },
    imgCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    minlength(e, v) {
      this.fireDeviceFrom[v] = e < 0 ? "0" : e;
      console.log(e, this.fireDeviceFrom[v]);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card:nth-child(1) {
  height: 70px;
  margin: 20px;
}
::v-deep .el-card:nth-child(2) {
  height: 600px;
  margin: 0 20px;
}
::v-deep .el-dialog {
  width: 600px;
  // height: 416px;
  .el-dialog__header {
    padding: 20px 20px;
    background: #eee;
  }
  .el-dialog__body {
    padding: 10px 20px 0 20px;
    .el-form-item {
      margin-bottom: 15px;
      .el-form-item__label {
        line-height: 34px;
      }
      .el-form-item__content {
        margin-left: 120px;
        height: 34px;
        .el-input,
        .el-input__inner {
          width: 455px;
          height: 34px;
          .el-input__icon {
            line-height: 0;
          }
        }
        .el-upload-list__item,
        .el-upload {
          width: 85px;
          height: 85px;
          [class^="el-icon-plus"] {
            transform: translateY(-85%);
          }
        }
      }
      .el-switch {
        line-height: 34px;
        height: 34px;
        width: 100px;
        .el-switch__label {
          height: 34px;
        }
      }
    }
  }
  .el-dialog__footer {
    padding: 0;
    .dialog-footer {
      display: flex;
      height: 58px;
      background: #eee;
      justify-content: flex-end;
      align-items: center;
      .el-button {
        display: flex;
        width: 50px;
        height: 32px;
        justify-content: center;
        align-items: center;
        margin: 0 15px 0 0;
      }
    }
  }
}
</style>
