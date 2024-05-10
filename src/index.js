
import Phaser from "phaser";

const gameSpeedofX = 300;
const gameSpeedofY = 300;

//game variable;
let birdImage;
let startsGroup;

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

  for(let i = 0; i < 5; i++){
    startsGroup = this.physics.add.image(getRandomInt(750), getRandomInt(300), `star_${i}`)
      .setOrigin(0).setVelocityX(-30);
  }
  
  
  //this.add.image(60, 300, 'bird');
  //const logo = this.physics.add.image(400, 100, 'bomb');

  //birdImage = this.physics.add.image(60, 300, 'bird').setOrigin(1);
  birdImage = this.physics.add.sprite(60, 300, 'bird')
                .setOrigin(1)
                .setInteractive();
  //birdImage.setVelocityY(100).setVelocityX(100);

  var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spaceBar.on('down', () =>{
    console.log('SPACE DOWN');
    birdImage.setVelocityY(-200);
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

  console.log(startsGroup.body.position.x);
  console.log(startsGroup.body.position.x);
  //debugger;
  
  
}