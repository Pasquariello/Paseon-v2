import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

const getTokenObj = () => {
  if (Cookies.get('paseonAccessToken')) {     
    console.log('HELLO') 
    const tokenObj = jwt(JSON.parse(Cookies.get('paseonAccessToken'))); // decode your token here
    return {
      user_id: tokenObj.user.id,
      accessToken: JSON.parse(Cookies.get('paseonAccessToken'))
    }
    // JSON.parse(Cookies.get('paseonAccessToken'));
  }
  return null;
};
export default getTokenObj;