const express = require('express');
const router = express.Router()

const { getTodos,
    addTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById } = require('./todos.controller');

router.get('/', getTodos)
router.post('/', express.json(), addTodo)
router.get('/:todo_id', getTodoById)
router.put('/:todo_id', express.json(), updateTodoById)
router.delete('/:todo_id', deleteTodoById)

module.exports = router;