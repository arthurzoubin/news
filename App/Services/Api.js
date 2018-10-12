// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import ApiConstants from '../Common/Constants/ApiConstants';

// our "constructor"
const API = (baseURL = ApiConstants.baseUrl) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  return api;
};

// let's return back our create method as the default.
export default API;
