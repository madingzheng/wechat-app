// pages/my/my.js
import {BookModels} from '../../models/book'
import {ClassicModel} from '../../models/classic'

const classicModel = new ClassicModel()
const bookModels = new BookModels()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: {},
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserSetting()
    this.getMyBookCount()
    this.getMyfovor()
  },

  onJumpToDetail(event) {
    const type = event.detail.type
    const id = event.detail.cid
    wx.navigateTo({
      url: '/pages/classic-detial/classicDetial?type=' + type + '&&id=' + id
    })
  },

  /**
   * 获取用户权限
   */
  getUserSetting() {
    wx.getSetting({
      success: (result) => {
        if(result.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success:res=>{
              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })
            }
          })
        } else {
          console.log('没有权限');
        }
      },
    });
  },  
  /**
   * 获取用户信息
   */
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  /**
   * 跳转到about页面
   */
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },


  /**
   * 获取我喜欢书籍的数量
   */
  getMyBookCount() {
    bookModels.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  getMyfovor() {
    classicModel.getMyFavor()
      .then(res => {
        this.setData({
          classics: res
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})