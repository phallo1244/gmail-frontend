import React, { useState } from "react";
import Swal from "sweetalert2";
import { apiUrl } from "../utils";
import axios from 'axios';

const Signup = () => {
  
  const [frmData, setFrmData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  /* sweetest alert*/
  const successAlert = (title, message, icon) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
    });
  }; 

  const goToSignin = () => {
    window.location.href = "/";
  }
  
  const handleSubmit = () => {
    
    console.log(frmData);
    
    if (frmData.email === "" || frmData.password === "" || frmData.name === "") {
        successAlert("", "Signup failed. Fill in all the required details", "");
        return;
    }

    if (frmData.password !== frmData.password_confirmation) {
        successAlert("", "Signup failed. Password is not correctly confirmed", "");
        return;
    }

    var api = `${apiUrl}/signup`;
    var requestMethod = 'post';
    
    axios({
        method: requestMethod,
        url: api,
        data: frmData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then((response) => {
        //handle success
        console.log(response)
        if (response.data.message === 'User successfully registered'){
            Swal.fire({
                //position: 'top-end',
                position: "center",
                icon: "success",
                title: "Sign up successfull",
                showConfirmButton: false,
                timer: 2500,
              });
        }else{
            Swal.fire({
              //position: 'top-end',
              position: "center",
              icon: "warning",
              title: "Sign up failed try again",
              showConfirmButton: false,
              timer: 2500,
            });
        }	
    })
    .catch((error) => {
        console.log(error);
    })
  
}

  return (
    <div className="container">
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-brand" href="#">Gmail App</p>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                
              </ul>
            </div>
        </div>
      </nav>

      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <h4>Sign Up</h4>
          <p style={{ color: "skyblue" }}>
            Fill in your personal details here ...
          </p>
          <form className="signup-form" method="post">
            <input
              className="form-control"
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="Full name"
              name="txtName"
              value={frmData.name}
              onChange={(e) =>
                setFrmData({ ...frmData, name: e.target.value })
              }
            />
            <input
              className="form-control"
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="Email"
              name="txtEmail"
              value={frmData.email}
              onChange={(e) =>
                setFrmData({ ...frmData, email: e.target.value })
              }
            />
            <input
              className="form-control"
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="Password"
              name="txtPassword"
              value={frmData.password}
              onChange={(e) =>
                setFrmData({ ...frmData, password: e.target.value })
              }
            />
            <input
              className="form-control"
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="Password confirmation"
              name="txtPasswordcon"
              value={frmData.password_confirmation}
              onChange={(e) =>
                setFrmData({ ...frmData, password_confirmation: e.target.value })
              }
            />
            <button
              className="btn btn-outline-info form-control"
              value="submit"
              type="button"
              onClick={(e) => handleSubmit()}
            >
              Sign Up
            </button>
            <button
              className="btn btn-outline-info form-control mt-4"
              value="submit"
              type="button"
              style={{ border: 'none'}}
              onClick={(e) => goToSignin()}
            >
              Already have an account? Click here to sign in
            </button>
          </form>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};
export default Signup;
