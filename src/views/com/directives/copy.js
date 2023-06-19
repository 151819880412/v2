/**
 * 局部自定义copy指令，通过ref获取元素并复制<span ref="aaa">1</span> <div v-copy="'aaa'"> 单击复制 </div>
 * 也可以将ref改成document.getElementById
 * @author  
 * @date 2023-06-17
 * @param {any} el
 * @param {any} binding
 * @param {any} vnode
 * @returns {any}
 */
import { Message } from 'element-ui';
export default {
  bind(el, binding, vnode) {
    el.addEventListener('click', () => {
      const target = vnode.context.$refs[binding.value];
      if (target) {
        try {
          if (target.select) {
            target.select();
            document.execCommand('copy');
          } else {
            const range = document.createRange();
            range.selectNode(target);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            Message.success('复制成功');
          }
        } catch (error) {
          Message.error('复制失败');
        }
      }
    });
  }
};