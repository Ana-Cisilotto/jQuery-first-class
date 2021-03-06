var refreshTime = $("#typingTimer").text();
var area = $(".typingArea");

$(function () {
  refreshPhrase();
  startsAmountCount()
  startsTimer();
  correctionSync();
  $("#refreshButton").click(restartGame);  
   
});

function refreshPhrase() {
  var phrase = $(".phrase").text();
  var numOfWords = phrase.split(" ").length;
  var phraseLength = $("#phraseLength");
  phraseLength.text(numOfWords);
}

function startsAmountCount() {
  area.on("input", function () {
    var content = area.val();
    var wordsAmount = content.split(/\S+/).length - 1;
    $("#wordAmount").text(wordsAmount);
    var lettersAmount = content.length;
    $("#letterAmount").text(lettersAmount);
  });
}

function startsTimer() {
  var timeLeft = $("#typingTimer").text();
  area.one("focus", function () {
    $("#refreshButton").attr("disabled", true);
    var timeStop = setInterval(function () {
      timeLeft--;
      $("#typingTimer").text(timeLeft);
      if (timeLeft < 1) {        
      clearInterval(timeStop);
      gameOver();
      }
    }, 1000);
  });
}

function gameOver(){

  area.attr("disabled", true);
  area.toggleClass("areaDeactivated");
  $("#refreshButton").attr("disabled", false);
  boardInsert();
}

function correctionSync(){

  var phrase = $(".phrase").text();
  area.on("input",function(){
    var typed = area.val();
    var typingSync = phrase.substr(0,typed.length);
    if(typed == typingSync){
      area.addClass("correctSync");
      area.removeClass("incorrectSync");
    }else{
      area.addClass("incorrectSync");
      area.removeClass("correctSync");
    }
  });

}

function boardInsert(){    
    var scoringBoard = $(".scoreBoard").find("tbody");
    var playerName = "Anna";
    var numOfWords = $("#wordAmount").text();

    var boardRow = newRow(playerName, numOfWords);
    boardRow.find(".rowEreaser").click(eraseRow);
    
    //"<tr>"+
    //                  "<td>"+ playerName + "</td>"+
    //                  "<td>"+ numOfWords + " words" + "</td>"+
    //                  "<td>"+ rowEreaser + "</td>"+
    //              "</tr>";

  scoringBoard.prepend(boardRow); }


function newRow(player, words){
  var lineRow = $("<tr>");
  var playerRow = $("<td>").text(player);
  var wordsRow = $("<td>").text(words);
  var rowDeleter = $("<td>");

  var  buttonLink = $("<a>").addClass("rowEreaser").attr("href","#");
  var buttonIcon = $("<i>").addClass("small").addClass("material-icons").text("delete");

  buttonLink.prepend(buttonIcon);
  rowDeleter.append(buttonLink);

  lineRow.append(playerRow);
  lineRow.append(wordsRow);
  lineRow.append(rowDeleter);

  return lineRow;

  console.log(buttonLink);

}

function eraseRow() {
    event.preventDefault(); 
    $(this).parent().parent().remove();}



function restartGame() {
    $("#refreshButton").click(function() {
    area.attr("disabled", false);
    area.val("");
    $("#wordAmount").text("0");
    $("#letterAmount").text("0");
    $("#typingTimer").text(refreshTime);
    startsTimer();
    area.toggleClass("areaDeactivated");
    area.removeClass("correctSync");
    area.removeClass("incorrectSync");
  });
}
