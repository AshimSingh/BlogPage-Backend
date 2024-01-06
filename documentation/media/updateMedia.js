module.exports = {
  patch: {
    tags: ['Media'],
    description: 'Update a media',
    parameters: [
      {
        in: 'path',
        name: 'categoryId',
        //required: true,
        schema: {
          type: 'string',
        },
        allowReserved: true,
      },
    ],
    requestBody: {
      // expected request body
      content: {
        'multipart/form-data': {
          //writting schema for multipart form
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                required: true,
              },
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
      201: {
        description: 'Media updated successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/mediaSchema',
            },
          },
        },
      },
      401: {
        description: 'No media found',
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
