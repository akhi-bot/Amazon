import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

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

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: user._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "user Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { name, email, password } = req.body;
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = bcrypt.hashSync(password, 8);
      }
    }
    const updateUser = await user.save();
    res.send({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      isSeller: updateUser.isSeller,
      token: generateToken(updateUser),
    });
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const { name, email, isSeller, isAdmin } = req.body;
    if (user) {
      user.name = name;
      user.email = email;
      user.isSeller = isSeller;
      user.isAdmin = isAdmin;
      const updateUser = await user.save();
      res.send({ message: "User Updated", user: updateUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        res.status(400).send({ message: "Can not delete Admin User" });
        return;
      }
      const deletedUser = await user.remove();
      res.send({ message: "User Delete", user: deletedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
export default userRouter;
