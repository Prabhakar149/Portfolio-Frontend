import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./MyProject.css"
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import AddProject from '../AddProject/AddProject';
import newProjectSkills from '../AddProject/AddNewSkills';

function MyProject(props) {

    const [newUser, setNewUser] = useState(props.user);
    const [modal, setModal] = useState(false);

    axios.post("http://localhost:9002/findUpdatedUser", newUser).then((res) => {
        setNewUser(res.data.updatedUser);
    })

    function handleClick(){
        setModal(true);
        while(newProjectSkills.length > 0) {
            newProjectSkills.pop();
        }
    }


    return (
        <div className='parent'>
            <div className='myNav'>
                <Navbar></Navbar>
            </div>

            <div className='myProject-div'>
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder='Search for projects'></input>

                {/* Modal(Popup) */}
                <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalHeader toggle={() => setModal(!modal)}><h1 style={{ paddingTop: "1.2rem" }}>Add a new Project</h1></ModalHeader>
                    <ModalBody>{<AddProject projectUser={newUser} setProjectUser={setNewUser}></AddProject>}</ModalBody>
                </Modal>
                {/* <button onClick={()=>setModal(true)}>+ Add a Project</button> */}
                
                <button onClick={handleClick}>+ Add a Project</button>

                {newUser.myProjects.map(function (project) {
                    return (
                        <div>
                            <div className='myProjects'>
                            <h1 className='myProjectDetails'>{project.projectTitle}</h1>
                            <p className='myProjectDetails'>{project.description}</p>
                            {project.projectSkills.map(function (skill) {
                                return (
                                    <div className='myProjectDetails'>
                                        <p>{skill}</p>
                                    </div>
                                )

                            })}
                        </div>
                        </div>
                        
                    )
                })}
            </div>
        </div>
    );
}

export default MyProject;