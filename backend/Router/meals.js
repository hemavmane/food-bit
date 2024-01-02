const express = require("express");
const path = require("path");
const AddMealsControllers = require("../Controller/addMeal");
const multer = require("multer");
const { format } = require("date-fns");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/mealImage");
  },
  filename: function (req, file, cb) {
    const formattedDate = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
    cb(null, formattedDate + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/addmeals",
  upload.single("mealImages"),
  AddMealsControllers.addMeals
);
router.get("/getallmeals", AddMealsControllers.getAllMeals);
module.exports = router;
