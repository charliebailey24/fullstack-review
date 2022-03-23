const mongoose = require('mongoose');
const github = require('../helpers/github.js');
mongoose.connect('mongodb://localhost/fetcher');
const server = require('../server/index.js');

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

  // need to callback whether adding the data was successful
  // console.log('data in save:::', data);

  data.forEach(async (repo) => {
    var obj = new Repo({
      id: repo.id,
      repo_name: repo.name,
      owner_login: repo.owner.login,
      html_url: repo.owner.html_url,
      fork_count: repo.forks_count
    });

    var storedDoc = await Repo.findOne({id: obj.id}, function(error, results) {
      if (error) {
        callback(error);
      } else {
        console.log('results from findOne:::', results);
      }
    });

    if (storedDoc === null) {
      await obj.save(function(error, results) {
        if (error) {
          callback(error);
        } else {
          console.log('results from save:::', results);
        }
      });
    }
  });

  // await Repo.deleteMany();

  var stored = await Repo.find();
  console.log('stored:::', stored);

  callback(null, 'successfully added');

}

let get = async (callback) => {
  // get all repos
  // sort by fork_count
  // callback top 25
  var repos = await Repo.find(function(error, results) {
    if (error) {
      callback(error)
    }
  });
  console.log('repos in get:::', repos);
  var sorted = repos.sort((a, b) => {
    return  b.fork_count - a.fork_count;
  });
  console.log('sorted in get:::', sorted);
  var top25 = sorted.slice(0, 25);
  callback(null, top25);
}

module.exports.save = save;
module.exports.get = get;