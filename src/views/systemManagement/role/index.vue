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
        row-key="$treeNodeId"
        border
        stripe
        size="mini"
      >
        <el-table-column prop="name" label="角色名称" align="left" />
        <el-table-column prop="code" label="角色代码" align="center" />
        <el-table-column prop="status" label="角色状态" align="center" />
        <el-table-column prop="remarks" label="备注" align="center" />
        <el-table-column prop="startDate" label="注册日期" align="center" />
        <el-table-column prop="editDate" label="修改日期" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加" :visible.sync="addForm.dialogAddDataVisible" @close="addFormClose">
      <el-form>
        <el-form-item label="角色名称" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色代码" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色状态" label-width="100px">
          <el-radio v-model="addForm.menuCag" label="1">在用</el-radio>
          <el-radio v-model="addForm.menuCag" label="2">停用</el-radio>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-tabs ref="tab" type="border-card">
          <el-tab-pane label="用户管理">
            <el-tree
              :data="routes"
              :props="treeProps"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              @check-change="(checkChange($event))"
            />
          </el-tab-pane>
          <el-tab-pane label="配置管理">...</el-tab-pane>
        </el-tabs>
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
        <el-form-item label="型号状态" label-width="100px">
          <el-radio v-model="editForm.menuCag" label="1">在用</el-radio>
          <el-radio v-model="editForm.menuCag" label="2">停用</el-radio>
        </el-form-item>
        <el-form-item label="灭火药剂" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormClose">取 消</el-button>
        <el-button type="primary" @click="editForm.dialogEditDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      routes: [],
      treeProps: {
        label: (data) => {
          return data.meta.title;
        },
        children: "children"
      },
      editForm: {
        dialogEditDataVisible: false,
        menuCag: "1"
      },
      addForm: {
        dialogAddDataVisible: false,
        menuCag: "1"
      }
    };
  },
  created() {
    this.routes = [];
    this.routes = this.$store.state.routers;
    this.routes = this.routes.slice(3);
    console.log(this.$store.state.routers);
  },
  methods: {
    editData(v) {
      this.editForm.dialogEditDataVisible = true;
      console.log(v);
    },
    deleteData(v) {
      console.log(v);
    },
    addFormClose() {
      Object.assign(this.$data.addForm, this.$options.data().addForm);
      this.addForm.dialogEditDataVisible = false;
    },
    editFormClose() {
      Object.assign(this.$data.editForm, this.$options.data().editForm);
      this.editForm.dialogEditDataVisible = false;
    },
    checkChange(v) {
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
