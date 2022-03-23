import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.addRepos = this.addRepos.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    $.ajax({
      type: "GET",
      url: "/repos",
      dataType: 'json',
      success: this.addRepos
    });
  }

  postRepo(term) {
    $.ajax({
      type: "POST",
      url: "/repos",
      data: JSON.stringify({"term": term}),
      contentType: 'application/json',
      success: this.getRepos
    });
  }

  addRepos(repos) {
    console.log('repos on client:::', repos);
    console.log('this in addRepos', this);
    this.setState({repos: repos});
  }

  search(term) {
    console.log(`${term} was searched`);
    this.postRepo(term);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//sub-problem 1: make sure the correct term is being lifted to index.jsx (done)
  // 1A: bind onChange appropriately (done)
  // 1B: bind search correctly on both app and search (done)
//sub-problem 2: make an ajax (axios) post request to the server with the term (done)

// sub-problem 5: on load, get the top 25 repos and render them to the screen
  // 5A:
