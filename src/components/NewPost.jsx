import React, {useState} from "react";
import { createPost } from "../axios/posts";



export default function NewPost({ user, navigate}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = window.localStorage.getItem('token');

    async function handleSubmit(ev) {
        ev.preventDefault();
        // console.log('Title:', title, 'Content:', content);
        // console.log('User:', user, 'Token:', token);
        let authorId = user.id;
        const newPost = {title, content, authorId};
        console.log('New Post:', newPost);
        const result = await createPost(token, newPost);
        console.log('Post Result:', result);
        navigate(`/userposts`);

    }

    return (
        <div>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={(ev)=> setTitle(ev.target.value)} className="form-control" id="title" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Say Something</label>
                    <textarea type="text" onChange={(ev)=> setContent(ev.target.value)} className="form-control" id="content" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}