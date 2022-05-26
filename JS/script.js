/////   !! SELECTORS!!    /////

// FULL LIST OF PLAYLISTS //

var allPlaylists = document.getElementById("full-list");
// ADD AND DELETE SECTION ELEMENTS
var addSectionSection = document.getElementById("add-section-spot");
var deleteSectionButton = document.querySelector(".btn.delete-section");

// SEARCH BAR INPUT
var searchBar = document.getElementById("main-search-bar");
var searchBtn = document.getElementById("searchBtn");
var mainBodySearchBar = document.querySelector(".main-body-section.search-bar");

// DRAGGABLE ELEMENTS
const draggables = document.querySelectorAll(".album-container");
const draggable = document.querySelector(".album-container");
const dropAreas = document.querySelectorAll(".main-row.two.drop");
const dropArea = document.querySelector(".main-row.two.drop");
const newDropArea = document.getElementById("dropAreaNew");
const albumContainerResults = document.querySelector(".album-container");

// ALBUM RESULTS
var albumResults = document.querySelector(".album-container.results");
var albumResultsAll = document.querySelectorAll(".album-container.results");
var albumResultSelected;
var addNewAlbumDashedAll = document.querySelectorAll(".add-new-album");
var addNewAlbumDashed = document.querySelector(".add-new-album");

// POP UP MENU

var playlistNames = document.querySelectorAll(".time-period.name");
var menuListItems = document.querySelectorAll(".menu-list-item");

var playlistNamesArray = Array.from(playlistNames);
var menuListItemsArray = Array.from(menuListItems);
var popUpMenu = document.querySelector(".pop-up-container");

//DOWNLOAD STUFF
var downloadBtn = document.getElementById("downloadBtn");

// REMOVE SECTION BUTTON
var removeSectionBtn = document.getElementById("deleteSectionBtn");

// API ELEMENTS
const apiUrlArtist =
  "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=";
const apiUrlAlbum =
  "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?a=";
var artistName;
var albumName;
var mainSearchBar = document.getElementById("main-search-bar");
var searchResults = document.querySelector(".main-row.two.results");
var searchDropDown = document.getElementById("dropdown.category");
var searchDropDown = document.getElementById("dropdown");

/////   !! SORTABLES LIBRARY STUFF !!    /////
var sortable = new Sortable(allPlaylists, {
  animation: 150,
  easing: "cubic-bezier(1, 0, 0, 1)",
  ghostClass: "sortable-ghost", // Class name for the drop placeholder
  chosenClass: "sortable-chosen", // Class name for the chosen item
  dragClass: "sortable-drag", // Class name for the dragging item
  touchStartThreshold: 4,
  delay: 200,
});

///// FUNCTIONS TO UPDATE THE COLOR THEME WHEN A NEW COLOR IS CHOSEN //////

var buttonOne = document.getElementById("button-one");

/////   !! FUNCTIONS CALLED EACH TIME A NEW SEARCH IS MADE !!    /////

// FUNCTION TO REMOVE THE PREVIOUS SEARCH RESULTS AND HIDE "RESULTS" HEADER
function resetSearchStyles(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  var resultsText = document.getElementById("results");
  resultsText.classList.add("hide");

  mainBodySearchBar.classList.remove("add-padding");
}

/// FUNCTION THAT READS DROPDOWN VALUE AND CALLS ARTIST OR ALBUM FUNCTION BASED ON VALUE

