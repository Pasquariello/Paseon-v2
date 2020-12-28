import axios from 'axios';

class formsService {
    getForms = (user_id) => {
        return axios.get(`http://localhost:4000/forms/${user_id}`)
        .then(res => {
            console.log('res.data', res.data)
          return res.data
        });
    }

  }
  
  export default new formsService();