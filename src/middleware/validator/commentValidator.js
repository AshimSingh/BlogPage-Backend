const Joi = require('joi')

const validator = (schema) => async (payload) => {
  const value = await schema.validateAsync(payload)
  return value
}

const createCommentSchema = Joi.object({
  blogId: Joi.string().min(2).max(50).required(),
  comment: Joi.string().min(1).max(500).required(),
  author: Joi.string().min(2).max(500),
  likes: Joi.number(),
  dislike: Joi.number(),
})

const validateCreateComment = validator(createCommentSchema)

module.exports = {
  validateCreateComment,
}
