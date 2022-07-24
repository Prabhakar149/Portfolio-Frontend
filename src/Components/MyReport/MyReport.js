import React, { useState } from 'react';
import "./MyReport.css";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function MyReport(props) {

    const [newUser, setNewUser] = useState(props.user);

    axios.post("http://localhost:9002/findUpdatedUser", newUser).then((res) => {
        setNewUser(res.data.updatedUser);
    })


    const name = newUser.name;
    var shortName;
    if (name.includes(" ")) {
        const names = name.split(" ");
        shortName = names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    } else {
        shortName = name[0];
    }
    const address = newUser.address;
    const email = newUser.emailId;
    const contact = newUser.contact;
    const aboutMe = newUser.AboutMe;

    function mySkillRatingStar(count) {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push("⭐");
        }
        return <p id="mystar" style={{ color: "transparent", textShadow: "0 0 0 rgb(169, 51, 51)" }}>{stars}</p>
    }

    function generatePdf() {
        const input = document.getElementById('report');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF('p', 'pt', 'a4', false);               
                pdf.addImage(imgData, "PNG", 0, 0,400, 600, undefined, true);               
                pdf.save("report.pdf");
            })
    }


    return (
        <div className='parent'>
            <div className='myNav'>
                <Navbar></Navbar>
            </div>

            <div className='project-div'>
                <div className='report-head'>
                    <h1>My Report</h1>
                    {/* <button className='share-report-button'><i class="fa-solid fa-file-import"></i> Share Report</button> */}
                    <button onClick={generatePdf}><i class="fa-solid fa-download"></i> Download Report</button>
                </div>
                <div id='report'>
                    <div className='my-profile-details'>
                        <div className='report-shortName'>
                            <h3>{shortName}</h3>
                        </div>
                        <div className='report-fullName'>
                            <h2>{name}</h2>
                            <p>{address}</p>
                            <p className='report-email'>{email}</p>
                            <p className='report-contact'>{contact}</p>
                        </div>
                        <p>About Me</p>
                        <div className='report-aboutMe'>
                            <p>{aboutMe}</p>
                        </div>
                    </div>
                    <div className='my-skill-details'>
                        <h1>Skills</h1>
                        {newUser.skills.map(function (skill) {
                            return (
                                <div className='report-mySkills'>
                                    <h6>{skill.skillName}</h6>
                                    <p>{mySkillRatingStar(skill.skillRating)}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='my-projects-report'>
                        <h1>Projects</h1>

                        {newUser.myProjects.map(function (project) {
                            return (
                                <div className='report-myProjects'>
                                    <h1 className='report-myProjectDetails'>{project.projectTitle}</h1>
                                    <p className='report-myProjectDetails'>{project.description}</p>
                                    {project.projectSkills.map(function (skill) {
                                        return (
                                            <div className='report-myProjectDetails'>
                                                <p>{skill}</p>
                                            </div>
                                        )

                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyReport;