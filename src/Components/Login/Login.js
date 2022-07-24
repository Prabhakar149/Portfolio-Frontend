import React, { useState } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userEmail: "",
        userPassword: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    function handleClick() {
        const { userEmail, userPassword } = user;
        if (userEmail && userPassword) {
            axios.post("http://localhost:9002/", user).then((res) => {
                alert(res.data.message);
                if (res.data.myUser) {
                    props.setMyUser(res.data.myUser);
                    // console.log(res.data.myUser);
                    navigate("/profile");
                }
            });
        } else {
            alert("Invalid inputs");
        }
    }

    return (
        <div className="login-div">
            <div className="login">
                <h1>Sign In</h1>
                <input type="email" name="userEmail" placeholder="Enter your email address here" onChange={handleChange} value={user.userEmail}></input>
                <input type="password" name="userPassword" placeholder="Enter your password here" onChange={handleChange} value={user.userPassword}></input>
                <button className="btn button " onClick={handleClick}>Sign In</button>
                <p>Don't have an account yet? <span className='mySpan' onClick={() => navigate("/register")}>Sign Up here</span></p>
            </div>
        </div>
    );
};

export default Login;