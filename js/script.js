
const body = document.querySelector('body')
// -------------------->
// --------------------> BURGER MENU VARIABLES
// -------------------->
const burger = document.getElementById('burgerMenu')
const closeBtn = document.getElementById('closeBtn')
// -------------------->
// --------------------> /BURGER MENU VARIABLES
// -------------------->
// --------------------> ACCORDION VARIABLES
// -------------------->
// const accordion = document.querySelectorAll('.accordion__container-item')
// -------------------->
// --------------------> /ACCORDION VARIABLES
// -------------------->
// -------------------->
// --------------------> POPAP VARIABLES
// -------------------->
// const linksForPopap = document.querySelectorAll('.popap__link')
// const popapLinkClose = document.querySelectorAll('.popap__container-content-close')
// -------------------->
// --------------------> /POPAP VARIABLES
// -------------------->
// -------------------->
// --------------------> RANGEINPUT VARIABLES
// -------------------->
// const rangeBackground = document.querySelector('.range-background')
// const rangeInput = document.getElementById('range')
// const rangeCount = document.querySelector('.range-num')
// const rangeCircle = document.querySelector('.range-circle')
// -------------------->
// --------------------> /RANGEINPUT BAR VARIABLES
// -------------------->
// -------------------->
// --------------------> SELECTIMITATION BAR VARIABLES
// -------------------->
// const arrow = document.querySelectorAll('.arrow-area')
// -------------------->
// --------------------> SELECTIMITATION BAR VARIABLES
// -------------------->

//* FILTERING
const getProducts = async () => {
   let response = await fetch('products.json')
   let result = await response.json()
   let product = result.products
   return product
}

const display = (products, positionBlock) => {
   let display = products.map(function ({ title, image, price }) {
      return `<div class="filter-products__item">
                  <div class="filter-products__top">
                     <img src="/img/1x1.webp" data-src="${image}" class="lazy-load loading" alt="image">
                  </div>
                  <div class="filter-products__bottom">
                     <h3>${title}</h3>
                     <div class="filter-products__stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                     </div>
                     <div class="filter-products__price">
                        <h4>${price}</h4>
                     </div>
                  </div>
            </div>`
   })
   display = display.join('')
   positionBlock.innerHTML = display
}
const filterBtn = document.querySelectorAll('.filter-btn')
const blockFiltering = document.querySelector('.filter-center')
const allProducts = document.querySelector('.products-all')
const latestProducts = document.querySelector('.products-latest')
const recentViewProducts = document.querySelector('.products-recent-view')

if (filterBtn.length > 0) {
   filterBtn.forEach(btn => btn.addEventListener('click', filtering))
}
async function filtering() {
   const btnId = this.dataset.id
   let products = await getProducts()
   filterBtn.forEach(btn => btn.classList.remove('active'))
   this.classList.add('active')
   let filterFor = products.filter(product => product.category == btnId)
   blockFiltering.classList.add('animate__animated', 'animate__bounceInUp')
   setTimeout(function () {
      blockFiltering.classList.remove('animate__animated', 'animate__bounceInUp')
   }, 1000)
   display(filterFor, blockFiltering)
   const children = blockFiltering.childNodes
   for (const child of children) {
      child.children[0].style.background = 'none'
      let img = child.querySelector('img')
      img.src = img.dataset.src
   }
}

function filter(nameCategory, products) {
   return products.filter(product => product.category == nameCategory)
}
window.addEventListener('DOMContentLoaded', async function () {
   let products = await getProducts()
   if (allProducts) {
      display(products, allProducts)
   }
   if (latestProducts) {
      let latestFilter = filter('latest', products)
      display(latestFilter, latestProducts)
   }
   if (recentViewProducts) {
      let recentFilter = filter('recent', products)
      display(recentFilter, recentViewProducts)
   }

   //LAZY-LOAD-IMAGE
   const documentHeight = document.documentElement.clientHeight
   const imagesProducts = document.querySelectorAll('.lazy-load')
   const positionImages = []

   if (imagesProducts.length > 0) {
      imagesProducts.forEach(function (image) {
         const imagePosition = image.getBoundingClientRect().top + pageYOffset
         positionImages.push(imagePosition)
      })
   }

   window.addEventListener('scroll', windowScrolling)

   function windowScrolling() {
      if (document.querySelectorAll('img[data-src]').length > 0) {
         lazyLoadImg(positionImages)
      }
   }
   function lazyLoadImg(positionImages) {
      let positionImg = positionImages.findIndex(positionImg => pageYOffset > positionImg - documentHeight)
      if (positionImg >= 0) {
         if (imagesProducts[positionImg].dataset.src) {
            imagesProducts[positionImg].src = imagesProducts[positionImg].dataset.src
            imagesProducts[positionImg].removeAttribute('data-src')

         }
         imagesProducts[positionImg].parentElement.style.background = 'none'
         delete positionImages[positionImg]
      }
   }

})
//* //FILTERING
// GSAP
gsap.registerPlugin(ScrollTrigger);
gsap.from('.header__logo', { opacity: 0, duration: 1, delay: .1, y: -60 })

