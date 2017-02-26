import raf from 'raf'

class RAFManager {
  constructor () {
    this.datas = []
    this.binded = false
  }

  bind () {
    if (this.binded) return

    this.binded = true
    this.update = this.update.bind(this)

    // If gsap is loaded user tweenmax ticker for better performance
    if (typeof TweenMax === 'undefined') {
      this.raf = raf(this.update)
    } else {
      TweenMax.ticker.addEventListener('tick', this.update)
    }
  }

  unbind () {
    this.binded = false

    if (typeof TweenMax !== 'undefined') {
      TweenMax.ticker.removeEventListener('tick', this.update)
    }
    if (typeof this.raf !== 'undefined') {
      raf.cancel(this.raf)
    }

    for (let i = 0, l = this.datas.length; i < l; i++) {
      this.remove(this.datas[i].callback)
    }

    this.datas = []
  }

  add (callback, fps = 60, delay = 0, once = false) {
    if (typeof callback !== 'function') {
      return false
    }

    const date = new Date()

    const data = {
      id: this.datas.length,
      callback,
      fps,
      delay,
      once,
      delayCount: 0,
      lastTime: date.getTime()
    }

    this.datas.push(data)

    if (!this.binded) {
      this.bind()
    }

    return data
  }

  addOnce (callback, fps = 60, delay = 0) {
    return this.add(callback, fps, delay, true)
  }

  remove (callback) {
    for (let i = 0, l = this.datas.length; i < l; i++) {
      if (this.datas[i].callback == callback) {
        this.datas.splice(i, 1)
        break
      }
    }
  }

  update () {
    const date = new Date()
    const now = date.getTime()

    for (let i = 0, l = this.datas.length; i < l; i++) {
      const data = this.datas[i]
      const delta = now - data.lastTime
      const interval = 1000 / data.fps

      data.lastTime = now - (delta % interval)

      if (data.delay > 0) {
        data.delayCount++
        if (data.delayCount < data.delay) {
          continue
        }
      }

      data.callback()

      if (data.once) {
        this.remove(data.callback)
      }
    }

    if (this.binded) {
      raf(this.update)
    }
  }
}

export default new RAFManager()
