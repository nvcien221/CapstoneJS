function renderProduct(arr) {
    const content = arr.map(function (e, index) {
      return `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div class="product-item">
                      <div class="product-container">
                        <div class="discount">18%</div>
                        <div class="product-img">
                          <img
                            src="${e.img}"
                            alt=""
                          />
                        </div>
                        <p class="product-name cus-margin-top-bot-8px">
                          ${e.name}
                        </p>
                        <div class="product-price cus-margin-top-bot-8px">
                          <span class="old-price">${e.price.toFixed(2)} VNĐ</span>
                          <span class="current-price">${parseFloat(
                            e.price * (1 - e.sale / 100)
                          ).toFixed(2)} VNĐ</span>
                        </div>
                        <p class="product-type cus-margin-top-bot-8px">
                          <span class="bold"> Loại sản phẩm:</span> <span>${
                            e.type
                          }</span>  
                        </p>
                        <p class="product-weight cus-margin-top-bot-8px">
                          <span class="bold">Khối lượng:</span> ${e.weight} Kg
                        </p>
                      </div>
                      <button class="add-to-cart">
                        Thêm vào giỏ hàng <i class="fa-solid fa-basket-shopping"></i>
                      </button>
                    </div>
                  </div>`;
    });
    document.querySelector("#showCar").innerHTML = content.join("");
  }