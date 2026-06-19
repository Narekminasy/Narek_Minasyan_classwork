import HttpErrors from "http-errors";
import moment from "moment";
import jwt from 'jsonwebtoken';
import Users from "../models/User.js";

const {
    PASSWORD_SECRET,
    TOKEN_SECRET,
    COOKIE_SECRET,
} = process.env;

export default  async (req, res, next) => {
    try {
        // const token = String(req.headers?.authorization).replace('bearer').trim() || null;
        // const token = req.signedCookies?.usertoken || req.cookies?.usertoken || null;
        const token = (req.signedCookies && req.signedCookies.usertoken) ? req.signedCookies.usertoken : (req.cookies?.usertoken || null);
        console.log(token);
        if (!token) {
            next(new HttpErrors(401));
            return;
        }
        let decrytData = null;
        try {
            decrytData = jwt.verify(token, TOKEN_SECRET);
        }catch (err){
            console.log(err.message);
        }
        if (!decrytData || !decrytData?.userId) {
            next(new HttpErrors(401));
            return;
        }
        req.userId = decrytData?.userId;

        const user = await Users.findByPk(req.userId);
        if(!user) {
            next(new HttpErrors(401));
            return;
        }
        next();
    } catch (error) {
        next(new HttpErrors(error));
    }
}