import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './Components/Register/Register';
import Login from "./Components/Login/Login";
import Profile from './Components/Profile/Profile';
import Skills from "./Components/Skills/Skills"
import MyProject from './Components/MyProject/MyProject';
import MyReport from './Components/MyReport/MyReport';

function App(props) {

    const [loggedInUser, setLoggedInUser] = useState({});
    console.log(loggedInUser);
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login setMyUser={setLoggedInUser} />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/profile" element={<Profile user={loggedInUser} />}></Route>
                    <Route path="/skills" element={<Skills user={loggedInUser} />}></Route>
                    <Route path="/projects" element={<MyProject user={loggedInUser} />}></Route>
                    <Route path="/report" element={<MyReport user={loggedInUser} />}></Route>
               </Routes>
            </Router>
        </div>
    );
}

export default App;