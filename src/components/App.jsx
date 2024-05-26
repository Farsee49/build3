import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import Posts from "./Posts.jsx";
import UserPosts from "./UserPosts.jsx";
import ShowPost from "./ShowPost.jsx";
import NewPost from "./NewPost.jsx";
import EditPost from "./EditPost.jsx";









export default function App({name}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [userPosts, setUserPosts] = useState([{}]);
    const [singlePost, setSinglePost] = useState({});
    const [editPost, setEditPost] = useState([{}]);
    const navigate = useNavigate();
    const time = new Date().toLocaleTimeString();
    console.log('app singlepost:', singlePost);
   
    

    async function updateLocal() {
        const mainUser = await JSON.parse(window.localStorage.getItem('user'));
        const mainToken =  window.localStorage.getItem('token');
        console.log('mainUser:', mainUser);
       
        if(mainUser) {
            setUser(mainUser);
        }
        if(mainToken) {
            setToken(mainToken);
           
        }
        if(mainUser.username === "admin") {
             setIsAdmin(true);
        }
        console.log('mainUser:', mainUser, 'mainToken:', mainToken);
    }
    function logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        setToken('');
        setUser('');
        setIsAdmin(false);
        navigate('/login');
    }
   

    useEffect(() => {
        
        
 
        Promise.all([updateLocal()]).then(() => setToken(token));
    }, [token])

console.log('at App', 'user:', user, 'token:', token, 'isAdmin:', isAdmin);


    return (<>
    <div className="text-center">
    <a  href="/login">Login</a>
    <br></br>
    <a href="/register">Register</a>
    <br></br>
    <a href="/home">Home</a>
    <br></br>
    <a href="/posts">Posts</a>
    <br></br>
    <a href="/userposts">User Posts</a>
    <br></br>
    <a href="/new-post">New Post</a>
    <br></br>
    <button onClick={logout}>Log Out</button>
    <hr></hr>
    </div>
    <br></br>
   
   
    
   
        <div className="text-center">
            <h1>Welcome {user.username}</h1>
            <br></br>
            <h2>@{time}</h2>
       
        </div>
        
        <Routes>
        <Route path="/home"
         element={<Home 
         />} />

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

        <Route path="/posts"
            element={<Posts
            setSinglePost={setSinglePost}
            navigate={navigate}
         />} />

        <Route path="/userposts"
            element={<UserPosts
            user={user}
            token={token}
            setUserPosts={setUserPosts}
            userPosts={userPosts}
            setSinglePost={setSinglePost}
            navigate={navigate} 
        />} />

        <Route path="/show-post/:postId"
            element={<ShowPost 
            singlePost={singlePost}
            setSinglePost={setSinglePost}
            setEditPost={setEditPost}
            navigate={navigate}
        />} />

        <Route path="/new-post"
            element={<NewPost 
            user={user}
            token={token}
            navigate={navigate}
        />} />

        <Route path="/edit-post/:postId"
            element={<EditPost 
            user={user}
            token={token}
            navigate={navigate}
            singlePost={singlePost}
            editPost={editPost}
        />} />

        </Routes>


  </>  );
    }