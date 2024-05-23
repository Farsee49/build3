import axios from 'axios';



//_________________________REGISTER USER_________________________

export async function registerUser(user) {
    const registerUrl = "http://localhost:4444/api/users/register";
    console.log(user)
  
    try{
    const response = await axios.post(registerUrl, user);
    console.log('Registration successful', response.data);
    return response;
    } catch (error) {
      console.error(error);
    }
  };


  //_________________________LOGIN USER_________________________

export async function userLogin(user) {
    const loginUrl = "http://localhost:4444/api/users/login";
    console.log(user)
  
    try{
    const response = await axios.post(loginUrl, user);
   // console.log('Login successful', response.data);
    return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  //_________________________GET CURRENT USER_________________________
  
  export async function getCurrentUser (token) {
    const currentUserUrl = "http://localhost:4444/api/users/me";
    try{
      const response = await axios.get(currentUserUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      //console.log('Current User', response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  }