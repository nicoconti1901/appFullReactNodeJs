
import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "dfgfg23435",
      {
        expiresIn: "15m",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
