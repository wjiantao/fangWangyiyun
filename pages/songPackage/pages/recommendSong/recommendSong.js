import request from '../../../../utils/request'

Page({
    data: {
        day: '',
        month: '',
        recommendList: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 判断用户是否登录
        let userInfo = wx.getStorageSync('userInfo');
        if(!userInfo){
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                success: () => {
                    // 跳转至登录界面
                    wx.reLaunch({
                        url: '/pages/login/login'
                    })
                }
            })
        }
        this.setData({
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        });
        // 获取每日推荐的数据
        this.getRecommendList();
    },

    // 获取用户每日推荐数据
    async getRecommendList(){
        let recommendListData = await request('/recommend/songs');
        console.log(recommendListData);
        this.setData({
            recommendList: recommendListData.recommend
        })
    },
    toSongDetail(e) {
        const song =e.currentTarget.dataset.song;
        wx.navigateTo({
            url: '/songPackage/songDetail/songDetail',
        })
    }
})