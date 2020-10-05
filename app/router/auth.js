const router = require('express-promise-router')();

const { jwt } = require('../services/strategies');

const { validate } = require('../middleware/validator');


const { registerSchema } = require('../requestSchema/auth/register');
const { loginSchema } = require('../requestSchema/auth/login');

const {
    self,
    register,
    login,
    logout,
} = require('../controller/Auth');


router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login.bind(self));

// jwt validated routes
router.post('/logout', jwt,  logout.bind(self));




router.get('/', (req, res) => (res.json('index')))

exports.authRouter = router;
