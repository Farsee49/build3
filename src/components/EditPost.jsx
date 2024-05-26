import React, {useState} from "react";
import { updatePost } from "../axios/posts";




export default function EditPost({editPost,setSinglePost, navigate}) {
    const [postTitle, setPostTitle] = useState();
    const [postContent, setPostContent] = useState();
    const token = window.localStorage.getItem('token');
    async function handleSubmit(ev) {
        ev.preventDefault();
        // console.log('Title:', title, 'Content:', content);
        // console.log('User:', user, 'Token:', token);
        let authorId = editPost.authorId;
        let postId = editPost.id;
        const post = {title: postTitle, content: postContent, authorId};
        console.log('New Post:', post);
        const result = await updatePost(postId, token, post);
        console.log('Post Result:', result);
        // navigate(`/userposts`);

    }
    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" onChange={(ev)=> setPostTitle(ev.target.value)} placeholder={editPost.title} className="form-control" id="title"  />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Say Something</label>
                    <textarea type="text" onChange={(ev)=> setPostContent(ev.target.value)} placeholder={editPost.content} className="form-control" id="content" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}