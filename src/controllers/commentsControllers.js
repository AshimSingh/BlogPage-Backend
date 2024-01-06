const { errorResponse, successResponse } = require('../helper/response')
const {
  validateCreateComment,
} = require('../middleware/validator/commentValidator')
const { pageInitionHelper } = require('../helper/pageinitionHelper')
const Comment = require('../models/comments')
const { validate } = require('../models/blog')

const getAllComments = async (req, res, next) => {
  var { page, limit, sort, skip } = await pageInitionHelper(req)
  let sortObject = {}
  sortObject[sort.sortBy] = sort.sortOrder
  var search = req.query.search || req.params.slug
  var searchBy = req.query.searchby || 'blogId'
  let searchObj = {}
  var blogSlug = req.params.slug
  console.log(search, 'is here')
  if (search) {
    if (searchBy !== 'author' && searchBy !== 'blogId') {
      searchObj[searchBy] = new RegExp(search, 'i')
    } else {
      searchObj[searchBy] = search
    }
  }
  try {
    const commentsData = await Comment.find()
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'author',
        select: ['firstname', 'lastname', 'slug'],
      })
      console.log(searchObj,commentsData,blogSlug)
    if (commentsData) {
      return successResponse(res, 200, 'Comments', commentsData)
    } else {
      return errorResponse(res, 204, 'Comments Not Found')
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const createComment = async ({ author, comment, blogId }) => {
  const commentValidation = await validateCreateComment({
    author,
    comment,
    blogId,
  })
  try {
    var commentObj = new Comment({
      author,
      text: comment,
      blogId: blogId,
    })
    const commentData = await commentObj.save()
    console.log(commentData)
  } catch (error) {
    console.log(error, 'ash')
  }
}

module.exports = {
  getAllComments,
  createComment,
}
