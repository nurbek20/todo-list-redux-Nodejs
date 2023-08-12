import { body } from "express-validator";

//? Registration
export const registerValidation = [
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({ min: 5 }),
];

//? Login
export const loginValidation=[
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быт минимум 5 символов').isLength({min:5})
]