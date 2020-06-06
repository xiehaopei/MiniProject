import request from '/post';

export function getChartData(step, size) {
  return request({
    url: 'https://www.caodalinsworld.com:8081/applet/task/census/' + size,
    data: {
      step: step,
    },
  });
}
