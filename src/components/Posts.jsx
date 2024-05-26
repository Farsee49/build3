import React, {Fragment,useState} from "react";
import { getAllPosts } from "../axios/posts";

export default function Posts({ setSinglePost, navigate}) {
    const [posts, setPosts] = React.useState([]);

    const getPosts = async () => {
        const result = await getAllPosts();
        const allPosts = result.data.posts;
        setPosts(allPosts);
        console.log(allPosts);
       
    }

    React.useEffect(() => {
        Promise.all([getPosts()]);
    }, []);

    function PostTitle({ title }) {
        return <a href={`/sin`}> <h2 className="text-center">{title}</h2></a>;
      }
      
      function PostContent({ content }) {
        return <p className="text-center">{content}</p>;
      }

    return (
    <>
        <h1>Posts</h1>
        {posts.map(post =>
                <Fragment key={post.id}>
                    <PostTitle title={post.title} />
                    <PostContent content={post.content} />
                    <button className="ms-5" variant="primary" size="sm" onClick ={ () => {
                        console.log('Post:', post)
                                 setSinglePost(post)
                                   navigate(`/show-post/${post.id}`)
                                 }}>Show Post</button>
                    <hr></hr>
                    {/* <h3 className="text-center">Post Comments</h3> <hr></hr> */}
                    {/* {post.comments.map(comment => 
                            <Fragment key={comment.id}>
                                <h3 className="text-center">{comment.title}</h3>
                                <p className="text-center" >{comment.body}</p>
                            </Fragment>
                        )} */}
                    
                </Fragment>)}


        </>
        )
}