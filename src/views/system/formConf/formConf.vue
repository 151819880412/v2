<template>
  <div class="container">
    <div class="left-board">
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <svg-icon icon-class="component" />
              {{ item.title }}
            </div>
            <draggable class="components-draggable" :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="cloneComponent"
              draggable=".components-item" :sort="false" @end="onEnd">
              <div v-for="(element, index) in item.list" :key="index" class="components-item"
                @click="addComponent(element)">
                <div class="components-body">
                  <svg-icon :icon-class="element.__config__.tagIcon" />
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-button icon="el-icon-video-play" type="text" @click="run">
          运行
        </el-button>
        <el-button icon="el-icon-view" type="text" @click="showJson">
          查看json
        </el-button>
        <el-button icon="el-icon-download" type="text" @click="download">
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
          复制代码
        </el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
          清空
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form :size="formConf.size" :label-position="formConf.labelPosition" :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'">
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
              <draggable-item v-for="(item, index) in drawingList" :key="item.renderKey" :drawing-list="drawingList"
                :current-item="item" :index="index" :active-id="activeId" :form-conf="formConf"
                @activeItem="activeFormItem" @copyItem="drawingItemCopy" @deleteItem="drawingItemDelete" />
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

    <right-panel v-if="activeData.__config__" :active-data="activeData" :form-conf="formConf"
      :show-field="!!drawingList.length" @tag-change="tagChange" @fetch-data="fetchData" />

    <form-drawer :visible.sync="drawerVisible" :form-data="formData" size="100%" :generate-conf="generateConf" />

    <json-drawer size="60%" destroy-on-close :visible.sync="jsonDrawerVisible" :json-str="JSON.stringify(formData)"
      @refresh="refreshJson" />

    <code-type-dialog :visible.sync="dialogVisible" title="选择生成类型" :show-file-name="showFileName" @confirm="generate" />
    <input id="copyNode" type="hidden">


  </div>
</template>
<script>
import _ from "lodash";
import draggable from 'vuedraggable';
import {
  inputComponents, selectComponents, layoutComponents, formConf
} from '@/components/ElForm/config.js';
import DraggableItem from '@/components/ElForm/DraggableItem.vue';
import RightPanel from '@/components/ElForm/RightPanel.vue';
import CodeTypeDialog from './CodeTypeDialog';
import JsonDrawer from './JsonDrawer';
import FormDrawer from './FormDrawer'
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html';
import { makeUpJs } from '@/components/generator/js';
import { makeUpCss } from '@/components/generator/css';
import { beautifierConf } from '@/utils/generator/index';
import ClipboardJS from '@/plugs/clipboard.min';
import beautifier from '@/plugs/beautifier.min';


