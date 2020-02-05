// TODO Add option funcionality
// TODO Add Display of Scores
// TODO add tenpai filtering
//

let sliders = ["chiSlider", "ponSlider", "openKanSlider", "closedKanSlider", "doraSlider"]
let selectors = ["1mSelector", "2mSelector", "3mSelector", "4mSelector",
"5mSelector", "6mSelector", "7mSelector", "8mSelector", "9mSelector", "1sSelector",
"2sSelector", "3sSelector", "4sSelector", "5sSelector", "6sSelector", "7sSelector",
"8sSelector", "9sSelector", "1pSelector", "2pSelector", "3pSelector", "4pSelector",
"5pSelector", "6pSelector", "7pSelector", "8pSelector", "9pSelector", "weSelector",
"wsSelector", "wwSelector", "wnSelector", "dwSelector", "dgSelector", "dwSelector"]
let tiles = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m",
             "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s",
             "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p",
             "we", "ws", "ww", "wn", "dw", "dg", "dr"]
let numTiles = {};
let hand = buildNewHand();

// Logs 4 copies of each tile
function populateTileNum() {
  for (let i = 0; i < tiles.length; i++) {
    numTiles[tiles[i]] = 4;
  }
}

// Builds a New Hand with correct structure
function buildNewHand() {
  return {
    winTile: {
      man: "",
      pin: "",
      sou: "",
      honors: ""
    },
    tiles: {
      man: "",
      pin: "",
      sou: "",
      honors: "",
      length: 0
    },
    doraIndicators: [],
    melds: [],
    options: {
      playerWind: "East",
      roundWind: "East",
      isTsumo: true,
      isRiichi: false,
      isDoubleRiichi: false,
      isIppatsu: false,
      isRinshan: false,
      isChankan: false,
      isHaitei: false,
      isHoutei: false,
      isNagashiMangan: false,
      isTenhou: false,
      isRenhou: false,
      isChiihou: false
    }
  }
}

// Creates an img element with the correct src
function createTileImage(tileId) {
  let img = document.createElement("img");
  img.src = "/images/tiles/Tile-" + tileId + ".png";
  return img;
}

// Increase the tileid by one 1m -> 2m
function increaseTileId(tileid) {
  let splt = tileid.split("");
  let num = (Number(splt[0])) + 1;
  let to_return = num + splt[1];
  return to_return;
}

// Methods that edit the hand Obj Correctly

function addTileToObj(obj, tileid) {
  let splt = tileid.split("");
  if (splt[1] === "m") {
    obj.man += splt[0];
  } else if (splt[1] === "s") {
    obj.sou += splt[0];
  } else if (splt[1] === "p") {
    obj.pin += splt[0];
  } else if (splt[0] === "w") {
    if (splt[1] === "e") {
      obj.honors += "1";
    } else if (splt[1] === "s") {
      obj.honors += "2";
    } else if (splt[1] === "w") {
      obj.honors += "3";
    } else if (splt[1] === "n") {
      obj.honors += "4";
    }
  } else if (splt[0] === "d") {
    if (splt[1] === "w") {
      obj.honors += "5";
    } else if (splt[1] === "g") {
      obj.honors += "6";
    } else if (splt[1] === "r") {
      obj.honors += "7";
    }
  }
}

function removeTileFromObj(obj, tileid) {
  let splt = tileid.split("");
  if (splt[1] === "m") {
    obj.man = obj.man.replace(splt[0], '');
  } else if (splt[1] === "s") {
    obj.sou = obj.sou.replace(splt[0], '');
  } else if (splt[1] === "p") {
    obj.pin = obj.pin.replace(splt[0], '');
  } else if (splt[1] === "w") {
    if (splt[2] === "e") {
      obj.honors = obj.honors.replace("1", '');
    } else if (splt[2] === "s") {
      obj.honors = obj.honors.replace("2", '');
    } else if (splt[2] === "w") {
      obj.honors = obj.honors.replace("3", '');
    } else if (splt[2] === "n") {
      obj.honors = obj.honors.replace("4", '');
    }
  } else if (splt[1] === "d") {
    if (splt[2] === "w") {
      obj.honors = obj.honors.replace("5", '');
    } else if (splt[2] === "g") {
      obj.honors = obj.honors.replace("6", '');
    } else if (splt[2] === "r") {
      obj.honors = obj.honors.replace("7", '');
    }
  }
}

