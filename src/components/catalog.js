const imgURL = 'https://raw.githubusercontent.com/Dymoc/static/master/img/';
let NAMES = [
    'MANGO PEOPLE T-SHIRT',
    'BANANA PEOPLE T-SHIRT',
    'STRAWBERRY PEOPLE T-SHIRT',
    'ORANGE PEOPLE T-SHIRT',
    'PUMKIN PEOPLE T-SHIRT',
    'PINEAPPLE PEOPLE T-SHIRT',
    'CUCUMBER PEOPLE T-SHIRT',
    'TOMATO PEOPLE T-SHIRT'
];
let PRICES = [52, 53, 55, 67, 69, 94, 23, 45];

function getArrayOfObjects() {
    let local = [];

    for (let i = 0; i < NAMES.length; i++) {
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

let catalog = {
    container: null,
    items: [],
    init() {
        this.container = document.querySelector('#catalog');
        this._fillCatalog();
        this._render();
    },
    _fillCatalog() { 
        this.items = getArrayOfObjects();
    },
    _render() {
        let htmlStr = '';
        this.items.forEach(item => {
            htmlStr += createItemTemplate(item);
        });
        this.container.innerHTML = htmlStr;
    }
}

function createItemTemplate(item) {
    return `<div class = "tovar_cart ">
    <div class = "add_to_cart">
        <a href = "single_page.html"><img src = "../src/assets/imgs/tovar_hover.png" alt = ""></a> 
        <a href = "#" class = "button_add_to_cart"> Add to Cart</a> 
    </div> 
    <img src = "${item.productImg}" alt = "">
    <div class = "tovar_info" > ${item.productName}</div> 
    <div class = "tovar_price siteColor">$${item.productPrice}</div> 
    <div class = "stars"><img src = "../src/assets/imgs/stars.png" alt = ""></div>
</div>`
}


catalog.init();






 `<div class="tovar_cart" >
     <div class="add_to_cart">
         <a href="single_page.html"><img src="../src/assets/imgs/tovar_hover.png" alt=""></a>
         <a href="#" class="button_add_to_cart">Add to Cart</a>
         <a href="#" class="button_arrows"></a>
         <a href="#" class="button_like"></a>
     </div>
     <img src="../src/assets/imgs/image_placeholder_1.png" alt="">
     <div class="tovar_info">Mango People T-shirt</div>
     <div class="tovar_price siteColor">$52.00</div>
     <div class="stars"><img src="../src/assets/imgs/stars.png" alt=""></div>
 </div>`