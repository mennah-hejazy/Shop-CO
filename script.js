document.addEventListener('DOMContentLoaded', () => {
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
function renderProducts(products) {
    const group1Products = products.slice(0, 4); 
    const group2Products = products.slice(4);
    const productLists = document.querySelectorAll('.product-list');
    productLists.forEach(productList => {
        const group1Container = productList.querySelector('.group-1');
        const group2Container = productList.querySelector('.group-2');
        const viewAllButton = productList.querySelector('.view-all');
        group1Container.innerHTML = '';
        group2Container.innerHTML = '';
        group1Products.forEach(product => {
            const productItem = createProductItem(product);
            if (productItem) {
                group1Container.appendChild(productItem);
            }
        });
        group2Products.forEach(product => {
            const productItem = createProductItem(product);
            if (productItem) {
                group2Container.appendChild(productItem);
            }
        });
        viewAllButton.addEventListener('click', () => {
            toggleGroupVisibility(group2Container, viewAllButton);
        });
    });
}
function titleControl(title){
    if(title.length > 20){
        return title.slice(0, 20) + '...';
    }else{
        return title;
    }
}
function createProductItem(product) {
    const link = document.createElement('a');
    link.href =  `product.html?id=${product.id}`;
    const listItem = document.createElement('li');
    const img = document.createElement('img');
    img.src = product.image;
    listItem.appendChild(img);
    const title = document.createElement('h2');
    title.textContent = titleControl(product.title);
    listItem.appendChild(title);
   
    const rating = product.rating.rate;
    const rate = document.createElement('p');
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
    const rateTexting = document.createTextNode(` ${rating}/5`);
    rate.appendChild(rateTexting);
    listItem.appendChild(rate);
    const price = document.createElement('h3');
    price.textContent = `$${product.price}`;
    listItem.appendChild(price);
    console.log(product.id);
    link.appendChild(listItem);
    return link;
}
function toggleGroupVisibility(group2Container, viewAllButton) {
    const isGroup2Visible = group2Container.classList.contains('hidden');
    if (isGroup2Visible) {
        group2Container.classList.remove('hidden');
        group2Container.classList.add('visible');
        viewAllButton.textContent = 'View less';
    } else {
        group2Container.classList.remove('visible');
        group2Container.classList.add('hidden');
        viewAllButton.textContent = 'View All';
    }
}
});
const menuIcon = document.querySelector('.menu-icon');
const menuContainer = document.querySelector('.menu-container');
function toggleMenu(menuIcon, menuContainer){
    const isMenuIconVisible = menuIcon.classList.contains('visible');
    if(isMenuIconVisible){
        menuIcon.classList.add('hidden');
        menuIcon.classList.remove('visible');
        menuContainer.classList.add('visible');
        menuContainer.classList.remove('hidden');
    }
    console.log(menuContainer);
}
menuIcon.addEventListener('click', ()=> {
    toggleMenu(menuIcon, menuContainer);
});
function disappeared(menuContainer, menuIcon){
    const menuContainerVisibility = menuContainer.classList.contains('visible');
    if(menuContainerVisibility){
        menuContainer.classList.add('hidden');
        menuContainer.classList.remove('visible');
        menuIcon.classList.remove('hidden');
        menuIcon.classList.add('visible');
    }
}
menuContainer.addEventListener('click', () => {
    disappeared(menuContainer, menuIcon);
});


