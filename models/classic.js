import {HTTP} from '../until/http'

class ClassicModel extends HTTP {
  getLatest(callBack) {
    this.request({
      url: '/classic/latest',
      success: function(res) {
        callBack(res)
      }
    })
  }

  getClassic(index, nextOrPrevious, callBack) {
    this.request({
      url: '/classic/' + index + '/' + nextOrPrevious,
      success: function(res) {
        callBack(res)
      }
    })
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  islatest(currentIndex, latestIndex) {
    return currentIndex === latestIndex ? true : false
  }
}

export {ClassicModel}