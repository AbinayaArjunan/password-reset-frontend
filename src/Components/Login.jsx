import { Link } from "react-router-dom";
import "../CssStyles/Login.css";
import axios from "axios";
import { useFormik } from 'formik'
import { useState } from "react";

function Login({ url }) {

    const [userfound, setUserfound] = useState(true)
    const [success, setSuccess] = useState(false)

    const HandleLogin = async (email, password) => {
        try {
            const res = await axios.post(`${url}/signin`, { email, password })
            console.log(res)
            setSuccess(true)
            setUserfound(true)
        }
        catch (err) {
            console.error(err)
            setUserfound(false)
            setSuccess(false)
        }
    }

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = "*Required"
        }
        if (!values.password) {
            errors.password = "*Required"
        }
        return errors
    }

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate,
        onSubmit: values => {
            HandleLogin(Formik.values.email, Formik.values.password)
            Formik.values.email = "";
            Formik.values.password = "";
        }
    })

    return (
        <div className="vh-100 gradient-form login "  >
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100 p-4">
                    <div className="col-xl-12">
                        <h4 className="text-center">PASSWORD RESET APPLICATION</h4>
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68XrlXfA2KdXnyBhiPtnqOP214OjiQteKmg&usqp=CAU"
                                                style={{ width: "200px" }}
                                                className="img-fluid"
                                                alt="logo"
                                            />
                                        </div><br/>

                                        <form onSubmit={Formik.handleSubmit}>
                                            <div className="form-outline mb-1">
                                                <label className="form-label fw-bold" htmlFor="email">
                                                    EmailId:
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    value={Formik.values.email}
                                                    onChange={Formik.handleChange}
                                                    onBlur={Formik.handleBlur}
                                                />
                                                {Formik.touched.email && Formik.errors.email ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.email}</span> : null}
                                            </div>

                                            <div className="form-outline mb-1">
                                                <label className="form-label fw-bold" htmlFor="password">
                                                    Password:
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Enter your Password"
                                                    value={Formik.values.password}
                                                    onChange={Formik.handleChange}
                                                    onBlur={Formik.handleBlur}
                                                />
                                                {Formik.touched.password && Formik.errors.password ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.password}</span> : null}
                                            </div>
                                            <p className="form-outline text-center mb-1">
                                                <span className="text-danger">{userfound ? null : "User not registered"}</span> <br />
                                                <span className="text-primary">{success ? "Logged in Successfully/ Log in datas verified" : null}</span>
                                            </p>

                                            <div className="text-center pt-1 mb-2">
                                                
                                                    <button
                                                        className="btn btn-outline-danger me-5"
                                                        type="submit"
                                                    >
                                                        Login
                                                    </button>
                                            </div>
                                                <div className="col-lg-3 col-md-12 m-1">
                                                    <Link to="/forgotpassword"
                                             className="small texte-muted">
                                                            Forgot password?
                                                        
                                                    </Link>
                                                </div>
                                                <p className="mb-1 pb-lg-2" style={{color:"GrayText"}}>Don't have an Account?{" "}
                                                    <Link to="/Signup">
                                                       
                                                    
                                                            Register Here
                                                    </Link>
                                                </p>
                                            

                                             
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;