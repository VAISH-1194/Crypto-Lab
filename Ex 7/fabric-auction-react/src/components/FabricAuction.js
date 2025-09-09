export default class FabricAuction {
  constructor() {
    this.ledger = new Map(); 
    this.logs = [];      
  }

  log(action) {
    const txID = crypto.randomUUID();
    const time = new Date().toLocaleString();
    this.logs.push({ txID, time, action });
  }

  createAuction(id, car) {
    if (this.ledger.has(id)) {
      return `[ERR] Auction ID already exists: ${id}`;
    }
    const auction = {
      auctionID: id,
      car,
      highestBid: 0,
      highestBidder: "-",
      lastTxID: "-",
      lastTxTime: "-"
    };
    this.ledger.set(id, auction);

    const txID = crypto.randomUUID();
    const time = new Date().toLocaleString();
    auction.lastTxID = txID;
    auction.lastTxTime = time;

    this.log(`Created auction ${id} for car ${car}`);
    return `[OK] Auction created: ${id}`;
  }

  placeBid(id, bidder, amount) {
    const auction = this.ledger.get(id);
    if (!auction) return `[ERR] Auction not found: ${id}`;

    if (amount > auction.highestBid) {
      auction.highestBid = amount;
      auction.highestBidder = bidder;
      const txID = crypto.randomUUID();
      const time = new Date().toLocaleString();
      auction.lastTxID = txID;
      auction.lastTxTime = time;
      this.log(`Bid placed on ${id} by ${bidder} = ${amount}`);
      return `[OK] Bid accepted: ${amount} by ${bidder}`;
    } else {
      return `[ERR] Bid must be higher than current highest (${auction.highestBid})`;
    }
  }

  queryAuction(id) {
    const auction = this.ledger.get(id);
    if (!auction) return `[ERR] Auction not found: ${id}`;
    this.log(`Queried auction ${id}`);
    return auction;
  }

  getLedger() {
    return Array.from(this.ledger.values());
  }

  getLogs() {
    return this.logs;
  }
}
