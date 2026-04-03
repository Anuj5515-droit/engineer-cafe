let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item, price){
let existing = cart.find(i => i.item === item);

if(existing){
existing.qty += 1;
}else{
cart.push({item, price, qty:1});
}

localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
}

function loadCart(){
let list = document.getElementById("cart-items");
let total = 0;
list.innerHTML="";

cart.forEach((i,index)=>{
let li = document.createElement("li");

li.innerHTML = `
${i.item} ₹${i.price} 
<div class="qty-box">
<button onclick="changeQty(${index},-1)">➖</button>
<span>${i.qty}</span>
<button onclick="changeQty(${index},1)">➕</button>
</div>

<button class="remove-btn" onclick="removeItem(${index})">❌</button>
`;

list.appendChild(li);
total += i.price * i.qty;
});

document.getElementById("cart-total").innerText = total;
}

function changeQty(index,change){
cart[index].qty += change;

if(cart[index].qty <= 0){
cart.splice(index,1);
}

localStorage.setItem("cart", JSON.stringify(cart));
loadCart();
}

function removeItem(index){
cart.splice(index,1);
localStorage.setItem("cart", JSON.stringify(cart));
loadCart();
}

function placeOrder(){
document.getElementById("loader").style.display="block";

setTimeout(()=>{
localStorage.setItem("receipt",JSON.stringify(cart));
localStorage.removeItem("cart");
window.location="receipt.html";
},1500);
}

window.onload=function(){
if(document.getElementById("cart-items")) loadCart();
if(document.getElementById("receipt-items")) loadReceipt();
}

function placeOrder(){
localStorage.setItem("receipt",JSON.stringify(cart));
localStorage.removeItem("cart");
window.location="receipt.html";
}

function loadReceipt(){
let data=JSON.parse(localStorage.getItem("receipt"))||[];
let total=0;
let list=document.getElementById("receipt-items");

data.forEach(i=>{
let li=document.createElement("li");
li.textContent=i.item+" ₹"+i.price;
list.appendChild(li);
total+=i.price;
});

document.getElementById("receipt-total").innerText=total;
showPopup();
}

function showPopup(){
document.getElementById("success-popup").style.display="flex";
}

function closePopup(){
document.getElementById("success-popup").style.display="none";
}

window.onload=function(){
if(document.getElementById("cart-items")) loadCart();
if(document.getElementById("receipt-items")) loadReceipt();
}

function toggleDark(){
document.body.classList.toggle("dark");
}
function searchMenu(){
let input=document.getElementById("search").value.toLowerCase();
let items=document.querySelectorAll(".card");

items.forEach(card=>{
let text=card.innerText.toLowerCase();
card.style.display=text.includes(input) ? "block" : "none";
});
}