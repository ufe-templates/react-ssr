const path = require('path')

function readFileByDir (fs, dir) {
  const ret = {}
  try {
    const files = fs.readdirSync(dir, 'utf-8')
    files.forEach(file => {
      const filepath = path.join(dir, file)
      const stats = fs.statSync(filepath)
      if (stats.isFile() && file.endsWith('.css')) {
        const content = fs.readFileSync(filepath, 'utf-8')
        ret[file] = content
      }
    })
  } catch (e) {
    console.log('read dir wrong: ', e.message)
  }
  return ret
}

module.exports = {
  readFileByDir
}
