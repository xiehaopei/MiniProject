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
  let arr = [];
  let categories = [];
  let title = '';
  let rotate;
  for (let key in res.data) {
    categories.push(key);
    arr.push(res.data[key]);
  }
  title = size === 'week' ? '周' : '月';
  rotate = size === 'week' ? 50 : 0;
  let option = {
    color: ['#61a0a8', '#c23531'],
    title: {
      textStyle: {
        color: '#61a0a8',
      },
      text: title + '完成任务数量',
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
        rotate: rotate,
      },
    },
    yAxis: {
      name: '完成量',
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
      wx.showLoading({
        title: '加载中...',
      });
      getCensus(0, size);
      wx.hideLoading();
    },
    last(e) {
      let step = this.data.step + 1;
      let size = this.data.size;
      getCensus(step, size);
      this.data.step = step;
    },
    next(e) {
      let step = this.data.step - 1;
      let size = this.data.size;
      if (step >= 0) {
        getCensus(step, size);
        this.data.step = step;
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
