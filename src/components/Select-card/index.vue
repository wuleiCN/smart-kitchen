
<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="设备编码" label-width="80px">
              <el-input v-model="select.Code" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="安装区域" label-width="96px">
              <el-select v-model="select.AreaId" filterable placeholder="请选择">
                <el-option
                  v-for="item in areas"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备名称" label-width="80px">
              <el-input v-model="select.Name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="型号名称" label-width="80px">
              <el-select v-model="select.Models" filterable placeholder="请选择">
                <el-option
                  v-for="item in devicesModel"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                />
              </el-select>
              <!-- <Select :url="deviceModel" :foo.sync="updataType" /> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="状态" label-width="80px">
              <Select :url="deviceStatus" :foo.sync="select.Statuses" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册日期" label-width="90px">
              <el-date-picker
                v-model="select.RegistOn"
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
          <el-col :span="5">
            <el-button
              type="info"
              size="small"
              icon="el-icon-search"
              style="margin-left: 30px;"
              @click="getDevicesByQueryList"
            >查 询</el-button>
            <el-button type="success" size="small" icon="el-icon-plus" @click="$emit('registOn')">设备注册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getDeviceModels,
  GetAreas
} from "@/api/device/select.js"
import Select from "@/components/InferFace"
export default {
  name: "Selection",
  components: {
    Select
  },
  props: {
    types: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      pickerOptions: {
        // 日期条件
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end])
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
      devicesModel: "",
      deviceModel: "getDeviceModels",
      deviceStatus: "getDeviceStatus",
      areas: "",
      // 查询条件参数
      select: {
        CompanyId: "4DEE5709-6096-40C7-9D0C-793E391D57B9",
        CustomerId: "",
        AreaId: "",
        Code: "",
        Name: "",
        Models: "",
        Statuses: "",
        Types: "",
        RegistOn: []
      }
    };
  },
  created() {
    this.getAreasInfo();
    this.getDeviceModelList()
  },
  methods: {
    // 设备型号信息
    async getDeviceModelList() {
      try {
        const { data: res } = await getDeviceModels()
        if (this.types === -1) this.devicesModel = res
        else this.devicesModel = res.filter(v => v.Type === this.types)
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    // 设备安装区域信息
    async getAreasInfo() {
      try {
        const { data: res } = await GetAreas()
        this.areas = res
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    getDevicesByQueryList() {
      this.$emit("selection", this.select)
    },
    val(v) {
      console.log(v);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  margin: 20px;
  .el-dialog__header {
    background: #f5f5f5;
  }
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
        margin-left: 80px;
        width: 86%;
        .el-input,
        .el-input__inner {
          width: 210px;
          height: 34px;
          line-height: 34px;
          margin: 0;
          // width: 139%;
          transform: translateX(-4px);
          .el-input__icon {
            line-height: 35px;
          }
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
</style>
