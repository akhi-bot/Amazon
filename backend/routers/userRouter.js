import express from "express";
import data from "../data.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    user && bcrypt.compareSync(req.body.password, user.password)
      ? res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
      : res.status(401).send({ message: "Invalid email or password" });
  })
);

export default userRouter;