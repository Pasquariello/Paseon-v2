import axios from 'axios';
import Cookies from 'js-cookie';
import getTokenObj from 'src/utils/getToken';

class authService {

    logout = () => {
      this.setSession(null);
    }

    createAccount = (body) => {
      return axios.post(`http://localhost:3001/user/signup`, body )
      .then(res => {
        console.log('res.data', res)
        const token = res.data.token;
        this.setSession(token);
        return res;
      }).catch(error => { 
        throw error;
      });
    }


    loginWithEmailAndPassword = (body) => {
      return axios.post(`http://localhost:3001/user/login`, body )
      .then(res => {
        console.log('res.data', res)
        const token = res.data.token;
        this.setSession(token);
        return res
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


    loginWithToken = () => new Promise((resolve, reject) => {
      const tokenObj = getTokenObj();
      const token = tokenObj && tokenObj.token;

      console.log('loginWithToken', token);
      const config = {
        method: 'get',
        url: 'http://localhost:3001/user/me',
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