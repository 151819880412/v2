<template>
  <div class='defineProperty'>
    <div style="display: flex; justify-content: center; align-items: center;">
      <el-image style="width: 600px; height: 300px" :src="url" :preview-src-list="srcList">
      </el-image>
      <el-image style="width: 600px; height: 300px" :src="url2" :preview-src-list="srcList">
      </el-image>
      <el-image style="width: 600px; height: 300px" :src="url3" :preview-src-list="srcList">
      </el-image>
    </div>
    <el-divider></el-divider>
    <h1>缺陷</h1>
    <h2>对象后续新增/删除的属性不会响应式</h2>
    <el-button @click="addObj">新增属性sex:{{ obj.sex }}</el-button>
    <el-button @click="editObj">编辑属性sex:{{ obj.name }}</el-button>
    <el-button @click="delObj">删除属性age:{{ obj.age }}</el-button>
    <h2>数组通过下标修改的属性不会响应式</h2>
    <el-button @click="editList">编辑下标0:{{ list[0] }}</el-button>
    <el-divider></el-divider>
    <h1>解决方案</h1>
    <el-button @click="update1">$set</el-button>
    <el-button @click="update2">直接赋值</el-button>
    <el-button @click="update3">强制组件重新渲染</el-button>

  </div>
</template>
<script>
export default {
  name: 'defineProperty',
  props: {},
  data() {
    return {
      url: require('@/assets/defineProperty.png'),
      url2: require('@/assets/defineProperty2.png'),
      url3: require('@/assets/defineProperty3.png'),
      srcList: [
        require('@/assets/defineProperty.png'),
        require('@/assets/defineProperty2.png'),
        require('@/assets/defineProperty3.png'),
      ],
      obj: {
        name: "姓名",
        age: 18
      },
      list: [0]
    };
  },
  created() { },
  mounted() {
  },
  computed: {},
  methods: {
    addObj() {
      this.obj.sex += '1';
    },
    editObj() {
      this.obj.name += 1;
    },
    delObj() {
      delete this.obj.age;
    },
    editList() {
      this.list[0] += 1;
    },
    update1() {
      this.$set(this.obj,'sex','男')
      this.$set(this.list,0,1)
    },
    update2() {
      this.list = [1,2,3]
    },
    update3() {
      this.$forceUpdate()
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};

/*
  1.初始化data  
      初始化data，让data响应式绑定
      首先拿到用户配置的data，可能为对象或函数，所以需要兼容一下，最终拿到的是一个data对象
      vue对data中的所有属性进行了数据劫持，用户访问data属性是通过vm.xxx，而不会vm.data.xxx，所以需要对每个属性代理一下，通过数据劫持将用户访问的数据代理到vm.data上
      然后就是observer观察data，需要先判断一下，data是否为对象，是对象就创建一个Observer的实例，不是返回，这个方法在递归观察有大用
      所以new Observer(data)主要为每个data属性进行遍历操作，并调用defineReactive来进行数据的劫持，这就是响应式原理的核心方法
      就是一个面向切面的一个思想，Object.defineProperty进行数据劫持，用户对数据的访问和修改，都会触发对应的get和set方法。
      首先可能当前data的属性值value又是一个对象，所以需要继续观察。然后给当前data key属性分配一个dep实例，用来依赖的搜集，后面再说依赖搜集的事。接着对属性的访问与修改操作进行劫持并侵入式重写
      get：加了个依赖搜集操作
      set：判断用户是否重复给当前属性设置相同值，防止页面重复更新，然后改变当前value，最后 dep.notify()通知对应的watcher执行
  2.依赖搜集器
      data里的每个属性都会有一个dep实例，用来搜集依赖，依赖就是watcher，用来处理数据变化引起的操作。
      Dep就挂了俩方法，addSubs就是用来搜集依赖的方法，notify方法就是执行每个依赖的update方法来更新视图。然后有定义俩全局方法，pushTarget用来存储当前的watcher，
          并将watcher添加到stack数组中；popTarget末尾删除一个watcher，然后Dep.target指向stack末尾的watcher，
      watcher就是组件更新的连接，会传多个参数，当为渲染watcher时，vm为当前组件实例，exprOrFn为更新组件的方法，创建实例的时候，将exprOrFn方法传给了实例的getter属性。
  3.初始渲染页面
      vue实例调用$mount来将组件渲染到页面上，初始data只是给每个data属性添加了一个空的dep和拦截的操作。
      调用$mount会为当前实例创建一个更新和渲染组件的updateComponent方法，然后给当前实例创建了一个渲染watcher，并将vm, updateComponent传给了Watcher类函数
      看下Watcher函数，new watcher实例时，会默认调用this.get()
      先调用的dep文件定义的pushTarget方法，将当前watcher push到stack数组中存起来，并赋给了Dep.target，所以当前的Dep.target就是这个渲染watcher。
      然后调用this.getter()来执行组件的updateComponent方法，updateComponent会进行模板编译，就是将插值表达式替换为data里的数据，所以就免不了对data的属性值的访问，
          就拿文章开头的例子，他会获取name，就会触发该属性初始化的get操作，就会触发get方法
      Dep.target为$mount时创建的watcher，然后通过dep.addSubs将watcher存放到dep中，也就值存放到vm.name的dep中，这就是依赖搜集。get到name之后就将name的默认值同步到模板上，然后渲染模板，页面初始渲染完成。到这watcher的this.getter()执行完毕
          最后调用popTarget将当前watcher清除，并改变Dep.target的指向
  4.修改name值
      触发name的set操作
      name值不等，更新value，然后触发dep.notify()
      页面初始化渲染师，name属性的dep已经搜集了当前实例的渲染watcher，所以这一步触发了watcher里的update方法,update调用this.get()更新视图，当前的this就是初始化页面创建的那个渲染watcher
  总结
  分为三步：
  1、初始化data：通过Oberser和defineReactive为data的每个属性的访问与修改添加劫持，并为每个属性添加了一个dep，用来依赖搜集
  2、初始化页面：为当前组件创建了一个渲染watcher，watcher的创建阶段调用更新组件方法，模板编译需要获取data属性值，继而触发当前data属性的getter，此时这个属性的dep就会添加watcher到dep.subs中。编译结束就会渲染组件到页面上
  3、更新组件：触发属性的setter，并触发dep的notify方法，notify调用dep里存储的所有watcher的update方法，watcher的update调用get更新视图

*/
</script>
<style lang='stylus' scoped>
h1{
  font-size: 3rem
}
</style>