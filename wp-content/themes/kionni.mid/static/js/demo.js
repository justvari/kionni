respondToVisibility = function (element, callback, parent = null) {
    var options = {
        root: parent,
        threshold: 1,
    }

    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            callback(entry.isIntersecting > 0);
        });
    }, options);

    observer.observe(element);
}

function popup(el) {

    $(".document").toggleClass("popup-active", true);
    $(".js-popup").toggleClass("active", false);
    $(el).toggleClass("active", true).scrollTop(0);
    return;

}

function popupClose() {

    $(".js-popup").toggleClass("active", false);
    $(".document").toggleClass("popup-active", false);

    return;

}

$(".js-popup-close").click(function (e) {
    e.preventDefault();
    popupClose();
    return;
});


$("[data-popup]").click(function (e) {

    var el = $(this).data("popup");
    popup(el);

    return;


});

$(".popup-nav a").click(function(e){
    popupClose();
});

$(".s3").each(function (i) {

    var carousel = $(this).find(".carousel"),
        buttonPrev = $(this).find(".carousel-button__prev"),
        buttonNext = $(this).find(".carousel-button__next");


    new Swiper(carousel[0], {
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
            prevEl: buttonPrev[0],
            nextEl: buttonNext[0],
        },
        breakpoints: {
            1024: {
                slidesPerView: 2,
            },
        },
    });

});

new Swiper(".s7 .carousel", {
    slidesPerView: 1,
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    speed: 5000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    allowTouchMove: false,
});

const appVars = () => {
    document.documentElement.style.setProperty('--app-height', window.innerHeight + "px");
    document.documentElement.style.setProperty('--headroom-height', $("#headroom").innerHeight() + "px");
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.body.clientWidth) + "px")
}

appVars();

$(".carousel-button").on("mouseenter click", function () {
    $(this).addClass("hover").siblings().removeClass("hover");
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$.fn.parallax = function (resistance, mouse) {
    $el = $(this);
    TweenLite.to($el, 0.2, {
        x: -((mouse.clientX - window.innerWidth / 2) / resistance),
        y: -((mouse.clientY - window.innerHeight / 2) / resistance)
    });
};

var shape = $(".s1-3-1, .s6-3-1");

$(function () {

    var headroom = $("#headroom"),
        headroomPos = 0,
        scrollPosition = 0;


    $(window).on("scroll resize", function () {

        headroomPos = $("#headroom-trigger").position().top;

        var wt = $(this).scrollTop(); // + 100;

        if (wt > headroomPos) {

            if (!headroom.hasClass("init")) {
                headroom.addClass("init");
            }

            headroom.toggleClass("active", wt < scrollPosition);
            headroom.removeClass("static");

        } else {
            headroom.removeClass("active");
            headroom.addClass("static");
        }


        scrollPosition = wt;

    }).on("resize", function () {

        appVars();

    });

    shape.each(function (i) {

        if (i % 2 === 0) {
            var resistance = getRandomInt(-50, -10);
        } else {
            var resistance = getRandomInt(10, 50);
        }

        $(this).attr("data-resistance", resistance * 1);

    });

    $(document).mousemove(function (e) {

        shape.each(function (i) {

            var resistance = $(this).attr("data-resistance");
            $(this).parallax(resistance, e);

        });

    });


});
