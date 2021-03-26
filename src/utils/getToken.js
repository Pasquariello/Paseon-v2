import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

const getTokenObj = () => {
  if (Cookies.get('paseonAccessToken')) {      
    const tokenObj = jwt(JSON.parse(Cookies.get('paseonAccessToken'))); // decode your token here
    return {
      user_id: tokenObj.user.id,
      token: JSON.parse(Cookies.get('paseonAccessToken'))
    }
    // JSON.parse(Cookies.get('paseonAccessToken'));
  }
  return null;
};
export default getTokenObj;