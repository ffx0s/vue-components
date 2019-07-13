import Vue from 'vue'
import VueToast from './'

const defaultOptions = {}
let toast

Object.keys(VueToast.props).forEach(prop => {
  defaultOptions[prop] = VueToast.props[prop].default
})

defaultOptions.value = true

function Toast(options) {
  if (Vue.prototype.$isServer) return
  if (typeof options === 'string' || typeof options === 'number') {
    options = { title: options }
  }

  const data = { ...defaultOptions, ...options }

  if (!toast) {
    toast = createInstance()
  } else {
    toast.value = false
  }

  setTimeout(() => {
    Object.assign(toast, data)
  })

  return toast
}

Toast.close = function() {
  if (toast) {
    setTimeout(() => {
      toast.value = false
    })
  }
}

function createInstance() {
  const instance = new (Vue.extend(VueToast))({
    props: {
      value: {
        default: false
      }
    },
    el: document.createElement('div')
  })

  instance.$on('input', value => {
    instance.value = value
  })

  document.body.appendChild(instance.$el)
  return instance
}

Toast.install = Vue => {
  Vue.prototype.$toast = Toast
}

export default Toast
