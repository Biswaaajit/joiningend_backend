import { loginUser, registerUser } from "../Controller/userController.js";
import {
  loginMiddleware,
  registerMiddleware,
} from "../Middleware/userMiddleware.js";

function userRouter(userRoute) {
  userRoute.post("/login", loginMiddleware, loginUser);
  userRoute.post("/register", registerMiddleware, registerUser);
}

export default userRouter;
