const path = require('path')
const fs = require('fs')

const writePath = path.join(__dirname, './styles/customVariables.js')

function write() {
  const filePath = path.join(process.argv[1], process.argv[2])
  const customVariables = require(filePath)

  if (typeof customVariables === 'object') {
    fs.copyFile(filePath, writePath, err => {
      if (err) throw err
      console.log('写入成功')
    })
  } else {
    console.log('数据结构应为对象')
  }
}

function remove() {
  const data = `module.exports = {}\n`
  fs.writeFileSync(writePath, data)
  console.log('移除成功')
}

if (process.argv.length === 2) {
  remove()
} else {
  try {
    write()
  } catch (err) {
    console.log(err)
  }
}
