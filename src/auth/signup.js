import React, { useState } from 'react'

import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {isAuth} from './helpers'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    })
    const { name, email, password ,buttonText} = values
    const handleChange = name => e => {
        setValues({
            ...values, [name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, email, password)
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/signup`,
            data:{name,email,password},
        })
        .then(response=>{
            console.log('SIGNP SUCESS',response)
            setValues({...values,name:'',email:'',password:'',buttonText:'submitted'})
            toast.success(response.data.message)
        }).catch(error=>{
            console.log("signup error",error.response.data)
            setValues({...values,name:'',email:'',password:'',buttonText:'submit'})
            toast.error(error.response.data.error)


        })
    }

    const signupForm = () => (
        <form >
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" type="text" onChange={handleChange('name')} value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="text" className="form-control" type="email" onChange={handleChange('email')} value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="text" className="form-control" type="password" onChange={handleChange('password')} value={password} />
            </div>
            <div>
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>{buttonText}</button>
            </div>
        </form>

    )
    return (<Layout>
        <div className="colmd-6 offset-md-3">
        <ToastContainer />
        {isAuth()?<Redirect to='/'/>:null}

        <h1 className="p-5 text-center">Signup</h1>

        {signupForm()}
        <br/>
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
        </div>
    </Layout>
    )
}
export default Signup