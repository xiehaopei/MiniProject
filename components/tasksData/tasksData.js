import * as echarts from '../ec-canvas/echarts.min';
import { getChartData } from '../../service/getChartData';
let chart = null;

function initChart(canvas, width, height, dpr) {
  console.log('调用initChart');
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);
  let option = {
    color: ['#45b787'],
    grid: [
      {
        x: '10%',
        y: '15%',
        width: '80%',
        height: '38%',
      },
    ],
    xAxis: {
      data: [],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [],
      },
    ],
  };
  chart.setOption(option);
  chart.hideLoading();
  return chart;
}

async function getCensus(step, size) {
  console.log('step=' + step + ' size=' + size);
  const { data: res } = await getChartData(step, size).catch(err => err);
  wx.setStorage({
    key: size + step,
    data: res.data,
  });
  setChart(res.data.list, res.data.time);
}

//设置图表基本信息
function setChart(list, time) {
  let arr = [];
  let categories = [];
  for (let key in list) {
    categories.push(key);
    arr.push(list[key]);
  }
  let option = {
    color: ['#61a0a8'],
    title: {
      textStyle: {
        color: '#61a0a8',
      },
      text: '任务统计',
      subtext: time,
      subtextStyle: {
        color: '#636e72',
        fontWeight: 400,
        fontSize: 15,
      },
    },
    grid: {
      top: '27%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    xAxis: {
      data: categories,
      axisLabel: {
        interval: 0,
        formatter: function (value) {
          let ret = ''; //拼接加\n返回的类目项
          let maxLength = 6; //每项显示文字个数
          let valLength = value.length; //X轴类目项的文字个数
          let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于1,
            for (let i = 0; i < value.length; i++) {
              let temp = ''; //每次截取的字符串
              if (value[i] === '日' && i !== value.length - 1) {
                temp = value.substring(0, i + 1) + '\n';
              }
              if (value[i] === '至') {
                temp = '  ' + '---' + '  \n' + value.substring(i + 1, value.length);
              }
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        },
      },
    },
    yAxis: {
      name: '完成数',
      min: 0,
      minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
    },
    series: [
      {
        // 根据名字对应到相应的系列
        data: arr,
      },
    ],
  };
  chart.setOption(option);
}

//Component Object
Component({
  properties: {},
  data: {
    size: 'week',
    ec: {
      onInit: initChart,
    },
    step: 0,
    time: [
      { value: 'week', name: '周', checked: 'true' },
      { value: 'month', name: '月' },
    ],
  },
  methods: {
    //选择粒度显示不同的粒度下的柱状图
    radioChange(e) {
      let size = e.detail.value;
      this.data.size = size;
      try {
        let data = wx.getStorageSync(size + '0');
        if (data) {
          setChart(data.list, data.time);
        } else {
          wx.showLoading({
            title: '加载中...',
          });
          getCensus(0, size);
          wx.hideLoading();
        }
      } catch (e) {
        console.log(e);
      }
    },
    last(e) {
      let step = this.data.step + 1;
      let size = this.data.size;
      try {
        let data = wx.getStorageSync(size + step);
        if (data) {
          setChart(data.list, data.time);
          this.data.step = step;
        } else {
          wx.showLoading({
            title: '加载中...',
          });
          getCensus(step, size);
          this.data.step = step;
          wx.hideLoading();
        }
      } catch (e) {
        console.log(e);
      }
    },
    next(e) {
      let step = this.data.step - 1;
      let size = this.data.size;
      if (step >= 0) {
        try {
          let data = wx.getStorageSync(size + step);
          if (data) {
            setChart(data.list, data.time);
            this.data.step = step;
          } else {
            wx.showLoading({
              title: '加载中...',
            });
            getCensus(step, size);
            this.data.step = step;
            wx.hideLoading();
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        wx.showToast({
          title: '已是最新数据！',
          icon: 'none',
          duration: 500,
          mask: false,
        });
      }
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {
    wx.showLoading({
      title: '加载中...',
    });
    getCensus(0, this.data.size);
    wx.hideLoading();
  },
});
