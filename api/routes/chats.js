import express from 'express'
import {verifyJWT} from '../middleware/verifyJWT.js'
import { addChat, getAllChats, getChat, readChat } from '../controllers/chatController.js';
const router= express.Router();

    router.get('/',verifyJWT,getAllChats)
    .get('/:id',verifyJWT,getChat)
    .post('/',verifyJWT,addChat)
    .put('/read/:id',verifyJWT,readChat)
export default router