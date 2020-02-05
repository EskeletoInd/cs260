let sliders = ["chiSlider", "ponSlider", "openKanSlider", "closedKanSlider"]
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
let hand = {};

function populateTileNum() {
  for (i = 0; i < tiles; i++) {
    numTiles[tiles[i]] = 4;
  }
}

document.getElementById("scoreButton").onclick = function(event) {
  event.preventDefault();
  let hand = getTempHand();
  // let hand = getHand();
  fetch('http://127.0.0.1:5000/ScoreHand', {
    method: 'post',
    body: JSON.stringify(hand)
  }).then((response) => {
    return response.json();
  }).then((myJson) => {
    console.log(myJson);
  });
}

// Temporary Hand Formated Correctly
function getTempHand() {
  return {
    winTile: {
      man: "",
      pin: "",
      sou: "4",
      honors: ""
    },
    // Includes the tiles used in melds and winning tile
    tiles: {
      man: "22444",
      pin: "333567",
      sou: "444",
      honors: ""
    },
    doraIndicators: [{
        man: "8",
        pin: "",
        sou: "",
        honors: ""
    }],
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

// Gets the hand created by the user
function getHand() {

}

function findSelector(tileName) {
  return document.getElementById(tileName + "Selector")
}

function disableSelector(tileName) {
  if (typeof tileName === "string") {
    let btn = findSelector(tileName);
    btn.disabled = true;
    btn.style.opacity = "20%";
  } else {
    for (i = 0; i < tileName.length; i++) {
      let btn = findSelector(tileName[i]);
      btn.disabled = true;
      btn.style.opacity = "20%";
    }
  }
}

function enableSelector(tileName) {
  if (typeof tileName === "string") {
    let btn = findSelector(tileName);
    btn.disabled = false;
    btn.style.opacity = "100%";
  } else {
    for (i = 0; i < tileName.length; i++) {
      let btn = findSelector(tileName[i]);
      btn.disabled = false;
      btn.style.opacity = "100%";
    }
  }
}

function inHandOnClick() {

}

function increaseTileId(tileid) {
  var splt = tileid.split("");
  var num = Number(splt[1]);
  return splt[0] + (num++);
}

function addEventToSlider(id, others) {
  let slider = document.getElementById(id);
  slider.onclick = function() {
    for (i = 0; i < others.length; i++) {
      var temp = document.getElementById(others[i]);
      temp.checked = false;
    }
    refreshbuttons();
  }
}

function populateSliderEvent() {
  for (i = 0; i < sliders.length; i++) {
    var id = sliders[i]
    var others = sliders.slice();
    others.splice(i, 1);
    addEventToSlider(id, others);
  }
}

function createTileImage(tileId) {
  var img = document.createElement("img");
  img.source = "/images/Tiles/Tile-" + tileId + ".png";
  return img;
}

function addChiToHand(starttile) {
  var div = document.createElement("div");
  div.setAttribute("class", "handCalled")

  var createdBtn = document.createElement("button");
  createdBtn.onclick = inHandOnClick;
  var createdImg = createTileImage(starttile)
  createdImg.setAttribute("class", "calledtile");
  createdBtn.appendChild(createdImg);
  div.appendChild(createdBtn);

  var createdBtn = document.createElement("button");
  createdBtn.onclick = inHandOnClick;
  var createdImg = createTileImage(increaseTileId(starttile));
  createdBtn.appendChild(createdImg);
  div.appendChild(createdBtn);

  var createdBtn = document.createElement("button");
  createdBtn.onclick = inHandOnClick;
  createdBtn.appendChild(createTileImage(increaseTileId(increaseTileId(starttile))));
  div.appendChild(createdBtn);
  document.getElementById("currentCalled").appendChild(div);
}

function addPonToHand(tileId) {
  var div = document.createElement("div");
  div.setAttribute("class", "handCalled");

  for (i = 0; i < 4; i++) {
    var createdBtn = document.createElement("button");
    createdBtn.onclick = inHandOnClick;
    var createdImg = createTileImage(tileId);
    if (i === 0) {
      createdImg.setAttribute("class", "calledtile");
    }
    createdBtn.appendChild(createdImg);
    div.appendChild(createdBtn);
  }
  document.getElementById("currentCalled").appendChild(div);
}

function addOpenKanToHand(tileId) {
  var div = document.createElement("div");
  div.setAttribute("class", "handCalled");

  for (i = 0; i < 5; i++) {
    var createdBtn = document.createElement("button");
    createdBtn.onclick = inHandOnClick;
    var createdImg = createTileImage(tileId);
    if (i === 0) {
      createdImg.setAttribute("class", "calledtile");
    }
    createdBtn.appendChild(createdImg);
    div.appendChild(createdBtn);
  }
  document.getElementById("currentCalled").appendChild(div);
}

function addClosedKanToHand(tileId) {
  var div = document.createElement("div");
  div.setAttribute("class", "handCalled");

  for (i = 0; i < 5; i++) {
    var createdBtn = document.createElement("button");
    createdBtn.onclick = inHandOnClick;
    if ((i === 0) || (i === 4)) {
      var createdImg = createTileImage("unknown");
    } else {
      var createdImg = createTileImage(tileId);
    }
    createdBtn.appendChild(createdImg);
    div.appendChild(createdBtn);
  }
  document.getElementById("currentCalled").appendChild(div);
}

function addEventToSelectors(id) {
  let btn = document.getElementById(id+"Selector");
  btn.onclick = function() {
    let chi = document.getElementById("chiSlider");
    let pon = document.getElementById("ponSlider");
    let openKan = document.getElementById("openKanSlider");
    let closedKan = document.getElementById("closedKanSlider");
    let tilename = id.substr(0,2);
    if (chi.checked) {
      addChiToHand(tilename);
      numTiles[tilename]--;
      numTiles[increaseTileId(tilename)]--;
      numTiles[increaseTileId(increaseTileId(tilename))]--;
    } else if (pon.checked) {
      addPonToHand(tilename);
      numTiles[tilename] -= 3;
    } else if (openKan.checked) {
      addOpenKanToHand(tilename);
      numTiles[tilename] -= 4;
    } else if (closedKan.checked) {
      addClosedKanToHand(tilename);
      numTiles[tilename] -= 4;
    } else {
      var createdBtn = document.createElement("button");
      createdBtn.onclick = inHandOnClick;
      var createdImg = document.createElement("img");
      createdImg.src = "/images/Tiles/Tile-" + tilename + ".png";
      createdBtn.appendChild(createdImg);
      document.getElementById("currentInHand").appendChild(createdBtn);
      numTiles[tilename]--;
    }
  }
}

function populateSelectorsEvent() {
  for (i = 0; i < tiles.length; i++) {
    addEventToSelectors(tiles[i]);
  }
}

function refreshbuttons() {
  let chi = document.getElementById("chiSlider");
  let pon = document.getElementById("ponSlider");
  let openKan = document.getElementById("openKanSlider");
  let closedKan = document.getElementById("closedKanSlider");
  let suits = ["m", "s", "p"];
  enableSelector(tiles);
  if (chi.checked) {
    disableSelector(["8m", "9m", "8s", "9s", "8p", "9p", "we", "ws", "ww", "wn", "dw", "dg", "dr"]);
    for (i = 0; i < suits.length; i++) {
      for (j = 1; j < 10; j++) {
        if (numTiles[i+j] < 1 || numTiles[i+(j+1)] < 1 || numTiles[i+(j+2)] < 1) {
          disableSelector(i+j);
        }
      }
    }
  } else if (pon.checked) {
    for (i = 0; i < tiles.length; i++) {
      if (numTiles[tiles[i]] < 3) {
        disableSelector(tiles[i]);
      }
    }
  } else if (openKan.checked || closedKan.checked) {
    for (i = 0; i < tiles.length; i++) {
      if (numTiles[tiles[i]] < 4) {
        disableSelector(tiles[i]);
      }
    }
  } else {
    for (i = 0; i < tiles.length; i++) {
      if (numTiles[tiles[i]] < 1) {
        disableSelector(tiles[i]);
      }
    }
  }
}

populateTileNum();
populateSliderEvent();
populateSelectorsEvent();


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
