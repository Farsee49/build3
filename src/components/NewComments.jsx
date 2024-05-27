import React from "react"; 
import { createComment } from "../axios/comments"; 



export default function NewComments({singlePost,navigate}) {
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');
    
    async function handleSubmit(ev) {
        ev.preventDefault();
        const token = window.localStorage.getItem('token');
        console.log('at new comment Post:', singlePost);
        let postId = singlePost.id;
        let authorId = singlePost.authorId;
        console.log('Title:', title, 'Body:', body, 'PostId:', postId, 'AuthorId:', authorId);
        const comment = {title, body, postId, authorId};
        const result = createComment(token, comment, postId);
        console.log('Comment Result:', result);
        navigate("/userposts"); 
    }

    return (

        <div>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" onChange={(ev)=> setTitle(ev.target.value)} className="form-control" id="title" placeholder="Enter title" />
    </div>
    <div className="form-group">
        <label htmlFor="content">Say Something</label>
        <textarea type="text" onChange={(ev)=> setBody(ev.target.value)} className="form-control" id="content" rows="3"></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
</form>
   </div>
    )
}