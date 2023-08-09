import { pool } from "../db.js";

export const getAllTasks = (req, res) => res.send("Obteniendo tareas");

export const getTask = (req, res) => res.send("Obteniendo tarea unica");

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  //DB INSERT
  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) returning *",
      [title, description]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    if(error.code === '23505'){
    return res.send("La tarea ya existe");
  }
  next(error);
};
}
export const updateTask = (req, res) => res.send("Editando tareas");

export const deleteTask = (req, res) => res.send("Borrando tarea");
