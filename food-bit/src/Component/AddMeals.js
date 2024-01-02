import React, { useEffect, useState } from "react";
import axios from "axios";
export default function AddMeals() {
  const [typeoffood, setTypeofFood] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodprice, setFoodPrice] = useState("");
  const [fooOffer, setfooOffer] = useState("");
  const [foodimg, setFoodImg] = useState(null);

  const handleFileChange = e => {
    // Update the state with the selected file
    setFoodImg(e.target.files[0]);
  };

  const handleAddMeals = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("TypeOfFood", typeoffood);
    formData.append("FoodName", foodName);
    formData.append("FoodPrice", foodprice);
    formData.append("FooOffer", fooOffer);
    formData.append("mealImages", foodimg); // <-- Update to "mealImages"

    try {
      const response = await axios.post(
        "http://localhost:8000/api/addmeals",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Saved successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4">
          <input className="mb-3" type="file" onChange={handleFileChange} />
          <select
            className="mb-3"
            value={typeoffood}
            onChange={e => setTypeofFood(e.target.value)}>
            <option>Select</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            className="mb-3"
            type="text"
            onChange={e => setFoodName(e.target.value)}
            placeholder="Food Name"
          />
          <input
            className="mb-3"
            type="text"
            onChange={e => setFoodPrice(e.target.value)}
            placeholder="Food Price"
          />
        </div>
        <div className="col-md-4">
          <input
            className="mb-3"
            type="text"
            onChange={e => setfooOffer(e.target.value)}
            placeholder="Food Offer"
          />
          <button onClick={handleAddMeals}>Save</button>
        </div>
      </div>{" "}
    </div>
  );
}
