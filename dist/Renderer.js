class Renderer {
    constructor() {
        this.enlargedImages
        this.currentEnlarged
        this.targetImageIndex
        this.currentPage = 'Home'
    }

    router = () => {
        switch(location.hash) {
            case '':
                this.renderNavButton('Home')
                this.renderHome()
                break;
            case '#/home':
                this.renderNavButton('Home')
                this.renderHome()
                break;
            case '#/paintings':
                this.renderNavButton('Paintings')
                this.renderPaintings(paintings)
                this.renderCarousel(paintings)
                break;
            case '#/contact':
                this.renderNavButton('Contact')
                this.renderContact()
        }
    }

    changeLayout = () => {
        const viewport = window.getComputedStyle(document.querySelector('body'), '::before')
                .getPropertyValue('content').replace(/\"/g, '');
        switch(viewport) {
            case 'large-view':
                this.rearrangeForSmallView()
                break;
            case 'small-view':
                this.rearrangeForLargeView()
        }
    }
    
    rearrangeForSmallView() {
        // const nav = $("nav")
        const nav = $("nav").detach()
        $("header > h1").after(nav)
    }
    
    rearrangeForLargeView() {
        const nav = $("nav").detach()
        $("main").after(nav)
    }
    
    renderNavButton(newPage) {
        const oldPageAnchor = $(`nav > a[name*=${this.currentPage}]`)
        oldPageAnchor.removeAttr("style")
        const newPageAnchor = $(`nav > a[name*=${newPage}]`)
        newPageAnchor.css("color", "rgb(253, 92, 119)")
        this.currentPage = newPageAnchor.attr("name")
    }

    renderContact() {
        $("main").empty()
        const contactHTML = $("#contact-template").html()
        $("main").append(contactHTML)
    }
    
    renderHome() {
        $("main").empty()
        const homeHTML = $("#home-template").html() 
        $("main").append(homeHTML)
        
    }
    
    renderPaintings(paintings) {
        $("main").empty()
        const source = $("#gallery-item-template").html()
        const template = Handlebars.compile(source)
        $("main").append(template({ paintings }))
    }

    setTargetImageIndex(jqueryObject) {
        this.targetImageIndex = jqueryObject
    }
    
    renderCarousel(paintings) {
        const source = $("#carousel-template").html()
        const template = Handlebars.compile(source)
        const context = { paintings }
        $("main").append(template(context))
        this.enlargedImages = $("main").find(".enlarged-painting")
        // this.enlargedImages.first().toggleClass("enlarged-painting-hidden")
    }
    
    revealSingleCarouselImage() {
        this.currentEnlarged = this.enlargedImages.eq(this.targetImageIndex)
        this.currentEnlarged.toggleClass("enlarged-painting-hidden")
        $("main").css("overflow", "hidden")
        $("#lightbox").css("visibility", "visible")
    }
    
    flipImage(direction) {
        if (direction === 37) {
            console.log("left")
            this.currentEnlarged.toggleClass("enlarged-painting-hidden") // hide current image
            this.targetImageIndex = this.enlargedImages.eq(this.targetImageIndex).prev().index() // decrement index
            console.log(this.targetImageIndex)
            this.currentEnlarged = this.enlargedImages.eq(this.targetImageIndex) // point to new current image
            this.currentEnlarged.toggleClass("enlarged-painting-hidden") // reveal new current image
        } else if (direction === 39) {
            console.log("right")
            this.currentEnlarged.toggleClass("enlarged-painting-hidden") // hide current image
            this.targetImageIndex !== (this.enlargedImages.length - 1) && this.targetImageIndex !== -1
                ? this.targetImageIndex = this.enlargedImages.eq(this.targetImageIndex).next().index()// increment index
                : this.targetImageIndex = 0
            console.log(this.targetImageIndex)
            this.currentEnlarged = this.enlargedImages.eq(this.targetImageIndex) // point to new current image
            this.currentEnlarged.toggleClass("enlarged-painting-hidden") // reveal new current image
        }
    }

    toggleCarouselVisibility() {
        this.currentEnlarged.toggleClass("enlarged-painting-hidden")
        $("main").css("overflow", "scroll")
        $("#lightbox").css("visibility", "hidden")
    }
}
