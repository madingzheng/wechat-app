import {HTTP} from '../until/http'

class ClassicModel extends HTTP {
  getLatest(callBack) {
    this.request({
      url: 'classic/latest',
      success: function(res) {
        callBack(res)
      }
    })
  }
}

export {ClassicModel}