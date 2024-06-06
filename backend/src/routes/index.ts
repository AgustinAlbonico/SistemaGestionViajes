import express from 'express'
const router = express.Router();

import {default as authRouter} from './authRoutes'
import {default as authAdminRouter} from './authAdminRoutes'
import {default as viajeRouter} from './viajeRoutes'
import {default as viajeAdminRouter} from './viajeAdminRoutes'

router.use('/auth', authRouter)
router.use('/auth-admin', authAdminRouter)
router.use('/viaje', viajeRouter)
router.use('/viaje-admin', viajeAdminRouter)

export default router
