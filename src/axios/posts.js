import axios from 'axios';



//_________________________GET ALL POSTS_________________________

export async function getAllPosts () {
    const allPostsUrl = "http://localhost:4444/api/posts/all";
    
    try{
      const response = await axios.get(allPostsUrl);
      console.log('All Posts', response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }