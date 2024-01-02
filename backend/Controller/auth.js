const UserModal = require("../Module/auth"); // Assuming your model is in a 'models' directory

class Usercontroller {
  async signupController(req, res) {
    const { username, email, PhoneNumber, password, lastName } = req.body;

    try {
      // Check if the email or username is already taken
      const existingUser = await UserModal.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email or username is already exist" });
      }

      // Create a new user
      const newUser = new UserModal({
        username,
        email,
        password,
        PhoneNumber,
        lastName,
      });

      // Save the user to the database
      let userData = await newUser.save();

      res
        .status(200)
        .json({ data: userData, message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
const userControllerInstance = new Usercontroller();
module.exports = userControllerInstance;
