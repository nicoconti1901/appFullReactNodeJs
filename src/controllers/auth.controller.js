import { pool } from "../db.js";
import bcryt from "bcrypt";

export const signin = (req, res) => res.send("Ingresando");

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcryt.hash(password, 10);
    console.log(hashedPassword);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) returning *",
      [username, email, hashedPassword]
    );
    console.log(result);
    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json({
        message: "El usuario ya existe",
      });
    }
  }
};

export const logout = (req, res) => res.send("Cerrando sesion");

export const profile = (req, res) => res.send("Perfil del usuario");
