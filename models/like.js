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
}

export { LikeModel }