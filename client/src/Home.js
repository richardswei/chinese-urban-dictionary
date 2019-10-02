import React, {Component} from 'react';

const Background = {
  backgroundImage: 'url(taipei101.jpg)',
  backgroundSize: 'cover', 
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  height: '100vh'
};

class Home extends Component {
	componentDidMount() {
    window.fetch('/api/entries')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }
  render() {
  	return (<div style={Background}>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
		  <h2>Home</h2>
    </div>
    </div>
  	)
  }
}

export default Home