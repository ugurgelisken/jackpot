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
