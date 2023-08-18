<template>
  <div class='sysMenu'>

    <SearchForm :formConfig="queryFormConfig" :formData="formData" ref="searchForm">
      <template v-slot:searchBtn>
        <el-button type="primary">插槽</el-button>
      </template>el-checkbox-group
    </SearchForm>


    <CETable ref="ceTable" :searchFn="page" @add="add">
      <template v-slot:tableBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </CETable>
  </div>
</template>
<script>
import CETable from '@/components/ElTable/CE-Table.vue';
import { page } from '@/api/system/sysMenu.js';
import SearchForm from '@/components/SearchForm/SearchForm.vue';
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
      page,
      formData: {},
      queryFormConfig: [
        {
          label: "Input1",
          prop: "input1",
          component: "el-input",
          placeholder: "请输入内容",
          disabled: false,
          clearable: true,
          readonly: false,
          autofocus: false,
          name: "inputName",
          rules: [
            {
              required: true,
              message: "请输入内容",
              trigger: "blur",
            },
          ],
          resize: "none",
          slots: [{
            slotName: "prepend",
            slotHtml: "<span>111</span>",
          }],
          type: "text",
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
          change: (a, b, c) => {
            console.log(a, b, c);
          },
          defaultValue:"123",
          __slot__: {
              prepend: '11',
              append: '22'
            },
        },
        {
          label: "Textarea",
          prop: "textarea",
          component: "el-input",
          placeholder: "请输入内容",
          disabled: false,
          clearable: true,
          readonly: false,
          autofocus: false,
          name: "inputName",
          rules: [
            {
              required: true,
              message: "请输入内容",
              trigger: "blur",
            },
          ],
          type: "textarea",
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Password",
          prop: "password",
          component: "el-input",
          placeholder: "请输入内容",
          disabled: false,
          clearable: true,
          readonly: false,
          autofocus: true,
          name: "inputName",
          showPassword: true,
          rules: [
            {
              required: true,
              message: "请输入内容",
              trigger: "blur",
            },
          ],
          resize: "none",
          type: "text",
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Input Number",
          prop: "inputNumber",
          component: "el-input-number",
          // width: 100,
          // value: 1,
          // size: 1,
          min: 0,
          max: 100,
          step: 1,
          stepStrictly: false,
          // precision: '',
          disabled: false,
          controls: true,
          controlsPosition: "",
          name: "inputNumber",
          // change: (val: number) => console.log('input number changed to: ', val),
          // focus: () => console.log('input number focused'),
          // blur: () => console.log('input number blurred'),
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please enter a number",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },

        // {
        //   label: "Select",
        //   prop: "select",
        //   component: "el-select",
        //   placeholder: "请选择",
        //   multiple: false,
        //   disabled: false,
        //   clearable: false,
        //   collapseTags: false,
        //   multipleLimit: 0,
        //   remote: false,
        //   filterable: false,
        //   // remoteMethod: undefined,
        //   loading: false,
        //   loadingText: "加载中",
        //   noMatchText: "无匹配数据",
        //   noDataText: "暂无数据",
        //   popperClass: "",
        //   reserveKeyword: false,
        //   defaultFirstOption: false,
        //   size: "default",
        //   // prefixIcon: '',
        //   // suffixIcon: '',
        //   // onChange: (val | string[]) => console.log('select changed to: ', val),
        //   // onFocus: () => console.log('select focused'),
        //   // onBlur: () => console.log('select blurred'),
        //   name: "select",
        //   validateEvent: true,
        //   rules: [
        //     {
        //       required: true,
        //       message: "请选择一个选项",
        //       trigger: "change",
        //     },
        //   ],
        //   slots: [{
        //     slotName: "default",
        //     component: "el-option",
        //     options: [
        //       {
        //         label: "选项1",
        //         value: "option1",
        //       },
        //       {
        //         label: "选项2",
        //         value: "option2",
        //       },
        //       {
        //         label: "选项3",
        //         value: "option3",
        //       },
        //     ],
        //   }],
        //   filterMethod: (query, option) => {
        //     return option.label.indexOf(query) !== -1;
        //   },
        //   ceShow: true,
        //   labelWidth: "110px",
        //   showLabel: true,
        //   layout: 'colFormItem',
        // },

        {
          label: "Cascader",
          prop: "cascader",
          component: "el-cascader",
          // width: 150,
          slots: [{
            slotName: "default",
          }],
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致",
                    },
                    {
                      value: "fankui",
                      label: "反馈",
                    },
                    {
                      value: "xiaolv",
                      label: "效率",
                    },
                    {
                      value: "kekong",
                      label: "可控",
                    },
                  ],
                },
              ],
            },
          ],
          props: {
            value: "value",
            label: "label",
            children: "children",
          },
          value: "",
          size: "",
          placeholder: "请选择",
          disabled: false,
          clearable: true,
          // changeOnSelect: false,
          filterable: false,
          separator: "/",
          // beforeFilter: (queryString, options[]) => {
          //   console.log('before filter');
          //   return options.filter(option => option.label.toLowerCase().includes(queryString.toLowerCase()));
          // },
          // onChange: (val[]) => console.log('cascader changed to: ', val),
          // onFocus: () => console.log('cascader focused'),
          // onBlur: () => console.log('cascader blurred'),
          name: "cascader",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please select an option",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },

        {
          label: "Radio Group",
          prop: "radioGroup",
          component: "el-radio-group",
          value: '选项2',
          size: "",
          fill: "#20A0FF",
          textColor: "",
          disabled: false,
          // border: false,
          // onChange: (val) => console.log('radio group changed to: ', val),
          // onFocus: () => console.log('radio group focused'),
          // onBlur: () => console.log('radio group blurred'),
          name: "radioGroup",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please select an option",
              trigger: "change",
            },
          ],
          slots: [{
            slotName: "default",
            label: "Radio",
            prop: "radio",
            component: "el-radio",
            options: [
              {
                showLabel: "选项1",
                label: "option1",
                value: "option1",
              },
              {
                showLabel: "选项2",
                label: "option2",
                value: "option2",
              },
              {
                showLabel: "选项3",
                label: "option3",
                value: "option3",
              },
            ],
            // defaultValue: '选项2',
            disabled: false,
            size: "default",
            // textColor: '#ffffff',
            // fill: '#409EFF',
            // borderColor: '#409EFF',
            // onChange: (val) => console.log('radio changed to: ', val),
            // onFocus: () => console.log('radio focused'),
            // onBlur: () => console.log('radio blurred'),
            name: "radio-group",
            validateEvent: true,
          }],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },

        {
          label: "Checkbox Group",
          prop: "checkboxGroup",
          name: "checkboxGroup",
          component: "el-checkbox-group",
          size: "",
          // fill: '#20A0FF',
          // textColor: '',
          disabled: false,
          border: false,
          rules: [
            {
              required: true,
              message: "请勾选",
              trigger: "change",
            },
          ],
          required: true,
          slots: [{
            slotName: "default",
            label: "Checkbox",
            prop: "checkbox",
            component: "el-checkbox",
            // trueLabel: '选中时的值',
            // falseLabel: '未选中时的值',
            checked: false,
            disabled: false,
            size: "default",
            border: false,
            indeterminate: false,
            // onChange: (val: boolean) => console.log('checkbox changed to: ', val),
            // onFocus: () => console.log('checkbox focused'),
            // onBlur: () => console.log('checkbox blurred'),
            name: "checkbox-group",
            validateEvent: true,
            options: [
              {
                showLabel: "选项1",
                label: "option1",
                value: "option1",
              },
              {
                showLabel: "选项2",
                label: "option2",
                value: "option2",
              },
              {
                showLabel: "选项3",
                label: "option3",
                value: "option3",
              },
            ],
          }],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },

        {
          label: "Slider",
          prop: "slider",
          component: "el-slider",
          min: 0,
          max: 100,
          step: 1,
          disabled: false,
          showInput: false,
          showInputControls: true,
          inputSize: "small",
          showStops: false,
          showTooltip: true,
          // formatTooltip: (val) => val.toString(),
          range: false,
          vertical: false,
          height: "",
          // onChange: (val: number | number[]) => console.log('slider changed to: ', val),
          // onFocus: () => console.log('slider focused'),
          // onBlur: () => console.log('slider blurred'),
          name: "slider",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "请滑动选择一个值",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Switch",
          prop: "switch",
          component: "el-switch",
          // activeIconClass: '',
          // inactiveIconClass: '',
          activeText: "",
          inactiveText: "",
          activeColor: "#409EFF",
          inactiveColor: "#C0CCDA",
          activeValue: true,
          inactiveValue: false,
          disabled: false,
          // onChange: (val: boolean) => console.log('switch changed to: ', val),
          // onFocus: () => console.log('switch focused'),
          // onBlur: () => console.log('switch blurred'),
          name: "switch",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "请切换开关",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Time Picker",
          prop: "timePicker",
          component: "el-date-picker",
          type: "datetime",
          placeholder: "Select time",
          readonly: false,
          editable: true,
          disabled: false,
          clearable: true,
          size: "default",
          popperClass: "",
          startPlaceholder: "",
          endPlaceholder: "",
          isRange: false,
          arrowControl: true,
          format: "yyyy-MM-dd HH:mm:ss",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
          // pickerOptions: {
          //   selectableRange: '00:00:00-23:59:59',
          //   format: 'HH:mm:ss',
          //   start: '09:00:00',
          //   step: '00:15:00',
          //   end: '18:00:00'
          // },
          // onChange: (val | string[]) => console.log('time changed to: ', val),
          // onFocus: () => console.log('time focused'),
          // onBlur: () => console.log('time blurred'),
          name: "timePicker",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please select a time",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Date Picker",
          prop: "datePicker",
          component: "el-date-picker",
          placeholder: "Select date",
          type: "datetimerange",
          readonly: false,
          editable: true,
          disabled: false,
          clearable: true,
          size: "default",
          popperClass: "",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
          format: "yyyy-MM-dd HH:mm:ss",
          shortcuts: [
            {
              text: "Today",
              onClick: () => console.log("Today clicked"),
            },
            {
              text: "Yesterday",
              onClick: () => console.log("Yesterday clicked"),
            },
            {
              text: "Last week",
              onClick: () => console.log("Last week clicked"),
            },
          ],
          // onChange: (val | string[]) => console.log('date changed to: ', val),
          // onFocus: () => console.log('date focused'),
          // onBlur: () => console.log('date blurred'),
          name: "datePicker",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please select a date",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Rate",
          prop: "rate",
          component: "el-rate",
          colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
          voidColor: "#C6D1DE",
          disabledVoidColor: "#EFF2F7",
          // iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
          // voidIconClass: 'el-icon-star-off',
          // disabledVoidIconClass: 'el-icon-star-on',
          // voidTextColor: '#C6D1DE',
          allowHalf: false,
          showText: false,
          showScore: false,
          scoreTemplate: "{value}",
          texts: ["Very Bad", "Bad", "Normal", "Good", "Very Good"],
          textColor: "#1F2D3D",
          disabled: false,
          max: 5,
          // onChange: (val: number) => console.log('rate changed to: ', val),
          // onFocus: () => console.log('rate focused'),
          // onBlur: () => console.log('rate blurred'),
          name: "rate",
          // validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please rate this",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Color Picker",
          prop: "colorPicker",
          component: "el-color-picker",
          disabled: false,
          showAlpha: false,
          colorFormat: "hex",
          // onChange: (val) => console.log('color changed to: ', val),
          // onFocus: () => console.log('color picker focused'),
          // onBlur: () => console.log('color picker blurred'),
          name: "colorPicker",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please select a color",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Upload",
          prop: "upload",
          component: "el-upload",
          action: "https://jsonplaceholder.typicode.com/posts/",
          headers: {},
          multiple: false,
          data: {},
          // name: 'file',
          withCredentials: false,
          showFileList: true,
          fileList: [],
          autoUpload: true,
          accept: "",
          listType: "text",
          disabled: false,
          limit: 3,
          slots: [{
            slotName: "default",
            // slotHtml: `<el-button type="primary">点击上传</el-button>`,
            label: "Button",
            prop: "button",
            component: "el-button",
            type: "primary",
            size: "",
            icon: "",
            nativeType: "button",
            loading: false,
            disabled: false,
            plain: false,
            autofocus: false,
            round: false,
            circle: false,
            // onClick: (event: Event) => console.log("button clicked", event),
            // onFocus: () => console.log("button focused"),
            // onBlur: () => console.log("button blurred"),
          }],
          // beforeUpload: (file: File) => {
          //   console.log('before upload', file);
          //   return true;
          // },
          // onRemove: (file: object, fileList: object[]) => console.log('file removed', file, fileList),
          // onSuccess: (response: object, file: object, fileList: object[]) => console.log(
          //   'file uploaded successfully', response, file, fileList),
          // onError: (err: Error, file: object, fileList: object[]) => console.log('file upload error', err, file,
          //   fileList),
          // onChange: (file: object, fileList: object[]) => console.log('file changed', file, fileList),
          // onPreview: (file: object) => console.log('file previewed', file),
          // onFocus: () => console.log('upload focused'),
          // onBlur: () => console.log('upload blurred'),
          name: "upload",
          rules: [
            {
              required: true,
              message: "Please upload a file",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },
        {
          label: "Transfer",
          prop: "transfer",
          component: "el-transfer",
          data: [
            {
              value: 1,
              label: "备选项1",
              disabled: false,
            },
            {
              value: 2,
              label: "备选项2",
              disabled: false,
            },
            {
              value: 3,
              label: "备选项3",
              disabled: false,
            },
          ],
          filterable: true,
          filterPlaceholder: "Search",
          filterMethod: (query, item) => {
            return item.label.indexOf(query) > -1;
          },
          titles: ["Source", "Target"],
          buttonTexts: ["", ""],
          format: {
            noChecked: "${total}",
            hasChecked: "${checked}/${total}",
          },
          // 'button-texts': ['To left', 'To right'],
          // 'render-content': (h, option) => {
          //   return h('span', null, option.label);
          // },
          // footerFormat: '{total} items',
          props: {
            label: "label",
            key: "value",
            disabled: "disabled",
          },
          targetOrder: "original",
          // selected: [],
          // onChange: (val: object[], direction, moveKeys[]) => {
          //   console.log(`transfer changed to: ${direction}, ${moveKeys}, ${val}`);
          // },
          // onFocus: () => console.log('transfer focused'),
          // onBlur: () => console.log('transfer blurred'),
          name: "transfer",
          validateEvent: true,
          rules: [
            {
              required: true,
              message: "Please select at least one item",
              trigger: "change",
            },
          ],
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },

        {
          label: "Image",
          prop: "image",
          component: "el-image",
          src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          fit: "contain",
          // alt: '',
          // referrerPolicy: '',
          lazy: false,
          // scrollContainer: null,
          previewSrcList: [],
          // zIndex: '',
          // onClick: (event: Event) => console.log('image clicked', event),
          // onLoad: () => console.log('image loaded'),
          // onError: () => console.log('image load error'),
          // onFocus: () => console.log('image focused'),
          // onBlur: () => console.log('image blurred'),
          name: "image",
          ceShow: true,
          labelWidth: "110px",
          showLabel: true,
          layout: 'colFormItem',
        },

      ],
    };
  },
  created() { },
  mounted() {
    this.initTable();
    this.initPage();
  },
  computed: {},
  methods: {
    add() {
      console.log(111);
    },
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
            prop: "templateMaintainName",
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
    initPage() {
      // let data = await page(1,10,{})
    },
    editorTemp(row) {
      console.log(row);
    }
  },
  watch: {},
  components: {
    CETable,
    SearchForm,
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>