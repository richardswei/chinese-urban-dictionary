
import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

class SearchResults extends Component {

	constructor(props) {
    super(props);
    this.state = {searchResults: []};
  }

	componentDidMount(props) {
		this.getSearchResults();
	}

	getSearchResults = () => {
		return fetch(`api/entries/search?query=${this.props.location.state.query}`)
			.then(response => response.json())
			.then(json => {
				this.setState({searchResults: json});
				console.log(json)
			})
      .catch(error => console.log(error))
	}

	render() { 
	return	<div>
	  <h2>Search Results</h2>
	  {
	  	this.state.searchResults.length > 0 ?
	  		<div>{JSON.stringify(this.state.searchResults)}</div>
	  			: (<p>NO RESULTS FOUND</p>)

	  }
		<ul>
			<li></li>
		</ul>
	</div>
	}
}

export default SearchResults