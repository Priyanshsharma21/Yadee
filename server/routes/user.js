import express from 'express';
import {signin, signup} from '../controllers/user.js'
import {auth} from '../middleware/auth.js';


const router = express.Router();

router.post('/signin',signin)
router.post('/signup',signup)

export default router
