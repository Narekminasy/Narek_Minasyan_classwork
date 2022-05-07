import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

export default (req, res, next) => {
    const token = (req.signedCookies && req.signedCookies.usertoken)
        ? req.signedCookies.usertoken
        : (req.cookies?.usertoken || null);

    if (token) {
        try {
            const verified = jwt.verify(token, TOKEN_SECRET);
            if (verified && verified.userId) {
                return res.redirect('/home');
            }
        } catch (err) {
            res.clearCookie('usertoken');
        }
    }
    next();
};
