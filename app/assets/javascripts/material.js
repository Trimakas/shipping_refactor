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
        });
        $('#page-' + ++page).removeClass("hide");

        manageChevrons();
    });

    $('.left_chevron i').click(function () {

        var c = $('#page-' + page);
        c.animateCss('slideOutRight', function () {
            c.addClass("hide");
        });
        $('#page-' + --page).removeClass("hide");

        manageChevrons();
    });
}

$(document).ready(function(){
    zeroCard();

    $('.us_copy, .eu_copy').on("click", function(){

        var value = $(this).data('clipboard-text');
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(value).select();
        document.execCommand("copy");
        $temp.remove();
    });

    $('#add_account').on('click', function (){
        var last = $('.credential').last();
        var credential = last.clone();
        credential.find('input').val("");

        last.after(credential);
        credential.animateCss('slideInDown', function () {
            var removes = $('.remove');
            if(removes.size() === 1){
                removes.addClass('hide');
            }else{
                removes.removeClass('hide');
            }
        });

    });

    $(this).on('click', '.remove', function (){
        var credential = $(this).parent();
        credential.nextAll('.credential, .bottom-card').animateCss('slideOutUp', function () {
            credential.remove();
            var removes = $('.remove');
            if(removes.size() === 1){
                removes.addClass('hide');
            }else{
                removes.removeClass('hide');
            }
        });
    });
});
