/*https://accounts.spotify.com/vi-VN/authorize?client_id=9d785a141002469fabb59a382ba915e2&response_type=code&redirect_uri=http:%2F%2F127.0.0.1:5500%2Findex.html&show_dialog=true&scope=user-follow-read%20user-library-read%20user-top-read*/

const AUTHORIZE = "https://accounts.spotify.com/authorize";
var redirect_uri = "http://127.0.0.1:5500/index.html";
var clientID = "";
var clientSecret = "";

function onPageLoad() {
  if (window.location.search.length > 0) {
    handleRedirect();
  }
}

function handleRedirect() {
  let code = getCode();
  fetchAcccessToken(code);
}

function fetchAcccessToken(code) {
  let body = "grant_type=authorization-code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + clientID;
  body += "&clientSecret=" + clientSecret;
  callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", TOKEN, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa(clientID + ":" + clientSecret)
  );
  xhr.send(body);
  xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data);
    var data = JSON.parse(this.responseText);
    if (data.access_token != undefined) {
      refresh_token = data.refresh_token;
      localStorage.setItem("refresh_token", refresh_token);
    }
    onPageLoad();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
}

function requestAuthorization() {
  clientID = document.getElementById("clientID").value;
  clientSecret = document.getElementById("clientSecret").value;
  localStorage.setItem("clientID", clientID);
  localStorage.setItem("clientSecret", clientSecret);

  let url = AUTHORIZE;

  url += "?client_id=" + clientID;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url +=
    "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
  window.location.href = url;
}

for (let i = 0; i < data.album.length; i++) {
  var parent = document.querySelector(".main-row.two.results");
  if (
    data.album[i].strAlbumThumb &&
    data.album[i].strReleaseFormat == "Album"
  ) {
    parent.insertAdjacentHTML(
      "beforeend",
      `<div class="album-container results" draggable="true"><div class="album"><img class="img album" src="${data.album[i].strAlbumThumb}"/></div></div>`
    );
  } else {
  }
}

$(searchResults).on("dragstart", albumContainerResults, function (event) {
  var target = $(event.target);
  console.log("success");
  $(target).addClass("dragging");
});
$(searchResults).on("dragend", albumContainerResults, function (event) {
  var target = $(event.target);
  console.log("finished");
  $(target).removeClass("dragging");
});

$("body").on("click", ".add-new-album", function () {
  console.log("the dashed album was clicked");
  $(this)
    .closest($(".main-row.two"))
    .append($(".album-container.results.album-container-green"));
  $(addNewAlbumDashedAll).addClass("hide");
  $(".album-container").removeClass("album-container-green");
});

$("body").on(
  "click",
  ".album-container:not(.album-container.results)",
  function () {
    if ($(this).closest(".album-container").hasClass("album-container-red")) {
      console.log("already has red class");
      $(this).closest(".album-container").remove();
    } else {
      $(this).closest(".album-container").addClass("album-container-red");
    }
  }
);

$(document).on("click", function (e) {
  if ($(e.target).is(".album") === false) {
    $(".album-container").removeClass("album-container-green");
    $(".album-container").removeClass("album-container-red");
  }
});

function addSection() {
  addSectionSection.insertAdjacentHTML(
    "beforebegin",
    '<section class="main-body-section"><div class="main-body-section-content"><div class="container"><div class="row"><div class="content-container all"><div class="content-container left"> <div class="main-row one"><div class="time-period-box left"><div contenteditable="true" class="time-period name">Section Title</div></div><div class="time-period-box right"><div contenteditable="true" class="time-period numbers">Time Period</div></div></div><div class="main-row two drop" id="dropAreaNew" class="drop-area"><div class="add-new-album hide"><div class="plus-container"><button type="button" class="btn-add-new-album"><i class="ph-plus"></i> </button></div></div></div></div></div></div></div></div></div></div></div></div></section>'
  );
}
/////   !! FUNCTIONS THAT ADD DRAG  EVENT LISTENERS TO NEWLY CREATED ELEMENTS !!    /////

/*$("body").on("dragstart", albumContainerResults, function (event) {
    var target = $(event.target).closest(".album-container");
    console.log("success");
    $(target).addClass("dragging");
  });

  $("body").on("dragend", albumContainerResults, function (event) {
    var target = $(event.target).closest(".album-container");
    console.log("finished");
    $(target).removeClass("dragging");
  });

  $("body").on("dragover", newDropArea, function (event) {
    console.log("its draggin bro");
    console.log("new");
    event.preventDefault();
    const draggable = document.querySelector(".dragging");
    newDropArea.append(draggable);
  }); */

/////   !! FUNCTIONS THAT ADD TOUCH  EVENT LISTENERS TO SEARCH RESULT ALBUMS !!    /////

/*$(document).on(
    "touchend click",
    ".album-container.results",
    function (event) {
      if (event.handled === false) return;
      event.stopPropagation();
      event.preventDefault();
      event.handled = true;

      var albumResultSelected = event.currentTarget;
      console.log(albumResultSelected);
      setMenuItemNames();
      popUpMenu.classList.remove("hide");
    }
  );*/

/*$("body").click(function (event) {
    event.preventDefault();
    popUpMenu.classList.add("hide");
    console.log("Here a click event is fired");
  });

  $(popUpMenu).click(function (e) {
    e.stopPropagation();
  });*/

// ON TOUCHHOLD REMOVE HIDE CLASS FROM DELETE CONTAINER

/* var timer;
  $("body")
    .on("touchstart", ".main-body-section", function () {
      var touchTarget = $(this);
      timer = setTimeout(function () {
        console.log("TOUCHING ALREADY!");
        $(".album-container").removeClass("album-container-red");
        $(".add-new-album").addClass("hide");
        $(".delete-container").addClass("hide");
        $(touchTarget).find(".delete-container").removeClass("hide");
      }, 750);
    })
    .on("touchend", function () {
      console.log("TIMER CLEARED!");
      clearTimeout(timer);
    });
*/

/// DRAGGABLES LIBRARY
/*const sortable = new Sortable.default(document.querySelectorAll("ul"), {
  draggable: "li",
});

sortable.on("sortable:start", () => console.log("sortable:start"));
sortable.on("sortable:sort", () => console.log("sortable:sort"));
sortable.on("sortable:sorted", () => console.log("sortable:sorted"));
sortable.on("sortable:stop", () => console.log("sortable:stop"));


draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    console.log("success");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
}); */

/// TOUCH EVENTS LISTENERS

/*draggables.forEach((draggable) => {
  draggable.addEventListener("touchstart", () => {
    draggable.classList.add("dragging");
    console.log("successTOUCHSTART");
  });

  draggable.addEventListener("touchend", () => {
    draggable.classList.remove("dragging");
    console.log("successTOUCHEND");
  });

  draggable.addEventListener("touchmove", (e) => {
    e.preventDefault();
    console.log("successTOUCHMOVE");
    var touchLocation = e.targetTouches[0];

    draggable.style.left = touchLocation.pageX + "px";
    draggable.style.top = touchLocation.pageY + "px";
  });
}); */

// ADDS ALBUM TO DROP AREA AND REMOVES THE "RESULTS" CLASS FROM THE ALBUM CONTAINER
/*dropAreas.forEach((dropArea) => {
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    draggable.classList.remove("results");
    dropArea.appendChild(draggable);
  });
});*/
