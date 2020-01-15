import React, {Component} from 'react'
import { Card, Jumbotron } from 'react-bootstrap'
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
    const prevSearch = prevProps.location.pathname;
    const newSearch = this.props.location.pathname;
    if (prevSearch !== newSearch) {
      this.getSearchResults();
    }
  }

  getSearchResults = (r) => {
    return fetch(`api/entries/search?query=${this.props.match.params.id}`)
      .then(response => response.json())
      .then(json => {
        this.setState({searchResults: json});
      })
      .catch(error => console.log(error))
  }

  render() { 
    return  <div>
      <Jumbotron as="h2">Search Results</Jumbotron>
      {
        this.state.searchResults.length > 0 ?
          <div>{
            this.state.searchResults.map((result) => {
              return ( <Card 
                  bg='dark'
                  text='white'
                  className='cardLink'
                  key={result.entry.id} 
                  style={{ width: '50vw' }} 
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
            : <Card><Card.Body>NO RESULTS FOUND FOR: "{this.state.query}"</Card.Body></Card>
    }
    </div>
  }
}
export default SearchResults