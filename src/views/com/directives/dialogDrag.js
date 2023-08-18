let dragDom;
let isFullScreen;
let reactiveParam;
let dialogHeaderEl;
//当前宽高
let nowWidth = 0;
let nowHight = 0;
//当前顶部高度
let nowMarginTop = 0;
let moveDown;
export default {
  install(Vue, vm) {
    // 对象全局自定义指令
    Vue.directive('dialogDrag', {
      bind(el, binding, vnode, oldVnode) {
        // 使用Vue.observable将参数转换为响应式对象
        reactiveParam = Vue.observable(binding.value);
        //弹框可拉伸最小宽高
        let minWidth = 400;
        let minHeight = 300;
        //初始非全屏
        isFullScreen = reactiveParam.fullscreenMode;


        //获取弹框头部（这部分可双击全屏）
        dialogHeaderEl = el.querySelector('.el-dialog__header');
        //弹窗
        dragDom = el.querySelector('.el-dialog');
        //给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
        dragDom.style.overflow = 'auto';
        //清除选择头部文字效果
        dialogHeaderEl.onselectstart = new Function('return false');
        //头部加上可拖动cursor
        dialogHeaderEl.style.cursor = 'move';

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        moveDown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft;
          const disY = e.clientY - dialogHeaderEl.offsetTop;
          const screenWidth = document.body.clientWidth; // body当前宽度
          const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

          const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
          const dragDomheight = dragDom.offsetHeight; // 对话框高度

          const minDragDomLeft = dragDom.offsetLeft;
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

          const minDragDomTop = dragDom.offsetTop;
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

          // 获取到的值带px 正则匹配替换
          let styL, styT;

          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (sty.left.includes('%')) {
            styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
            styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
          } else {
            styL = +sty.left.replace(/\px/g, '');
            styT = +sty.top.replace(/\px/g, '');
          }

          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let l = e.clientX - disX;
            let t = e.clientY - disY;
            if (-l > minDragDomLeft) {
              l = -minDragDomLeft;
            } else if (l > maxDragDomLeft) {
              l = maxDragDomLeft;
            }

            if (-t > minDragDomTop) {
              t = -minDragDomTop;
            } else if (t > maxDragDomTop) {
              t = maxDragDomTop;
            }

            // 移动当前元素
            dragDom.style.left = `${l + styL}px`;
            dragDom.style.top = `${t + styT}px`;

            //将此时的位置传出去
            //binding.value({x:e.pageX,y:e.pageY})
          };

          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
        dialogHeaderEl.onmousedown = moveDown;
        //双击头部效果
        // dialogHeaderEl.ondblclick = (e) => {
        //   if (isFullScreen == false) {
        //     nowHight = dragDom.clientHeight;
        //     nowWidth = dragDom.clientWidth;
        //     nowMarginTop = dragDom.style.marginTop;
        //     dragDom.style.left = 0;
        //     dragDom.style.top = 0;
        //     dragDom.style.height = '100%';
        //     dragDom.style.width = '100%';
        //     dragDom.style.marginTop = 0;
        //     dragDom.style.marginBottom = 0;
        //     isFullScreen = true;
        //     reactiveParam = true;
        //     dialogHeaderEl.style.cursor = 'initial';
        //     dialogHeaderEl.onmousedown = null;
        //   } else {
        //     dragDom.style.height = 'auto';
        //     dragDom.style.width = nowWidth + 'px';
        //     dragDom.style.marginTop = nowMarginTop;
        //     dragDom.style.marginBottom = 0;
        //     isFullScreen = false;
        //     reactiveParam = false;
        //     dialogHeaderEl.style.cursor = 'move';
        //     dialogHeaderEl.onmousedown = moveDown;
        //   }
        // };

        //拉伸
        let resizeEl = document.createElement('div');
        dragDom.appendChild(resizeEl);
        //在弹窗右下角加上一个10-10px的控制块
        resizeEl.style.cursor = 'se-resize';
        resizeEl.style.position = 'absolute';
        resizeEl.style.height = '10px';
        resizeEl.style.width = '10px';
        resizeEl.style.right = '0px';
        resizeEl.style.bottom = '0px';
        //鼠标拉伸弹窗
        resizeEl.onmousedown = (e) => {
          // 记录初始x位置
          const clientX = e.clientX;
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - resizeEl.offsetLeft;
          const disY = e.clientY - resizeEl.offsetTop;

          document.onmousemove = function (e) {
            e.preventDefault(); // 移动时禁用默认事件

            // 通过事件委托，计算移动的距离
            const x = e.clientX - disX + (e.clientX - clientX); //这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
            const y = e.clientY - disY;
            //比较是否小于最小宽高
            dragDom.style.width = x > minWidth ? `${x}px` : minWidth + 'px';
            dragDom.style.height = y > minHeight ? `${y}px` : minHeight + 'px';
          };
          //拉伸结束
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
      update(el, binding) {
        const newParam = binding.value;
        const oldParam = binding.oldValue;
        // 在update钩子中检测值的变化，类似于watch的立即触发
        if (newParam !== oldParam) {
          if (newParam) {
            nowHight = dragDom.clientHeight;
            nowWidth = dragDom.clientWidth;
            nowMarginTop = dragDom.style.marginTop;
            dragDom.style.left = 0;
            dragDom.style.top = 0;
            dragDom.style.height = '100%';
            dragDom.style.width = '100%';
            dragDom.style.marginTop = 0;
            dragDom.style.marginBottom = 0;
            isFullScreen = true;
            reactiveParam = true;
            dialogHeaderEl.style.cursor = 'initial';
            dialogHeaderEl.onmousedown = null;
          } else {
            dragDom.style.height = 'auto';
            dragDom.style.width = nowWidth + 'px';
            dragDom.style.marginTop = nowMarginTop;
            dragDom.style.marginBottom = 0;
            isFullScreen = false;
            reactiveParam = false;
            dialogHeaderEl.style.cursor = 'move';
            dialogHeaderEl.onmousedown = moveDown;
          }
        }
      }
    });

  }
}

