//Component Object
import request from "../../service/post.js";
import {
  login
} from "../../service/login.js";
import {
  getTask
} from '../../service/getTask.js'

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
    unfinish_tasks: [],
    time: [],
  },
  methods: {},
  created: function () {

  },
  attached: function () {

  },
  ready: function () {
    setTimeout(() => {
      console.log('取出', app.globalData.openid)
      getTask(0).then((res) => {
          console.log(res);
          this.setData({
            unfinish_tasks: res.data.data
          })
        })
        .catch((res) => {
          console.log("请求失败");
        });
    }, 800);
  },
  moved: function () {},
  detached: function () {},
});