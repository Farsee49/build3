import React, {Fragment,useState} from "react";
import { getAllPosts } from "../axios/posts";

export default function Posts() {
    const [posts, setPosts] = React.useState([]);

    const getPosts = async () => {
        const posts = await getAllPosts();
        setPosts(posts.data.posts);
        console.log(posts.data.posts);
    }

    React.useEffect(() => {
        getPosts();
    }, []);

    function PostTitle({ title }) {
        return <h2 className="text-center">{title}</h2>;
      }
      
      function PostContent({ content }) {
        return <p className="text-center">{content}</p>;
      }

    return (
        <>
        <h1>Posts</h1>
        {posts&&posts.map(post =>
                <Fragment key={post.id}>
                    <PostTitle title={post.title} />
                    <PostContent content={post.content} />
                    <hr></hr>
                    <h3 className="text-center">Post Comments</h3> <hr></hr>
                    {post.comments.map(comment => 
                            <Fragment key={comment.id}>
                                
                                <h3 className="text-center">{comment.title}</h3>
                                <p className="text-center" >{comment.body}</p>
                               
                            </Fragment>
                            
                        )
                    }
                </Fragment>)}


        </>
    )
}