function checkSyntax( str ) {
	
const left  = ['[', '(', '<', '{'],
      right = [']', ')', '>', '}'],
      pairs = {'[':']', '(':')','<':'>','{':'}'};
  
  let seeker = [], 
      opened = 0,
      closed = 0;
  
	for ( let elem of str ) {
      if ( left.indexOf( elem ) > -1 ) {
        seeker.push( elem );
        opened++;
      } 
      if ( right.indexOf( elem ) > -1 ) {
        if ( elem !== pairs[seeker[seeker.length-1]] ) {
          return 1;
        } else {
            seeker.pop();
            closed++;  
          }
      }  
	}
 return ( opened === closed )? 0 : 1;
}	

	
let test_data = [
	checkSyntax("---(++++)----") === 0,
	checkSyntax("") == 0,
	checkSyntax("before ( middle []) after ") == 0,
	checkSyntax(") (") == 1,
	checkSyntax("} {") == 1,
	checkSyntax("<(   >)") == 1,
	checkSyntax("(  [  <>  ()  ]  <>  )") == 0,
	checkSyntax("   (      [)") == 1,
];
console.log(test_data); 