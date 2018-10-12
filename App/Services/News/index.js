import API from '../Api';
import ApiConstants from '../../Common/Constants/ApiConstants';

const getNewsAPI = async (payload) => {
  const uri = ApiConstants.uris.news.get;
  const params = {
    apiKey: ApiConstants.apiKey,
    ...payload,
  };
  const response = await API().get(uri, params);
  return response;
};

const getSearchNewsAPI = async (payload) => {
  const uri = ApiConstants.uris.searchNews.get;
  const params = {
    apiKey: ApiConstants.apiKey,
    ...payload,
  };
  const response = await API().get(uri, params);
  return response;
};

const getAgencyAPI = async (payload) => {
  const uri = ApiConstants.uris.agency.get;
  const params = {
    apiKey: ApiConstants.apiKey,
    ...payload,
  };
  const response = await API().get(uri, params);
  return response;
};

export {
  getNewsAPI,
  getAgencyAPI,
  getSearchNewsAPI,
};
