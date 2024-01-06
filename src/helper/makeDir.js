const fs = require('fs')
const fsPromise = require('fs').promises

const makeDir = async (folderPath) => {
  try {
    if (!fs.existsSync(folderPath)) {
      return await fsPromise.mkdir(folderPath)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = makeDir
