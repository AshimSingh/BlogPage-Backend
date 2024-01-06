const deleteCategories = require('./deleteCategories')
const getAllCategories = require('./getAllCategories')
const getCategory = require('./getCategory')
const postCategories = require('./postCategories')
const searchCategory = require('./searchCategory')
const updateCategories = require('./updateCategories')

module.exports = {
  '/blogs/categories': {
    ...getAllCategories,
    ...postCategories,
  },
  '/blogs/categories/{categoryId}': {
    ...getCategory,
    ...updateCategories,
    ...deleteCategories,
  },
  '/blogs/categories/?': {
    ...searchCategory,
  },
}
