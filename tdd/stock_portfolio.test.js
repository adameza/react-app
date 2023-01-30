const stock_portfolio = require('./stock_portfolio.js');

const portfolio = stock_portfolio.create_portfolio();

test('Testing portfolio1 object creation', () => {
  expect(portfolio.shares.length).toBe(0);
});

test('Testing stock function empty()', () => {
  expect(portfolio.empty()).toBe(true);
});

test('Testing stock function num_stocks()', () => {
  expect(portfolio.num_stocks()).toBe(0);
});

test('Testing stock function purchase()', () => {
  portfolio.purchase("GME", 5)
  expect(portfolio.empty()).toBe(false);
  expect(portfolio.num_stocks()).toBe(1);
});

test('Testing stock function sale()', () => {
  portfolio.sale("GME", 2)
  let result = portfolio.num_shares("GME")
  expect(portfolio.empty()).toBe(false);
  expect(portfolio.num_stocks()).toBe(1);
  expect(result).toBe(3);
});

test('Testing no empty stocks', () => {
  expect(portfolio.empty()).toBe(false);
  let result = portfolio.num_shares("GME")
  portfolio.sale("GME", result)
  expect(portfolio.empty()).toBe(true);
});

test('Testing no negative stock count', () => {
  portfolio.purchase("RBX", 4)
  expect(() => {
    portfolio.sale("RBX", 10);
  }).toThrow(stock_portfolio.ShareSaleException);
});