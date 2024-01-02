import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import axios from "axios";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import { BsSignTurnRight, BsTelephoneFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "./firebase.config";
const UserLogin = () => {
  const [emailAddress, setemailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setpassword] = useState("");
  const [OtpBox, setOtpBox] = useState(true);
  const [loading, setloading] = useState(false);
  const [showOtp, setshowOtp] = useState(false);
  const [otp, setotp] = useState();
  const [users, setusers] = useState(true);
  let userData = null; // Declare userData using let so that you can reassign it

  const user = localStorage.getItem("userData");
  if (user) {
    userData = JSON.parse(user); // Assign the parsed user data to userData
  } else {
    console.log("User data not found in localStorage");
  }
  
  const handleLogin = () => {
    if (
      userData?.PhoneNumber?.includes(phoneNumber) ||
      userData.password.includes(password) ||
      userData.email.toLowerCase().includes(emailAddress.toLowerCase())
    ) {
      alert("Login successfully");
      window.location.assign("/Quetions");
    } else {
      alert("Please sign up");
    }
  };
  // const handleSendOtp = () => {};
  // const onCatpchVerify = () => {
  //   if (!window.recaptchaVerifier) {
  //     // const auth = getAuth();
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: response => {
  //           onSignUp();
  //         },
  //         "expired-callback": () => {},
  //       },
  //       auth
  //     );
  //   }
  // };

  // const onSignUp = async () => {
  //   setloading(true);
  //   onCatpchVerify();
  //   const appVerifier = window.recaptchaVerifier;
  //   const formattedPhoneNumber = "+" + phoneNumber;

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       formattedPhoneNumber,
  //       appVerifier
  //     );
  //     window.confirmationResult = confirmationResult;
  //     setloading(false);
  //     setshowOtp(true);
  //     toast.success("OTP sent successfully");
  //   } catch (error) {
  //     console.error(error);
  //     setloading(false);
  //   }
  // };
  const generateRandomOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  const [storedOtp, setStoredOtp] = useState("");
  const handleSendOtp = () => {
    console.log(userData.PhoneNumber);

    if (!phoneNumber) {
      alert("Please enter number");
    } else if (phoneNumber === userData.PhoneNumber) {
      const generatedOtp = generateRandomOTP();
      setStoredOtp(generatedOtp);
      sessionStorage.setItem("otp", JSON.stringify(generatedOtp));
      setloading(true);
      setTimeout(() => {
        setloading(false);
        alert(`OTP sent successfully: ${generatedOtp}`);
        setusers(false);
      }, 1000);
    } else {
      alert("Please enter the correct registered number");
    }
  };
  let getopt = sessionStorage.getItem("otp");
  
  const handleVerify = () => {
    if (getopt.includes(otp)) {
      alert("Login successfully");
      window.location.assign("/Quetions");
    }else{
      alert("Invalid otp");
    }
  };
  return (
    // <div className="row  m-auto">
    //   {OtpBox ? (
    //     <div className="container">
    //       <div className="row" style={{ height: "100vh" }}>
    //         <div className="col-md-4"> </div>
    //         <div className="col-md-4 m-auto shadow p-3  bg-light rounded">
    //           <div className="row ">
    //             <div className="col-md-12 m-auto">
    //               <FormControl>
    //                 <Input
    //                   value={emailAddress}
    //                   onChange={e => setemailAddress(e.target.value)}
    //                   className="p-3 mb-3"
    //                   placeholder="Email address"
    //                 />
    //               </FormControl>

    //               <FormControl>
    //                 <Input
    //                   value={phoneNumber}
    //                   onChange={e => setPhoneNumber(e.target.value)}
    //                   className="p-3 mb-3"
    //                   placeholder="Phone number"
    //                 />
    //               </FormControl>
    //               <FormControl>
    //                 <Input
    //                   value={password}
    //                   onChange={e => setpassword(e.target.value)}
    //                   className="p-3 mb-3"
    //                   placeholder="Password"
    //                 />
    //               </FormControl>
    //               <Row className="row p-2 mb-3">
    //                 <a href="#" onClick={setOtpBox(true)}>
    //                   Forgotten Password?
    //                 </a>
    //               </Row>
    //               <Row className="row p-2 mb-3 ">
    //                 <Button
    //                   className=" fs-5 p-2 brd bgclr brd2"
    //                   onClick={handleLogin}>
    //                   <Link
    //                     to="/Register"
    //                     className="links"
    //                     style={{ textDecoration: "none", color: "white" }}>
    //                     {" "}
    //                     Log In{" "}
    //                   </Link>
    //                 </Button>
    //               </Row>
    //               <Row className="row mb-3">
    //                 <Button variant="light" className="fs-5 p-2 brd brd2">
    //                   <Link
    //                     to="/SignUp"
    //                     style={{ textDecoration: "none", color: "black" }}
    //                     className="links">
    //                     {" "}
    //                     Sign Up
    //                   </Link>
    //                 </Button>
    //               </Row>
    //               <Row className="row mb-3">
    //                 <Button variant="light" className="fs-5 p-2 brd brd2">
    //                   <Link
    //                     to="/SignUp"
    //                     style={{ textDecoration: "none", color: "black" }}>
    //                     <img
    //                       className="me-3"
    //                       alt=""
    //                       width={30}
    //                       height={30}
    //                       src="../img/google png.png"
    //                     />
    //                     Sign Up with google
    //                   </Link>
    //                 </Button>
    //               </Row>
    //               <Row className="p-2 mb-3">
    //                 <Link to="/Guest" className="text-black fs-5 text-center">
    //                   Continue as guest
    //                 </Link>
    //               </Row>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-md-4"></div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="container">
    //       <div className="row" style={{ height: "100vh" }}>
    //         <div className="col-md-4"> </div>
    //         <div className="col-md-4 m-auto shadow p-3  bg-light rounded">
    //           <div className="row ">
    //             <div className="col-md-12 m-auto">
    //               <Toaster toastOptions={4000} />
    //               <div id="recaptcha-container"></div>

    //               {!showOtp ? (
    //                 <>
    //                   {users ? (
    //                     <div className="row p-4 justify-content-center">
    //                       <BsTelephoneFill
    //                         className="text-center mb-3"
    //                         size="40"
    //                         style={{ color: "skyblue" }}
    //                       />
    //                       <p>Verify your phone number</p>
    //                       <div className="row p-2 text-center">
    //                         <PhoneInput
    //                           onChange={e => setPhoneNumber(e.target.value)}
    //                           value={phoneNumber}
    //                           country={"In"}
    //                         />
    //                       </div>
    //                       <Button
    //                         className="col-md-6 text-white mt-3"
    //                         onClick={handleSendOtp}>
    //                         send code via sms
    //                       </Button>
    //                     </div>
    //                   ) : (
    //                     <h2 className="text-center text-black font-medium text2x1">
    //                       Login success
    //                     </h2>
    //                   )}
    //                 </>
    //               ) : (
    //                 <>
    //                   <p>Enter your otp</p>
    //                   <OtpInput
    //                     value={otp}
    //                     onChange={setotp}
    //                     OTPLength={4}
    //                     otpType="number"
    //                     disabled={false}
    //                     autoFocus></OtpInput>

    //                   <Button
    //                     className=" fs-5 p-2 brd  brd2 "
    //                     // onClick={handleSendOtp}
    //                   >
    //                     {loading && (
    //                       <CgSpinner size="20" className="animate-spin" />
    //                     )}
    //                     <span>Verify OTP</span>
    //                   </Button>
    //                 </>
    //               )}

    //               {/* </Row> */}
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-md-4"></div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="row  m-auto">
      <div className="container">
        {OtpBox ? (
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
                  </FormControl>

                  <FormControl>
                    <Input
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="Phone number"
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      value={password}
                      onChange={e => setpassword(e.target.value)}
                      className="p-3 mb-3"
                      placeholder="Password"
                    />
                  </FormControl>
                  <Row className="row p-2 mb-3">
                    <a href="#" onClick={() => setOtpBox(false)}>
                      Forgotten Password?
                    </a>
                  </Row>
                  <Row className="row p-2 mb-3 ">
                    <Button
                      className=" fs-5 p-2 brd bgclr brd2"
                      onClick={handleLogin}>
                      <Link
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
        ) : (
          <>
            <div className="row justify-content-center p-4 mt-5 m-auto ">
              {users ? (
                <div className="col-md-4">
                  <div className="row m-auto">
                    <BsTelephoneFill
                      className="col-md-2 m-auto mb-3"
                      size="40"
                      style={{ color: "skyblue" }}
                    />
                  </div>
                  <div className="row  m-auto">
                    <p>Verify your phone number</p>
                    <div className="col-md-4  p-2 text-center">
                      <input
                        onChange={e => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        country={"In"}
                      />
                    </div>
                  </div>{" "}
                  <div className="row  m-auto">
                    {" "}
                    <Button
                      className="col-md-6 text-white mt-3"
                      onClick={handleSendOtp}>
                      send code via sms
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p>Enter your otp</p>
                  <OtpInput
                    value={otp}
                    onChange={e => setotp(e.target.value)}
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    autoFocus></OtpInput>
                  <Button
                    className=" fs-5 p-2 brd  brd2 "
                    onClick={handleVerify}>
                    {loading && (
                      <CgSpinner size="20" className="animate-spin" />
                    )}
                    <span>Verify OTP</span>
                  </Button>{" "}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
