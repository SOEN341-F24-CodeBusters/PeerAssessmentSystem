const configurations = {
  development: {
    apiBaseUrl: 'https://localhost:7010'
  },
  deployment: {
    apiBaseUrl: 'https://pas-server.louischoiniere.me'
  }
};

const environment = process.env.NODE_ENV === 'deploy' ? 'deployment' : 'development';

export default configurations[environment];