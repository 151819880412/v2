<template>
  <div id="monaco-editor-box">
    <div id="monaco-editor" ref="monacoEditor" />
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
// import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
// // 核心命令，处理编辑器的基本操作，如剪切、复制、粘贴等
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
// // 查找和替换功能，包括查找、替换、查找下一个、查找上一个等操作
// import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
// // 鼠标悬停提示的功能，当鼠标悬停在代码上时，会显示相关的信息或注释
// import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
// // 代码建议的功能，当你输入代码时，会显示相关的建议和补全选项
// import 'monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter.js';
// // 单词高亮的功能，当你选中一个单词时，会自动高亮显示其他相同单词的位置
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';
// // JavaScript语言的支持，包括语法解析、关键字高亮等
// import 'monaco-editor/esm/vs/editor/editor.all.js';
// // Monaco Editor的主要代码文件，包含了编辑器的核心功能和模块
// import 'monaco-editor/esm/vs/editor/contrib/find/findWidget.css';
// // 样式化查找和替换功能的部件
// import 'monaco-editor/esm/vs/base/browser/ui/hover/hover.css';
// // 样式化悬停提示的部件
// import 'monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css';
// // 样式化代码建议的部件



export default {
  name: 'MonacoEditor',
  components: {},
  props: {
    // 编辑器支持的文本格式,自行在百度上搜索
    types: {
      type: String,
      default: 'json'
    },
    // 名称
    name: {
      type: String,
      default: 'test'
    },
    editorOptions: {
      type: Object,
      default: function () {
        return {
          mode: 'ace/mode/lua',
          theme: 'ace/theme/chrome',
          tabSize: 2,
          selectionStyle: 'text',
          // 拖动代码块
          dragEnabled: true,
          useWorker: true,
          // 自动缩进
          enableAutoIndent: true,
          // 显示行号
          showLineNumbers: true,
          useSoftTabs: true,
          // 渐变隐藏折叠按钮
          fadeFoldWidgets: true,
          // 输入边界
          showPrintMargin: false,
          // 高亮当前行
          highlightActiveLine: true,
          // 高亮选中词
          highlightSelectedWord: true,
          // 滚动动画
          autoScrollEditorIntoView: true,
          copyWithEmptySelection: true,
          // #region 启用自动完成和代码段
          // enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false, // 只读
          writeOnly: false,
          cursorStyle: 'line', // 光标样式
          automaticLayout: true, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 16, // 字体大小
          autoIndent: true // 自动布局
          // quickSuggestionsDelay: 500,   //代码提示延时
        };
      }
    },
    codes: {
      type: String,
      default: function () {
        return '';
      }
    }
  },
  data() {
    return {
      editor: null, // 文本编辑器
      isSave: true, // 文件改动状态，是否保存
      codeValue: null // 保存后的文本
    };
  },
  watch: {
    codes: function (newValue) {
      console.debug('Code editor: content change');
      if (this.editor) {
        if (newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue);
          this.editor.trigger(this.editor.getValue(), 'editor.action.formatDocument');
        }
      }
    }
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {

      const self = this;
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(self.$refs.monacoEditor, {
        ...this.editorOptions,
        theme: "vs-dark", // 主题
        value: "", // 默认显示的值
        language: "html",
        folding: true, // 是否折叠
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: "indentation", // 折叠方式  auto | indentation
        showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
        disableLayerHinting: true, // 等宽优化
        emptySelectionClipboard: false, // 空选择剪切板
        selectionClipboard: false, // 选择剪切板
        automaticLayout: true, // 自动布局
        codeLens: false, // 代码镜头
        scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
        colorDecorators: true, // 颜色装饰器
        accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
        lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
        lineNumbersMinChars: 5, // 行号最小字符   number
        enableSplitViewResizing: false,
        readOnly: false, //是否只读  取值 true | false
      });
      // self.$emit("onMounted", self.editor); //编辑器创建完成回调

      // 编辑器内容变化时的事件处理
      self.editor.onDidChangeModelContent(function (event) {
        // 编辑器内容changge事件
        self.codesCopy = self.editor.getValue();
        self.$emit('onCodeChange', self.editor.getValue(), event);
      });

      // ctrl + s 刷新
      this.editor.onKeyDown(e => {
        if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
          this.runCode()
        }
      })

    }
  }
};
</script>

<style scoped>
#monaco-editor {
  width: 100%;
  height: 600px;
}
</style>