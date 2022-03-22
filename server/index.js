const express = require('express');
const github = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());


app.post('/repos', function (req, res) {
  console.log('incoming post request:::', req.body);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var { term } = req.body;
  github.getReposByUsername(term, function() {
    console.log('linked to github.js');
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

//sub-problem 3: access the github api with axios (done)
  // 3A: connect index.js to github.js (done)
  // 3B: figure out how to use axios to connect to github api
  // 3C: figure out how to send a request to githubs api
//sub-problem 4: save the relevant data from the GitHub API into my database
  // 4A: link up github.js to database index.js (done)
  // 4B: get all data from github response obj into correct format (done)
  // 4C: pass data into mongoose



