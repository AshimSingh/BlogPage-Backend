module.exports = {
  delete: {
    tags: ['Users'],
    description: 'Delete user data',
    parameters: [
      {
        in: 'path',
        name: 'userId',
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
        // content-type
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: 'true',
              },
              message: {
                type: 'string',
                example: 'User deleted Successfully',
              },
            },
            items: {
              type: 'string',
            },
          },
          examples: {
            post: {
              $ref: '#components/examples/deleteUser',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Deleted successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/successSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      204: {
        description: 'Cannot find user',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      400: {
        description: 'Cannot update user',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      401: {
        description: 'UnAuthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorSchema',
              items: {
                type: 'string',
              },
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
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
}
