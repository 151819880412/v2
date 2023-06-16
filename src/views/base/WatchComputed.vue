<template>
  <div class='WatchComputed'>
    <h3>
      <el-button @click="toWatchStr">watchStr</el-button>
      {{ watchStr }}
    </h3>
    <h3>
      <el-button @click="toWatchObj">watchObj</el-button>
      {{ watchObj.watchObjStr }}
    </h3>
    <h3>
      <el-button @click="toWatchList">watchList</el-button>
      {{ watchList }}
    </h3>
    <h3>
      <el-button @click="getNow">getNow</el-button>
      {{ now }}
    </h3>
    <el-divider></el-divider>
    <h1>练习</h1>
    <h3>全名1：{{ fullName1 }}</h3>
    <h3>姓：<el-input v-model="firstName1" style="width:300px"></el-input></h3>
    <h3>名：<el-input v-model="lastName1" style="width:300px"></el-input></h3>
    <!-- <h3>全名2：{{ fullName2 }}</h3> -->
    <h3>全名2：<el-input v-model="fullName2" style="width:300px"></el-input></h3>
    <h3>姓：<el-input v-model="firstName2" style="width:300px"></el-input></h3>
    <h3>名：<el-input v-model="lastName2" style="width:300px"></el-input></h3>
  </div>
</template>
<script>
export default {
  name: 'WatchComputed',
  props: {},
  data() {
    return {
      // 用于取消监听
      unwatch: null,
      watchStr: "watchStr",
      watchObj: {
        watchObjStr: "watchObjStr"
      },
      watchList: [0],
      fullName1: "",
      firstName1: "",
      lastName1: "",
      firstName2: "",
      lastName2: "",
    };
  },
  created() { },
  mounted() {
    // 两种写法都行
    this.unwatch = this.$watch('watchStr', (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });
  },
  computed: {
    now: () => {
      // 最终结果没有依赖项的时候会有缓存
      return Date.now();
    },
    fullName2: {
      // getter
      get: function () {
        // 当依赖改变的时候最终结果也会改变
        return this.firstName2 + ' ' + this.lastName2;
      },
      // setter
      set: function (newValue) {
        console.log(newValue);
        var names = newValue.split(' ');
        this.firstName2 = names[0];
        this.lastName2 = names[names.length - 1];
      }
    }

  },
  methods: {
    toWatchStr() {
      this.watchStr += '1';
      if (this.watchStr.length == 15) {
        this.unwatch();
      }
    },
    toWatchObj() {
      this.watchObj.watchObjStr += 1;
    },
    toWatchList() {
      // 会触发watch
      // this.watchList = 1
      this.watchList.push(1);
      // 不发触发watch
      // this.watchList[0]+=1
    },
    getNow() {
      console.log(this.now);
    }
  },
  watch: {
    // 两种写法都行
    // watchStr:(newValue,oldValue)=>{
    //   console.log(newValue,oldValue)
    // },

    // 两种写法监听对象的某个属性
    // 'watchObj.watchObjStr':(newValue,oldValue)=>{
    //   console.log(newValue,oldValue)
    // },
    // 两种写法监听对象的某个属性
    // 'watchObj.watchObjStr':{
    //   handler : (a,b)=>{
    //     console.log(a,b)
    //   }
    // },

    watchObj: {
      handler: (a, b) => {
        console.log(a, b);
      },
      // 深度监听
      deep: true,
      // 是否在组件创建时立即触发一次操作
      immediate: true
    },

    watchList: {
      handler: (a, b) => {
        console.log(a, b);
      },
      // 深度监听
      deep: true,
      // 是否在组件创建时立即触发一次操作
      immediate: true
    },

    // 练习
    firstName1() {
      this.fullName1 = this.firstName1 + this.lastName1;
    },
    lastName1() {
      this.fullName1 = this.firstName1 + this.lastName1;
    },

  },
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
h1{
  font-size: 3rem
}

</style>