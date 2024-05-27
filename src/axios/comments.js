import axios from "axios";





export async function getAllComments() {
    try {
        const { data } = await axios.get('/api/comments');
        return data;
    } catch (error) {
        throw error;
    }
}


export async function createComment(token, comment, postId) {
    const createCommentUrl = `http://localhost:4444/api/posts/${postId}/comments/create`;
    
    try{
      const response = await axios.post(createCommentUrl, comment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Comment created', response.data);
      return response;
    }
    catch (error) {
      console.error(error);
    }
  }