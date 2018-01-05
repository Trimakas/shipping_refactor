/*global $*/

var page = 0;

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

function zeroCard(){
    $('#first_button').click(function () {
        var c = $('#page-' + page);
        c.animateCss('slideOutLeft', function () {
            c.addClass("hide");
        });
        $('#page-' + ++page).removeClass("hide");

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

        var c = $('#page-' + page);
        c.animateCss('slideOutLeft', function () {
            c.addClass("hide");
            console.log("slideOutLeft hide " + c.attr('id'));
        });
        $('#page-' + ++page).removeClass("hide");
        console.log("show " + '#page-' + page);

        manageChevrons();
    });

    $('.left_chevron i').click(function () {

        var c = $('#page-' + page);
        c.animateCss('slideOutRight', function () {
            c.addClass("hide");
            console.log("slideOutRight hide " + c.attr('id'));
        });
        $('#page-' + --page).removeClass("hide");
        console.log("show " + '#page-' + page);

        manageChevrons();
    });
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