let tempActiveData;
export default {
  name: 'FormConf',  // 组件名称
  props: {},  // 外部传入的属性
  data() {
    return {
      activeData: {},  // 当前选中的组件数据
      activeId: null,  // 当前选中的组件 ID
      inputComponents,  // 输入型组件列表
      selectComponents,  // 选择型组件列表
      layoutComponents,  // 布局型组件列表
      formConf,  // 表单配置
      drawingList: [],  // 绘制的组件列表
      leftComponents: [  // 左侧组件列表，分为输入型、选择型、布局型
        {
          title: '输入型组件',
          list: inputComponents
        },
        {
          title: '选择型组件',
          list: selectComponents
        },
        {
          title: '布局型组件',
          list: layoutComponents
        }
      ],
      idGlobal: 0,  // 全局 ID 计数
      dialogVisible: false,  // 弹窗是否可见
      showFileName: false,  // 是否显示文件名输入框
      operationType: "",  // 操作类型（Run、Download、Copy）
      formData: {},  // 表单数据
      jsonDrawerVisible: false,  // JSON 抽屉是否可见
      drawerVisible: false,  // 抽屉是否可见
      generateConf: null,  // 生成配置
    };
  },
  created() { },  // 组件创建时执行的逻辑
  mounted() {
    // 组件挂载后执行的逻辑
    const clipboard = new ClipboardJS('#copyNode', {
      text: trigger => {
        const codeStr = this.generateCode();  // 生成代码字符串
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        });
        return codeStr;  // 返回要复制的代码字符串
      }
    });
    clipboard.on('error', e => {
      this.$message.error('代码复制失败');
    });
  },
  computed: {},
  methods: {
    onEnd(obj) {
      // 拖拽结束时的逻辑
    },
    cloneComponent(origin) {
      // 克隆组件配置
      const clone = _.cloneDeep(origin);  // 使用 lodash 克隆原始组件配置
      const config = clone.__config__;  // 获取克隆后组件的配置
      config.span = this.formConf.span;  // 使用表单配置中的 span
      config.offset = this.formConf.offset;  // 使用表单配置中的 offset
      this.createIdAndKey(clone);  // 创建 ID 和 Key
      clone.placeholder !== undefined && (clone.placeholder += config.label);  // 如果有占位文本，则追加 label
      tempActiveData = clone;  // 临时存储克隆的组件配置
      return tempActiveData;
    },
    createIdAndKey(item) {
      // 创建 ID 和 Key
      const config = item.__config__;  // 获取组件配置
      config.formId = ++this.idGlobal;  // 分配全局唯一 ID
      config.renderKey = `${config.formId}${+new Date()}`;  // 根据 ID 和时间戳创建 renderKey，用于强制更新组件
      if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`;  // 设置 v-model
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`;  // 设置组件名称
        !Array.isArray(config.children) && (config.children = []);  // 如果 children 不是数组，则初始化为空数组
        delete config.label;  // rowFormItem 无需配置 label 属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem));  // 递归处理子组件
      }
      return item;
    },
    addComponent(val) {
      // 添加组件逻辑
      console.log(val);  // 打印传入的组件配置
      console.log(this);  // 打印当前组件上下文
    },
    activeFormItem(currentItem) {
      // 激活表单项
      console.log(currentItem);  // 打印当前选中的组件数据
      this.activeData = currentItem;  // 设置当前激活的组件数据
      this.activeId = currentItem.__config__.formId;  // 设置当前激活的组件 ID
    },
    drawingItemCopy(val) {
      // 绘制项复制逻辑
      console.log(val);  // 打印传入的组件配置
    },
    drawingItemDelete(val) {
      // 绘制项删除逻辑
      console.log(val);  // 打印传入的组件配置
    },
    tagChange(newTag) {
      // 标签变化逻辑
      newTag = this.cloneComponent(newTag);  // 克隆标签组件配置
      const config = newTag.__config__;  // 获取克隆后组件的配置
      newTag.__vModel__ = this.activeData.__vModel__;  // 设置 v-model
      config.formId = this.activeId;  // 设置表单 ID
      config.span = this.activeData.__config__.span;  // 使用激活组件的 span
      config.offset = this.activeData.__config__.offset;  // 使用激活组件的 offset
      this.activeData.__config__.tag = config.tag;  // 更新激活组件的 tag
      this.activeData.__config__.tagIcon = config.tagIcon;  // 更新激活组件的 tagIcon
      this.activeData.__config__.document = config.document;  // 更新激活组件的 document
      if (typeof this.activeData.__config__.defaultValue === typeof config.defaultValue) {
        config.defaultValue = this.activeData.__config__.defaultValue;  // 更新默认值
      }
      this.activeData = newTag;  // 更新激活的组件数据
      this.updateDrawingList(newTag, this.drawingList);  // 更新绘制组件列表
    },
    updateDrawingList(newTag, list) {
      // 更新绘制组件列表
      const index = list.findIndex(item => item.__config__.formId === this.activeId);
      if (index > -1) {
        list.splice(index, 1, newTag);  // 替换对应的组件配置
      } else {
        list.forEach(item => {
          if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children);  // 递归处理子组件
        });
      }
    },
    fetchData(val) {
      // 获取数据逻辑
      console.log(val);  // 打印传入的数据
    },
    run() {
      // 运行逻辑
      this.dialogVisible = true;  // 打开弹窗
      this.showFileName = false;
      this.operationType = 'Run';  // 设置操作类型为 Run
    },
    execRun(data) {
      // 执行运行逻辑
      this.AssembleFormData();  // 组装表单数据
      this.drawerVisible = true;  // 打开抽屉
    },
    showJson() {
      // 显示 JSON 数据逻辑
      this.AssembleFormData();  // 组装表单数据
      this.jsonDrawerVisible = true;  // 打开 JSON 抽屉
    },
    download() {
      // 下载逻辑
      this.dialogVisible = true;  // 打开弹窗
      this.showFileName = true;
      this.operationType = 'Download';  // 设置操作类型为 Download
    },
    execDownload(data) {
      // 执行下载逻辑
      const codeStr = this.generateCode();  // 生成代码字符串
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);  // 创建 URL 对象
      const link = document.createElement('a');  // 创建下载链接
      link.href = url;
      link.download = data.fileName;
      link.click();  // 触发点击事件，开始下载
      URL.revokeObjectURL(url);  // 释放 URL 对象
    },
    copy() {
      // 复制逻辑
      this.dialogVisible = true;  // 打开弹窗
      this.showFileName = false;
      this.operationType = 'Copy';  // 设置操作类型为 Copy
      console.log(this.drawingList, this.formConf);  // 打印绘制列表和表单配置
    },
    empty() {
      // 清空逻辑
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          this.drawingList = [];  // 清空绘制列表
          this.idGlobal = 100;  // 重置全局 ID 计数
        }
      );
    },
    generate(data) {
      const func = this[`exec${this.operationType}`];  // 获取对应操作类型的执行函数
      this.generateConf = data;  // 存储生成配置
      func && func(data);  // 执行对应的操作逻辑
    },
    AssembleFormData() {
      // 组装表单数据
      this.formData = {
        fields: _.cloneDeep(this.drawingList),  // 克隆绘制列表
        ...this.formConf
      };
    },
    execCopy(data) {
      // 执行复制逻辑
      document.getElementById('copyNode').click();  // 触发点击事件，复制内容
    },
    generateCode() {
      // 生成代码逻辑
      const { type } = this.generateConf;  // 获取生成配置中的 type
      this.AssembleFormData();  // 组装表单数据
      const script = vueScript(makeUpJs(this.formData, type));  // 生成 JavaScript 代码
      const html = vueTemplate(makeUpHtml(this.formData, type));  // 生成 HTML 代码
      const css = cssStyle(makeUpCss(this.formData));  // 生成 CSS 代码
      return beautifier.html(html + script + css, beautifierConf.html);  // 格式化并返回完整的代码
    },
    refreshJson(data) {
      // 刷新 JSON 数据逻辑
      this.drawingList = _.cloneDeep(data.fields);  // 更新绘制列表
      delete data.fields;
      this.formConf = data;  // 更新表单配置
    }
  },
  watch: {},
  components: {  // 引入的组件
    draggable,
    DraggableItem,
    RightPanel,
    CodeTypeDialog,
    JsonDrawer,
    FormDrawer,
  },
  beforeDestroy() { }  // 组件销毁前执行的逻辑
};

