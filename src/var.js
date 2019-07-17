const path = require('path')
const fs = require('fs')

try {
  const filePath = path.join(process.argv[1], process.argv[2])
  const customVariables = require(filePath)

  if (typeof customVariables === 'object') {
    const writePath = path.join(__dirname, './styles/customVariables.js')

    fs.copyFile(filePath, writePath, err => {
      if (err) throw err
      console.log('操作成功')
    })
  } else {
    console.log('数据结构应为对象')
  }
} catch (err) {
  console.log(err)
}
