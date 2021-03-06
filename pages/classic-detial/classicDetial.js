// pages/classic/classic.js
import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const type = options.type
    classicModel.getClassicOne(type, id)
      .then(res => {
        this.setData({
          classic: res
        })
      })
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    let arrId = this.data.classic.id
    let type = this.data.classic.type
    likeModel.like(behavior, arrId, type)
  },

  _getLikeStatus(type, arrId) {
    likeModel.getClassicLikeStatus(type, arrId).then((res) => {
      this.setData({
        likeNums: res.fav_nums,
        likeStatus: res.like_status
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