//FUNCTION CALLED ON SEARCH BUTTON CLICK (CREATES LIST OF ALBUM RESULTS BASED ON USER INPUT)
async function getDataArtist() {
  var userInput = mainSearchBar.value;
  var artistNameRemoveEndSpace = userInput.trimEnd();
  var artistName = artistNameRemoveEndSpace.split(" ").join("_");
  console.log(artistName);
  var fullApiUrl = apiUrlArtist + artistName;
  console.log(fullApiUrl);
  const response = await fetch(fullApiUrl);
  const data = await response.json();

  resetSearchStyles(searchResults);

  //IF THE ALBUM HAS AN IMAGE AND IS CATEGORIZED AS AN ALBUM, ADD IT TO THE RESULTS
  if (data.album == null) {
    var parent = document.querySelector(".main-row.two.results");
    parent.insertAdjacentHTML(
      "beforeend",
      "<div class='no-search-results'>Oops. No results. Please try again.</div>"
    );

    mainBodySearchBar.classList.add("add-padding");
  } else {
    var resultsText = document.getElementById("results");

    resultsText.classList.remove("hide");

    mainBodySearchBar.classList.add("add-padding");

    for (let i = 0; i < data.album.length; i++) {
      var parent = document.querySelector(".main-row.two.results");
      if (
        data.album[i].strAlbumThumb &&
        data.album[i].strReleaseFormat == "Album"
      ) {
        parent.insertAdjacentHTML(
          "beforeend",
          `<div class="album-container results"><div class="album"><img class="img album" src="${data.album[i].strAlbumThumb}"/></div></div>`
        );
      } else {
      }
    }
  }
}

// THIS IS NOT WORKING BECAUSE THE SITE API IS DOWN FOR THIS SPECIFIC SEARCH CALL
async function getDataAlbum() {
  var userInput = mainSearchBar.value;
  var albumNameRemoveEndSpace = userInput.trimEnd();
  var albumName = albumNameRemoveEndSpace.split(" ").join("_");
  console.log(albumName);
  var fullApiUrl = apiUrlAlbum + albumName;
  console.log(fullApiUrl);
  const response = await fetch(fullApiUrl);
  const data = await response.json();

  resetSearchStyles(searchResults);

  //IF THE ALBUM HAS AN IMAGE AND IS CATEGORIZED AS AN ALBUM, ADD IT TO THE RESULTS
  for (let i = 0; i < data.album.length; i++) {
    var parent = document.querySelector(".main-row.two.results");
    if (
      data.album[i].strAlbumThumb &&
      data.album[i].strReleaseFormat == "Album"
    ) {
      parent.insertAdjacentHTML(
        "beforeend",
        `<div class="album-container"><div class="album"><img class="img album" src="${data.album[i].strAlbumThumb}"/></div></div>`
      );
    } else {
    }
  }
}

// CHANGE DOWNLOAD BUTTON TEXT ON CLICK //

function changeText() {}

function updateTheme(color) {
  var theme = color;
  app.setAttribute("data-theme", theme);
}
//. JQUERY //

