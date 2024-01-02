const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  BMI: {
    type: String,
  },
  occupation: {
    type: Object,
  },
  medicalcenquiry: {
    type: Object,
  },
  foodhabit: {
    type: Object,
  },
  foodalergies: {
    type: Object,
  },
  foodtimes: {
    type: Object,
  },
  breakfast: {
    type: String,
  },
  lunch: {
    type: String,
  },
  snack: {
    type: String,
  },
  dinner: {
    type: String,
  },
});

const Userdat = mongoose.model("details", userDataSchema);

module.exports = Userdat;
