<template>
<div style="width: 300px;margin: 0 auto;">
  <h4>Form validator</h4>
  <Validator ref="form" :model="form" :rules="rules">
    <template slot-scope="{ error, check }">
      <div class="row">
        <input v-model="form.username" @blur="check('username')" type="text" placeholder="用户名">
        <p class="error-info">{{error.username}}</p>
      </div>
      <div class="row">
        <input v-model="form.password" @blur="check('password')" type="password" placeholder="密码" autocomplete>
        <p class="error-info">{{error.password}}</p>
      </div>
      <div class="row">
        <input v-model="form.password2" @blur="check('password2')" type="password" placeholder="确认密码" autocomplete>
        <p class="error-info">{{error.password2}}</p>
      </div>
      <div class="row">
        <select v-model="form.type" @change="check('type')">
          <option value="">会员类型</option>
          <option v-for="(item, index) in options" :value="item.value" :key="index">
            {{item.name}}
          </option>
        </select>
        <p class="error-info">{{error.type}}</p>
      </div>
      <div class="row">
        <input type="checkbox" v-model="form.checked" @change="check('checked')">我已阅读和接受xxx
        <p class="error-info">{{error.checked}}</p>
      </div>
      <div class="row">
        <button @click="submit">注册</button>
      </div>
    </template>
  </Validator>
</div>
</template>

<script>
import Validator from '@/components/validator'

export default {
  components: {
    Validator
  },
  data () {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.password) return '两次输入密码不一致'
    }
    return {
      form: {
        username: '',
        password: '',
        password2: '',
        type: '',
        checked: false
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名' },
        ],
        password: [
          { required: true, message: '请填写密码' },
          { min: 6, max: 12, message: '请填写6-12位数的密码' }
        ],
        password2: [
          { validator: validatePasswordAgain }
        ],
        type: [
          { required: true, message: '请选择会员类型' }
        ],
        checked: [
          { required: true, message: '请阅读并同意注册条款' }
        ]
      },
      options: [
        { name: '黄金会员', value: 1 },
        { name: '钻石会员', value: 2 },
        { name: '青铜会员', value: 3 },
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.checkAll()) {
        alert('提交数据中...')
      }
    }
  }
}
</script>

<style scoped>
.row {
  position: relative;
  margin-bottom: 10px;
  height: 50px;
  font-size: 12px;
}
.row input[type="text"],
.row input[type="password"],
.row select {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  background: #fff;
}
.row button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #409eff;
  color: #fff;
  border: none;
}
.error-info {
  position: absolute;
  bottom: 0;
  color: #f00;
  font-size: 12px;
  margin: 0;
}
</style>
