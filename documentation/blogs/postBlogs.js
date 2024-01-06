module.exports = {
  post: {
    tags: ['Blogs'],
    description: 'Create a new blog post',
    requestBody: {
      // expected request body
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/blogSchema/', // blog input data model
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
        description: 'Blog post created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/blogsSchema',
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
