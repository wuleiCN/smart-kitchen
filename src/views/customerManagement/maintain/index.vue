<template>
  <div>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称" label-width="110px">
              <el-input autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册日期" label-width="110px">
              <el-date-picker
                v-model="dateValue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="val"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button
              type="success"
              size="small"
              icon="el-icon-search"
              style="margin-left: 10px;"
              @click="get"
            >查 询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        fit
        border
        size="mini"
      >
        <el-table-column prop="Name" label="客户名称" align="left" />
        <el-table-column prop="FullAddress" label="详细地址" align="center" />
        <el-table-column prop="Master" label="法人代表" align="center" />
        <el-table-column prop="MasterPhone" label="联系电话" align="center" />
        <el-table-column prop="Contact" label="联系人" align="center" />
        <el-table-column prop="ContactPhone" label="联系电话" align="center" />
        <el-table-column prop="Admin" label="系统管理员" align="center" />
        <el-table-column prop="AdminPhone" label="联系电话" align="center" />
        <el-table-column prop="RegistOn" label="注册日期" align="center" />
        <!-- <el-table-column prop="StatusName" label="状态" align="center" /> -->
        <el-table-column #default="{row: data}" label="操作" width="160" align="center">
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
    <el-dialog
      title="修改"
      :visible.sync="dialogEditForm.dialogEditDataVisible"
      @close="dialogEditFormClose"
    >
      <el-form ref="formRule" :model="editForm" :rules="rules">
        <el-form-item label="客户名称" label-width="100px" prop="Name">
          <el-input v-model="editForm.Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="省/市/县" label-width="100px">
          <el-cascader
            v-model="value"
            placeholder="搜索："
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            filterable
            clearable
            @change="cascaderHandle"
          />
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px" prop="Address">
          <el-input v-model="editForm.Address" autocomplete="off" />
        </el-form-item>
        <el-tabs ref="tab" type="border-card">
          <el-tab-pane label="银行信息">
            <el-form-item label="统一社会信息码" label-width="120px">
              <el-input v-model="editForm.CreditNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="开户银行" label-width="120px">
              <el-input v-model="editForm.Bank" autocomplete="off" />
            </el-form-item>
            <el-form-item label="银行账号" label-width="120px">
              <el-input v-model="editForm.Account" autocomplete="off" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="人员信息">
            <!-- <el-form> -->
            <el-row :gutter="10">
              <el-col :span="13">
                <el-form-item label="法人代表" label-width="100px">
                  <el-input v-model="editForm.Master" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系电话" label-width="80px">
                  <el-input v-model="editForm.MasterPhone" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="电子邮箱" label-width="100px">
                  <el-input v-model="editForm.MasterEmail" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="13">
                <el-form-item label="联系人" label-width="100px">
                  <el-input v-model="editForm.Master" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系电话" label-width="80px">
                  <el-input v-model="editForm.MasterPhone" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="电子邮箱" label-width="100px">
                  <el-input v-model="editForm.MasterEmail" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="13">
                <el-form-item label="系统管理员" label-width="100px" prop="Admin">
                  <el-input v-model="editForm.Admin" autocomplete="off" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="联系电话" label-width="80px" prop="AdminPhone">
                  <el-input v-model="editForm.AdminPhone" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="电子邮箱" label-width="100px">
                  <el-input v-model="editForm.AdminEmail" autocomplete="off" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditFormEnter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Batch from "@/views/deviceManagement/FF/Batch";
import Pagination from "@/components/Pagination";
import { getList } from "@/api/customer/maintain.js";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dateValue: [],
      tableData: [],
      // 省市区数据
      options: regionData,
      page: {
        pageNo: 1,
        resultSize: 10,
        total: 0
      },
      loading: true,
      dialogEditForm: {
        dialogEditDataVisible: false
      },
      value: [],
      editForm: {},
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
        Address: [
          { required: true, message: "请输入详细地址!", trigger: "blur" },
          {
            min: 2,
            message: "长度在2个字符以上",
            trigger: "blur"
          }
        ],
        Admin: [
          {
            required: true,
            message: "请输入系统管理员名称！",
            trigger: "blur"
          },
          {
            min: 2,
            message: "长度在2个字符以上",
            trigger: "blur"
          }
        ],
        AdminPhone: [
          { required: true, message: "请输入联系电话！", trigger: "blur" },
          {
            min: 2,
            message: "长度在2个字符以上",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getListInfo();
  },
  methods: {
    async getListInfo() {
      const data = await getList();
      if (data.status === 200) {
        this.tableData = data.data;
        this.loading = false;
      } else {
        setTimeout(() => this.$message.error(data.message), 5000);
      }
      console.log(data);
    },
    // 分页
    pagination() {
      console.log(this.page);
    },
    val(v) {
      console.log(v);
    },
    get() {
      console.log(Batch);
    },
    editData(v) {
      this.editForm = v;
      this.dialogEditForm.dialogEditDataVisible = true;
      console.log(this.editForm);
    },
    deleteData(v) {
      console.log(v);
    },
    dialogEditFormClose() {
      this.editForm = {};
      this.$refs.formRule.resetFields()
      this.dialogEditForm.dialogEditDataVisible = false;
    },
    dialogEditFormEnter() {
      this.$refs.formRule.validate((valid) => {
        if (valid) {
          this.editForm = {};
          this.dialogEditForm.dialogEditDataVisible = false;
        }
      });
    },
    cascaderHandle(v) {
      this.editForm.Province = CodeToText[v[0]];
      this.editForm.City = CodeToText[v[1]];
      this.editForm.Country = CodeToText[v[2]];
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
      width: 90%;
      .el-form-item__label {
        height: 34px;
        line-height: 34px;
      }
      .el-form-item__content {
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
  .el-dialog__header {
    padding: 20px 20px 0;
  }
  .el-dialog__body {
    padding: 15px 20px;
    .el-cascader {
      width: 100%;
    }
  }
}
</style>
