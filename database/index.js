const mongoose = require('mongoose');
const github = require('../helpers/github.js');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  repo_name: String,
  owner_login: String,
  html_url: String,
  fork_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // To avoid duplicate repos, you first must decide which column(s) you should use to determine uniqueness.
  console.log('data in save:::', data);

  var usersRepos = data.map((repo) => {
    var obj = {
      id: repo.id,
      repo_name: repo.name,
      owner_login: repo.owner.login,
      html_url: repo.owner.html_url,
      fork_count: repo.forks_count
    }
    return obj;
  });

  console.log('usersRepos:::', usersRepos);

  await Repo.create(usersRepos);

  var stored = await Repo.find({});

  console.log('stored:::', stored);

}

module.exports.save = save;