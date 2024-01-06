const multer = require('multer')
const path = require('path')
const makeDir = require('../helper/makeDir')
const sharp = require('sharp')
// const fs = require('fs')

const folderPath = path.join(
  // eslint-disable-next-line no-undef
  __dirname,
  // eslint-disable-next-line no-undef
  `../../public/${process.env.UPLOAD_PATH}`,
)
makeDir(folderPath)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    var spaceRemovedName = file.originalname
    spaceRemovedName = spaceRemovedName.replace(/\s/g, '')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + spaceRemovedName)
  },
})

// const fileFilterMiddleware = (allowedFileTypes) => {
//   const fileFilter = (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true)
//     } else {
//       cb(null, false)
//     }
//   }
// }
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, new Error('only png jpg jpeg allowed'))
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: {fileSize:1024}
})

const shapUpload = async (req, res, next) => {
  try {
    if (req.file) {
      const extentionRemovedName = req.file.filename.replace(/\.[^.]+$/, '')
      var thumbnail = []

      //resize image,convert to webp and push to thumbnailData
      const resizeImage = async (
        inputPath,
        outputFilename,
        width,
        height,
        filename,
      ) => {
        var thumbnailData = {
          // eslint-disable-next-line no-undef
          path: `${process.env.UPLOAD_PATH}${filename}`,
          name: filename,
          width: width,
          height: height,
        }
        thumbnail.push(thumbnailData)
        await sharp(inputPath)
          .resize(width, height)
          .webp({ lossless: true })
          .toFile(outputFilename)
      }
      //calls resize image takes input as inputpath outpath and resolution to be changed
      const resizeToMultipleResolution = async (
        inputPath,
        outputPath,
        resolution,
      ) => {
        for (var { width, height, filename } of resolution) {
          var outputFilename = outputPath + filename
          await resizeImage(inputPath, outputFilename, width, height, filename)
        }
      }

      const inputPath = folderPath + '/' + req.file.filename
      const outputpath = folderPath
      const resolution = [
        {
          width: 100,
          height: 100,
          filename: `/${extentionRemovedName}_small.webp`,
        },
        {
          width: 300,
          height: 300,
          filename: `/${extentionRemovedName}_medium.webp`,
        },
        {
          width: 700,
          height: 700,
          filename: `/${extentionRemovedName}_large.webp`,
        },
      ]
      //resize to multiple res is called by giving required data
      await resizeToMultipleResolution(inputPath, outputpath, resolution)
      req.files = { ...req.files, thumbnail }
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(500).send('Error while processing the image.')
  }
}

module.exports = { upload, shapUpload }
