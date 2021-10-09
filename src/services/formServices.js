import axios from 'axios';
import getTokenObj from 'src/utils/getToken';

class formsService {
    getForms = async () => {

      const tokenObj = await getTokenObj();
      const user_id = tokenObj && tokenObj.user_id;
      const token = tokenObj && tokenObj.accessToken;
      console.log('token', token)
      console.log('tokenObj', tokenObj)

      return axios.get(`${process.env.REACT_APP_API_URL}/forms/user_form_list/${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'token': `${token}`
        }
      })
        .then(res => {
          return res.data
        });
      
      // old deno
        // return axios.get(`http://localhost:4000/form_list/${user_id}`)
        // .then(res => {
        //   return res.data
        // });
    }

    getSingleForm = async (form_id) => {
      const tokenObj = await getTokenObj();
      const token = tokenObj && tokenObj.accessToken;
      
      return axios.get(`${process.env.REACT_APP_API_URL}/forms/details/${form_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'token': `${token}`
        }
      })
      .then(res => {
        return res.data
      });
    }

    createForm = (body) => {

      const tokenObj = getTokenObj();
      const user_id = tokenObj && tokenObj.user_id;
      const token = tokenObj && tokenObj.accessToken;

      return axios.post(`${process.env.REACT_APP_API_URL}/forms/add_form/${user_id}`, body )
      .then(res => {
        return res.data
      });

      // deno
      // return axios.post(`http://localhost:4000/form/${user_id}`, body )
      // .then(res => {
      //   return res.data
      // });
    }

    deleteForm = (form_id) => {
      return axios.delete(`http://localhost:4000/form/${form_id}`)
      .then(res => {
        return res.data
      });
    }

  }
  
  export default new formsService();