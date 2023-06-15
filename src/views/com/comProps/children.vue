<template>
  <div class='children'>
    <h2>children1</h2>
    <h3>父组件传的值：{{ msg }}</h3>
    <h3>msgCopy：{{ msgCopy }}</h3>
    <!-- 一般在封装表单组件的时候使用 -->
    <h3>v-model：{{ value }}</h3>
    <h3>EventBusValue：{{ EventBusValue }}</h3>
    <h3>vuex：{{ num }}</h3>
    <el-button @click="changeMsgByEmit">子向父emit传参</el-button>
    <el-button @click="changetProps">子直接修改props</el-button>
    <el-button @click="changetParent">子通过$parent直接修改父组件的参数</el-button>
    <el-button @click="changetByUpdate">子通过update直接修改父组件的参数</el-button>
    <el-button @click="changetByInput">子通过input直接修改父组件的参数</el-button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import EventBus from '@/utils/EventBus';
export default {
  name: 'children',
  props: {
    msg: {
      type: String,
      // required: true,
      default: () => {
        return "msg默认值";
      }
    },
    // 只能用value接收
    value: {
      type: String,
      default: () => {
        return "value默认值";
      }
    }
  },
  data() {
    return {
      // 页面初始化的时候执行一次,copy了第一次传入的参数
      msgCopy: this.msg,
      EventBusValue: ""
    };
  },
  created() {
    console.log('执行顺序children--created');
  },
  mounted() {
    console.log('执行顺序children--mounted');
    // 会执行多次
    EventBus.$on('eventBus', data => {
      this.EventBusValue = data;
      if (data[data.length - 1] == 5) {
        // 关闭事件总线
        EventBus.$off('eventBus');
      }
    });
  },
  computed: {
    ...mapGetters({
      num: 'getComProps',
    }),
  },
  methods: {
    changeMsgByEmit() {
      this.msgCopy = '可以任意修改的值';
      this.$emit("changeMsg", "子向父组件传值：emit-------------------------");
    },
    changetProps() {
      // 直接修改会报错，因为违反了单向数据流
      this.msg = '123';
    },
    changetParent() {
      this.$parent.msg = '子通过$parent直接修改父组件的参数';
      // 等同于 this.$options.parent
    },
    changetByUpdate() {
      // 父组件需要加sync修饰符才会生效    :msg.sync="msg"
      this.$emit('update:msg', '子通过update直接修改父组件的参数');
    },
    changetByInput() {
      this.$emit('input', '子组件value');
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
h2{
  font-size: 2.5rem
}
h3{
  margin:6px 0
}
</style>