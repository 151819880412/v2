<template>
  <div class='sysMenu'>

    <SearchForm :formConfig="queryFormConfig" :formData="formData" ref="searchForm">
      <template v-slot:searchBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </SearchForm>

    <CETable ref="ceTable" :searchFn="sysMenuPage" @add="add">
      <template v-slot:tableBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </CETable>
    <DialogMask ref="dialogMaskRef" @dialogMaskSubmit="dialogMaskSubmit" />
  </div>
</template>
<script>
import CETable from '@/components/ElTable/CE-Table.vue';
import { sysMenuPage, sysMenuDel, sysMenuAdd, sysMenuQueryById, sysMenuEdit } from '@/api/system/sysMenu.js';
import SearchForm from '@/components/SearchForm/SearchForm.vue';
import EventBus from '@/utils/EventBus';

export default {
  name: 'sysMenu',
  props: {},
  provide() {
    return {
      Pctx: this
    };
  },
  data() {
    return {
      sysMenuPage,
      formData: {},
      queryFormConfig: {
        formRef: 'elForm',
        formModel: 'formData',
        size: 'small',
        labelPosition: 'right',
        labelWidth: 100,
        formRules: 'rules',
        gutter: 0,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false,
        fields: [
          {
            "__config__": {
              "label": "模板名称",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              "required": false,
              "layout": "colFormItem",
              "span": 12,
              "offset": 0,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "formId": 1,
              "renderKey": "11692235711646"
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入单行文本",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "menuName"
          },
          {
            "__config__": {
              "label": "状态",
              "showLabel": true,
              "labelWidth": null,
              "tag": "el-select",
              "tagIcon": "select",
              "layout": "colFormItem",
              "span": 12,
              "offset": 0,
              "required": false,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/select",
              "formId": 2,
              "renderKey": "21692235753782"
            },
            "__slot__": {
              "options": [
                {
                  "label": "禁用",
                  "value": 0
                },
                {
                  "label": "启用",
                  "value": 1
                }
              ]
            },
            "placeholder": "请选择状态",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "disabled": false,
            "filterable": false,
            "__vModel__": "state"
          }
        ]
      },
      addFormConfig: {
        formRef: 'elForm',
        formModel: 'formData',
        size: 'small',
        labelPosition: 'right',
        labelWidth: 100,
        formRules: 'rules',
        gutter: 0,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false,
        fields: [
          {
            "__config__": {
              "label": "模板名称",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              "required": true,
              "layout": "colFormItem",
              "span": 11,
              "offset": 0,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "formId": 1,
              "renderKey": "11692243371621"
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入模板名称",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "menuName"
          },
          {
            "__config__": {
              "label": "路由路径",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              "required": true,
              "layout": "colFormItem",
              "span": 11,
              "offset": 0,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "formId": 2,
              "renderKey": "21692243395436"
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入路由路径",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "routerPath"
          },
          {
            "__config__": {
              "label": "组件路径",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              "required": true,
              "layout": "colFormItem",
              "span": 11,
              "offset": 0,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "formId": 3,
              "renderKey": "31692243426876"
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入组件路径",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "componentPath"
          },
          {
            "__config__": {
              "label": "组件名",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              "required": true,
              "layout": "colFormItem",
              "span": 11,
              "offset": 0,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "formId": 4,
              "renderKey": "41692243445077"
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入组件名",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "componentName"
          },
          {
            "__config__": {
              "label": "是否全屏",
              "labelWidth": null,
              "showLabel": true,
              "tag": "el-radio-group",
              "tagIcon": "radio",
              "changeTag": true,
              "defaultValue": 0,
              "layout": "colFormItem",
              "span": 11,
              "offset": 0,
              "optionType": "default",
              "regList": [],
              "required": true,
              "border": false,
              "document": "https://element.eleme.cn/#/zh-CN/component/radio",
              "formId": 1,
              "renderKey": "11692692335486"
            },
            "__slot__": {
              "options": [
                {
                  "label": "否",
                  "value": 0
                },
                {
                  "label": "是",
                  "value": 1
                }
              ]
            },
            "style": {},
            "size": "medium",
            "disabled": false,
            "__vModel__": "fullScreen"
          },
          {
            "__config__": {
              "label": "所属父级",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              "required": false,
              "layout": "colFormItem",
              "span": 11,
              "offset": 0,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "formId": 5,
              "renderKey": "51692243468605"
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入所束父级",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "prefix-icon": "",
            "suffix-icon": "",
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": true,
            "__vModel__": "parentName"
          }
        ],
      },
    };
  },
  created() { },
  mounted() {
    this.initTable();
  },
  computed: {},
  methods: {
    /**
     * 打开新增窗口
     * @author  
     * @date 2023-08-18
     * @returns {any}
     */
    async add() {
      // this.$showDialogMask({
      //   dialogMaskProps: {
      //     width: "50%",
      //     title: "新增"
      //   },
      //   dialogMaskFormProps: this.addFormConfig,
      // });
      this.$refs.dialogMaskRef.initProps({
        dialogMaskProps: {
          width: "50%",
          title: "新增",
          axiosMethods: sysMenuAdd
        },
        dialogMaskFormProps: this.addFormConfig,
        formData: {}
      });
    },
    /**
     * 初始化表格
     * @author  
     * @date 2023-08-18
     * @returns {any}
     */
    initTable() {
      const ceTableData = {
        border: true,
        data: [],
        column: [
          {
            type: "selection",
            label: "勾选",
            fixed: null,
            ceShow: true,
          },
          {
            label: "模板名称",
            prop: "menuName",
            fixed: null,
            ceShow: true,
          }, {
            label: "状态",
            prop: "state",
            ceFormatter: "state",
            slots: {
              formatter: "",
              slotName: "a",
              slotLabel: ""
            },
            fixed: null,
            ceShow: true,
          },
          {
            label: "创建时间",
            prop: "createdTime",
            fixed: null,
            ceShow: true,
          },
          {
            label: "更新时间",
            prop: "updatedTime",
            fixed: null,
            ceShow: true,
          }, {
            type: 'operation',
            label: "操作",
            fixed: null,
            ceShow: true,
            operationBtn: [
              {
                label: "编辑",
                operationMethod: "editorTemp",
                ceShow: true,
              },
              {
                label: "删除",
                operationMethod: 'delTemp',
                ceShow: true,
              },
              {
                label: "模板配置",
                operationMethod: 'tempConfig',
                ceShow: true,
              },
              {
                label: "数据库配置",
                operationMethod: 'databaseConfig',
                ceShow: true,
              },
            ]
          }
        ]
      };
      this.$refs.ceTable.initCETable(ceTableData);
    },
    /**
     * 打开编辑弹窗
     * @author  
     * @date 2023-08-18
     * @param {any} row
     * @returns {any}
     */
    async editorTemp(row) {
      let { data } = await sysMenuQueryById(row.id);
      this.$refs.dialogMaskRef.initProps({
        dialogMaskProps: {
          width: "50%",
          title: "编辑",
          axiosMethods: sysMenuEdit
        },
        dialogMaskFormProps: this.addFormConfig,
        formData: data,
      });
    },
    /**
     * 弹窗提交事件，如果需要对参数二次处理需要传入transformData:true
     * @author  
     * @date 2023-08-18
     * @param {any} data
     * @returns {any}
     */
    dialogMaskSubmit(data) {
      console.log(data);
    },
    /**
     * 删除
     * @author  
     * @date 2023-08-18
     * @param {any} row
     * @returns {any}
     */
    async delTemp(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await sysMenuDel(row);
        EventBus.$emit('searchTableData', {});
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  watch: {},
  components: {
    CETable,
    SearchForm
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>