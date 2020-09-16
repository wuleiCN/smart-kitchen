<template>
  <div>
    <el-card>
      <el-button
        size="mini"
        round
        icon="el-icon-plus"
        style="  background-color: #03B3B2;color: #fff"
        @click="dialogAddDataVisible = true"
      >账号注册</el-button>
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
        <el-table-column prop="Name" label="姓名" align="left" />
        <el-table-column prop="LogonName" label="账号" align="center" />
        <el-table-column prop="Phone" label="联系电话" align="center" />
        <el-table-column prop="Email" label="电子邮箱" align="center" />
        <el-table-column prop="StatusName" label="用户状态" align="center" />
        <el-table-column prop="Comment" label="备注" align="center" />
        <el-table-column prop="RegistOn" label="注册日期" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加" :visible.sync="dialogAddDataVisible" @close="addFormClose">
      <el-form :model="userInfoForm">
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="userInfoForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="userInfoForm.LogonName" autocomplete="off" />
        </el-form-item>
        <el-form-item type="number" label="联系电话" label-width="100px">
          <el-input v-model="userInfoForm.Phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="100px">
          <el-input v-model="userInfoForm.Email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户状态" type="password" label-width="100px">
          <el-input v-model="userInfoForm.StatusName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" type="password" label-width="100px">
          <el-input v-model="userInfoForm.Comment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="注册日期" type="password" label-width="100px">
          <el-input v-model="userInfoForm.RegistOn" autocomplete="off" />
        </el-form-item>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :show-file-list="false"
          :on-preview="imgCardPreview"
          :on-remove="imgRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-tabs ref="tab" type="border-card">
          <el-tab-pane label="用户管理">
            <el-table :data="userData" style="width: 100%;margin-bottom: 20px;" border size="mini">
              <el-table-column type="selection" width="47" />
              <el-table-column prop="date" label="日期" width="280" align="left" />
              <el-table-column prop="name" label="姓名" width="200" align="center" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="配置管理">
            <el-form>
              <el-form-item label="电子邮箱" label-width="100px">
                <el-input type="email" autocomplete="off" />
              </el-form-item>
              <el-form-item label="密码策略" label-width="100px">
                <el-radio v-model="menuCag" label="1">密码永不过期</el-radio>
                <el-radio v-model="menuCag" label="2">下次登录修改密码</el-radio>
                <el-radio v-model="menuCag" label="3">密码30天后过期</el-radio>
                <el-radio v-model="menuCag" label="4">密码60天后过期</el-radio>
                <el-radio v-model="menuCag" label="5">密码90天后过期</el-radio>
                <el-radio v-model="menuCag" label="6">密码180天后过期</el-radio>
              </el-form-item>
              <el-form-item label="备注" label-width="100px">
                <el-input autocomplete="off" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogEditDataVisible" @close="editFormClose">
      <el-form :model="userInfoForm">
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="userInfoForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="userInfoForm.LogonName" autocomplete="off" />
        </el-form-item>
        <el-form-item type="number" label="联系电话" label-width="100px">
          <el-input v-model="userInfoForm.Phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电子邮箱" label-width="100px">
          <el-input v-model="userInfoForm.Email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户状态" type="password" label-width="100px">
          <el-input v-model="userInfoForm.StatusName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" type="password" label-width="100px">
          <el-input v-model="userInfoForm.Comment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="注册日期" type="password" label-width="100px">
          <el-input v-model="userInfoForm.RegistOn" autocomplete="off" />
        </el-form-item>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :show-file-list="false"
          :on-preview="imgCardPreview"
          :on-remove="imgRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-tabs ref="tab" type="border-card">
          <el-tab-pane label="用户管理">
            <el-table :data="userData" style="width: 100%;margin-bottom: 20px;" border size="mini">
              <el-table-column type="selection" width="47" />
              <el-table-column prop="date" label="日期" width="280" align="left" />
              <el-table-column prop="name" label="姓名" width="200" align="center" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="配置管理">
            <el-form>
              <el-form-item label="电子邮箱" label-width="100px">
                <el-input type="email" autocomplete="off" />
              </el-form-item>
              <el-form-item label="密码策略" label-width="100px">
                <el-radio v-model="menuCag" label="1">密码永不过期</el-radio>
                <el-radio v-model="menuCag" label="2">下次登录修改密码</el-radio>
                <el-radio v-model="menuCag" label="3">密码30天后过期</el-radio>
                <el-radio v-model="menuCag" label="4">密码60天后过期</el-radio>
                <el-radio v-model="menuCag" label="5">密码90天后过期</el-radio>
                <el-radio v-model="menuCag" label="6">密码180天后过期</el-radio>
              </el-form-item>
              <el-form-item label="备注" label-width="100px">
                <el-input autocomplete="off" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogImgVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      userData: [
        {
          id: 2,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ],
      userInfoForm: {},
      dialogEditDataVisible: false,
      menuCag: "1",
      dialogAddDataVisible: false,
      dialogImgVisible: false,
      dialogImageUrl: ""
    };
  },
  created() {
    this.tableData.push(this.$store.state.userInfo);
  },
  methods: {
    editData(v) {
      this.dialogEditDataVisible = true;
      this.userInfoForm = v;
      console.log(v);
    },
    deleteData(v) {
      console.log(v);
    },
    addFormClose() {
      Object.assign(this.$data.userInfoForm, this.$options.data().userInfoForm);
      this.dialogEditDataVisible = false;
    },
    editFormClose() {
      Object.assign(this.$data.userInfoForm, this.$options.data().userInfoForm);
      this.dialogEditDataVisible = false;
    },
    imgRemove(file, fileList) {
      console.log(file, fileList);
    },
    imgCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImgVisible = true;
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
    padding: 15px 20px;
    .el-form-item {
      margin-bottom: 15px;
      .el-form-item__label {
        line-height: 34px;
      }
      .el-form-item__content {
        margin-left: 120px;
        height: 34px;
        line-height: 34px;
        .el-input,
        .el-input__inner {
          width: 240px;
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
    .el-tabs .el-form-item:nth-child(2) .el-form-item__content {
      width: 220px;
      height: 198px;
    }
    .el-upload {
      position: absolute;
      top: 82px;
      right: 50px;
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
