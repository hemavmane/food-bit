import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import axios from "axios";

// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const UserLogin = () => {
  const [emailAddress, setemailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [OtpBox, setOtpBox] = useState(false);

  const handleLogin = async () => {
    try {
      // Sign in with email and password
      const userCredential = await auth.signInWithEmailAndPassword(
        emailAddress,
        password
      );

      // Access the signed-in user
      const user = userCredential.user;
      console.log("User signed in:", user);

      // Redirect to Questions page or perform other actions
      window.location.assign("/Questions");
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  // const firebaseConfig = {
  //   apiKey: "YOUR_API_KEY",
  //   authDomain: "YOUR_AUTH_DOMAIN",
  //   projectId: "YOUR_PROJECT_ID",
  //   storageBucket: "YOUR_STORAGE_BUCKET",
  //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  //   appId: "YOUR_APP_ID",
  // };

  // Initialize Firebase
  // const firebaseApp = initializeApp(firebaseConfig);

  // // Get auth instance
  // const auth = getAuth(firebaseApp);


  
  const handleSendOtp = () => {};
  return (
    <div className="row  m-auto">
      {!OtpBox ? (
        <div className="container">
          <div className="row" style={{ height: "100vh" }}>
            <div className="col-md-4"> </div>
            <div className="col-md-4 m-auto shadow p-3  bg-light rounded">
              <div className="row ">
                <div className="col-md-12 m-auto">
                  <FormControl>
                    <Input
                      value={emailAddress}
                      onChange={e => setemailAddress(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="Email address"
                    />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                  </FormControl>

                  <FormControl>
                    <Input
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="Phone number"
                    />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                  </FormControl>
                  <FormControl>
                    <Input
                      value={password}
                      onChange={e => setpassword(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="Password"
                    />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                  </FormControl>
                  <Row className="row p-2 mb-3">
                    <a href="#" onClick={setOtpBox(true)}>
                      Forgotten Password?
                    </a>
                  </Row>
                  <Row className="row p-2 mb-3 ">
                    <Button
                      className=" fs-5 p-2 brd bgclr brd2"
                      onClick={handleLogin}>
                      <Link
                        to="/Register"
                        className="links"
                        style={{ textDecoration: "none", color: "white" }}>
                        {" "}
                        Log In{" "}
                      </Link>
                    </Button>
                  </Row>
                  <Row className="row mb-3">
                    <Button variant="light" className="fs-5 p-2 brd brd2">
                      <Link
                        to="/SignUp"
                        style={{ textDecoration: "none", color: "black" }}
                        className="links">
                        {" "}
                        Sign Up
                      </Link>
                    </Button>
                  </Row>
                  <Row className="row mb-3">
                    <Button variant="light" className="fs-5 p-2 brd brd2">
                      <Link
                        to="/SignUp"
                        style={{ textDecoration: "none", color: "black" }}>
                        <img
                          className="me-3"
                          alt=""
                          width={30}
                          height={30}
                          src="../img/google png.png"
                        />
                        Sign Up with google
                      </Link>
                    </Button>
                  </Row>
                  <Row className="p-2 mb-3">
                    <Link to="/Guest" className="text-black fs-5 text-center">
                      Continue as guest
                    </Link>
                  </Row>
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row" style={{ height: "100vh" }}>
            <div className="col-md-4"> </div>
            <div className="col-md-4 m-auto shadow p-3  bg-light rounded">
              <div className="row ">
                <div className="col-md-12 m-auto">
                  <FormControl>
                    <Input
                      value={emailAddress}
                      onChange={e => setemailAddress(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="Email address"
                    />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                  </FormControl>

                  <FormControl>
                    <Input
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="Phone number"
                    />
                    {/* <FormHelperText>This is a helper text.</FormHelperText> */}
                  </FormControl>

                  <Row className="row p-2 mb-3 ">
                    <Button
                      className=" fs-5 p-2 brd bgclr brd2"
                      onClick={handleSendOtp}>
                      <Link
                        to="/Register"
                        className="links"
                        style={{ textDecoration: "none", color: "white" }}>
                        {" "}
                        Send otp{" "}
                      </Link>
                    </Button>
                  </Row>
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
