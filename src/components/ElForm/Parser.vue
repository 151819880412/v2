<script>
import _ from "lodash";
import render from '@/components/ElForm/render.js';

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
};

const layouts = {
  colFormItem(h, scheme) {
    const config = scheme.__config__;
    const listeners = buildListeners.call(this, scheme);

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    if (config.showLabel === false) labelWidth = '0';
    const child = renderChildren.apply(this, arguments);
    return (
      <el-col span={config.span} offset={config.offset}>
        <el-form-item label-width={labelWidth} prop={scheme.__vModel__}
          label={config.showLabel ? config.label : ''}>
          {config.slotName ?
            this.$scopedSlots[config.slotName]?.({ model: this[this.formConf.formModel], config })
            : (child ? <render conf={scheme} on={listeners} >{child}</render> : <render conf={scheme} on={listeners} ></render>)
          }
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
      <el-col span={scheme.span} offset={scheme.offset}>
        <el-row gutter={scheme.gutter}>
          {child}
        </el-row>
      </el-col>
    );
  },
  raw(h, currentItem, index, list) {
    const config = currentItem.__config__;
    const child = renderChildren.apply(this, arguments);
    return <render key={config.renderKey} conf={currentItem} onInput={event => {
      this.$set(config, 'defaultValue', event);
    }}>
      {child}
    </render>;
  }
};

function renderFrom(h) {
  const { formConfCopy } = this;
  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  );
}

function formBtns(h) {
  return <el-col>
    <el-form-item size="large">
      <el-button type="primary" onClick={this.submitForm}>提交</el-button>
      <el-button onClick={this.resetForm}>重置</el-button>
    </el-form-item>
  </el-col>;
}

function renderFormItem(h, elementList) {
  return elementList.map(scheme => {
    const config = scheme.__config__;
    const layout = layouts[config.layout];

    if (layout) {
      return layout.call(this, h, scheme);
    }
    throw new Error(`没有与${config.layout}匹配的layout`);
  });
}

function renderChildren(h, scheme) {
  const config = scheme.__config__;
  if (!Array.isArray(config.children)) return null;
  return renderFormItem.call(this, h, config.children);
}

function setValue(event, config, scheme) {
  this.$set(config, 'defaultValue', event);
  this.$set(this[this.formConf.formModel], scheme.__vModel__, event);
}

function buildListeners(scheme) {
  const config = scheme.__config__;
  const methods = this.formConf.__methods__ || {};
  const listeners = {};

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach(key => {
    listeners[key] = event => methods[key].call(this, event);
  });
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = event => setValue.call(this, event, config, scheme);
  return listeners;
}

export default {
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      required: true
    },
    formDatas: {
      type: Object,
      required: false,
    },
  },
  data() {
    const data = {
      formConfCopy: _.cloneDeep(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    };
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel]);
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules]);
    return _.cloneDeep(data);
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach(cur => {
        const config = cur.__config__;
        if (cur.__vModel__) {
          // 简易版填充默认值
          if (this.formDatas && this.formDatas[cur.__vModel__]) {
            config.defaultValue = this.formDatas[cur.__vModel__];
          }
          if (config.tag == 'el-checkbox-group' || config.tag == 'el-select') {
            formData[cur.__vModel__] = config.defaultValue || [];
          } else {
            formData[cur.__vModel__] = config.defaultValue;
          }
        }
        if (config.children) this.initFormData(config.children, formData);
      });
    },
    buildRules(componentList, rules) {
      componentList.forEach(cur => {
        const config = cur.__config__;
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = { required: config.required, message: cur.placeholder };
            if (Array.isArray(config.defaultValue)) {
              required.type = 'array';
              required.message = `请至少选择一个${config.label}`;
            }
            required.message === undefined && (required.message = `${config.label}不能为空`);
            config.regList.push(required);
          }
          rules[cur.__vModel__] = config.regList.map(item => {
            item.pattern && (item.pattern = eval(item.pattern));
            item.trigger = ruleTrigger && ruleTrigger[config.tag];
            return item;
          });
        }
        if (config.children) this.buildRules(config.children, rules);
      });
    },
    resetForm() {
      this.formConfCopy = _.cloneDeep(this.formConf);
      this.$refs[this.formConf.formRef].resetFields();
    },
    submitForm() {
      console.log(this[this.formConf.formModel],);
      this.$refs[this.formConf.formRef].validate(valid => {
        if (!valid) return false;
        // 触发sumit事件
        this.$emit('submit', this[this.formConf.formModel]);
        return true;
      });
    },
    submitFormVal() {
      return new Promise(res => {
        this.$refs[this.formConf.formRef].validate(valid => {
          if (!valid) return false;
          res(Object.assign({}, this.formDatas, this[this.formConf.formModel]));
          return true;
        });
      });
    },
  },
  render(h) {
    return renderFrom.call(this, h);
  },
  watch: {
    formDatas: {
      handler(newVal, oldVal) {
        for (let key in newVal) {
          if (newVal.hasOwnProperty(key) && this[this.formConf.formModel].hasOwnProperty(key) && newVal[key]) {
            this[this.formConf.formModel][key] = newVal[key];
          }
        }
      },
      deep: true
    }
  }
};
</script>
