import axios from 'axios';
import getTokenObj from 'src/utils/getToken';


class submissionService {
  getSubmissionData = (form_id) => {
        return axios.get(`http://localhost:4000/form_submissions/${form_id}`)
        .then(res => {
            console.log('res.data', res.data)
          return res.data
        });
    }

  getFormSubmissionCount = () => {

    const tokenObj = getTokenObj();
    const user_id = tokenObj && tokenObj.userId;
    const token = tokenObj && tokenObj.accessToken;

    return axios.get(`http://localhost:4000/form_submissions_count/${user_id}`)
    .then(res => {
        console.log('res.data', res.data)
      return res.data
    });
  }
}
  
  export default new submissionService();