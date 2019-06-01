// components/search/index.js
import {KeywordModel} from '../../models/keyword'

const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    q: "",
    loading: false,
    loadingMore: true,
    loadingCenter: false,
    noData: false
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
    loadMore() {
      const len = this.data.dataArray.length
      if (!this.data.q) {
        return
      }

      if(!this.data.loading && this.data.loadingMore) {

        this.setData({
          loading: true
        })
        keywordModel.getBookSearch(this.data.q,len)
        .then(res => {
          let tempArray = [...this.data.dataArray,...res.books]
          this.setData({
            dataArray: tempArray,
            loading: false
          })
          if (res.count + res.start === res.total) {
            this.data.loadingMore = false
          }
        })
        .catch(() => {
          this.data.loading = false
        })
      }

    },
    onCancel() {
      this.triggerEvent('cancel',{},{})
    },
    onConfirm(event) {
      const q = event.detail.value || event.detail.text
      this.setData({
        loadingCenter: true
      })
      keywordModel.getBookSearch(q, 0).then(res => {
        this.setData({
          dataArray: res.books,
          q,
          loadingMore: true,
          loadingCenter: false
        })
        keywordModel.addToHistory(q)
        if (res.total === 0) {
          this.setData({
            noData: true
          })
        }
      })
    },
    onClear(event) {
      this.setData({
        dataArray: [],
        q: '',
        noData: false
      })
    }
  }
})
