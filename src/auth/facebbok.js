import React, { useState } from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook = ({ informParent = f => f }) => {
    const responseFacebook = (response) => {
        console.log(response)
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { userId:response.userId, acessToken:response.acessToken }

        })
            .then(response => {
                console.log('FB susecc', response)
                informParent(response)
            })
            .catch(err => {
                console.log("Fb error", err.response)
            })
    }
    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="btn btn-primary btn-lg btn-block">Login with facebook</button>
                )}
            />     
               </div>
    )
}
export default Facebook