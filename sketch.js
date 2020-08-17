var dog, happyDog, database, foods, foodStock, currentHour, currentMinute; 
var dogImg, happyDogImg, foodImg;
var hr, mn, sc;
var feedButton;
var addFood;
var food;
var col;
var foodArray = [];

function preload()  {  
  
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
  foodImg = loadImage('images/food.png');    
}

function setup() {
  createCanvas(800,600); 
  col = color(239, 95, 95); 

  feedButton = createButton('CLICK TO FEED THE DOG');
  feedButton.position(400, 75);
  feedButton.style('background-color', col);
  feedButton.size(110, 110);
  
  addFood = createButton('ADD FOOD');
  addFood.position(600, 75);
  addFood.style('background-color', col);
  addFood.size(110, 110);
  
  database = firebase.database(); 

  dog = createSprite(600, 315, 200, 200);
  dog.addImage(dogImg);
  dog.scale = 0.30;
     
  currentHour = hr;
  currentMinute = mn;

  database.ref('food').on('value', function(data){
    foodStock = data.val();
  })

}

function draw() {

  background("grey");
  textSize(10); 

  if(hr != undefined  && feedButton.mousePressed())  {
    push();
    fill("black");
    textSize(20);
    textStyle(BOLD);
    text("LAST FEED "+hr +":" + mn, 375, 80);
    pop();
  }

  fill("black");
  text(mouseX + "," + mouseY, 10, 10);

  if(foodStock === 0) {
    dog.addImage(dogImg);
  }

  feedButton.mousePressed(() =>{
    console.log("insideIf");
    dog.addImage(happyDogImg);      
    hr = hour();
    mn = minute();
    updateHour();
    updateMinute();    
    if(foodStock != 0)  {
    writeStock(foodStock);
    }       
  }) 

  addFood.mousePressed(() =>{
    addStocks(foodStock);
  })
 
  if(foodStock != undefined) {    
    textSize(20);
    textStyle(BOLD);
    text("FOOD REMAINING : "+foodStock,375,40);
  }
  hr = hour();
  mn = minute();
  sc = second();
  text("CURRENT TIME "+ hr + ";" + mn + ";" + sc, 500, 500);
  drawSprites();
}

function writeStock(x) {
 if(x <= 0) {
   x = 0;
 }
 else{
   x = x-1;
 }
 database.ref('/').update({
   food:x
 })
}

function addStocks(y) {
  if(30 <= y) {
    y = 30
  }
  else  {
    y += 1
  }
  database.ref('/').update({
    food:y
  })
}

function updateHour(z) {
  z = hr
  database.ref('/').update({
    hour:hr
  })
}

function updateMinute(q)  {
  q = mn
  database.ref('/').update({
    minute:q
  })
}



