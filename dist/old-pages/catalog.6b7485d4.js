// OLD SCRIPTS
const mobileMenuActivation = ()=>{
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");
    const classes = {
        btn: "menu-btn--active",
        menu: "mobile-menu--active",
        body: "disable-scroll"
    };
    if (!btn || !menu) return;
    btn.addEventListener("click", ()=>{
        if (btn.classList.contains(classes.btn)) {
            btn.classList.remove(classes.btn);
            menu.classList.remove(classes.menu);
            document.body.classList.remove(classes.body);
        } else {
            btn.classList.add(classes.btn);
            menu.classList.add(classes.menu);
            document.body.classList.add(classes.body);
        }
    });
};
class Slider {
    constructor(sliderDom){
        this.slider = sliderDom;
        this.slides = this.slider.querySelectorAll(".slide");
        this.sliderWrapper = this.slider.querySelector(".slider__wr");
        this.sliderScroll = this.slider.querySelector(".slider__scroll");
        this.leftBtn = this.slider.querySelector(".slider__btn--left");
        this.rightBtn = this.slider.querySelector(".slider__btn--right");
        this.leftFader = this.slider.querySelector(".slider__fader--left");
        this.rightFader = this.slider.querySelector(".slider__fader--right");
        this.activeElement = 0;
        this.nextElement = 1;
        this.prevElement = 0;
        this.classes = {
            btn: "slider__btn--hidden",
            fader: "slider__fader--hidden"
        };
        this.sliderEnd = false;
        this.initEvents();
    }
    initEvents() {
        this.leftBtn.addEventListener("click", (evt)=>this.slideLeft(evt));
        this.rightBtn.addEventListener("click", (evt)=>this.slideRight(evt));
    }
    getGapWidth(el) {
        const elRect = el.getBoundingClientRect();
        const nextItem = el.nextElementSibling;
        const nextItemRect = nextItem.getBoundingClientRect();
        return nextItemRect.x - elRect.width - elRect.x;
    }
    slideLeft() {
        const prevSlide = this.slides[this.prevElement];
        const wrapperRect = this.sliderScroll.getBoundingClientRect();
        const slideRect = prevSlide.getBoundingClientRect();
        const gap = this.getGapWidth(prevSlide);
        const offset = slideRect.width + gap;
        const wrapperMatrix = new WebKitCSSMatrix(this.sliderWrapper.style.transform);
        let finalOffset = (Math.abs(wrapperMatrix.m41) - offset) * -1;
        if (this.sliderEnd) {
            if (slideRect.x !== wrapperRect.x) {
                const diff = Math.abs(slideRect.x - wrapperRect.x);
                finalOffset = (Math.abs(wrapperMatrix.m41) - diff) * -1;
            }
        }
        this.sliderWrapper.style.transform = `translateX(${finalOffset}px)`;
        this.activeElement = this.prevElement;
        this.prevElement = this.prevElement - 1 > 0 ? this.prevElement - 1 : 0;
        this.nextElement = this.activeElement + 1;
        if (this.activeElement === 0) {
            this.leftBtn.classList.add(this.classes.btn);
            this.leftFader.classList.add(this.classes.fader);
        } else {
            this.leftBtn.classList.remove(this.classes.btn);
            this.leftFader.classList.remove(this.classes.fader);
        }
        this.rightBtn.classList.remove(this.classes.btn);
        this.rightFader.classList.remove(this.classes.fader);
        this.sliderEnd = false;
    }
    slideRight() {
        if (this.nextElement + 1 >= this.slides.length) return;
        const nextSlide = this.slides[this.nextElement];
        const wrapperRect = this.sliderScroll.getBoundingClientRect();
        const slideRect = nextSlide.getBoundingClientRect();
        const lastSlideRect = this.slides[this.slides.length - 1].getBoundingClientRect();
        const offset = Math.abs(slideRect.x) - wrapperRect.x;
        const wrapperMatrix = new WebKitCSSMatrix(this.sliderWrapper.style.transform);
        let finalOffset = wrapperMatrix.m41 - offset;
        const lastSlideOffset = lastSlideRect.x + lastSlideRect.width - wrapperRect.x;
        if (lastSlideOffset - Math.abs(offset) <= wrapperRect.width) {
            let diff = lastSlideOffset - wrapperRect.width - offset;
            finalOffset = finalOffset + Math.abs(diff);
            this.sliderEnd = true;
        }
        this.prevElement = this.activeElement;
        this.activeElement = this.nextElement;
        this.nextElement++;
        this.sliderWrapper.style.transform = `translateX(${finalOffset}px)`;
        if (this.sliderEnd) {
            this.rightBtn.classList.add(this.classes.btn);
            this.rightFader.classList.add(this.classes.fader);
        } else {
            this.rightBtn.classList.remove(this.classes.btn);
            this.rightFader.classList.remove(this.classes.fader);
        }
        this.leftBtn.classList.remove(this.classes.btn);
        this.leftFader.classList.remove(this.classes.fader);
    }
}
const startSlider = ()=>{
    const sliders = document.querySelectorAll(".slider");
    if (!sliders.length) return;
    for (let item of sliders){
        const slider = new Slider(item);
    }
};
const wordAnimation = ()=>{
    const words = document.querySelectorAll(".anim-word");
    if (!words.length) return;
    let count = words.length;
    let activeEl = 0;
    let nextEl;
    const intervalTime = 5000;
    const animationTime = 500;
    words[activeEl].classList.add("anim-word--active");
    const interval = setInterval(()=>{
        if (activeEl + 1 >= count) nextEl = 0;
        else nextEl = activeEl + 1;
        words[activeEl].classList.remove("anim-word--show");
        words[activeEl].classList.add("anim-word--hide");
        setTimeout(()=>{
            words[activeEl].classList.remove("anim-word--hide", "anim-word--active");
            words[nextEl].classList.add("anim-word--show");
            activeEl = nextEl;
        }, animationTime);
    }, intervalTime);
};
wordAnimation();
mobileMenuActivation();
startSlider();

//# sourceMappingURL=catalog.6b7485d4.js.map
