
import React, {Component} from 'react'
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom";

class SearchResults extends Component {

	constructor(props) {
    super(props);
    this.state = {
	    query: "",
	    searchResults: []
		};
  }

	componentDidMount() {
		this.getSearchResults();
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps)
	  const prevSearch = prevProps.location.state.query;
	  const newSearch = this.props.location.state.query;
	  if (prevSearch !== newSearch) {
			this.getSearchResults();
	  }
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
		  		<div>{
		  			this.state.searchResults.map((result) => {
		  				return ( <Card 
									key={result.entry.id} 
									style={{ width: '18rem' }} 
									as={Link} 
									to={`/entries/${result.entry.id}`}
								>
			  				  <Card.Body>
			  				    <Card.Title>{result.entry.phrase}</Card.Title>
			  				    <Card.Subtitle className="mb-2 text-muted">{result.entry.pinyin}</Card.Subtitle>
			  				    <Card.Text>
											Definition: {result.definition_text}
			  				    </Card.Text>
			  				  </Card.Body>
			  				</Card>
	  					)
		  			})
		  		}</div>
		  			: <p>NO RESULTS FOUND</p>
		}
		</div>
	}
}
export default SearchResults