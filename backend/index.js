const express = require('express');
const { createTodo, updateTodo } =  require('./types');
const { todo } = require('./db');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

//body

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if(!parsePayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    
    res.json({
        msg: "Todo created"
    })

})

app.get("/todos", async (req, res) => {
    const todos = await todo.find();
    res.json({
        todos
    })
})

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    // update todo
    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })
})

app.listen(3000);