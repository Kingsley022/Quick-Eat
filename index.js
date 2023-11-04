// handles Page Script Activation
document.addEventListener("DOMContentLoaded", ()=> {
    indexPage();
});
// Scripts for Index Page
const indexPage =()=>{
    const navList = document.getElementById("menu-items");
    const menuEl = document.getElementById("menu-icon");
    const cancelEl = document.getElementById("cancel-icon");
    let cartTotalEL = document.querySelector(".cart-total");

    menuEl.addEventListener("click", () => {
        menuEl.classList.remove('active-icon');
        cancelEl.classList.add("active-icon");
        navList.classList.add("menu-active");
    });

    cancelEl.addEventListener("click", ()=>{
        cancelEl.classList.remove("active-icon");
        menuEl.classList.add("active-icon");
        navList.classList.remove("menu-active");
    });

    // Adding Item Cart
    const cartBtns = document.querySelectorAll("#order-btnn");
    cartBtns.forEach(cartBtn => {
        cartBtn.addEventListener("click", function(){
            addItemToCart(cartBtn.parentElement)
        })
    });

    const numCartItems = JSON.parse(localStorage.getItem("cartItems"));
    console.log(numCartItems)
    if(numCartItems < 1 | !numCartItems){
        cartTotalEL.style.display= "none";
    }else{
        cartTotalEL.innerText = numCartItems.length;
    }
}

// Adding items to cart
const addItemToCart = (item) => {
    if(item){
        const name = item.querySelector(".name").textContent;
        const price = item.querySelector(".price").textContent;
        const image = item.querySelector("img").src
        const formatedPrice = price.replace(/[^\d]/g, "");

        const cartItem = {
            name,
            image,
            price: formatedPrice,
            quantity: 1
        }

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(cartItem);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
}
