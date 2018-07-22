function func1(s, a, b) {
	if (s.match(/^$/) !== null) {
		return -1;
	}

	var i = s.length - 1;
	var aIndex = -1;
	var bIndex = -1;

	while (aIndex == -1 && bIndex == -1 && i > 0) {
		if (s.substring(i, i + 1) == a) {
			aIndex = i;
		}
		if (s.substring(i, i + 1) == b) {
			bIndex = i;
		}
		i = i - 1;
	}

	if (aIndex != -1) {
		if (bIndex == -1) {
			return aIndex;
		} else {
			return Math.max(aIndex, bIndex);
		}
	}

	if (bIndex != -1) {
		return bIndex;
	} else {
		return -1;
	}
}

function func2(s, a, b) {
	return Math.max(s.lastIndexOf(a), s.lastIndexOf(b));
}

// Test

let args = ["askjsdklcslrkjtlkjertwsjkl288bfd8vt6x86a547sc547cbfkr", "a", "b"];

console.log(func1(...args) === func2(...args));
