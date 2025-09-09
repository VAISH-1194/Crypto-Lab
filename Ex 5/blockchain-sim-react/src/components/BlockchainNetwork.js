export default class BlockchainNetwork {
  constructor() {
    this.ledger = [];
    this.logs = [];
    this.initializeLedger();
  }

  initializeLedger() {
    this.ledger.push({ id: "A101", color: "Red", size: 10, owner: "Alice", value: 1000 });
    this.ledger.push({ id: "A102", color: "Blue", size: 5, owner: "Bob", value: 500 });
    this.logs.push("Ledger initialized with sample assets.");
  }

  log(action) {
    this.logs.push(action);
  }

  hashTransaction(data) {
    // Simple SHA-256 hash in browser
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    return crypto.subtle.digest("SHA-256", dataBuffer).then((hashBuffer) => {
      return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    });
  }

  async createAsset(id, color, size, owner, value) {
    const asset = { id, color, size, owner, value };
    this.ledger.push(asset);
    const txHash = await this.hashTransaction("CREATE:" + JSON.stringify(asset));
    this.logs.push(`Created asset ${id} | TxID: ${txHash}`);
    return `[OK] Asset created: ${id} | TxID: ${txHash}`;
  }

  queryAsset(id) {
    const asset = this.ledger.find((a) => a.id === id);
    if (asset) {
      this.logs.push(`Queried asset ${id}`);
      return `Asset Found: ${JSON.stringify(asset)}`;
    } else {
      this.logs.push(`Query failed for asset ${id}`);
      return `[ERR] Asset not found: ${id}`;
    }
  }

  async transferAsset(id, newOwner) {
    const asset = this.ledger.find((a) => a.id === id);
    if (asset) {
      asset.owner = newOwner;
      const txHash = await this.hashTransaction("TRANSFER:" + JSON.stringify(asset));
      this.logs.push(`Transferred asset ${id} to ${newOwner} | TxID: ${txHash}`);
      return `[OK] Transfer successful: ${id} → ${newOwner} | TxID: ${txHash}`;
    } else {
      this.logs.push(`Transfer failed for asset ${id}`);
      return `[ERR] Transfer failed. Asset not found: ${id}`;
    }
  }

  getLedger() {
    return this.ledger;
  }

  getLogs() {
    return this.logs;
  }
}