function addTileToHand(tileid) {
  addTileToObj(hand.tiles, tileid);
  hand.tiles.length += 1;
  if (hand.tiles.length === 14) {
    activateScoreButton();
  }
}

function removeTileFromHand(tileid) {
  if (hand.tiles.length === 14) {
    removeWinningTileFromHand();
  }
  removeTileFromObj(hand.tiles, tileid);
  hand.tiles.length -= 1;
  numTiles[tileid] += 1;
  deactiveScoreButton();
}

function addWinningTileToHand(tileid) {
  addTileToObj(hand.winTile, tileid);
  addTileToHand(tileid);
}

function removeWinningTileFromHand() {
  hand.winTile = {man: "",pin: "",sou: "",honors: ""};
}

function addMeldToHand(type, tileid, opened = true) {
  let meld = {type: "",opened: "",man: "",pin: "",sou: "",honors:""}
  if (type === "chi") {
    addTileToHand(tileid);
    addTileToObj(meld, tileid);
    tileid = increaseTileId(tileid);
    addTileToHand(tileid);
    addTileToObj(meld, tileid);
    tileid = increaseTileId(tileid);
    addTileToHand(tileid);
    addTileToObj(meld, tileid);
  } else if (type === "pon") {
    for (let i = 0; i < 3; i++) {
      addTileToHand(tileid);
      addTileToObj(meld, tileid);
    }
  } else if (type === "kan") {
    hand.tiles.length -= 1;
    for (let i = 0; i < 4; i++) {
      addTileToHand(tileid);
      addTileToObj(meld, tileid);
    }
  }
  meld.opened = opened;
  meld.type = type;
  hand.melds.push(meld);
}

function createCompMeld(type, tileid, opened = true) {
  let meld = {type: "",opened: "",man: "",pin: "",sou: "",honors:""}
  if (type === "chi") {
    addTileToObj(meld, tileid);
    tileid = increaseTileId(tileid);
    addTileToObj(meld, tileid);
    tileid = increaseTileId(tileid);
    addTileToObj(meld, tileid);
  } else if (type === "pon") {
    for (let i = 0; i < 3; i++) {
      addTileToObj(meld, tileid);
    }
  } else if (type === "kan") {
    for (let i = 0; i < 4; i++) {
      addTileToObj(meld, tileid);
    }
  }
  meld.opened = opened;
  meld.type = type;
  return meld;
}

function compareMelds(a, b) {
  if ((a.opened === b.opened) &&
  (a.type === b.type) &&
  (a.honors === b.honors) &&
  (a.man === b.man) &&
  (a.pin === b.pin) &&
  (a.sou === b.sou)) {
    return true;
  }
  return false;
}

function removeMeldFromHand(tileid, type, opened = true) {
  for (let i = 0; i < hand.melds.length; i++) {
    if (compareMelds(hand.melds[i], createCompMeld(type, tileid, opened))) {
      // Found Correct Meld
      if (type === "chi") {
        hand.melds.splice(i, 1);
        removeTileFromHand(tileid);
        tileid = increaseTileId(tileid);
        removeTileFromHand(tileid);
        tileid = increaseTileId(tileid);
        removeTileFromHand(tileid);
      } else if (type === "pon") {
        hand.melds.splice(i, 1);
        removeTileFromHand(tileid);
        removeTileFromHand(tileid);
        removeTileFromHand(tileid);
      } else if (type === "kan") {
        hand.melds.splice(i, 1);
        removeTileFromHand(tileid);
        removeTileFromHand(tileid);
        removeTileFromHand(tileid);
        removeTileFromHand(tileid);
        hand.tiles.length += 1;
      }
      return;
    }
  }
}

