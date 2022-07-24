import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Register.css"

const Register = () => {
    const navigate=useNavigate();
    const [user,setUser] = useState({
        userName:"",
        userEmail:"",
        userPassword:"",
        userReEnterPassword:""
    })
    function handleChange(event){
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]:value
        });
    }
    function handleClick(){
        const {userName,userEmail,userPassword,userReEnterPassword} = user;
        if(userName && userEmail && userPassword && userReEnterPassword){
            if(userPassword === userReEnterPassword){
                axios.post("http://localhost:9002/register",user).then((res)=>{
                    alert(res.data.message);
                    navigate("/");
                });
            }else{
                alert("Passwprd didn't match!");
            }
        }else{
            alert("Invalid inputs");
        }
       
    }


    return (
        <div className="register-div">
            <div className="register">
                <h1>Sign Up</h1>
                <input type="text" name="userName" placeholder="Enter your name here" value={user.userName} onChange={handleChange}></input>
                <input type="email" name="userEmail" placeholder="Enter your email address here" value={user.userEmail} onChange={handleChange}></input>
                <input type="password" name="userPassword" placeholder="Enter your password here" value={user.userPassword} onChange={handleChange}></input>
                <input type="password" name="userReEnterPassword" placeholder="Re-enter your password here" value={user.userReEnterPassword} onChange={handleChange}></input>
                <button className="btn button " onClick={handleClick}>Sign Up</button>
                <p>Already have an account yet? <span className='mySpan' onClick={()=>navigate("/")}>Sign In here</span></p>
                
            </div>
        </div>
    );
};

export default Register;