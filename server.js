const express = require('express');
const port = 3000;
const logger = require('./logger/index');
const cors = require('cors');
const pool = require('./db');
const app = express();

//middleware
app.use(cors());
app.use(express.json())

//Routes
//create a data

app.post("/todos", async (req, res) => {
    try {

        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)",
            [description]
        );
        res.json(newTodo);
        logger.info(req.body)

    } catch (error) {
        logger.error(error.message)
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      logger.error(err.message);
    }
  });
  
  //get a todo
  
  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
      logger.info(todo);
      res.json(todo.rows[0]);
    } catch (err) {
      logger.error(err.message);
    }
  });
  
  //update a todo
  
  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      logger.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      logger.log(err.message);
    }
  });

app.listen(`${port}`, () => {
    console.log(`Server is running on port ${port}`)
})

