/*global $*/

$(document).ready(function(){
  zeroCard();
});

var page = 0;

function zeroCard(){
  $('#first_button').click(function () {
    $('#' + page).addClass( "gone_left", 1000, "swing" );
    page = page + 1;
    $('#' + page).removeClass("hidden");
    remainingCards();
    manageChevrons();
  });
}

function manageChevrons() {
  switch (page) {
    case 1:
      $("#chevron_right").removeClass("hidden");
      $("#chevron_left").addClass("hidden");
      break;
    case 2:
      $("#chevron_left").removeClass("hidden");
      break;
    case 7:
      $("#chevron_left").addClass("hidden");
      $("#chevron_right").addClass("hidden");
      $('#last_onboard_page').removeClass('hidden');
      break;
  }
}

function remainingCards(){
  $('#chevron_right').click(function () {
    forward();
  });
  $('#chevron_left').click(function () {
    back();
  });
}

function forward(){
  $('#' + page).addClass( "gone_left", 1000, "swing" );
  page = page + 1;
  $('#' + page).removeClass("gone_left gone_right");
  manageChevrons();
}

function back(){
  $('#' + page).addClass( "gone_right", 1000, "swing");
  page = page - 1;
  $('#' + page).removeClass("gone_left gone_right");
  manageChevrons();
}

$(document).ready(function(){
    $('#us_copy, #eu_copy').on("click", function(){
        console.log("copy clicking");
        var value = $(this).data('clipboard-text');
        var $temp = $("<input>");
          $("body").append($temp);
          $temp.val(value).select();
          document.execCommand("copy");
          $temp.remove();
    })
})
