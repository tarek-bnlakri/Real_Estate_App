import express from 'express'
import { deleteUser, getUser, getUserPosts, getUsers, savePost, updateUser } from '../controllers/userConroller.js'
import { verifyJWT } from '../middleware/verifyJWT.js'
const router = express.Router()

router.get('/',verifyJWT,getUsers)
       .put('/:id',verifyJWT,updateUser)
       .delete('/:id',verifyJWT,deleteUser)
       .post('/save',verifyJWT,savePost)
       .get('/userPost',verifyJWT,getUserPosts)
export default router