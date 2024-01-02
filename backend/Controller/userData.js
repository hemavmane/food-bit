const UserDatamodel = require("../Module/userData"); // Assuming your model is in a 'models' directory

class UserDataController {
  async addUserData(req, res) {
    const {
      userId,
      gender,
      age,
      height,
      weight,
      BMI,
      occupation,
      medicalcenquiry,
      foodhabit,
      foodalergies,
      foodtimes,
      breakfast,
      lunch,
      snack,
      dinner
    } = req.body;

    try {
      const newUserdata = new UserDatamodel({
        userId,
        gender,
        age,
        height,
        weight,
        BMI,
        occupation,
        medicalcenquiry,
        foodhabit,
        foodalergies,
        foodtimes,
        breakfast,
        lunch,
        snack,
        dinner
      });

      // Save the user data to the database
      let userData = await newUserdata.save();

      res
        .status(200)
        .json({ data: userData, message: "Details added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const userController= new UserDataController();
module.exports = userController;