const web = document.getElementById("web");
const minus = document.getElementById("minus1");
const plus = document.getElementById("plus1");
const menu = document.getElementById("menu");
const navbar = document.getElementById("navbar");
const closemenu = document. getElementById("close");
const cartButton = document.getElementById("cart-button");
const cartWindow = document.getElementById("cart-window");
const addToCartButton = document.getElementById("add-to-cart");
const cartList = document.getElementById("cart-list");
const itemName = document.getElementById("item-name").textContent;

let numberOfItems = document.getElementById("number-of-items");
let items = 0;

document.addEventListener("click", (e) => {
  if (e.target.id !== cartButton.id && e.target.id !== "cart-list" && e.target.id !== "cart-window"){
    cartWindow.classList.remove("start-popup");
    console.log("Removed");
  }

  if (e.target.id ===  "web"){
    navbar.classList.remove("open");
    web.classList.remove("bg-dark");
    navbar.classList.add("exit");
    navbar.classList.remove("exit");
  }
})


cartButton.addEventListener("click", () => {
  cartWindow.classList.toggle("start-popup");
  displayAddedList();
})


minus.addEventListener("click", () => {
  if (Number(numberOfItems.innerHTML) > 0) {
    numberOfItems.innerHTML = Number(numberOfItems.innerHTML) - 1;
  }
})

plus.addEventListener("click", () =>{
  numberOfItems.innerHTML = Number(numberOfItems.innerHTML) + 1;
})



menu.addEventListener("click", () =>{
  navbar.classList.add("open");
  web.classList.add("bg-dark");
})

closemenu.addEventListener("click", () => {
  navbar.classList.remove("open");
  web.classList.remove("bg-dark");
  navbar.classList.add("exit");
  navbar.classList.remove("exit");
})

addToCartButton.addEventListener("click", () => {
  const addItems = Number(numberOfItems.innerHTML);
  if (addItems !== 0) {
    items += addItems;
    numberOfItems.innerHTML = 0;
    cartButton.dataset.count = items;
    cartButton.classList.add("item-numbers");
    popupAnimation("🎉Added to your Cart🎉");
  }else {
    popupAnimation("Please add more than 1 item!");
  }
})

// functions
function displayAddedList() {
  if (items === 0) {
    cartList.style.display = "flex";
    cartList.innerHTML = `<p class = "empty-text">Your cart is empty.</p>`;

  }else {
    // need to fix this later -> when click add to cart. add items for the first time
    cartList.style.display = "grid";
    const totalAmount = "$" +125 * items + ".00"; 
    let html = `
    <img src="./images/image-product-1-thumbnail.jpg" class="thumbnail" alt="1">
    <p class = "name">${itemName}</p>
    <p class = "price-detail">$125.00 × ${items} <span class = "total-amount">${totalAmount}</span></p>
    <button class = "delete" id = "delete"><svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg></button>
    <button class = "checkout" id = "checkout">Checkout</button>
    `;
    cartList.innerHTML = html;
    document.getElementById("delete").addEventListener("click", () => {
      items = 0;
      displayAddedList();
      cartButton.classList.remove("item-numbers");
    })
    }
}

function popupAnimation(text) {
  const popupForAdding = document.getElementById("complete-adding");
  const completeMessage = document.getElementById("complete-message");
  completeMessage.innerHTML = text;
  popupForAdding.classList.add("add-to-cart-start");
  setTimeout(function(){
    popupForAdding.classList.remove("add-to-cart-start");
  }, 2500)
}

// Slide 
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
const setSlidePosition = (slide, index) =>{
  slide.style.left = slideWidth * index + "px";
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  // move to the next slide
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current__slide");
  targetDot.classList.add("current__slide");
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  }else if (targetIndex === slides.length - 1){
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  }else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }  
}
// when I click left, move slides to the left
prevButton.addEventListener("click", e =>{
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current__slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

// when I click right, move slides to the right
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current__slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

// when I click the nav indicators, move to that slide
dotsNav.addEventListener("click", e => {
  // what indicator was clicked on?
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current__slide");
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})