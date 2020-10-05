const config = require('../../config');
const db = require('../../models');
const { hashPassword, verifyPassword, signToken, generateJwtKey } = require('./strategies/util');
const blockchain = require('./iota')
exports.registerUser = async ({ body }) => {
    let { name, email, password } = body;
    let foundUser = await db.User.findOne({ where: { email } });
    if (foundUser) return { err: 'user with this email already exist', status: 409 };
    password = await hashPassword(password);
    let user = {};
    user.jwtKey = generateJwtKey();
    const bcAccount = await blockchain.createAccount();
    Object.assign( user, {
        name,
        email,
        password,
        ethAddress: bcAccount.address,
        privateKey: bcAccount.privateKey,
    });
    let res = await db.User.create(user);
    res = res.toJSON();
    delete res.password;
    delete res.privateKey;
    delete res.jwtKey;
    return {
        data: res,
        message: 'User registered successfully',
        status: 200
    };
};

exports.login = async ({ body }) => {
    let { email, password } = body;
    let user = await db.User.scope('withPassword').findOne({ where: { email }, raw: true });
    if (!user) {
        return { err: 'no such user', status: 404 };
    }
    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) return { err: 'wrong password', status: 406 };

    delete user.password;
    delete user.privateKey;

    let jwtKey = user.jwtKey;
    delete user.jwtKey;
    const subToken = signToken(user, jwtKey);

    const token = signToken({ id:  user.id, subToken });
    return {
        data: {
            user: user,
            token: token
        },
        message: 'login successful'
    };
};

exports.logout = async ({ user }) => {
    let { id } = user;
    await db.User.update({ jwtKey: generateJwtKey() }, { where: { id } });
    return {
        message: 'logout successful. previous tokens are now expired',
        data: true
    }
}
