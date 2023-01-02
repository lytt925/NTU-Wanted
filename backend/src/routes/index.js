import { Router } from 'express'
import ExpRouter from './expList'
import InfoRouter from './expInfo'
import commentRoute from './comment'
import postFormRouter from './postForm'
import userRouter from './user'

const router = Router();
router.get('/api/getExpList', ExpRouter.getExpList);
router.use('/api/getInfo', InfoRouter.getInfo);
router.get('/api/getMyexp', InfoRouter.getMyexp);
router.use('/api/getCommentsByExpId', commentRoute.GetCommentsByExpId);
router.post('/api/createComment', commentRoute.CreateComment);
router.post('/api/createReply', commentRoute.CreateReply);
router.post('/api/postForm', postFormRouter.createInfo);
router.post('/api/checkUser', userRouter.checkUser);
router.post('/api/updateLikeList', userRouter.updateLikeList)
router.post('/api/getLikedList', userRouter.getLikedList)

export default router;