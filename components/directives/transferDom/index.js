function $(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector) || document.body
  } else if (typeof selector === 'object' && selector.nodeType === 1) {
    return selector
  }
  return document.body
}

function transfer(el, targetSelector) {
  if (!el.__data || !el.__data.transfer) {
    const parentNode = el.parentNode
    el.__data = {}
    if (parentNode) {
      // 用占位节点替换掉当前节点
      el.__data.placeNode = document.createComment('')
      parentNode.replaceChild(el.__data.placeNode, el)
    }
    // 将当前节点插入到目标节点/body里
    $(targetSelector).appendChild(el)
    // 标记已移出状态和记录原来的父节点
    el.__data.transfer = true
    el.__data.originalParentNode = parentNode
  }
}

function restore(el, isDelete = true) {
  if (!el.__data) return
  if (el.__data.originalParentNode && el.parentNode) {
    el.__data.originalParentNode.replaceChild(el, el.__data.placeNode)
    el.__data.transfer = false
  }
  if (isDelete) {
    delete el.__data
  }
}

export default {
  inserted: function(el, { value: targetSelector }) {
    if (targetSelector !== false) {
      transfer(el, targetSelector)
    }
  },
  componentUpdated: function(
    el,
    { value: targetSelector, oldValue: oldTargetSelector }
  ) {
    if (targetSelector !== oldTargetSelector) {
      if (targetSelector === false) {
        restore(el, false)
      } else {
        transfer(el, targetSelector)
      }
    }
  },
  unbind: function(el) {
    restore(el)
  }
}
