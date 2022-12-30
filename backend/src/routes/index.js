import { Router } from 'express'
import ExpRouter from './expList'
import InfoRouter from './expInfo'
import commentRoute from './comment'

const router = Router();
router.get('/api/getExpList', ExpRouter.getExpList);
router.use('/api/getInfo', InfoRouter.getInfo);
router.use('/api/getCommentsByExpId', commentRoute.GetCommentsByExpId);
router.post('/api/createComment', commentRoute.CreateComment);
router.post('/api/createReply', commentRoute.CreateReply);

export default router;