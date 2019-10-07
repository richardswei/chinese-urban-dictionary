import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class Home extends Component {
  constructor() {
      super();
      this.state = {};
      this.getTrending = this.getTrending.bind(this);
    }

  componentDidMount() {
    this.getTrending();
  }

  getTrending() {
    this.fetch('/api/entries/get_trending')
      .then(entries => {
        this.setState({entries: entries.map((entry) => {
          return {id: entry.id, phrase: entry.phrase} 
        })})
      });
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  render() {
    let entries = this.state.entries;
  	return (<div>  
		  <h2>Trending</h2>
      <div className='trending'>
        {entries && entries.length 
          ? <ul>
             {entries.map((entry) => {
               return <li key={entry.id}>
                <Link to={`/api/entries/${entry.id}`}>
                  {entry.phrase}
                </Link>
               </li>
             })}
          </ul>
        : <ul><li></li></ul>}
      </div>
    </div>
  	)
  }
}

export default Home


// /api/entries/get_trending