gsap.from('.first-anim-link', { opacity: 0, duration: 1, delay: .2, y: -200 })
gsap.from('.second-anim-link', { opacity: 0, duration: 1, delay: .3, y: -300 })
gsap.from('.third-anim-link', { opacity: 0, duration: 1, delay: .4, y: -400 })
gsap.from('.fourth-anim-link', { opacity: 0, duration: 1, delay: .5, y: -500 })
gsap.from('.fifth-anim-link', { opacity: 0, duration: 1, delay: .6, y: -600 })
gsap.from('.header__soc', { opacity: 0, duration: 2, delay: .10, y: -60 })


gsap.from('.anim-left', {
   scrollTrigger: '.anim-left',
   x: -200,
   y: 200,
   duration: 1,
   delay: .1,
})
gsap.from('.anim-center', {
   scrollTrigger: '.anim-center',
   opacity: 0,
   duration: 2,
   delay: .5,
})
gsap.from('.anim-right', {
   scrollTrigger: '.anim-right',
   x: 200,
   y: 200,
   duration: 1,
   delay: .1,
})
// ANIM-CARD
gsap.from('.first-card', {
   scrollTrigger: '.first-card',
   x: -200,
   duration: .5,
   delay: .1,
})
gsap.from('.second-card', {
   scrollTrigger: '.second-card',
   y: -200,
   duration: .5,
   delay: .2,
})
gsap.from('.third-card', {
   scrollTrigger: '.third-card',
   y: -200,
   duration: .5,
   delay: .3,
})
gsap.from('.fourth-card', {
   scrollTrigger: '.fourth-card',
   y: 200,
   duration: .5,
   delay: .4,
})

//SCROLL-NAVIGATION

const navLinks = document.querySelectorAll('.nav__link ')

navLinks.forEach(navLink => navLink.addEventListener('click', navigation))


function navigation(event) {
   event.preventDefault()
   const idSection = this.getAttribute('href').slice(1)
   const section = document.getElementById(idSection)
   const positionSection = section.getBoundingClientRect().top + pageYOffset
   const headerHeight = document.querySelector('.header').offsetHeight;
   const position = positionSection - headerHeight

   window.scrollTo({
      top: position,
      left: 0,
   })
}











burger.addEventListener('click', show)
function show() {
   this.parentElement.classList.toggle('_show')
   body.classList.toggle('_lock')
}
closeBtn.addEventListener('click', hide)

function hide(event) {
   event.preventDefault()
   this.closest('.header__body').classList.remove('_show')
   body.classList.remove('_lock')
}
const swiperSlideHeight = document.querySelectorAll('.swiper-slide')
swiperSlideHeight.forEach(current => {
   current.style.height = 'auto';
   current.style.minHeight = '100%';
})
// first slider
const pageSlider = new Swiper('.swiper-container', {
   //Свои классы
   direction: 'horizontal',
   speed: 1000,
   loop: true,

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
});



// second slider
const swiperSecond = new Swiper('.brands__slider', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,
   slidesPerView: 5,
   spaceBetween: 10,
   speed: 800,
   autoplay: {
      // пауза между прокруткой
      delay: 3000,
   },
   breakpoints: {
      320: {
         slidesPerView: 2,
      },
      576: {
         slidesPerView: 2,
      },
      767: {
         slidesPerView: 3,
      },
      991: {
         slidesPerView: 5,
      }
   },
});



// third slider
const swiperThird = new Swiper('.slider-blog__container', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,
   slidesPerView: 3,
   spaceBetween: 40,
   speed: 800,
   autoplay: {
      // пауза между прокруткой
      delay: 3000,
   },

   breakpoints: {
      320: {
         slidesPerView: 1,
      },
      767: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      991: {
         slidesPerView: 3,
      }
   },
});
