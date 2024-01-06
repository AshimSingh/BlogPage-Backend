const deleteBlog = require('./deleteBlog')
const getAllBlogs = require('./getAllBlogs')
const postBlogs = require('./postBlogs')
const updateBlogs = require('./updateBlogs')
const getBlog = require('./getBlog')
const searchBlog = require('./searchBlog')

module.exports = {
  '/blogs': {
    ...getAllBlogs,
    ...postBlogs,
  },
  '/blogs/{blogId}': {
    ...getBlog,
    ...updateBlogs,
    ...deleteBlog,
  },
  '/blogs/?': {
    ...searchBlog,
  },
}
