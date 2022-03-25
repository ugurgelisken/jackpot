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

    if (timeCounter >= endTime3) {
      console.log("timeCounter: ", timeCounter);
      timeCounter = 0;
      isStart = false;
      spin.alpha = 1;
      spin.setInteractive({ cursor: "pointer" });
      var final1 = bar1[lucklyIndexs[0]];
      var final2 = bar2[lucklyIndexs[1]];
      var final3 = bar3[lucklyIndexs[2]];
      console.log("---> ", lucklyIndexs);
      console.log("---> ", final1, final2, final3);
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
  cheatMenu = this.add.container(0, -230);
  cheatMenu.add(cheatToolBackground);
  cheatMenu.add(cheatTitleText);
  cheatMenu.add(toolsText);
  cheatMenu.add(arrow);
  cheatMenu.add(cheatToolInput1);
  cheatMenu.add(cheatToolInput2);
  cheatMenu.add(cheatToolInput3);

  var cheatCode1Text = this.add.text(90, 124, 0, cheatCode1TextStyle);
  var cheatCode2Text = this.add.text(235, 124, 0, cheatCode1TextStyle);
  var cheatCode3Text = this.add.text(370, 124, 0, cheatCode1TextStyle);
  cheatMenu.add(cheatCode1Text);
  cheatMenu.add(cheatCode2Text);
  cheatMenu.add(cheatCode3Text);

  // Scene
  var scene = this.add.container(0, 0);
  scene.add(background);
  scene.add(spin);
  scene.add(cheatMenu);
  scene.add(win);

  // State
  win.visible = false;

  function setBars() {
    bar1 = [];
    bar2 = [];
    bar3 = [];
    barOrj1 = [];
    barOrj2 = [];
    barOrj3 = [];

    barOrj1 = generateRandomBar();
    barOrj2 = generateRandomBar();
    barOrj3 = generateRandomBar();

    for (var i = 0; i < maxRoll; i++) {
      bar1.push(...barOrj1);
      bar2.push(...barOrj2);
      bar3.push(...barOrj3);
    }
    console.log(bar1, bar2, bar3);

    var randomRoll = Math.ceil(getRandom(maxRoll) / 2);

    endTime1 = randomRoll * 300 + 1800;
    endTime2 = endTime1 + getRandom(5) * 300 + 300;
    endTime3 = endTime2 + getRandom(5) * 300 + 900;

    console.log(randomRoll, endTime1, endTime2, endTime3);

    endTime = endTime3;

    lucklyIndexs = [endTime1 / 300, endTime2 / 300, endTime3 / 300];

    // Bar 1
  }
  setBars();

  barContainer1 = this.add.container(200, 520);
  barContainer2 = this.add.container(590, 520);
  barContainer3 = this.add.container(975, 520);

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
  /* barContainer1.setMask(mask);
  barContainer2.setMask(mask);
  barContainer3.setMask(mask);*/

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

        isStart = true;

        spin.setScale(1, 1);
        barContainer1.y = 520;
        barContainer2.y = 520;
        barContainer3.y = 520;

        /*
        endTime1 = getRandom(12) * 300 + 2000 + 60;
        endTime2 = endTime1 + getRandom(6) * 300 + 300;
        endTime3 = endTime2 + getRandom(3) * 300 + 300 + 60;*/

        /* endTime1 = getRandom(6) * 300 + 3600;
        endTime2 = endTime1 + getRandom(6) * 300 + 300;
        maxCounter = getRandom(10) * 300 + 9000;
        endTime3 = endTime2 + getRandom(6) * 300 + 300;*/

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
