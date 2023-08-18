
<script>
import _ from 'lodash';
import render from './render.js';


const layouts = {
  colFormItem(h, scheme) {
    const config = scheme;
    const listeners = buildListeners.call(this, scheme);

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    if (config.showLabel === false) labelWidth = '0';
    return (
      <el-col span={config.span}>
        <el-form-item label-width={labelWidth} prop={scheme.prop}
          label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} />
        </el-form-item>
      </el-col>
    );
  },
  rowFormItem(h, scheme) {
    let child = renderChildren.apply(this, arguments);
    if (scheme.type === 'flex') {
      child = <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
        {child}
      </el-row>;
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter}>
          {child}
        </el-row>
      </el-col>
    );
  }
};

function renderFrom(h) {
  const { formConfCopy } = this;

  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition || 'left'}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  );
}

function renderFormItem(h, elementList) {
  return elementList.map(scheme => {
    const config = scheme.layout;
    const layout = layouts[config];

    if (layout) {
      return layout.call(this, h, scheme);
    }
    throw new Error(`没有与${config}匹配的layout`);
  });
}
function buildListeners(scheme) {
  const config = scheme;
  const methods = this.formConfig.__methods__ || {};
  const listeners = {};

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach(key => {
    listeners[key] = event => methods[key].call(this, event);
  });
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = event => setValue.call(this, event, config, scheme);

  return listeners;
}

function setValue(event, config, scheme) {
  console.log(event, config, scheme);
  this.$set(config, 'defaultValue', event);
  this.$set(this.formData, scheme.prop, event);
}

export default {
  props: {
    formConfig: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formData: {},
      formConfCopy: _.cloneDeep(this.formConfig),
      aa: "22",
      a: "",
    };
  },
  methods: {
    handleSubmit() {
      // 处理表单提交逻辑
      console.log('Form Data:', this.formData);
    },
    makeUpHtml(formConfig) {

      // return <el-form ref="form" label-position="top" label-width="100px" on-submit={this.handleSubmit}>
      //   {this.formConfig.map((item) => (
      //     <el-form-item label={item.label} prop={item.prop} key={item.prop}>
      //       {(() => {
      //         switch (item.component) {
      //           case 'el-input':
      //             return <el-input v-model={this.formData[item.prop]} />;
      //           case 'el-1select':
      //         }
      //       })()}
      //     </el-form-item>
      //   ))}
      //   <el-form-item>
      //     <el-button type="primary" native-type="submit">
      //       提交
      //     </el-button>
      //   </el-form-item>
      // </el-form>
    }
  },
  render(h) {
    // return this.makeUpHtml();
    // return renderFrom.call(this, h)

    const aa = {
      'class': {
        foo: true,
        bar: false
      },
      key: 'myKey',
      ref: 'myRef',
      attrs: {
        placeholder: "请输入内容",
        maxlength: 10,
        'show-word-limit': true,
      },
      props: {
        fetchSuggestions: () => {
          console.log(111);
        },
      },
      style: {
        color: "red",
      },
      slot: {
        append: <template slot="append">
          <el-select v-model={this.a} placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
        </template>
      }
    };
    return (<el-input {...aa} v-model={this.aa}>
      {aa.slot.append}
    </el-input>);
  },
  components: {
    render
  }
};

</script>
<style lang="stylus" scoped>
// /deep/.el-select{
//   width: 100%
// }
</style>
