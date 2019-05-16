// components/classic/music/index.js
import {classBeh} from '../classic-beh'

const music = wx.getBackgroundAudioManager()

Component({
  behaviors: [classBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: Boolean,
    isPlaying: Boolean,
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: './images/player@pause.png',
    playSrc: './images/player@play.png',
    tag: './images/music@tag.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 监听播放按钮
     */
    onPlay() {
      this.setData({
        isPlaying: true
      })
      music.title = this.properties.title
      music.src = this.properties.src
    },
    /**
     * 监听暂停按钮
     */
    onPause() {
      this.setData({
        isPlaying: false
      })
      music.pause()
    },

    _recoverStatus() {
      if (music.paused) {
        this.setData({
          isPlaying: false
        })
        return
      }
      if (music.src === this.properties.src) {
        this.setData({
          isPlaying: true
        })
      }
    },

    _monitorSwitch() {
      music.onPlay(() => {
        this._recoverStatus()
      })
      music.onPause(() => {
        this._recoverStatus()
      })
      music.onStop(() => {
        this._recoverStatus()
      })
      music.onEnded(() => {
        this._recoverStatus()
      })
    }
  },

  /**
   * 在组件实例进入页面节点树时执行	
   */
  attached() {
    this._recoverStatus()
  },
  /**
   * 在组件实例被从页面节点树移除时执行
   */
  detached() {
    this._recoverStatus()
  },
  created() {
    this._monitorSwitch()
  }
})
