import Sum from "../Sum";

test("1 더하기 2는 3", () => {
  expect(Sum(1, 2)).toBe(3);
});

test("2 더하기 2는 3", () => {
  expect(Sum(2, 2)).toBe(4);
});
