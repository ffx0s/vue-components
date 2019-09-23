const slice = Array.prototype.slice

export default class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(eventName, fn, once) {
    eventName.split(' ').forEach(name => {
      if (!this.listeners[name]) {
        this.listeners[name] = []
      }
      fn && this.listeners[name].push({ fn, once })
    })

    return this
  }

  emit(eventName) {
    const args = slice.call(arguments, 1)

    eventName.split(' ').forEach(name => {
      const listeners = this.listeners[name]

      if (listeners) {
        const length = listeners.length

        for (let i = 0; i < length; i++) {
          const current = listeners[i]

          if (current) {
            listeners[i].fn.apply(this, args)

            if (listeners[i].once) {
              listeners.splice(i--, 1)
            }
          }
        }
      }
    })
  }

  off(eventName, fn) {
    const listeners = this.listeners[eventName]

    if (listeners) {
      // 没有回调函数则移除所有该事件下的函数
      if (!fn) {
        this.listeners[eventName] = []
        return
      }

      // 有事件名和函数
      const length = listeners.length

      for (let i = 0; i < length; i++) {
        if (listeners[i] && listeners[i].fn === fn) {
          listeners.splice(i, 1)
          return
        }
      }
    }

    // 没有事件名则移除所有监听函数
    if (!eventName) {
      this.listeners = {}
    }
  }
}
