<template>
  <div>
    <!-- 侧边抽屉 -->
    <el-drawer v-bind="$attrs" v-on="$listeners" @opened="onOpen" @close="onClose">
      <!-- 操作栏 -->
      <div class="action-bar" :style="{ 'text-align': 'left' }">
        <!-- 刷新按钮 -->
        <span class="bar-btn" @click="refresh">
          <i class="el-icon-refresh" />
          刷新
        </span>
        <!-- 复制JSON按钮 -->
        <span ref="copyBtn" class="bar-btn copy-json-btn">
          <i class="el-icon-document-copy" />
          复制JSON
        </span>
        <!-- 导出JSON文件按钮 -->
        <span class="bar-btn" @click="exportJsonFile">
          <i class="el-icon-download" />
          导出JSON文件
        </span>
        <!-- 关闭按钮 -->
        <span class="bar-btn delete-btn" @click="$emit('update:visible', false)">
          <i class="el-icon-circle-close" />
          关闭
        </span>
      </div>
      <!-- JSON编辑器 -->
      <div id="editorJson" class="json-editor" />
    </el-drawer>
  </div>
</template>

<script>
import { beautifierConf } from '@/utils/generator/index';
import ClipboardJS from '@/plugs/clipboard.min';
import beautifier from '@/plugs/beautifier.min';
import * as monaco from 'monaco-editor';

export default {
  components: {},
  props: {
    jsonStr: {
      type: String,
      required: true
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // 监听键盘事件以阻止默认的保存快捷键
    window.addEventListener('keydown', this.preventDefaultSave);
    // 初始化剪贴板功能
    const clipboard = new ClipboardJS('.copy-json-btn', {
      text: trigger => {
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        });
        return this.beautifierJson;
      }
    });
    clipboard.on('error', e => {
      this.$message.error('代码复制失败');
    });
  },
  beforeDestroy() {
    // 移除键盘事件监听
    window.removeEventListener('keydown', this.preventDefaultSave);
  },
  methods: {
    // 阻止默认的保存快捷键
    preventDefaultSave(e) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    },
    // 抽屉打开时的处理逻辑
    onOpen() {
      this.beautifierJson = beautifier.js(this.jsonStr, beautifierConf.js);
      this.setEditorValue('editorJson', this.beautifierJson);
    },
    // 抽屉关闭时的处理逻辑
    onClose() {
      // 销毁Monaco Editor实例及相关资源
      this.jsonEditor = undefined;
      monaco.editor.getModels().forEach(model => model.dispose());
    },
    // 设置Monaco Editor的内容
    setEditorValue(id, codeStr) {
      if (this.jsonEditor) {
        this.jsonEditor.setValue(codeStr);
      } else {
        this.jsonEditor = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: 'json',
          automaticLayout: true
        });
        // 监听快捷键事件
        this.jsonEditor.onKeyDown(e => {
          if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
            this.refresh();
          }
        });
      }
    },
    // 导出JSON文件
    exportJsonFile() {
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.json`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then(({ value }) => {
        if (!value) value = `${+new Date()}.json`;
        const codeStr = this.jsonEditor.getValue();
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
        // 创建一个 URL 对象
        const url = URL.createObjectURL(blob);
        // 创建一个下载链接
        const link = document.createElement('a');
        link.href = url;
        link.download = value;
        // 触发点击事件，开始下载
        link.click();
        // 释放 URL 对象
        URL.revokeObjectURL(url);
      }).catch(err => {
        console.error(err);
      });
    },
    // 刷新JSON
    refresh() {
      try {
        this.$emit('refresh', JSON.parse(this.jsonEditor.getValue()));
      } catch (error) {
        this.$notify({
          title: '错误',
          message: 'JSON格式错误，请检查',
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  /* 操作栏样式 */
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

  /* 隐藏抽屉的头部 */
  ::v-deep .el-drawer__header {
    display: none;
  }

  /* JSON编辑器样式 */
  .json-editor{
    height: calc(100vh - 33px);
  }
</style>
