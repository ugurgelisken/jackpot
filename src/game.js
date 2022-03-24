var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scale: {
    mode: Phaser.Scale.NONE,
    _parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update,
    end: end,
  },
});

function init() {}
function end() {}
function update() {
  var speed = 60;
  if (isStart === true) {
    spin.alpha = 0.5;
    spin.disableInteractive();

    timeCounter += speed;
    if (timeCounter <= endTime1) {
      barContainer1.y += speed;
    }
    if (timeCounter <= endTime2) {
      barContainer2.y += speed;
    }
    if (timeCounter <= endTime3) {
      barContainer3.y += speed;
    }

    if (timeCounter >= maxCounter) {
      timeCounter = 0;
      isStart = false;
      spin.alpha = 1;
      spin.setInteractive({ cursor: "pointer" });
      var final1 = bar1[lucklyIndexs[0]];
      var final2 = bar2[lucklyIndexs[1]];
      var final3 = bar3[lucklyIndexs[2]];
      console.log(final1, final2, final3);
      console.log("SPIN END!");

      if (final1 == final2 && final2 == final3 && final1 == final3) {
        win.visible = true;
        this.scene.scene.tweens.add({
          targets: win,
          alpha: { from: 1, to: 0.5 },
          ease: "Sine.InOut",
          duration: 80,
          repeat: 3,
          yoyo: true,
        });
      } else {
        win.visible = false;
      }
    }
  }
}

// State and Variables
var arrow;
var win;
var background;
var spin;
var cheatMenu;
const oneRadianToDeggree = 0.0174533;
const fruitsEnum = {
  0: "blackberry",
  1: "banana",
  2: "cherry",
};
const fruitsEnumLength = 3;
const barLength = 6;
const maxRoll = 30;
var bar1 = [];
var bar2 = [];
var bar3 = [];
var barOrj1 = [];
var barOrj2 = [];
var barOrj3 = [];
var isCheatMenuOpen = true;
var isWin = null;
var isStart = false;
var isCame1 = false;
var isCame2 = false;
var isCame2 = false;

var endTime1;
var endTime2;
var endTime3;
var endTime;
var timeCounter = 0;
var maxCounter = 0;

var barContainers;
var barContainer1;
var barContainer2;
var barContainer3;

var lucklyIndexs = [null, null, null];

const cheatCode1TextStyle = {
  fontSize: "28px",
  fontFamily: "Arial",
  fontStyle: "italic",
  color: "#ffffff",
  align: "left",
};

function preload() {
  document.title = "Jackpot";
  this.load.setBaseURL("./");
  this.load.image("arrow", "assets/Arrow.png");
  this.load.image("background", "assets/Background.png");
  this.load.image("banana", "assets/Banana.png");
  this.load.image("blackberry", "assets/Blackberry.png");
  this.load.image("cheatToolBackground", "assets/CheatToolBackground.png");
  this.load.image("cheatToolInput", "assets/CheatToolInput.png");
  this.load.image("cherry", "assets/Cherry.png");
  this.load.image("spin", "assets/Spin.png");
  this.load.image("win", "assets/Win.png");
}

