const products=document.getElementById("product")

function getProduct(){
    products.innerHTML=""
    let cart=JSON.parse(localStorage.getItem("cart")) || []
    db=cart
    db.map((item, index) => {
        const box = document.createElement('div');
        box.className = 'col content';
        box.innerHTML = `<img src="${item.image}" alt="img">
                <h2>${item.title}</h2>
                <p>${item.price} $</p>
                <div class="basket"><button class="btnRemove" onclick="remove(${index})">Remove</button>
                <i class="fa-solid fa-heart"></i></div>
            `;
        products.appendChild(box);
    });
}
getProduct()





//ad to remove
function remove(index){
    let cart=JSON.parse(localStorage.getItem("cart")) || []
    cart.splice(index,1)
    localStorage.setItem("cart",JSON.stringify(cart))
    getProduct()
}

