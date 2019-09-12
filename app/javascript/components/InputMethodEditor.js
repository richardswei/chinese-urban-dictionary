import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

class InputMethodEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: "",
			queryText: "",
			caretPositions: [0,0],
			results: [],
			imeHidden: true,
		};
		this.IMEBubbleRef = React.createRef();
		this.MainInputFieldRef = React.createRef();
		this.handleIMEKeyUp = this.handleIMEKeyUp.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
		this.handleInputSelect = this.handleInputSelect.bind(this);
		this.handleIMEOff = this.handleIMEOff.bind(this);
		this.handleResultMouseDown = this.handleResultMouseDown.bind(this);
	}
	insertPhrase(phrase) {
		const inputText = this.state.inputText;
		const firstInputText = inputText.slice(0,this.state.caretPositions[0])
		const secondInputText = inputText.slice(this.state.caretPositions[1])
		this.setState({
			inputText:firstInputText+phrase+secondInputText,
			queryText: "",
			results: [],
		});
	}
	hideIME() {
		this.setState(state => ({
			imeHidden: true
		}));
	}
	showIME() {
		this.setState(state => ({
			imeHidden: false
		}));
	}
	handleIMEKeyUp(event) {
		event.preventDefault();
		const charCode = event.which;
		if (charCode>48 && charCode<(49+(this.state.results.length))) {
			this.insertPhrase(this.state.results[charCode-49]);
			this.MainInputFieldRef.current.focus();
			this.hideIME();
			return;
		}
		this.setState({queryText: event.target.value});
		this.getCharacters(event.target.value);
	}
	handleInputChange(event) {
	  this.setState({inputText: event.target.value});
	}
	handleInputKeyDown(event) {
		if (event.ctrlKey || event.which<65 || event.which>90){
			return;
		}
		this.showIME();
		// this.IMEBubbleRef.current.queryInputRef.current.focus();
	}
	handleInputSelect(e) {
		this.setState({caretPositions: [e.target.selectionStart,e.target.selectionEnd]});
	}
	handleIMEOff() {
		this.hideIME();
	}
	handleResultMouseDown(event) {
		this.insertPhrase(event.target.textContent);
		this.MainInputFieldRef.current.focus();
		// this.hideIME();
	}	
	getCharacters(queriedText) {
		if (queriedText==="") {
			this.setState({results: []});
		} else {
			fetch("https://www.google.com/inputtools/request?"+
				"ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num="+
						this.props.numResults+"&text="+ queriedText)
				.then( response => response.json() )
				.then( json => {
					this.setState({results: json[1][0][1]});
				});
		}
	}

	render() {
		return (
			<div>
				{this.props.textArea ? 
					(<textarea 
						rows="4" cols="50"
						type="text"
						value={this.state.inputText} 
						onChange={this.handleInputChange}
						onKeyDown={this.handleInputKeyDown}
						onSelect={this.handleInputSelect}
						ref = {this.MainInputFieldRef}
					></textarea>)	: 	
					(<input 
						type="text"
						value={this.state.inputText} 
						onChange={this.handleInputChange}
						onKeyDown={this.handleInputKeyDown}
						onSelect={this.handleInputSelect}
						ref = {this.MainInputFieldRef}
					></input>)
				}
				{!this.state.imeHidden && 
				<ImeBubble
					results={this.state.results}
					onKeyUp={this.handleIMEKeyUp}
					onBlur={this.handleIMEOff}
					onMouseDown={this.handleResultMouseDown}
					ref = {this.IMEBubbleRef}
				></ImeBubble>}
			</div>
		)
	}
}

class	ImeBubble extends Component {
	constructor(props) {
	   super(props);
	   // Declare and initialize the ref in the constructor
		this.queryInputRef = React.createRef();
	 }
	componentDidMount(){
		this.queryInputRef.current.focus();
	}
	renderResult(i) {
		return (
				<Result value={i}></Result>
		);
	}
	render() {
		const items = this.props.results.map((string) => {
			return <Result 
				key={string}
				value={string}
				onMouseDown={this.props.onMouseDown}
			></Result>;
		})
		return (
			<div  
				style={{
					position:'absolute',
					zIndex: '99',
					backgroundColor: 'gray',
					textAlign: 'left',
				}}>
				<input 
					type="text"
					onKeyUp={ this.props.onKeyUp }
					onBlur={ this.props.onBlur }
					ref={this.queryInputRef}
				/>
				<br/>
				<ol>{items}</ol>
			</div>
		);
	}
}

class	Result extends Component {
	render() {
		return (
			<li
				onMouseDown= {this.props.onMouseDown}
			>
			{this.props.value}
			</li>
		);
	}
}

export default InputMethodEditor;