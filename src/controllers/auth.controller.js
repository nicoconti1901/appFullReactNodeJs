import { pool } from "../db.js";
import bcryt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

export const signin = (req, res) => res.send("Ingresando");

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcryt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) returning *",
      [username, email, hashedPassword]
    );
    const token = await createAccessToken({ id: result.rows[0].id });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      //secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });

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
