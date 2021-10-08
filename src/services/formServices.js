import axios from 'axios';
import getTokenObj from 'src/utils/getToken';

class formsService {
    getForms = async () => {

      const tokenObj = await getTokenObj();
      const user_id = tokenObj && tokenObj.user_id;
      const token = tokenObj && tokenObj.accessToken;
      console.log('====', process.env.REACT_APP_API_URL);
      return axios.get(`${process.env.REACT_APP_API_URL}/forms/user_form_list/1`)
        .then(res => {
          return res.data
        });
      
      // old deno
        // return axios.get(`http://localhost:4000/form_list/${user_id}`)
        // .then(res => {
        //   return res.data
        // });
    }

    getSingleForm = (form_id) => {
      return axios.get(`http://localhost:4000/form/${form_id}`)
      .then(res => {
        return res.data
      });
    }

    createForm = (body) => {

      const tokenObj = getTokenObj();
      const user_id = tokenObj && tokenObj.user_id;
      const token = tokenObj && tokenObj.accessToken;

      return axios.post(`http://localhost:3001/forms/add_form`, body )
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