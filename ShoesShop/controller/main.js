
//popup cart
document.querySelector("#clickCart").addEventListener('click',function(){
    document.querySelector('.modal-cart').classList.toggle('show');
});
document.querySelector(".fa-xmark").addEventListener('click',function(){
    document.querySelector('.modal-cart').classList.toggle('show');
});

let productInCart = localStorage.getItem("SP") ? JSON.parse(localStorage.getItem("SP")) : []



function saveToLocalStorage(){
  localStorage.setItem('SP',JSON.stringify(productInCart));
}



let SP = {};
function renderItem(){
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product',
      }).then(function(result){
        SP = result.data.content;
        
       renderListProduct(result.data.content);
      //console.log(result.data.content);
      }).catch(function(error){
       alert("Tải danh sách sản phẩm thất bại!");
      })
}
renderItem();


let newListProductByCategory = [];

function setCategory(category) {
  if (category === "All") {
    newListProductByCategory = [...SP]; 
  } else {
    newListProductByCategory = SP.filter(product => {
      const categories = JSON.parse(product.categories);
      return categories.some(item => item.category === category);
    });
  }
  renderListProduct(newListProductByCategory);
}








function renderListProduct(mang){
  const boxProduct = document.querySelector("#list-product");
 
  const content = mang.map((sp)=>{
    const { id, name, image, price } = sp;
    return `
    <div
        class="col-sm-6 mt-5 col-lg-3"
        data-aos="zoom-in"
        data-aos-duration="00"
        >
        <div class="wrap-featured-product-cart">
          <div class="discount">18%</div>
          <div class="featured-product-cart">
            <div class="product-img">
              <img
                src="${image}"
                alt=""
              />
            </div>
            <p class="product-name cus-margin-top-bot-8px">${name} </p>
            <div class="product-price cus-margin-top-bot-8px">
              <span class="old-price">${parseInt(price*118/100)}$</span>
              <span class="current-price">${price}$</span>
            </div>
            <p class="product-origin cus-margin-top-bot-8px">
              Xuất sứ: Việt Nam
            </p>
          </div>
          <div class="btnItem">
            <button class="showItem" style="width: 40%; background-color: #E1B067; border-top-left-radius: 8px; border-bottom-left-radius: 8px;">
              Buy Now
            </button>
            <button onclick = addToCart('${id}') onclick = renderCart() class="add-to-cart" style="width: 60%; color: #ee4d2d; border-top-right-radius: 8px; border-bottom-right-radius: 8px;">
              Add To Cart<i class="fa-solid fa-basket-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    `
  });
  boxProduct.innerHTML = content.join(""); 
}




function addToCart(id){
  
  let checkProduct = productInCart.some(value => value.id == id)
  //console.log(checkProduct);
  if(!checkProduct){
    //console.log("SP:",SP);
    let product = SP.find(value => value.id == id)
    //console.log(product);
    productInCart.push({
      ...product,
      quantity: 1
    })
    localStorage.setItem('SP',JSON.stringify(productInCart))
    renderCart();
    calcTotalSP();
  }
  else{
    let getIndex = productInCart.find(value => value.id == id)
    console.log("lấy index ",getIndex)
    let product = productInCart.find(value =>value.id == id)
    productInCart[getIndex] = {
      ...product,
      quantity : ++product.quantity
    }
    localStorage.setItem('SP',JSON.stringify(productInCart))
    renderCart();
    calcTotalSP();
  }

}


function renderCart() {
  if (productInCart.length >= 0) {
    // nếu có sản phẩm thì render ở đây
    let htmls = productInCart.map((e,index) => {
      return `<div class="item">
      <div class="item-main">
        <div class="item-img">
          <img
            src="${e.image}"
            alt=""
          />
        </div>
        <div class="item-info">
          <p class="item-info-name">${e.name}</p>
          <p class="item-info-unit-price">Đơn giá: <span>${e.price*e.quantity}$</span></p>
          <div class="quantity-product-group">
          <button  onclick='minusQuantity(${index})'  class="minus-quantity-detail-product">
            <i class="fa-solid fa-minus"></i>
          </button>
          <input
            type="text"
            class="quantity-product"
            value="${e.quantity}"
          />
          <button onclick='plusQuantity(${index})' class="plus-quantity-detail-product">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        </div>
      </div>
      <div onclick ='deleteProductInCart(${index})' class="item-remove">
        <i class="fa-solid fa-trash-can"></i>
      </div>
    </div>
      `;
    });

    document.querySelector("#showCart").innerHTML = htmls.join("");
  }
  if(productInCart.length == 0){
    
    document.querySelector("#showCart").innerHTML = 
      `<div class="img-empty-cart">
      <img src="./assets/image/cart-empty.jpg" alt="">
      </div>
     `;
  }
}


function getListShoeBuyPriceD(){
  const newListSort = [...SP].sort((sp2,sp1)=>{
    return sp1.price - sp2.price;
  });
  renderListProduct(newListSort);
}
function getListShoeBuyPriceU(){
  const newListSort = [...SP].sort((sp2,sp1)=>{
    return sp2.price - sp1.price;
  });
  renderListProduct(newListSort);
}

//
var newListShoe = [];
function getListShoeBuySearch(mang){
  const newListShoe = mang.filter((sp)=>{
    return sp.name.toLowerCase().includes(keySearch.toLowerCase().trim());
  });
  //console.log(newListShoe);
  renderListProduct(newListShoe);
}
let keySearch = "";
document.querySelector(".boxIcon").addEventListener("click", () => {
  const text = document.querySelector(".txtSearch").value;
  keySearch = text;
  getListShoeBuySearch(SP);
});













function plusQuantity(index){
  productInCart[index] ={
    ...productInCart[index],
    quantity : ++productInCart[index].quantity
  }
  sumPrice();
  saveToLocalStorage();
  renderCart();
}

function minusQuantity(index){
  if(productInCart[index].quantity > 1){
    //console.log(productInCart[index].quantity);
    productInCart[index] ={
      ...productInCart[index],
      quantity : --productInCart[index].quantity
    }
    sumPrice();
    saveToLocalStorage();
    renderCart();
  }
}

function deleteProductInCart(index){
  productInCart.splice(index, 1);
  sumPrice();
  saveToLocalStorage();
  renderCart();
}

function continueShopping(){
  document.querySelector('.modal-cart').classList.toggle('show');

}

function calcTotalSP(){
  document.querySelector(".showCart").textContent = productInCart.length;
}


function sumPrice(){
  if(productInCart != []){
    let total = 0;
    productInCart.map((item)=>{
      total += item.price*item.quantity;
      //console.log(item.price,item.quantity);
    })
    document.querySelector('#totalPrice').innerHTML = total.toLocaleString();
  }
}

function indexLoadPage(){
  renderCart();
  calcTotalSP();
  sumPrice();
}







