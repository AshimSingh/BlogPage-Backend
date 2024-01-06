module.exports = {
  deleteMedia: {
    tags: ['Media'],
    description: 'Delete an existing media item',
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
        'application/json': {
          schema: {
            $ref: '#/components/mediaSchema/', // media input data model
          },
          examples: {
            post: {
              $ref: '#components/examples/deletemedia',
            },
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Media item deleted successfully',
      },
      404: {
        description: 'Media item not found',
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
