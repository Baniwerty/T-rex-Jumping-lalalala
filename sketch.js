var trex, trexAnimate, edges, ground, groundImage, trexEyeImg, gameOver, GameOverImg, Restart, RestartImg, ground2, clouds, cloudsImage, O1, O2, O3, O4, O5, O6, Obstacles, checkPointSound, dieSound, jumpSound;
var gameState = "play";
var cloudsGroup, obstaclesGroup;
var score = 0;


function preload() {
  trexAnimate = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudsImage = loadImage("cloud.png");
  O1 = loadImage("obstacle1.png");
  O2 = loadImage("obstacle2.png");
  O3 = loadImage("obstacle3.png");
  O4 = loadImage("obstacle4.png");
  O5 = loadImage("obstacle5.png");
  O6 = loadImage("obstacle6.png");
  trexEyeImg = loadImage("trex_collided.png");
  GameOverImg = loadImage("gameOver.png");
  RestartImg = loadImage("restart.png");
  checkPointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
}
// setting up the characters and their functions
function setup() {
  createCanvas(600, 200);
  /* var t=30;
   var f=20;
   var sum=t+f;
   console.log("The Answer is "+ sum);*/

  trex = createSprite(50, 180, 25, 25);
  ground = createSprite(200, 185, 600, 10);
  ground2 = createSprite(200, 197, 600, 10);
  Restart = createSprite(300, 140);
  gameOver = createSprite(300, 100);

  ground2.visible = false;
  trex.addAnimation("Trex", trexAnimate);
  ground.addImage("ground2", groundImage);
  gameOver.addImage("go", GameOverImg);
  Restart.addImage("ga", RestartImg)
  Restart.scale = 0.5;
  gameOver.scale = 0.5;
  trex.addImage("EYE", trexEyeImg)
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();

  trex.scale = 0.5;
  edges = createEdgeSprites();

}
// drawing sprites and giving them movement
function draw() {
  background("white");
  drawSprites();
  text("Score:" + score, 500, 50);
  //trex.setCollider("circle", 0, 0, 40);
  trex.debug = false;
  if (gameState == "play") {
    if (keyDown("space") && trex.collide(ground2)) {
      trex.velocityY = -20;
      jumpSound.play();
    }
    trex.changeAnimation("Trex", trexAnimate);
    trex.setCollider("circle", 0, 0, 40);
    if (score % 100 == 0 && score > 0) {
      checkPointSound.play();
    }


    Restart.visible = false;
    gameOver.visible = false;
    //giving velocity to ground and t-rex and even adding gravity
    trex.velocityY = trex.velocityY + 2;
    trex.collide(ground2);
    ground.velocityX = -(10 + 3 * score / 100);
    //making the ground repeat sensibly,fast and blablabla
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (trex.isTouching(obstaclesGroup)) {
      gameState = "end";
      dieSound.play();
    }
    score = score + Math.round(getFrameRate() / 60);
    cloud();
    obstacles();
  } else if (gameState == "end") {
    ground.velocityX = 0;
    trex.velocityY = 0;
    if (mousePressedOver(Restart)) {
      restart();
    }
    Restart.visible = true;
    gameOver.visible = true;

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.changeImage("EYE", trexEyeImg);

  }

  //making the t-rex jump when space is clicked 




}

function cloud() {


  if (frameCount % 60 == 0) {
    clouds = createSprite(600, 40, 10, 10);
    clouds.y = Math.round(random(40, 100));
    clouds.addImage("ImageOfClouds", cloudsImage)
    clouds.scale = 0.5;
    clouds.velocityX = -2;
    clouds.depth = trex.depth;
    trex.depth++;

    clouds.lifetime = 300;
    cloudsGroup.add(clouds);
  }


}

function obstacles() {
  if (frameCount % 60 == 0) {
    Obstacles = createSprite(600, 165, 10, 10);
    Obstacles.scale = 0.5;
    Obstacles.lifetime = 60;
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        Obstacles.addImage(O1);
        break;
      case 2:
        Obstacles.addImage(O2);
        break;
      case 3:
        Obstacles.addImage(O3);
        break;
      case 4:
        Obstacles.addImage(O4);
        break;
      case 5:
        Obstacles.addImage(O5);
        break;
      case 6:
        Obstacles.addImage(O6);
        break;
      default:
        break;
    }
    Obstacles.velocityX = -(10 + 3 * score / 100);
    obstaclesGroup.add(Obstacles);
    Obstacles.depth = trex.depth;
    trex.depth++;
  }

}

function restart() {
  gameState = "play";
  score = 0;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  Restart.visible = false;
  gameOver.visible = false;

}