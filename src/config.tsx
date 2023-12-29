// console.log(location);

export const serverUrl =
  location.hostname === 'localhost'
    ? 'http://localhost:2700'
    : 'https://backend-cs2hub.onrender.com';

console.log(serverUrl);
