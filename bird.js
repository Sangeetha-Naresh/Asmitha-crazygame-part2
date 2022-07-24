class Bird 
{
  constructor(x, y, width, height) 
  {
    this.body = Bodies.rectangle(x, y, width, height,{frictionAir:0.9});
    this.width = width;
    this.height = height;
 
    World.add(world, this.body);
  }
  animate() 
  {
    this.body.position.x += 0.05;

  

  }

  remove() 
  {
    //setTimeout(() => {
     // World.remove(world, this.body);
   // }, 1000);
   
   
   Matter.Body.setVelocity(bird.body,{x:0,y:10});
    //this.body=null;
   
  }

  display() 
  {
    if(this.body)
    {
      var angle = this.body.angle;
      var pos = this.body.position;

     // console.log(this.body.position.x);

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      this.animate();
      imageMode(CENTER);
      image(birdImg, pos.x-100, 0, this.width, this.height);
      noTint();
      pop();
    }
  }
}


