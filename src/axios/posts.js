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


//_________________________GET POST BY ID_________________________

export async function getPostById (postId) {
    const postUrl = `http://localhost:4444/api/posts/${postId}`;
    
    try{
      const response = await axios.get(postUrl);
      console.log('Post by ID', response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

//_________________________CREATE POST_________________________

export async function createPost (token, post) {
    const createPostUrl = "http://localhost:4444/api/posts/create";
    
    try{
      const response = await axios.post(createPostUrl, post, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Post created', response.data);
      return response;
    }
    catch (error) {
      console.error(error);
    }
  }


//_________________________GET POSTS BY USER_________________________

export async function getPostsByUser (token) {
  console.log('Token:axios', token)
    const userPostsUrl = `http://localhost:4444/api/users/posts`;
    
    try{
      const response = await axios.get(userPostsUrl,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User Posts', response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

//_________________________EDIT POST_________________________

export async function updatePost (postId, token, post) {
    const editPostUrl = `http://localhost:4444/api/posts/edit/${postId}`;
    
    try{
      const response = await axios.patch(editPostUrl, post, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Post edited', response.data);
      return response;
    }
    catch (error) {
      console.error(error);
    }
  }