</script>
<style lang='stylus' scoped>

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.components-list {
  padding: 8px;
  box-sizing: border-box;
  height: 100%;
  .components-item {
    display: inline-block;
    width: 48%;
    margin: 1%;
    transition: transform 0ms !important;
  }
}
.components-draggable{
  padding-bottom: 20px;
}
.components-title{
  font-size: 14px;
  color: #222;
  margin: 6px 2px;
  .svg-icon{
    color: #666;
    font-size: 18px;
  }
}

.components-body {
  padding: 8px 10px;
  background: $selectedColor;
  font-size: 12px;
  cursor: move;
  border: 1px dashed $selectedColor;
  border-radius: 3px;
  .svg-icon{
    color: #777;
    font-size: 15px;
  }
  &:hover {
    border: 1px dashed #787be8;
    color: #787be8;
    .svg-icon {
      color: #787be8;
    }
  }
}

.left-board {
  width: 260px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
}
.left-scrollbar{
  height: calc(100vh - 42px);
  overflow: hidden;
}
.center-scrollbar {
  height: calc(100vh - 42px);
  overflow: hidden;
  border-left: 1px solid #f1e8e8;
  border-right: 1px solid #f1e8e8;
  box-sizing: border-box;
}
.center-board {
  height: 100vh;
  width: auto;
  margin: 0 350px 0 260px;
  box-sizing: border-box;
}
.empty-info{
  position: absolute;
  top: 46%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 18px;
  color: #ccb1ea;
  letter-spacing: 4px;
}
.action-bar{
  position: relative;
  height: 42px;
  text-align: right;
  padding: 0 15px;
  box-sizing: border-box;;
  border: 1px solid #f1e8e8;
  border-top: none;
  border-left: none;
  .delete-btn{
    color: #F56C6C;
  }
}
.logo-wrapper{
  position: relative;
  height: 42px;
  background: #fff;
  border-bottom: 1px solid #f1e8e8;
  box-sizing: border-box;
}
.logo{
  position: absolute;
  left: 12px;
  top: 6px;
  line-height: 30px;
  color: #00afff;
  font-weight: 600;
  font-size: 17px;
  white-space: nowrap;
  > img{
    width: 30px;
    height: 30px;
    vertical-align: top;
  }
  .github{
    display: inline-block;
    vertical-align: sub;
    margin-left: 15px;
    > img{
      height: 22px;
    }
  }
}

