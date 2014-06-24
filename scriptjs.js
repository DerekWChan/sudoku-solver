$(function() {
	// reference to solve button
	var solveButton = $('#solve');
	solveButton.html('Solve');

	// Runs solve method upon clicking solve button
	solveButton.bind('click', function() {
		solve();
	})

	refArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
});

// Removes all values in the given array from this array
Array.prototype.diff = function(a) {
    return this.filter(function(i) { return a.indexOf(i) < 0; });
};


// Converts ugly sudoku string to an easy to work with 2d array
function convertFromStringToDOM() {
	// Gets sudoku from page
	uglyStringOfNumbers = $('pre').text();
	// Splits the string by line breaks
	var uglyArrayOfNumbers = uglyStringOfNumbers.split('\n');

	// For each line, splits that line by spaces
	for(arrayCounter = 0; arrayCounter < 9; arrayCounter++) {
		uglyArrayOfNumbers[arrayCounter] = uglyArrayOfNumbers[arrayCounter].split(' ');
	}

	return uglyArrayOfNumbers;
}

// Solves the puzzle
function solve() {
	var grid = convertFromStringToDOM();
	setupGrid(grid);

	// Continues to look for possible numbers while puzzle is not solved
	while(!isComplete(grid)) {
		updateGrid(grid);
	}

	// If the solution is correct, display it; throw an error otherwise
	if(isCorrect(grid)) {
		drawSolution(grid);
	} else {
		console.log("SO MUCH ERROR");
	}
}

// Get the row at the given index (0-8)
function getRow(grid, index) {
	return grid[index];
}

// Get the column at the given index (0-8)
function getColumn(grid, index) {
	var sudoColumn = [];

	for(indexCounter = 0; indexCounter < 9; indexCounter++) {
		sudoColumn[indexCounter] = grid[indexCounter][index];
	}
	return sudoColumn;
}

// Get the block (3x3) that the given coordinate belongs to
function getBlock(grid, i, j) {
	var sudoBlock = [];
	var blockRow = getBlockSet(i);
	var blockCol = getBlockSet(j);

	for(i = blockRow; i < blockRow+3; i++) {
		getRow(grid, i).slice(blockCol, blockCol+3).forEach(function(num) {
			sudoBlock.push(num);
		});
	}

	return sudoBlock;
}

function getBlockSet(n) {
	if(n < 3) { return 0; }
	else if(n < 6) { return 3; }
	else { return 6; }
}


// Replace all instances of dashes('-') with all possibilites(array from 1-9)
function setupGrid(grid) {
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {
			if(grid[i][j] == "-") {  
				grid[i][j] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
			}
		}
	}
}

// Iterate through each cell and remove possibilities that can no longer be true
function updateGrid(grid) {
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {
			if(grid[i][j] instanceof Array) {  
				removePossibilities(grid, i, j);

				// If cell only has one possibility, replace with corresponding number
				if(grid[i][j].length == 1) {
					grid[i][j] = grid[i][j][0];
				}
			}
		}
	}
}

// Remove possibilities from the current cell based on corresponding row, column and block
function removePossibilities(grid, row, column) {
	grid[row][column] = grid[row][column].diff(getRow(grid, row));
	grid[row][column] = grid[row][column].diff(getColumn(grid, column));
	grid[row][column] = grid[row][column].diff(getBlock(grid, row, column));
}

// Is there a number in each cell?
function isComplete(grid) {
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {
			if(grid[i][j] instanceof Array) {  
				return false;
			}
		}
	}
	return true;
}

// Are there no repeats in every row, column and block?
function isCorrect(grid) {
	for(var i = 0; i < 0; i++) {
		var row = getRow(grid, i);
		var col = getColumn(grid, i);

		// Rows and columns
		if(refArray.diff(row).length != 0 && refArray.diff(col).length != 0) {
			return false;
		}
	}

	// Blocks
	for(var i = 0; i < 7; i += 3) {
		for(var j = 0; j < 7; j += 3) {
			var block = getBlock(grid, i, j);

			if(refArray.diff(block).length != 0) {
				return false;
			}
		}
	}
	return true;
}


// Draw table with solution
function drawSolution(grid) {
	var $table = $('#sudoTable');
	for(var rowCount = 0; rowCount < grid.length; rowCount++) {
		$table.append('<tr id=row'+rowCount + '></tr>');
		for(var columnCount = 0; columnCount < grid[rowCount].length; columnCount++) {
			$('#row'+rowCount).append('<td>' + grid[rowCount][columnCount] + '</td>');
			console.log('Column Count: ' + columnCount);
		}
	}
}