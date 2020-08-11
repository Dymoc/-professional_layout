let catalogOfIndex = {
    urlBD: 'https://raw.githubusercontent.com/Dymoc/static/master/JSON/bdTovarOfIndex.json',
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
                catalogOfCart.addToCart(key.target.id, this.items);
            });
        }
    },
}

let catalogOfCatalog = {
    urlBD: 'https://raw.githubusercontent.com/Dymoc/static/master/JSON/bdTovarOfCatalog.json',
    container: null,
    button: null,
    items: [],
    init() {
        this.container = document.querySelector('#catalogOfCatalog');
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
            htmlStr += createItemTemplateOfCatalog(item);
        });
        this.container.innerHTML = htmlStr;
    },
    _handleActionsButtonAddToCart() {
        for (key of this.button) {
            key.addEventListener('click', key => {
                catalogOfCart.addToCart(key.target.id, this.items);
            });
        }
    },
}

let catalogOfCart = {
    urlBD: 'https://raw.githubusercontent.com/Dymoc/static/master/JSON/bdCart.json',
    container: null,
    totalCoast: null,
    quantity: null,
    button: null,
    items: [],

    init() {
        this.container = document.querySelector('#myCart');
        this.totalCoast = document.getElementById('totalCoast');
        this.quantity = document.querySelector('.header__cart_quantity');

        this.fillCart();
    },
    fillCart() {
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
            htmlStr += createItemTemplateOfCart(item);
        });
        this.container.innerHTML = htmlStr;

        this.button = document.querySelectorAll('.delFromCart');        
        setTimeout(this._handleActionsButtonDelFromCart(),200);        
        this._quantity();
        this._totalCoast();
    },
    
    _handleActionsButtonDelFromCart() {
        for (key of this.button) {
            key.addEventListener('click', key => {
                this._delFromCart(key.target.id);
            });
        }
    },

    addToCart(productId, items) {
        
        if (!(this._chekInCartProduct(productId))) {
            for (el of items) {
                if (el.productId == productId) {
                    this.items.push(el);
                    el.productQuantity = 1;
                }
            }
        }
        this._render();
    },

    _chekInCartProduct(productId) {
        for (elCart of this.items) {
            if (elCart.productId.includes(productId)) {
                elCart.productQuantity += 1;
                return true;
            }
        }
        return false;
    },

    _delFromCart(productId) {
        for (el of this.items) {
            if (el.productQuantity == 1 && el.productId == productId) {
                let index = this.items.indexOf(el);
                delete this.items.splice(index, 1);
            } else if (el.productQuantity != 1 && el.productId == productId) {
                el.productQuantity -= 1;
            }
        }
        this._render();
    },

    _totalCoast() {
        this.totalCoast.innerHTML = '$' + this._sumOfProduct(this.items, this.productQuantity);
    },

    _sumOfProduct() {
        let coast = 0;
        for (el of this.items) {
            coast = coast + el.productPrice * el.productQuantity;
        }
        return coast;
    },

    _quantity() {
        this.quantity.innerHTML = this._quantityOfCart(this.items);
        this.quantity.style.display = 'block';
    },

    _quantityOfCart() {
        let quantity = 0;
        for (el of this.items) {
            quantity += el.productQuantity;
        }
        return quantity;
    }
}

function createItemTemplate(item) {
    return `<div name="add_to_cart" class = "tovar_cart">
    <div class = "add_to_cart" >
        <a><img src = "../src/assets/imgs/tovar_hover.png" alt = ""></a> 
        <submit  style="cursor:pointer" class = "button_add_to_cart" id = "${item.productId}"> Add to Cart</submit> 
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