const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  mealImages: {
    type: String,
  },
  TypeOfFood: {
    type: String,
  },
  FoodName: {
    type: String,
  },
  FoodPrice: {
    type: String,
  },
  FooOffer: {
    type: String,
  },


  
});

const Meals = mongoose.model("meals", MealSchema);

module.exports = Meals;
