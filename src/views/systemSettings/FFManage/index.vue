<template>
  <div>
    <el-card>
      <el-button
        size="mini"
        round
        icon="el-icon-plus"
        style="  background-color: #03B3B2;color: #fff"
        @click="addForm.dialogAddDataVisible = true"
      >添 加</el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%;font-size: 13px;"
        row-key="id"
        border
        stripe
        size="mini"
      >
        <el-table-column prop="model" label="灭火设备型号" width="360" align="left" />
        <el-table-column prop="standard" label="执行标准" align="center" />
        <el-table-column prop="medica" label="灭火药剂" align="center" />
        <el-table-column prop="weight" label="药剂重量(KG)" align="center" />
        <el-table-column prop="validity" label="有效期(月)" align="center" />
        <el-table-column prop="status" label="型号状态" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加" :visible.sync="addForm.dialogAddDataVisible" @close="addFormClose">
      <el-form>
        <el-form-item label="灭火设备型号" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="执行标准" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="灭火药剂" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="药剂重量(KG)" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="有效期(月)" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="集成报警设备" label-width="105px">
          <el-switch
            v-model="addForm.disable"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#D9534F"
            :active-text="addForm.disable ? '是' : '否'"
            @change="isDisable"
          />
        </el-form-item>
        <el-form-item v-if="addForm.disable" label="报警设备型号" label-width="100px">
          <el-select v-model="addForm.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="型号状态" label-width="100px">
          <el-radio v-model="addForm.menuCag" label="1">在用</el-radio>
          <el-radio v-model="addForm.menuCag" label="2">停用</el-radio>
        </el-form-item>
        <el-form-item label="设备图片" label-width="100px" style="height: 85px;">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="imgCardPreview"
            :on-remove="imgRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addForm.dialogEditDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="editForm.dialogEditDataVisible" @close="editFormClose">
      <el-form>
        <el-form-item label="灭火设备型号" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="执行标准" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="灭火药剂" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="药剂重量(KG)" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="有效期(月)" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="独立/集成设备" label-width="105px">
          <el-switch
            v-model="editForm.disable"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#D9534F"
            :active-text="editForm.disable ? '是' : '否'"
            @change="isDisable"
          />
        </el-form-item>
        <el-form-item label="报警设备型号" label-width="100px">
          <el-select v-model="editForm.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="型号状态" label-width="100px">
          <el-radio v-model="editForm.menuCag" label="1">在用</el-radio>
          <el-radio v-model="editForm.menuCag" label="2">停用</el-radio>
        </el-form-item>
        <el-form-item label="设备图片" label-width="100px" style="height: 85px;">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="imgCardPreview"
            :on-remove="imgRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormClose">取 消</el-button>
        <el-button type="primary" @click="editForm.dialogEditDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgDialogVisible">
      <el-image style="width: 100%;height: 500px;" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 2,
          model: "精安厨房灭火器（单瓶）",
          standard: "	xxx标准",
          medica: "xxx",
          weight: "10",
          validity: "12",
          status: "在用"
        },
        {
          id: 3,
          model: "精安厨房灭火器（单瓶）",
          standard: "	xxx标准",
          medica: "xxx",
          weight: "10",
          validity: "12",
          status: "在用"
        },
        {
          id: 4,
          model: "精安厨房灭火器（单瓶）",
          standard: "	xxx标准",
          medica: "xxx",
          weight: "10",
          validity: "12",
          status: "在用"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      editForm: {
        value: "",
        dialogEditDataVisible: false,
        disable: true,
        menuCag: "1",
        menuGroup: "1"
      },
      addForm: {
        value: "",
        dialogAddDataVisible: false,
        disable: true,
        menuCag: "1",
        menuGroup: "1"
      },
      dialogImageUrl: "",
      imgDialogVisible: false
    };
  },
  methods: {
    editData(v) {
      this.editForm.dialogEditDataVisible = true;
      console.log(v);
    },
    deleteData(v) {
      console.log(v);
    },
    isDisable() {
      console.log(this.editForm.disable);
    },
    addFormClose() {
      Object.assign(this.$data.addForm, this.$options.data().addForm);
      this.addForm.dialogEditDataVisible = false;
    },
    editFormClose() {
      Object.assign(this.$data.editForm, this.$options.data().editForm);
      this.editForm.dialogEditDataVisible = false;
    },
    imgRemove(file, fileList) {
      console.log(file, fileList);
    },
    imgCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgDialogVisible = true;
      console.log(this.dialogImageUrl);
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
