import {HTTP} from '../until/http'

class ClassicModel extends HTTP {
  getLatest(callBack) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
        callBack(res)
      }
    })
  }

  getClassic(index, nextOrPrevious, callBack) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: '/classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(key, res)
          callBack(res)
        }
      })
    } else {
      callBack(classic)
    }
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  islatest(currentIndex, latestIndex) {
    return currentIndex === latestIndex ? true : false
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export {ClassicModel}