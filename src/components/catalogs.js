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
        }, 350);
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
                cart.addToCart(key.target.id, this.items);
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
        }, 350);
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
                cart.addToCart(key.target.id, this.items);
            });
        }
    },
}

function createItemTemplate(item) {
    return `<div name="add_to_cart" class = "tovar_cart">
    <div class = "add_to_cart" >
        <a><img src = "../src/assets/imgs/tovar_hover.png" alt = ""></a> 
        <button  style="cursor:pointer" class = "button_add_to_cart" id = "${item.productId}"> Add to Cart</button> 
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
        <button style="cursor:pointer" class="button_add_to_cart" id = '${item.productId}'>Add to Cart</button>
        <button style="cursor:pointer" class="button_arrows"></button>
        <button style="cursor:pointer" class="button_like"></button>
    </div>
    <img src="${item.productImg}" alt="">
    <div class="tovar_info">${item.productName}</div>
    <div class="tovar_price siteColor">$${item.productPrice}</div>
    <div class="stars"><img src="../src/assets/imgs/stars.png" alt=""></div>
</div>`
}

