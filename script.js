/* ==================================
   TECHZONE MAX
================================== */

/* ==========================
   PRELOADER
========================== */

window.addEventListener("load", () => {

    const preloader =
    document.getElementById(
    "preloader"
    );

    setTimeout(() => {

        preloader.style.opacity = "0";

        preloader.style.visibility =
        "hidden";

    }, 1200);

});

/* ==========================
   LOCAL STORAGE
========================== */

let cart =
JSON.parse(
localStorage.getItem(
"techzone_cart"
)
) || [];

let favorites =
JSON.parse(
localStorage.getItem(
"techzone_favorites"
)
) || [];

let viewedProducts =
JSON.parse(
localStorage.getItem(
"techzone_viewed"
)
) || [];

/* ==========================
   ELEMENTS
========================== */

const cartBtn =
document.getElementById(
"cartBtn"
);

const cartSidebar =
document.getElementById(
"cartSidebar"
);

const closeCart =
document.getElementById(
"closeCart"
);

const cartItems =
document.getElementById(
"cartItems"
);

const cartTotal =
document.getElementById(
"cartTotal"
);

const cartCount =
document.getElementById(
"cartCount"
);

const favoriteCount =
document.getElementById(
"favoriteCount"
);

const searchInput =
document.getElementById(
"searchInput"
);

/* ==========================
   COUNTERS
========================== */

function updateCounters(){

    cartCount.textContent =
    cart.length;

    favoriteCount.textContent =
    favorites.length;
}

updateCounters();

/* ==========================
   OPEN CART
========================== */

cartBtn.addEventListener(
"click",
() => {

cartSidebar.classList.add(
"active"
);

}
);

/* ==========================
   CLOSE CART
========================== */

closeCart.addEventListener(
"click",
() => {

cartSidebar.classList.remove(
"active"
);

}
);

/* ==========================
   SAVE DATA
========================== */

function saveData(){

localStorage.setItem(
"techzone_cart",
JSON.stringify(cart)
);

localStorage.setItem(
"techzone_favorites",
JSON.stringify(favorites)
);

localStorage.setItem(
"techzone_viewed",
JSON.stringify(viewedProducts)
);

updateCounters();

}

/* ==========================
   RENDER CART
========================== */

function renderCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach(
(item,index) => {

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<h4>${item.name}</h4>

<p>$${item.price}</p>

<button
onclick="removeItem(${index})">

Удалить

</button>

</div>

`;

}
);

cartTotal.textContent =
"$" + total;

}

/* ==========================
   REMOVE ITEM
========================== */

function removeItem(index){

cart.splice(index,1);

saveData();

renderCart();

}

window.removeItem =
removeItem;

/* ==========================
   ADD TO CART
========================== */

document
.querySelectorAll(
".cart-add"
)
.forEach(btn => {

btn.addEventListener(
"click",
() => {

const card =
btn.closest(
".product-card"
);

const name =
card.querySelector("h3")
.textContent;

const priceText =
card.querySelector(".price")
.textContent;

const price =
Number(
priceText.replace("$","")
);

cart.push({

name:name,
price:price

});

saveData();

renderCart();

alert(
name +
" добавлен в корзину"
);

}
);

});

/* ==========================
   CLEAR CART
========================== */

const clearCart =
document.getElementById(
"clearCart"
);

clearCart.addEventListener(
"click",
() => {

cart = [];

saveData();

renderCart();

}
);

/* ==========================
   INITIAL LOAD
========================== */

renderCart();

/* ==========================
   LIVE SEARCH
========================== */

searchInput.addEventListener(
"input",
() => {

const value =
searchInput.value
.toLowerCase();

document
.querySelectorAll(
".product-card"
)
.forEach(card => {

const title =
card.querySelector("h3")
.textContent
.toLowerCase();

if(
title.includes(value)
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}
);

/* ==========================
   CATEGORY FILTER
========================== */

const categories =
document.querySelectorAll(
".sidebar li"
);

categories.forEach(item => {

item.addEventListener(
"click",
() => {

const category =
item.dataset.category;

document
.querySelectorAll(
".product-card"
)
.forEach(card => {

if(
category === "all"
){

card.style.display =
"block";

return;

}

if(
card.dataset.category ===
category
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}
);

});

/* ==========================
   FAVORITES
========================== */

const favoriteBtn =
document.getElementById(
"favoriteBtn"
);

document
.querySelectorAll(
".buy-btn"
)
.forEach(btn => {

btn.addEventListener(
"dblclick",
() => {

const card =
btn.closest(
".product-card"
);

const title =
card.querySelector("h3")
.textContent;

if(
!favorites.includes(title)
){

favorites.push(title);

saveData();

alert(
title +
" добавлен в избранное ❤️"
);

}

}
);

});

/* ==========================
   SHOW FAVORITES
========================== */

favoriteBtn.addEventListener(
"click",
() => {

if(
favorites.length === 0
){

alert(
"Избранное пусто"
);

return;

}

alert(
"Избранное:\n\n" +
favorites.join("\n")
);

}
);

/* ==========================
   PRODUCT MODAL
========================== */

const modal =
document.getElementById(
"productModal"
);

const modalTitle =
document.getElementById(
"modalTitle"
);

const modalSpecs =
document.getElementById(
"modalSpecs"
);

const closeModal =
document.getElementById(
"closeModal"
);

const overlay =
document.getElementById(
"overlay"
);

/* ==========================
   PRODUCT SPECS
========================== */

const productSpecs = {

iphone16: `
📱 iPhone 16 Pro

• Процессор: Apple A18 Pro
• Память: 256/512 ГБ
• Экран: 6.9" OLED 120Hz
• Камера: 48MP + 48MP + 12MP
• Батарея: 5000 mAh
• Face ID
• Titanium корпус
`,

s25: `
📱 Samsung Galaxy S25 Ultra

• Процессор: Snapdragon 8 Elite
• Память: 512 ГБ
• ОЗУ: 12 ГБ
• Экран: 6.9" Dynamic AMOLED
• Камера: 200MP
• Батарея: 5500 mAh
• S-Pen
`,

macbook: `
💻 MacBook Pro M4

• Процессор: Apple M4 Pro
• ОЗУ: 32 ГБ
• SSD: 1 ТБ
• Экран: 16" Liquid Retina XDR
• Автономность: до 24 часов
`,

xps: `
💻 Dell XPS 15

• Intel Core Ultra 9
• RTX 4070
• 32 ГБ RAM
• SSD 1 ТБ
• Экран 15.6" OLED 3.5K
`,

rog: `
💻 ASUS ROG Strix

• Ryzen 9 9950HX
• RTX 5090
• 64 ГБ RAM
• SSD 2 ТБ
• 240Hz экран
`,

ipad: `
📲 iPad Pro M4

• Apple M4
• 512 ГБ
• Ultra Retina XDR
• Face ID
• Apple Pencil Pro
`,

ps5: `
🎮 PlayStation 5 Pro

• AMD Zen 2
• RDNA 3
• SSD 2 ТБ
• 4K/120 FPS
• Ray Tracing
`,

xbox: `
🎮 Xbox Series X

• AMD Zen 2
• SSD 1 ТБ
• 4K Gaming
• Quick Resume
`,

watch: `
⌚ Apple Watch Ultra 3

• OLED Display
• GPS
• Водозащита 100м
• До 72 часов работы
`,

airpods: `
🎧 AirPods Max

• Active Noise Cancelling
• Spatial Audio
• Bluetooth 5.4
• До 30 часов работы
`,

sony: `
🎧 Sony WH-1000XM6

• LDAC
• ANC
• До 40 часов работы
• Быстрая зарядка
`,

lg: `
📺 LG OLED 77"

• OLED EVO
• 4K UHD
• 120Hz
• HDR10+
• Smart TV
`,

s24: `
📱 Samsung Galaxy S24 Ultra

• Snapdragon 8 Gen 3
• 12 ГБ RAM
• 512 ГБ
• Камера 200MP
`,

iphone15: `
📱 iPhone 15 Pro Max

• A17 Pro
• 256 ГБ
• 6.7 OLED
• Titanium
`,

xiaomi15: `
📱 Xiaomi 15 Ultra

• Snapdragon 8 Elite
• Leica Camera
• 16 ГБ RAM
• 1 ТБ памяти
`,

redmagic: `
📱 RedMagic 10 Pro

• Snapdragon 8 Elite
• 24 ГБ RAM
• 6500 mAh
• 165Hz экран
`,

lenovo: `
💻 Lenovo Legion Pro

• Ryzen 9
• RTX 5080
• 32 ГБ RAM
• SSD 2 ТБ
`,

acer: `
💻 Acer Predator Helios

• Intel i9
• RTX 4080
• 32 ГБ RAM
• 240Hz
`,

msi: `
💻 MSI Titan 18

• Intel Core Ultra 9
• RTX 5090
• 64 ГБ RAM
• SSD 4 ТБ
`,

steamdeck: `
🎮 Steam Deck OLED

• AMD APU
• SSD 1 ТБ
• OLED экран
• До 12 часов работы
`,

nintendoswitch: `
🎮 Nintendo Switch 2

• 4K Dock
• 256 ГБ
• HDR
• Joy-Con 2
`,

buds3: `
🎧 Galaxy Buds 3 Pro

• ANC
• Bluetooth 5.4
• До 35 часов работы
`,

jbl: `
🎧 JBL Tour Pro

• ANC
• Hi-Res Audio
• До 40 часов работы
`,

tvsamsung: `
📺 Samsung Neo QLED 8K

• 8K
• Mini LED
• 144Hz
• HDR
`,

tcl: `
📺 TCL MiniLED

• 4K UHD
• 120Hz
• Google TV
`,

monitor: `
🖥 ASUS ROG Swift

• 32"
• 4K
• 240Hz
• HDR1000
`,

keyboard: `
⌨ Razer BlackWidow V4

• RGB
• Mechanical
• USB-C
`,

mouse: `
🖱 Logitech G Pro X Superlight

• 60 г
• HERO Sensor
• Wireless
`,

camera: `
📷 Sony A7 IV

• 33MP
• 4K60
• Full Frame
`,

drone: `
🚁 DJI Air 3S

• 4K HDR
• 46 мин полёта
• GPS
`

};



/* ==========================
   OPEN MODAL
========================== */

document
.querySelectorAll(
".info-btn"
)
.forEach(btn => {

btn.addEventListener(
"click",
() => {

const key =
btn.dataset.product;

const card =
btn.closest(
".product-card"
);

const title =
card.querySelector("h3")
.textContent;

modalTitle.textContent =
title;

modalSpecs.innerHTML =
productSpecs[key] ||
"Характеристики скоро будут добавлены";

modal.classList.add(
"active"
);

overlay.classList.add(
"active"
);

/* просмотренные */

viewedProducts.push(
title
);

saveData();

renderViewed();

}
);

});

/* ==========================
   CLOSE MODAL
========================== */

function closeProductModal(){

modal.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

}

closeModal.addEventListener(
"click",
closeProductModal
);

overlay.addEventListener(
"click",
closeProductModal
);

/* ==========================
   RECENT VIEWED
========================== */

const recentProducts =
document.getElementById(
"recentProducts"
);

function renderViewed(){

if(
!recentProducts
) return;

recentProducts.innerHTML = "";

const last =
viewedProducts.slice(-6)
.reverse();

last.forEach(item => {

recentProducts.innerHTML += `

<div class="recent-card">

<h3>${item}</h3>

<p>
Недавно просмотренный товар
</p>

</div>

`;

});

}

renderViewed();

/* ==========================
   LOGIN SYSTEM
========================== */

const loginOpen =
document.getElementById(
"loginOpen"
);

const loginModal =
document.getElementById(
"loginModal"
);

const closeLogin =
document.getElementById(
"closeLogin"
);

const loginSubmit =
document.getElementById(
"loginSubmit"
);

const usernameInput =
document.getElementById(
"username"
);

const passwordInput =
document.getElementById(
"password"
);

/* ==========================
   OPEN LOGIN
========================== */

loginOpen.addEventListener(
"click",
() => {

loginModal.classList.add(
"active"
);

overlay.classList.add(
"active"
);

}
);

/* ==========================
   CLOSE LOGIN
========================== */

function closeLoginModal(){

loginModal.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

}

closeLogin.addEventListener(
"click",
closeLoginModal
);

/* ==========================
   LOGIN
========================== */

loginSubmit.addEventListener(
"click",
() => {

const username =
usernameInput.value.trim();

const password =
passwordInput.value.trim();

if(
username === "" ||
password === ""
){

alert(
"Заполните все поля"
);

return;

}

localStorage.setItem(
"techzone_user",
username
);

alert(
"Добро пожаловать, " +
username +
"!"
);

loginOpen.textContent =
username;

closeLoginModal();

}
);

/* ==========================
   AUTO LOGIN
========================== */

const savedUser =
localStorage.getItem(
"techzone_user"
);

if(savedUser){

loginOpen.textContent =
savedUser;

}

/* ==========================
   DAY / NIGHT MODE
========================== */

const themeBtn =
document.getElementById(
"themeBtn"
);

const savedTheme =
localStorage.getItem(
"techzone_theme"
);

if(savedTheme === "light"){

document.body.classList.add(
"light-theme"
);

themeBtn.textContent = "☀️";

}

themeBtn.addEventListener(
"click",
() => {

document.body.classList.toggle(
"light-theme"
);

if(
document.body.classList.contains(
"light-theme"
)
){

localStorage.setItem(
"techzone_theme",
"light"
);

themeBtn.textContent = "☀️";

}else{

localStorage.setItem(
"techzone_theme",
"dark"
);

themeBtn.textContent = "🌙";

}

}
);

/* ==========================
   ROULETTE
========================== */

const spinBtn =
document.getElementById(
"spinBtn"
);

const rouletteResult =
document.getElementById(
"rouletteResult"
);

const addPrizeCart =
document.getElementById(
"addPrizeCart"
);

const rouletteProducts = [

"iPhone 16 Pro",
"Samsung S25 Ultra",
"MacBook Pro M4",
"PlayStation 5 Pro",
"AirPods Max",
"iPad Pro M4",
"Dell XPS 15",
"ASUS ROG Strix",
"Xbox Series X",
"Apple Watch Ultra 3"

];

let wonProduct = null;

/* ==========================
   SPIN
========================== */

spinBtn.addEventListener(
"click",
() => {

rouletteResult.classList.add(
"spinning"
);

let count = 0;

const interval =
setInterval(() => {

const random =
rouletteProducts[
Math.floor(
Math.random() *
rouletteProducts.length
)
];

rouletteResult.textContent =
random;

count++;

if(count > 25){

clearInterval(interval);

rouletteResult.classList.remove(
"spinning"
);

wonProduct = random;

rouletteResult.innerHTML =
"🎉 Вы выиграли:<br><b>" +
random +
"</b>";

}

},100);

}
);

/* ==========================
   ADD WIN TO CART
========================== */

addPrizeCart.addEventListener(
"click",
() => {

if(!wonProduct){

alert(
"Сначала покрутите рулетку!"
);

return;

}

cart.push({

name:wonProduct,
price:999

});

saveData();

renderCart();

alert(
wonProduct +
" добавлен в корзину"
);

}
);

/* ==========================
   CHECKOUT
========================== */

const checkoutBtn =
document.querySelector(
".checkout"
);

checkoutBtn.addEventListener(
"click",
() => {

if(cart.length === 0){

alert(
"Корзина пуста"
);

return;

}

alert(
"Заказ успешно оформлен! 🎉"
);

cart = [];

saveData();

renderCart();

}
);

/* ==========================
   BUY BUTTON
========================== */

document
.querySelectorAll(
".buy-btn"
)
.forEach(btn => {

btn.addEventListener(
"click",
() => {

const card =
btn.closest(
".product-card"
);

const name =
card.querySelector("h3")
.textContent;

alert(
"Переход к оформлению товара:\n\n" +
name
);

}
);

});

/* ==========================
   SCROLL ANIMATION
========================== */

const animatedBlocks =
document.querySelectorAll(
".product-card,.stat-card,.brand-card,.review-card,.news-card,.delivery-card,.faq-item"
);

function revealElements(){

animatedBlocks.forEach(item => {

const top =
item.getBoundingClientRect().top;

if(top < window.innerHeight - 100){

item.classList.add(
"show"
);

}

});

}

window.addEventListener(
"scroll",
revealElements
);

revealElements();

/* ==========================
   SIDEBAR ACTIVE
========================== */

const sidebarItems =
document.querySelectorAll(
".sidebar li"
);

sidebarItems.forEach(item => {

item.addEventListener(
"click",
() => {

sidebarItems.forEach(el => {

el.classList.remove(
"active-category"
);

});

item.classList.add(
"active-category"
);

}
);

});

/* ==========================
   FAQ ACCORDION
========================== */

document
.querySelectorAll(
".faq-item"
)
.forEach(item => {

const answer =
item.querySelector("p");

answer.style.display =
"none";

item.addEventListener(
"click",
() => {

const opened =
answer.style.display ===
"block";

document
.querySelectorAll(
".faq-item p"
)
.forEach(p => {

p.style.display =
"none";

});

if(!opened){

answer.style.display =
"block";

}

}
);

});

/* ==========================
   TOAST NOTIFICATION
========================== */

function showToast(text){

const toast =
document.createElement(
"div"
);

toast.className =
"toast";

toast.innerText =
text;

document.body.appendChild(
toast
);

setTimeout(() => {

toast.classList.add(
"show"
);

},100);

setTimeout(() => {

toast.classList.remove(
"show"
);

setTimeout(() => {

toast.remove();

},400);

},2500);

}

window.showToast =
showToast;

/* ==========================
   REPLACE ALERTS
========================== */

document
.querySelectorAll(
".cart-add"
)
.forEach(btn => {

btn.addEventListener(
"click",
() => {

const card =
btn.closest(
".product-card"
);

const name =
card.querySelector("h3")
.textContent;

showToast(
name +
" добавлен в корзину"
);

}
);

});

/* ==========================
   LAST ORDERS
========================== */

let orders =
JSON.parse(
localStorage.getItem(
"techzone_orders"
)
) || [];

function saveOrders(){

localStorage.setItem(
"techzone_orders",
JSON.stringify(orders)
);

}

checkoutBtn.addEventListener(
"click",
() => {

if(cart.length === 0){

return;

}

const order = {

date:
new Date()
.toLocaleString(),

items:
cart.length

};

orders.push(order);

saveOrders();

}
);

/* ==========================
   SHOW LAST ORDER
========================== */

if(
orders.length > 0
){

const lastOrder =
orders[
orders.length - 1
];

console.log(
"Последний заказ:",
lastOrder
);

}

/* ==========================
   NEWS AUTO SLIDER
========================== */

const newsCards =
document.querySelectorAll(
".news-card"
);

let currentNews = 0;

setInterval(() => {

newsCards.forEach(card => {

card.style.opacity =
"0.4";

});

if(newsCards.length){

newsCards[currentNews]
.style.opacity =
"1";

currentNews++;

if(
currentNews >=
newsCards.length
){

currentNews = 0;

}

}

},3000);

/* ==========================
   RECENT PRODUCTS LIMIT
========================== */

if(
viewedProducts.length > 20
){

viewedProducts =
viewedProducts.slice(-20);

saveData();

}

/* ==========================
   SCROLL TO TOP BUTTON
========================== */

const topBtn =
document.createElement(
"button"
);

topBtn.innerHTML = "⬆";

topBtn.className =
"scrollTopBtn";

document.body.appendChild(
topBtn
);

window.addEventListener(
"scroll",
() => {

if(
window.scrollY > 500
){

topBtn.style.display =
"block";

}else{

topBtn.style.display =
"none";

}

}
);

topBtn.addEventListener(
"click",
() => {

window.scrollTo({

top:0,
behavior:"smooth"

});

}
);

/* ==========================
   PRODUCT COUNTER
========================== */

function updateProductCount(){

const count =
document.querySelectorAll(
".product-card"
).length;

console.log(
"Всего товаров:",
count
);

}

updateProductCount();

/* ==========================
   HOT PRODUCTS
========================== */

document
.querySelectorAll(
".product-card"
)
.forEach((card,index)=>{

if(index < 3){

const badge =
document.createElement(
"span"
);

badge.className =
"top-badge";

badge.innerText =
"TOP";

card.appendChild(
badge
);

}

});

/* ==========================
   COUPON SYSTEM
========================== */

const coupons = {
    "TECH10": 10,
    "SALE20": 20,
    "MEGA30": 30
};

let discount = 0;

function applyCoupon(code){

    if(coupons[code]){

        discount = coupons[code];

        showToast(
        "Купон активирован: -" +
        discount + "%"
        );

        renderCart();

    }else{

        showToast(
        "Неверный купон"
        );

    }

}

/* ==========================
   CART TOTAL WITH DISCOUNT
========================== */

function calculateCartTotal(){

    let total = 0;

    cart.forEach(item => {

        total += item.price;

    });

    if(discount > 0){

        total =
        total -
        (total * discount / 100);

    }

    return Math.round(total);

}

/* ==========================
   SORT PRODUCTS
========================== */

const sortSelect =
document.getElementById(
"sortProducts"
);

if(sortSelect){

sortSelect.addEventListener(
"change",
() => {

const container =
document.querySelector(
".products-grid"
);

const products =
Array.from(
container.children
);

if(
sortSelect.value ===
"price-low"
){

products.sort((a,b)=>{

const p1 =
Number(
a.querySelector(".price")
.innerText.replace("$","")
);

const p2 =
Number(
b.querySelector(".price")
.innerText.replace("$","")
);

return p1 - p2;

});

}

if(
sortSelect.value ===
"price-high"
){

products.sort((a,b)=>{

const p1 =
Number(
a.querySelector(".price")
.innerText.replace("$","")
);

const p2 =
Number(
b.querySelector(".price")
.innerText.replace("$","")
);

return p2 - p1;

});

}

container.innerHTML = "";

products.forEach(item => {

container.appendChild(item);

});

}
);

}

/* ==========================
   PRICE FILTER
========================== */

const priceFilter =
document.getElementById(
"priceFilter"
);

if(priceFilter){

priceFilter.addEventListener(
"input",
() => {

const maxPrice =
Number(
priceFilter.value
);

document
.querySelectorAll(
".product-card"
)
.forEach(card => {

const price =
Number(
card
.querySelector(".price")
.innerText
.replace("$","")
);

if(price <= maxPrice){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}
);

}

/* ==========================
   USER STATISTICS
========================== */

let stats =
JSON.parse(
localStorage.getItem(
"techzone_stats"
)
) || {

visits:0,
orders:0

};

stats.visits++;

localStorage.setItem(
"techzone_stats",
JSON.stringify(stats)
);

console.log(
"Посещений:",
stats.visits
);

/* ==========================
   ORDER STATISTICS
========================== */

if(checkoutBtn){

checkoutBtn.addEventListener(
"click",
() => {

stats.orders++;

localStorage.setItem(
"techzone_stats",
JSON.stringify(stats)
);

}
);

}

/* ==========================
   LAST LOGIN DATE
========================== */

const loginDate =
new Date()
.toLocaleString();

localStorage.setItem(
"techzone_last_login",
loginDate
);

/* ==========================
   AUTO GREETING
========================== */

window.addEventListener(
"load",
() => {

const user =
localStorage.getItem(
"techzone_user"
);

if(user){

showToast(
"С возвращением, " +
user + " 👋"
);

}

}
);

/* ==========================
   FEATURED PRODUCT
========================== */

const cards =
document.querySelectorAll(
".product-card"
);

if(cards.length){

const randomCard =
cards[
Math.floor(
Math.random() *
cards.length
)
];

randomCard.classList.add(
"neon-purple"
);

}

/* ==========================
   KEYBOARD SHORTCUTS
========================== */

document.addEventListener(
"keydown",
(e) => {

if(
e.key === "/"
){

e.preventDefault();

searchInput.focus();

}

if(
e.key === "Escape"
){

closeProductModal();

closeLoginModal();

}

}
);

/* ==========================
   SAVE SCROLL POSITION
========================== */

window.addEventListener(
"beforeunload",
() => {

localStorage.setItem(
"scrollPos",
window.scrollY
);

}
);

window.addEventListener(
"load",
() => {

const pos =
localStorage.getItem(
"scrollPos"
);

if(pos){

window.scrollTo(
0,
Number(pos)
);

}

}
);

/* ==========================
   RANDOM ONLINE USERS
========================== */

const onlineUsers =
Math.floor(
Math.random() * 500
) + 100;

console.log(
"Сейчас онлайн:",
onlineUsers
);


console.log(
"TECHZONE MAX PRO LOADED"
);