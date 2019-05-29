import {HTTP} from '../unti/http'
class KeywordModel  extends HTTP{
  key = 'history'
  getHistory() {
    const words =  wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  /**
   * 获取热门搜索
   */
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      words.unshift(keyword)
      if (words.length > 10) {
        words.pop()
        wx.setStorageSync(this.key, words)
      } else {
        wx.setStorageSync(this.key, words)
      }
    }
  }

  /**
   * 书籍搜素
   */
  getBookSearch(q) {
    return this.request({
      url: '/book/search',
      data: {
        summary: 1,
        q
      }
    })
  }
}

export {KeywordModel}