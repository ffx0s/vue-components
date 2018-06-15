<!-- 表单验证组件 -->
<template>
<form class="validator" @submit.prevent>
  <slot :error="error" :check="check"></slot>
</form>
</template>

<script>
export default {
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
  data () {
    const error = {}
    Object.keys(this.model).forEach(field => {
      error[field] = ''
    })
    return {
      error
    }
  },
  methods: {
    check (field) {
      this.rules[field].some((rule, index) => {
        const value = this.model[field]

        if (
          ( // 验证非空
            rule.required && (
              // 字符串类型
              (typeof value === 'string' && !value.trim()) ||
              // 布尔类型
              (typeof value === 'boolean' && !value)
            )
          ) ||
          ( // 验证长度
            (rule.min || rule.max) &&
            (value.length < rule.min || value.length > rule.max)
          )
        ) {
          this.error[field] = this.rules[field][index].message
          return true
        }

        // 自定义验证
        if (rule.validator) {
          const result = rule.validator(rule, value)
          if (typeof result === 'string') {
            this.error[field] = result
            return true
          }
        }

        this.error[field] = ''
      })
    },
    checkAll (cb) {
      let valid = true
      let error = []

      Object.keys(this.model).forEach(field => {
        this.check(field)
        if (this.error[field]) {
          valid = false
          error.push(this.error[field])
        }
      })

      error[0] && cb && cb(error)

      return valid
    }
  }
}
</script>
