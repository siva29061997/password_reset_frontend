import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Reset() {
  let navi = useNavigate()
  const queryParams = new URLSearchParams(window.location.search)
  const token = queryParams.get("code")

  const [stCode, setStcode] = useState()



  useEffect(() => {
    loadData()
  }, [])

  let loadData = async () => {

    try {
      let verifiction = await axios.get("http://localhost:5000/token-verify", {
        headers: {
          'authorization': token
        }

      })

      setStcode(verifiction.status)






    } catch (error) {
      console.log(error);
      setStcode(error.response.status)
    }
  }


  let formik = useFormik({
    initialValues: {
      password: ""

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
        await axios.put("http://localhost:5000/update", values, {
          headers: {
            'authorization': token
          }
        })
        alert("Password updated")
        navi("/")

      } catch (error) {
        console.log(error)
      }
    }

  })
  console.log(stCode)
  return (
    <div className="App">
      <div className='heading' style={{ backgroundColor: "#45A2D5" }}>
        <h2 style={{ color: "white", textShadow: "3px 3px black" }}>Password reset</h2>
      </div>
      <div className='container mt-5' style={{ textAlign: "left" }}>
        <div className='row  justify-content-center'>
          {
            stCode === 200 ? (
              <div className='col-lg-4 col-md-6 col-xl-4 col-sm-8 mt-5' id="check">
                <h4>Enter new password</h4>
                <form onSubmit={formik.handleSubmit}>

                  <div className="mt-5">
                    <label htmlFor="exampleInputPassword1" className="form-label">Enter new password</label>
                    <input type="password" value={formik.values.password} onChange={formik.handleChange} name="password" className="form-control" id="exampleInputPassword1" />
                  </div>

                  <button type="submit" style={{ backgroundColor: "#45A2D5", border: "none" }} className="btn btn-primary">Submit</button>
                </form>
              </div>
            ) : stCode === 404 ? <div><h1>Session expired</h1></div> : null
          }
        </div>

      </div>
    </div>
  )
}

export default Reset