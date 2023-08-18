import { pool } from "../db.js";
import bcryt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import md5 from "md5"


export const signin = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length === 0) {
    return res.status(400).json({
      message: "El email no esta registrado",
    });
  }

  const validPassword = await bcryt.compare(password, result.rows[0].password);

  if (!validPassword) {
    return res.status(400).json({
      message: "La contraseña es incorrecta",
    });
  }

  const token = await createAccessToken({ id: result.rows[0].id });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  });

  return res.json(result.rows[0]);
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcryt.hash(password, 10);
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;

    const result = await pool.query(
      "INSERT INTO users (username, email, password, gravatar) VALUES ($1, $2, $3, $4) returning *",
      [username, email, hashedPassword, gravatar]
    );
    const token = await createAccessToken({ id: result.rows[0].id });

    res.cookie("token", token, {
      //httpOnly: true,
      sameSite: "none",
      secure: true,
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

export const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
}

export const profile = async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [req.userId]);
  return res.json(result.rows[0]);
}
