<template>
  <div>

    <el-form :model="ceFormData" :rules="ceRules" ref="CEFormRef" style="padding: 40px">
      <el-col v-for="item in ceFormItems" :key="item.ceId" v-bind="item">
        <el-form-item v-if="item.ceShow" v-bind="transformProps(item)">
          <component :is="item.component" v-model="ceFormData[item.prop]" v-bind="item" v-on="item"
            :update:modelvalue="updateModelvalue(item)">

            <!-- <div v-for="item2 in item.slots" :key="item2.ceId">
              <div v-if="item2.component">
                <div v-if="['el-radio-group', 'el-checkbox-group',].includes(item.component)">
                  <component v-for="item3 in item2.options" :key="item3.ceId" :is="item2.component"
                    v-bind="{ ...item2, ...item3 }" :label="item3.value">{{ item3.showLabel || item3.label }}</component>
                </div>
                <div v-else>
                  <component v-for="item3 in item2.options" :key="item3.ceId" :is="item3.component || item2.component"
                    v-bind="{ ...item2, ...item3 }">{{ item3.showLabel || item3.label }}</component>
                </div>
              </div>
            </div> -->

            <template v-for="item3 in item.slots" v-slot:[item3.slotName]="slotProp">
              <span :key="item3.ceId">{{ slotProp?.data?.label }}</span>
              <div v-html="item3.slotHtml" :key="item3.ceId"></div>
              <div v-if="item3.component" :key="item3.ceId">
                <!-- 单选框和多选框的label和value是反的 -->
                <div v-if="['el-radio-group', 'el-checkbox-group',].includes(item.component)">
                  <component v-for="item2 in item3.options" :key="item2.ceId" :is="item3.component"
                    v-bind="{ ...item3, ...item2 }" :label="item2.value">{{ item2.showLabel || item2.label }}</component>
                </div>
                <div v-else>
                  <component v-for="item2 in item3.options" :key="item2.ceId" :is="item2.component || item3.component"
                    v-bind="{ ...item3, ...item2 }">{{ item2.showLabel || item2.label }}</component>
                </div>
              </div>
            </template>

          </component>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "CE-Form",
  data() {
    return {
      ceFormData: {
        radioGroup: [],
        checkboxGroup:[]
      },
      returnFormData: {},
      ceFormItems: [],
      ceRules: {},
    };
  },
  methods: {
    initCEForm(data = []) {
      const arr = _.cloneDeep(data);
      arr.forEach((item) => {
        if (item.modelValue) {
          this.ceFormData[item.prop] = item.modelValue;
        }
        if (item.rules) {
          this.ceRules[item.prop] = item.rules;
        }
      });
      this.ceFormItems = arr;
    },
    getCEFormData() {
      return _.cloneDeep(this.ceFormData);
    },
    submit() {
      return new Promise((res) => {
        this.$refs.CEFormRef.validate((valid) => {
          if (valid) {
            this.returnFormData = _.cloneDeep(this.ceFormData);
            res(this.returnFormData);
          }
        });
      });
    },
    resetCEForm() {
      this.$refs.CEFormRef.resetFields();
    },
    validateField(field) {
      this.$refs.CEFormRef.validateField(field);
    },
    transformProps(element) {
      const row = _.cloneDeep(element);
      if (!row.showLabel) {
        row.labelWidth = '0';
        row.label = "";
      }
      return row;
    },
    updateModelvalue(row) {
      row;
      // this.dragComponentList[this.aciveIndex].defaultValue = row.modelValue
    },
  },
  props: {
    data: Array, // 假设这里有个data属性，用来接收传入的CEtypes数组
  },
  mounted() {
    // this.initCEForm(this.data); // 在mounted钩子中初始化表单
  },
};
</script>
<style lang="stylus" scoped>
/deep/.el-select{
  width: 100%
}
</style>
