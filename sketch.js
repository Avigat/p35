var dog, dogImg, dogImg2, database, foodS=20, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food');
  foodStock.on("value", readStock)
}

function draw() {  
  background("green");
  if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImg2);
  }

  drawSprites();

  fill("white");
  textSize(20);
  text("Food remaining: "+foodS, 170,200);
  text("Note: Press the up arrow key to feed Drago milk!", 40,40);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}