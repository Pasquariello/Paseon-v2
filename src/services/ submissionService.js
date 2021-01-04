import axios from 'axios';

class submissionService {
  getSubmissionData = (form_id) => {
        return axios.get(`http://localhost:4000/form_submissions/${form_id}`)
        .then(res => {
            console.log('res.data', res.data)
          return res.data
        });
    }

  getFormSubmissionCount = (user_id) => {
    return axios.get(`http://localhost:4000/form_submissions_count/${user_id}`)
    .then(res => {
        console.log('res.data', res.data)
      return res.data
    });
  }
}
  
  export default new submissionService();