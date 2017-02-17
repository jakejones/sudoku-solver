 function solve( orig_stage ){

 	var stage = _.cloneDeep(orig_stage);
 	var referenceStage = _.cloneDeep(stage);

 	// ---- Init possibilies with zeroes ----
 	var possibility = [];
 	for( var n = 1 ; n <= 9 ; n++ ){
 		possibility[n] = [
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0],
	 		[0,0,0,0,0,0,0,0,0]
	 	];
 	}

 	// ------ Fill in obvious possibilities ------
 	for( var i=0 ; i < stage.length ; i++ ){
 		for( var j=0 ; j < stage[i].length ; j++ ){
 		
 			// ------ If it's a blank spot ------
 			if( !stage[i][j] ){

 				for( var n = 1 ; n <= 9 ; n++ ){
	 				if( !existsInRow(n,i,stage) && !existsInCol(n,j,stage) && !existsInBox(n,i,j,stage) ){
						possibility[n][i][j] = 1;
	 				}
	 			}

 			}

 		}
 	}


 	// ------ reduce possibilities ------
 	for( var n = 1 ; n <= 9 ; n++ ){
 		possibility[n] = reduce( possibility[n] ); 
 	}
 

 	// ----- Fill in answer if certain -------
 	for( var n = 1 ; n <= 9 ; n++ ){
	 	for( var i=0 ; i < possibility[n].length ; i++ ){
	 		for( var j=0 ; j < possibility[n][i].length ; j++ ){

	 		
	 			// ------ If it's a possibility ------
	 			if( possibility[n][i][j] == 1 ){

	 				var temp = _.cloneDeep(possibility[n]);
	 				temp[i][j] = 0;
	 				if( !existsInRow(1,i,temp) || !existsInCol(1,j,temp) || !existsInBox(1,i,j,temp) ){
						stage[i][j] = n;
	 				}

	 			}


	 		}
	 	}
	}



	// ---- Is there a contadiction ? ----
	if( isContradiction(stage,possibility) ){
		return false;
	}



	if(isSolved(stage)){

		return stage;
	
	} else {

		if(  _.isEqual( stage , referenceStage )  ){
	 		// --- is Valid - No progress Made - Is stuck --
	 		// ---- Make a guess ----

	 		for( var n = 1 ; n <= 9 ; n++ ){
		 		for( var Row=0 ; Row < 3 ; Row++ ){
		 			for( var Col=0 ; Col < 3 ; Col++ ){
				 		if( sumBox(1,Row,Col,possibility[n]) == 2 ){
				 			// --- if a 50-50 option exists ---
				 			var pair = findPair( Row , Col , possibility[n] );
				 			// --- Try setting the first option--
				 			stage[pair[0].i][pair[0].j] = n;
				 			var result;
				 			if( result = solve(stage) ){
				 				return result;
				 			} else {
				 				stage[pair[0].i][pair[0].j] = null;
				 				stage[pair[1].i][pair[1].j] = n;
				 				return solve(stage);
				 			}
				 			
				 		}
				 	}
			 	}
		 	}


	 	} else {
	 		// --- Progress made -- continue as normal --
			return solve(stage);

	 	}

	 }

	 alert("Cannot Solve - Not enough Information");
	 return false;


}





