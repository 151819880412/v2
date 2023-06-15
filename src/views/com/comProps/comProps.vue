<template>
  <div class='comProps'>
    <h1 class="title">
      父子组件传参
    </h1>
    <h3>EventBusValue：{{ EventBusValue }}</h3>
    <h3>vuex：{{ num }}</h3>
    <h3>localStorage：{{ testNum }}</h3>
    <el-button @click="changeMsgCopy">父通过$children直接修改组件间的msgCopy</el-button>
    <el-button @click="changeMsgCopy2">父通过ref直接修改组件间的msgCopy</el-button>
    <div class="box">
      <Children :msg.sync="msg" @changeMsg="parentChangeMsg" ref="childrenRef" v-model="value1" />
      <Children2 :msgObject.sync="msgObject" @changeMsgObject="parentChangeMsgObject" ref="childrenRef"
        v-model="value2" />
      <!-- 
        $attrs/$listeners
        $attrs包含父组件传给子组件中没有被子组件props声明的属性
        $listeners包含父组件传递给子组件的所有事件
       -->
      <Children3 a="aaa" b="bbb" c="ccc" parentProps="被父组件使用的props" grandsonProps="被孙组件使用的props"
        @customEvent="handleCustomEvent" />
    </div>
    <el-divider></el-divider>
    <h1 class="title">
      路由传参代码参考 testRouter.js
    </h1>
    <el-divider></el-divider>
  </div>
</template>
<script>
import Children from './children.vue';
import Children2 from './children2.vue';
import Children3 from './children3.vue';
import EventBus from '@/utils/EventBus';
import { mapGetters } from 'vuex';

export default {
  name: 'comProps',
  props: {},
  provide: {
    grandson3Props: '传递给grandson3的参数'
  },
  data() {
    return {
      // 子组件1
      msg: "父向子传基本数据类型的参数",
      value1: "父组件v-model传值1111111",
      value2: "父组件v-model传值2222222",
      EventBusValue: "",
      // 子组件2
      msgObject: {
        msg: "父向子传引用数据类型的参数"
      },
      testNum: ""
    };
  },
  created() {
    console.log('执行顺序comProps--created');

    window.addEventListener('storage', (event) => {
      if (event.key == 'testNum') {
        this.testNum = event.newValue;
      }
    });
  },
  mounted() {
    console.log('执行顺序comProps--mounted');
    console.log(`%c
    挂载阶段
    执行顺序为：
    父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
    更新阶段
    执行顺序为：
    父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
    销毁阶段
    执行顺序为：
    父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed`, 'color: red');
    // 只会执行一次
    EventBus.$once('eventBus', data => {
      this.EventBusValue = data;
    });

  },
  computed: {
    ...mapGetters({
      num: 'getComProps',
    }),
  },
  methods: {
    parentChangeMsg(val) {
      this.msg = val;
    },
    parentChangeMsgObject(val) {
      // 直接赋值的话引用关系又被切断了
      // this.msgObject 指向changeMsgByEmit方法里的对象。msgObjectCopy还是初始化的时候指向msgObject的对象
      // this.msgObject = val;

      // 改变对象中的具体某个属性不会改变这个对象的引用关系,所以还是响应式的
      this.msgObject.msg = val.msg;
      this.msgObject.addMsg = undefined;
    },
    changeMsgCopy() {
      // 不推荐，因为顺序可能会改变，子组件会有很多个，要找到对应的子组件修改
      this.$children[2].msgCopy = '父通过$children直接修改组件间的msgCopy';
    },
    changeMsgCopy2() {
      // childrenRef只会有一个,先渲染的ref组件生效
      this.$refs.childrenRef.msgCopy = '父通过ref直接修改组件间的msgCopy';
    },
    handleCustomEvent(val) {
      console.log(val);
    }
  },
  watch: {},
  components: {
    Children,
    Children2,
    Children3,
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
.title{
  font-size: 3rem
}
.box{
  // border: 1px solid black
  margin-top: 6px
}
</style>