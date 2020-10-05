export function tokenHeader(){
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && token.access_token) {
      return {'Authorization': `bearer ${token.access_token}`};
    }else{
      return {};
    }
}