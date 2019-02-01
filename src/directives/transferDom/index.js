function $(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector) || document.body
  } else if (typeof selector === 'object' && selector.nodeType === 1) {
    return selector
  }
  return document.body
}

function transfer(target, parentSelector, hasMovedOut) {
  const parentNode = target.parentNode
  if (parentNode) {
    parentNode.replaceChild(document.createComment(''), target)
  }
  $(parentSelector).appendChild(target)
  if (hasMovedOut) {
    target.__originalParentNode = parentNode
  } else {
    destory(target)
  }
}

function destory(target) {
  delete target.__originalParentNode
}

export default {
  inserted: function(el, { value }) {
    if (value !== false) {
      const hasMovedOut = true
      transfer(el, value, hasMovedOut)
    }
  },
  componentUpdated: function(el, { value, oldValue }) {
    if (value !== oldValue) {
      const hasMovedOut = !!value
      if (value !== false) {
        transfer(el, value, hasMovedOut)
      } else {
        transfer(el, el.__originalParentNode, hasMovedOut)
      }
    }
  },
  unbind: function(el) {
    if (el.__originalParentNode) {
      transfer(el, el.__originalParentNode, false)
    }
    destory(el)
  }
}
