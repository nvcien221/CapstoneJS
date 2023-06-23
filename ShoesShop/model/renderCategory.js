function getCategory(){
  axios({
      method: 'get',
      url: 'https://shop.cyberlearn.vn/api/Product/getAllCategory',
    }).then(function(result){
      renderCategory(result.data.content) ;
    }).catch(function(error){
     alert("Tải danh sách sản phẩm thất bại!");
    })
}
getCategory();



const listCategory = [];
function renderCategory(Category){
    const boxCategory = document.getElementById('category-tab');
    

    for( const sp of Category){
      const isCheck = Category.includes(sp.category);
      if(!isCheck){
        listCategory.push(sp.category);
      }
    }

    
    const contentCategory = ["All",...listCategory].map((category)=>{
      return `
      <li class="nav-item" style="margin-right: 4px;" >
                <button onclick = "setCategory('${category}')" style = "background: linear-gradient(to right, #227df9, #7462f9, #df3ef8);"
                class="nav-link active" 
                id="category-${category}-tab" 
                data-bs-toggle="pill" 
                data-bs-target="#category-${category}" type="button" >${category}</button>
            </li>
      `
    });
    boxCategory.innerHTML = contentCategory.join("");
} 
//console.log(listCategory)


// function getListCategory(category,SP){
//   if(category == "All") return SP;

//   const newListShoes = SP.filter((sp)=>{
//     return sp.category == category;
//   });
//   return newListShoes;
// }
// getListCategory(listCategory,SP);
// console.log(newListShoes);
