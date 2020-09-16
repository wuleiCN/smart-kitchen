<template>
  <div>
    <el-card>
      <el-button
        size="mini"
        round
        icon="el-icon-plus"
        style="  background-color: #03B3B2;color: #fff"
      >添 加</el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="meta.title"
        border
        size="mini"
        :tree-props="{children: 'children', hasChildren: true}"
      >
        <el-table-column prop="meta.title" label="名称" width="180" align="left" />
        <el-table-column type="index" label="序号" width="180" align="center" />
        <el-table-column prop="meta.icon" label="图标" align="center" />
        <el-table-column prop="path" label="页面地址" align="center" />
        <el-table-column prop="address" label="禁用" align="center">
          <template #default="{row: data}">{{ data.hidden ? '禁用' : '启用' }}</template>
        </el-table-column>
        <el-table-column prop="address" label="菜单类别" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-plus" type="text" @click="addData(data)">添加</el-button>
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加 -->
    <el-dialog title="增加" :visible.sync="dialogAddDataVisible" @close="addFormClose">
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="dialogAddDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogEditDataVisible" @close="editFormClose">
      <el-form ref="menuRef" :model="menuForm">
        <el-form-item label="序号" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="menuForm.meta.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="代码" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标" label-width="100px">
          <el-select v-model="menuForm.meta.icon" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="网页地址" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="禁用" label-width="100px">
          <el-switch
            v-model="menuForm.hidden"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-text="menuForm.hidden ? '是' : '否'"
            @change="isDisable"
          />
        </el-form-item>
        <el-form-item label="菜单类别" label-width="100px">
          <el-radio v-model="menuForm.meta.menuCatatory" :label="1">菜单项</el-radio>
          <el-radio v-model="menuForm.meta.menuCatatory" :label="2">按钮</el-radio>
          <el-radio v-model="menuForm.meta.menuCatatory" :label="3">功能组</el-radio>
        </el-form-item>
        <el-form-item label="菜单分组" label-width="100px">
          <el-radio v-model="menuForm.meta.menuGroup" :label="10">超级Web后台</el-radio>
          <el-radio v-model="menuForm.meta.menuGroup" :label="20">公司Web后台</el-radio>
          <el-radio v-model="menuForm.meta.menuGroup" :label="30">客户Web后台</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      menuForm: {
        meta: {}
      },
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
      value: "",
      dialogAddDataVisible: false,
      dialogEditDataVisible: false
    };
  },
  created() {
    let routes = this.$store.state.routers;
    routes = routes.slice(2);
    this.tableData = routes;
  },
  methods: {
    addData(v) {
      this.dialogAddDataVisible = true;
      console.log(v);
    },
    editData(v) {
      this.menuForm = v
      this.dialogEditDataVisible = true;
      console.log(v);
    },
    deleteData(v) {
      console.log(v);
    },
    isDisable() {},
    addFormClose() {
      this.dialogAddDataVisible = false;
    },
    editFormClose() {
      this.dialogEditDataVisible = false;
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
  height: 516px;
  .el-dialog__header {
    padding: 20px 20px;
    background: #eee;
  }
  .el-dialog__body {
    padding: 0 20px;
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
