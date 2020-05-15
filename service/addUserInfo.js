import request from "/post";

export default function addUserInfo(userInfo, openid) {
  request({
    url: 'https://www.caodalinsworld.com:8081/applet/user/addUserInfo',
    methods: "POST",
    header: {
      'content-type': 'application/json'
    },
    data: {
      openid: openid,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      province: userInfo.province,
      city: userInfo.city,
      country: userInfo.country,
      gender: userInfo.gender
    }
  }).then(res => {
    console.log("插入小程序登录用户信息成功！");
  }).catch(err => {
    console.log(err);
  })
}