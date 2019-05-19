// ------------------- functions ----------------------------------------

function flipImage(direction) {
    if (direction === 37) {
        console.log("left")
    } else if (direction === 39) {
        console.log("right")
    }
}

function renderPaintings(paintings) {
    $("main").empty()
    const source = $("#gallery-item-template").html()
    const template = Handlebars.compile(source)
    $("main").append(template({ paintings }))
}

function unhideSingleCarouselImage(fileName) {
    const enlargedImages = $("body").find(".enlarged-painting")
    enlargedImages.each(function() {
        `${fileName}-enlarged` === this.id ? $(this).toggleClass("enlarged-painting-hidden") : null
    })
}

function renderCarousel(fileName, paintings) {
    const source = $("#carousel-template").html()
    const template = Handlebars.compile(source)
    const context = { paintings }
    $("body").append(template(context))
    unhideSingleCarouselImage(fileName)
}


// ------------------- function calls and event listeners ------------------
$(document).ready(renderPaintings(paintings))

$(".painting-listing").on("mouseenter mouseleave", function() {
    $(this).children("div").toggleClass("detail-card-hidden")
})

$(".painting-listing").on("click", function() {
    const fileName = $(this).children("img").attr("id")
    renderCarousel(fileName, paintings)
})

$(document).on("keydown", function(event) {
    const carouselBool = $("#carousel").length
    if (!carouselBool) { return null } //ignore keypress if carousel not rendered
    flipImage(event.which)
})