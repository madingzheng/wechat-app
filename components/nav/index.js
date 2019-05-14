// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
    firstBool: Boolean,
    laterBool: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: './images/triangle@left.png',
    disLeftSrc: './images/triangle.dis@left.png',
    rightSrc: './images/triangle@right.png',
    disRightSrc: './images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if(!this.properties.laterBool) {
        this.triggerEvent('left',{},{})
      }
    },
    onRight() {
      if (!this.properties.firstBool) {
        this.triggerEvent('right',{},{})
      }
    }
  }
})
