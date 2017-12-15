function Snake() {
  var self = this;
  this.cellSize = 10;
  this.width = 15;
  this.height = 15;
  this.snake = [{x:7, y:7},{x:6,y:7},{x:5,y:7}];
  this.direction = 'right';
  this.food = [];
  this.over = false;
  // Create game canvas and context
  var canvas = document.createElement('canvas');
  canvas.width = this.width * this.cellSize;
  canvas.height = this.height * this.cellSize;
  document.body.appendChild(canvas);
  this.ctx = canvas.getContext('2d');

  this.handleKeyDown = this.handleKeyDown.bind(this);
  window.addEventListener('keydown', this.handleKeyDown);

  this.interval = setInterval(()=>this.loop(), 100);
}

Snake.prototype.handleKeyDown = function(event) {
  switch(event.key){
    case 'w':
    case 'ArrowUp':
      this.direction = 'up';
      break;
    case 'a':
    case 'ArrowLeft':
      this.direction = 'left';
      break;
    case 's':
    case 'ArrowDown':
      this.direction = 'down';
      break;
    case 'd':
    case 'ArrowRight':
      this.direction = 'right';
      break;
  }
}

Snake.prototype.gameOver = function() {
  clearInterval(this.interval);
  window.removeEventListener('keydown', this.handleKeyDown);
  window.addEventListener('keydown', ()=>{
    new Snake();
  }, {once: true})
  this.over = true;
}

Snake.prototype.render = function() {
  if(this.over) {
    this.ctx.fillStyle = 'rgba(255,0,0,0.25)';
    this.ctx.fillRect(0,0,
      this.width * this.cellSize,
      this.height * this.cellSize);
    this.ctx.fillStyle = "white";
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText("Game Over", 10, 20);
    this.ctx.fillText("Points: ", 10, 40);
    this.ctx.font = '10px sans-serif';
    this.ctx.fillText("Press any key for new game", 10, 60);
    return;
  }
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0,
      this.width * this.cellSize,
      this.height * this.cellSize);

  this.ctx.fillStyle = "ivory";
  this.snake.forEach((segment) => {
    this.ctx.fillRect(
      segment.x * this.cellSize,
      segment.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  });

  this.ctx.fillStyle = 'gold';
  this.food.forEach((food) => {
    this.ctx.fillRect(
      food.x * this.cellSize,
      food.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  });
}

Snake.prototype.update = function() {
  var x = this.snake[0].x;
  var y = this.snake[0].y;
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

  if(x < 0 || x > this.width || y < 0 || y > this.height)
    return this.gameOver();
  this.snake.pop();
  this.snake.unshift({x: x, y: y});
}

Snake.prototype.loop = function() {
  this.update();
  this.render();
}


new Snake();