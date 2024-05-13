
import Phaser from "phaser";

const gameSpeedofX = 300;
const gameSpeedofY = 300;

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
  for(let i =0; i < 5; i++){
    this.load.image('star_' + i, 'assets/star.png');
  }
  
  this.load.image('bomb', 'assets/bomb.png');
}

function create () {
  this.add.image(0, 0, 'sky').setOrigin(0);
  startsGroup = this.physics.add.group();
  startsGroup2 = this.physics.add.group();

  for(let i = 0; i < 5; i++){
    startsGroup.create(getRandomInt(700), getRandomInt(300), `star_${i}`);
  }

  for(let i = 0; i < 5; i++){
    startsGroup2.create(getRandomInt(700), getRandomInt(300), `star_${i}`);
  }

  startsGroup2.scaleXY(0.5,0.5);

  startsGroup.setVelocityX(-60);

  startsGroup.getChildren().forEach((star)=>{
    console.log(star.x);

  });

  console.log(startsGroup);
  
  
  birdImage = this.physics.add.sprite(60, 300, 'bird')
                .setOrigin(1)
                .setInteractive();

  var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spaceBar.on('down', () =>{
    console.log('SPACE DOWN');
    birdImage.setVelocityY(-200);
    birdImage.setGravityY(200);

    startsGroup.scaleXY(0.3,0.3);
    startsGroup2.setVelocityY(150);
  });

  spaceBar.on('up', () =>{
    console.log('SPACE UP');
  });
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
  
  
}