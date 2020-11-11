export default class Basket{
  constructor(gameWidth,gameHeight){
    this.width=50;
    this.height=500;
    this.position={
      x: gameWidth/2 - this.width/2,
      y: gameHeight-this.height-10
    };
  }
  draw(ctx) {
  ctx.fillRect(this.position.x,this.position.y,this.width,this.height);

  }

}
