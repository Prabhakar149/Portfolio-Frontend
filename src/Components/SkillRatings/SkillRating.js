import React, { useState, useEffect } from 'react';
import "./SkillRating.css";
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SkillRating(props) {

    
    const [addSkill, setAddSkill] = useState("");
    const [ratingNumber, setRatingNumber]= useState(0);
    const userId=props.skilledUser._id;

    function handleChange(e){
        setAddSkill(e.target.value); 
    }
    function ratingChange(rating){
        setRatingNumber(rating);
    }

    const newSkill = {
        skillName: addSkill,
        skillRating: ratingNumber
    }
    const userNewSkill = [userId,newSkill];

    function handleClick(){
       
        if(addSkill){
            axios.post("http://localhost:9002/addskill",userNewSkill).then((res)=>{
                alert(res.data.message);
                setAddSkill("");
                setRatingNumber(0);
                props.setMySkilledUser(res.data.updatedUser);
            })
        }else{
            alert("Please add a skill");
        }
    }

    return (

        <div className='my-skill'>
          
            <div className='skill-rate'>
                <h3>Skill</h3>
                <input type="text" name='addSkill' value={addSkill} placeholder='Enter your skill' onChange={handleChange}></input>
                <h3>How would you rate yourself?</h3>
                <ReactStars activeColor="rgb(169, 51, 51)" size={25} onChange={ratingChange}></ReactStars>
            </div>
            <button onClick={handleClick}>Add a skill</button>
            {/* {isButtonClicked && <Skills></Skills>} */}

        </div>

    );
}

export default SkillRating;