function compareDoraIndicators(a, b) {
  if ((a.honors === b.honors) && (a.man === b.man) && (a.pin === b.pin) && (a.sou === b.sou)) {
    return true;
  }
  return false;
}

function addDoraIndicatorToHand(tileid) {
  let doraIndicator = {type: "",opened: "",man: "",pin: "",sou: "",honors:""};
  addTileToObj(doraIndicator, tileid);
  hand.doraIndicators.push(doraIndicator);
}

function removeDoraIndicatorFromHand(tileid) {
  let doraIndicator = {type: "",opened: "",man: "",pin: "",sou: "",honors:""};
  addTileToObj(doraIndicator, tileid);
  for (let i = 0; i < hand.doraIndicators.length; i++) {
    if (compareDoraIndicators(hand.doraIndicators[i], doraIndicator)) {
      hand.doraIndicators.splice(i, 1);
      numTiles[tileid] += 1;
    }
    return;
  }
}

// Adds listener to the score button
document.getElementById("scoreButton").onclick = function(event) {
  event.preventDefault();
  fetch('http://127.0.0.1:5000/ScoreHand', {
    method: 'post',
    body: JSON.stringify(hand)
  }).then((response) => {
    return response.json();
  }).then((myJson) => {
    console.log(myJson);
  });
}

// Button Alterers
function deactiveScoreButton() {
  let btn = document.getElementById("scoreButton");
  btn.disabled = true;
  btn.style.opacity = "20%";
}

function activateScoreButton() {
  let btn = document.getElementById("scoreButton");
  btn.disabled = false;
  btn.style.opacity = "100%";
}

function disableTileSelector(tileName) {
  if (typeof tileName === "string") {
    let btn = findSelector(tileName);
    btn.disabled = true;
    btn.style.opacity = "20%";
  } else {
    for (let i = 0; i < tileName.length; i++) {
      let btn = findSelector(tileName[i]);
      btn.disabled = true;
      btn.style.opacity = "20%";
    }
  }
}

function enableTileSelector(tileName) {
  if (typeof tileName === "string") {
    let btn = findSelector(tileName);
    btn.disabled = false;
    btn.style.opacity = "100%";
  } else {
    for (let i = 0; i < tileName.length; i++) {
      let btn = findSelector(tileName[i]);
      btn.disabled = false;
      btn.style.opacity = "100%";
    }
  }
}

// Slider Functions

function findSelector(tileName) {
  return document.getElementById(tileName + "Selector")
}

function addEventToSlider(id, others) {
  let slider = document.getElementById(id);
  slider.onclick = function() {
    for (let i = 0; i < others.length; i++) {
      let temp = document.getElementById(others[i]);
      temp.checked = false;
    }
    refreshbuttons();
  }
}

function populateSliderEvent() {
  for (let i = 0; i < sliders.length; i++) {
    let id = sliders[i]
    let others = sliders.slice();
    document.getElementById(id).checked = false;
    others.splice(i, 1);
    addEventToSlider(id, others);
  }
}

// Editing the current Hand object

function inHandOnClickFactory(elem, tileid, type=null, opened=null) {
  // Single Tile, ie Not a Meld
  if (type === null) {
    return () => {
      removeTileFromHand(tileid);
      elem.parentNode.removeChild(elem);
      refreshbuttons();
    }
  } else {
    // Need to remove a meld
    return () => {
      removeMeldFromHand(tileid, type, opened);
      elem.parentNode.removeChild(elem);
      refreshbuttons();
    }
  }
}

function addChiToHand(tileid) {
  addMeldToHand("chi", tileid);

  let div = document.createElement("div");
  div.setAttribute("class", "handCalled")
  let onClick = inHandOnClickFactory(div, tileid, "chi", true);

  let createdBtn = document.createElement("button");
  createdBtn.onclick = onClick;
  let createdImg = createTileImage(tileid)
  createdImg.setAttribute("class", "calledtile");
  createdBtn.appendChild(createdImg);
  div.appendChild(createdBtn);

  createdBtn = document.createElement("button");
  createdBtn.onclick = onClick;
  tileid = increaseTileId(tileid);
  createdBtn.appendChild(createTileImage(tileid));
  div.appendChild(createdBtn);

  createdBtn = document.createElement("button");
  createdBtn.onclick = onClick;
  tileid = increaseTileId(tileid);
  createdBtn.appendChild(createTileImage(tileid));
  div.appendChild(createdBtn);
  document.getElementById("currentCalled").appendChild(div);
}

