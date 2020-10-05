export function authHeader(){
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token && user.token.access_token) {
    return {'Authorization': `bearer ${user.token.access_token}`};
  }else{
    return {};
  }
}