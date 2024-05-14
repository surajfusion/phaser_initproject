
import Phaser from "phaser";

const gameSpeedofX = 300;
const gameSpeedofY = 300;
const MAX_STAR_POS = 1500;
const MAX_START_HEIGHT = 300;
const FIXED_GAP = 200;
let LAST_POS = 0;
let NUMBER_OF_STAR = 20;

//game variable;
let birdImage;
let startsGroup;
let startsGroup2;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload: preload,
    create: create,
    update:update
  }
};

new Phaser.Game(config);

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  for(let i =0; i < NUMBER_OF_STAR; i++){
    this.load.image('star_' + i, 'assets/star.png');
  }
  
  this.load.image('bomb', 'assets/bomb.png');
}

function create () {
  this.add.image(0, 0, 'sky').setOrigin(0);

  createStars(this);
  console.log(startsGroup);
  
  birdImage = this.physics.add.sprite(60, 300, 'bird')
                .setOrigin(1)
                .setInteractive();

  handleUserInput(this);
}

function createStars(context){
  startsGroup = context.physics.add.group();
  for(let i = 0; i < NUMBER_OF_STAR; i++){
    startsGroup.create(getRandomInt(MAX_STAR_POS) + LAST_POS + FIXED_GAP, getRandomInt(config.height), `star_${i}`)
    .setVelocityX(-getRandomInt(90));
  }
  //startsGroup.setVelocityX(-90);
}

function getLastStarPosition(){
  let lastStartPos = 0;
  startsGroup.getChildren().forEach((star)=>{
    lastStartPos = Math.max(star.body.x, lastStartPos);
  });
  return lastStartPos;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function update() {
  //console.log('UPDATE')
  //console.log(birdImage.body.position.x, birdImage.body.position.y)
  if(birdImage.body.position.y > 600){
    //birdImage.body.position.y = 300;
    birdImage.setVelocityY(-100)
  }

  if(getLastStarPosition() < config.width){
    LAST_POS = getLastStarPosition();
    createStars(this);
  }
  //console.log(getLastStarPosition());
}


function handleUserInput(context){
  var upArrow = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  upArrow.on('down', () => {
    console.log('SPACE DOWN');
    birdImage.setVelocityY(-200);
    birdImage.setVelocityX(0);
  });

  var downArrow = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  downArrow.on('down', () => {
    console.log('SPACE DOWN');
    birdImage.setVelocityY(200);
    birdImage.setVelocityX(0);
  });
}