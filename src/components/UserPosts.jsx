import React, {Fragment,useState, useEffect} from "react";
import { getPostsByUser } from "../axios/posts";




export default function UserPosts({ user, setSinglePost, navigate}) {
    const [userPosts, setUserPosts] = React.useState([]);
    const token = window.localStorage.getItem('token');
 //console.log('User Posts:', userPosts);
    const fetchUserPosts = async () => {
        console.log('token:', token)
        const result = await getPostsByUser(token);
        console.log('User Posts:', result.data.comments)
        const uPosts = result.data;
        setUserPosts(uPosts);
        console.log('User Posts:', uPosts);
       
       
    }




React.useEffect(() => {
    Promise.all([fetchUserPosts()]);
}, []);



function PostTitle({ title }) {
    return <h2 className="text-center">{title}</h2>;
  }

    function PostContent({ content }) {
        return <p className="text-center">{content}</p>;
    }


    return (
        <>
            <h1>{user.username}'s Posts</h1>
            {userPosts.map(post =>
                <div className="" key={post.id}>
                    <PostTitle title={post.title} />
                    <PostContent content={post.content} />
                    <hr></hr>
                    <h3 className="text-center">Post Comments</h3> <hr></hr>
                    {post.comments.map(comment =>
                       <Fragment key={comment.id}>
                            <h3 className="text-center">{comment.title}</h3>
                            <p className="text-center" >{comment.body}</p>
                        </Fragment>
                    )}
                    <button className="ms-5" variant="primary" size="sm" onClick ={ () => {
                                setSinglePost(post)
                                     navigate(`/show-post/${post.id}`)
                                 }}>Show Post</button>
                </div>
            )}
        </>
    )

}