const blogsExample = require('./blogs/blogsExample')
const blogsSchema = require('./blogs/blogsSchema')
const categoriesExample = require('./categories/categoriesExample')
const categoriesSchema = require('./categories/categoriesSchema')
const loginExample = require('./login/loginExample')
const loginSchema = require('./login/loginSchema')
const mediaSchema = require('./media/mediaSchema')
const userExample = require('./users/userExample')
const userSchema = require('./users/userSchema')

module.exports = {
  //components schema is defined here with example
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...userSchema,
      ...categoriesSchema,
      errorSchema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          success: {
            type: 'boolean',
            example: false,
          },
        },
      },
      successSchema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          success: {
            type: 'boolean',
            example: true,
          },
        },
      },
      ...loginSchema,
      ...blogsSchema,
      ...mediaSchema,
    },
    examples: {
      ...blogsExample,
      ...userExample,
      ...loginExample,
      ...categoriesExample,
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}
