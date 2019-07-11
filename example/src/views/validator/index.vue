<template>
  <div>
    <Navbar title="Validator" />
    <div :class="{ 'validator--hide-error': type === 2 }">
      <br />
      <Group>
        <Cell title="验证方式">
          <Radio v-model.number="type" :label="1">输入时验证</Radio>
          <Radio v-model.number="type" :label="2">提交时验证</Radio>
        </Cell>
      </Group>
      <Validator ref="form" :model="form" :rules="rules">
        <template v-slot="{ error, check }">
          <Group
            labelAlign="left"
            labelWidth="80"
            valueAlign="left"
            title="示例"
          >
            <Cell title="用户名">
              <input
                v-model="form.username"
                @blur="check('username')"
                type="text"
                placeholder="请输入用户名"
              />
              <p class="validator__error">{{ error.username }}</p>
            </Cell>

            <Cell title="密码">
              <input
                v-model="form.password"
                @blur="check('password')"
                type="password"
                placeholder="请输入密码"
                autocomplete
              />
              <p class="validator__error">{{ error.password }}</p>
            </Cell>

            <Cell title="确认密码">
              <input
                v-model="form.password2"
                @blur="check('password2')"
                type="password"
                placeholder="请再次输入密码"
                autocomplete
              />
              <p class="validator__error">{{ error.password2 }}</p>
            </Cell>

            <Cell class="validator__code-cell" title="验证码">
              <div class="validator__code">
                <input
                  v-model="form.code"
                  @blur="check('code')"
                  type="tel"
                  placeholder="请输入验证码"
                />
                <VButton text type="primary">获取验证码</VButton>
              </div>
              <p class="validator__error">{{ error.code }}</p>
            </Cell>

            <Cell title="类型">
              <select v-model="form.type" @change="check('type')">
                <option value="">会员类型</option>
                <option
                  v-for="(item, index) in options"
                  :value="item.value"
                  :key="index"
                >
                  {{ item.name }}
                </option>
              </select>
              <p class="validator__error">{{ error.type }}</p>
            </Cell>

            <Cell title="真实姓名">
              <input
                v-model="form.idCard.name"
                @blur="check('idCard.name')"
                type="text"
                placeholder="请输入真实姓名"
              />
              <p class="validator__error">{{ error['idCard.name'] }}</p>
            </Cell>

            <Cell title="身份证号码">
              <input
                v-model="form.idCard.number"
                @blur="check('idCard.number')"
                type="text"
                placeholder="请输入身份证号码"
              />
              <p class="validator__error">{{ error['idCard.number'] }}</p>
            </Cell>
          </Group>

          <div class="validator__footer">
            <div class="validator__agreement">
              <Checkbox v-model="form.checked" @input="check('checked')">
                我已阅读和接受<span style="color: red;">《用户服务协议》</span>
              </Checkbox>
              <p class="validator__error">{{ error.checked }}</p>
            </div>

            <VButton block type="primary" @click="submit" :loading="loading">
              注册
            </VButton>
            <VButton block @click="reset"> 还原 </VButton>
          </div>
        </template>
      </Validator>
    </div>
  </div>
</template>

<script>
import Validator from 'vue-components/validator'
import Group from 'vue-components/cell/group'
import Cell from 'vue-components/cell'
import Radio from 'vue-components/radio'
import Checkbox from 'vue-components/checkbox'

export default {
  components: {
    Validator,
    Group,
    Cell,
    Radio,
    Checkbox
  },
  data() {
    const validatePasswordAgain = (rule, value) => {
      if (value === '') return '请再次输入密码'
      if (value !== this.form.password) return '两次输入密码不一致'
    }
    return {
      form: {
        username: '',
        password: '',
        password2: '',
        code: '',
        type: '',
        checked: false,
        idCard: {
          number: '',
          name: ''
        }
      },
      rules: {
        username: [{ required: true, message: '请填写用户名' }],
        password: [
          { required: true, message: '请填写密码' },
          { min: 6, max: 12, message: '请填写6-12位数的密码' }
        ],
        password2: [{ validator: validatePasswordAgain }],
        code: [{ required: true, message: '请输入验证码' }],
        type: [{ required: true, message: '请选择会员类型' }],
        checked: [{ required: true, message: '请阅读并同意注册条款' }],
        'idCard.number': [{ required: true, message: '请填写身份证号码' }],
        'idCard.name': [{ required: true, message: '请填写真实姓名' }]
      },
      options: [
        { name: '黄金会员', value: 1 },
        { name: '钻石会员', value: 2 },
        { name: '青铜会员', value: 3 }
      ],
      type: 2,
      loading: false
    }
  },
  methods: {
    submit() {
      const callback = this.type === 2 ? errors => this.$toast(errors[0]) : null
      if (this.$refs.form.checkAll(callback)) {
        this.loading = true
      }
    },
    reset() {
      this.$refs.form.reset()
      this.loading = false
    }
  }
}
</script>

<style lang="postcss">
.validator__error {
  position: absolute;
  right: 14px;
  top: 15px;
  color: #f00;
  font-size: 12px;
  margin: 0;
}
.validator--hide-error .validator__error {
  display: none;
}
.validator__footer {
  margin-bottom: 40px;
  padding: 0 14px;
}
.validator__agreement {
  position: relative;
  margin: 25px 0 30px;
  & .validator__error {
    left: 3px;
    top: auto;
    right: auto;
    margin-top: 3px;
  }
}
.validator__code-cell {
  & .v-cell__content {
    padding-right: 0;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  & .validator__code {
    display: flex;
    flex: 1;
    align-items: center;
    & input {
      display: block;
      flex: 1;
    }
    & .v-button {
      display: block;
      margin-right: -14px;
    }
  }
  & .validator__error {
    position: static;
  }
}
</style>
