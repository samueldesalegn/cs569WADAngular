const Todo = require("./todos.model")

async function getTodos(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const results = await Todo.find({}).skip((page - 1) * 10).limit(11);
        res.json({ success: true, data: results.slice(0, 10), next: results.length === 11 })
    } catch (e) {
        next(e)
    }
}
async function addTodo(req, res, next) {
    try {
        const results = await Todo.create({ ...req.body });
        res.json({ success: true, data: results })
    } catch (e) {
        next(e)
    }
}
async function getTodoById(req, res, next) {
    try {
        const { todo_id } = req.params;
        const results = await Todo.findOne({ _id: todo_id });
        res.json({ success: true, data: results })
    } catch (e) {
        next(e)
    }
}
async function updateTodoById(req, res, next) {
    try {
        const { todo_id } = req.params;
        const results = await Todo.updateOne({ _id: todo_id },
            req.body);
        res.json({ success: true, data: results })
    } catch (e) {
        next(e)
    }
}
async function deleteTodoById(req, res, next) {
    try {
        const { todo_id } = req.params;
        const results = await Todo.deleteOne({ _id: todo_id });
        res.json({ success: true, data: results })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getTodos,
    addTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById
} 