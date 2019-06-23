const renderer = new Renderer();
const mainContainer = document.getElementById("main");
const hammerTime = new Hammer(mainContainer);

function router() {
    switch(location.hash) {
        case '':
            renderer.renderNavButton('Home')
            renderer.renderHome()
            break;
        case '#/home':
            renderer.renderNavButton('Home')
            renderer.renderHome()
            break;
        case '#/paintings':
            renderer.renderNavButton('Paintings')
            renderer.renderPaintings(paintings)
            renderer.renderCarousel(paintings)
            break;
        case '#/contact':
            renderer.renderNavButton('Contact')
            renderer.renderContact()
    }
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router);

$("main").on("mouseenter mouseleave", ".painting-listing", function() {
    $(this).children("div").toggleClass("detail-card-hidden")
})

$("main").on("click", ".painting-listing", function() {
    console.log("painting clicked")
    renderer.setTargetImageIndex($(this).index())
    renderer.revealSingleCarouselImage()
})

$(document).on("keydown", function(event) {
    if ($("#carousel-container").css("visibility") !== "visible") {
        return null //ignore keypress if carousel hidden
    } else if (event.which === 27) {
        renderer.toggleCarouselVisibility()
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

hammerTime.on("swipeleft", function() {
    if ($("#lightbox").css("visibility") === "visible") {
        renderer.flipImage(37)
    }
})

hammerTime.on("swiperight", function() {
    if ($("#lightbox").css("visibility") === "visible") {
        renderer.flipImage(39)
    }
})

$("main").on("click", "#carousel-exit-button", function() {
    renderer.toggleCarouselVisibility()
})