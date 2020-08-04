const imgURL = 'https://raw.githubusercontent.com/Dymoc/static/master/img/';
let NAMES = [
    'MANGO PEOPLE T-SHIRT',
    'BANANA PEOPLE T-SHIRT',
    'STRAWBERRY PEOPLE T-SHIRT',
    'ORANGE PEOPLE T-SHIRT',
    'PUMKIN PEOPLE T-SHIRT',
    'PINEAPPLE PEOPLE T-SHIRT',
    'CUCUMBER PEOPLE T-SHIRT',
    'TOMATO PEOPLE T-SHIRT',
    'TOMATO PEOPLE T-SHIRT',
];
let PRICES = [52, 53, 55, 67, 69, 94, 23, 45, 56];

function getArrayOfObjects(num) {
    let local = [];

    for (let i = 0; i < num; i++) {
        local.push({
            productName: NAMES[i],
            productPrice: PRICES[i],
            productImg: `${imgURL}image_placeholder_${i + 1}.png`,
            productId: 'prod_' + i
            //rates (звезды)
        })
    }
    return local;
}

let catalogOfIndex = {
    button: null,
    container: null,
    items: [],
    init() {
        this.container = document.querySelector('#catalog');
        this._fillCatalog();


        setTimeout(() => {
            this._render();
            this.button = document.querySelectorAll('.add_to_cart');
        }, 200);
    },
    _fillCatalog() {
        this.items = getArrayOfObjects(8);
    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += createItemTemplate(item);
        });
        this.container.innerHTML = htmlStr;
    },

    _handleActionsButtonAddToCart() {
        this.button.addEventListener('click', evt => {
            console.log('yes');
        });
    }
}

let catalogOfCatalog = {
    container: null,
    items: [],
    init() {
        this.container = document.querySelector('#catalogOfCatalog');
        this._fillCatalog();
        this._render();
    },
    _fillCatalog() {
        this.items = getArrayOfObjects(9);
    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += createItemTemplateOfCatalog(item);
        });
        this.container.innerHTML = htmlStr;
    }
}

function createItemTemplate(item) {
    return `<div class = "tovar_cart" id = "${item.productId}">
    <div class = "add_to_cart">
        <a href = "single_page.html"><img src = "../src/assets/imgs/tovar_hover.png" alt = ""></a> 
        <div style="cursor:pointer" class = "button_add_to_cart" > Add to Cart</div> 
    </div> 
    <img src = "${item.productImg}" alt = "">
    <div class = "tovar_info" > ${item.productName}</div> 
    <div class = "tovar_price siteColor">$${item.productPrice}</div> 
    <div class = "stars"><img src = "../src/assets/imgs/stars.png" alt = ""></div>
</div>`
}

function createItemTemplateOfCatalog(item) {
    return `<div class="tovar_cart" id = '${item.productId}'>
    <div class="add_to_cart"
        <a href="single_page.html"><img src="../src/assets/imgs/tovar_hover.png" alt=""></a>
        <a style="cursor:pointer" class="button_add_to_cart">Add to Cart</a>
        <a style="cursor:pointer" class="button_arrows"></a>
        <a style="cursor:pointer" class="button_like"></a>
    </div>
    <img src="${item.productImg}" alt="">
    <div class="tovar_info">${item.productName}</div>
    <div class="tovar_price siteColor">$${item.productPrice}</div>
    <div class="stars"><img src="../src/assets/imgs/stars.png" alt=""></div>
</div>`
}

function createItemTemplateOfCart(item) {
    return `<li class="myCart__link">
                <div class="cart">
                    <a href="single_page.html"><img src="${item.productImg}" alt=""
                            class="cart__img"></a>
                    <div class="cart__discription">
                        <a href="single_page.html">
                            <div class="cart__name">${item.productName}</div>
                        </a>
                        <img src="../src/assets/imgs/stars.png" alt="">
                        <div class="cart__coast siteColor">1 <span class="cart__coast_x">x</span> $${item.productPrice}</div>
                    </div>
                    <a href=""><i class="fas fa-backspace cart__action"></i></a>
                </div>
            </li>`
}