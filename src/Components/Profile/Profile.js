import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./Profile.css";
import axios from 'axios';

function Profile(props) {

    const [newUser, setNewUser] = useState(props.user);

    axios.post("http://localhost:9002/findUpdatedUser", newUser).then((res)=>{
                setNewUser(res.data.updatedUser);    
            })

    const name = newUser.name;
    var shortName;
    if (name.includes(" ")) {
        const names = name.split(" ");
        shortName = names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    }else{
        shortName = name[0];     
    }
    const address = newUser.address.toUpperCase();

    const [details, setDetails] = useState({
        userId:newUser._id,
        userAddress:"",
        userContact:"",
        userAbout:""
    });

    
    

    function handleChange(e){
        const {name, value} = e.target;
        setDetails({
            ...details,
            [name]: value
        })
    }

    function handleClick(){
        const {userAddress, userContact, userAbout} = details;

        if(userAddress || userContact || userAbout){
            axios.post("http://localhost:9002/profile", details).then((res)=>{
                setNewUser(res.data.updatedUser);
                alert(res.data.message);
                setDetails({ 
                    userId:props.user._id,
                    userAddress:"",
                    userContact:"",
                    userAbout:""
                });
            })
        }else{
            alert("Inputs are empty");
        }
        
    }

    return (
        <div className='parent'>
            <div className='myNav'>
                <Navbar></Navbar>
            </div>

            <div className='profile-div'>
                <div className='shortName'>
                    <h3>{shortName}</h3>
                </div>
                <div className='fullName'>
                    <h2>{name}</h2>
                    <p>{address}</p>
                </div>
                <div className='myDetails'>
                    <p>Address</p>
                    <input type="text" name='userAddress' placeholder='Enter your address(i.e. City, State)' value={details.userAddress} onChange={handleChange}></input>
                    <p>Contact</p>
                    <input type="phone" name='userContact' placeholder='Enter your contact number' value={details.userContact} onChange={handleChange}></input>
                    <p>About me</p>
                    <textarea name='userAbout' placeholder='Tell us what you do' value={details.userAbout} onChange={handleChange}></textarea>
                </div>
                <button onClick={handleClick}>submit</button>
            </div>
        </div>
        
    );
}

export default Profile;