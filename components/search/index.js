// components/search/index.js
import {KeywordModel} from '../../models/keyword'

const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    q: ""
  },

  attached() {
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()

    hotWords.then(res => {
      this.setData({
        hotWords: res.hot,
        historyWords
      })
    })
  },

  
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(event) {
      const q = event.detail.value || event.detail.text
      wx.showLoading()
      keywordModel.getBookSearch(q).then(res => {
        this.setData({
          dataArray: res.books,
          q
        })
        keywordModel.addToHistory(q)
        wx.hideLoading()
      })
    },
    onClear(event) {
      this.setData({
        dataArray: [],
        q: ''
      })
    }
  }
})
