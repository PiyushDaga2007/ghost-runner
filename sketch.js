var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var invBlock,invBlockGroup;
var ghost,ghostImage;
var gameState=1;

function preload(){
  towerImage=loadImage("tower.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  ghostImage=loadImage("ghost-standing.png");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("running",towerImage);
  tower.velocityY=3;

  ghost=createSprite(200,200,50,50);
  ghost.addImage("running",ghostImage);
  ghost.scale=0.35;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invBlockGroup = new Group();
}
function draw(){

background(0);
  if(gameState===1){
  if(tower.y>400){
    tower.y=300;
  }
if(keyDown("left_arrow")){
  ghost.x-=3;
}
if(keyDown("right_arrow")){
  ghost.x+=3;
}
  if(keyDown("space")){
  ghost.velocityY=-6;
}
ghost.velocityY+=0.4;
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invBlockGroup.isTouching(ghost)||ghost.y>600){
    gameState=0;
    ghost.destroy();
  }


  
spawnDoors();
    drawSprites();

  }
  if(gameState===0){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameOver",200,200);
    
  }
  }
function spawnDoors(){
  //rand=getFramerate();
  
  if(frameCount%240==0){  
    door=createSprite(200,-50);
    door.addImage("running",doorImage);
    doorGroup.add(door);
    climber=createSprite(200,10);
    climber.addImage("running",climberImage);
    climberGroup.add(climber);
    door.x=Math.round(random(120,240));
    climber.x=door.x;
    
    climber.velocityY=door.velocityY=3;
    invBlock=createSprite(200,15,climber.width,2);
    invBlock.x=door.x;
    invBlock.velocityY=door.velocityY;
    invBlockGroup.add(invBlock);
    invBlock.lifetime=climber.lifetime=door.lifetime=800;
    ghost.depth=door.depth+1;
    
      }
}