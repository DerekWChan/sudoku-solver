function getFullSudoku() {
	var sudoku;
	
	// Loop here, as it only returns a valid sudoku occasionally
	while (!(sudoku = (function () {
		var arr, line, sudoku;
		var i, j, k, l, m, nums

		// Initialise empty sudoku
		line = Array(10).join('- ').slice(0, -1);
		for (arr = [], i = 0; i < 9; i++) {
			arr.push(line);
		}
		sudoku = new Matrix(arr);
	
		// Populate the empty sudoku
		for (i = 0; i < 9; i++) {
			for (j = 0; j < 9; j++) {
				nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	
				// Remove numbers found in row and columns
				for (k = 0; k < 9; k++) {
					if (nums.indexOf(sudoku.array[i][k]) !== -1) {
						nums.splice(nums.indexOf(sudoku.array[i][k]), 1);
					}
					if (nums.indexOf(sudoku.array[k][j]) !== -1) {
						nums.splice(nums.indexOf(sudoku.array[k][j]), 1);
					}
				}
	
				// Remove numbers found in nearest grid of nine
				col = (i < 3) ? 0 : (i < 6) ?  3 : 6;
				row = (j < 3) ? 0 : (j < 6) ?  3 : 6;

				for (l = row; l < row + 3; l++) {
					for (m = col; m < row + 3; m++) {
						if (nums.indexOf(sudoku.array[m][l]) !== -1) {
							nums.splice(nums.indexOf(sudoku.array[m][l]), 1);
						}
					}
				}
			
				// If nums.length === 0, then the Sudoku will be impossible
				if (nums.length === 0) {
					return false;
				}
	
				// Use random number out of remaining
				sudoku.array[i][j] = nums[Math.floor(Math.random() * nums.length)];
			}
		}
		return sudoku;
	})()));
	return sudoku;
}

function sudokuIsSolvable(sudoku) {
	var i, j, k, l, m, nums, solved, unsolved, col, row;
	
	solved = unsolved = 0;
	
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
		
			// If not already solved, attempt to solve it
			if (sudoku.array[i][j] === null) {
				nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				
				// Remove numbers found in row and columns
				for (k = 0; k < 9; k++) {
					if (nums.indexOf(sudoku.array[i][k]) !== -1) {
						nums.splice(nums.indexOf(sudoku.array[i][k]), 1);
					}
					if (nums.indexOf(sudoku.array[k][j]) !== -1) {
						nums.splice(nums.indexOf(sudoku.array[k][j]), 1);
					}
				}

				// Remove numbers found in nearest grid of nine
				col = (j < 3) ? 0 : (j < 6) ?  3 : 6;
				row = (i < 3) ? 0 : (i < 6) ?  3 : 6;

				for (l = row; l < row + 3; l++) {
					for (m = col; m < row + 3; m++) {
						if (nums.indexOf(sudoku.array[m][l]) !== -1) {
							nums.splice(nums.indexOf(sudoku.array[m][l]), 1);
						}
					}
				}

				if (nums.length === 0) {
					return false;
				} else if (nums.length === 1) {
					// Uncomment next line to solve array
					//sudoku.array[i][j] = nums[0];
					solved++;
				} else {
					unsolved++;
				}
			}
		}
	}
	
	if (unsolved === 0) {
		return true;
	} else if (solved === 0) {
		return false;
	} else {
		return sudokuIsSolvable(sudoku);
	}
}

function getSudoku() {
	var sudoku = getFullSudoku(), tmp_num, row, col;
	
	for (var i = 0; i < 5; i++) {
		while (sudokuIsSolvable(sudoku)) {
			row = Math.floor(Math.random() * 9);
			col = Math.floor(Math.random() * 9);
	
			// Remove random element
			tmp_num = sudoku.array[row][col];
			sudoku.array[row][col] = null;
		}
		
		// Restore random element that didn't work
		sudoku.array[row][col] = tmp_num;	
	}
	
	return sudoku;
}

var a = getSudoku();
a.toString();