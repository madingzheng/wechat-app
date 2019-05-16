import {classBeh} from '../classic-beh'

Component({
  behaviors: [classBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    movieImage: './images/movie@tag.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
