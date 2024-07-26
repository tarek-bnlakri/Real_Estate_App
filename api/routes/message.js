import express from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { addMessage } from '../controllers/messagesController.js';
const router=express.Router();

    router.post('/:chatId',verifyJWT,addMessage)
    export default router