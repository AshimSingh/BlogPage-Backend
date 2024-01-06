module.exports = {
  post: {
    tags: ['Media'],
    description: 'Create a new media',
    requestBody: {
      // expected request body
      content: {
        'multipart/form-data': {
          //writting schema for multipart form
          schema: {
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
                format: 'binary', //format binary as it uploads a file
              },
              type: {
                type: 'string',
                required: true,
                default: 'image',
              },
            },
          },
          examples: {
            post: {
              $ref: '#components/examples/postblog',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Blog post created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/mediaSchema',
            },
          },
        },
      },
      400: {
        description: 'Bad request - invalid blog data',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized - authentication required',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
            },
          },
        },
      },
    },
  },
}
