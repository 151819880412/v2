<template>
  <div class='children2'>
    <h2>children2</h2>
    <h3>msgObject的值：{{ msgObject.msg }}</h3>
    <h3>msgObject新增属性的值：{{ msgObject.addMsg }}</h3>
    <h3>msgObjectCopy的值{{ msgObjectCopy }}</h3>
    <slot name="header" v-bind="headerProps"></slot>
    <slot name="content" v-bind="contentProps"></slot>
    <!-- 只能用于父子组件传参 -->
    <h3>v-model:{{ value }}</h3><!-- 一般在封装表单组件的时候使用 -->
    <el-button @click="changeMsgByEmit">子向父emit传参</el-button>
    <el-button @click="changetProps">子直接修改props</el-button>
    <el-button @click="changetPropsCopy">子直接修改propsCopy</el-button>
    <el-button @click="changetParent">子通过$parent直接修改父组件的参数</el-button>
    <el-button @click="changetByUpdate">子通过update直接修改父组件的参数</el-button>
    <el-button @click="changetByInput">子通过input直接修改父组件的参数</el-button>
    <!-- 可以跨组件传参 -->
    <el-button @click="eventBus">事件总线传参</el-button>
    <el-button @click="toVuex">vuex传参++</el-button>
    <!-- 只有在新开的窗口点击才会触发(需要在两个窗口观察) -->
    <el-button @click="toLocalStorage">localStorage传参++</el-button>

  </div>
</template>
<script>
import EventBus from '@/utils/EventBus';
export default {
  name: 'children2',
  props: {
    msgObject: {
      type: Object,
      default: () => {
        return {
          msg: "msgObject默认值"
        };
      }
    },
    // 只能用value接收
    value: {
      type: String,
      default: () => {
        return "value默认值";
      }
    },
  },
  data() {
    return {
      headerProps: {
        title: 'slot+name传参headerProps'
      },
      contentProps: {
        message: 'slot+name传参contentProps'
      },
      eventBusNum: 0,
      // 页面初始化的时候执行一次,引用了第一次传入的参数
      msgObjectCopy: this.msgObject,
      testNum: 0,
    };
  },
  created() {
    console.log('执行顺序children2--created');
  },
  mounted() {
    console.log('执行顺序children2--mounted');
  },
  computed: {},
  methods: {
    changeMsgByEmit() {
      this.$emit("changeMsgObject", {
        msg: "子向父组件传值：emit-------------------------"
      });
    },
    changetProps() {
      // 直接修改会报错，因为违反了单向数据流
      // this.msgObject = {
      //   msg:'123'
      // }

      // 可以修改对象上的属性
      this.msgObject.msg = '可以修改对象上的属性';

      // 单独添加属性的时候不会触发视图更新,因为新加的属性没有数据劫持,也没有添加对应的消息订阅发布者机制
      // 只有原有属性更新时触发了视图更新的同时顺带也把新添加的属性更新了
      this.msgObject.addMsg = '给对象上新增属性';
    },
    changetPropsCopy() {
      // 重新赋值切断了引用关系,导致msgObjectCopy指向的还是旧的地址,新msgObject的值改变的时候msgObjectCopy不会跟着改变
      // 重新赋值前:msgObjectCopy --> 父组件的msgObject
      // 重新赋值后:msgObjectCopy --> 赋值后的新对象(给data中的属性重新赋值的同时--还会通过observe方法去判断这个新值是否是对象，而且是否已经有响应式初始化。如果没有，重新对其进行响应式初始化。)
      // this.msgObjectCopy = {
      //   msg : '可以任意修改的值',
      //   addMsg : '可以任意修改的值'
      // }

      this.msgObjectCopy.msg = '可以任意修改的值';
      this.msgObjectCopy.addMsg = '可以任意修改的值';
    },
    changetParent() {
      // 重新赋值切断了引用关系,导致msgObjectCopy指向的还是旧的地址,新msgObject的值改变的时候msgObjectCopy不会跟着改变
      // this.$parent.msgObject = {
      //   msg:'子通过$parent直接修改父组件的参数'
      // }
      this.$parent.msgObject.msg = '子通过$parent直接修改父组件的参数';
      // 等同于 this.$options.parent
    },
    changetByUpdate() {
      // 父组件需要加sync修饰符才会生效    :msg.sync="msg"
      this.$emit('update:msgObject', {
        msg: '子通过update直接修改父组件的参数'
      });
    },
    changetByInput() {
      this.$emit('input', '子组件value');
    },
    eventBus() {
      this.eventBusNum += 1;
      EventBus.$emit('eventBus', `eventBus参数${this.eventBusNum}`);
    },
    toVuex() {
      this.$store.dispatch('setComProps', 1);
    },
    toLocalStorage() {
      this.testNum += 1;
      localStorage.setItem('testNum', this.testNum);
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
.children2{
  margin-top:24px  
}
h2{
  font-size: 2.5rem
}
h3{
  margin:6px 0
}
</style>