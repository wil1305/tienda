

let cart = JSON.parse(localStorage.getItem("cart")) || [];




async function getProducts() {
    try {
        let res = await fetch("https://fakestoreapi.com/products");
        let data = await res.json();
        return data;
    } catch (error) {
        console.log("Error:", error);
    }
}

async function displayProducts() {
    let data = await getProducts();
    let productContainer = document.getElementById("productContainer");
    data.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img class="image2" src="${product.image}" alt="${product.title}" onclick="toggleDescription(${product.id})">
            <h3>${product.title}</h3>
            <p class="description" id="description${product.id}" style="display: none;">${product.description}</p>
            <p> Q ${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productContainer.appendChild(productDiv);
    })
}
displayProducts();

function toggleDescription(productId) {
    const description = document.getElementById(`description${productId}`);
    if (description.style.display === "none") {
        description.style.display = "block";
    } else {
        description.style.display = "none";
    }
}

function updateCartCount() {
    const countSpan = document.querySelector(".count");
    countSpan.textContent = cart.length;
}

function addToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        })
}

window.onload = () => {
    displayProducts();
    updateCartCount();
}