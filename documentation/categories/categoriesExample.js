const postCategory = {
  postCategory: {
    value: {
      title: 'Technology',
      description: 'Category related to technology topics',
      slug: 'technology',
      thumbnail: '64b7ac3999ca7090203e94ac', // Sample Media ID
    },
  },
}

const updateCategory = {
  updateCategory: {
    value: {
      title: 'Updated Technology',
      description: 'Updated category related to technology topics',
      slug: 'updated-technology',
      thumbnail: 'asdfa1231565',
    },
  },
}

const deleteCategory = {
  deleteCategory: {
    value: {},
  },
}

module.exports = {
  ...postCategory,
  ...updateCategory,
  ...deleteCategory,
}
