<template>
  <div>
    <div>关键词</div>
    <div v-for="(e, i) in arr" :key="i">
      <div v-show="true" :ref="'text' + i">
        <span>{{ e + "  =======>  " }}</span><button @click="edit(i)">编辑</button><button @click="del(i)">删除</button>
      </div>
      <div v-show="false" :ref="'show' + i">
        <span><input :ref="'_input' + i" type="text" :value="e" /></span><button @click="_updata(i)">保存</button><button @click="dele(i)">删除</button>
      </div>
    </div>
    <div v-for="(v, i) in arr2" :key="i">
      <div>
        <span><input :ref="'input' + i" type="text" /></span><button @click="updata(i)">保存</button><button @click="delet(i)">删除</button>
      </div>
    </div>
    <div>
      <button @click="addKey">添加关键词</button>
    </div>
    <div style="border: 1px dashed #d9d9d9;width: 120px;height: 120px;" @click="addImg">
      <img :src="img" />
    </div>
    <el-dialog title="添加" :visible.sync="dialogDeleteDataVisible" @close="deleteFormClose">
      <span><img :src="imgs" :class="{ borders: isTrue }" @click="set" /></span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteFormClose">取 消</el-button>
        <el-button type="primary" @click="deleteFormEnter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PublicAccountManagement",
  props: {},
  data() {
    return {
      imgsrc: "",
      imgs: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1552510568,2043259693&fm=15&gp=0.jpg",
      img: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAAB3RJTUUH4gQDDyki6heANQAAAkxJREFUeNrt3b2t4kAUQOE7sAgCREIM1PAacA1ug4huoAWKIIGIHBGRQAA1GPEzG71oBZlt6ez5JCIseexjBoE0dso55xBWp+0BqF4GhjMwnIHhDAxnYDgDwxkYzsBwBoYzMJyB4QwMZ2A4A8MZGM7AcAaGMzCcgeEMDGdgOAPDGRjuT9sDqMNut4vD4RCdzr/Xb845RqNRlGUZw+Gw7aHWDhl4vV7HarX6+P50Oo2iKP6LwE7RcAaGMzCcgeEMDGdgOAPDGRjOwHAGhjMwnIHhDAxnYDgDwxkYzsBwBoYzMJyB4QwMZ2A4A8MZGM7AcAaGMzCcgeFqXXx2Op3ier1GSqmxA0opxe12+7rN/X6P/X4f5/M5mnqqUM45BoNB/Pz8RL/fb+581PncpMViEcvlMnq9XmMHFBHxeDzi+Xx+PuiUot/vN3rhvd/vmM1msdlsYjKZNLbfWj/Bvyf628luQ845qqpqfL9VVTU2Y/zyOxjOwHAGhjMwnIHhDAxX68+koiji9XpFt9tt7IBSSrHdbuN4PH7cZjgcRlmWMRqNGv2jYzweN39nnww0n89zRHx8TafTfLlc2h5mI5yi4QwMZ2A4A8MZGM7AcAaGMzCcgeEMDGdgOAPDGRjOwHAGhjMwnIHhDAxnYDgDwxkYzsBwBoYzMJyB4QwMZ2A4A8PVurqwLd9WNea2Vvm1pNbbKKl9TtFwBoYzMJyB4QwMZ2A4A8MZGM7AcAaGMzCcgeEMDGdgOAPDGRjOwHAGhjMwnIHhDAxnYDgDwxkY7i+SOzDV/czcmQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNC0wM1QxNTo0MTozNCswODowMGPVgRkAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDQtMDNUMTU6NDE6MzQrMDg6MDASiDmlAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOS0xMCBRMTYgeDg2XzY0IDIwMTYtMTEtMjUgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmdvqN+SAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAzODMtxaTsAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADQxOYpssGMAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAD3RFWHRUaHVtYjo6U2l6ZQAwQkKUoj7sAAAAEnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly/Bd4vPAAAAAElFTkSuQmCC",
      isTrue: false,
      dialogDeleteDataVisible: false,
      input: "",
      arr: [],
      arr2: [],
      // 微信公众号
      showRightFlag: true,
      menu: {
      // // 一级菜单
        button: []
      },
      isActive: -1,
      isSubMenuActive: -1,
      isSubMenuFlag: -1,
      tempObj: {},
      tempSelfObj: {},
      visible2: false,
      tableData: []
    }
  },
  computed: {
    menuKeyLength: () => {
      return this.menu.button.length;
    }
  },
  mounted() {
    // this.httpGetData();
    this.mockMediaFun();
    this.mockMenuFun();
  },
  methods: {
    addImg() {
      this.dialogDeleteDataVisible = true
    },
    deleteFormClose() {
      this.dialogDeleteDataVisible = false
      this.isTrue = false
    },
    set() {
      this.isTrue = true
      this.imgsrc = this.imgs
    },
    deleteFormEnter() {
      this.img = this.imgs
      this.dialogDeleteDataVisible = false
      this.isTrue = false
    },
    addKey() {
      var i = Math.random()
      this.arr2.push(i)
      console.log(this.arr2);
    },
    del(i) {
      this.arr.splice(i, 1)
    },
    dele(i) {
      this.arr.splice(i, 1)
    },
    delet(i) {
      this.arr2.splice(i, 1)
      console.log(i, this.arr2);
    },
    add() {},
    edit(i) {
      this.$refs["show" + i][0].style.display = "block"
      this.$refs["text" + i][0].style.display = "none"
      console.log(this.$refs["show" + i][0].style);
    },
    _updata(i) {
      const val = this.$refs["_input" + i][0].value
      this.arr.splice(i, 1, val)
      this.$refs["show" + i][0].style.display = "none"
      this.$refs["text" + i][0].style.display = "block"
    },
    updata(i) {
      const val = this.$refs["input" + i][0].value
      this.arr.push(val)
      this.arr2.splice(i, 1)
      // this.$refs["_show" + i].style.display = "none"
      console.log(val, i);
    }
  }
}
</script>

<style lang="scss" scoped>
.borders {
  border: 1px solid #409eff
}
</style>
