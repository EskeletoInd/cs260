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

// Example Response
// {
//   cost: {
//     main: 4000,
//     additional: 2000
//   },
//   fu: 40,
//   han: 4,
//   fuDetails: [
//     {
//       fu: 20,
//       reason: "base"
//     },
//     {
//       fu: 4,
//       reason: "closed_pon"
//     }
//   ],
//   yaku: [
//     {
//       japaneseReason: "Menzen Tsumo",
//       reason: "Self Draw",
//       yaku: 1
//     }
//   ],
//   error: "None"
// }
