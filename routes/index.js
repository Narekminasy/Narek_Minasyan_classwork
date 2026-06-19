import {Router} from 'express';
import routerUsers from '../routes/users.js';

const router = new Router();


router.use('/users', routerUsers);



export default router;
