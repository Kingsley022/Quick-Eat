// handles Page Script Activation
document.addEventListener("DOMContentLoaded", ()=> {
    if(window.location.pathname === "/index.html"){
        indexPage();
    }else if(window.location.pathname === "/cart.html"){
        cartScripts();
    }
});
console.log(window.location.pathname)
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
    if(numCartItems < 1 | !numCartItems){
        cartTotalEL.style.display= "none";
    }else{
        cartTotalEL.innerText = numCartItems.length;
    }
}

// Adding items to cart
const addItemToCart = (item) => {
    console.log("added")
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

// Create cart items
const createCartItems = (cartItems) =>{
    const cartItemsContainer = document.querySelector(".cart-items");
    
    cartItems.forEach((cartItem, index) => {
        const cartItemContainer = document.createElement("div")
        cartItemContainer.classList.add("cart-item");

        const cartElements = `<img src="${cartItem?.image}" alt="">
        <p class="item-name">${cartItem?.name}</p>
        <p class="item-price">₦${cartItem?.price}</p>

        <div class="quantity-container">
            <button class="subtract">-</button>
            <p class="quantity">${cartItem?.quantity}</p>
            <button class="add">+</button>
        </div>

        <i class="fa-solid fa-xmark" id="deleteBtn"></i>`

        cartItemContainer.innerHTML = cartElements;
        cartItemsContainer.prepend(cartItemContainer);
    });
    
}

const cartScripts =()=> {
    let cartItems  = JSON.parse(localStorage.getItem("cartItems")) || [];
    createCartItems(cartItems);

    // Cart Scripts begin here
    const incrementBtns = document.querySelectorAll('.add');
    const decrementBtns = document.querySelectorAll('.subtract');
    const quantities = document.querySelectorAll('.quantity');


    incrementBtns.forEach((incrementBtn, index) => {
        incrementBtn.addEventListener("click", () => {
            // let currentQuantity = parseInt(quantities[index].innerText);
            // currentQuantity++;
            // cartItems[index].quantity = currentQuantity +1
            // quantities[index].innerText = currentQuantity;
            
            cartItems[index].quantity +=1;
            quantities[index].innerText = cartItems[index].quantity;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            handleItemsTotal();
        })
    });

        decrementBtns.forEach((decrementBtn, index) =>{
            decrementBtn.addEventListener("click", () => {
                // let currentQuantity = parseInt(quantities[index].innerText);
                // if(currentQuantity > 1) currentQuantity-=1
                // quantities[index].innerText = currentQuantity;
                // cartItems[index].quantity = currentQuantity;

                if(cartItems[index].quantity > 1){
                    cartItems[index].quantity -=1;
                    quantities[index].innerText = cartItems[index].quantity;
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    handleItemsTotal();
                }
                
            })
        });

    // Summing up cart items
    const handleItemsTotal = () => {
        const itemPrices = document.querySelectorAll(".item-price");
        let itemsTotal = 0;

        itemPrices.forEach((item, index) => {
            const currentPrice = parseFloat(item.innerText.replace("₦", ""));
            const quantity = parseInt(quantities[index].innerText);
            itemsTotal+=currentPrice * quantity;
        });

        const subTotal = document.getElementById("sub-total");
        subTotal.innerText = itemsTotal

        const total = document.getElementById("total");
        total.innerText = itemsTotal + 1200;

    }
    handleItemsTotal();

    // Deleting a cart item
    const deleteBtns = document.querySelectorAll("#deleteBtn");
    deleteBtns.forEach((deleteBtn, index) => {
        deleteBtn.addEventListener("click", function(){
            const cartItem = this.closest(".cart-item");
            cartItem.remove();
            cartItems.splice(index, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            handleItemsTotal();
        })
    })

}