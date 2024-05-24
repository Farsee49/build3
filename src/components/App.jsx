import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import Posts from "./Posts.jsx";









export default function App({name}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const time = new Date().toLocaleTimeString();

 
    

    async function updateLocal() {
        const mainUser = await JSON.parse(window.localStorage.getItem('user'));
        const mainToken = await window.localStorage.getItem('token');
        console.log('mainUser:', mainUser);
        if(mainUser) {
            await setUser(mainUser);
        }
        if(mainToken) {
            await setToken(mainToken);
            console.log('mainToken:')
        }
        if(mainUser.username === "admin") {
            await setIsAdmin(true);
        }
        console.log('mainUser:', mainUser, 'mainToken:', mainToken);
    }
   

    useEffect(() => {
        updateLocal().then(() =>setToken(token));
    }, [token])

console.log('at App', 'user:', user, 'token:', token, 'isAdmin:', isAdmin);


    return (<>
    <div>
    <a href="/login">Login</a>
    <br></br>
    <a href="/register">Register</a>
    <br></br>
    <a href="/home">Home</a>
    <br></br>
    <a href="/posts">Posts</a>
    <hr></hr>
    </div>
    <br></br>
   
   
    
   
        <div>
            <h1>{name}</h1>
            <h2>@{time}</h2>
       
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
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
        />} />
       
        <Route path="/register" 
        element={<Register
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
            navigate={navigate}
         />} />

        <Route path="/posts" element={<Posts />} />
        </Routes>


  </>  );
    }