$(document).ready(function () {
  //DISABLE SAVE CHANGES BUTTON
  $(".btn-save-changes").prop("disabled", true);

  //ENABLE SAVE BUTTON ONCE USER ENTERS PLAYLIST NAME
  $("body").on("keyup", ".user-playlist-name", function () {
    if ($(this).val() != "") {
      $(".btn-save-changes").prop("disabled", false);
    }
  });

  /////   !! FUNCTION THAT ADDS SECTION ON BUTTON CLICK !!    /////

  // Create variable that represents the number of card_playlists
  // If the variable is even, then add a card_playlist with light style ... else add one with normal style

  var number_of_playlist;

  number_of_playlist = 1;

  var appendCardPlaylist =
    '<li class="card-playlist colored"><div class="pop-up-delete-container hide"><div class="title-set-container"><div class="playlist-title">Delete Playlist?</div></div><div class="yes-no-container"><div class="yes-delete-container"><button class="btn-delete yes-delete" id="yes-delete">Yes</button></div><div class="no-delete-container"><button class="btn-delete no-delete" id="no-delete">No</button></div></div></div><div class="pop-up-edit-container hide"><div class="title-set-container"><div class="playlist-title">Playlist Title</div><form class="main-search-bar-form edit-playlist"><input    type="text" id="main-search-bar" class="user-playlist-name" placeholder="Name your playlist..." /></form></div><div class="time-period-set-container"><div class="playlist-time-period">Time Period</div><form class="main-search-bar-form edit-playlist"><input type="text" id="main-search-bar" class="user-playlist-time "placeholder="Add a time period..." /></form></div><div class="edit-buttons-container"><div class="save-changes-container"><button class="btn-save-changes">Save Changes</button></div><div class="cancel-changes-container"><button class="btn-cancel-changes">Cancel</button></div></div></div></div><section class="main-body-section"><div class="main-body-section-content"><div class="content-container all"><div class="content-container"><div class="main-row one"><div class="playlist-information-container"><div class="time-period-box left"><div contenteditable="true" class="time-period name">Add a Name</div></div><div class="time-period-box right"><div contenteditable="true" class="time-period numbers">Add a Time Period</div></div></div><div class="edit-delete-container"><div class="edit-container"><button class="edit-icon" id="edit"><i class="ph-pencil-bold"></i></button></div><div class="delete-container"><button class="delete-icon" id="delete"><i class="ph-trash-bold"></i></button></div></div></div><div class="main-row two drop" class="drop-area"><div class="add-new-album hide"><div class="plus-container"><button type="button" class="btn-add-new-album"><i class="ph-plus"></i></button></div></div></div></div></div></div></section></li>';

  var appendCardPlaylistLight =
    '<li class="card-playlist colored light"><div class="pop-up-delete-container hide"><div class="title-set-container"><div class="playlist-title">Delete Playlist?</div></div><div class="yes-no-container"><div class="yes-delete-container"><button class="btn-delete yes-delete" id="yes-delete">Yes</button></div><div class="no-delete-container"><button class="btn-delete no-delete" id="no-delete">No</button></div></div></div><div class="pop-up-edit-container hide"><div class="title-set-container"><div class="playlist-title">Playlist Title</div><form class="main-search-bar-form edit-playlist"><input    type="text" id="main-search-bar" class="user-playlist-name" placeholder="Name your playlist..." /></form></div><div class="time-period-set-container"><div class="playlist-time-period">Time Period</div><form class="main-search-bar-form edit-playlist"><input type="text" id="main-search-bar" class="user-playlist-time "placeholder="Add a time period..." /></form></div><div class="edit-buttons-container"><div class="save-changes-container"><button class="btn-save-changes">Save Changes</button></div><div class="cancel-changes-container"><button class="btn-cancel-changes">Cancel</button></div></div></div></div><section class="main-body-section"><div class="main-body-section-content"><div class="content-container all"><div class="content-container"><div class="main-row one"><div class="playlist-information-container"><div class="time-period-box left"><div contenteditable="true" class="time-period name">Add a Name</div></div><div class="time-period-box right"><div contenteditable="true" class="time-period numbers">Add a Time Period</div></div></div><div class="edit-delete-container"><div class="edit-container"><button class="edit-icon" id="edit"><i class="ph-pencil-bold"></i></button></div><div class="delete-container"><button class="delete-icon" id="delete"><i class="ph-trash-bold"></i></button></div></div></div><div class="main-row two drop" class="drop-area"><div class="add-new-album hide"><div class="plus-container"><button type="button" class="btn-add-new-album"><i class="ph-plus"></i></button></div></div></div></div></div></div></section></li>';

  // UPDATE THEM WHEN NEW COLOR IS SELECTED //

  var buttonOne = document.getElementById("button-one");
  var buttonTwo = document.getElementById("button-two");
  var buttonThree = document.getElementById("button-three");
  var buttonFour = document.getElementById("button-four");
  var buttonFive = document.getElementById("button-five");

  $(buttonOne).on("click", function () {
    var app = document.getElementById("app");
    app.setAttribute("data-theme", "red");
  });

  $(buttonTwo).on("click", function () {
    var app = document.getElementById("app");
    app.setAttribute("data-theme", "blue");
  });

  $(buttonThree).on("click", function () {
    var app = document.getElementById("app");
    app.setAttribute("data-theme", "orange");
  });

  $(buttonFour).on("click", function () {
    var app = document.getElementById("app");
    app.setAttribute("data-theme", "green");
  });

  $(buttonFive).on("click", function () {
    var app = document.getElementById("app");
    app.setAttribute("data-theme", "grey");
  });

  // OPEN COLOR PALETTE MENU //

  var colorMenuOpen = document.getElementById("open-color-menu");
  var colorPaletteContainer = document.getElementById(
    "color-palette-container"
  );
  var colorPickerButton = document.querySelectorAll(".color-picker-button");
  var color = document.querySelectorAll(".color");

  $(colorMenuOpen).on("click", function () {
    $(".pop-up-edit-container").addClass("hide");
    $(".pop-up-delete-container").addClass("hide");

    if ($(this).hasClass("clicked")) {
      $(colorPaletteContainer).addClass("hide");
      $(this).removeClass("clicked");
    } else {
      $(colorPaletteContainer).removeClass("hide");
    }
  });

  $("body").on("click", function (e) {
    if (
      !$(e.target).is(colorPaletteContainer) &&
      !$(e.target).is(colorMenuOpen) &&
      !$(e.target).is(colorPickerButton) &&
      !$(e.target).is(color)
    )
      $(colorPaletteContainer).addClass("hide");
    $(colorMenuOpen).removeClass("clicked");
  });

  // SHOW "CLEAR SEARCH" BUTTON WHEN SEARCH STARTS

  $("#main-search-bar").on("keyup", function () {
    var searchValue = document.getElementById("main-search-bar").value;
    if (
      searchValue.length > 0 ||
      $(mainBodySearchBar).hasClass("add-padding")
    ) {
      $("#btn-clear-search").addClass("visible");
    } else if (
      searchValue.length == 0 &&
      !$(mainBodySearchBar).hasClass("add-padding")
    ) {
      $("#btn-clear-search").removeClass("visible");
    }
  });

  $("#btn-clear-search").on("click", function () {
    resetSearchStyles(searchResults);
    $("#main-search-bar").val("");
    $("#btn-clear-search").removeClass("visible");
  });

  // REMOVE DELETE BUTTON WHEN CLICK ELSEWHERE
  $("#searchBtn").on("click", function () {
    getDataArtist();
  });

  $("#addSectionBtn").on("click", function () {
    addSection();
  });

  $("body").on("click", function () {
    if (!$(this).hasClass("red-background")) {
      $(".card-playlist").removeClass("red-background");
    }
  });

  // ADD ALBUM CONTAINER RED CLASS ON TOUCH HOLD

  // DISPLAY EDIT PLAYLIST BOX WHEN BUTTON CLICKED

  $("body").on("click", ".edit-icon", function () {
    var cardPlaylistHeight = $(this).parents(".card-playlist").height();
    var popUpContainerHeight = $(".pop-up-edit-container").height();

    console.log(cardPlaylistHeight);

    console.log(popUpContainerHeight);

    $(".btn-save-changes").prop("disabled", true);
    $(".pop-up-edit-container").not($(this)).addClass("hide");
    $(".pop-up-delete-container").addClass("hide");

    $(this)
      .parents(".card-playlist")
      .find(".pop-up-edit-container")
      .removeClass("hide");

    if (cardPlaylistHeight > popUpContainerHeight) {
      $(this)
        .parents(".card-playlist")
        .find(".pop-up-edit-container")
        .addClass("strecthToFit");
    }
  });

  $("body").on("click", ".delete-icon", function () {
    $(".pop-up-edit-container").removeClass("strecthToFit");
    $(".pop-up-delete-container").not($(this)).addClass("hide");
    $(".pop-up-edit-container").addClass("hide");
    console.log($(this));
    console.log("clicked bitch");
    $(this)
      .parents(".card-playlist")
      .find(".pop-up-delete-container")
      .removeClass("hide");
  });

  // UPDATE FOOTER COLOR BASED ON THE NUMBER OF PLAYLIST CARDS

  function updateFooter() {
    console.log(number_of_playlist);
    if (number_of_playlist % 2 == 0) {
      $(".footer").css("background-color", "var(--secondary-color)");
    } else {
      $(".footer").css("background-color", "var(--primary-color)");
    }
  }

  // DELETE CARD PLAYLIST WHEN "YES - DELETE" BUTTON IS CLICKED

  var confirmDelete = document.querySelectorAll(".yes-delete");
  var cancelDelete = document.querySelectorAll(".no-delete");

  $("body").on("click", ".yes-delete", function () {
    number_of_playlist = number_of_playlist - 1;
    console.log(number_of_playlist);
    updateFooter();

    $(".delete-icon").removeClass("clicked");
    console.log("yasss queen");
    console.log($(this).closest(".card-playlist"));
    $(this).closest(".card-playlist").remove();
    $(".pop-up-delete-container").addClass("hide");
  });

  $("body").on("click", ".no-delete", function () {
    $(".delete-icon").removeClass("clicked");
    console.log("nooo queen");
    $(".pop-up-delete-container").addClass("hide");
  });

  //// FUNCTION THAT UPDATES THE PLAYLIST INFORMATION BASED ON USER INPUT ////

  $("body").on("click", ".btn-save-changes", function () {
    $(".pop-up-edit-container").removeClass("clicked");
    $(".pop-up-edit-container").removeClass("strecthToFit");

    console.log("clicked boi");

    var userInputName = $(this)
      .parents(".card-playlist")
      .find($(".user-playlist-name"));

    var userInputTime = $(this)
      .parents(".card-playlist")
      .find($(".user-playlist-time"));

    var userPlaylistNameValue = $(userInputName).val();
    var userPlaylistTimeValue = $(userInputTime).val();
    console.log(userPlaylistNameValue);
    console.log(userPlaylistTimeValue);

    var nameToUpdate = $(this)
      .parents(".card-playlist")
      .find($(".time-period.name"));

    var timeToUpdate = $(this)
      .parents(".card-playlist")
      .find($(".time-period.numbers"));

    $(nameToUpdate).html(userPlaylistNameValue);
    $(timeToUpdate).html(userPlaylistTimeValue);
    $(".btn-save-changes").prop("disabled", true);
    $(".pop-up-edit-container").addClass("hide");
  });

  /// FUNCTION THAT HANDLES CANCEL CHANGES (ADD THE HIDE CLASS / CLEAR THE INPUT BARS / DISABLE THE SAVE CHANGES BUTTON)

  $("body").on("click", ".btn-cancel-changes", function () {
    $(".btn-save-changes").prop("disabled", true);
    $(".pop-up-edit-container").removeClass("strecthToFit");

    var userInputName = $(this)
      .parents(".card-playlist")
      .find($(".user-playlist-name"));

    var userInputTime = $(this)
      .parents(".card-playlist")
      .find($(".user-playlist-time"));

    userInputName.val("");
    userInputTime.val("");

    $(".pop-up-edit-container").removeClass("clicked");
    $(".pop-up-edit-container").addClass("hide");
  });

  /// FUNCTION THAT CLOSES EDIT CONTAINER AND DELETE CONTAINER WHEN CLICK OUTSIDE OF THOSE CONTAINERS

  function addSection() {
    $(".pop-up-delete-container").addClass("hide");
    $(".pop-up-edit-container").addClass("hide");

    number_of_playlist = number_of_playlist + 1;

    updateFooter();

    if (number_of_playlist % 2 == 0) {
      $("#full-list").append(appendCardPlaylistLight);
    } else {
      $("#full-list").append(appendCardPlaylist);
    }
  }

  // DELETE ALBUM ON TOUCH IF HAS CLASS ALBUM-CONTAINER-RED // IF TOUCH ALBUM-CONTAINER WITH NO ALBUM-CONTAINER-RED CLASS THEN REMOVE ALL ALBUM-CONTAINER-RED CLASSES AND REMOVE ALL ADD-NEW-ALBUM CLASSES

  $("body").on(
    "click",
    ".album-container:not(.album-container.results)",
    function () {
      var thisAlbum = $(this).closest($(".album-container"));
      var thisAddNewAlbum = $(this).closest($(".add-new-album"));
      console.log("clicked bitch");
      if ($(this).closest(".album-container").hasClass("album-container-red")) {
        console.log("already has red class");
        $(this).closest(".album-container").remove();
        $(".add-new-album").addClass("hide");
      } else {
        $(thisAlbum).addClass("album-container-red");
        $(".album-container").not(thisAlbum).removeClass("album-container-red");
        $(".add-new-album").not(thisAlbum.siblings()).removeClass("hide");
        $(thisAlbum).siblings(".add-new-album").addClass("hide");
        $(thisAddNewAlbum).addClass("hide");
      }
    }
  );

  /////   !! ADD GREEN BORDER TO ALBUM RESULT WHEN CLICKED ON !!    /////

  /// WHEN AN ALBUM CONTAINER RESULTS IS CLICKED, BORDER TURNS GREEN AND DASHED "ADD NEW ALBUM" BOXES APPEAR
  // ONLY ALLOW ONE ALBUM TO HAVE GREEN BORDER AT ONCE
  $("body").on("click", ".album-container.results", function () {
    if ($(this).hasClass("album-container-green")) {
      $(this).removeClass("album-container-green");
    } else {
      $(".album-container.results")
        .not(this)
        .removeClass("album-container-green");
      $(".album-container.results").not(this).addClass("light-opacity");
      $(this).addClass("album-container-green");
      $(".add-new-album").removeClass("hide");
    }
  });

  /// WHEN A DASHED "ADD NEW ALBUM" BOX IS CLICKED, THE GREEN ALBUM(S) ARE APPENDED, GREEN BORDER GETS REMOVED FROM ALL
  /// ALBUMS, AND THE DASHED "ADD NEW ALBUMS" BOXES GO HIDDEN AGAIN
  $("body").on("click", ".add-new-album", function () {
    console.log("the dashed album was clicked");
    $(".album-container.results.album-container-green").insertBefore($(this));
    $(".album-container.album-container-red").insertBefore($(this));
    $(".add-new-album").addClass("hide");
    $(".album-container.results").removeClass("album-container-green");
    $(this).siblings().removeClass("results");
  });

  /// WHEN USER CLICKS OUTSIDE OF GREEN OR RED ALBUM, THE HIGHLIGHT DISAPPEARS
  $(document).on("click", function (e) {
    if ($(e.target).is(".album") === false) {
      $(".album-container").removeClass("album-container-green");
      $(".album-container").removeClass("album-container-red");
      $(".album-container").removeClass("light-opacity");
      $(".add-new-album").addClass("hide");
    }

    if ($(e.target).parent().parent().is(".album-container-green") === false) {
      $(".album-container").removeClass("album-container-green");
    }

    if ($(e.target).parent().parent().is(".album-container-red") === false) {
      $(".album-container").removeClass("album-container-red");
    }
  });

  // TOUCH SLIDE TO DELETE SECTIONS

  /*$("body").on("touchstart", ".card-playlist", function () {
    var eventTarg = $(this);
    $(function () {
      //Enable swiping...
      $("body").swipe({
        //Single swipe handler for left swipes
        swipeLeft: function (
          event,
          direction,
          distance,
          duration,
          fingerCount
        ) {
          $(eventTarg).addClass("red-background");
          $(".card-playlist").not(eventTarg).removeClass("red-background");
          $(".album-container").removeClass("album-container-red");
          $(".album-container.results").removeClass("album-container-green");
          $(".add-new-album").addClass("hide");
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 200,
      });
    });
  });*/

  $("body").on("click", ".card-playlist", function () {
    if ($(this).hasClass("red-background")) {
      $(this).remove();
      $(".add-new-album").addClass("hide");
    }
  });

  // TAKE SCREENSHOT OF PLAYLISTS AND SAVE FILE
  $(downloadBtn).click(function () {
    $(this).text("Downloading...");
    domtoimage.toBlob(allPlaylists).then(function (blob) {
      window.saveAs(blob, "myMusicMap.png");
    });

    setTimeout(function () {
      $(downloadBtn).text("Download");
    }, 5000);
  });

  $(searchBar).keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      searchBtn.click();
    }
  });
});
