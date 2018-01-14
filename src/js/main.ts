import {ProductCollection} from "./product/Product";
import * as $ from "jquery";
import {Cart} from "./cart/Cart";
import {cartManager} from "./cart/CartManager";

$(function () {
    let item = new ProductCollection();
    let cart = new Cart();

    item.attach('#products-list', true);
    cart.attach('#main-cart', true);

    let total = $('#cart-total');
    total.text(0);

    cartManager.addHandler('calculate', () => total.text(cartManager.sum));

    $('.categories').on('click', '.categories-single', function (e) {
        $(this).toggleClass('active');
    })

});
