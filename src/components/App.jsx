import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";






export default function App({name}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    console.log('at App', 'user:', user, 'token:', token);
    return (<>
    <a href="/login">Login</a>
    <br></br>
    <a href="/register">Register</a>
    <br></br>
    <a href="/home">Home</a>

    
    <h1>App</h1>
    <h2>{name}</h2>
        <div>
            <h1>{name}</h1>
        <h1>Otters Frolicking</h1>
        </div>
        
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" 
        element={<Login
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
            navigate={navigate}
        />} />

        <Route path="/register" 
        element={<Register
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
            navigate={navigate}
         />} />
        </Routes>


  </>  );
    }