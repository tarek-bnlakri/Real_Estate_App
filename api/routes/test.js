import express from 'express';
import { shouldBeAdmin, shouldBeLoggedIn } from '../controllers/testConroller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
const router=express.Router()

router.get('/should-be-logged-in',verifyJWT,shouldBeLoggedIn)
router.get('/should-be-admin',shouldBeAdmin)

export default router