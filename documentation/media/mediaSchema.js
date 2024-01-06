const mediaSchema = {
  mediaSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        required: true,
        example: 'Sample Image',
      },
      caption: {
        type: 'string',
        example: 'A sample image',
      },
      description: {
        type: 'string',
        example: 'This is a sample image',
      },
      alt: {
        type: 'string',
        example: 'Sample Alt Text',
      },
      path: {
        type: 'string',
        required: true,
        example: '/path/to/sample/image.jpg',
      },
      type: {
        type: 'string',
        required: true,
        default: 'image',
      },
      thumbnails: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              example: '/path/to/sample/thumb.jpg',
            },
            name: {
              type: 'string',
              example: 'Thumbnail',
            },
            width: {
              type: 'string',
              example: '100',
            },
            height: {
              type: 'string',
              example: '100',
            },
          },
        },
      },
    },
  },
}

module.exports = mediaSchema
