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
        <el-table-column prop="Name" label="报警设备型号" width="380" align="left" />
        <el-table-column prop="CommandSet" label="指令集" align="center" />
        <el-table-column prop="MaintancePeroid" label="维保周期（月）" align="center" />
        <el-table-column prop="StatusName" label="状态" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogAddDataVisible" @close="addFormClose">
      <el-form>
        <el-form-item label="报警设备型号" label-width="100px">
          <el-input v-model="deviceFrom.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="指令集" label-width="100px">
          <el-select v-model="commandSetValue" placeholder="请选择">
            <el-option v-for="(v,i) in deviceFrom.commandSetName" :key="i" :label="v" :value="v" />
          </el-select>
        </el-form-item>
        <el-form-item label="维保周期(月)" label-width="100px">
          <el-input v-model="deviceFrom.MaintancePeroid" autocomplete="off" />
        </el-form-item>
        <el-form-item label="独立/集成设备" label-width="105px">
          <el-switch
            v-model="deviceFrom.Alone"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#F0AD4E"
            :active-text="deviceFrom.Alone ? '独立' : '集成'"
          />
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-radio-group v-model="deviceFrom.Status">
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
            :on-exceed="handleExceed"
            :on-success="imgUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div
            style="position: absolute;height: 20px;line-height: 20px;color: #aaa;bottom: -71px;"
          >(最多上传3张且不超过1M大小的图片)</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addFormEnter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogEditDataVisible" @close="editFormClose">
      <el-form>
        <el-form-item label="报警设备型号" label-width="100px">
          <el-input v-model="deviceFrom.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="指令集" label-width="100px">
          <el-select v-model="commandSetValue" placeholder="请选择">
            <el-option v-for="(v,i) in deviceFrom.commandSetName" :key="i" :label="v" :value="v" />
          </el-select>
        </el-form-item>
        <el-form-item label="维保周期(月)" label-width="100px">
          <el-input v-model="deviceFrom.MaintancePeroid" autocomplete="off" />
        </el-form-item>
        <el-form-item label="独立/集成设备" label-width="105px">
          <el-switch
            v-model="deviceFrom.Alone"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#F0AD4E"
            :active-text="deviceFrom.Alone ? '独立' : '集成'"
          />
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-radio-group v-model="deviceFrom.Status">
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
          >(最多上传3张且不超过1M大小的图片)</div>
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
  getAlarmList,
  updataAlarm,
  addAlarm,
  deleteAlarm
} from "@/api/systemSetting/customerDevices.js";
export default {
  data() {
    return {
      urlList: [],
      tableData: [],
      loading: true,
      deviceFrom: {
        Status: 1
      },
      commandSetValue: "",
      dialogEditDataVisible: false,
      dialogAddDataVisible: false,
      dialogImageUrl: "",
      imgDialogVisible: false
    };
  },
  created() {
    this.getCustomerDevicesData();
  },
  methods: {
    // 获取列表
    async getCustomerDevicesData() {
      try {
        const data = await getAlarmList();
        if (data.status === 200) {
          this.tableData = data.data;
          this.loading = false;
        }
        console.log(data);
      } catch (error) {
        this.loading = false;
        this.$message.error("获取列表失败！");
      }
    },
    // 展示修改弹框
    editData(v) {
      if (v.CommandSetName instanceof Array) {
        v.CommandSetName = v.CommandSetName.split(",");
      }
      if (v.Picture !== "") this.urlList.push({ url: v.Picture });
      this.deviceFrom = v;
      this.dialogEditDataVisible = true;
      console.log(this.deviceFrom, this.urlList);
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
            await deleteAlarm(v.Id);
            this.$message.success("删除成功！");
            this.getCustomerDevicesData();
          } catch (error) {
            this.$message.error("删除失败！");
            this.getCustomerDevicesData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 确定新增
    async addFormEnter() {
      this.deviceFrom.Picture = this.urlList.length ? this.urlList[0].url : "";
      this.deviceFrom.StatusName = this.deviceFrom.Status ? "在用" : "停用";
      try {
        await addAlarm(this.deviceFrom);
        this.getCustomerDevicesData();
        this.deviceFrom = { Status: 1 };
        this.urlList = [];
        this.dialogAddDataVisible = false;
        this.$message.success("添加成功！");
      } catch (error) {
        this.getCustomerDevicesData();
        this.deviceFrom = { Status: 1 };
        this.urlList = [];
        this.dialogAddDataVisible = false;
        this.$message.error("添加失败！");
      }
    },
    // 取消
    addFormClose() {
      this.deviceFrom = { Status: 1 };
      this.urlList = [];
      this.dialogAddDataVisible = false;
    },
    // 确定修改
    async editFormEnter() {
      // this.deviceFrom.CommandSetName = this.deviceFrom.CommandSetName.join(",")
      // this.urlList.shift();
      this.deviceFrom.Picture = this.urlList.length ? this.urlList[0].url : "";
      this.deviceFrom.StatusName = this.deviceFrom.Status ? "在用" : "停用";
      try {
        await updataAlarm(this.deviceFrom);
        this.getCustomerDevicesData();
        this.deviceFrom = { Status: 1 };
        this.urlList = [];
        this.dialogEditDataVisible = false;
        this.$message.success("更新成功！");
      } catch (error) {
        this.deviceFrom = { Status: 1 };
        this.urlList = [];
        this.dialogEditDataVisible = false;
        this.$message.error("更新失败！");
      }
      console.log(this.deviceFrom);
    },
    // 取消
    editFormClose() {
      this.deviceFrom = { Status: 1 };
      this.urlList = [];
      this.dialogEditDataVisible = false;
    },
    // 删除图片
    imgRemove(file, fileList) {
      this.urlList = this.urlList.filter((v) => v.url !== file.url);
      console.log(file, fileList);
    },
    // 图片预览
    imgCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    // 添加图片
    imgUpload(file, fileList) {
      this.urlList.push({ url: fileList.url });
      console.log(fileList, this.urlList);
    },
    handleExceed() {
      this.$message.warning("当前限制选择 1 个文件");
    },
    val(v) {
      console.log(v);
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
