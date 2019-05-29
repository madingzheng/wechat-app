import {HTTP} from '../unti/http';

class LikeModel extends HTTP {
  like (behavior, artId, type) {
    let url = behavior === 'like' ? '/like' : '/like/cancel'
    this.request({url, data: { art_id: artId, type: type }, method: "POST"})
  }

  getClassicLikeStatus (category, artId) {
    return new Promise((resolve, reject) => {
      this.request({url: '/classic/' + category + '/' + artId + '/favor'}).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject()
      })
    })
  }
}

export { LikeModel }