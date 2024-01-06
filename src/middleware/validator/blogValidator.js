const Joi = require('joi')

const validator = (schema) => async (payload) => {
  const value = await schema.validateAsync(payload)
  return value
}

const createBlogSchema = Joi.object({
  userId: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(5).max(100),
  content: Joi.string().min(5).max(500),
  categories: Joi.string().min(3).max(30).required(),
  excerpt: Joi.string().min(5).max(500),
  thumbnail: Joi.string().min(1).max(1000),
  tags: Joi.array().items(Joi.string().min(1).max(50)).max(8),
  published: Joi.boolean(),
  //   Joi.object({
  //     tag: Joi.string().required(),
  //   }),
  slug: Joi.string().min(5).max(100),
  // userId: Joi.string().min(3).max(50),
  featured: Joi.boolean(),
  priority: Joi.number().integer().greater(-1),
  timetoRead: Joi.string().min(5).max(20),
})
const updateBlogSchema = Joi.object({
  // id: Joi.string().min(3).max(30).required(),
  author: Joi.string().min(3).max(30).required(),
  userId: Joi.string().min(3).max(30).required(),
  title: Joi.string().min(5).max(100),
  content: Joi.string().min(5).max(500),
  categories: Joi.string().min(3).max(30).required(),
  excerpt: Joi.string().min(5).max(500),
  thumbnail: Joi.string().min(1).max(1000),
  tags: Joi.array().items(Joi.string().min(1).max(50)).max(8),
  slug: Joi.string().min(5).min(1).max(100),
  // userId: Joi.string().min(3).max(50),
  published: Joi.boolean(),
  featured: Joi.boolean(),
  priority: Joi.number().integer().greater(-1),
  timetoRead: Joi.string().min(5).max(20),
})
const deleteBlog = Joi.object({
  // id: Joi.string().min(3).max(30).required(),
  userId: Joi.string().min(3).max(50),
  author: Joi.string().min(3).max(50).required(),
})

const validateCreateBlog = validator(createBlogSchema)
const validateUpdateBlog = validator(updateBlogSchema)
const validateDleteBlog = validator(deleteBlog)

module.exports = {
  validateCreateBlog,
  validateUpdateBlog,
  validateDleteBlog,
}
