exports.registerSchema = {
  type: 'object',
  required: [
    'body',
  ],
  properties: {
    body: {
      required: [
        'name',
        'email',
        'password',
      ],
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
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