.center-board-row {
  padding: 12px 12px 15px 12px;
  box-sizing: border-box;
  & > .el-form {
    // 69 = 12+15+42
    height: calc(100vh - 69px);
  }
}
.drawing-board {
  height: 100%;
  position: relative;
  .components-body {
    padding: 0;
    margin: 0;
    font-size: 0;
  }
  .sortable-ghost {
    position: relative;
    display: block;
    overflow: hidden;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 3px;
      background: rgb(89, 89, 223);
      z-index: 2;
    }
  }
  .components-item.sortable-ghost {
    width: 100%;
    height: 60px;
    background-color: $selectedColor;
  }
  .active-from-item {
    & > .el-form-item{
      background: $selectedColor;
      border-radius: 6px;
    }
    & > .drawing-item-copy, & > .drawing-item-delete{
      display: initial;
    }
    & > .component-name{
      color: $lighterBlue;
    }
  }
  .el-form-item{
    margin-bottom: 15px;
  }
}
.drawing-item{
  position: relative;
  cursor: move;
  &.unfocus-bordered:not(.active-from-item) > div:first-child {
    border: 1px dashed #ccc;
  }
  .el-form-item{
    padding: 12px 10px;
  }
}
.drawing-row-item{
  position: relative;
  cursor: move;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  border-radius: 3px;
  padding: 0 2px;
  margin-bottom: 15px;
  .drawing-row-item {
    margin-bottom: 2px;
  }
  .el-col{
    margin-top: 22px;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .drag-wrapper{
    min-height: 80px;
  }
  &.active-from-item{
    border: 1px dashed $lighterBlue;
  }
  .component-name{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #bbb;
    display: inline-block;
    padding: 0 6px;
  }
}
.drawing-item, .drawing-row-item{
  &:hover {
    & > .el-form-item{
      background: $selectedColor;
      border-radius: 6px;
    }
    & > .drawing-item-copy, & > .drawing-item-delete{
      display: initial;
    }
  }
  & > .drawing-item-copy, & > .drawing-item-delete{
    display: none;
    position: absolute;
    top: -10px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    border: 1px solid;
    cursor: pointer;
    z-index: 1;
  }
  & > .drawing-item-copy{
    right: 56px;
    border-color: $lighterBlue;
    color: $lighterBlue;
    background: #fff;
    &:hover{
      background: $lighterBlue;
      color: #fff;
    }
  }
  & > .drawing-item-delete{
    right: 24px;
    border-color: #F56C6C;
    color: #F56C6C;
    background: #fff;
    &:hover{
      background: #F56C6C;
      color: #fff;
    }
  }
}

</style>