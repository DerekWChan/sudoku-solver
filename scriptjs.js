$(function() {
	var solveButton = $('#solve');
	solveButton.html('Solve');
	solveButton.bind('click', function() {
		solve();
	})
});

function convertFromStringToDOM() {
	var uglyStringOfNumbers = $('pre').text();
}

function solve() {
	alert('Brendan Sucks');
}