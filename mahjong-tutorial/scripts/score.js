document.getElementById("scoreButton").onclick = function(event) {
  event.preventDefault();
  let hand = getTempHand();
  // let hand = getHand();
  fetch('http://127.0.0.1:5000/ScoreHand', {
    method: 'post',
    body: {
      "winTile": "4s"
    }
  }).then(function (response) {
    console.log(response);
  });
}

// Temporary Hand Formated Correctly
function getTempHand() {
  return {
    winTile: "4s",
    tiles: {
      man: "22444",
      pin: "333567",
      sou: "444"
    },
    doraIndicators: ["1m"],
    melds: [{
      meld: {
        man: "",
        pin: "",
        sou: ""
      }
    }],
    options: {
      isDealer: false,
      playerWind: "West",
      roundWind: "East",
      isTsumo: false,
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
