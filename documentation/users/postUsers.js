module.exports = {
  post: {
    tags: ['Users'],
    description: 'Post user data which will create user in database',
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/userSchema/', // user input data model
          },
          examples: {
            post: {
              $ref: '#components/examples/postUser',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Updated successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userSchema',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      409: {
        description: 'User already exists',
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
        description: 'Invalid Credintials',
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
