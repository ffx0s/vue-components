<template>
  <form class="v-validator" @submit.prevent>
    <slot :error="error" :check="check"></slot>
  </form>
</template>

<script>
import { isNumber } from '../../utils/shared'

function getValue(key, obj) {
  return key.split('.').reduce((o, i) => o[i], obj)
}

function initData(model, rules) {
  const error = {}
  const newModel = {}
  Object.keys(rules).forEach(field => {
    error[field] = ''
  })
  Object.keys(model).forEach(field => {
    newModel[field] =
      typeof model[field] === 'object'
        ? JSON.parse(JSON.stringify(model[field]))
        : model[field]
  })
  return [error, newModel]
}

// 验证数据的长度
function verifyLength(minLength, maxLength, value) {
  if (!isNumber(minLength) || !isNumber(maxLength)) return true
  if (isNumber(value)) value = '' + value
  return value.length >= minLength && value.length <= maxLength
}

export default {
  name: 'Validator',
  props: {
    // 表单数据对象
    model: {
      type: Object,
      default: () => {}
    },
    // 验证规则
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const [error, originalModel] = initData(this.model, this.rules)
    return {
      error,
      originalModel
    }
  },
  methods: {
    check(field) {
      const currentRule = this.rules[field]
      let hasError = false

      if (!currentRule) return !hasError

      currentRule.some((rule, index) => {
        const value = getValue(field, this.model)

        // 自定义验证
        if (rule.validator) {
          const result = rule.validator(rule, value)
          if (typeof result === 'string') {
            this.error[field] = result
            hasError = true
            return hasError
          }
        }

        if (
          (rule.required && this.isEmptyValue(value)) ||
          !verifyLength(rule.min, rule.max, value)
        ) {
          this.error[field] =
            currentRule[index].message || `The ${field} field is required`
          hasError = true
          return hasError
        }

        this.error[field] = ''
      })
      return !hasError
    },
    checkAll(cb) {
      let valid = true
      let error = []

      Object.keys(this.rules).forEach(field => {
        this.check(field)
        if (this.error[field]) {
          valid = false
          error.push(this.error[field])
        }
      })

      error[0] && cb && cb(error)

      return valid
    },
    reset() {
      Object.keys(this.originalModel).forEach(field => {
        this.model[field] =
          typeof this.originalModel[field] === 'object'
            ? JSON.parse(JSON.stringify(this.originalModel[field]))
            : this.originalModel[field]
      })
      Object.keys(this.rules).forEach(field => {
        this.error[field] = ''
      })
    },
    isEmptyValue(value) {
      if (typeof value === 'string') {
        return !value.trim()
      }
      if (value === 0) return false
      if (value === Infinity) return true
      return !value
    }
  }
}
</script>
