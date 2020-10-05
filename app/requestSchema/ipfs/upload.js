exports.uploadSchema = {
  type: 'object',
  required: [
    'body'
  ],
  properties: {
    body: {
      required: [
        'userID',
        'data'
      ],
      properties: {
        userID: {
          type: 'integer',
          exclusiveMinimum: 0,
          maximum: 1000
        },
        data: {
          type: 'string'
        },
      },
      additionalProperties: false,
    },
    query: {},
    params: {},
  },
};
