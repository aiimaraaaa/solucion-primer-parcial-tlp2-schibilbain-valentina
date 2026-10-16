// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import {
  ProjectModel,
  TechnologyModel,
  UserModel,
} from "../../models/index.js";

export const createProjectValidation = [
  // TODO: 1. Validar code: obligatorio y único (ProjectModel).
  body("code")
  .trim()
  .notEmpty()
  .withMessage("El code es obligatorio")
  .custom(async (code) => {
    const found = await ProjectModel.findOne({ where: { code } });
    if (found) throw new Error("El code ya existe");
    return true;
  }),

  // TODO: 2. Validar name y description como obligatorios.
  
  body("name")
  .trim()
  .notEmpty()
  .withMessage("El name es obligatorio"),

  body("description")
  .trim()
  .notEmpty()
  .withMessage("La description es obligatorio"),

  // TODO: 3. Validar status: opcional y limitado a los estados permitidos.
  
  body("status")
  .optional()
  .isIn(["planning", "in_progress", "paused", "finished"])
  .withMessage("El status no es válido"),

  // TODO: 4. Validar start_date como fecha válida y budget como número positivo, ambos obligatorios.
  
  body("start_date")
  .trim()
  .notEmpty()
  .withMessage("La start_date es obligatoria")
  .withMessage("La start_date debe de ser una fecha válida"),

  body("budget")
  .trim()
  .notEmpty()
  .withMessage("El budget es obligatorio")
  .withMessage("El budget debe ser un número positivo"),

  // TODO: 5. Validar leader_id: debe existir y pertenecer a un usuario activo (UserModel).
  
  body("leader_id")
  .trim()
  .notEmpty()
  .withMessage("El leader_id es obligatorio")
  .custom(async (leader_id) => {
    const user = await ProjectModel.finByPk({ where: { leader_id } });
    if (user) throw new Error("El leader_id no existe o está inactivo");
    return true;
  }),
  
  // TODO: 6. Validar technologies: lista de ids que existan (TechnologyModel).
  
  body("technologies")
  .isArray()
  .withMessage("technologies debe ser un awway con al menos 1 id")
  .custom(async (technologies) => {
    const found = await ProjectModel.finAll({ where: { id: technologies } });
    if (found.length !== technologies.length)
      throw new Error("Una o más technologies no existen");
      return true;
  }),

  // ? Un usuario eliminado lógicamente no puede ser líder: comprobar que la búsqueda lo deje afuera.
];

export const updateProjectValidation = [
  // TODO: 7. Validar code como opcional y único, excluyendo el propio proyecto que se edita.
  
  body("code")
  .optional()
  .trim()
  .notEmpty()
  .withMessage("El code no puede estar vacíó")
  .custom(async (code, { req }) => {
    const found = await ProjectModel.findOne({ where: { code } });
    if (found && String(found.id) !== String(req.params.id)) throw new Error("El code ya existe en otro proyecto");
    return true;
  }),
  
  // TODO: 8. Validar name y description como opcionales y no vacíos.
  
  body("name")
  .optional()
  .trim()
  .notEmpty()
  .withMessage("El name no puede estar vacio"),

  body("description")
  .optional()
  .trim()
  .notEmpty()
  .withMessage("La description no puede estar vacia"),
  
  // TODO: 9. Validar status, start_date y budget como opcionales, con las mismas reglas que al crear.
  
  body("status")
  .optional()
  .isIn(["planning", "in_progress", "paused", "finished"])
  .withMessage("El status no es válido"),
 
  body("start_date")
  .optional()
  .withMessage("El start_date debe ser una fecha válida"),

  ody("budget")
  .optional()
  .isFloat({ gt: 0 })
  .withMessage("el budget debe de ser un número positivo"),
  
  // TODO: 10. Validar leader_id como opcional, existente y de un usuario activo.
  
  body("leader_id")
  .optional()
  .isInt()
  .withMessage("El leader_id debe ser un entero")
  .custom(async (leader_id) => {
    const user = await ProjectModel.finByPk({ where: { leader_id } });
    if (user) throw new Error("El leader_id no existe o está inactivo");
    return true;
  }),
  
  // TODO: 11. Validar technologies como opcional, con ids que existan.
  
  body("technologies")
  .optional()
  .isArray({ min: 1 })
  .withMessage("technologies debe ser un awway con al menos 1 id")
  .custom(async (technologies) => {
    const found = await ProjectModel.finAll({ where: { id: technologies } });
    if (found.length !== technologies.length)
      throw new Error("Una o más technologies no existen");
      return true;
  }),
  
  // ? Para saber qué proyecto se edita, el id se obtiene de los parámetros de la ruta (req.params).
];
