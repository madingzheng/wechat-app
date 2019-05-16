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
    first: false,
    later: true,
    laterIndex: 0,
    likeNums: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        laterIndex: res.index,
        likeNums: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    let arrId = this.data.classic.id
    let type = this.data.classic.type
    likeModel.like(behavior, arrId, type)
  },

  /**
   * 下一期
   */
  onPrevious() {
    this._updateClassic('previous')
  },

  /**
   * 上一期
   */
  onNext() {
    this._updateClassic('next')
  },

  /**
   * 更新classic数据
   * @param {下一期或者上一期} nextOrPrevious 
   */
  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.type, res.id)
      this.setData({
        classic: res,
        later: classicModel.islatest(res.index, this.data.laterIndex),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus(type, arrId) {
    likeModel.getClassicLikeStatus(type, arrId, (res) => {
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