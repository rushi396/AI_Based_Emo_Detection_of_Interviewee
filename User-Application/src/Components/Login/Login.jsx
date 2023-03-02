import React, { useContext, useEffect } from 'react'
import Header from '../Templates/Header'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import { useState } from 'react';
import SignIn from './SignIn';
import Register from './Register';
import Footer from '../Templates/Footer';
function Login() {
    let { login } = useContext(userContext)
    let navigate = useNavigate()
    useEffect(() => {
        if (login.user) {
            navigate("/")
        }
    })
    let [toggleLoginPage, updateToggleLoginPage] = useState(0)
    function updateLoginType(pageNo) {
        updateToggleLoginPage(pageNo)
    }
    return (
        <div id="loginPageContainer">
            <Header />
            <div className="loginFormContainer">
                {
                    toggleLoginPage === 0 ? (
                        <>
                            <img src="https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" width={550} style={{ margin: "auto" }} alt="" />
                            <SignIn changeLoginType={updateLoginType} />
                        </>
                    ) : (
                        <>
                            <Register changeLoginType={updateLoginType} />
                            <img src="https://images.unsplash.com/photo-1607000975574-0b425df6975a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" width={550} alt="" />
                        </>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}

export default Login