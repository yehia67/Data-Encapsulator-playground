exports.downloadSchema = {
  type: 'object',
  required: [
    'body'
  ],
  properties: {
    body: {
      required: [
        'userID',
        'hash'
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
