import { Router } from 'express'
import ExpRouter from './experiment.js'
import InfoRouter from './info'
import commentRoute from './comment'

const router = Router();
router.use('/experiment', ExpRouter);
router.use('/api/getInfo', InfoRouter.GetInfo);
router.use('/api/getSearch', InfoRouter.GetSearch);
router.use('/api/getCommentsByExpId', commentRoute.GetCommentsByExpId);

export default router;