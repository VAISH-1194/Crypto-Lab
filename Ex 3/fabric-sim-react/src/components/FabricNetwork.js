export default class FabricNetwork {
  constructor() {
    this.channelName = "";
    this.chaincodeName = "";
    this.user = "";
    this.ledger = {};
    this.logs = [];
  }

  log(action) {
    const timestamp = new Date().toLocaleString();
    this.logs.push(`${timestamp} | ${action}`);
  }

  createChannel(name) {
    this.channelName = name;
    this.log(`Channel created: ${name}`);
  }

  deployChaincode(name) {
    this.chaincodeName = name;
    this.log(`Chaincode deployed: ${name} on channel ${this.channelName}`);
  }

  registerUser(userName) {
    this.user = userName;
    this.log(`User registered & enrolled: ${userName}`);
  }

  invoke(key, value) {
    this.ledger[key] = value;
    this.log(`Invoke: [${key} -> ${value}]`);
  }

  query(key) {
    if (this.ledger[key]) {
      this.log(`Query SUCCESS: [${key} -> ${this.ledger[key]}]`);
      return `[OK] ${key} -> ${this.ledger[key]}`;
    } else {
      this.log(`Query FAILED: No record for ${key}`);
      return `[ERR] No record for ${key}`;
    }
  }

  getLedger() {
    return this.ledger;
  }

  getLogs() {
    return this.logs;
  }
}
