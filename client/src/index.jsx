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
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO

    $.ajax({
      type: "POST",
      url: "/repos",
      data: JSON.stringify({"term": term}),
      contentType: 'application/json',
      success: function(response) {
        console.log('post functionality working');
      }
    });

    // $.post('/repos', {'term': term}, function(response) {
    //   console.log('post request response:::', response);
    // });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//sub-problem 1: make sure the correct term is being lifted to index.jsx (done)
  // 1A: bind onChange appropriately (done)
  // 1B: bind search correctly on both app and search (done)
//sub-problem 2: make an ajax (axios) post request to the server with the term (done)


