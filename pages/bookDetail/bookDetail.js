// pages/bookDetail/bookDetail.js
import {BookModels} from '../../models/book'
import {
  LikeModel
} from '../../models/like.js'

const bookModels = new BookModels
const likeModels = new LikeModel

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail: {},
    bookFavor: {},
    bookComments: [],
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const detail = bookModels.getBookDetail(id)
    const comments = bookModels.getBookComment(id)
    const likeStatus = bookModels.getBookFavor(id)

    wx.showLoading()
    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          bookDetail: res[0],
          bookComments: res[1].comments,
          bookFavor: res[2],
        })
        wx.hideLoading()
      })
  },

  /**
   * 提交短评
   * @param {event} event 
   */
  onPost(event) {
    const comment = event.detail.text || event.detail.value
    const bookId = this.data.bookDetail.id

    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModels.addBookComment(bookId, comment)
      .then(res => {
        wx.showToast({
          title: '+1',
          icon: 'none'
        })

        this.setData({
          posting:  false
        })
        bookModels.getBookComment(bookId).then(res => {
          this.setData({
            bookComments: res.comments
          })
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 喜欢or不喜欢
   * @param {*} event 
   */
  onLike(event) {
    const likeOrunLike = event.detail.behavior
    likeModels.like(likeOrunLike, this.data.bookDetail.id, 400)
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },
  
  onCancel() {
    this.setData({
      posting: false
    })
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