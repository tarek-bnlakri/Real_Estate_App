import express from 'express'
import {verifyJWT} from "../middleware/verifyJWT.js"
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postController.js'
const router = express.Router()

router.get('/',getPosts)
        .get('/:id',getPost)
        .post('/',verifyJWT,createPost)
        .put('/:id',verifyJWT,updatePost)
        .delete('/:id',verifyJWT,deletePost)

export default router