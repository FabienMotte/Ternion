class Clock extends THREE.Clock {
  constructor () {
    super(true) // Autostart
  }

  get delta () {
    return this.getDelta()
  }

  get time () {
    return this.getElapsedTime()
  }
}

export default Clock
