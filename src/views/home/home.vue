<template>
  <div class='home'>
    <Theme />
    <parser :form-conf="coonf" @submit="sumbitForm1" ref="parser" :form-datas="formDatas">
      <template #namedSlotName="slotProp">
        <!-- <span >具名插槽的内容</span> -->
        <el-input v-model="formDatas.field24"></el-input>
      </template>
    </parser>
  </div>
</template>
<script>
import Theme from '@/components/Theme/theme.vue';
export default {
  name: 'home',
  props: {},
  data() {
    return {
      formDatas: { field8: '', field24: "", },
      coonf: {
        fields: [
          {
            "__config__": {
              "label": "多选框组",
              "tag": "el-checkbox-group",
              "tagIcon": "checkbox",
              "defaultValue": [],
              "value": [],
              "span": 24,
              "offset": 0,
              "showLabel": true,
              "labelWidth": null,
              "layout": "colFormItem",
              "optionType": "default",
              "required": true,
              "regList": [],
              "changeTag": true,
              "border": false,
              "document": "https://element.eleme.cn/#/zh-CN/component/checkbox",
              "formId": 15,
              "renderKey": "151693473527151"
            },
            "__slot__": {
              "options": [
                {
                  "label": "选项一",
                  "value": 1
                },
                {
                  "label": "选项二",
                  "value": 2
                }
              ]
            },
            "style": {},
            "size": "medium",
            "disabled": false,
            "__vModel__": "field15"
          },
          {
            "__config__": {
              "label": "下拉选择",
              "showLabel": true,
              "labelWidth": null,
              "tag": "el-select",
              "tagIcon": "select",
              "layout": "colFormItem",
              "span": 24,
              "offset": 0,
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/select",
              "formId": 12,
              "renderKey": "121693473516327"
            },
            "__slot__": {
              "options": [
                {
                  "label": "选项一",
                  "value": 1
                },
                {
                  "label": "选项二",
                  "value": 2
                }
              ]
            },
            props: {
              "multiple": true,
            },
            "placeholder": "请选择下拉选择",
            "style": {
              "width": "100%"
            },
            "clearable": true,
            "disabled": false,
            "filterable": false,
            "__vModel__": "field12"
          },

          {
            "__config__": {
              "label": "计数器",
              "showLabel": true,
              "changeTag": true,
              "labelWidth": null,
              "tag": "el-input-number",
              "tagIcon": "number",
              "span": 24,
              "layout": "colFormItem",
              "required": true,
              "regList": [],
              "document": "https://element.eleme.cn/#/zh-CN/component/input-number",
              "formId": 101,
              "renderKey": 1693550947167
            },
            "placeholder": "计数器计数器",
            "step": 1,
            "step-strictly": false,
            "controls-position": "",
            "disabled": false,
            max: 11,
            min: 0,
            "__vModel__": "field101"
          },

          {
            "__config__": {
              "label": "单行文本",
              "labelWidth": null,
              "showLabel": true,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "input",
              "required": true,
              "layout": "colFormItem",
              "span": 24,
              "offset": 0,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "regList": [],
              "formId": 8,
              "renderKey": "81693473504199"
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
            "__vModel__": "field8"
          },
          {
            "__config__": {
              "label": "多行文本",
              "labelWidth": null,
              "showLabel": true,
              "tag": "el-input",
              "tagIcon": "textarea",
              "required": true,
              "layout": "colFormItem",
              "span": 24,
              "offset": 0,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "formId": 9,
              "renderKey": "91693473505711"
            },
            "type": "textarea",
            "placeholder": "请输入多行文本",
            "autosize": {
              "minRows": 4,
              "maxRows": 4
            },
            "style": {
              "width": "100%"
            },
            "maxlength": null,
            "show-word-limit": false,
            "readonly": false,
            "disabled": false,
            "__vModel__": "field9"
          },
          {
            "__config__": {
              "label": "密码",
              "showLabel": true,
              "labelWidth": null,
              "changeTag": true,
              "tag": "el-input",
              "tagIcon": "password",
              "layout": "colFormItem",
              "span": 24,
              "offset": 0,
              "required": true,
              "regList": [],
              "document": "https://element.eleme.cn/#/zh-CN/component/input",
              "formId": 10,
              "renderKey": "101693473510135"
            },
            "__slot__": {
              "prepend": "",
              "append": ""
            },
            "placeholder": "请输入密码",
            "show-password": true,
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
            "__vModel__": "field10"
          },

          {
            "__config__": {
              "label": "级联选择",
              "url": "https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList",
              "method": "get",
              "dataPath": "list",
              "dataConsumer": "options",
              "showLabel": true,
              "labelWidth": null,
              "tag": "el-cascader",
              "tagIcon": "cascader",
              "layout": "colFormItem",
              "defaultValue": [],
              "dataType": "dynamic",
              "span": 24,
              "offset": 0,
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/cascader",
              "formId": 13,
              "renderKey": "131693473519381"
            },
            "options": [
              {
                "id": 1,
                "value": 1,
                "label": "选项1",
                "children": [
                  {
                    "id": 2,
                    "value": 2,
                    "label": "选项1-1"
                  }
                ]
              }
            ],
            "placeholder": "请选择级联选择",
            "style": {
              "width": "100%"
            },
            "props": {
              "props": {
                "multiple": false,
                "label": "label",
                "value": "value",
                "children": "children"
              }
            },
            "show-all-levels": true,
            "disabled": false,
            "clearable": true,
            "filterable": false,
            "separator": "/",
            "__vModel__": "field13"
          },
          {
            "__config__": {
              "label": "单选框组",
              "labelWidth": null,
              "showLabel": true,
              "tag": "el-radio-group",
              "tagIcon": "radio",
              "changeTag": true,
              "layout": "colFormItem",
              "span": 24,
              "offset": 0,
              "optionType": "default",
              "regList": [],
              "required": true,
              "border": false,
              "document": "https://element.eleme.cn/#/zh-CN/component/radio",
              "formId": 14,
              "renderKey": "141693473523359"
            },
            "__slot__": {
              "options": [
                {
                  "label": "选项一",
                  "value": 1
                },
                {
                  "label": "选项二",
                  "value": 2
                }
              ]
            },
            "style": {},
            "size": "medium",
            "disabled": false,
            "__vModel__": "field14"
          },
          {
            "__config__": {
              "label": "开关",
              "tag": "el-switch",
              "tagIcon": "switch",
              "defaultValue": false,
              "span": 24,
              "offset": 0,
              "showLabel": true,
              "labelWidth": null,
              "layout": "colFormItem",
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/switch",
              "formId": 16,
              "renderKey": "161693473529174"
            },
            "style": {},
            "disabled": false,
            "active-text": "",
            "inactive-text": "",
            "active-color": null,
            "inactive-color": null,
            "active-value": true,
            "inactive-value": false,
            "__vModel__": "field16"
          },
          {
            "__config__": {
              "label": "滑块",
              "tag": "el-slider",
              "tagIcon": "slider",
              "defaultValue": 0,
              "span": 24,
              "offset": 0,
              "showLabel": true,
              "layout": "colFormItem",
              "labelWidth": null,
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/slider",
              "formId": 17,
              "renderKey": "171693473530494"
            },
            "disabled": false,
            "min": 0,
            "max": 100,
            "step": 1,
            "show-stops": false,
            "range": false,
            "__vModel__": "field17"
          },
          {
            "__config__": {
              "label": "时间选择",
              "tag": "el-time-picker",
              "tagIcon": "time",
              "defaultValue": null,
              "span": 24,
              "offset": 0,
              "showLabel": true,
              "layout": "colFormItem",
              "labelWidth": null,
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/time-picker",
              "formId": 18,
              "renderKey": "181693473537759"
            },
            "placeholder": "请选择时间选择",
            "style": {
              "width": "100%"
            },
            "disabled": false,
            "clearable": true,
            "picker-options": {
              "selectableRange": "00:00:00-23:59:59"
            },
            "format": "HH:mm:ss",
            "value-format": "HH:mm:ss",
            "__vModel__": "field18"
          },
          {
            "__config__": {
              "label": "时间范围",
              "tag": "el-time-picker",
              "tagIcon": "time-range",
              "span": 24,
              "offset": 0,
              "showLabel": true,
              "labelWidth": null,
              "layout": "colFormItem",
              "defaultValue": null,
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/time-picker",
              "formId": 19,
              "renderKey": "191693473539495"
            },
            "style": {
              "width": "100%"
            },
            "disabled": false,
            "clearable": true,
            "is-range": true,
            "range-separator": "至",
            "start-placeholder": "开始时间",
            "end-placeholder": "结束时间",
            "format": "HH:mm:ss",
            "value-format": "HH:mm:ss",
            "__vModel__": "field19"
          },
          {
            "__config__": {
              "label": "日期选择",
              "tag": "el-date-picker",
              "tagIcon": "date",
              "defaultValue": null,
              "showLabel": true,
              "labelWidth": null,
              "span": 24,
              "offset": 0,
              "layout": "colFormItem",
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/date-picker",
              "formId": 20,
              "renderKey": "201693473541064"
            },
            "placeholder": "请选择日期选择",
            "type": "date",
            "style": {
              "width": "100%"
            },
            "disabled": false,
            "clearable": true,
            "format": "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            "readonly": false,
            "__vModel__": "field20"
          },
          {
            "__config__": {
              "label": "日期范围",
              "tag": "el-date-picker",
              "tagIcon": "date-range",
              "defaultValue": null,
              "span": 24,
              "offset": 0,
              "showLabel": true,
              "labelWidth": null,
              "required": true,
              "layout": "colFormItem",
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/date-picker",
              "formId": 21,
              "renderKey": "211693473542462"
            },
            "style": {
              "width": "100%"
            },
            "type": "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "disabled": false,
            "clearable": true,
            "format": "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            "readonly": false,
            "__vModel__": "field21"
          },
          {
            "__config__": {
              "label": "评分",
              "tag": "el-rate",
              "tagIcon": "rate",
              "defaultValue": 0,
              "span": 24,
              "offset": 0,
              "showLabel": true,
              "labelWidth": null,
              "layout": "colFormItem",
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/rate",
              "formId": 22,
              "renderKey": "221693473544567"
            },
            "style": {},
            "max": 5,
            "allow-half": false,
            "show-text": false,
            "show-score": false,
            "disabled": false,
            "__vModel__": "field22"
          },
          {
            "__config__": {
              "label": "颜色选择",
              "tag": "el-color-picker",
              "tagIcon": "color",
              "span": 24,
              "offset": 0,
              "defaultValue": null,
              "showLabel": true,
              "labelWidth": null,
              "layout": "colFormItem",
              "required": true,
              "regList": [],
              "changeTag": true,
              "document": "https://element.eleme.cn/#/zh-CN/component/color-picker",
              "formId": 23,
              "renderKey": "231693473546552"
            },
            "show-alpha": false,
            "color-format": "",
            "disabled": false,
            "size": "medium",
            "__vModel__": "field23"
          },
          {
            "__config__": {
              "required": true,
              slotName: "namedSlotName",
              "label": "插槽",
              "showLabel": true,
              "changeTag": true,
              "labelWidth": null,
              "tag": "slot",
              "regList": [],
              "tagIcon": "slot",
              "span": 24,
              "offset": 0,
              "layout": "colFormItem",
              "document": "https://v2.cn.vuejs.org/v2/guide/components-slots.html",
              "formId": 24,
              "renderKey": "241693473552647"
            },
            "__slot__": {},
            "icon": "el-icon-search",
            "disabled": false,
            "__vModel__": "field24"
          },
          {
            "__config__": {
              "layout": "colFormItem",
              "tagIcon": "table",
              "tag": "el-table",
              "document": "https://element.eleme.cn/#/zh-CN/component/table",
              "span": 24,
              "offset": 0,
              "formId": 1,
              "renderKey": "11693472650666",
              "showLabel": true,
              "changeTag": true,
              "labelWidth": null,
              "label": "表格[开发中]",
              "dataType": "dynamic",
              "method": "get",
              "dataPath": "list",
              "dataConsumer": "data",
              "url": "https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/tableData",
              "queryData": "{}",
              "children": [
                {
                  "label": "序号",
                  "__config__": {
                    "layout": "raw",
                    "tag": "el-table-column",
                    "type": "index",
                    "width": "90",
                    "renderKey": "21693472650666",
                    "formId": 2
                  }
                },
                {
                  "__config__": {
                    "layout": "raw",
                    "tag": "el-table-column",
                    "renderKey": "31693472650666",
                    "formId": 3
                  },
                  "prop": "date",
                  "label": "日期"
                },
                {
                  "__config__": {
                    "layout": "raw",
                    "tag": "el-table-column",
                    "renderKey": "41693472650666",
                    "formId": 4
                  },
                  "prop": "address",
                  "label": "地址"
                },
                {
                  "__config__": {
                    "layout": "raw",
                    "tag": "el-table-column",
                    "renderKey": "51693472650666",
                    "formId": 5
                  },
                  "prop": "name",
                  "label": "名称"
                },
                {
                  "__config__": {
                    "layout": "raw",
                    "tag": "el-table-column",
                    "renderKey": "61693472650666",
                    "children": [
                      {
                        "__config__": {
                          "label": "按钮",
                          "tag": "el-button",
                          "tagIcon": "button",
                          "layout": "raw",
                          "renderKey": "71693472650666",
                          "formId": 7
                        },
                        "__slot__": {
                          "default": "主要按钮"
                        },
                        "type": "primary",
                        "icon": "el-icon-search",
                        "round": false,
                        "size": "medium"
                      }
                    ],
                    "formId": 6
                  },
                  "label": "操作"
                }
              ]
            },
            "data": [
              {
                "date": 1
              }
            ],
            "border": true,
            "type": "table",
            "justify": "start",
            "align": "top",
            "__vModel__": "field1"
          }
        ],
        __methods__: {
          clickTestButton1() {
            console.log(
              `%c【测试按钮1】点击事件里可以访问当前表单：
                1) formModel='formData', 所以this.formData可以拿到当前表单的model
                2) formRef='elForm', 所以this.$refs.elForm可以拿到当前表单的ref(vue组件)
              `,
              'color:#409EFF;font-size: 15px'
            );
            console.log('表单的Model：', this.formData);
            console.log('表单的ref：', this.$refs.elForm);
          }
        },
        formRef: 'elForm',
        formModel: 'formData',
        size: 'small',
        labelPosition: 'right',
        labelWidth: 100,
        formRules: 'rules',
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false
      }
    };
  },
  created() { },
  mounted() {

  },
  computed: {},
  methods: {
    sumbitForm1(data) {
      console.log(data);
    },
  },
  watch: {},
  components: {
    Theme
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
.home{
  height:666px
}
</style>