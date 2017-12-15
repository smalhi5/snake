export default class Snake {
  constructor(x, y, segments) {
    this.body = [];
    for(var i = 0; i < segments; i++) {
      this.body.push({
        x: x - i,
        y: y
      });
    }
    this.direction = 'right';
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.swallow = new Audio("swallow.wav");
  }
  getPosition() {
    return {x: this.body[0].x, y: this.body[0].y};
  }
  update(input, gameOver) {


    var x = this.body[0].x;
    var y = this.body[0].y;
    if(!(this.direction === 'right' && input.direction === 'left'
      || this.direction === 'left' && input.direction === 'right'
      || this.direction === 'up' && input.direction === 'down'
      || this.direction === 'down' && input.direction === 'up'
    ))
    this.direction = input.direction;
    switch(this.direction) {
      case 'right':
        x++;
        break;
      case 'left':
        x--;
        break;
      case 'up':
        y--;
        break;
      case 'down':
        y++;
        break;
    }

    this.body.pop();
    this.body.unshift({x: x, y: y});
    for(var i = 1; i < this.body.length; i++) {
      if(x === this.body[i].x && y === this.body[i].y) {
        gameOver();
        this.swallow.play();
      }
    }
  }

  render(ctx) {
    this.body.forEach(function(segment) {
      ctx.save();
      ctx.fillStyle = 'green';
      ctx.fillRect(segment.x,segment.y,1,1);
      ctx.restore();
    })
  }
}