const axios = require('axios');

const request = axios.default;

exports.handleError = ({
    error,
    next,
    ServerError,
    logger
  }) => {
  logger(error);
  next(new ServerError(error.message, 422));
}


