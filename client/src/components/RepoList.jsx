import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => {

  const repoTemplate = props.repos.map((repo) => {
    return <RepoEntry repo={repo}/>
  });

  return (
    <div>
      <h4> Top {props.repos.length} repos </h4>
        <div>{repoTemplate}</div>
    </div>
  )
}

export default RepoList;