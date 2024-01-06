/* eslint-disable no-unused-vars */
const Media = require('../models/media')
const { successResponse, errorResponse } = require('../helper/response')
const {
  validateCreateMedia,
  validateUpdateMedia,
  validateDeleteMedia,
  validateImage,
} = require('../middleware/validator/mediaValidator')
const mediaHelper = require('../helper/mediaUrlHelper')
const mediaUrlHelper = require('../helper/mediaUrlHelper')
const { pageInitionHelper } = require('../helper/pageinitionHelper')
const imageUrlAddertoThumbnail = require('../helper/imageURLtoThumbnail')

//adds image url to data to be sent in response
const imageUrlAdderToData = async (req, data) => {
  for (var i = 0; i < data.length; i++) {
    //we add url to path of model
    var url = await mediaUrlHelper(req, data[i].path)
    data[i] = { ...data[i]?._doc, image_url: url }
    // we are adding url to path of thumnails
    //path:myUploads/small.jpg to https:// ...
    var result_Thumbnail = await imageUrlAddertoThumbnail(
      req,
      data[i].thumbnails,
    )
    // for (var j = 0; j < data[i]?.thumbnails.length; j++) {
    //   url = await mediaHelper(req, data[i].thumbnails[j].path)
    //   result_Thumbnail.push({ ...data[i].thumbnails[j]._doc, image_url: url }) //pushing data thumbnail along with generated url
    // }
    data[i] = { ...data[i] }
    data[i].thumbnails = { ...data[i].thumbnails._doc }
    data[i].thumbnails = result_Thumbnail //data thumbnail is equal to newly created thumbnail
  }
  return data
}

const getAllMedia = async (req, res, next) => {
  try {
    var { page, limit, sort, skip } = pageInitionHelper(req)
    var sortObject = {}
    sortObject[sort.sortBy] = sort.sortOrder
    var search = req.query.search
    var searchObj = {}
    if (search) {
      searchObj['title'] = new RegExp(search, 'i')
    }
    const media = await Media.find(searchObj)
      .skip(skip)
      .sort(sortObject)
      .limit(limit)

    //counts total no of result or documents
    var totalCount = await Media.countDocuments(searchObj)
    var totalPage =
      totalCount % limit == 0
        ? totalCount / limit
        : Math.floor(totalCount / limit) + 1
    if (media.length == 0) {
      errorResponse(res, 200, 'No Media Found')
    } else {
      var data = await imageUrlAdderToData(req, media)
      successResponse(
        res,
        200,
        'Media',
        data,
        page,
        limit,
        totalCount,
        totalPage,
        sort,
      )
    }
  } catch (err) {
    next(err)
  }
}

const getMedia = async (req, res, next) => {
  try {
    const id = req.params.mediaId
    const media = await Media.findById(id)
    if (media.length == 0) {
      errorResponse(res, 200, 'No Media Found')
    } else {
      var data = await imageUrlAdderToData(req, media)
      successResponse(res, 200, 'Media', data)
    }
  } catch (err) {
    next(err)
  }
}

const createMedia = async (req, res, next) => {
  try {
    console.log('test ashim create', req.body)
    const value = await validateCreateMedia(req.body)
    if (req.file) {
      const imageValidation = await validateImage(req.file)
    } else {
      return errorResponse(
        res,
        500,
        'Image Field is required or not supported file',
      )
    }
    const { title, caption, alt, type, description } = req.body
    const newMedia = new Media({ title, caption, alt, type, description })

    let result
    if (req.file) {
      // eslint-disable-next-line no-undef
      newMedia.path = `${process.env.UPLOAD_PATH}/${req.file.filename}`
      newMedia.thumbnails = req.files.thumbnail
      result = await newMedia.save()
    }
    if (result) {
      var data = await imageUrlAdderToData(req, [result])
      successResponse(res, 200, 'Media Created', data)
    } else {
      errorResponse(res, 401, 'cannot create media')
    }
  } catch (err) {
    next(err)
  }
}
const updateMedia = async (req, res, next) => {
  try {
    const value = await validateUpdateMedia(req.body)
    //checking if image is sent or not
    // if (req.file) {
    //   const imageValidation = await validateImage(req.file)
    // }
    const id = req.params.mediaId
    const { title, caption, alt, type, description } = req.body
    const mediaExist = await Media.findById(id)
    console.log(mediaExist, id)
    if (!mediaExist) {
      return errorResponse(res, 204, 'Media not found')
    } else {
      mediaExist.title = title
      mediaExist.caption = caption
      mediaExist.alt = alt
      req.file
        ? // eslint-disable-next-line no-undef
          (mediaExist.path = `${process.env.UPLOAD_PATH}/${req.file.filename}`)
        : ''
      mediaExist.type = type
      mediaExist.description = description
      let result
      if (req.file) {
        // eslint-disable-next-line no-undef
        mediaExist.path = `${process.env.UPLOAD_PATH}/${req.file.filename}`
        if (req.files) {
          mediaExist.thumbnails = req.files.thumbnail
        }
      }
      result = await mediaExist.save()
      if (result) {
        var data = await imageUrlAdderToData(req, [result])
        return successResponse(res, 200, 'Media Created', data)
      } else {
        return errorResponse(res, 401, 'Media edit failed')
      }
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}
const deleteMedia = async (req, res, next) => {
  try {
    const id = req.params.mediaId
    const mediaExist = await Media.findById(id).exec()
    if (!mediaExist) {
      errorResponse(res, 204, 'Medai does not exist')
    } else {
      const result = await Media.deleteOne({ _id: id }).lean()
      if (result) {
        successResponse(res, 200, 'Successfully deleted ')
      } else {
        errorResponse(res, 400, 'Couldn t delete one')
      }
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}
module.exports = {
  getMedia,
  getAllMedia,
  createMedia,
  updateMedia,
  deleteMedia,
}
