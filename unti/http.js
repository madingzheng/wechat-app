import {config} from '../config'
import {tips} from './error'

class HTTP {
  request({url, data = {}, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.api_base_url + url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          'appkey': config.appkey
        },
        success: (res) =>{
          let code = res.statusCode.toString()
          if(code.startsWith('2')) {
            resolve(res.data)
          } else {
            reject()
            let error_code = res.data.error_code
            this._show_error(error_code)
          }
        },
        fail: () =>{
          reject()
          this._show_error(1)
        }
      })
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none'
    })
  }
}

export {HTTP}