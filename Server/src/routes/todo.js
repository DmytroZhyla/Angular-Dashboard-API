const express = require('express')
const router = express.Router()
const {} = require('../services/todo')
const {authMiddleware} = require('../middleware/authMiddleware')
const {
    getTodosAssignedToDashboard,
    postNewTodo,
    patchStatusToTodo,
    deleteTodoById,
    patchTodoName
} = require('../services/todo')

router.get('/:id', authMiddleware, getTodosAssignedToDashboard)

router.post('/:id', authMiddleware, postNewTodo)

router.patch('/:id/status', authMiddleware, patchStatusToTodo)

router.patch('/:id/name', authMiddleware, patchTodoName)

router.delete('/:id', authMiddleware, deleteTodoById)


module.exports = {
    tasksRouter: router,
}
