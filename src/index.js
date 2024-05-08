import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 900,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};

new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
}

function create() {
  this.add.image(500, 450, "sky");
}
