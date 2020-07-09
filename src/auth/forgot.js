import React, { useState } from 'react'

import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Forgot = () => {
    const [values, setValues] = useState({
     
        email: '',
      password: '',
        buttonText: 'Request password reset link'
    })
    const {  email,buttonText} = values
    const handleChange = name => e => {
        setValues({
            ...values, [name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
     
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:'PUT',
            url:`${process.env.REACT_APP_API}/forgot-password`,
            headers: {
                'content-type': "application/json ",
                'Access-Control-Allow-Origin': '*',
            },
            data:{email},
        })
        .then(response=>{
            console.log('Forgot SUCESS',response)
            toast.success(response.data.message)
            setValues({...values,buttonText:'Requested'})

        }).catch(error=>{
            console.log("Forgot error",error.response.data)
            toast.error(error.response.data.error)

            setValues({...values,name:'',email:'',buttonText:'Request password reset link'})


        })
    }

    const passwordForgotForm = () => (
        <form >
 
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" className="form-control" type="email" onChange={handleChange('email')} value={email}/>
            </div>
           
            <div>
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>

    )
    return (<Layout>
        <div className="colmd-6 offset-md-3">
        <ToastContainer />

        <h1 className="p-5 text-center">Forgot password</h1>

        {passwordForgotForm()}
        </div>
    </Layout>
    )
}
export default Forgot