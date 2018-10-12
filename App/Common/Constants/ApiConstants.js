import Config from 'react-native-config';

const ApiConstants = {
  baseUrl: Config.API_URL,
  apiKey: Config.API_KEY,
  uris: {
    news: {
      get: 'top-headlines',
    },
    searchNews: {
      get: 'everything',
    },
    agency: {
      get: 'sources',
    },
  },
};

export default ApiConstants;
