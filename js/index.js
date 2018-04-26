function hide(target) {
  $(target).addClass("d-none");
}

function show(target) {
  $(target).removeClass("d-none");
}

function showAll() {
  $(".online-row").removeClass("d-none");
  $(".offline-row").removeClass("d-none");
}

function makeUrl(type, username) {
  return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + username + "?callback=?";
}


function getTwitchInfo(user) {
  $.getJSON(makeUrl("streams", user), function(data) {
    var connectionStatus;
    if(data.stream === null) {
      connectionStatus = "offline";
    } else {
      connectionStatus = "online";
    };
    $.getJSON(makeUrl("channels", user), function(data) {
      function isNull(input) {
        if(input === null) {
          return "";
        } else {
          return input;
        }
      };
      var cardSansLogo = "<div class='col-xs-12 col-md-6 col-lg-4 col-xl-3 card-col'><a href='" + data.url + "' target='_blank'><div class='card h-100 " + isNull(connectionStatus) + " streaming'><div class='card-block'><div class='card-title'><h3>" + isNull(data.display_name) + "</h3></div><div class='card-body'><h4>" + isNull(connectionStatus) + "</h4><h5>" + isNull(data.game) + "</h5><p> " + isNull(data.status) + "</p></div></div></div></a></div>"
      var cardWithLogo = "<div class='col-xs-12 col-md-6 col-lg-4 col-xl-3 card-col'><a href='" + data.url + "'  target='_blank'><div class='card h-100 " + isNull(connectionStatus) + " streaming'><div class='card-block'><div class='card-title'><h3>" + isNull(data.display_name) + "</h3></div><div class='card-body'><img class='card-image' src='"+ isNull(data.logo) + "'><h4>" + isNull(connectionStatus) + "</h4><h5>" + isNull(data.game) + "</h5><p> " + isNull(data.status) + "</p></div></div></div></a></div>"
      if(data.logo === null) {
        $("." + connectionStatus + "-row").append(cardSansLogo);
      } else {
        $("." + connectionStatus + "-row").append(cardWithLogo);
      }
    }).fail(function() {
      console.log("this didn't work");
    });
  });
};

var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "medryBW", "ninja", "bungie", "RocketLeague", "TSM_Myth", "OverwatchLeague", "sodapoppin", "shroud", "RiotGamesTurkish", "DrDisRespectLIVE", "LIRIK"];
var testUsers = ["ESL_SC2"];

$(document).ready(function() {
  for(i=0; i < users.length; i++) {
      getTwitchInfo(users[i]);
  };
  $("#online-filter").click(function() {
    hide(".offline-row");
    show(".online-row");
  })
  $("#offline-filter").click(function() {
    hide(".online-row");
    show(".offline-row");
  })
  $("#no-filter").click(function() {
    showAll();
  })
});
