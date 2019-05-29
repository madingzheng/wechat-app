import {HTTP} from '../unti/http'

class ClassicModel extends HTTP {

  /**
   * 获取期刊
   */
  getLatest() {
    return new Promise((resolve, rej) => {
      this.request({url: '/classic/latest'}).then((res) => {
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
        resolve(res)
      }).catch(reject => {
        rej(reject)
      })
    })
  }

  getClassic(index, nextOrPrevious) {
    return new Promise((resolve, reject) => {
      let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
      let classic = wx.getStorageSync(key)
      if (!classic) {
        this.request({url: '/classic/' + index + '/' + nextOrPrevious}).then((res) => {
          wx.setStorageSync(key, res)
          resolve(res)
        }).catch((error) => {
          reject()
        })
      } else {
        resolve(classic)
      }
    })
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