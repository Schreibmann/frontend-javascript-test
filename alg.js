function panCake() {
	this.frontSide = "raw";
	this.backSide = "raw";
	this.ready = () => {
		return this.frontSide === "roasted" && this.backSide === "roasted";
	};
}

function cookThreePanCakes(panCakes) {
	panCakes[0].frontSide = panCakes[1].frontSide = "roasted"; // 1st iteration
	panCakes[1].backSide = panCakes[2].frontSide = "roasted"; // 2nd iteration
	panCakes[2].backSide = panCakes[0].backSide = "roasted"; // 3rd iteration
}

let first = new panCake();
let second = new panCake();
let third = new panCake();

let panCakes = [first, second, third];

cookThreePanCakes(panCakes);

// Test

panCakes.forEach(panCake => {
	console.log(panCake.ready());
});
