import express from 'express';

import  userInfo from '../controllers/authController.js';

const router = express.Router();

const {register,login} = userInfo;

router.post('/register', register);
router.post('/login', login);

export default router;
