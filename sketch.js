//Create variables here
var dogImg
var dog
var happyDog
var database
var foodS
var foodStock

function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}


function setup() {
	createCanvas(500, 500);
  
  database=firebase.database();
  foodStock=database.ref("Food")
    foodStock.on("value",readStock)
    foodStock.set(20);

  dog=createSprite(250,250,10,10)
  dog.addImage(dogImg);
  dog.scale=0.3;

  
}


function draw() {  

  background(46,139,87)
  if(foodS!=undefined){

    textSize(20)
    fill (255)
    text ("Note: Press UP ARROW to feed DRAGO milk",50,50)
    text ("Food Remaining : "+ foodS,200,100)


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }


  if(keyWentUp(UP_ARROW)){

    dog.addImage(dogImg);
  }


  if(foodS===0){
    foodS=20;
  }

  

  drawSprites();
  }
}

function readStock(data){

  foodS=data.val();
}


function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}
