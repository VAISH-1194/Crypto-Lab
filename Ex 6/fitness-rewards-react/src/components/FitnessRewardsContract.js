export default class FitnessRewardsContract {
  constructor() {
    this.members = new Map(); // { id: { points, reward } }
    this.logs = [];
  }

  addLog(action) {
    const timestamp = new Date().toLocaleString();
    this.logs.push(`${timestamp} - ${action}`);
  }

  evaluateReward(points) {
    if (points >= 900) return "🏆 Premium Membership";
    if (points >= 700) return "🥇 Gold Reward";
    if (points >= 500) return "🎁 Silver Reward";
    if (points >= 200) return "🎁 Bronze Reward";
    return "No Reward";
  }

  addMember(id) {
    if (this.members.has(id)) {
      return `[ERR] Member already exists: ${id}`;
    }
    this.members.set(id, { points: 0, reward: "No Reward" });
    this.addLog(`Added Member ID: ${id}`);
    return `[OK] Member added: ${id}`;
  }

  addPoints(id, points) {
    if (!this.members.has(id)) {
      return `[ERR] Member not found: ${id}`;
    }
    if (points <= 0) {
      return `[ERR] Points must be positive.`;
    }

    let member = this.members.get(id);
    member.points += points;
    member.reward = this.evaluateReward(member.points);

    this.members.set(id, member);
    this.addLog(
      `Added ${points} points to Member ID: ${id} → Total: ${member.points}, Reward: ${member.reward}`
    );

    return `[OK] Points updated for ${id}, Reward: ${member.reward}`;
  }

  checkPoints(id) {
    if (!this.members.has(id)) {
      return `[ERR] Member not found: ${id}`;
    }
    const member = this.members.get(id);
    this.addLog(`Checked points for Member ID: ${id}`);
    return `Member ${id} has ${member.points} points. Reward: ${member.reward}`;
  }

  getAllMembers() {
    this.addLog("Displayed all members");
    return Array.from(this.members.entries()).map(([id, data]) => ({
      id,
      points: data.points,
      reward: data.reward,
    }));
  }

  getLogs() {
    return this.logs;
  }
}
