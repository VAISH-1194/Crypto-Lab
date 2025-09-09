export default class RewardsSystem {
  constructor() {
    this.members = new Map();
    this.logs = [];
  }

  addLog(action) {
    const timestamp = new Date().toLocaleString();
    this.logs.push(`${timestamp} - ${action}`);
  }

  addMember(id) {
    if (!this.members.has(id)) {
      this.members.set(id, 0);
      this.addLog(`Added Member ID: ${id}`);
      return `[OK] Member added: ${id}`;
    } else {
      return `[ERR] Member already exists: ${id}`;
    }
  }

  addPoints(id, points) {
    if (this.members.has(id)) {
      this.members.set(id, this.members.get(id) + points);
      this.addLog(`Added ${points} points to Member ID: ${id}`);
      return `[OK] Points updated for ${id}`;
    } else {
      return `[ERR] Member not found: ${id}`;
    }
  }

  checkPoints(id) {
    if (this.members.has(id)) {
      this.addLog(`Checked points for Member ID: ${id}`);
      return `Member ${id} has ${this.members.get(id)} points.`;
    } else {
      return `[ERR] Member not found: ${id}`;
    }
  }

  getAllMembers() {
    this.addLog("Displayed all members");
    return Array.from(this.members.entries()).map(([id, pts]) => ({
      id,
      points: pts,
    }));
  }

  getLogs() {
    return this.logs;
  }
}
