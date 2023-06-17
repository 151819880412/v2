/**
 * 相当于共用的util方法,每个mixin都是独立的
 * 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
 * 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
 * 还可以使用全局混入 Vue.mixin()
 * @author  
 * @date 2023-06-17
 * @returns {any}
 */

export default {
  data() {
    return {
      obj: {
        msg: "mixin"
      }
    };
  },
  created() {
    console.log('mixin--created--');
  },
  mounted() {
    console.log('mixin--mounted--');
  },
  computed: {},
  methods: {
    getData() {
      console.log(this.obj.msg);
    },
    setData() {
      this.obj.msg += 1;
      console.log(this.obj.msg);
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
