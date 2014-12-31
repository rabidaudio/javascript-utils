/**
*   A class for keeping a random subset of static size of some set
*
*   Hide and Show are inverse subsets of the indexes of 
*/
function RandSubSet(Set, subsize){
  this.Set = Set;
  this.subsize = subsize;
  var Hide = seqence(Set.length - 1);
  var Show = [];

  while(Show.length < subsize){
    //move a random element from Hide to Show
    moveElement(Hide, Show, getRandElementIndex(Hide));
  }
  Show.sort();

  //public methods

  /**
  *   Switch a random shown element with a random hidden one.
  *   Returns an object with the lost element and the new one
  */
  this.swap = function(){
    var r = swapRandElements(Show, Hide);
    var hidden = r[0];
    var shown = r[1];
    return {
      hidden: {index: hidden, val: Set[hidden]},
      shown:  {index: shown,  val: Set[shown]}
    };
  }
  this.visible = function(){
    return Show.map(function(e,i,a){ return Set[e]; });
  }
  this.invisible = function(){
    return Hide.map(function(e,i,a){ return Set[e]; });
  }

  //private methods

  /**
  *   Get the index of a random element in S
  */
  function getRandElementIndex(S){
    return Math.floor(Math.random()*(S.length));
  }

  /**
  *   Return an integer sequence (inclusive). Omitting `start` starts from 0.
  *     seqence(4);     // [0, 1, 2, 3, 4]
  *     seqence(-1,2);  //[-1, 0, 1, 2]
  *     seqence(0);     //[0]
  *     sequence(4,2);  //[]
  */
  function seqence(start, end){
    if(end===undefined){
      end = start;
      start = 0;
    }
    if(end-start+1 < 0) return [];
    var A = new Array(end-start+1);
    for(var i=start; i<end+1; i++){
      A[i-start] = i;
    }
    return A;
  }

  /**
  *   Remove element at index `i` from `from` array to `to` array
  */
  function moveElement(from, to, i){
    to.push(from.splice(i,1)[0]);
  }

  function swapRandElements(A, B){
    var a = getRandElementIndex(A);
    var b = getRandElementIndex(B);
    var result =[ A[a], B[b] ];
    A.push(B.splice(b,1)[0]);
    B.push(A.splice(a,1)[0]);
    A.sort();
    B.sort();
    return result;
  }
}

module.exports = RandSubSet;