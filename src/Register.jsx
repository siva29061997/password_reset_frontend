import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

function Register() {
  const [initial, setInitial] = useState("Verify your email address")

  let formik = useFormik({
    initialValues: {
      email: ""

    },
    validate: (values) => {
      let errors = {};
      if (values.email === "") {
        errors.email = "Enter email Id";
      }

      return errors;


    },
    onSubmit: async (values) => {
      try {
        console.log(values)
        let loginData = await axios.post("http://localhost:5000/user", values)
        setInitial(loginData.data.messege)
        alert("Verify your email address")
      } catch (error) {
        console.log(error)
      }
    }

  })
  return (
    <div className="App">
      <div className='heading'>
        <h2 style={{ color: "white", textShadow: "3px 3px black" }}>Register</h2>
      </div>
      <div className='container mt-5' style={{ textAlign: "left" }}>
        <div className='row  justify-content-center'>
          <div className='col-lg-4 col-md-6 col-xl-4 col-sm-8 mt-5' id="check">
            <h4>Enter Your Mail ID</h4>
            <form onSubmit={formik.handleSubmit}>
              <div class="mb-3 mail">
                <label for="exampleInputEmail1" class="form-label">Enter your email address</label>
                <input type="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className={`form-text ${formik.errors.email ? "txtclr" : initial === "User not found" ? "txtclr" : initial === "Email have been sent to your mail id" ? "txtclr2" : null}`}>{formik.errors.email ? formik.errors.email : initial}</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" value={formik.values.password} onChange={formik.handleChange} name="password" class="form-control" id="exampleInputPassword1" />
              </div>

              <button type="submit" style={{ backgroundColor: "#15D5B5", border: "none" }} className="btn btn-primary">Submit</button>
              <span className="forgot-password text-right">Already User?
                <a href="/">Sign In</a>
              </span>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register