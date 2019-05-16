import {HTTP} from '../until/http';

class LikeModel extends HTTP {
  like (behavior, artId, type) {
    let url = behavior === 'like' ? '/like' : '/like/cancel'
    this.request({
      url: url,
      method: "POST",
      data: {
        art_id: artId,
        type: type
      }
    })
  }

  getClassicLikeStatus (category, artId, sCallback) {
    this.request({
      url: '/classic/' + category + '/' + artId + '/favor',
      success: function(res) {
        sCallback(res)
      }
    })
  }
}

export { LikeModel }