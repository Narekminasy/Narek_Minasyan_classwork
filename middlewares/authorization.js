import HttpErrors from "http-errors";
import moment from "moment";
import jwt from 'jsonwebtoken';
import Users from "../models/Users.js";

const {
    PASSWORD_SECRET,
    TOKEN_SECRET,
    COOKIE_SECRET,
} = process.env;

export default async (req, res, next) => {
    try {
        const token = (req.signedCookies && req.signedCookies.usertoken)
            ? req.signedCookies.usertoken
            : (req.cookies?.usertoken || null);

        console.log("Token in middleware:", token);

        if (!token) {
            return res.redirect('/login');
        }

        let decrytData = null;
        try {
            decrytData = jwt.verify(token, TOKEN_SECRET);
        } catch (err) {
            console.log('JWT Error:', err.message);
            res.clearCookie('usertoken');
            return res.redirect('/login');
        }

        if (!decrytData || !decrytData?.userId) {
            return res.redirect('/login');
        }

        req.userId = decrytData?.userId;

        const user = await Users.findByPk(req.userId);

        if (!user) {
            return res.redirect('/login');
        }

        next();
    } catch (error) {
        next(new HttpErrors(error));
    }
}
