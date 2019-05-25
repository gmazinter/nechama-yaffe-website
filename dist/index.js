const renderer = new Renderer();

window.addEventListener('load', renderer.router)
window.addEventListener('hashchange', renderer.router);

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