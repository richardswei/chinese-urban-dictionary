function createToggleIMECheckbox() {
	$('body').append($('<div>', {id:"toggleCheckbox"}));
		$('#toggleCheckbox').append('<label for="toggleIME">Use IME: </label>');
		$('#toggleCheckbox').append('<input id="toggleIME" type="checkbox" name="IME">');
		$('#toggleCheckbox').css({
			'position': 'fixed',
			'bottom': '1%',
			'right': '1%',
			'z-index': '1',
		});
}


function bindIME(inputId, numResultsToShow) {
	// set the caret's selection start and end for later insertion
	//Create the label element
		$('input#toggleIME').change(addListeners);		
		function addListeners() {
			console.log(this.checked);
			if (this.checked) {
				$(inputId).on('keydown', initializeIME);
			} else {
				$(inputId).off();
			}
		}
	var selectionFieldPos = [0,0];
	function initializeIME(event) {
		// TRIGGER the IME ONLY IF the character is a-z and IF CRTL is not pressed
		if (event.ctrlKey || event.which<65 || event.which>90) {
			return;
		}
		selectionFieldPos = [this.selectionStart,this.selectionEnd];
		// TRACK the position of the results box
	  $(inputId).after(
      $('<div>', { id: 'imeBubble'})
	  );
	  $('#imeBubble').append(
      $('<input>', { id: 'imeEntry', type: 'text'})
	  );
	  $('#imeBubble').append(
      $('<div>', { id: 'imeResults'})
	  );
	  // TODO clickable options
	  //	$('#imeBubble').append(
	  // 	$('<img class="results" id;="nextInList" src="http://img.icons8.com/material-outlined/24/000000/down.png">')
	  // );
	  // $('img#nextInList').on('mousedown', function(){alert('thistaht');});
	  var caret = getCaretCoordinates(this, this.selectionEnd);
	  console.log(caret);
	  console.log(this);
	  console.log(this.getBoundingClientRect());
	  var inputHorizPosition = this
	  	.getBoundingClientRect().left + caret.left + 5;
	  $("#imeBubble").css({
			"background-color":"#DCDCDC",
			"z-index": 99,
			"color":"black",
			"position":"absolute",
			"left":inputHorizPosition+"px",
			"padding":"10px",
			"border": "1px solid gray"
		});
		// remove IME when focus out
		$('input#imeEntry').on('blur', removeIME);
		// FOCUS into the ime entry box and render the IME with the first character on keyup
	  $('input#imeEntry').focus();
	  $('input#imeEntry').on('keyup', renderIME);
	}
	// INITIALIZE the IME once keydown

	function removeIME() {
		$('#imeBubble').remove();
	}

	function renderIME(event) {
		// GET imeBubble
		var inputEntryText = this.value;
		if (inputEntryText == '') { 
			// takes care of case where user deletes to blank input
			$('#imeResults').hide();
			return;
		}
		var charCode = event.which;
		var currPageNum = $('#imeBubble').data('page');
		var currResults = $('#imeBubble').data('results');
		if (charCode==13) {
			// if character is return key
			insertPhrase(currResults[0]);
		} else if (charCode>=49 && charCode<=49+numResultsToShow){ 
			// if character is num of selection in results list
			insertPhrase(currResults[charCode-49]);
		} else if (charCode==40) { // arrow down
			// do nothing if we go to the end of retrieved results
			if (!$('#imeBubble').data('nextPageAvailable')) {
				return;
			}
			setChineseList(inputEntryText, numResultsToShow, currPageNum+1);
		} else if (charCode==38) { // arrow up
			// return if we are already at the first page
			if (currPageNum==0)	{
				return;
			} else {
				setChineseList(inputEntryText, numResultsToShow, currPageNum-1);
			}
		} else {
			// get the new list of entries and set the list
			setChineseList(inputEntryText,numResultsToShow,0);
		}
	}

	// INSERT the result into the saved cursor position(s) of the inputField
	function insertPhrase(insertableText) {
		var inputField = $(inputId);
		var firstSlice = inputField.val().slice(0,selectionFieldPos[0]);
		var secondSlice = inputField.val().slice(selectionFieldPos[1]);
		inputField.val(firstSlice+insertableText+secondSlice);
		inputField.focus();
		$('#imeBubble').remove();
	};

	// GET the pinyin transliteration via ajax call
	function getChinese(pinyin, numberResults) {
		return $.ajax({
			url: "https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num="+
				numberResults+"&text="+pinyin.toLowerCase(),
		});
	}

	// SET the ajax results in the ime bubble
	function setChineseList(input, numToShow, pageNum) {
		var promise = getChinese(input,(pageNum+2)*(numToShow));
			promise.then(data => {
				var resultsList = data[1][0][1].slice((pageNum)*(numToShow), (pageNum+1)*(numToShow));
				$( "#imeBubble" ).data( {
					// BIND results, page, and nextPageAvailable as data for ime Bubble for a next call
					results: resultsList,
					page: pageNum,
					nextPageAvailable: (data[1][0][1].length/5)>(pageNum+1)
				} );
				$('#imeResults').show();
				document.getElementById('imeResults').innerHTML = 
					resultsList.map(
						function(x, i){
							return '<div>'+(i+1)+")"+x+"</div>";
						}
					).join(' ')+"Page: "+(pageNum+1);
			}).catch(error => ('Error:', error));
	}
}
