
import Phaser from "phaser";

const gameSpeedofX = 300;
const gameSpeedofY = 300;

//game variable;
let birdImage;

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
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
}

function create () {
  this.add.image(0, 0, 'sky').setOrigin(0);
  this.add.image(700, 0, 'star');
  //this.add.image(60, 300, 'bird');
  //const logo = this.physics.add.image(400, 100, 'bomb');

  birdImage = this.physics.add.image(60, 300, 'bird').setOrigin(1);
  birdImage.setVelocityY(100).setVelocityX(100);
}


function update() {
  //console.log('UPDATE')
  console.log(birdImage.body.position.x, birdImage.body.position.y)
  if(birdImage.body.position.y > 600){
    //birdImage.body.position.y = 300;
    birdImage.setVelocityY(-100)
  }
}