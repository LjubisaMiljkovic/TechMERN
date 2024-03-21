import React from 'react'
import { useSelector } from 'react-redux'


function AutorizationPage() {
    const { isLoginForm } = useSelector((state) => state.loginRegisterStore)
    return (
        <div className="container">
            <div className="container">
                <div className="authorization-wrapper">{isLoginForm ? <h1>Login form</h1> : <h1>Register form</h1>}</div>

            </div>
        </div>
    
    )
}

export default AutorizationPage