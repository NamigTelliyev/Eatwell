const products=document.getElementById("products");
const inp1=document.getElementById("inp1");
const inp2=document.getElementById("inp2");
const inp3=document.getElementById("inp3");
const form=document.getElementById("form")
const formSrc=document.getElementById("formSrc")
const inp=document.getElementById("inp")



//search by name
formSrc.addEventListener("submit", srcFunc)
function srcFunc(e){
    e.preventDefault()
    products.innerHTML=''
    axios.get("https://655c846525b76d9884fd70e4.mockapi.io/products")
    .then(res=>{
        let data=res.data;
      let datas =  data.filter((item)=> item.title.toLowerCase().includes(inp.value.toLowerCase()))
      datas.forEach(item => {
            const box = document.createElement('div');
            box.className = 'col content';
            box.innerHTML = `<img src="${item.image}" alt="img">
                    <h2>${item.title}</h2>
                    <p>${item.price} $</p>
                    <div class="basket"><button class="btn" onclick="addToBasket(${item.id})">Add to Basket</button>
                    <i class="fa-solid fa-heart"></i></div>
                `;
            products.appendChild(box);
        });
 
    })


}


// form validation
function postForm(e){
    e.preventDefault()
        axios.post("https://655c846525b76d9884fd70e4.mockapi.io/forms",
        {
            firstname:inp1.value,
            email:inp2.value,
            message:inp3.value,
    
        })
        .then(res=>{
            console.log(res);
            form.reset();
        })
    }
    
    form.addEventListener("submit",postForm)






//get product/ productlari getirmek
    function getProduct() {
        axios.get(`https://655c846525b76d9884fd70e4.mockapi.io/products`)
            .then(response => {
                const data = response.data;
                db = data;
                db.forEach(item => {
                    const box = document.createElement('div');
                    box.className = 'col content';
                    box.innerHTML = `<img src="${item.image}" alt="img">
                            <h2>${item.title}</h2>
                            <p>${item.price} $</p>
                            <div class="basket"><button class="btn" onclick="addToBasket(${item.id})">Add to Basket</button>
                            <i class="fa-solid fa-heart" onclick="wishlist(${item.id})"></i></div>
                        `;
                    products.appendChild(box);
                });
            })
    }
    getProduct();


//ad to basket
function addToBasket(id){
    let cart=JSON.parse(localStorage.getItem("cart")) || []
    cart.push(db.find(item=>item.id==id))
    localStorage.setItem("cart",JSON.stringify(cart))
}


//wishlist
function wishlist(id){
    let heart=JSON.parse(localStorage.getItem("heart")) || []
    heart.push(db.find(item=>item.id==id))
    localStorage.setItem("heart",JSON.stringify(heart))
}


//sort

function sortByPrice() {
    db.sort((a, b) => a.price - b.price);
    displayProducts(db);
}
