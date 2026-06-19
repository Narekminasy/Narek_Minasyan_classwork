import {Router} from 'express';
import routerUsers from '../routes/users.js';

const router = new Router();


router.use('/', routerUsers);



export default router;
