function bindIME(inputId, numResultsToShow) {
	var selectionFieldPos = [0,0];
	// set the caret's selection start and end for later insertion
	var initializeIME = function(event) {
		// TRIGGER the IME ONLY IF the character is a-z and IF CRTL is not pressed
		if (event.ctrlKey || event.which<65 || event.which>90) {
			return;
		}
		selectionFieldPos = [this.selectionStart,this.selectionEnd];
		// TRACK the position of the results box
	  $('#phrase').append(
      $('<div>', { id: 'imeBubble'})
	  );
	  $('#imeBubble').append(
      $('<input>', { id: 'imeEntry', type: 'text'})
	  );
	  $('#imeBubble').append(
      $('<div>', { id: 'results', class:'results'})
	  );
	  // TODO clickable options
	  //	$('#imeBubble').append(
	  // 	$('<img class="results" id="nextInList" src="http://img.icons8.com/material-outlined/24/000000/down.png">')
	  // );
	  // $('img#nextInList').on('mousedown', function(){alert('thistaht');});
	  var caret = getCaretCoordinates(this, this.selectionEnd);
	  var inputVertPosition = this
	  	.getBoundingClientRect().top + caret.height + caret.top + 5;
	  var inputHorizPosition = this
	  	.getBoundingClientRect().left + caret.left + 5;
	  $("#imeBubble").css({
			"background-color":"#DCDCDC",
			"z-index": 99,
			"color":"black",
			"position":"absolute",
			"top":inputVertPosition+"px",
			"left":inputHorizPosition+"px",
			"padding":"10px",
			"border": "1px solid gray"
		});
		$('html').on('mousedown', removeIME);
		$('#imeBubble').on('mousedown', function(event){
			event.stopPropagation();
		});
	  $('input#imeEntry').focus();
	  $('input#imeEntry').on('keyup', renderIME);
	}
	$(inputId).on('keydown', initializeIME);

	var removeIME = function() {
		if (!$('.resultsList').is(":focus")){
			document.getElementById("imeBubble").remove();
		}
	}

	var resultsList = []; 
	// need global variable to keep the old list
	var renderIME = function(event) {
		// GET imeBubble
		var inputEntryText = this.value;
		if (inputEntryText == '') { 
			// takes care of case where user deletes to blank input
			$('.results').hide();
			return;
		}
		var code = event.which;
		if (code==13) {
			// if character is return key
			insertPhrase($('#imeBubble').data('results')[0]);
		} else if (code>=49 && code<=49+5){ 
			// if character is num of selection in results list
			insertPhrase($('#imeBubble').data('results')[code-49]);
		} else if (code==40) { // arrow down
			if (!$('#imeBubble').data('nextPageAvailable')) {
				return;
			}
			resultPageNum = $('#imeBubble').data('page');
			setChineseList(inputEntryText, 5, resultPageNum+1);
		} else if (code==38) { // arrow up
			resultPageNum = $('#imeBubble').data('page');
			if (resultPageNum==0)	{
				return;
			} else {
				setChineseList(inputEntryText, 5, resultPageNum-1);
			}
		} else {
			// get the new list of entries and set the list
			setChineseList(inputEntryText,5,0);
		}
	}

	function insertPhrase(insertableText) {
		var inputField = $(inputId);
		var firstSlice = inputField.val().slice(0,selectionFieldPos[0]);
		var secondSlice = inputField.val().slice(selectionFieldPos[1]);
		inputField.val(firstSlice+insertableText+secondSlice);
		$('#imeBubble').remove();
		inputField.focus();
	};

	function getChinese(pinyin, numberResults) {
		return $.ajax({
			url: "https://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&num="+
				numberResults+"&text="+pinyin.toLowerCase(),
		});
	}

	function setChineseList(input, numToShow, pageNum) {
		var promise = getChinese(input,(pageNum+2)*(numToShow));
			promise.then(data => {
				resultsList = data[1][0][1];
				$( "#imeBubble" ).data( {
					results: resultsList.slice((pageNum)*(numToShow), (pageNum+1)*(numToShow)),
					page: pageNum,
					nextPageAvailable: (resultsList.length/5)>(pageNum+1)
				} );
				$('.results').show();
				document.getElementById('results').innerHTML = 
					$( "#imeBubble" ).data("results").map(
						function(x, i){
							return '<div>'+(i+1)+") "+x+"</div>";
						}
					).join(' ')+pageNum;
			}).catch(error => debug('Error:', error));
	}
}
