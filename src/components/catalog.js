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
            productId: 'prod_' + i,
            productQuantity: 1,
            //rates (звезды)
        })
    }
    return local;
}

function addToCart(productId, items) {
    for (el of catalogOfCart.items) {
        if (el.productId == productId) {
            el.productQuantity += 1;
        }
    }
    for (el of items) {
        if (el.productId == productId) {
            catalogOfCart.items.push(el);
        }
    }
    catalogOfCart.items = catalogOfCart.items.filter(getUniqueItems);
    catalogOfCart.init();
}

function delFromCart(productId, items) {
    for (el of items) {

        if (el.productQuantity == 1 && el.productId == productId) {
            let index = items.indexOf(el)
            delete items.splice(index, 1);
        } else {
            if (el.productId == productId) {
                el.productQuantity -= 1;
            }
        }
    }
    catalogOfCart.init();
}

function getUniqueItems(value, index, self) {
    return self.indexOf(value) === index;
}

function sumTovarOfCart(items) {
    let coast = 0;
    for (el of items) {
        coast = coast + el.productPrice * el.productQuantity;
    }
    return coast;
}

function quantityOfCart(items) {
    let quantity = 0;
    for (el of items) {
        quantity += el.productQuantity;
    }
    return quantity;
}

let catalogOfIndex = {
    urlBD: 'https://raw.githubusercontent.com/Dymoc/static/master/JSON/bdTovar.json',
    container: null,
    button: null,
    items: [],
    init() {
        this.container = document.querySelector('#catalog');
        this._fillCatalog();

        setTimeout(() => {
            this.button = document.querySelectorAll('.add_to_cart');
            this._handleActionsButtonAddToCart();
        }, 200);
    },
    _fillCatalog() {       
        fetch(this.urlBD)
            .then(data => data.json())
            .then(items => this.items = items)
            .catch(() => {
                console.log('err')
            })
            .finally(() => {
                this._render();
            });

    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += createItemTemplate(item);
        });
        this.container.innerHTML = htmlStr;
    },
    _handleActionsButtonAddToCart() {
        for (key of this.button) {
            key.addEventListener('click', key => {
                addToCart(key.target.id, this.items);
            });
        }
    },
}

let catalogOfCatalog = {
    container: null,
    button: null,
    items: [],
    init() {
        this.container = document.querySelector('#catalogOfCatalog');
        this._fillCatalog();
        this._render();

        setTimeout(() => {
            this.button = document.querySelectorAll('.add_to_cart');
            this._handleActionsButtonAddToCart();
        }, 200);
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
    },
    _handleActionsButtonAddToCart() {
        for (key of this.button) {
            key.addEventListener('click', key => {
                addToCart(key.target.id, this.items);
            });
        }
    },
}

let catalogOfCart = {
    container: null,
    totalCoast: null,
    quantity: null,
    button: null,
    items: [],

    init() {
        this.container = document.querySelector('#myCart');
        this.totalCoast = document.getElementById('totalCoast');
        this.quantity = document.querySelector('.header__cart_quantity');
        this._render();
        this._totalCoast();
        this._quantity();

        setTimeout(() => {
            this.button = document.querySelectorAll('.delFromCart');
            this._handleActionsButtonDelFromCart();
        }, 200);

    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += createItemTemplateOfCart(item);
        });
        this.container.innerHTML = htmlStr;
    },
    _totalCoast() {
        this.totalCoast.innerHTML = '$' + sumTovarOfCart(this.items, this.productQuantity);
    },
    _quantity() {
        this.quantity.innerHTML = quantityOfCart(this.items);
        this.quantity.style.display = 'block';
    },
    _handleActionsButtonDelFromCart() {
        for (key of this.button) {
            key.addEventListener('click', key => {
                delFromCart(key.target.id, this.items);
            });
        }
    },
}

function createItemTemplate(item) {
    return `<div name="add_to_cart" class = "tovar_cart">
    <div class = "add_to_cart" >
        <a><img src = "../src/assets/imgs/tovar_hover.png" alt = ""></a> 
        <div  style="cursor:pointer" class = "button_add_to_cart" id = "${item.productId}"> Add to Cart</div> 
    </div> 
    <img src = "${item.productImg}" alt = "">
    <div class = "tovar_info" > ${item.productName}</div> 
    <div class = "tovar_price siteColor">$${item.productPrice}</div> 
    <div class = "stars"><img src = "../src/assets/imgs/stars.png" alt = ""></div>
</div>`
}

function createItemTemplateOfCatalog(item) {
    return `<div class="tovar_cart">
    <div class="add_to_cart"
        <a href="single_page.html"><img src="../src/assets/imgs/tovar_hover.png" alt=""></a>
        <a style="cursor:pointer" class="button_add_to_cart" id = '${item.productId}'>Add to Cart</a>
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
                            class="cart__img" height="90px" style="margin-right:10px"></a>
                    <div class="cart__discription">
                        <a href="single_page.html">
                            <div class="cart__name">${item.productName}</div>
                        </a>
                        <img src="../src/assets/imgs/stars.png" alt="">
                        <div class="cart__coast siteColor"><span class="quantity">${item.productQuantity}</span><span class="cart__coast_x">x</span> $${item.productPrice}</div>
                    </div>
                    <a class="delFromCart" ><i class="fas fa-backspace cart__action" id = "${item.productId}"></i></a>
                </div>
            </li>`
}