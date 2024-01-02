import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import FormControl from "@mui/material/FormControl";
// import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import InputLabel from "@mui/material/InputLabel";
import "../App.css";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import axios from "axios";
import toast from "react-hot-toast";
// import { BsFileMedicalFill } from "react-icons/bs";

export default function Quetions() {
  const [completed, setCompleted] = useState(0);

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [BMI, setBMI] = useState("");
  const [occupation, setOccupation] = useState("");
  const [Foodhabbit, setFoodhabbit] = useState("");
  const [foodAlergie, setFoodAlergie] = useState("");
  const [foodTime, setFoodTime] = useState("");
  const [medical, setmedical] = useState("");

  const [breakfasts, setBreakfasts] = useState("");
  const [lunchs, setlunchs] = useState("");
  const [snacks, setsnacks] = useState("");
  const [dinners, setdinners] = useState("");

  const [GetMeals, setGetMeals] = useState("");
  const handleGenderClick = selectedGender => {
    setGender(selectedGender);
  };

  const handleNext = () => {
    if (completed >= 12) {
      setCompleted(0);
    } else {
      setCompleted(completed + 1);
    }
  };
  const handlePrevious = () => {
    if (completed <= 0) {
      setCompleted(12);
    } else {
      setCompleted(completed - 1);
    }
  };
  //occupation

  const [occupations, setOccupations] = useState({
    Student: false,
    Business: false,
    "Daily Wage Labour": false,
    Farming: false,
    "Private Service": false,
    Housewife: false,
    others: false,
    // Custom: "",
  });

  const handleOccupationChange = key => {
    setOccupations({
      ...Object.fromEntries(
        Object.entries(occupations).map(([k, v]) => [k, k === key])
      ),
    });
    setOccupation(key);
  };

  const handleCustomInput = event => {
    setOccupation(prevOccupations => ({
      ...prevOccupations,
      custom: event.target.value,
    }));
  };
  //medical

  const [Medicals, setMedicals] = useState({
    Diabetes: false,
    "High Blood Pressure": false,
    "Heart disease": false,
    "Eating disorder": false,
    "Depression/Anexicty": false,
    "kidney disease": false,
    "No i don't have any disease": false,
    others: false,
  });
  const handleHeatlCare = key => {
    setMedicals({
      ...Object.fromEntries(
        Object.entries(Medicals).map(([k, v]) => [k, k === key])
      ),
    });
    setmedical(key);
  };

  const handlehealthInput = event => {
    setmedical(prevOccupations => ({
      ...prevOccupations,
      custom: event.target.value,
    }));
  };

  //food habit

  const [foodhabbits, setFoodhabbits] = useState({
    Diabetes: false,
    "I am Vegeterian ": false,
    "I am Non- Vegeterian": false,
    "I am Ovo- Vegeterian ": false,
    "I am Lacto- Vegeterian ": false,
  });

  const handleFoodhabbitChange = key => {
    setFoodhabbits({
      ...Object.fromEntries(
        Object.entries(foodhabbits).map(([k, v]) => [k, k === key])
      ),
    });
    setFoodhabbit(key);
  };

  ///food alergies

  const [foodAlergies, setFoodAlergies] = useState({
    Yes: false,
    No: false,
  });
  const handleAllergiesChange = key => {
    setFoodAlergies({
      ...Object.fromEntries(
        Object.entries(foodAlergies).map(([k, v]) => [k, k === key])
      ),
    });
    setFoodAlergie(key);
  };

  const handleallegiesCustomInput = event => {
    setFoodAlergie(prevOccupations => ({
      ...prevOccupations,
      custom: event.target.value,
    }));
  };

  ///food time

  const [foodTimes, setFoodTimes] = useState({
    "Less than 3": false,
    "3 meals a day": false,
    "4-5 meals a day": false,
    "more than 5 meals a day": false,
  });
  const handleTimesChange = key => {
    setFoodTimes({
      ...Object.fromEntries(
        Object.entries(foodTimes).map(([k, v]) => [k, k === key])
      ),
    });
    setFoodTime(key);
  };

  const handleTimesCustomInput = event => {
    setFoodTime(prevOccupations => ({
      ...prevOccupations,
      custom: event.target.value,
    }));
  };
  // details
  let userData = null; // Declare userData using let so that you can reassign it
  console.log(userData);
  const user = localStorage.getItem("userData");
  if (user) {
    userData = JSON.parse(user); // Assign the parsed user data to userData
  } else {
    console.log("User data not found in localStorage");
  }
  const handleSaveDetails = async () => {
    try {
      const config = {
        url: "http://localhost:8000/api/details",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          userId: userData._id,
          gender: gender,
          age: age,
          height: height,
          weight: weight,
          BMI: BMI,
          occupation: occupation || occupation.custom,
          medicalcenquiry: medical || medical.custom,
          foodhabit: Foodhabbit || Foodhabbit.custom,
          foodalergies: foodAlergie || foodAlergie.custom,
          foodtimes: foodTime || foodTime.custom,
          breakfast: breakfasts,
          lunch: lunchs,
          snack: snacks,
          dinner: dinners,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        // alert("succesfully registered");
        console.log(response.data);
        window.location.assign("/Quetions");
        toast.success("Succesfully sign up completed");
      }
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  useEffect(() => {
    getAllMeals();
  }, []);
  const getAllMeals = async () => {
    try {
      let response = await axios.get("http://localhost:8000/api/getallmeals");
      if (response.status === 200) {
        setGetMeals(response.data.mealsdata);
        // console.log(response.data);
        // alert(response.data.success);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(GetMeals, "GetMealsGetMeals");
  const handlebreakFast = id => {
    setBreakfasts(id);
  };
  const handleLunch = id => {
    setlunchs(id);
  };
  const handleSnacks = id => {
    setsnacks(id);
  };
  const handelDinner = id => {
    setdinners(id);
  };
  const home = () => {
    window.location.assign("/");
  };
  return (
    <div className="container">
      <div className="row">
        <span>
          <HomeIcon onClick={home} style={{ fontSize: "30px" }} />
        </span>
        {completed <= 3 && (
          <>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 0 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 1 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 2 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 3 ? "bar" : "barb"
              }`}></span>
          </>
        )}

        {completed > 3 && completed <= 6 && (
          <>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 4 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 5 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 6 ? "bar" : "barb"
              }`}></span>
          </>
        )}

        {completed > 7 && (
          <>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 8 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 9 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 10 ? "bar" : "barb"
              }`}></span>
            <span
              className={`col-md-1 me-2 p-1 mt-5 barb  ${
                completed >= 11 ? "bar" : "barb"
              }`}></span>
          </>
        )}
      </div>

      <div className="row">
        {completed <= 3 && (
          <p>
            <ArrowBackIcon className="me-2" onClick={handlePrevious} />
            Basic Details
          </p>
        )}
        {completed > 3 && completed <= 6 && (
          <p>
            <ArrowBackIcon className="me-2" onClick={handlePrevious} />
            Diet habbit
          </p>
        )}
        {completed === 7 && (
          <>
            <div className="row mb-3">
              <p>
                <ArrowBackIcon className="me-2" onClick={handlePrevious} />
              </p>
            </div>
          </>
        )}
        {completed > 7 && (
          <p>
            <ArrowBackIcon className="me-2" onClick={handlePrevious} />
            Meal preference
          </p>
        )}
      </div>

      <div className="row">
        <div className="col-md-1"> </div>
        <div className="col-md-10  shadow p-4   rounded">
          <div className="row m-auto ">
            {completed === 0 && (
              <>
                <div className="row">
                  <p>What is your gender?</p>

                  <button
                    className={`btnbrd p-1 m-auto col-md-3 ${
                      gender === "Male" ? "selected" : ""
                    }`}
                    onClick={() => handleGenderClick("Male")}>
                    Male
                  </button>

                  <button
                    className={`btnbrd p-1 m-auto col-md-3 ${
                      gender === "Female" ? "selected" : ""
                    }`}
                    onClick={() => handleGenderClick("Female")}>
                    Female
                  </button>

                  <button
                    className={`btnbrd p-1 m-auto col-md-3 ${
                      gender === "Others" ? "selected" : ""
                    }`}
                    onClick={() => handleGenderClick("Others")}>
                    Others
                  </button>
                </div>
                <div className="row mt-4">
                  <p>How old are you?</p>

                  <FormControl>
                    <Input
                      value={age}
                      type="date"
                      onChange={e => setAge(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="age"
                    />
                  </FormControl>
                </div>
              </>
            )}
            {completed === 1 && (
              <>
                <div className="row mb-3">
                  <p>What is your current weight?</p>

                  <FormControl>
                    <Input
                      fullWidth
                      onChange={e => setWeight(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="in kg"
                    />
                  </FormControl>
                </div>
                <div className="row mb-3">
                  <p>What is your current height?</p>

                  <FormControl>
                    <Input
                      fullWidth
                      onChange={e => setHeight(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="in cm"
                    />
                  </FormControl>
                  <p>BMI</p>
                  <FormControl>
                    <Input
                      fullWidth
                      onChange={e => setBMI(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="in kg"
                    />
                  </FormControl>
                </div>
              </>
            )}
            {completed === 2 && (
              <>
                <div className="row mb-3">
                  <p>What is your occupation?</p>

                  {Object.entries(occupations).map(([key, value]) => {
                    return (
                      <FormControl key={key} className="border mb-3">
                        <FormControlLabel
                          className="me-2"
                          label={key}
                          labelPlacement="start"
                          control={
                            <Radio
                              name="occupation"
                              onChange={() => handleOccupationChange(key)}
                              checked={occupations[key]}
                              style={{ marginLeft: "auto" }}
                              classes={{ root: "square-radio" }}
                            />
                          }
                        />
                      </FormControl>
                    );
                  })}
                  <FormControl fullWidth className="border mb-3">
                    <Input
                      onChange={handleCustomInput}
                      className="p-3"
                      placeholder="Please Specify"
                    />
                  </FormControl>
                </div>
              </>
            )}
            {completed === 3 && (
              <>
                <div className="row mb-3">
                  <p>
                    Do you have any medical conditions over period of time?{" "}
                  </p>

                  {Object.entries(Medicals).map(([key, value]) => {
                    return (
                      <FormControl key={key} className="border mb-3">
                        <FormControlLabel
                          className="me-2"
                          label={key}
                          labelPlacement="start"
                          control={
                            <Radio
                              name="medicals"
                              onChange={() => handleHeatlCare(key)}
                              checked={Medicals[key]}
                              style={{ marginLeft: "auto" }}
                              classes={{ root: "square-radio" }}
                            />
                          }
                        />
                      </FormControl>
                    );
                  })}
                  <FormControl fullWidth className="border mb-3">
                    <Input
                      onChange={handlehealthInput}
                      className="p-3"
                      placeholder="Please Specify"
                    />
                  </FormControl>
                </div>
              </>
            )}
            {completed === 4 && (
              <>
                <div className="row mb-3">
                  <p>What is your Food habbit? </p>

                  {Object.entries(foodhabbits).map(([key, value]) => {
                    return (
                      <FormControl key={key} className="border mb-3">
                        <FormControlLabel
                          className="me-2"
                          label={key}
                          labelPlacement="start"
                          control={
                            <Radio
                              name="medicals"
                              onChange={() => handleFoodhabbitChange(key)}
                              checked={Medicals[key]}
                              style={{ marginLeft: "auto" }}
                              classes={{ root: "square-radio" }}
                            />
                          }
                        />
                      </FormControl>
                    );
                  })}
                </div>
              </>
            )}
            {completed === 5 && (
              <>
                <div className="row mb-3">
                  <p>Do you have any food allergies? </p>

                  {Object.entries(foodAlergies).map(([key, value]) => {
                    return (
                      <FormControl key={key} className="border mb-3">
                        <FormControlLabel
                          className="me-2"
                          label={key}
                          labelPlacement="start"
                          control={
                            <Radio
                              name="foodAlergie"
                              onChange={() => handleAllergiesChange(key)}
                              checked={foodAlergie[key]}
                              style={{ marginLeft: "auto" }}
                              classes={{ root: "square-radio" }}
                            />
                          }
                        />
                      </FormControl>
                    );
                  })}
                  <FormControl fullWidth className="border mb-3">
                    <Input
                      onChange={handleallegiesCustomInput}
                      className="p-3"
                      placeholder="Please Specify"
                    />
                  </FormControl>
                </div>
              </>
            )}
            {completed === 6 && (
              <>
                <div className="row mb-3">
                  <p>How many meals do you have in a day? </p>

                  {Object.entries(foodTimes).map(([key, value]) => {
                    return (
                      <FormControl key={key} className="border mb-3">
                        <FormControlLabel
                          className="me-2"
                          label={key}
                          labelPlacement="start"
                          control={
                            <Radio
                              name="foodTime"
                              onChange={() => handleTimesChange(key)}
                              checked={foodTime[key]}
                              style={{ marginLeft: "auto" }}
                              classes={{ root: "square-radio" }}
                            />
                          }
                        />
                      </FormControl>
                    );
                  })}
                  <FormControl fullWidth className="border mb-3">
                    <Input
                      onChange={handleTimesCustomInput}
                      className="p-3"
                      placeholder="Please Specify"
                    />
                  </FormControl>
                </div>
              </>
            )}

            {completed === 7 && (
              <>
                <div className="row mb-3">
                  <div className="col-md-8">
                    <h4>Now Lets us know about your meal preference</h4>
                  </div>
                  <img className="col-md-4" height={300} src="./img/rnry.png" />
                </div>
              </>
            )}
            {completed === 8 && (
              <>
                <div className="row mb-3 m-auto">
                  <p>What do you mostly have for your breakfast? </p>
                  {GetMeals?.filter(ele =>
                    ele?.TypeOfFood?.toLowerCase()?.includes("breakfast")
                  )?.map(breakfst => (
                    <div className="col-md-3    mb-3">
                      <div
                        className="row justify-content-center"
                        onClick={() => handlebreakFast(breakfst._id)}>
                        <div className="col-md-8 mb-4 conte text-center   crsr shadow ">
                          <img
                            className="mb-2  m-auto"
                            width={130}
                            height={130}
                            style={{ borderRadius: "100px" }}
                            alt=""
                            src={`http://localhost:8000/mealImage/${breakfst.mealImages}`}
                          />
                        </div>
                        <p className="col-md-10 text-center  m-auto">
                          {breakfst.FoodName}
                        </p>
                        <p className="row text-center">
                          <span className="col-md-6">
                            {" "}
                            ₹{breakfst.FoodPrice}
                          </span>

                          <span className="col-md-6">
                            {breakfst.FooOffer}% OFF
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {completed === 9 && (
              <>
                <div className="row mb-3">
                  <p>What do you mostly have for your lunch? </p>
                  {GetMeals?.filter(ele =>
                    ele?.TypeOfFood?.toLowerCase()?.includes("lunch")
                  )?.map(breakfst => (
                    <div className="col-md-3    mb-3">
                      <div
                        className="row justify-content-center"
                        onClick={() => handleLunch(breakfst._id)}>
                        <div className="col-md-8 mb-4 conte text-center   crsr shadow ">
                          <img
                            className="mb-2  m-auto"
                            width={130}
                            height={130}
                            style={{ borderRadius: "100px" }}
                            alt=""
                            src={`http://localhost:8000/mealImage/${breakfst.mealImages}`}
                          />
                        </div>
                        <p className="col-md-10 text-center  m-auto">
                          {breakfst.FoodName}
                        </p>
                        <p className="row text-center">
                          <span className="col-md-6">
                            {" "}
                            ₹{breakfst.FoodPrice}
                          </span>

                          <span className="col-md-6">
                            {breakfst.FooOffer}% OFF
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {completed === 10 && (
              <>
                <div className="row mb-3">
                  <p>What do you mostly have for your snacks? </p>
                  {GetMeals?.filter(ele =>
                    ele?.TypeOfFood?.toLowerCase()?.includes("snack")
                  )?.map(breakfst => (
                    <div className="col-md-3    mb-3">
                      <div
                        className="row justify-content-center"
                        onClick={() => handleSnacks(breakfst._id)}>
                        <div className="col-md-8 mb-4 conte text-center   crsr shadow ">
                          <img
                            className="mb-2  m-auto"
                            width={130}
                            height={130}
                            style={{ borderRadius: "100px" }}
                            alt=""
                            src={`http://localhost:8000/mealImage/${breakfst.mealImages}`}
                          />
                        </div>
                        <p className="col-md-10 text-center  m-auto">
                          {breakfst.FoodName}
                        </p>
                        <p className="row text-center">
                          <span className="col-md-6">
                            {" "}
                            ₹{breakfst.FoodPrice}
                          </span>

                          <span className="col-md-6">
                            {breakfst.FooOffer}% OFF
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {completed === 11 && (
              <>
                <div className="row mb-3">
                  <p>What do you mostly have for your dinner? </p>
                  {GetMeals?.filter(ele =>
                    ele?.TypeOfFood?.toLowerCase()?.includes("dinner")
                  )?.map(breakfst => (
                    <div className="col-md-3    mb-3">
                      <div
                        className="row justify-content-center"
                        onClick={() => handelDinner(breakfst._id)}>
                        <div className="col-md-8 mb-4 conte text-center   crsr shadow ">
                          <img
                            className="mb-2  m-auto"
                            width={130}
                            height={130}
                            style={{ borderRadius: "100px" }}
                            alt=""
                            src={`http://localhost:8000/mealImage/${breakfst.mealImages}`}
                          />
                        </div>
                        <p className="col-md-10 text-center  m-auto">
                          {breakfst.FoodName}
                        </p>
                        <p className="row text-center">
                          <span className="col-md-6">
                            {" "}
                            ₹{breakfst.FoodPrice}
                          </span>

                          <span className="col-md-6">
                            {breakfst.FooOffer}% OFF
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="row mt-4">
              <Button
                className="col-md-4 fs-5 p-2 m-auto btnbrd2  "
                onClick={handleNext}>
                Next
              </Button>
              {completed === 12 && (
                <Button
                  className="col-md-4 fs-5 p-2 m-auto btnbrd2  "
                  onClick={handleSaveDetails}>
                  Save
                </Button>
              )}{" "}
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}
