class ShareSaleException extends Error {
  constructor(message) {
    super(message);
    this.name = "ShareSaleException";
  }
}


const portfolio = 
  {
      shares: [],
      empty()  {
        if (this.shares.length == 0)
          return true;
        return false
      },
      num_stocks() {
        let count = 0
        for (share in this.shares) {
          if (share.ticker != "")
            count++
        }
        return count
      },
      purchase(ticker_, count_) {
        if (count_ <= 0) {
          return
        }
        for (let i=0; i < this.shares.length; i++) {
          if (this.shares[i].ticker == ticker_)
            this.shares[i].count = this.shares[i].count + count_
            return
        }
        this.shares.push({ticker: ticker_, count: count_})
      },
      sale(ticker_, count_) {
        for (let i=0; i < this.shares.length; i++) {
          if (this.shares[i].ticker == ticker_)
            this.shares[i].count = this.shares[i].count - count_
            if (this.shares[i].count < 0) {
              throw new ShareSaleException("Sold more than availble shares.")
            }
            if (this.shares[i].count == 0) {
              this.shares.splice(i, 1)
            }
            return
        }
      },
      num_shares(ticker_) {
        for (let i=0; i < this.shares.length; i++) {
          if (this.shares[i].ticker == ticker_)
            return this.shares[i].count
        }
      }
  };

function create_portfolio() {
  return portfolio;
}

exports.create_portfolio = create_portfolio
exports.portfolio = portfolio
exports.ShareSaleException = ShareSaleException

