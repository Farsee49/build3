import React, { useState } from "react";
import { registerUser } from "../axios/users";






export default function Register({ navigate }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const  handleSubmit = async (ev) => {
        ev.preventDefault();
       const register = await registerUser({username, password});
         console.log(register);
        
        console.log('username:', username, 'password:', password);
        if (register.data.success) {
            navigate('/login');
        }
    }
    return(<> 
    
    <h1>Register</h1>
    <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label className="form-label">Username</label>
                <input type="text" name="username" onChange={(ev)=> setUsername(ev.target.value)}  className="form-input" />
           </div>
                <br></br>
           <div>
                <label className="form-label">Password</label>
                <input type="password" name="password" onChange={(ev)=> setPassword(ev.target.value)} className="form-input" />
            </div>
            <button type="submit" className="btn btn-primary ms-4">Register</button>
            </form>
        </div>
    </>)
}