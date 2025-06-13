import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";

export async function loginUser(req, res) {
  try {
    const { user } = req.userInfo;
    const { userEmail } = user;
    const token = jwt.sign({ userEmail }, "secret");
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server issue", error: err });
  }
}

export async function registerUser(req, res) {
  try {
    const { userName } = req.body;
    const { userEmail, hashPassword } = req.userInfo;

    const newUser = await userModel.create({
      userName,
      userEmail,
      userPassword: hashPassword,
    });

    return res.status(201).json({ message: "New user created", newUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server issue", error: err });
  }
}
