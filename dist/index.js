
// ------------------- variables ----------------------------------------
let enlargedImages
let currentEnlarged
let targetImageIndex

// ------------------- functions ----------------------------------------

const router = function() {
    switch(location.hash) {
        case '#/home':
            console.log("render home")
            renderHome()
            break;
        case '#/paintings':
            console.log("render paintings")
            renderPaintings(paintings)
            renderCarousel(paintings)
            break;
        case '#/contact':
            console.log("render contact")
    }
}

function renderHome() {
    $("main").empty()
    $("main").append('<img id="main-painting" src="main_painting.jpg" alt="canvas painting"></img>')
    
}

function renderPaintings(paintings) {
    $("main").empty()
    const source = $("#gallery-item-template").html()
    const template = Handlebars.compile(source)
    $("main").append(template({ paintings }))
}

function renderCarousel(paintings) {
    const source = $("#carousel-template").html()
    const template = Handlebars.compile(source)
    const context = { paintings }
    $("main").append(template(context))
    enlargedImages = $("main").find(".enlarged-painting")
    // enlargedImages.first().toggleClass("enlarged-painting-hidden")
}

function revealSingleCarouselImage(imageIndex) {
    currentEnlarged = enlargedImages.eq(imageIndex)
    currentEnlarged.toggleClass("enlarged-painting-hidden")
    $("#carousel-container").css("visibility", "visible")
}

function flipImage(direction) {
    if (direction === 37) {
        console.log("left")
        currentEnlarged.toggleClass("enlarged-painting-hidden") // hide current image
        targetImageIndex = enlargedImages.eq(targetImageIndex).prev().index() // decrement index
        console.log(targetImageIndex)
        currentEnlarged = enlargedImages.eq(targetImageIndex) // point to new current image
        currentEnlarged.toggleClass("enlarged-painting-hidden") // reveal new current image
    } else if (direction === 39) {
        console.log("right")
        currentEnlarged.toggleClass("enlarged-painting-hidden") // hide current image
        targetImageIndex !== (enlargedImages.length - 1) && targetImageIndex !== -1
            ? targetImageIndex = enlargedImages.eq(targetImageIndex).next().index()// increment index
            : targetImageIndex = 0
        console.log(targetImageIndex)
        currentEnlarged = enlargedImages.eq(targetImageIndex) // point to new current image
        currentEnlarged.toggleClass("enlarged-painting-hidden") // reveal new current image
    }
}

// ------------------- function calls and event listeners ------------------
window.addEventListener('load', router)
window.addEventListener('hashchange', router);

// $(document).ready(renderPaintings(paintings))
// $(document).ready(renderCarousel(paintings))

$(".painting-listing").on("mouseenter mouseleave", function() {
    $(this).children("div").toggleClass("detail-card-hidden")
})

$("main").on("click", ".painting-listing", function() {
    console.log("painting clicked")
    targetImageIndex = $(this).index()
    revealSingleCarouselImage(targetImageIndex)
})

$(document).on("keydown", function(event) {
    if (!($("#carousel-container").css("visibility") === "visible")) { return null } //ignore keypress if carousel not rendered
    if (event.which === 27) {
        currentEnlarged.toggleClass("enlarged-painting-hidden")
        $("#carousel-container").css("visibility", "hidden")
        return null
    } else {
        flipImage(event.which)
    }
})