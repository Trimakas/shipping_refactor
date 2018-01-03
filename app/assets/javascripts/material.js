/*global $*/

var page = 0;

function zeroCard(){
    $('#first_button').click(function () {
        $('#page-' + page).addClass("hide");//.addClass("gone_left", 1000, "swing");
        $('#page-' + ++page).removeClass("hide");//.removeClass("gone_left").removeClass("gone_right");
        remainingCards();
        manageChevrons();
    });
}

function manageChevrons() {
    var left = $(".left_chevron");
    var right = $(".right_chevron");
    switch (page) {
        case 0:
            right.addClass("hide");
            left.addClass("hide");
            break;
        case 1:
            right.removeClass("hide");
            left.addClass("hide");
            break;
        case 2:
            left.removeClass("hide");
            break;
        case 7:
            left.addClass("hide");
            right.addClass("hide");
            break;
    }
}

function remainingCards(){
    $('.right_chevron i').click(function () {
        forward();
    });
    $('.left_chevron i').click(function () {
        back();
    });
}

function forward(){
    $('#page-' + page).addClass("hide");//.addClass("gone_left", 1000, "swing");
    $('#page-' + ++page).removeClass("hide");//.removeClass("gone_left").removeClass("gone_right");
    manageChevrons();
}

function back(){
    $('#page-' + page).addClass("hide");//.addClass("gone_right", 1000, "swing");
    $('#page-' + --page).removeClass("hide");//.removeClass("gone_left").removeClass("gone_right");
    manageChevrons();
}

$(document).ready(function(){
    zeroCard();

    $('#us_copy, #eu_copy').on("click", function(){
        console.log("copy clicking");
        var value = $(this).data('clipboard-text');
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(value).select();
        document.execCommand("copy");
        $temp.remove();
    })
});
