const axios = require('axios');
const config = require('../config.js');
const index = require('../server/index.js');
const database = require('../database/index.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  console.log('username in githubHelper:::', username);

  var url = `https://api.github.com/users/${username}/repos`;

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options)
  .then(function(response) {
    // console.log('axios github api response:::', response);
    database.save(response.data, function(err, reponse) {
      console.log('this will return a reponse to server');
    });
  })
  .catch(function(error) {
    console.log(error);
  });

}

module.exports.getReposByUsername = getReposByUsername;