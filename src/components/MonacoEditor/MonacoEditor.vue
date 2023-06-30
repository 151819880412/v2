<template>
  <div id="monaco-editor-box">
    <div id="monaco-editor" ref="monacoEditor" />
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution' // 代码高亮

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
          fontSize: 32, // 字体大小
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
        theme: "vs-dark", // 主题
        value: "", // 默认显示的值
        language: "vue",
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

      // 定义 Vue 语言的词法分析器
      const languageDefinition = {
        tokenizer: {
          root: [
            // 定义词法规则
            [/\<\!\-\-/, 'comment', '@comment'], // HTML 注释
            [/\{\{/, 'delimiter', '@interpolation'], // Vue 插值表达式的开始
            [/[\{\}]/, 'delimiter'], // Vue 插值表达式的结束
            [/\<\/?template/, 'tag'], // Vue 模板标签
            [/\<\/?script/, { token: 'tag', next: '@script' }], // Vue <script> 标签
            [/\<\/?style/, { token: 'tag', next: '@style' }], // Vue <style> 标签
            [/[a-zA-Z_][\w\-\:\.]*/, {
              cases: {
                // '@keywords': 'keyword', // Vue 关键字
                '@default': 'identifier' // Vue 标识符
              }
            }],
          ],
          comment: [
            [/[^<\-]+/, 'comment.content'],
            [/-->/, 'comment', '@pop'],
            [/<!--/, 'comment.content.invalid'],
            [/[<\-]/, 'comment.content'],
          ],
          interpolation: [
            [/\}\}/, 'delimiter', '@pop'],
            [/./, 'variable'],
          ],
          script: [
            [/\<\/script/, { token: '@rematch', next: '@pop' }],
            [/\<\/?template/, { token: '@rematch', next: '@pop' }],
            [/\{\{/, { token: '@rematch', next: '@pop' }],
            { include: 'javascript' }
          ],
          style: [
            [/\<\/style/, { token: '@rematch', next: '@pop' }],
            [/\<\/?template/, { token: '@rematch', next: '@pop' }],
            [/\{\{/, { token: '@rematch', next: '@pop' }],
            { include: 'css' }
          ],
          css: [
            [/[^{]+/, 'attribute.value'],
            [/\}/, 'delimiter', '@pop'],
            [/./, 'attribute.value'],
          ],
          javascript: [
            [/\<\/script/, { token: '@rematch', next: '@pop' }],
            [/\<\/?template/, { token: '@rematch', next: '@pop' }],
            [/\{\{/, { token: '@rematch', next: '@pop' }],
            // 其他 JavaScript 词法规则
            // ...
            // 常用的 JavaScript 关键字
            ['function', 'keyword'],
            ['if', 'keyword'],
            ['else', 'keyword'],
            ['for', 'keyword'],
            ['while', 'keyword'],
            ['var', 'keyword'],
            ['const', 'keyword'],
            ['let', 'keyword'],
            ['return', 'keyword'],
            // 常用的 JavaScript 内置对象和方法
            ['Math', 'identifier'],
            ['Array', 'identifier'],
            ['Object', 'identifier'],
            ['String', 'identifier'],
            ['parseInt', 'identifier'],
            ['setTimeout', 'identifier'],
            ['console', 'identifier'],
            // 其他自定义的标识符规则
            [/[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*/, 'identifier'],
          ],
        },
      };

      // 注册 Vue 语言
      monaco.languages.register({ id: 'vue' });

      // 设置 Vue 语言的词法分析器
      monaco.languages.setMonarchTokensProvider('vue', languageDefinition);

      // 设置 Vue 语言的特性和行为
      monaco.languages.setLanguageConfiguration('vue', {
        brackets: [['{', '}'], ['[', ']'], ['(', ')']],
        autoClosingPairs: [
          { open: '<', close: '>' },
          { open: "'", close: "'", notIn: ['string'] },
          { open: '"', close: '"', notIn: ['string'] },
        ],
        indentationRules: {
          increaseIndentPattern: /<(\w+)[^>]*>(?!<\/\1>|<!--\s*\[CDATA\[.*?\]\]-->)$/,
          decreaseIndentPattern: /^<\/(\w+)[^>]*>$/,
        },
      });
      // // 配置高亮显示
      // monaco.editor.defineTheme('vue-theme', {
      //   base: 'vs',
      //   inherit: true,
      //   rules: [
      //     { token: 'tag', foreground: 'blue' }, // 标签颜色为蓝色
      //     { token: 'expression', foreground: 'green' }, // 表达式颜色为绿色
      //     { token: 'string', foreground: 'red' }, // 字符串颜色为红色
      //   ],
      // });
      // 设置 Monaco Editor 的语言
      this.editor.getModel().setMode('vue');
      // monaco.editor.setTheme('vue-theme');
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