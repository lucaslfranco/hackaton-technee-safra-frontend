let config = {};

// local/staging/production
const stage = 'local'

const dev = {
    REACT_APP_API_URL: 'http://localhost:8080',
};

const staging = {
    REACT_APP_API_URL: '/api',
};

const prod = {
    REACT_APP_API_URL: '/api',
};

if (stage === 'production')
    config = prod;
else if (stage === 'staging')
    config = staging;
else
    config = dev;

export { config, stage };