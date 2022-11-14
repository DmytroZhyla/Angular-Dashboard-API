const express = require('express')
const router = express.Router()
const {
    postDashboard,
    getUserDashboards,
    patchDashboard,
    getDashboardById,
    deleteDashboardById
} = require('../services/dashboardService')

const {authMiddleware} = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getUserDashboards)

router.get('/:id', authMiddleware, getDashboardById)

router.post('/', authMiddleware, postDashboard)

router.patch('/:id', authMiddleware, patchDashboard)

router.delete('/:id', authMiddleware, deleteDashboardById)

module.exports = {
    dashboardRouter: router,
}
