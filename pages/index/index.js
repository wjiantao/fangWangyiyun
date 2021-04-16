import request from '../../utils/request'

const app = getApp()

Page({
    data: {
        bannerList: [], // 轮播图数据
        recommendList: [], // 推荐歌单
        topList: [], // 排行榜数据
    },

    onLoad: async function (options) {
        let bannerListData = await request('/banner', {type: 2});
        console.log(bannerListData);
        this.setData({
            bannerList: bannerListData.banners
        });
        // 获取推荐歌单数据
        let recommendListData = await request('/personalized', {limit: 10});
        this.setData({
            recommendList: recommendListData.result
        });
        let index = 0;
        let resultArr = [];
        while (index < 5){
            let topListData = await request('/top/list', {idx: index++});
            // splice(会修改原数组，可以对指定的数组进行增删改) slice(不会修改原数组)
            let topListItem = {name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 3)};
            resultArr.push(topListItem);
            // 不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
            this.setData({
                topList: resultArr
            })
        }
    },
  // 跳转至recommendSong页面的回调
  toRecommendSong(){
    wx.navigateTo({
      url: '/songPackage/pages/recommendSong/recommendSong'
    })
  },
})