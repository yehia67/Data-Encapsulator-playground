exports.loginSchema = {
    type: 'object',
    required: [
      'body'
    ],
    properties: {
      body: {
        required: [
          'email',
          'password',
        ],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            minLength: 6,
            maxLength: 255,
          },
          password: {
            type: 'string',
            minLength: 6,
            maxLength: 60,
          },
        },
        additionalProperties: false,
      },
      query: {},
      params: {},
    },
  };
  