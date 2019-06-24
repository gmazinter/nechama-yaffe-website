const renderer = new Renderer();
const mainContainer = document.querySelector("main");
const hammertime = new Hammer(mainContainer);

window.addEventListener('load', function() {
    renderer.changeLayout()
    renderer.router()
});
window.addEventListener('hashchange', renderer.router);
window.addEventListener('resize', renderer.changeLayout);

$("main").on("mouseenter mouseleave", ".painting-listing", function() {
    $(this).children("div").toggleClass("detail-card-hidden")
})

$("main").on("click", ".painting-listing", function() {
    renderer.setTargetImageIndex($(this).index())
    renderer.revealCarousel()
})

$(document).on("keydown", function(event) {
    if ($("#carousel-container").css("visibility") !== "visible") {
        return null //ignore keypress if carousel hidden
    } else if (event.which === 27) {
        renderer.hideCarousel()
    } else if (event.which === 37 || event.which === 39) {
        renderer.flipImage(event.which)
    }
})

$("main").on("click", "#carousel-left-arrow", function() {
    renderer.flipImage(37)
})

$("main").on("click", "#carousel-right-arrow", function() {
    renderer.flipImage(39)
})

hammertime.on("swipeleft", function() {
    if ($("#lightbox").css("visibility") === "visible") {
        renderer.flipImage(37)
    }
})

hammertime.on("swiperight", function() {
    if ($("#lightbox").css("visibility") === "visible") {
        renderer.flipImage(39)
    }
})

$("main").on("click", "#carousel-exit-button", function() {
    renderer.hideCarousel()
})