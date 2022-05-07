import {Router} from 'express';
import validation from "../middlewares/validation.js";
import schema from "../middlewares/schemas/users.schema.js";
import { controller } from "../controllers/users.js";
import authcheck from '../middlewares/authorization.js';
import guestCheck from '../middlewares/guest.js';


const router = new Router();


router.get("/home", authcheck, (req, res) => {
    res.render("home.ejs");
});

router.get('/register', guestCheck, (req, res) => {
    res.render('register.ejs');
});

router.post(
    '/register',
    validation(schema.register, 'body'),
    controller.register
);

router.get('/login', guestCheck, (req, res) => {
    res.render('login.ejs');
});
router.post(
    '/login',
    validation(schema.login, 'body'),
    controller.login
);

router.get('/logout', (req, res) => {
    res.clearCookie('usertoken');
    res.redirect('/login');
});


export default router;