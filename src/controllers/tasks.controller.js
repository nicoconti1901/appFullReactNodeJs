import { pool } from "../db.js";

export const getAllTasks = async (res) => {
  const result = await pool.query("SELECT * FROM task");
  return res.json(result.rows);
};

export const getTask = async (req, res) => {
  const result = await pool.query("SELECT * FROM task WHERE id = $1", [
    req.params.id,
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "La tarea con ese ID no existe",
    });
  }
  return res.json(result.rows[0]);
};
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
    if (error.code === "23505") {
      return res.status(409).json({
        message: "La tarea con ese titulo ya existe",
      });
    }
    next(error);
  }
};
export const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const result = await pool.query(
    "UPDATE task SET title = $1, description = $2 WHERE id = $3 returning *",
    [title, description, id]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "La tarea con ese ID no existe",
    });
  }
  return res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
  const result = await pool.query("DELETE FROM task WHERE id = $1", [
    req.params.id,
  ]);
  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "La tarea con ese ID no existe",
    });
  }
  return res.sendStatus(204);
};
