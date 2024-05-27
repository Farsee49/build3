import React, {Fragment} from "react";
import NewComments from "./NewComments";
import { deletePost } from "../axios/posts";





export default function ShowPost({ singlePost, setEditPost, navigate, post}) {
    const token = window.localStorage.getItem('token');
    const postId = singlePost.id;

    async function handleDelete() {
        console.log('Delete Post:', singlePost)
        const result = await deletePost(postId, token);
        console.log('Delete Result:', result);
    }

    console.log('Single Post:', singlePost)
    return (
        <>
        <h1>singlepost</h1>
            <h1>{singlePost.title}</h1>
            <p>{singlePost.content}</p>
            <button className="ms-5" variant="primary" size="sm" onClick ={ () => {
                        console.log('Post:', singlePost)
                                 setEditPost(singlePost)
                                   navigate(`/edit-post/${singlePost.id}`)
                                 }}>Edit Post</button>
            <button className="ms-5" variant="primary" size="sm" onClick ={ () => {
                        console.log('Post:', singlePost)
                                 handleDelete(postId, token)
                                navigate(`/userposts`)
                                 }
                                    }>Delete Post</button>
            <h3>Post Comments</h3>
            
            {singlePost.comments.map(comment =>
                <Fragment key={comment.id}>
                    <h3>{comment.title}</h3>
                    <p>{comment.body}</p>
                    
                </Fragment>
            )}
            <div>
                <NewComments singlePost={singlePost} navigate={navigate} />
            </div>
        </>
    )
}