import userModel from "../Model/userModel.js";
import bcrypt from "bcrypt";

export async function loginMiddleware(req, res, next) {
  try {
    const { userEmail, userPassword } = req.body;

    //email check
    const user = await userModel.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    //password check
    const passwordCheck = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Wrong password" });
    }
    req.userInfo = { userEmail };
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server issue in middleware", error: err });
  }
}

export async function registerMiddleware(req, res, next) {
  try {
    const { userEmail, userPassword } = req.body;

    //email check
    const checkEmail = await userModel.findOne({ userEmail });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //hashPassword
    const hashPassword = await bcrypt.hash(userPassword, 12);
    req.userInfo = { userEmail, hashPassword };

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server issue in middleware", error: err });
  }
}
