module.exports = {
  get: {
    tags: ['Users'],
    description: 'Patch user data which will updated user in database',
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
    responses: {
      201: {
        description: 'Registered successfully',
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
        description: 'Cannot create user',
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
