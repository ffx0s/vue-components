<template>
  <div>
    <slot />
    <slot
      :list="list"
      :upload="upload"
      :remove="remove"
      :abort="abort"
      name="list"
    />
    <slot :onChange="onChange" name="input" />
  </div>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    url: {
      type: String,
      default: ''
    },
    method: {
      type: String,
      default: 'POST'
    },
    fileKey: {
      type: String,
      default: 'file'
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    // 上传前触发的事件，用于获取上传token，校验文件格式大小等
    beforeUpload: {
      type: Function,
      default: () => Promise.resolve()
    },
    extension: {
      type: Object,
      default: () => ({})
    },
    maxProgress: {
      type: Number,
      default: 90
    },
    // 选择完文件立即触发上传方法
    immediately: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.requests = []
  },
  beforeDestroy() {
    this.requests = null
  },
  methods: {
    onChange(event) {
      const fileLength = this.list.length

      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i]
        const fileIndex = fileLength + i

        this.add(file)

        if (this.immediately) {
          setTimeout(() => {
            this.upload(fileIndex)
          })
        }
      }

      this.$emit('change', this.list, event)

      event.target.value = ''
    },
    async upload(index) {
      const current = this.list[index]

      if ((current.progress === 100 && !current.error) || current.uploading)
        return

      current.progress = 0
      current.error = false

      await this.beforeUpload(this.list, current, index)

      const vm = this
      const req = new XMLHttpRequest()
      const formData = new FormData()

      formData.append(this.fileKey, current.file)

      Object.keys(this.formData).forEach(key => {
        formData.append(key, this.formData[key])
      })

      req.open(this.method, this.url)

      req.upload.onprogress = onProgress
      req.onload = onLoad
      req.onerror = onError
      req.onabort = onAbort

      Object.keys(this.headers).forEach(key => {
        req.setRequestHeader(key, this.headers[key])
      })

      req.send(formData)

      this.requests[index] = req
      current.uploading = true

      const maxProgress = this.maxProgress

      function onProgress(event) {
        if (event.lengthComputable) {
          // 上传进度100不代表上传成功了，所以总进度不能为100
          const percentComplete = Math.floor(
            (event.loaded / event.total) * maxProgress
          )
          current.progress = percentComplete
        }
      }

      function onLoad() {
        current.uploading = false

        if (req.status === 200) {
          current.error = false
          current.progress = 100
          vm.$emit('success', req, current, index)
        } else {
          current.error = true
          vm.$emit('error', req, current, index)
        }
      }

      function onError() {
        current.error = true
        current.uploading = false
        vm.$emit('error', req, current, index)
      }

      function onAbort() {
        current.uploading = false
        vm.$emit('abort', req, current, index)
      }
    },
    add(file) {
      this.list.push({
        ...this.extension,
        file,
        progress: 0,
        uploading: false,
        error: false
      })
      this.requests.push(null)
    },
    remove(index) {
      this.abort(index)
      this.list.splice(index, 1)
    },
    abort(index) {
      const req = this.requests[index]
      if (req) {
        req.abort()
        this.requests.splice(index, 1)
      }
    }
  }
}
</script>
