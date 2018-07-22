"use strict";

function dscountCycle(s, a, b) {
  let str = s.toLowerCase();
  let count = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === a && str[i + 1] === b && i !== str.length - 1) {
      count++;
    }
  }
  return count;
}

function dscountRecur(s, a, b) {
  let str = s.toLowerCase();
  let ab = (a + b).toLowerCase();
  if (str.length < 2) {
    return 0;
  }
  if (str.substring(0, 2) === ab) {
    return 1 + dscountRecur(str.substring(1), ab[0], ab[1]);
  } else {
    return dscountRecur(str.substring(1), ab[0], ab[1]);
  }
}

// Для удобства можно использовать эти тесты:
try {
  test(dscountCycle, ["ab___ab__", "a", "b"], 2);
  test(dscountCycle, ["___cd____", "c", "d"], 1);
  test(dscountCycle, ["de_______", "d", "e"], 1);
  test(dscountCycle, ["12_12__12", "1", "2"], 3);
  test(dscountCycle, ["_ba______", "a", "b"], 0);
  test(dscountCycle, ["_a__b____", "a", "b"], 0);
  test(dscountCycle, ["-ab-аb-ab", "a", "b"], 2);
  test(dscountCycle, ["aAa", "a", "a"], 2);

  test(dscountRecur, ["ab___ab__", "a", "b"], 2);
  test(dscountRecur, ["___cd____", "c", "d"], 1);
  test(dscountRecur, ["de_______", "d", "e"], 1);
  test(dscountRecur, ["12_12__12", "1", "2"], 3);
  test(dscountRecur, ["_ba______", "a", "b"], 0);
  test(dscountRecur, ["_a__b____", "a", "b"], 0);
  test(dscountRecur, ["-ab-аb-ab", "a", "b"], 2);
  test(dscountRecur, ["aAa", "a", "a"], 2);

  console.info("Congratulations! All tests passed.");
} catch (e) {
  console.error(e);
}

// Простая функция тестирования
function test(call, args, count, n) {
  let r = call.apply(n, args) === count;
  console.assert(r, `Found items count: ${count}`);
  if (!r) throw "Test failed!";
}
