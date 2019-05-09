// components/link/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeImage: 'images/like.png',
    unLikeImage: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike () {
      console.log(this)
      let isLike = this.properties.isLike
      let count = this.properties.count
      count = isLike? count - 1: count + 1
      this.setData({
        count: count,
        isLike: !isLike
      })
    }
  }
})
