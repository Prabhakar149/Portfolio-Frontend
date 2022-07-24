import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

const Navbar = (props) => {
    const navigate = useNavigate();

    
    

    return (
        <div className='navbar-div'>
            <button className='skill-button' onClick={() => navigate("/profile")}><i class="fa-solid fa-user"></i> My Profile</button>
            <button className='skill-button' onClick={() => navigate("/skills")}><i class="fa-solid fa-bars"></i> My Skills</button>
            <button className='skill-button' onClick={() => navigate("/projects")}><i class="fa-solid fa-folder"></i> My Projects</button>
            <button className='skill-button' onClick={() => navigate("/report")}><i class="fa-solid fa-file-lines"></i> My Report</button>
            <button className='sign-out' onClick={() => navigate("/")}><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</button>
        </div>
    );
};

export default Navbar;