import React, { Fragment,useState } from 'react'
import { SignUpNav } from '../../Components/UI/MiniComponents/MiniComponent'
import styles from './main.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
function SignUp() {
    const [serverError, setserverError] = useState('')
    const SignupSchema = Yup.object().shape({
        fname: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Enter password to confirm'),
        terms:Yup.boolean().oneOf([true],'You Must be agree with terms to Sign up')
    });
    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            company: '',
            password: '',
            confirmPassword: '',
            terms:false
        },
        validationSchema:  SignupSchema ,
        onSubmit: values => {
            setserverError('')
            console.log(JSON.stringify(values, null, 2));
            axios.post(`http://localhost:3001/signup`, values)
                .then(res => {
                    // alert(res.data)
                    setserverError(res.data)

                })
        }
    },
    );
    return (
        <Fragment>
            <div className={`container-fluid  ${styles.back}  d-flex  `}  >
                
                <div className="container d-flex">
                    <div className={`row  ${styles.row} `}>
                        <div className={` col-12  d-md-flex flex-column  col-lg-9`}  >
                            <SignUpNav bgColor='transparent' />
                            <div className="contianer-fluid  d-md-flex flex-column justify-content-md-center" style={{ flexGrow: 1 }}>
                                <div className="container-lg d-md-flex flex-column justify-content-md-end " style={{ flexGrow: 1 }}>
                                    <div className="row">
                                        <div className=" col-12 d-flex flex-column justify-content-between col-md-7 col-lg-10 ">
                                            <h2 className={`px-2   me-md-5 mt-md-0 mt-4 text-white ${styles.h2}`} >
                                                From there it only takes 5 minutes to get started. It is free and without obligation to start your trial period.
                                            </h2>
                                        </div>
                                    </div>
                                    <ul className={`${styles.terms} d-flex text-white`}>
                                        <li className='me-3'>
                                            Privacy & Terms
                                        </li>
                                        <li>
                                            Contact Us
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={` col-10 mb-md-0 mb-5  col-md-5 ${styles.formCol}`}>
                            <div className={`${styles.loginForm_header} row d-flex justify-content-between align-items-center py-4 px-3 `}>
                                <div className="col-lg-7">
                                    <h3 className={`${styles.formHeader_text} mb-0 d-inline-block`}>
                                        Start your free Company trial
                                    </h3>
                                </div>
                                <div className="col-lg-5 d-flex justify-content-center text-end" >
                                    <button className='btn-blue w-100 mt-2  text-bold'>
                                        Free 14-day trial
                                    </button>
                                </div>
                            </div>
                            <form class="row g-3 px-3 py-4" onSubmit={formik.handleSubmit} method='post' >
                                <div class="col-lg-6">
                                    <label for="fname" class={`form-label ${styles.inputLable_text}`}>First Name</label>
                                    <input type="text" class={`form-control ${styles.input}`}
                                        id="fname"
                                        name="fname"
                                        onChange={formik.handleChange}
                                        value={formik.values.fname}
                                    />
                                    {formik.touched.fname && formik.errors.fname ? (
                                        <div className={`${styles.formError}`}>{formik.errors.fname}</div>
                                    ) : null}
                                </div>
                                <div class="col-lg-6">
                                    <label for="lname" class={`form-label ${styles.inputLable_text}`}>Last Name</label>
                                    <input type="text" class="form-control"
                                        id="lname"
                                        name="lname"
                                        onChange={formik.handleChange}
                                        value={formik.values.lname}
                                    />
                                     {formik.touched.lname && formik.errors.lname ? (
                                        <div className={`${styles.formError}`}>{formik.errors.lname}</div>
                                    ) : null}
                                </div>
                                <div class="col-12">
                                    <label for="email" class={`form-label ${styles.inputLable_text}`}>Business Email</label>
                                    <input type="email" class="form-control" placeholder=""
                                        id="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                      {formik.touched.email && formik.errors.email ? (
                                        <div className={`${styles.formError}`} >{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div class="col-lg-6">
                                    <label for="password" class={`form-label ${styles.inputLable_text}`}>password</label>
                                    <input type="password" class={`form-control ${styles.input}`}
                                        id="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                     {formik.touched.password && formik.errors.password ? (
                                        <div className={`${styles.formError}`}>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div class="col-lg-6">
                                    <label for="confirmPassword" class={`form-label ${styles.inputLable_text}`}>Confirm Password</label>
                                    <input type="password" class="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                    />
                                     {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                        <div className={`${styles.formError}`} >{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                                <div class="col-12">
                                    <label for="compnay" class={`form-label ${styles.inputLable_text}`}>Company Name</label>
                                    <input type="text" class="form-control" placeholder=""
                                        id="compnay"
                                        name="company"
                                        onChange={formik.handleChange}
                                        value={formik.values.company}
                                    />
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input  class="form-check-input" type="checkbox" id="terms"
                                         onChange={formik.handleChange}
                                         value={formik.values.terms}
                                        />
                                        <label class="form-check-label" for="terms">
                                            I accept that this site stores my submitted information so that it can respond to my request
                                        </label>
                                    </div>
                                    {formik.touched.terms && formik.errors.terms ? (
                                        <div className={`${styles.formError}`} >{formik.errors.terms}</div>
                                    ) : null}
                                </div>
                                <div class="col-12 text-center d-flex justify-content-center">
                                    <button
                                        type="submit" class={`btn w-100 mx-auto bg-primary  btn-primary ${styles.createBtn}`}>Create for FREE</button>
                                </div>
                                {serverError&& <div className={`${styles.formError}`} >
                                    {serverError}
                                </div> }
                            </form>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default SignUp