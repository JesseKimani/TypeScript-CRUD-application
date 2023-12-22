export const API_ENDPOINT = 'http://localhost:3000';
export const API_TOKEN = localStorage.getItem('token');
console.log('Access Token: ', API_TOKEN);

export const refToken = localStorage.getItem('refreshToken');
console.log('Refresh Token: ', refToken);
