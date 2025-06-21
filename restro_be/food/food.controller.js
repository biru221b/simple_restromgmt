import express from "express";
import isValidAdmin from "../middleware/authentication.middleware.js";
import Food from "./food.model.js";
import mongoose from "mongoose";

const router = express.Router();

// * add food item
router.post("/food/add", isValidAdmin, async (req, res) => {
  // extract new food from req.body
  const newFood = req.body;

  // add food
  await Food.create(newFood);

  // send res
  return res.status(201).send({ message: "Food item is added successfully." });
});

// * list food item
router.get("/food/list", isValidAdmin, async (req, res) => {
  const foods = await Food.find();

  return res.status(200).send({ message: "success", foodList: foods });
});

// * delete food item
router.delete("/food/delete/:id", isValidAdmin, async (req, res) => {
  // extract food id from req.params
  const foodId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(foodId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find food item using food id
  const foodItem = await Food.findOne({ _id: foodId });

  // if not food item, throw error
  if (!foodItem) {
    return res.status(404).send({ message: "Food item does not exist." });
  }

  // delete food item
  await Food.deleteOne({ _id: foodId });

  // send res
  return res
    .status(200)
    .send({ message: "Food item is deleted successfully." });
});

// * edit food item
router.put("/food/edit/:id", isValidAdmin, async (req, res) => {
  // extract food id from req.params
  const foodId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(foodId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find food item using food id
  const foodItem = await Food.findOne({ _id: foodId });

  // if not food item, throw error
  if (!foodItem) {
    return res.status(404).send({ message: "Food item does not exist." });
  }

  //extract new values from req.body
  const newValues = req.body;

  // edit food item
  await Food.updateOne(
    { _id: foodId },
    {
      $set: {
        ...newValues,
      },
    }
  );

  // send res
  return res
    .status(200)
    .send({ message: "Food item is updated successfully." });
});

// * get food details by id
router.get("/food/detail/:id", isValidAdmin, async (req, res) => {
  // extract food id from req.params
  const foodId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(foodId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find food item  by food id
  const foodItem = await Food.findOne({ _id: foodId });

  // if not food item, throw error
  if (!foodItem) {
    return res.status(404).send({ message: "Food item does not exist." });
  }

  // send res
  return res.status(200).send({ message: "success", foodDetail: foodItem });
});
export default router;
