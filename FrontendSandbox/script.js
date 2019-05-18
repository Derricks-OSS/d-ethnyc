//Array.from(document.querySelectorAll('a.ListAttributes-item span.ListAttributes-item-title')).map(x => x.innerText)
window.onload = initAll;
var usedNums = new Array(76);
console.log(Array.from(document.querySelectorAll('a.ListAttributes-item span.ListAttributes-item-title')).map(x => x.innerText));

function initAll() {
	if (document.getElementById) {
		document.getElementById("reload").onclick = anotherCard;
		newCard();
	}
	else {
		alert("Sorry, your browser doesn't support this script");
	}
}


function newCard() {
	for (var i=0; i<24; i++) {
		setSquare(i);
	}
}


function setSquare(thisSquare) {
	var currSquare = "square" + thisSquare;
	var colPlace = new Array(0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4);
	var colBasis = colPlace[thisSquare] * 15;
    var newNum;
    let kitty = "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_412,c_fill,g_auto,h_412,ar_1:1/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180302141853-cryptokitties-top.jpg";

	do {
		newNum = colBasis + getNewNum() + 1;
	}
	while (usedNums[newNum]);
    usedNums[newNum] = true;

    //document.getElementById(currSquare).innerHTML = "<img src='" + kitty + "' />";
    //newNum;
    document.getElementById(currSquare).innerHTML = "<img src='" + "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/" + newNum + ".png"+  "'/>";
    document.getElementById(currSquare).className = "";
    document.getElementById(currSquare).onmousedown = toggleColor;
    //add func to push to an array result
}


function getNewNum() {
	return Math.floor(Math.random() * 15);
}


function anotherCard() {
	for (var i=1; i<usedNums.length; i++) {
		usedNums[i] = false;
	}
	newCard();
	return false;
}


function toggleColor(evt) {
	if (evt) {
		var thisSquare = evt.target;
	}	else {
		var thisSquare = window.event.srcElement;
	}
	if (thisSquare.className == "") {
		thisSquare.className = "pickedBG";
	}	else {
		thisSquare.className = "";
	}
	checkWin();
}


function checkWin() {
	var winningOption = -1;
	var setSquares = 0;
	var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);

	for (var i=0; i<24; i++) {
		var currSquare = "square" + i;
		if (document.getElementById(currSquare).className != "") {
			document.getElementById(currSquare).className = "pickedBG";
			setSquares = setSquares | Math.pow(2,i);
		}
	}

	for (var i=0; i<winners.length; i++) {
		if ((winners[i] & setSquares) == winners[i]) {
			winningOption = i;
		}
	}
	
	if (winningOption > -1) {
		for (var i=0; i<24; i++) {
			if (winners[winningOption] & Math.pow(2,i)) {
				currSquare = "square" + i;
				document.getElementById(currSquare).className = "winningBG";
			}
		}
	}
};