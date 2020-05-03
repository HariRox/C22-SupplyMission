var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var a, b, c, gameState;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
function preload(){
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	gameState = 0;

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	a = random(100,700);
	target = createSprite(400,650, 60, 10);
	target.x = a;
	target.shapeColor = "red";

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:1.5, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}
function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x = packageBody.position.x = helicopterSprite.x;
  packageSprite.y= packageBody.position.y;
  if(gameState === 1){
	  if(helicopterSprite.x <= (a+30) && helicopterSprite.x >= (a-30)){
		console.log("MISSION ACCOMPLISHED!!!  :)");
	  }
	  else{
		console.log("MISSION FAILED!!!  :(");
	  }
  }
  drawSprites();
}

function keyPressed() {
	if(gameState === 0){
		if (keyCode === LEFT_ARROW){
			helicopterSprite.x = helicopterSprite.x - 20;
		}
		if (keyCode === RIGHT_ARROW){
			helicopterSprite.x = helicopterSprite.x + 20;
		}
	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(packageBody,false);
		packageBody.restitution = 0.8;
		gameState = 1;		
	}
    }
}