const {
   add,
   cat
  } = require('../services/ipfs');
  

  const { controller } = require('../middleware/controller');

module.exports = {
  add: controller(add),
  cat: controller(cat),
};


  