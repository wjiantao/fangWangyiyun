import request from '../../utils/request'

let startY = 0; //起始坐标
let moveY = 0; // yi移动坐标
let moveDistance = 0; // 移动距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: 'translateY(0rpx)',
        coveTransition: '',
        userInfo: {}, // 用户信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 读取用户的基本信息
        let userInfo = wx.getStorageSync('userInfo');
        if(userInfo){ // 用户登录
            // 更新userInfo的状态
            this.setData({
                userInfo: JSON.parse(userInfo)
            })

            // 获取用户播放记录
            this.getUserRecentPlayList(this.data.userInfo.userId)
        }
    },
    // 获取用户播放记录的功能函数
    async getUserRecentPlayList(userId){
        let recentPlayListData = await request('/user/record', {uid: userId, type: 0});
        let index = 0;
        let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
            item.id = index++;
            return item;
        })
        this.setData({
            recentPlayList
        })
    },

    handleTouchStart(e) {
        this.setData({
            coveTransition: ''
        })
        startY = e.touches[0].clientY;

    },
    handleTouchMove(e) {
        moveY = e.touches[0].clientY;
        moveDistance = moveY - startY;
        if(moveDistance < 0) return;
        if(moveDistance > 80) moveDistance = 80;
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`,
        })
    },
    handleTouchEnd(e) {
        this.setData({
            coverTransform: `translateY(0rpx)`,
            coveTransition: 'transform 1s linear'
        })
    },
    // 跳转至登录login页面的回调
    toLogin(){
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },
})