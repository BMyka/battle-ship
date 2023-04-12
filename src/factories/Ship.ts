class Ship {
  constructor(public readonly length: number, public hits: number[] = []) {}

  hit(position: number) {
    if (!this.isPositionValid(position)) return;
    this.hits.push(position);
  }

  isSunk() {
    return this.hits.length === this.length;
  }

  private isPositionValid(position: number) {
    return (
      position >= 0 && position < this.length && !this.hits.includes(position)
    );
  }
}

export default Ship;
