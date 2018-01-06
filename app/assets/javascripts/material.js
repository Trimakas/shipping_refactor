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

function generate() {
    var block = $('.continents ul');

    for (var continent in continents) {
        // skip loop if the property is from prototype
        if (!continents.hasOwnProperty(continent)) continue;

        var countries = continents[continent];

        var string_c = "<li class=\"col s12 continent "+continent+"\">" +
            "                <div class=\"col s10 m11\">" +
            "                    <input class=\"continent-checkbox filled-in\" type=\"checkbox\" id=\""+continent+"\"/>" +
            "                    <label for=\""+continent+"\">"+continent+"</label>" +
            "                </div>";
        if(countries.length !== 0)
            string_c += "                <div class=\"col s1 m1 collapsible-header\">" +
                        "                    <span><i class=\"fa fa-arrow-down fa-lg\"></i></span>" +
                        "                </div>";

        var string = "<div class=\"col s12 collapsible-body\">";
        for (var country in countries){

            if (!countries.hasOwnProperty(country)) continue;

            country = countries[country];
            var country_name = country.name.toLowerCase().replace(' ', '-');

            string += "<div class=\"col s11 offset-s1 country "+country_name+"\">" +
                            "<input class=\"country-checkbox\" type=\"checkbox\" id=\""+country_name+"\"/>" +
                            "<label for=\""+country_name+"\">"+country.emoji + "&nbsp;&nbsp;&nbsp;&nbsp;" + country.name+"</label>" +
                        "</div>";
        }
        string_c += string + "</div></li>";

        block.append(string_c);
    }
}

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
    // generate();

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

    $('#countries').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            // startingTop: '4%', // Starting top style attribute
            // endingTop: '10%', // Ending top style attribute
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

            },
            complete: function() { // Callback for Modal close

            }
        }
    );
    $('#cancel, #add').on('click', function (e) {
        e.preventDefault();
        $('#countries').modal('close');
    });

    $('.collapsible-header').on('click', function () {
        var i = $(this).find('i');
        if(i.hasClass('fa-arrow-down')){
            i.removeClass('fa-arrow-down').addClass('fa-arrow-up');
        }else{
            i.removeClass('fa-arrow-up').addClass('fa-arrow-down');
        }
    });

    $('.continent-checkbox').on('change', function () {
        $(this).parent().parent().find('.country-checkbox').prop('checked', this.checked);
    });

    $('.collapsible').collapsible({
        accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        onOpen: function(el) { console.log('Open'); }, // Callback for Collapsible open
        onClose: function(el) { console.log('Closed'); } // Callback for Collapsible close
    });
});
