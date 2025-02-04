async function fetchProducts(category='all',target='home-product-list') {
    let url='https://fakestoreapi.com/products';
    if(category!=='all'){
        url=`https://fakestoreapi.com/products/category/${category}`
    }
    try{
        const response=await fetch(url);
        const products=await response.json();
        displayProducts(products,target);
    }
    catch(error){
        console.error('error fetching products:',error);
    }
}
function shortenTitle(title) {
    const words = title.split(" ");
    return words.slice(0, 4).join(" ") + (words.length > 4 ? "..." : "");
}
function generateDescription(product) {
    let description = "";
    if (product.category === "electronics") {
        description = "This is a high-performance gadget designed for tech lovers and enthusiasts. It features the latest features and technology.";
    } else if (product.category === "jewelery") {
        description = "This is a stylish piece of jewelry, crafted with precision and perfect for special occasions and daily wear.";
    } else if (product.category === "men's clothing" || product.category === "women's clothing") {
        description = "This is a trendy outfit, perfect for casual wear and versatile enough for a variety of occasions.";
    } else if (product.category === "bags") {
        description = "This is a versatile bag designed for everyday use, providing both style and practicality.";
    } else {
        description = "This is a must-have product designed for everyday needs, combining utility with style.";
    }
    const descWords = description.split(" ");
    return descWords.slice(0, 6).join(" ") + (descWords.length > 6 ? "..." : "");
}
function displayProducts(products, target) {
    const productList = document.getElementById(target);
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        const shortenedTitle = shortenTitle(product.title);
        const description = generateDescription(product);
        productElement.innerHTML = `
        <div class="card  col col-4 rounded-4" style="width: 25rem;">
        <img src="${product.image}" class="card-img-top mx-auto d-block rounded-4 pt-2 ps-2 px-2" alt="product image" style="height:250px;width:320px">
        <div class="card-body">
          <h5 class="card-title text-center">${shortenedTitle}</h5>
          <p class="card-text text-center">${description}</p>
        </div>
        <div class="card-body">
       
          <p class="card-text text-center">$${product.price}</p>
        </div>
        <div class="card-body text-center">
            <button class="btn btn-dark">Description</button>
           <button class="btn btn-dark" onclick="addToCart('${product.id}', '${product.title}', '${product.image}', '${product.price}')">Add to Cart</button>
        </div>
        

      </div>`;
        productList.appendChild(productElement);
    });
}
function filterProducts(category, target) {
    fetchProducts(category, target); 
}
window.onload = function () {
    fetchProducts('all', 'home-product-list');
}