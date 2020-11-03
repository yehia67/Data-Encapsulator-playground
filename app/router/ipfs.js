const router = require('express-promise-router')();

const { jwt } = require('../services/strategies');
const { validate } = require('../middleware/validator');

const { uploadSchema } = require('../requestSchema/ipfs/upload');
const { downloadSchema } = require('../requestSchema/ipfs/download');

const {
    add,
    cat
} = require('../controller/IPFS');

router.post('/upload', jwt,validate(uploadSchema), add);
router.get('/download', jwt, validate(downloadSchema),cat);

exports.ipfsRouter = router;