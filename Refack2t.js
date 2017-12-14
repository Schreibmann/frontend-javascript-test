function drawRating(vote) {
  const rating = [
    '★☆☆☆☆',
    '★★☆☆☆',
    '★★★☆☆',
    '★★★★☆',
    '★★★★★'
  ];
		return rating[ parseInt( vote/21 ) ];
}

//Test

console.log(drawRating(0) );   // ★☆☆☆☆
console.log(drawRating(1) );   // ★☆☆☆☆
console.log(drawRating(20) );  // ★☆☆☆☆
console.log(drawRating(40) );  // ★★☆☆☆
console.log(drawRating(60) );  // ★★★☆☆
console.log(drawRating(80) );  // ★★★★☆
console.log(drawRating(99) );  // ★★★★★
console.log(drawRating(100) ); // ★★★★★

