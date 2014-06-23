$(function() {
	var solveButton = $('#solve');
	solveButton.html('Solve');
	solveButton.bind('click', function() {
		solve();
	})
});

function convertFromStringToDOM() {
	uglyStringOfNumbers = $('pre').text();
	var uglyArrayOfNumbers = uglyStringOfNumbers.split('\n');

	for(arrayCounter = 0; arrayCounter < 9; arrayCounter++) {
		uglyArrayOfNumbers[arrayCounter] = uglyArrayOfNumbers[arrayCounter].split(' ');
	}

	return uglyArrayOfNumbers;
}

function solve() {
	alert('Brendan Sucks');
}
