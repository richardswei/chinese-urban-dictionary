import React, {Component} from 'react';
import {Form, Jumbotron, Button} from 'react-bootstrap';
import InputMethodEditor from '../InputMethodEditor'

class NewEntry extends Component {
	constructor(props) {
		super(props);
		this.state={};
		this.onChange = this.onChange.bind(this);
		this.phraseInput = React.createRef();

	}

	onChange(e) {
    if (e.target.id === 'phrase') {
      this.setState({ phrase: e.target.value });
    } else if (e.target.id === 'pinyin') {
      this.setState({ pinyin: e.target.value });
		}
	}


	postEntry = () => {
		console.log(this.phraseInput);
		const entryObj = {
			phrase: this.phraseInput.current.state.inputText,
			pinyin: this.state.pinyin
		};
		return entryObj.phrase && entryObj.pinyin ? 
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

  render() {
  	return (
  		<Jumbotron>
  			<h2>New Entry</h2>
  			<Form>
  				<Form.Group>
  					<Form.Label>Phrase</Form.Label>
  					<Form.Control
  						as={InputMethodEditor}
  						ime_off = {this.props.appState.ime_off}
  						numResults={5}
  						type="text"
  						ref={this.phraseInput}
  						id='phrase'
  						inputClass="form-control"
  					></Form.Control>
  				</Form.Group>
  				<Form.Group>
  					<Form.Label>Pinyin</Form.Label>	
  					<Form.Control
  						onChange={this.onChange}
  						id='pinyin'
  					></Form.Control>	
  				</Form.Group>
  				<Button onClick={this.postEntry} >Save</Button>
  			</Form>
  		</Jumbotron>
  	)
  }
}

export default NewEntry