function addPonToHand(tileid) {
  addMeldToHand("pon", tileid);

  let div = document.createElement("div");
  div.setAttribute("class", "handCalled");
  let onclick = inHandOnClickFactory(div, tileid, "pon", true);

  for (let i = 0; i < 3; i++) {
    let createdBtn = document.createElement("button");
    createdBtn.onclick = onclick;
    let createdImg = createTileImage(tileid);
    if (i === 0) {
      createdImg.setAttribute("class", "calledtile");
    }
    createdBtn.appendChild(createdImg);
    div.appendChild(createdBtn);
  }
  document.getElementById("currentCalled").appendChild(div);
}

function addOpenKanToHand(tileid) {
  addMeldToHand("kan", tileid);

  let div = document.createElement("div");
  div.setAttribute("class", "handCalled");
  let onclick = inHandOnClickFactory(div, tileid, "kan", true);

  for (let i = 0; i < 4; i++) {
    let createdBtn = document.createElement("button");
    createdBtn.onclick = onclick;
    let createdImg = createTileImage(tileid);
    if (i === 0) {
      createdImg.setAttribute("class", "calledtile");
    }
    createdBtn.appendChild(createdImg);
    div.appendChild(createdBtn);
  }
  document.getElementById("currentCalled").appendChild(div);
}

function addClosedKanToHand(tileid) {
  addMeldToHand("kan", tileid, false);

  let div = document.createElement("div");
  div.setAttribute("class", "handCalled");
  let onclick = inHandOnClickFactory(div, tileid, "kan", false);

  let createdImg = null;
  for (let i = 0; i < 4; i++) {
    let createdBtn = document.createElement("button");
    createdBtn.onclick = onclick;
    if ((i === 0) || (i === 3)) {
      createdImg = createTileImage("unknown");
    } else {
      createdImg = createTileImage(tileid);
    }
    createdBtn.appendChild(createdImg);
    div.appendChild(createdBtn);
  }
  document.getElementById("currentCalled").appendChild(div);
}

function doraOnClickFactory(elem, tileid) {
  return () => {
    removeDoraIndicatorFromHand(tileid);
    elem.parentNode.removeChild(elem);
    refreshbuttons();
  }
}

function addDoraIndicator(tileid) {
  addDoraIndicatorToHand(tileid);
  let createdBtn = document.createElement("btn");
  createdBtn.onclick = doraOnClickFactory(createdBtn, tileid);
  let createdImg = createTileImage(tileid);
  createdBtn.appendChild(createdImg);
  document.getElementById("currentDora").appendChild(createdBtn);
}

// Setting up the Tile Selector Buttons

function addEventToSelectors(id) {
  let btn = document.getElementById(id+"Selector");
  btn.onclick = function() {
    let tilename = id.substr(0,2);
    if (document.getElementById("chiSlider").checked) {
      addChiToHand(tilename);
      numTiles[tilename]--;
      numTiles[increaseTileId(tilename)]--;
      numTiles[increaseTileId(increaseTileId(tilename))]--;
    } else if (document.getElementById("ponSlider").checked) {
      addPonToHand(tilename);
      numTiles[tilename] -= 3;
    } else if (document.getElementById("openKanSlider").checked) {
      addOpenKanToHand(tilename);
      numTiles[tilename] -= 4;
    } else if (document.getElementById("closedKanSlider").checked) {
      addClosedKanToHand(tilename);
      numTiles[tilename] -= 4;
    } else if (document.getElementById("doraSlider").checked) {
      addDoraIndicator(tilename);
      numTiles[tilename] -= 1;
    } else {
      let createdBtn = document.createElement("button");
      createdBtn.onclick = inHandOnClickFactory(createdBtn, tilename);
      let createdImg = createTileImage(id);
      createdBtn.appendChild(createdImg);
      document.getElementById("currentInHand").appendChild(createdBtn);
      numTiles[tilename]--;
      if (hand.tiles.length === 13) {
        addWinningTileToHand(tilename);
      } else {
        addTileToHand(tilename);
      }
    }
    refreshbuttons();
  }
}

