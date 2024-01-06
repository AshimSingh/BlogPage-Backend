module.exports = {
  post: {
    tags: ['Users Login'],
    description: 'Login with email and password',
    requestBody: {
      // expected request body
      content: {
        // content-type
        'application/json': {
          schema: {
            $ref: '#/components/loginSchema/', // user input data model
          },
          examples: {
            post: {
              $ref: '#components/examples/logIn',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login successfully',
        content: {
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
                  example: 'Login Successfull',
                },
              },
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      401: {
        description: 'Invalid Credentials',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: 'false',
                },
                message: {
                  type: 'string',
                  example: 'Invalid Credentials',
                },
              },
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
