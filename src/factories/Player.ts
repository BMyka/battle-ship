import Gameboard from "./Gameboard";

class Player {
  alreadyHitCoords: number[][] = [];

  constructor(public name: string) {}

  attack(x: number, y: number, gameboard: Gameboard) {
    if (this.hasAlreadyHit(x, y)) return;
    this.alreadyHitCoords.push([x, y]);
    gameboard.receiveAttack(x, y);
  }

  randomAttack(gameboard: Gameboard) {
    if (this.alreadyHitCoords.length === 100) return;
    let [x, y] = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    while (this.hasAlreadyHit(x, y))
      [x, y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    this.alreadyHitCoords.push([x, y]);
    gameboard.receiveAttack(x, y);
  }

  hasAlreadyHit(x: number, y: number) {
    return this.alreadyHitCoords.some(([a, b]) => a === x && b === y);
  }
}

export default Player;
