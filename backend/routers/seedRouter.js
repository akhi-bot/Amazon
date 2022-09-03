import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
const seedRouter = express.Router();

seedRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const createProducts = await Product.insertMany(data.products);
    await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createProducts, createUsers });
  })
);
export default seedRouter;
