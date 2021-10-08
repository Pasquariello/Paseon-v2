import axios from 'axios';
import Cookies from 'js-cookie';
import getTokenObj from 'src/utils/getToken';

class authService {

    logout = () => {
      this.setSession(null);
    }

    createAccount = (body) => {
      return axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, body )
      .then(res => {
        const token = res.data.accessToken;
        this.setSession(token);
        return res;
      }).catch(error => { 
        throw error;
      });
    }


    loginWithEmailAndPassword = (body) => {
      console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL)
      return axios.post(`${process.env.REACT_APP_API_URL}/user/login`, body )
      .then(res => {
        const token = res.data.token;
        console.log('TOKEN', token)
        this.setSession(token);
        return res
      }).catch(error => { 
        throw error;
      });
    }

    setSession = (tokenObj) => {
      if (tokenObj) {
        Cookies.set('paseonAccessToken', JSON.stringify(tokenObj));
        axios.defaults.headers.common.Authorization = `Bearer ${tokenObj}`;
      } else {
        Cookies.remove('paseonAccessToken');
        delete axios.defaults.headers.common.Authorization;
      }
    }


    loginWithToken = () => new Promise((resolve, reject) => {
      const tokenObj = getTokenObj();
      const token = tokenObj && tokenObj.accessToken;

      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/user/me`,
        headers: {
          'Content-Type': 'application/json',
          'token'       : `${token}`
        }
      };
      
      axios(config)
        .then((response) => {
          
          resolve(response)
        })
        .catch((error) => {
          this.logout()
          reject(error);
        });
    })


    isAuthenticated = () => !!getTokenObj()


  }
  
  export default new authService();