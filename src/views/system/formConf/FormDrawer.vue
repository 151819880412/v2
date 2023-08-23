<template>
  <div>
    <!-- 侧边抽屉，绑定属性和事件 -->
    <el-drawer v-bind="$attrs" v-on="$listeners" @opened="onOpen" @close="onClose">
      <div style="height:100%">
        <el-row style="height:100%;overflow:auto">
          <!-- 左侧编辑器栏 -->
          <el-col :md="24" :lg="12" class="left-editor">
            <!-- 资源引用设置按钮 -->
            <!-- <div class="setting" title="资源引用" @click="showResource">
              <el-badge :is-dot="!!resources.length" class="item">
                <i class="el-icon-setting" />
              </el-badge>
            </div> -->
            <!-- 编辑器选项卡 -->
            <el-tabs v-model="activeTab" type="card" class="editor-tabs">
              <el-tab-pane name="html">
                <span slot="label">
                  <i v-if="activeTab === 'html'" class="el-icon-edit" />
                  <i v-else class="el-icon-document" />
                  模板
                </span>
              </el-tab-pane>
              <el-tab-pane name="js">
                <span slot="label">
                  <i v-if="activeTab === 'js'" class="el-icon-edit" />
                  <i v-else class="el-icon-document" />
                  脚本
                </span>
              </el-tab-pane>
              <el-tab-pane name="css">
                <span slot="label">
                  <i v-if="activeTab === 'css'" class="el-icon-edit" />
                  <i v-else class="el-icon-document" />
                  样式
                </span>
              </el-tab-pane>
            </el-tabs>
            <!-- 编辑器内容 -->
            <div v-show="activeTab === 'html'" id="editorHtml" class="tab-editor" />
            <div v-show="activeTab === 'js'" id="editorJs" class="tab-editor" />
            <div v-show="activeTab === 'css'" id="editorCss" class="tab-editor" />
          </el-col>
          <!-- 右侧预览窗口 -->
          <el-col :md="24" :lg="12" class="right-preview">
            <!-- 功能操作栏 -->
            <div class="action-bar" :style="{ 'text-align': 'left' }">
              <span class="bar-btn" @click="runCode">
                <i class="el-icon-refresh" />
                刷新
              </span>
              <span class="bar-btn" @click="exportFile">
                <i class="el-icon-download" />
                导出vue文件
              </span>
              <span ref="copyBtn" class="bar-btn copy-btn">
                <i class="el-icon-document-copy" />
                复制代码
              </span>
              <span class="bar-btn delete-btn" @click="$emit('update:visible', false)">
                <i class="el-icon-circle-close" />
                关闭
              </span>
            </div>
            <!-- 预览组件 -->
            <component :is="dynamicComponent" v-show="isIframeLoaded" ref="preview"></component>
            <div v-show="!isIframeLoaded" v-loading="true" class="result-wrapper" />
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <!-- 资源引用对话框 -->
    <resource-dialog :visible.sync="resourceVisible" :origin-resource="resources" @save="setResource" />
  </div>
</template>
<script>
import { parse } from '@babel/parser';
import ClipboardJS from '@/plugs/clipboard.min';
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html';
import { makeUpJs } from '@/components/generator/js';
import { makeUpCss } from '@/components/generator/css';
import { exportDefault, beautifierConf, titleCase } from '@/utils/generator/index';
import ResourceDialog from './ResourceDialog';
import * as monaco from 'monaco-editor';
import beautifier from '@/plugs/beautifier.min';
import Vue from 'vue';


const editorObj = {
  html: null,
  js: null,
  css: null
};
const mode = {
  html: 'html',
  js: 'javascript',
  css: 'stylus'
};

