import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Background = {
  backgroundImage: 'url(taipei101.jpg)',
  backgroundSize: 'cover', 
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  height: '100vh'
};

class Entry extends Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.getEntry = this.getEntry.bind(this);
    }

  componentDidMount() {
    this.getEntry(this.props.match.params.id);
  }

  getEntry(id) {
    this.fetch(`/api/entries/${id}` )
      .then(entry => {
        this.setState({entry: entry})
      });
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  render() {
    let entry = this.state.entry;
    console.log(entry)
  	return (<div style={Background}>  
		  <h2>Entry</h2>
        {entry? 
          <div>
            <div>{entry.phrase}</div>
            <div>{entry.pinyin}</div>
            <div>{entry.view_count}</div>
            <div>{entry.updated_at}</div>
          </div>
        : <div></div>}
    </div>
  	)
  }
}

export default Entry


// /api/entries/get_trending