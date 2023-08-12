import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const password = req.body.password;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  try {
    const user = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.json({
      message: "Ползователь успешно создан",
    });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось создать ползователья",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        message: "Пользователь не найден",
      });
      return; //? Add a return statement to exit early if user not found
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).json({
        message: "Неверный E-mail или Пароль",
      });
      return; //? Add a return statement to exit early if password is invalid
    }

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { password, ...userData } = user._doc;
    res.json({ token, userData });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось авторизоваться",
      error: err,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        messsage: "Ползователь не найден",
      });
    }
    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
