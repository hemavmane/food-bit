const Mealsmodel = require("../Module/addmeal");

class MealsController {
  async addMeals(req, res) {
    try {
      let { TypeOfFood, FoodName, FoodPrice, FooOffer } = req.body;
      let mealImage = req.file.filename;

      if (!mealImage) {
        return res.status(400).json({ error: "Please add a food image" });
      }

      const newMeals = new Mealsmodel({
        TypeOfFood,
        FoodName,
        FoodPrice,
        FooOffer,
        mealImages: mealImage,
      });

      const savedMeals = await newMeals.save();

      return res.status(200).json({
        data: savedMeals,
        message: "Meals saved successfully",
      });
    } catch (error) {
      console.error(error);

      if (error.name === "ValidationError") {
        // Handle validation errors separately if needed
        return res
          .status(400)
          .json({ error: "Validation Error", details: error.errors });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async UpdateAddMeals(req, res) {
    try {
      const newMeals = Mealsmodel.findById({});
      console.log(newMeals, "newMeals");
      return res
        .status(200)
        .json({ data: newMeals, message: "Meals saved successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getAllMeals(req, res) {
    try {
      const meals = await Mealsmodel.find({});
      if (meals) {
        return res
          .status(200)
          .json({ success: "data fetched ", mealsdata: meals });
      }
    } catch (err) {
      return res.status(500).json({ err: "internal server err" });
    }
  }
}

const uMealController = new MealsController();
module.exports = uMealController;
