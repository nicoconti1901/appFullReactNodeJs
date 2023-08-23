import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(3)
    .max(255),
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email deber ser un texto",
    })
    .email({ message: "El email debe ser valido" }),
  password: z
    .string({
      required_error: "El password es requerido",
      invalid_type_error: "El password debe ser un texto",
    })
    .min(6)
    .max(255),
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email deber ser un texto",
    })
    .email({ message: "El email debe ser valido" }),
  password: z
    .string({
      required_error: "El password es requerido",
      invalid_type_error: "El password debe ser un texto",
    })
    .min(6, { message: "El password debe tener al menos 6 caracteres" })
    .max(255, { message: "El password debe tener menos de 255 caracteres" }),
});
