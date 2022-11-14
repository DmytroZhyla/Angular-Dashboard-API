const {Todo} = require('../models/todo')

const postNewTodo = (req, res, next) => {
    const {name, assigned_to_board, status} = req.body.data;
    const todo = new Todo({
        created_by: req.user.userId,
        name,
        assigned_to_board,
        status
    })
    if (!name && !assigned_to_board) {
        return res.status(400).send({
            message: 'Please fill your task'
        })
    }
    todo.save()
        .then(() => res.json({
            todo
        }))
        .catch(err => {
            next(err);
        });
}

function getTodosAssignedToDashboard(req, res) {
    console.log(req.params.id)
    if (!req.params.id) {
        return res.status(400).send({
            'message': 'Select dashboard'
        })
    }
    return Todo.find().then((result) => {
        let arr = []
        result.forEach((element) => {
            if (req.params.id === element.assigned_to_board.toString()) {
                arr.push(element)
            }
        })
        res.status(200).send({
            todo: arr
        })
    });
}

async function deleteTodoById(req, res) {
    return await Todo.findByIdAndDelete(req.params.id)
        .then((todo) => {
            if (req.user.userId === todo.created_by.toString()) {
                res.send({
                    "message": "todo deleted successfully"
                });
            } else {
                res.status(400).send({message: "wrong id"})
            }
        })
}

async function patchStatusToTodo(req, res) {
    const todo = await Todo.findById(req.params.id);
    todo.status = req.body.status
    return todo.save().then(() => {
        res.status(200).send({
            "message": `task status with id ${todo._id}, changed successfully`
        })
    });
}

async function patchTodoName(req, res) {
    const todo = await Todo.findById(req.params.id);
    todo.name = req.body.name
    return todo.save().then(() => {
        res.status(200).send({
            "message": `task name with id ${todo.name}, changed successfully`
        })
    });
}
module.exports = {
    postNewTodo,
    getTodosAssignedToDashboard,
    deleteTodoById,
    patchStatusToTodo,
    patchTodoName
}
