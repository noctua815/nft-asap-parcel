import {gsap}            from 'gsap'
// import {startOldScripts} from './old-js'
// startOldScripts()

// HERO ANIMATION
const initHeroAnimation = () => {
  const items = [...document.querySelectorAll('.hero-img')]
  
  for (let [i, item] of items.entries()) {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'ease-out',
      delay: 0.1 * i
    })
  }
}

initHeroAnimation()

// NFT SLIDER
class NftSlider {
  constructor() {
    this.DOM = {
      slider: document.querySelector('.nft-slider')
    }
    this.DOM.slides = [...this.DOM.slider.querySelectorAll('.nft-card')]
    this.DOM.wrapper = this.DOM.slider.querySelector('.nft-slider__wr')
    this.DOM.btn = this.DOM.slider.querySelector('.nft-slider__btn')
    this.DOM.activeSlide = this.DOM.slider.querySelector('.nft-card.active')
    this.DOM.previousSlide = null
    this.DOM.lastItem = this.DOM.slides[this.DOM.slides.length - 1]
    this.activeSlide = 0
    this.length = this.DOM.slides.length
    this.scales = [
      0,
      0.1,
      0.23,
      0.34,
      0.46,
      0.54,
      0.65,
      0.72
    ]
    this.initFirstAnimation()
    this.initSliderClick()
  }
  
  getIndent(i) {
    const indent = 19 * i
    return indent - indent * this.scales[i] / 2
  }
  
  initFirstAnimation() {
    const length = this.DOM.slides.length
    for (let [i, item] of this.DOM.slides.entries()) {
      item.style.zIndex = length - i
      
      gsap.to(item, {
        scale: 1 - this.scales[i],
        x: this.getIndent(i),
        delay: 0.3,
        ease: 'power1',
        duration: 0.5
      })
    }
  }
  
  initSliderClick() {
    this.DOM.btn.addEventListener('click', () => {
      const slideWidth = this.DOM.activeSlide.clientWidth
      
      gsap.to(this.DOM.activeSlide, {
        x: slideWidth * -1,
        opacity: 0,
        ease: 'power1',
        duration: 0.3,
        onComplete: () => {
          this.activeSlide += 1
          if (this.activeSlide === this.length) {
            this.activeSlide = 0
          }
          this.DOM.activeSlide.classList.remove('active')
          this.DOM.previousSlide = this.DOM.activeSlide
          this.DOM.activeSlide = this.DOM.slides[this.activeSlide]
          this.DOM.activeSlide.classList.add('active')
          
          this.moveFirstSlide()
          this.animateOtherSlides()
        }
      })
    })
  }
  
  // Move first slide to the end
  moveFirstSlide() {
    this.DOM.lastItem.parentNode.insertBefore(this.DOM.previousSlide, this.DOM.lastItem.nextSibling)
    this.DOM.lastItem = this.DOM.previousSlide
    this.DOM.lastItem.style.zIndex = 0
    gsap.to(this.DOM.lastItem, {
      duration: 0,
      scale: 0.1,
      x: this.getIndent(this.length - 1)
    })
  }
  
  animateOtherSlides() {
    const slides = [...this.DOM.slider.querySelectorAll('.nft-card')]
    for (let [i, item] of slides.entries()) {
      item.style.zIndex = +item.style.zIndex + 1
      const indent = 19 * i
      gsap.to(item, {
        scale: 1 - this.scales[i],
        x: indent - indent * this.scales[i] / 2,
        delay: 0.05 * i,
        duration: 0.3,
        opacity: 1
      })
    }
  }
}

const initNftSlider = () => {
  if (!document.querySelector('.nft-slider')) return
  const slider = new NftSlider()
}

initNftSlider()

// FAQ
const initFaqItems = () => {
  if (!document.querySelector('.faq-item')) return
  
  const items = [...document.querySelectorAll('.faq-item')]
  const defaultConfig = {
    ease: 'power2',
    duration: 0.3
  }
  for (let item of items) {
    const head = item.querySelector('.faq-item__head')
    const body = item.querySelector('.faq-item__body')
    head.addEventListener('click', () => {
      const isActive = item.classList.contains('active')
      
      if (isActive) {
        item.classList.remove('active')
        gsap.to(body, {
          height: 0,
          ...defaultConfig,
          onComplete: () => {
          }
        })
      } else {
        body.style.display = 'block'
        body.style.height = 'auto'
        
        const targetHeight = body.offsetHeight
        body.style.height = 0
        item.classList.add('active')
        
        gsap.to(body, {
          height: targetHeight,
          ...defaultConfig,
          onComplete: () => {
          }
        })
      }
      
    })
  }
}

initFaqItems()


// Menu animation for NFT cabinet
// copy from old-js.js

const mobileMenuActivation = () => {
  const btn = document.getElementById('menu-btn')
  const menu = document.getElementById('mobile-menu')
  
  const classes = {
    btn: 'menu-btn--active',
    menu: 'mobile-menu--active',
    body: 'disable-scroll'
  }
  if (!btn || !menu) return
  
  btn.addEventListener('click', () => {
    if (btn.classList.contains(classes.btn)) {
      btn.classList.remove(classes.btn)
      menu.classList.remove(classes.menu)
      document.body.classList.remove(classes.body)
    } else {
      btn.classList.add(classes.btn)
      menu.classList.add(classes.menu)
      document.body.classList.add(classes.body)
    }
  })
}

mobileMenuActivation()
