export default class FabricNetwork {
  constructor() {
    this.traders = {};
    this.cards = {};
    this.logs = [];
  }

  log(action) {
    const ts = new Date().toLocaleString();
    this.logs.push(`${ts} | ${action}`);
  }

  createChannel(name) {
    this.log(`Channel created: ${name}`);
  }

  deployChaincode(name) {
    this.log(`Chaincode deployed: ${name}`);
  }

  registerTrader(id, name) {
    if (this.traders[id]) {
      this.log(`WARN: Trader id already exists: ${id}`);
      return `[WARN] Trader id already exists: ${id}`;
    }
    this.traders[id] = { id, name };
    this.log(`Trader registered: ${id} | ${name}`);
    return `[OK] Trader registered: ${id} | ${name}`;
  }

  createCard(cardId, type, ownerId, forTrade) {
    if (this.cards[cardId]) {
      return `[ERR] CardId already exists: ${cardId}`;
    }
    if (!this.traders[ownerId]) {
      return `[ERR] Owner does not exist: ${ownerId}`;
    }
    const card = { cardId, type, ownerId, forTrade };
    this.cards[cardId] = card;
    this.log(`Card created: ${cardId} | ${type} | owner=${ownerId} | forTrade=${forTrade}`);
    return `[OK] Card created: ${cardId}`;
  }

  listTraders() {
    return Object.values(this.traders);
  }

  listCards() {
    return Object.values(this.cards);
  }

  setForTrade(cardId, forTrade) {
    const card = this.cards[cardId];
    if (!card) return `[ERR] Card not found: ${cardId}`;
    card.forTrade = forTrade;
    this.log(`Set forTrade=${forTrade} on card: ${cardId}`);
    return `[OK] Updated card: ${cardId}`;
  }

  submitTrade(cardId, newOwnerId) {
    const card = this.cards[cardId];
    if (!card) return `[ERR] Card not found: ${cardId}`;
    if (!this.traders[newOwnerId]) return `[ERR] New owner not found: ${newOwnerId}`;
    if (!card.forTrade) {
      this.log(`Trade FAILED (not forTrade) for card: ${cardId}`);
      return `[ERR] Card not available for trade: ${cardId}`;
    }
    const oldOwner = card.ownerId;
    card.ownerId = newOwnerId;
    card.forTrade = false;
    this.log(`Trade executed: ${cardId} from ${oldOwner} to ${newOwnerId}`);
    return `[OK] Trade executed: ${cardId} from ${oldOwner} to ${newOwnerId}`;
  }

  getLogs() {
    return this.logs;
  }
}
