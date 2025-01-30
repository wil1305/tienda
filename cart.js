let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    const cartContainer = document.getElementById("cartContainer");
    const cartTotal = document.getElementById("cartTotal");
    cartContainer.innerHTML = ``;
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
        <img class="image2 image3" src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Q${item.price}</p>
        <button class="remove" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(itemDiv);
        total += parseFloat(item.price);
    })
    cartTotal.innerHTML = `Total: Q${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

window.onload = displayCart;