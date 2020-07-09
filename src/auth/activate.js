import React, { useState,useEffect } from 'react'

import Layout from '../core/Layout'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true,
       
    })

    useEffect(()=>{
        let token=match.params.token
        let {name}=jwt.decode(token)
        // console.log(token)
        if(token){
            setValues({...values,name:name,token:token})
        }
    },[])
    const { name,token,show} = values
   
    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API}/account-activation`,
            data:{token},
        })
        .then(response=>{
            console.log('Account activation',response)
            setValues({...values,show:false})
            toast.success(response.data.message)
        }).catch(error=>{
            console.log("Account activationerror",error.response.data)
            toast.error(error.response.data.error)


        })
    }

    const ActivationLink=()=>(
        <div className="text-center">
        <h1 className="p-5 text-center">Hey {name} ,Ready to Activate  your Account</h1>
        <button className="btn btn-outline-primary" onClick={handleSubmit}>Activate account</button>
        </div>
    )
    
    return (<Layout>
        <div className="colmd-6 offset-md-3">
        <ToastContainer />

        {ActivationLink()}
        </div>
    </Layout>
    )
}
export default Activate