import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./Skills.css"
import {Modal, ModalHeader, ModalBody} from "reactstrap"
import SkillRating from '../SkillRatings/SkillRating';
import axios from 'axios';

function Skills(props) {

    const [myUser,setMyUser] = useState(props.user);
    const [modal, setModal] = useState(false);

    axios.post("http://localhost:9002/findUpdatedUser", myUser).then((res)=>{
                setMyUser(res.data.updatedUser);    
            })

    function mySkillRatingStar(count){
        const stars = [];
        for(let i=0;i<count;i++){
            stars.push("⭐");
        }
        return <p style={{color:"transparent",textShadow: "0 0 0 rgb(169, 51, 51)"}}>{stars}</p>
    }
   
    return (
        <div className='parent'>
            <div className='myNav'>
                <Navbar></Navbar>
            </div>

            <div className='skill-div'>
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder='Search for skills'></input>

                {/* Modal(Popup) */}
                <Modal size='md' isOpen={modal} toggle={()=>setModal(!modal)}>
                    <ModalHeader toggle={()=>setModal(!modal)}><h1 style={{paddingTop:"1.2rem"}}>Add a new Skill</h1></ModalHeader>
                    <ModalBody>{<SkillRating skilledUser={myUser} setMySkilledUser={setMyUser}/>}</ModalBody>
                </Modal>
                <button onClick={()=>setModal(true)}>+ Add a skill</button>
                {myUser.skills.map(function (skill) {
                    return (
                       
                            <div className='mySkills'>
                                <h6>{skill.skillName}</h6>
                                <p>{mySkillRatingStar(skill.skillRating)}</p>
                            </div>

                       
                    )

                })}
            </div>




        </div>
    );
}

export default Skills;