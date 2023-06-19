
export default {
  inserted: function (el, binding, vNode) {
    const that = vNode.context;
    el.onmousedown = function (e) {
      const disX = e.clientX - el.parentNode.offsetWidth;
      const disY = e.clientY - el.parentNode.offsetHeight;
      let cptWidth, cptHeight;
      document.onmousemove = function (me) {
        cptWidth = me.clientX - disX;
        cptHeight = me.clientY - disY;
        cptWidth = cptWidth < 40 ? 40 : cptWidth;//限制最小缩放
        cptHeight = cptHeight < 40 ? 40 : cptHeight;
        el.parentNode.style.width = cptWidth + 'px';
        el.parentNode.style.height = cptHeight + 'px';
      };
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
      e.stopPropagation();
      return false;
    };
  },
};