import React, {Component} from 'react';
import {Form, Jumbotron, Button} from 'react-bootstrap';

class NewEntry extends Component {
	constructor(props) {
		super(props);
		this.state={};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
    // console.log(this.state);
    if (e.target.id === 'phrase') {
      this.setState({ phrase: e.target.value });
    } else if (e.target.id === 'pinyin') {
      this.setState({ pinyin: e.target.value });
		}
		console.log(e.target.value)
	}


	postEntry = () => {
		const entryObj = {
			phrase: this.state.phrase,
			pinyin: this.state.pinyin
		};
		return this.state.phrase && this.state.pinyin ? 
			fetch(`/api/entries/`,{
					method: 'POST',
					headers: {
					  'content-type': 'application/json',
					  'authorization': 'Bearer ' + this.props.appState.jwt
					},
					dataType: 'json',
					body: JSON.stringify(entryObj)
			})
			.then(response => response.json())
			.then(json => {
				console.log(json)
				this.props.history.push({
		      pathname: `/entries/${json.id}`,
		    });
			})	
		: alert('Fields cannot be empty!')
	}

	componentDidMount() {
  }
  render() {
  	return (
  		<Jumbotron>
  			<h2>New Entry</h2>
  			<Form>
  				<Form.Group>
  					<Form.Label>Phrase</Form.Label>
  					<Form.Control onChange={this.onChange} id='phrase'></Form.Control>
  				</Form.Group>
  				<Form.Group>
  					<Form.Label>Pinyin</Form.Label>	
  					<Form.Control onChange={this.onChange} id='pinyin'></Form.Control>	
  				</Form.Group>
  				<Button onClick={this.postEntry} >Save</Button>
  			</Form>
  		</Jumbotron>
  	)
  }
}

export default NewEntry