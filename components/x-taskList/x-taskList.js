//Component Object
import request from "../../service/post.js";
import {
  login
} from "../../service/login.js";


let app = getApp();

Component({
  properties: {
    myProperty: {
      type: String,
      value: "",
      observer: function () {},
    },
  },
  data: {
    tasks: [],
    time: [],
  },
  methods: {
    //全局变量监听函数,第一个参数为变量，第二个参数为当前对象
    watchBack(task,that){
      console.log('监听到任务列表变化');
      that.setData({
        tasks: task
      })
    }
  },
  created: function () {
    let that = this;
    //对任务列表变化进行监听
    getApp().watch(that.watchBack , that);
  },
  attached: function () {

  },
  ready: function () {

  },
  moved: function () {},
  detached: function () {},
});