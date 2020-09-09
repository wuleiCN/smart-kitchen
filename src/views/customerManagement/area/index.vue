<template>
  <div>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户名称" label-width="110px">
              <el-select
                v-model="value"
                filterable
                placeholder="请选择"
                @focus="getCustomerAll"
                @change="selectArea"
              >
                <el-option
                  v-for="item in customerOptions"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="info"
              size="small"
              icon="el-icon-refresh"
              style="margin-left: 10px;"
            >刷 新</el-button>
            <el-button
              type="success"
              size="small"
              icon="el-icon-plus"
              style="margin-left: 10px;"
              @click="addArea"
            >添 加</el-button>
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
        <el-table-column prop="Name" label="区域名称" align="left" />
        <el-table-column prop="Id" label="备注" align="center" />
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
      <el-form ref="areaRef" :model="areaForm" :rules="rules">
        <el-form-item label="区域名称" label-width="100px" prop="Name">
          <el-input v-model="areaForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" label-width="100px" prop="Id">
          <el-input v-model="areaForm.Id" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="dialogAddDataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogEditDataVisible" @close="editFormClose">
      <el-form ref="areaRef" :model="areaForm" :rules="rules">
        <el-form-item label="区域名称" label-width="100px" prop="Name">
          <el-input v-model="areaForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" label-width="100px" prop="Id">
          <el-input v-model="areaForm.Id" autocomplete="off" />
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
import Pagination from "@/components/Pagination";
import { getList } from "@/api/customer/maintain.js";
import { getCustomers } from "@/api/customer/area.js";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      customerOptions: [],
      value: "",
      tableData: [],
      areaForm: {},
      dialogAddDataVisible: false,
      dialogEditDataVisible: false,
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      rules: {
        Name: [
          { required: true, message: "请输入名称!", trigger: "blur" },
          {
            min: 2,
            max: 22,
            message: "长度在 2 到 22 个字符",
            trigger: "blur"
          }
        ],
        Id: [
          { required: true, message: "请输入内容!", trigger: "blur" },
          {
            min: 2,
            message: "长度在2个字符以上",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async getCustomerAll() {
      const data = await getList();
      if (data.status === 200) this.customerOptions = data.data;
    },
    async selectArea(val) {
      const data = await getCustomers(val);
      if (data.status === 200) this.tableData = data.data;
      console.log(data);
    },
    // 分页
    pagination() {
      console.log(this.page);
    },
    dialogVisibleInputCancel() {
      this.$refs.rejectionBasiRef.resetFields();
      this.$refs.rejectionStroRef.resetFields();
      this.strongWarning.number = "";
      this.rejectionDialog.isInputDialogVisible = false;
    },
    addArea() {
      this.dialogAddDataVisible = true;
    },
    addFormClose() {
      this.$refs.areaRef.resetFields();
      this.dialogAddDataVisible = false;
    },
    editData(v) {
      this.areaForm = v
      this.dialogEditDataVisible = true;
      console.log(v);
    },
    editFormClose() {
      this.$refs.areaRef.resetFields();
      this.dialogEditDataVisible = false;
    },
    deleteData(v) {
      console.log(v);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card:nth-child(1) {
  margin: 20px;
  .el-card__body {
    padding: 20px 20px 0;
    .el-col-8 {
      height: 50px;
    }
    .el-form-item {
      width: 100%;
      .el-form-item__label {
        height: 34px;
        line-height: 34px;
      }
      .el-form-item__content {
        width: 200px;
        height: 34px;
        line-height: 34px;
        margin-left: 110px;
        .el-input,
        .el-input__inner {
          height: 34px;
          line-height: 34px;
          margin: 0;
        }
        .el-date-editor {
          height: 34px;
          line-height: 34px;
          width: 243px;
          span {
            margin-bottom: 7px;
          }
          .el-range__icon {
            line-height: 27px;
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
  width: 40%;
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__footer {
    padding: 0 20px 20px;
  }
}
</style>
