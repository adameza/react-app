
const myFunctions = require('./sample_functions.js');

test('Testing sum', () => {
  const target = 30;
  const result = myFunctions.sum(12, 18);
  expect(target).toBe(result);
});

test('Testing div', () => {
  const target = 5;
  const result = myFunctions.div(20,4);
  expect(target).toBe(result);
});

test('Testing constainsNumbers', () => {
  const target = true;
  const result = myFunctions.containsNumbers("Bff3");
  expect(target).toBe(result);
});