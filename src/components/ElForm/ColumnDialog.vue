<template>
  <div class='ColumnDialog'>
    <el-dialog v-bind="$attrs" :close-on-click-modal="false" :modal-append-to-body="false" v-on="$listeners"
      @open="onOpen" @close="onClose">
      <el-row>

        <el-collapse v-model="activeNames" v-for="(item, index) in tableData" :key="item.id">
          <el-collapse-item :title="'第' + (index + 1) + '列'" :name="index">
            <el-form :model="tableColumnForm" ref="tableColumnForm" label-width="100px" class="demo-dynamic">
              <el-form-item prop="type" label="类型">
                <el-select placeholder="请选择类型" v-model="item.__config__.type" clearable>
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="label" label="标题">
                <el-input v-model="item.label" clearable></el-input>
              </el-form-item>
              <el-form-item prop="prop" label="字段名">
                <el-input v-model="item.prop" clearable></el-input>
              </el-form-item>
              <el-form-item prop="format" label="格式化">
                <el-input v-model="item.__config__.format" clearable></el-input>
              </el-form-item>
              <el-form-item prop="sortable" label="是否排序">
                <el-switch v-model="item.__config__.sortable" active-color="#13ce66" inactive-color="#ff4949" clearable></el-switch>
              </el-form-item>
              <el-form-item prop="fixed" label="固定列">
                <el-select placeholder="请选择固定列" v-model="item.__config__.fixed" clearable>
                  <el-option v-for="item in fixedOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="fixed" label="按钮">
                <el-input v-model="tableColumnForm.email" clearable></el-input>
              </el-form-item>
            </el-form>

          </el-collapse-item>
        </el-collapse>

      </el-row>
      <div slot="footer">
        <el-button type="primary" @click="addColumn">
          添加列
        </el-button>
        <el-button type="primary" @click="handelConfirm">
          确定
        </el-button>
        <el-button @click="close">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ColumnDialog',
  inheritAttrs: false,
  props: ['tableData'],
  data() {
    return {
      typeOptions: [
        {
          label: "index",
          value: "index"
        },
        {
          label: "selection",
          value: "selection"
        },
        {
          label: "expand",
          value: "expand"
        },
        {
          label: "slot",
          value: "slot"
        },
      ],
      fixedOptions: [
        {
          label: "left",
          value: "left"
        },
        {
          label: "right",
          value: "right"
        }
      ],
      activeNames: "1",
      tableColumnForm: {}
    };
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {
    onOpen() {
      this.formData = {
        label: undefined,
        value: undefined
      };
    },
    onClose() { },
    close() {
      this.$emit('update:visible', false);
    },
    addColumn() {
      this.tableData.push({
        __config__: {
          layout: 'raw',
          tag: 'el-table-column',
          renderKey: +new Date()
        },
        prop: 'date',
        label: '日期'
      });
      this.$emit('updateTableData', this.tableData);
    },
    handelConfirm() {
      console.log(this, this.tableData);
      this.$emit('updateTableData', this.tableData);
      // this.$refs.elForm.validate(valid => {
      //   if (!valid) return
      //   if (this.dataType === 'number') {
      //     this.formData.value = parseFloat(this.formData.value)
      //   }
      //   this.formData.id = this.id++
      //   this.$emit('commit', this.formData)
      //   this.close()
      // })
    }
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>