export default {
  components: { ResourceDialog },  // 引入 ResourceDialog 组件
  props: ['formData', 'generateConf'],  // 接收外部传递的 props 数据
  data() {
    return {
      activeTab: 'html',  // 当前选中的标签页，默认为 'html'
      htmlCode: '',  // 存放 HTML 代码
      jsCode: '',  // 存放 JavaScript 代码
      cssCode: '',  // 存放 CSS 代码
      codeFrame: '',  // 存放代码框架
      isIframeLoaded: false,  // 是否加载了 iframe
      isInitcode: false,  // 用于控制初始化代码
      isRefreshCode: false,  // 是否需要刷新代码
      resourceVisible: false,  // 是否显示资源对话框
      scripts: [],  // 存放脚本链接
      links: [],  // 存放样式链接
      monaco: null,  // Monaco 编辑器对象
      dynamicComponent: null,  // 存放动态生成的组件
    };
  },
  computed: {
    resources() {
      return this.scripts.concat(this.links);  // 返回合并后的脚本和样式链接
    }
  },
  watch: {},
  created() {
    // 在组件创建时执行的逻辑
  },
  mounted() {
    // 在组件挂载到 DOM 后执行的逻辑
    window.addEventListener('keydown', this.preventDefaultSave);  // 监听键盘事件，阻止保存快捷键
    const clipboard = new ClipboardJS('.copy-btn', {
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
  beforeDestroy() {
    // 在组件销毁前执行的逻辑
    window.removeEventListener('keydown', this.preventDefaultSave);  // 移除键盘事件监听
  },
  methods: {
    preventDefaultSave(e) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();  // 阻止默认的保存操作
      }
    },
    onOpen() {
      // 在打开时执行的逻辑
      const { type } = this.generateConf;  // 获取生成配置中的 type
      this.htmlCode = makeUpHtml(this.formData, type);  // 根据 formData 和 type 生成 HTML 代码
      this.jsCode = makeUpJs(this.formData, type);  // 根据 formData 和 type 生成 JavaScript 代码
      this.cssCode = makeUpCss(this.formData);  // 根据 formData 生成 CSS 代码

      // 格式化生成的代码
      this.htmlCode = beautifier.html(this.htmlCode, beautifierConf.html);
      this.jsCode = beautifier.js(this.jsCode, beautifierConf.js);
      this.cssCode = beautifier.css(this.cssCode, beautifierConf.html);

      // 设置编辑器的值
      this.setEditorValue('editorHtml', 'html', this.htmlCode);
      this.setEditorValue('editorJs', 'js', this.jsCode);
      this.setEditorValue('editorCss', 'css', this.cssCode);

      // 判断是否需要初始化代码
      if (!this.isInitcode) {
        this.isRefreshCode = true;
        if (this.isIframeLoaded) {
          this.isInitcode = true;
          this.runCode();  // 执行运行代码逻辑
        }
      }
    },
    onClose() {
      this.isInitcode = false;  // 关闭时重置初始化标志
      this.isRefreshCode = false;  // 关闭时重置刷新标志
    },
    iframeLoad() {
      // iframe 加载完成时的逻辑
      if (!this.isInitcode) {
        this.isIframeLoaded = true;
        if (this.isRefreshCode) {
          this.isInitcode = true;
          this.runCode();  // 执行运行代码逻辑
        }
      }
    },
    setEditorValue(id, type, codeStr) {
      // 设置编辑器的值
      if (editorObj[type]) {
        editorObj[type].setValue(codeStr);
      } else {
        editorObj[type] = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: mode[type],
          automaticLayout: true
        });
      }
      // 监听 Ctrl + S 快捷键，刷新代码
      editorObj[type].onKeyDown(e => {
        if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
          this.runCode();  // 执行运行代码逻辑
        }
      });
      this.iframeLoad();  // iframe 加载完成时的逻辑
    },
    runCode() {
      // 运行代码逻辑
      const jsCodeStr = editorObj.js.getValue();  // 获取 JavaScript 代码
      try {
        const ast = parse(jsCodeStr, { sourceType: 'module' });  // 解析 JavaScript 代码
        const astBody = ast.program.body;

        // 判断是否为 ExportDefaultDeclaration 类型的代码
        if (astBody.length > 1) {
          this.$confirm(
            'js格式不能识别，仅支持修改export default的对象内容',
            '提示',
            {
              type: 'warning'
            }
          );
          return;
        }

        if (astBody[0].type === 'ExportDefaultDeclaration') {
          // 构建 postData 对象
          const postData = {
            type: 'refreshFrame',
            data: {
              generateConf: this.generateConf,
              html: editorObj.html.getValue(),
              js: jsCodeStr.replace(exportDefault, ''),
              css: editorObj.css.getValue(),
              scripts: this.scripts,
              links: this.links
            }
          };
          const {
            html,
            js,
            css
          } = postData.data;

          // 编译模板
          const compiled = Vue.compile(`<div class="app-container" ref="appContainer">${html}</div>`);

          // 构建动态组件
          const App = {
            ...eval(`(${js})`),
            render: compiled.render,
            staticRenderFns: compiled.staticRenderFns,
            style: css,
          };

          this.dynamicComponent = App;  // 设置动态组件

          setTimeout(() => {
            const style = document.createElement('style');
            style.textContent = `${css}`;  // 将 CSS 内容添加到 style 标签中
            this.$refs.preview.$refs.appContainer.appendChild(style);
          }, 0);

        } else {
          this.$message.error('请使用export default');
        }
      } catch (err) {
        this.$message.error(`js错误：${err}`);
        console.error(err);
      }
    },
    generateCode() {
      // 生成完整的代码字符串
      const html = vueTemplate(editorObj.html.getValue());  // 获取 HTML 代码
      const script = vueScript(editorObj.js.getValue());  // 获取 JavaScript 代码
      const css = cssStyle(editorObj.css.getValue());  // 获取 CSS 代码
      return beautifier.html(html + script + css, beautifierConf.html);  // 格式化并返回完整的代码
    },
    exportFile() {
      // 导出文件逻辑
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.vue`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then(({ value }) => {
        if (!value) value = `${+new Date()}.vue`;
        const codeStr = this.generateCode();  // 生成完整的代码字符串
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);  // 创建 URL 对象
        const link = document.createElement('a');  // 创建下载链接
        link.href = url;
        link.download = value;
        link.click();  // 触发点击事件，开始下载
        URL.revokeObjectURL(url);  // 释放 URL 对象
      });
    },
    showResource() {
      this.resourceVisible = true;  // 显示资源对话框
    },
    setResource(arr) {
      // 设置资源链接
      const scripts = [];
      const links = [];
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          if (item.endsWith('.css')) {
            links.push(item);  // 如果是样式链接，添加到 links 数组中
          } else {
            scripts.push(item);  // 如果是脚本链接，添加到 scripts 数组中
          }
        });
        this.scripts = scripts;  // 更新脚本链接数组
        this.links = links;  // 更新样式链接数组
      } else {
        this.scripts = [];
        this.links = [];
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

.tab-editor {
  position: absolute;
  top: 33px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
}
.left-editor {
  position: relative;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}
.setting{
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}
.right-preview {
  height: 100%;
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
.action-bar {
    height: 33px;
    background: #f2fafb;
    padding: 0 15px;
    box-sizing: border-box;
  
    .bar-btn {
      display: inline-block;
      padding: 0 6px;
      line-height: 32px;
      color: #8285f5;
      cursor: pointer;
      font-size: 14px;
      user-select: none;
      & i {
        font-size: 20px;
      }
      &:hover {
        color: #4348d4;
      }
    }
    .bar-btn + .bar-btn {
      margin-left: 8px;
    }
    .delete-btn {
      color: #f56c6c;
      &:hover {
        color: #ea0b30;
      }
    }
  }
::v-deep .el-drawer__header {
  display: none;
}
</style>
