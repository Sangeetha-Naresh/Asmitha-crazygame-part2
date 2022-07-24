const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body=Matter.Body;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var engine, world, backgroundImg, birdImg;
var canvas, angle, blast, bird;
var soccer = [];
var soccerBall;
var isGameOver = false;

function preload() 
{
  backgroundImg = loadImage("field.webp");
  birdImg = loadImage("bird.png");
}

function setup() 
{
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 1;

  

  blast = new Blast(80, 550, 300, 100, angle);

  bird = new Bird(20, 80, 100, 100,);

 
  
	var render = Render.create({
	  element: document.body,
	  engine: engine,
	  options: {
	    width: 1200,
	    height: 700,
	    wireframes: false
	  }
	});

  Render.run(render);


}

function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  if(bird.body!=null)
  {
    Matter.Body.setVelocity(bird.body,{x:10,y:0});
  }
 

  for (var i = 0; i < soccer.length; i++) 
  {
    showSoccerBalls(soccer[i], i);
    collisionWithBird(i); 
  }
   
 
  blast.display();     
  bird.display();               
                                      
}

function collisionWithBird(index) 
{
  //console.log("bird.body= "+bird.body);

  if (bird.body)
  {
    console.log("hi1");

    var collision = Matter.SAT.collides(bird.body, soccer[index].body);
    //console.log(collision.collided)
      if (collision.collided) 
      {
        bird.remove();
      }
       
        
 }
}
  

function keyPressed() 
{
  if (keyCode === DOWN_ARROW) 
  {
    soccerBall = new Soccerball(blast.x, blast.y);
    soccerBall.trajectory = [];
    Matter.Body.setAngle(soccerBall.body, blast.angle);
    soccer.push(soccerBall);
   
  }
}

function showSoccerBalls(ball, index) 
{
  if (ball) 
  {
    ball.display();
    ball.animate();
    /*if (ball.body.position.x >= width + 100 || ball.body.position.y >= height - 50) 
    {
          ball.remove(index);
    }*/
  }
}

function keyReleased()
{
  //console.log(soccer);
  if (keyCode === DOWN_ARROW && !isGameOver) 
  {
    soccer[soccer.length - 1].shoot();
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


