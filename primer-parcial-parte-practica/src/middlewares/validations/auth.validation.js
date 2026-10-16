// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  body("username")
  .trim()
  .notEmpty()
  .withMessage("El username es obligatorioo")
  .idLength({ min: 3, max:20 })
  .withMessage("El username debe tener entre 3 y 20 caracteres")
  .custom(async (username) => {
    const user = await UserModel.findOne({ where: { username } });
    if (user) throw new Error("El username ya está en uso");
    return true;
  }),
  
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  
  body("email")
  .trim()
  .notEmpty()
  .withMessage("El email es obligatorio")
  .isEmail()
  .withMessage("El email debe ser válido")
  .custom(async (email) => {
    const user = await UserModel.findOne({ where: { email } });
    if (user) throw new Error("El email ya está en uso");
    return true;
  }),
  
  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  
  body("password")
  .notEmpty()
  .withMessage("El password es obligatorioo")
  .isLength({ min: 8 })
  .withMessage("El password debe tener al menos 8 caracteres"),

  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.

  body("role")
  .optional()
  .isIn(["developer", "administrador"])
  .withMessage("El rol debe ser developer o administrador"),

  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).

  body("profile.employee_number")
  .trim()
  .notEmpty()
  .withMessage("El employee_number es obligatorio")
  .custom(async (employee_number) => {
    const profile = await ProfileModel.findOne({ where: { employee_number } });
    if (profile) throw new Error("El employee_number ya está en uso");
    return true;
  }),

  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.

  body("profile.first_name")
  .trim()
  .notEmpty()
  .withMessage("El first_name es obligatorio"),

  body("profile.last_name")
  .trim()
  .notEmpty()
  .withMessage("El last_name es obligatorio"),

  body("profile.phone")
  .trim()
  .notEmpty()
  .withMessage("El profile.phone es obligatorio"),

  // ? Las unicidades requieren una validación personalizada asíncrona.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.

  body("email")
  .trim()
  .notEmpty()
  .withMessage("El email es obligatorio")
  .isEmail()
  .withMessage("El email debe ser válido"),

  // TODO: 8. Validar password: obligatoria.
  body("password")
  .notEmpty()
  .withMessage("El password es obligatorio"),
];
