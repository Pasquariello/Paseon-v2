import Cookies from 'js-cookie';
const getTokenObj = () => {
  if (Cookies.get('paseonAccessToken')) {
    return JSON.parse(Cookies.get('paseonAccessToken'));
  }
  return null;
};
export default getTokenObj;