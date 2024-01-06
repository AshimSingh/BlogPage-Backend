/* eslint-disable no-unused-vars */
const Categories = require('../models/categories')
const { successResponse } = require('../helper/response')
const { errorResponse } = require('../helper/response')
const {
  validateCreateCat,
  validateUpdateCat,
  validateDeleteCat,
} = require('../middleware/validator/categoriesValidator')
const mediaHelper = require('../helper/mediaUrlHelper')
const { slugCreator, slugExist } = require('../helper/slugCreator')
const { pageInitionHelper } = require('../helper/pageinitionHelper')

const imageUrlAdderToData = async (req, data) => {
  console.log(data, data.length)
  for (var i = 0; i < data.length; i++) {
    const image_url = await mediaHelper(req, data[i]?.thumbnail?.path)
    data[i] = { ...data[i]?._doc }
    data[i].thumbnail = { ...data[i]?.thumbnail?._doc, image_url }
    //adding image url to thumbnail thumbnails from thumbnails path
    var thumbnails_data = []
    for (var j = 0; j < data[i]?.thumbnail?.thumbnails?.length; j++) {
      var url = await mediaHelper(req, data[i]?.thumbnail?.thumbnails[j].path)
      thumbnails_data.push({
        ...data[i].thumbnail.thumbnails[j]._doc,
        image_url: url,
      })
    }
    data[i].thumbnail.thumbnails = thumbnails_data
  }
  return data
}

const getAllCategories = async (req, res, next) => {
  try {
    var { page, limit, sort, skip } = pageInitionHelper(req)
    var search = req.query.search
    var sortObject = {}
    sortObject[sort.sortBy] = sort.sortOrder
    var filter = req.query.filter
    var searchObj = {}
    if (search) {
      searchObj['title'] = new RegExp(search, 'i')
    }
    const categories = await Categories.find(searchObj)
      .skip(skip)
      .limit(limit)
      .sort(sortObject)
      .populate({ path: 'thumbnail' })
    var totalCount = await Categories.countDocuments(searchObj)
    var totalPage =
      totalCount % limit == 0
        ? totalCount / limit
        : Math.floor(totalCount / limit) + 1

    if (!categories) {
      successResponse(res, 200, 'No categories')
    } else {
      var data = await imageUrlAdderToData(req, categories)
      successResponse(
        res,
        200,
        'Categories',
        data,
        page,
        limit,
        totalCount,
        totalPage,
        sort,
      )
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const getCategory = async (req, res, next) => {
  try {
    const slug = req.params.slug

    const categories = await Categories.findOne({ slug }).populate({
      path: 'thumbnail',
    })

    if (!categories) {
      successResponse(res, 200, 'No categories')
    } else {
      var data = await imageUrlAdderToData(req, categories)
      successResponse(res, 200, 'Categories', data)
    }
  } catch (err) {
    next(err)
  }
}

const createCategories = async (req, res, next) => {
  try {
    const value = await validateCreateCat(req.body)
    var { title, description, slug, thumbnail } = req.body
    //if slug is not provided then
    if (slug == null || slug == undefined) {
      slug = await slugCreator(title, Categories)
      console.log('slug from controller', slug)
      if (!slug) {
        return errorResponse(res, 400, 'somethig went wrong generating slug')
      }
    } else {
      //if slug is provided must check slug
      const is_slugExist = await slugExist(slug, Categories)
      if (is_slugExist) {
        return errorResponse(res, 400, 'Slug exist reenter slug')
      }
      // it returns false if slug already exists then it returns error from that function only
    }
    const newCategories = await Categories.create({
      title,
      description,
      slug,
      thumbnail,
    })
    if (newCategories) {
      var result = await Categories.findById(newCategories._id).populate({
        path: 'thumbnail',
      })
      if (result) {
        var data = await imageUrlAdderToData(req, [result])
        return successResponse(res, 200, 'Created Categories', data)
      } else {
        errorResponse(res, 204, 'Categories not created something went wrong')
      }
    } else {
      return errorResponse(res, 204, 'No user found')
    }
  } catch (err) {
    next(err)
  }
}
const updateCategories = async (req, res, next) => {
  try {
    const slugPrams = req.params.slug
    console.log(slugPrams, 'this is slug')
    if (slugPrams) {
      const value = await validateUpdateCat(req.body)
      var { title, description, slug, id } = req.body
      const categoryExist = await Categories.findOne({ slug: slugPrams }).exec()
      //if slug is not provided then
      if (slug == null || slug == undefined) {
        slug = await slugCreator(title, Categories)
        if (!slug) {
          return errorResponse(res, 400, 'somethig went wrong generating slug')
        }
      } else {
        //if slug is provided must check slug
        //  await sendEmail()
        const is_slugExist = await slugExist(slug, Categories, id)
        if (is_slugExist) {
          return errorResponse(res, 400, 'Slug exist reenter slug')
        }
        // it returns true if slug already exists
      }
      if (!categoryExist) {
        errorResponse(res, 204, 'Category not found')
      } else {
        categoryExist.title = title
        categoryExist.description = description
        categoryExist.slug = slug
        var result = await categoryExist.save()
        result = await result.populate({ path: 'thumbnail' })
        if (result) {
          var data = await imageUrlAdderToData(req, [result])

          return successResponse(res, 200, 'Updated Categories', data)
        } else {
          return errorResponse(res, 204, 'Category not updated')
        }
      }
    } else {
      return errorResponse(res, 400, 'Id is required')
    }
  } catch (err) {
    next(err)
  }
}

const deleteCategories = async (req, res, next) => {
  try {
    const slug = req.params.slug
    if (slug) {
      const categoryExist = await Categories.findOne({ slug: slug }).exec()
      if (!categoryExist) {
        errorResponse(res, 204, 'Category does not exist')
      } else {
        const result = await Categories.deleteOne({ slug: slug }).lean()
        if (result) {
          successResponse(res, 200, 'Successfully deleted category')
        } else {
          // eslint-disable-next-line quotes
          errorResponse(res, 400, `Couldn't delete one`)
        }
      }
    } else {
      return errorResponse(res, 400, 'Id is required')
    }
  } catch (err) {
    next(err)
  }
}
module.exports = {
  getAllCategories,
  getCategory,
  createCategories,
  updateCategories,
  deleteCategories,
}
