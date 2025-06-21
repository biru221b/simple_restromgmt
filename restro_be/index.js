import express from "express";
import connectDB from "./connect.db.js";
import adminRoutes from "./admin/admin.controller.js";
import foodRoutes from "./food/food.controller.js";

const app = express();

app.use(express.json());

connectDB();

app.use(adminRoutes);

app.use(foodRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
