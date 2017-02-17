
var app = new Vue({
  el: '#app',
  data: {
    stage: [
          [3   ,8   ,5   ,null,null,null,null,null,2   ],
          [2   ,6   ,9   ,null,null,1   ,null,null,5   ],
          [1   ,7   ,4   ,null,null,null,null,3   ,null],
          [6   ,null,null,9   ,8   ,null,5   ,7   ,null],
          [9   ,null,7   ,1   ,null,6   ,null,null,8   ],
          [null,null,null,7   ,2   ,null,null,null,4   ],
          [null,null,6   ,null,null,null,null,null,null],
          [7   ,1   ,null,null,null,null,4   ,null,6   ],
          [4   ,null,null,null,null,8   ,null,null,null]
    		],
    editable: true
  },
  methods:{
  	solveButton: function(){
  		this.editable = false;

      var solution = solve(this.stage);
      if( solution ){
        this.stage = solution;
      } else {
        alert( "You Entered an Invalid Sudoku Board" );
        this.editable = true;
      }
  		app.$forceUpdate();
  	}
  },
   watch: {
  	editable: function(){

  		var inputlist = document.getElementById("app").getElementsByTagName("input");
  		if(this.editable){
  			for (var i=0 ; i < inputlist.length ; i++){
  				inputlist[i].removeAttribute("disabled");
  			}
  		} else {
  			for (var i=0 ; i < inputlist.length ; i++ ){
  				inputlist[i].setAttribute("disabled", "disabled");
  			}
  			
  		}

  	}
  }
});

/*

[
          [3   ,8   ,5   ,null,null,null,null,null,2   ],
          [2   ,6   ,9   ,null,null,1   ,null,null,5   ],
          [1   ,7   ,4   ,null,null,null,null,3   ,null],
          [6   ,null,null,9   ,8   ,null,5   ,7   ,null],
          [9   ,null,7   ,1   ,null,6   ,null,null,8   ],
          [null,null,null,7   ,2   ,null,null,null,4   ],
          [null,null,6   ,null,null,null,null,null,null],
          [7   ,1   ,null,null,null,null,4   ,null,6   ],
          [4   ,null,null,null,null,8   ,null,null,null]
        ]



                  [4   ,null,3   ,2   ,7   ,null,null,6   ,null],
          [2   ,null,5   ,9   ,null,null,null,null,null],
          [9   ,null,6   ,4   ,8   ,null,2   ,null,null],
          [null,2   ,null,null,null,null,null,null,null],
          [null,3   ,null,null,5   ,4   ,null,2   ,8   ],
          [6   ,5   ,4   ,8   ,2   ,null,null,3   ,7   ],
          [3   ,4   ,2   ,null,1   ,8   ,null,5   ,null],
          [null,null,1   ,5   ,4   ,null,3   ,null,2   ],
          [5   ,null,null,null,null,2   ,4   ,null,null]


                    [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null]

*/