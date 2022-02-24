$("#dtBox").DateTimePicker();

$(function () {
    'use strict';
    $('#faq_box a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 120
                }, 1000);
                return false;
            }
        }
    });
});

$('#layerslider').layerSlider({
    autoStart: true,
    responsive: true,
    responsiveUnder: 1280,
    layersContainer: 1170,
    navButtons: false,
    showCircleTimer: true,
    navStartStop: false,
    skinsPath: 'layerslider/skins/'
});

$("#js-rotating").Morphext({
    animation: "fadeIn", // Overrides default "bounceIn"
    separator: ",", // Overrides default ","
    speed: 2500, // Overrides default 2000
    complete: function () {
        // Overrides default empty function
    }
});

$('.carousel_in').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    autoplay: true,
    navText: ['', ''],
    addClassActive: true,
    margin: 5,
    responsive: {
        600: {
            items: 1
        },
        1000: {
            items: 2,
            nav: true,
        }
    }
});

jQuery('#sidebar').theiaStickySidebar({
    additionalMarginTop: 80
});

jQuery('.sidebar').theiaStickySidebar({
    additionalMarginTop: 80
});