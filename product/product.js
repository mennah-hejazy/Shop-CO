document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(urlParams);
    console.log(productId);
    if (!productId) {
        console.error('No product ID found in URL.');
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id == productId);

    if (product) {
        displayProductDetails(product);
    } else {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.innerHTML = 'Product not found.';
        } else {
            console.error('.hero-section not found.');
        }
    }
});

function displayProductDetails(product) {
    const leftDiv = document.querySelector('.left');
    const rightUpDiv = document.querySelector('.right-up');

    if (leftDiv) {
        leftDiv.innerHTML = `<img src="${product.image}">`;
    } else {
        console.error('.left not found.');
    }

    if (rightUpDiv) {
        rightUpDiv.innerHTML = `
            <h1>${product.title}</h1>
            <div>
                <h2 class = "rate"></h2>
                <h2 class = "product-rating">${product.rating.rate}/5</h2>
            </div>
            <h3>$${product.price}</h3>
            <p>${product.description}</p>
        `;
    } else {
        console.error('.right-up not found.');
    }

    setupButtons(product);
    stars(product.rating.rate);
}
function stars(rating){

    const rate = document.querySelector('.rate')
    for (let i = 0; i < Math.floor(rating); i++){
        const starIcon = document.createElement('i');
        starIcon.classList.add('fa-solid', 'fa-star');
        rate.appendChild(starIcon);
    }
    if (rating % 1 !== 0){
        const halfStarIcon = document.createElement('i');
        halfStarIcon.classList.add('fa-solid', 'fa-star-half');
        rate.appendChild(halfStarIcon);
    }
}

function setupButtons(product) {
    const addButton = document.querySelector('.cart-stuff .add');
    const subtractButton = document.querySelector('.cart-stuff .subtract');
    const cartButton = document.querySelector('.cart-stuff .add-to-cart');
    const countDisplay = document.querySelector('.cart-stuff .count');

    if (addButton && subtractButton && cartButton && countDisplay) {
        let count = parseInt(countDisplay.textContent) || 1;

        addButton.addEventListener('click', () => {
            count += 1;
            countDisplay.textContent = count;
        });

        subtractButton.addEventListener('click', () => {
            if (count > 1) {
                count -= 1;
                countDisplay.textContent = count;
            }
        });

        cartButton.addEventListener('click', () => {
            addToCart(product, count);
        });
    } else {
        console.error('One or more elements for buttons and count display are not found.');
    }
}

function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    window.location.href = '../cart/cart.html';
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    } else {
        console.error('#cart-count element not found.');
    }
};





