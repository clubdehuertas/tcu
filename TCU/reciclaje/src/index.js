//basket---------------------------
class Basket {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 70;
    this.height = 70;

    this.maxSpeed = 8;
    this.speed = 0;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 10
    };
  }
  draw(ctx) {

    //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(imgBin, this.position.x, this.position.y, this.width, this.height);
  }
  update(deltaTime) {
    this.position.x += this.speed;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > gameWidth) {
      this.position.x = 800 - this.width;
    }
  }
  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }

}
////---------------------------------------
//input
class InputHandler {
  constructor(basket) {
    $(document).keydown(function(e) {
      switch (e.keyCode) {
        case 37:
          basket.moveLeft();
          break;
        case 39:
          basket.moveRight();
      }
    });
    $(document).keyup(function(e) {
      switch (e.keyCode) {
        case 37:
          if (basket.speed < 0) {
            basket.stop();
          }
          break;
        case 39:
          if (basket.speed > 0) {
            basket.stop();
          }
          break;
      }
    });
  }
}

/////////--------
//Reciclaje
class Reciclable {
  constructor(game) {
    var numero=Math.floor(Math.random() * 12);
    var elemento = lista[numero];
    this.image = document.getElementById(elemento);
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.scored = 0;
    this.clase=cal[numero];

    this.game = game;

    this.speed = 4;
    this.size = 30;
    var rand = (this.gameWidth - this.size) * Math.random();
    this.position = {
      x: rand,
      y: 10
    }


  }
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }
  update(deltaTime) {
    this.position.y += this.speed;

    let bottomOfBall = this.position.y + this.size;
    let topOfBasket = this.game.basket.position.y;
    let leftOfBasket = this.game.basket.position.x;
    let rigtOfBasket = this.game.basket.position.x + this.game.basket.width;
    let half=this.gameHeight/5*3;

    if (bottomOfBall === topOfBasket && this.position.x >= leftOfBasket && this.position.x <= rigtOfBasket && this.scored === 0 && game.running===1 && this.clase==="rec") {
      game.points +=1;
      this.scored = 1;
      $("#points").html("Puntos: " + game.points);
      this.position.y = 800
      zap.play();
    }
    if (bottomOfBall === topOfBasket && this.position.x >= leftOfBasket && this.position.x <= rigtOfBasket && this.scored === 0 && game.running===1 && this.clase==="tra") {
      game.gameLives -=1;
      this.scored = 1;
      $("#lives").html("Vidas: " + game.gameLives);
      this.position.y = 800
      ding.play();
      if(game.gameLives===0){
        $("#ptsFinal").html("Puntuacion final: "+game.points);
        $("#resultado").removeClass("hidden");
        $("#juego").addClass("hidden");
        $("#score").addClass("hidden");
        game.running=0;
        return;
      }
    }

    if (bottomOfBall > topOfBasket && this.scored === 0 && game.running===1 && this.clase==="rec") {
      game.gameLives -= 1;
      this.scored = 1;
      $("#lives").html("Vidas: " + game.gameLives);
      ding.play();
      if(game.gameLives===0){
        $("#ptsFinal").html("Puntuacion final: "+game.points);
        $("#resultado").removeClass("hidden");
        $("#juego").addClass("hidden");
        $("#score").addClass("hidden");
        game.running=0;
        return;
      }
    }
    if (bottomOfBall===half){
      game.addObject();
    }
  }

}

////----------
/////game
class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameLives = 5;
    this.points = 0;
    this.running = 1;
    this.count = 0;
  }

  start() {
    this.basket = new Basket(this);

    this.gameObjects = [this.basket];
    new InputHandler(this.basket);
    this.addObject();

  //   var objetos=setInterval(this.addObject(),200);
  }

  addObject() {
    if (this.running===1){
    this.count += 1;
    var nombre = "objeto" + this.count;
    this.nombre = new Reciclable(this);
    this.gameObjects.push(this.nombre);
  }
  }

  update(deltaTime) {

    this.gameObjects.forEach((object) => object.update(deltaTime));

  }
  draw(ctx) {

    this.gameObjects.forEach(object => object.draw(ctx));
  }
}
////////

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function newObject(game) {
  this.reciclable2 = new Reciclable(this);
  this.gameObjects.push(this.reciclable2);

}

////---------------------------------------
var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
var started = 0;
var zap = new Audio("sounds/zap.mp3");
var ding = new Audio("sounds/ding.mp3");
var lista = ["bateria", "botella", "bulb", "caja", "espejo", "estereofon", "lata", "napkin", "periodico", "vidrio","periodico", "vidrio","botella","caja"];
var cal=['tra','rec','tra','rec','tra','tra','rec','tra','rec','rec','rec','rec','rec','rec']

const gameWidth = 800;
const gameHeight = 600;

var game = new Game(gameWidth, gameHeight);
let imgBin = document.getElementById("bin");
let lastTime = 0;

//game.start();
$(".btn").click(function() {
  location.reload();
  game.start();
})


function gameLoop(timestamp) {

  let deltaTime = timestamp - lastTime;

  ctx.clearRect(0, 0, gameWidth, gameHeight);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}
$(document).keypress(function() {
  if (started === 0) {
    started = 1;
    $("#score").removeClass("hidden");
    $("#instrucciones").addClass("hidden");
    game.start();
    requestAnimationFrame(gameLoop);
    $("#lives").html("Vidas: " + game.gameLives);
    $("#points").html("Puntos: " + game.points);
  }
})
