import axios from 'axios';
import Cookies from 'js-cookie';


class authService {

    createAccount = (body) => {
      console.log('Hit createAccount');
      return axios.post(`http://localhost:4000/account`, body )
      .then(res => {
        console.log('res.data', res)

        // TODO 
        this.setSession({
          userId: '5fe978e8cc7faa326371ff65', //res.data.body.id,
          accessToken: 'token'
        });

        return res.data
      }).catch(error => { 
        throw error;
      });
    }

    setSession = (tokenObj) => {
      if (tokenObj) {
        Cookies.set('paseonAccessToken', JSON.stringify(tokenObj));
        axios.defaults.headers.common.Authorization = `Bearer ${tokenObj.accessToken}`;
      } else {
        Cookies.remove('paseonAccessToken');
        delete axios.defaults.headers.common.Authorization;
      }
    }

  }
  
  export default new authService();