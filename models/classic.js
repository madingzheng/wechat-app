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

  /**
   * 获取我喜欢的期刊
   */
  getMyFavor() {
    return new Promise((resolve, reject) => {
      this.request({url: '/classic/favor'})
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * 获取某一期详细信息
   * @param {类型} type 
   * @param {期刊id} id 
   */
  getClassicOne(type, id) {
    return new Promise((resolve, reject) => {
      this.request({url: '/classic/' + type + '/' + id})
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
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