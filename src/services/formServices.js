import axios from 'axios';

class formsService {
    getForms = (user_id) => {
        return axios.get(`http://localhost:4000/form_list/${user_id}`)
        .then(res => {
          console.log('====', res.data)
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
      return axios.post(`http://localhost:4000/form/`, body )
      .then(res => {
          console.log('res.data', res.data)
        return res.data
      });
    }

    deleteForm = (form_id) => {
      console.log('DELETE ME', form_id)
      return axios.delete(`http://localhost:4000/form/${form_id}`)
      .then(res => {
          console.log('res.data', res.data)
        return res.data
      });
    }

  }
  
  export default new formsService();