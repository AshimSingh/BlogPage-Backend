module.exports = {
  categoriesSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        required: true,
        example: 'News Category',
      },
      description: {
        title: {
          type: 'string',
          example: 'this is news 24 ',
          required: true,
        },
      },
      slug: {
        type: 'string',
        example: 'this is slug ',
      },
      thumbnail: {
        type: 'string',
      },
    },
  },
}
