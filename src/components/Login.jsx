import React, {useState} from "react";
import { userLogin } from "../axios/users";



export default function Login({setToken, setUser, token, user, navigate}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const  handleSubmit = async (ev) => {
        ev.preventDefault();
        const login = await userLogin({username, password});
        console.log('data', login.data);
        if (login.data.success === false) {
            console.log('Invalid Credentials');
            return;
        }
        if (login.data.success) {
            console.log('Login Successful')
        await setToken(login.data.token);
        await setUser(login.data.user);
        navigate('/home')
           }
    }

    return (<>
    <h1>Login</h1>
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
            <button type="submit" className="btn btn-primary ms-4">Login</button>
            </form>
        </div>
  </>  );
    }