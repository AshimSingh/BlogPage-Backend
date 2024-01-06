module.exports = {
  blogsSchema: {
    type: 'object',
    properties: {
      author: {
        type: 'string',
        description: 'contains id of author',
        example: '64ec982b387bd42273697c1e',
      },
      categories: {
        type: 'string',
        description: 'contains id of categories',
        example: '64b7ac3999ca7090203e94ac',
      },
      title: {
        type: 'string',
        required: true,
        example: 'New Blogs',
      },
      excerpt: {
        type: 'string',
      },
      content: {
        type: 'string',
        required: true,
        example: 'this is contentasdjflaksdf',
      },
      slug: {
        type: 'string',
      },
      thumbnails: {
        type: 'string',
        example: 'asdfajklj123154',
      },
      tags: {
        type: 'array',
        example: ['hey'],
      },
    },
  },
}
