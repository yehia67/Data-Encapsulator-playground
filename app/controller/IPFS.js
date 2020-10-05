const {
   add,
   cat
  } = require('../services/ipfs');
  
  const { ServerError } = require('../../serverConfig');

  module.exports = new class UserController {
      self = this;
  
      async uploadData(req, res, next) {
          const { err, status, message, data } = await add(req);
          if (err) return next(new ServerError(err, status));
          res.json({ message, data });
      }

      async downloadData(req, res, next) {
        const { err, status, message, data } = await cat(req);
        if (err) return next(new ServerError(err, status));
        res.json({ message, data });
    }
  }
  
  