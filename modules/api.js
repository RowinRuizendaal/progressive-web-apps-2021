const axios = require('axios');

const fetchData = async (endpoint) => {
  const json = await axios(`${process.env.BASEURL}/${endpoint}`, {
    'method': 'GET',
    'headers': {
      'x-rapidapi-key': `${process.env.KEY}`,
      'x-rapidapi-host': `${process.env.HOST}`,
    },
  });

  return json.data;
};


module.exports = {
  fetchData,
};
