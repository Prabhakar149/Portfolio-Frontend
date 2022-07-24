import React,{useState} from 'react';
import "./AddProject.css";
import newProjectSkills from './AddNewSkills';
import axios from 'axios';

function AddProject(props) {

    const userId = props.projectUser._id;
    const [projectTitle, setProjectTitle] = useState("");
    const [description, setDescription] = useState("");
    const [newSkill, setNewSkill] = useState("");
    

    function projectTitleChange(e){
        setProjectTitle(e.target.value);
    }
    function projectDescriptionChange(e){
        setDescription(e.target.value);
    }
    function newSkillChange(e){
        setNewSkill(e.target.value);
    }
    
    function addSkills(){
        newProjectSkills.push(newSkill);
        setNewSkill("");
        // console.log(newProjectSkills)
    }

    const myNewProjects = {
        projectTitle:projectTitle,
        description:description,
        projectSkills:newProjectSkills
    }
    const userNewProjects = [userId,myNewProjects];

    function handleClick(){
        if(projectTitle && description && newProjectSkills.length>0){
            axios.post("http://localhost:9002/addnewproject",userNewProjects).then((res)=>{
                alert(res.data.message);
                setProjectTitle("");
                setDescription("");
                props.setProjectUser(res.data.updatedUser);
                // props.setMySkilledUser(res.data.updatedUser);
            })
        }else{
            alert("Please add all required inputs");
        }
        while(newProjectSkills.length > 0) {
            newProjectSkills.pop();
        }
    }
   
    

    return (

        <div className='add-project'>
            <div className='add-project-details'>
                <h3>Project Title</h3>
                <input type="text" name='projectTitle' value={projectTitle} placeholder='Enter your project title' onChange={projectTitleChange}></input>
                <h3>Project Description</h3>
                <textarea name='description' value={description} placeholder='Enter your project description' onChange={projectDescriptionChange}></textarea>
                <h3>Add Project Skills</h3>
                <button onClick={addSkills}>+</button>
                <input className='skill-input' value={newSkill} type="text" onChange={newSkillChange}></input>          
            </div>
            <button onClick={handleClick}>Add Project</button>

        </div>

    );
}

export default AddProject;