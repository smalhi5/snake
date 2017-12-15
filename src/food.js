export default class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = Math.floor(Math.random() * 20);
    this.getPosition = this.getPosition.bind(this);
    this.update = this.update.bind(this);
    this.render = this.update.bind(this);
  }
  getPosition() {
    return {x: this.x, y: this.y};
  }
  update() {
  }
  render(context) {
    context.save();
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, 1, 1);
    context.restore();
  }
}