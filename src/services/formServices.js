import axios from 'axios';
import getTokenObj from 'src/utils/getToken';

class formsService {
    getForms = async () => {

      const tokenObj = await getTokenObj();
      console.log('tokenObj', tokenObj)
      const user_id = tokenObj && tokenObj.user_id;
      const token = tokenObj && tokenObj.accessToken;
        
        return axios.get(`http://localhost:4000/form_list/${user_id}`)
        .then(res => {
          return res.data
        });
    }

    getSingleForm = (form_id) => {
      return axios.get(`http://localhost:4000/form/${form_id}`)
      .then(res => {
          console.log('res.data', res.data)
        return res.data
      });
    }

    createForm = (body) => {

      const tokenObj = getTokenObj();
      const user_id = tokenObj && tokenObj.user_id;
      const token = tokenObj && tokenObj.accessToken;

      return axios.post(`http://localhost:4000/form/${user_id}`, body )
      .then(res => {
          console.log('res.data', res.data)
        return res.data
      });
    }

    deleteForm = (form_id) => {
      return axios.delete(`http://localhost:4000/form/${form_id}`)
      .then(res => {
          console.log('res.data', res.data)
        return res.data
      });
    }

  }
  
  export default new formsService();