import React from 'react'
import RepoList from './RepoList.jsx';

const RepoEntry = (props) => (

  <React.Fragment>
  <h5><a href={props.repo.html_url} target="_blank">{props.repo.repo_name}</a></h5>

    <li>Username: {props.repo.owner_login}</li>
    <li>Number of forks: {props.repo.fork_count}</li>
  </React.Fragment>

);

export default RepoEntry;