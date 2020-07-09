import React, { useState } from 'react'
import Google from './google'
import Facebook from './facebbok'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {authenticate,isAuth} from './helpers'
const Signin = ({history}) => {
    const [values, setValues] = useState({
        
        email: '',
        password: '',
        buttonText: 'Submit'
    })
    const informParent=response=>{
        authenticate(response,()=>{
            isAuth() && isAuth().role==='admin'?history.push('/admin'):history.push('/private')
        })
    }
    const {  email, password ,buttonText} = values
    const handleChange = name => e => {
        setValues({
            ...values, [name]: e.target.value
        })


    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(email, password)
        setValues({...values,buttonText:'Submitting'})
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/signin`,
            data:{email,password},
        })
        .then(response=>{
            console.log('SIGNin SUCESS',response)
            authenticate(response,()=>{
                setValues({...values,email:'',password:'',buttonText:'submitted'})
                // toast.success(`${response.data.user.name},Welcome back!`)
                isAuth() && isAuth().role==='admin'?history.push('/admin'):history.push('/private')
            })

        }).catch(error=>{
            // console.log("signin error",error.response.data)
            setValues({...values,email:'',password:'',buttonText:'submit'})
            toast.error(error.response.data.error)


        })
    }

    const signinForm = () => (
        <form >
            
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
        <h1 className="p-5 text-center">Signin</h1>
        <Facebook informParent={informParent}/>
        <Google informParent={informParent}/>
        {signinForm()}
        <br/>
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
        </div>
    </Layout>
    )
}
export default Signin