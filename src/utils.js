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
