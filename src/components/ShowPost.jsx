import React, {Fragment} from "react";
import { useParams } from "react-router-dom";





export default function ShowPost({ singlePost, setEditPost, navigate, post}) {

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
            <h3>Post Comments</h3>
            
            {singlePost.comments.map(comment =>
                <Fragment key={comment.id}>
                    <h3>{comment.title}</h3>
                    <p>{comment.body}</p>
                    
                </Fragment>
            )}
        </>
    )
}