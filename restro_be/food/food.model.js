import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  //   ingredients:{
  //     type:[String],
  //     required:true,
  //   },
  servingSize: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 100,
  },
  image: {
    type: String,
    required: false,
    trim: true,
    maxlength: 200,
  },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
