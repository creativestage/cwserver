const jwt = require('jsonwebtoken');
const tokenKey = 'a496b5c7d88891b73b92ee43c0725882';
const defualtConfig = {
    expiresIn: '30 days' // 设置过期时间
};
export const sign = (jsonObj, options = {}) => jwt.sign(jsonObj, tokenKey, Object.assign({}, defualtConfig, options));

export const verifySign = (token) => new Promise((resolve) => {
    jwt.verify(token, tokenKey, function (err) {
      resolve(!err);
    });
});
