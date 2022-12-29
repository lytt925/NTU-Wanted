import { Router } from 'express'
import ExpRouter from './experiment.js'
const router = Router();
router.use('/experiment', ExpRouter)
export default router;