function reduce( possibility ){

	var old = _.cloneDeep(possibility);
	var col_count = [];
	var row_count = [];
	var box_count = [];
 	for( var i=0 ; i < possibility.length ; i++ ){
 		var Row = Math.floor(i/3);
 		if( _.isUndefined(col_count[Row]) ){ col_count[Row] = []; }
 		if( _.isUndefined(box_count[Row]) ){ box_count[Row] = []; }
 		if( _.isUndefined(row_count[i]) ){ row_count[i] = []; }
 		
 		for( var j=0 ; j < possibility[i].length ; j++ ){
 				var Col = Math.floor(j/3);

 				if( _.isUndefined(col_count[Row][j]) ){ col_count[Row][j] = 0; }
		 		if( _.isUndefined(row_count[i][Col]) ){ row_count[i][Col] = 0; }
		 		if( _.isUndefined(box_count[Row][Col]) ){ box_count[Row][Col] = 0; }

				col_count[Row][j] += possibility[i][j];
				row_count[i][Col] += possibility[i][j];
				box_count[Row][Col] += possibility[i][j];

 		}
 	}

 	

 	for( var Row=0 ; Row < col_count.length ; Row++ ){
 		for( var j=0 ; j < col_count[Row].length ; j++ ){
 			var Col = Math.floor(j/3);

 			// ---- is a singe column in box ----
 			if( col_count[Row][j] == box_count[Row][Col] && box_count[Row][Col] > 0 ){

 				// ---- delete all in column except this Row ----
 				for( var i=0 ; i < possibility.length ; i++ ){
 					if( Math.floor(i/3) !== Row ){
 						possibility[i][j] = 0;
 					}
 				}

 			}

 		}
 	}


 	for( var i=0 ; i < row_count.length ; i++ ){
 		var Row = Math.floor(i/3);
 		for( var Col=0 ; Col < row_count[i].length ; Col++ ){

 			// ---- is a singe row in box ----
 			if( row_count[i][Col] == box_count[Row][Col] && box_count[Row][Col] > 0 ){

 				// ---- delete all in row except this Col ----
 				for( var j=0 ; j < possibility[i].length ; j++ ){
 					if( Math.floor(j/3) !== Col ){
 						possibility[i][j] = 0;
 					}
 				}

 			}



 		}
 	}
 	

 	if(  _.isEqual( possibility , old )  ){
 		return possibility;
 	} else {
 		return reduce( possibility );
 	}

}







function isContradiction(stage , possibility){

 	for( var n = 1 ; n <= 9 ; n++ ){
 		for( var Row=0 ; Row < 3 ; Row++ ){
	 		for( var Col=0 ; Col < 3 ; Col++ ){
		 		if( !existsInBox(n , Row*3 , Col*3 , stage) && ( sumBox(1,Row,Col,possibility[n]) == 0 )  ){
		 			return true;
		 		}
		 	}
	 	}
 	}

 	return false;
}





// ------ helper functions ------

function existsInRow( n , row , stage ){

	for( var i=0 ; i < stage[row].length ; i++ ){
		if( stage[row][i] == n ){
			return true;
		}
	}
	return false;
}


function existsInCol( n , col , stage ){

	for( var i=0 ; i < stage.length ; i++ ){
		if( stage[i][col] == n ){
			return true;
		}
	}
	return false;
}

function existsInBox( n , row, col , stage ){

	var i_start = Math.floor(row/3)*3;
	var j_start = Math.floor(col/3)*3;

	for(var i = i_start ; i < (i_start + 3) ; i++ ){
		for(var j = j_start ; j < (j_start + 3) ; j++ ){
			if( stage[i][j] == n ){
				return true;
			}
		}
	}
	return false;
}






function sumBox( n , Row, Col , stage ){

	var i_start = Row*3;
	var j_start = Col*3;

	var sum = 0;
	for(var i = i_start ; i < (i_start + 3) ; i++ ){
		for(var j = j_start ; j < (j_start + 3) ; j++ ){
			if( stage[i][j] == n ){
				sum++;
			}
		}
	}
	return sum;
}

function findPair( Row, Col , possibility ){

	var pair = [];

	var i_start = Row*3;
	var j_start = Col*3;
	for(var i = i_start ; i < (i_start + 3) ; i++ ){
		for(var j = j_start ; j < (j_start + 3) ; j++ ){
			if( possibility[i][j] == 1 ){
				pair.push( {i:i,j:j} );
			}
		}
	}
	return pair;
}



function isSolved(stage){

 	for( var i=0 ; i < stage.length ; i++ ){
 		for( var j=0 ; j < stage[i].length ; j++ ){
 			// ------ If it's a blank spot ------
 			if( !stage[i][j] ){
 				return false;
 			}
 		}
	}
	return true;
}
