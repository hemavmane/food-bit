import React from "react";

import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "../App.css";


export default function Home() {
  const createBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 20; i++) {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      };
      bubbles.push(<div key={i} className="bubble" style={style}></div>);
    }
    return bubbles;
  };



  return (
    <div className="row container-animation bubble-container  m-auto">
      <div className="container m-auto">
        <div className="row m-auto">
          <div className="col-md-4"> </div>
          <div className="col-md-4">
            <div className="row">
              <div
                className="col-md-4 m-auto  bg-white  "
                style={{ borderRadius: "100%" }}>
                <img
                  alt=""
                  className="m-auto"
                  width={120}
                  height={120}
                  src="../img/Screenshot__659_-removebg-preview.png"
                />
              </div>
              <h2 className="fs-1">Sign in to your account</h2>
              <span className="fs-5 text-center mb-3">
                {" "}
                or Become a new member
              </span>
              <Form className="col-md-12">
                <Row className="row p-2 mb-3">
                  <Button variant="success" className="fs-5 p-2 brd bgclr">
                    <Link
                      to="/SignUp"
                      className="links"
                      style={{ textDecoration: "none", color: "white" }}>
                      {" "}
                      Sign Up
                    </Link>
                  </Button>
                </Row>
                <Row className="row mb-3">
                  <Button variant="light" className="fs-5 p-2 brd">
                    <Link
                      to="/login"
                      className="links"
                      style={{ textDecoration: "none", color: "black" }}>
                      {" "}
                      Login
                    </Link>
                  </Button>
                </Row>
                <Row className="p-2 mb-3">
                  <Link to="/Guest" className="text-white fs-5 text-center">
                    Continue as guest
                  </Link>
                </Row>
              </Form>
            </div>
          </div>
          <div className="col-md-4  ">{createBubbles()}</div>
        </div>
      </div>
    </div>
  );
}
