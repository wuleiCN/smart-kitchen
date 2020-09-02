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
        row-key="id"
        border
        size="mini"
        :tree-props="{children: 'children', hasChildren: true}"
      >
        <el-table-column prop="date" label="日期" width="180" align="left" />
        <el-table-column prop="name" label="姓名" width="180" align="center" />
        <el-table-column prop="address" label="地址" align="center" />
        <el-table-column #default="{row: data}" label="操作" align="center">
          <el-button size="mini" icon="el-icon-plus" type="text" @click="addData(data)">添加</el-button>
          <el-button size="mini" icon="el-icon-edit" type="text" @click="editData(data)">修改</el-button>
          <el-button size="mini" icon="el-icon-delete" type="text" @click="deleteData(data)">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="增加" :visible.sync="addForm.dialogAddDataVisible" @close="addFormClose">
      <el-form>
        <el-form-item label="序号" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="代码" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标" label-width="100px">
          <el-select v-model="addForm.value" placeholder="请选择">
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
            v-model="addForm.disable"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-text="addForm.disable ? '是' : '否'"
            @change="isDisable"
          />
        </el-form-item>
        <el-form-item label="菜单类别" label-width="100px">
          <el-radio v-model="addForm.menuCag" label="1">备选项</el-radio>
          <el-radio v-model="addForm.menuCag" label="2">备选项</el-radio>
          <el-radio v-model="addForm.menuCag" label="3">备选项</el-radio>
        </el-form-item>
        <el-form-item label="菜单分组" label-width="100px">
          <el-radio v-model="addForm.menuGroup" label="1">备选项</el-radio>
          <el-radio v-model="addForm.menuGroup" label="2">备选项</el-radio>
          <el-radio v-model="addForm.menuGroup" label="3">备选项</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addForm.dialogAddDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="editForm.dialogEditDataVisible" @close="editFormClose">
      <el-form>
        <el-form-item label="序号" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="代码" label-width="100px">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标" label-width="100px">
          <el-select v-model="editForm.value" placeholder="请选择">
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
            v-model="editForm.disable"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-text="editForm.disable ? '是' : '否'"
            @change="isDisable"
          />
        </el-form-item>
        <el-form-item label="菜单类别" label-width="100px">
          <el-radio v-model="editForm.menuCag" label="1">备选项</el-radio>
          <el-radio v-model="editForm.menuCag" label="2">备选项</el-radio>
          <el-radio v-model="editForm.menuCag" label="3">备选项</el-radio>
        </el-form-item>
        <el-form-item label="菜单分组" label-width="100px">
          <el-radio v-model="editForm.menuGroup" label="1">备选项</el-radio>
          <el-radio v-model="editForm.menuGroup" label="2">备选项</el-radio>
          <el-radio v-model="editForm.menuGroup" label="3">备选项</el-radio>
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
      tableData: [
        {
          id: 2,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 21,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 22,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 41,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 42,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 5,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 51,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 52,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
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
      addForm: {
        value: "",
        dialogAddDataVisible: false,
        disable: true,
        menuCag: "1",
        menuGroup: "1"
      },
      editForm: {
        value: "",
        dialogEditDataVisible: false,
        disable: true,
        menuCag: "1",
        menuGroup: "1"
      }
    };
  },
  methods: {
    addData(v) {
      this.addForm.dialogAddDataVisible = true;
      console.log(v);
    },
    editData(v) {
      this.editForm.dialogEditDataVisible = true;
      console.log(v);
    },
    deleteData(v) {
      console.log(v);
    },
    isDisable() {
      console.log(this.addForm.disable);
    },
    addFormClose() {
      Object.assign(this.$data.addForm, this.$options.data().addForm);
      this.addForm.dialogAddDataVisible = false;
    },
    editFormClose() {
      Object.assign(this.$data.editForm, this.$options.data().editForm);
      this.editForm.dialogEditDataVisible = false;
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
