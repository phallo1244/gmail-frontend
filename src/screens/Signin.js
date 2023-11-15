import React, { useState } from "react";
import Swal from "sweetalert2";
import { apiUrl } from "../utils";
import axios from 'axios';

const Signin = () => {
  
  const [frmData, setFrmData] = useState({
    email: "",
    password: "",
  });

  /* sweetest alert*/
  const successAlert = (title, message, icon) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
    });
  }; 

  const goToSignup = () => {
    window.location.href = "/signup";
  }

  const handleSubmit = () => {
    
    console.log(frmData);
    
    if (frmData.email === "" || frmData.password === "") {
        successAlert("", "Signin failed. Fill in your email and password", "");
        return;
    }

    var api = `${apiUrl}/signin`;
    var requestMethod = 'post';
    
    axios({
        method: requestMethod,
        url: api,
        data: frmData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then((response) => {
        //handle success
        if (response.data.error === 'Failed'){
          Swal.fire({
            //position: 'top-end',
            position: "center",
            icon: "warning",
            title: "Incorrect login details",
            showConfirmButton: false,
            timer: 2500,
          });
        }else{
            if (response.data.access_token !== ""){
              console.log(response)
              sessionStorage.setItem('Alias', response.data.user.name);
              sessionStorage.setItem('Email', response.data.user.email);
              sessionStorage.setItem('token', response.data.access_token);
              window.location.href = "/dashboard";
            }
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
          <p className="navbar-brand">Gmail App</p>
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
          <h4>Sign In</h4>
          <p style={{ color: "skyblue" }}>
            Fill in your login details to continue
          </p>
          <form className="signup-form" method="post">
            <input
              className="form-control"
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="email"
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
              placeholder="password"
              name="txtPassword"
              value={frmData.password}
              onChange={(e) =>
                setFrmData({ ...frmData, password: e.target.value })
              }
            />
            <button
              className="btn btn-outline-info form-control"
              value="submit"
              type="button"
              onClick={(e) => handleSubmit()}
            >
              Sign In
            </button>
            <button
              className="btn btn-outline-info form-control mt-4"
              value="submit"
              type="button"
              style={{ border: 'none'}}
              onClick={(e) => goToSignup()}
            >
              New to gmail? Click here to sign up
            </button>
          </form>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};
export default Signin;