function create() {
  // Assets
  arrow = this.add
    .image(185, 250, "arrow")
    .setInteractive({ cursor: "pointer" });
  background = this.add.image(1920 / 2, 1080 / 2, "background");
  spin = this.add
    .image(1920 / 2, 1080 - 150, "spin")
    .setInteractive({ cursor: "pointer" });
  win = this.add.image(1920 / 2, 200, "win");

  // Cheat Menu
  var cheatToolBackground = this.add.image(240, 150, "cheatToolBackground");
  var cheatToolInput1 = this.add.image(100, 140, "cheatToolInput");
  var cheatToolInput2 = this.add.image(242, 140, "cheatToolInput");
  var cheatToolInput3 = this.add.image(380, 140, "cheatToolInput");

  cheatMenu = this.add.container(0, -230);

  var cheatTitleText = this.add.text(54, 74, "SYMBOL POSITION IN THE RELL", {
    fontSize: "24px",
    fontFamily: "Arial",
    color: "#e0c07d",
    align: "center",
  });
  var toolsText = this.add.text(65, 235, "Tools", {
    fontSize: "23px",
    fontFamily: "Arial",
    color: "#ffffff",
    align: "left",
  });
  cheatMenu.add(cheatToolBackground);
  cheatMenu.add(cheatTitleText);
  cheatMenu.add(toolsText);
  cheatMenu.add(arrow);
  cheatMenu.add(cheatToolInput1);
  cheatMenu.add(cheatToolInput2);
  cheatMenu.add(cheatToolInput3);

  // Scene
  var scene = this.add.container(0, 0);
  scene.add(background);
  scene.add(spin);
  scene.add(cheatMenu);
  scene.add(win);

  win.visible = false;

  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  function generateRandomBar() {
    var randomBar = [];
    for (var i = 0; i < barLength; i++) {
      randomBar.push(fruitsEnum[getRandom(fruitsEnumLength)]);
    }
    return randomBar;
  }

  var cheatBarCodes = [
    getRandom(barLength),
    getRandom(barLength),
    getRandom(barLength),
  ];

  var cheatCode1Text = this.add.text(
    90,
    124,
    cheatBarCodes[0] + 1,
    cheatCode1TextStyle
  );
  var cheatCode2Text = this.add.text(
    235,
    124,
    cheatBarCodes[1] + 1,
    cheatCode1TextStyle
  );
  var cheatCode3Text = this.add.text(
    370,
    124,
    cheatBarCodes[2] + 1,
    cheatCode1TextStyle
  );
  cheatMenu.add(cheatCode1Text);
  cheatMenu.add(cheatCode2Text);
  cheatMenu.add(cheatCode3Text);

  function setBars() {
    bar1 = [];
    bar2 = [];
    bar3 = [];

    barOrj1 = generateRandomBar();
    barOrj2 = generateRandomBar();
    barOrj3 = generateRandomBar();

    for (var i = 0; i < maxRoll; i++) {
      bar1.push(...barOrj1);
      bar2.push(...barOrj2);
      bar3.push(...barOrj3);
    }
    console.log("bar1: ", barOrj1, "bar2: ", barOrj2, "bar3: ", barOrj3);

    // Bar 1
  }
  setBars();

  barContainer1 = this.add.container(200, 520);
  barContainer2 = this.add.container(580, 520);
  barContainer3 = this.add.container(980, 520);

  for (var i = 0; i < barLength * maxRoll; i++) {
    barContainer1.add(this.add.image(380, 300 * i * -1 + 300, bar1[i]));
    barContainer2.add(this.add.image(380, 300 * i * -1 + 300, bar2[i]));
    barContainer3.add(this.add.image(380, 300 * i * -1 + 300, bar3[i]));
  }

  const shape = this.make.graphics();
  shape.fillStyle(0xffffff);
  shape.beginPath();

  shape.fillRect(200, 290, 1320, 460);
  const mask = shape.createGeometryMask();

  barContainer1.setMask(mask);
  barContainer2.setMask(mask);
  barContainer3.setMask(mask);

  // Events

  spin
    .on("pointerdown", function (e) {
      spin.setScale(0.95, 0.95);
    })
    .on("pointerout", function (e) {
      spin.setScale(1, 1);
    })
    .on("pointerup", function (e) {
      if (isStart != true) {
        win.visible = false;
        setBars();
        spin.setScale(1, 1);
        barContainer1.y = 520;
        barContainer2.y = 520;
        barContainer3.y = 520;

        /*
        endTime1 = getRandom(12) * 300 + 2000 + 60;
        endTime2 = endTime1 + getRandom(6) * 300 + 300;
        endTime3 = endTime2 + getRandom(3) * 300 + 300 + 60;*/

        endTime1 = getRandom(6) * 300 + 7200;
        endTime2 = endTime1 + getRandom(6) * 300 + 300;
        maxCounter = getRandom(10) * 300 + 9000;
        endTime3 = endTime2 + getRandom(6) * 300 + 300;

        console.log(endTime1, endTime2, endTime3);

        endTime = endTime3;

        lucklyIndexs = [
          Math.floor(endTime1 / 300 / 6),
          Math.floor(endTime2 / 300 / 6),
          Math.floor(endTime3 / 300 / 6),
        ];

        isStart = true;

        console.log(lucklyIndexs);
        console.log(
          bar1[lucklyIndexs[0]],
          bar2[lucklyIndexs[1]],
          bar3[lucklyIndexs[2]]
        );
        /*
        this.scene.tweens.add({
          targets: barContainer1,
          y: { from: 520, to: 18000 },
          ease: "Linear",
          elapsed: 14112,
          duration: 1000,
        });*/
      }
    });

  arrow
    .on("pointerdown", function (e) {
      arrow.setScale(0.95, 0.95);
    })
    .on("pointerout", function (e) {
      arrow.setScale(1, 1);
    })
    .on("pointerup", function (e) {
      arrow.setScale(1, 1);
      console.log("isCheatMenuOpen: ", isCheatMenuOpen);
      if (isCheatMenuOpen === true) {
        this.scene.tweens.add({
          targets: cheatMenu,
          y: 0,
          duration: 200,
          ease: "Sine.easeIn",
        });
        arrow.rotation = 180 * oneRadianToDeggree;
      } else {
        this.scene.tweens.add({
          targets: cheatMenu,
          y: -230,
          duration: 200,
          ease: "Sine.easeOut",
        });
        arrow.rotation = 0;
      }
      isCheatMenuOpen = !isCheatMenuOpen;
    });
}
