
import Phaser from "phaser";

const gameSpeedofX = 300;
const gameSpeedofY = 300;
const MAX_STAR_POS = 1500;
const MAX_START_HEIGHT = 300;
let FIXED_GAP = 80;
let LAST_POS = 0;
let NUMBER_OF_STAR = 8;

//game variable;
let birdImage;
let startsGroup;
let startsGroup2;
let blast;
let blast2;
let cont;
let score =0;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      //debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('bomb', 'assets/bomb.png');


  this.load.spritesheet('flyingbird', 'assets/birdSprite.png', {
    frameWidth: 16, frameHeight: 16
  });

  this.load.spritesheet('blastSS', 'assets//wee.png', {
    frameWidth: 60, frameHeight: 70
  });


  for (let i = 0; i < NUMBER_OF_STAR; i++) {
    this.load.image('star_' + i, 'assets/star.png');
  }

  this.load.image('bomb', 'assets/bomb.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  createStars(this);
  console.log(startsGroup);
  this.scoreText = this.add.text(10, 10, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
  this.add.text(10, 45, 'Best Score: ', { fontSize: '20px', fill: '#000' });

  // birdImage = this.physics.add.sprite(90, 300, 'bird')
  //               .setOrigin(0)
  //               .setInteractive();




  handleUserInput(this);




  //this.physics.add.collider(birdImage, startsGroup, collideCallback);



  //4. Add Collider between bomb and Star.
  //After collision, destroy Star.
}

function createStars(context) {
  startsGroup = context.physics.add.group();
  /*
  for(let i = 0; i < NUMBER_OF_STAR; i++){
    startsGroup.create(getRandomInt(MAX_STAR_POS) + LAST_POS + FIXED_GAP, getRandomInt(config.height), `star_${i}`)
    .setVelocityX(-getRandomInt(90));
  }*/

  for (let i = 0; i < NUMBER_OF_STAR; i++) {
    startsGroup.create(750, i * FIXED_GAP, `star_${i}`).setOrigin(0);
  }

  //startsGroup.setVelocityX(-90);
}


function getLastStarPosition() {
  let lastStartPos = 0;
  startsGroup.getChildren().forEach((star) => {
    lastStartPos = Math.max(star.body.x, lastStartPos);
  });
  return lastStartPos;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function update() {

  //runanimation(this)
  //console.log('UPDATE')
  //console.log(birdImage.body.position.x, birdImage.body.position.y)
  if (birdImage.body.position.y > 600) {
    //birdImage.body.position.y = 300;
    birdImage.setVelocityY(-100)
  }

  if (getLastStarPosition() < config.width) {
    LAST_POS = getLastStarPosition();
    // createStars(this);
  }

  //console.log(getLastStarPosition());
}

// function collideCallback(box, star){
//   console.log('collideCallback', box, star);

//   star.setVelocityX(60);
//   star.setVelocityY(0);
// }

// function processCallback(){
//   console.log('processCallback');
// }

// function callbackContext(){
//   console.log('callbackContext');
// }

function handleUserInput(context) {
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
    // console.log('collideCallback', box.body.position.y);
  });






  var space = context.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  space.on('down', () => {

    console.log('collideCallback', birdImage.body.position.y);

    var bomb = context.physics.add.sprite(birdImage.body.position.x, birdImage.body.position.y, 'bomb')
      .setOrigin(0)
      .setInteractive();

    bomb.setVelocityY(0);
    bomb.setVelocityX(200);


    context.physics.add.collider(bomb, startsGroup, fire, null, context);
    //1. get Cordinate of Box.
    //2. Create bomb with same coordinate.
    //3. Set VelocityX.
  });

  birdImage = context.physics.add.sprite(90, 300, 'flyingbird')
    .setOrigin(0)
    .setScale(3)
    .setFlipX(true)
    .setInteractive();

  context.anims.create({
    key: 'birdfly',
    frames: context.anims.generateFrameNumbers('flyingbird', { start: 9, end: 15 }),
    frameRate: 8,
    // repeat infinitely
    repeat: -1
  });

  birdImage.play('birdfly');


  // blast = context.physics.add.sprite(750, 500, 'blastSS')
  // .setOrigin(0)
  // .setScale(0.5)
  // .setInteractive();

  // context.anims.create({
  //   key: 'blastSp',
  //   frames: context.anims.generateFrameNumbers('blastSS', { start: 27, end: 28}),
  //   frameRate: 8,
  //   // repeat infinitely
  //   repeat: -1
  // } );  

  //   blast.play('blastSp');




  function fire(bomb, star) {

    this.scoreText.setText('Score: ' + score);
    score++;
    if (blast2) {
      blast2.destroy();
    }
    blast2 = this.physics.add.sprite(star.body.position.x, star.body.position.y, 'blastSS')
      .setOrigin(0)
      .setScale(0.5)
      .setInteractive();
    star.destroy();
    bomb.destroy();

    this.anims.create({
      key: 'blastSp',
      frames: this.anims.generateFrameNumbers('blastSS', { start: 25, end: 30 }),
      frameRate: 8,
      // repeat infinitely
      repeat: -1
    });

    blast2.play('blastSp');
    star.destroy();


    this.time.delayedCall(2000, function () {
      blast2.destroy();
    }, [], this);





    //blast.play('blastSp');


    //blast.play('blastSp');


  }





  /*
  Assignments:

  */
}


function runanimation(context) {



  //birdImage.play('birdfly');

}