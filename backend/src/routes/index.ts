import express from 'express'
const router = express.Router();

import {default as authRouter} from './authRoutes'
import {default as authAdminRouter} from './authAdminRoutes'
import {default as viajeRouter} from './viajeRoutes'

router.use('/auth', authRouter)
router.use('/auth-admin', authAdminRouter)
router.use('/viaje', viajeRouter)

export default router
