import Snake from './snake';
import Food from './food';

HTMLMediaElement.prototype.stop = function() {
  this.pause();
  this.currentTime = 0;
}

export default class Game {
  constructor() {
    this.snake = new Snake(50, 50, 16);
    this.food = [];
    this.over = false;
    this.input = {
      direction: 'right'
    }
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 100;
    this.backBufferCanvas.height = 100;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 100;
    this.screenBufferCanvas.height = 100;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    var message = document.createElement('div');
    message.id = "message";
    message.textContent = "";
    document.body.appendChild(message);
    this.gameOver = this.gameOver.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    window.onkeydown = this.handleKeyDown;
    this.interval = setInterval(this.loop, 500);
    this.music = new Audio('timless.mp3');
  }

  gameOver() {
    var message = document.getElementById("message");
    message.innerText = "Game Over";
    this.over = true;
  }

  handleKeyDown(event) {
    event.preventDefault();
    console.log(event.key);
    switch(event.key){
      case 'w':
      case 'ArrowUp':
        this.input.direction = 'up';
        break;
      case 'a':
      case 'ArrowLeft':
        this.input.direction = 'left';
        break;
      case 's':
      case 'ArrowDown':
        this.input.direction = 'down';
        break;
      case 'd':
      case 'ArrowRight':
        this.input.direction = 'right';
        break;
      case ' ':
        this.music.play();
        break;
      case 'Escape':
        this.music.stop();
        break;
    }
  }

  update() {

    if(!this.over) {
      var position = this.snake.getPosition();
      if(position.x < 0 || position.x >= 100 ||
         position.y < 0 || position.y >= 100) {
         return this.gameOver();
      }
      //if(Math.random() < 0.1)
        this.food.push(new Food(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)));
      this.food.forEach((food) => {
        food.update();
      });
      this.snake.update(this.input, this.gameOver);
    }
  }

  render() {
    this.backBufferContext.fillStyle = '#ccc';
    this.backBufferContext.fillRect(0, 0, 100, 100);
    this.food.forEach((food) => {
      food.render(this.backBufferContext);
    })
    this.snake.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
  }
  loop() {
    this.update();
    this.render();
  }
}