function populateSelectorsEvent() {
  for (let i = 0; i < tiles.length; i++) {
    addEventToSelectors(tiles[i]);
  }
}

// Refreshing the conditions on buttons

function refreshbuttons() {
  let suits = ["m", "s", "p"];
  enableTileSelector(tiles);

  // Check for Dora Slider before any length considerations
  if (document.getElementById("doraSlider").checked) {
    for (let i = 0; i < tiles.length; i++) {
      if (numTiles[tiles[i]] < 1) {
        disableTileSelector(tiles[i]);
      }
    }
    return;
  }
  // Check for hand length limitations
  if (hand.tiles.length > 13) {
    disableTileSelector(tiles);
    return;
  } else if ((hand.tiles.length > 10) &&
  (document.getElementById("chiSlider").checked || document.getElementById("ponSlider").checked
   || document.getElementById("openKanSlider").checked || document.getElementById("closedKanSlider").checked)) {
    disableTileSelector(tiles);
    return;
  } else if (hand.tiles.length === 13) {
    // Search for the tiles that could make this hand complete.
    // TODO
  }
  if (document.getElementById("chiSlider").checked) {
    disableTileSelector(["8m", "9m", "8s", "9s", "8p", "9p", "we", "ws", "ww", "wn", "dw", "dg", "dr"]);
    for (let i = 0; i < suits.length; i++) {
      for (j = 1; j < 8; j++) {
        if (numTiles[j+suits[i]] < 1 || numTiles[(j+1)+suits[i]] < 1 || numTiles[(j+2)+suits[i]] < 1) {
          disableTileSelector(j+suits[i]);
        }
      }
    }
  } else if (document.getElementById("ponSlider").checked) {
    for (let i = 0; i < tiles.length; i++) {
      if (numTiles[tiles[i]] < 3) {
        disableTileSelector(tiles[i]);
      }
    }
  } else if (document.getElementById("openKanSlider").checked || document.getElementById("closedKanSlider").checked) {
    for (let i = 0; i < tiles.length; i++) {
      if (numTiles[tiles[i]] < 4) {
        disableTileSelector(tiles[i]);
      }
    }
  } else {
    for (let i = 0; i < tiles.length; i++) {
      if (numTiles[tiles[i]] < 1) {
        disableTileSelector(tiles[i]);
      }
    }
  }
}

populateTileNum();
populateSliderEvent();
populateSelectorsEvent();
deactiveScoreButton();


// Example of Hand
// {
//   winTile: {
//     man: "",
//     pin: "",
//     sou: "4",
//     honors: ""
//   },
//   // Includes the tiles used in melds
//   tiles: {
//     man: "22444",
//     pin: "333567",
//     sou: "44",
//     honors: ""
//   },
//   doraIndicators: [
//     doraIndicator: {
//       man: "4",
//       pin: "",
//       sou: "",
//       honors: ""
//     },
//   doraIndicator: {
//       man: "4",
//       pin: "",
//       sou: "",
//       honors: ""
//     }
//   ],
//   melds: [{
//     meld: {
//       // Type values include pon, chi, kan,
//       type: "",
//       opened: "",
//       man: "",
//       pin: "",
//       sou: "",
//       honors: ""
//     }
//   }],
//   options: {
//                  "East, South, West or North"
//     playerWind: "East",
//     roundWind: "East",
//     isTsumo: false,
//     isRiichi: false,
//     isDoubleRiichi: false,
//     isIppatsu: false,
//     isRinshan: false,
//     isChankan: false,
//     isHaitei: false,
//     isHoutei: false,
//     isNagashiMangan: false,
//     isTenhou: false,
//     isRenhou: false,
//     isChiihou: false
//   }
// }
