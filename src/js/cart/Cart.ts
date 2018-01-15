import {BaseItem, BaseItemParams, keyValue} from '../base/BaseItem';
import {BaseCollection, BaseCollectionParams} from '../base/BaseCollection';
import * as $ from "jquery";
import {cartManager} from "./CartManager";
import {ProductItem} from "../product/Product";

export class Cart extends BaseCollection {
    constructor(params: BaseItemParams = {}) {
        super(params);
    }

    protected _init(params: BaseItemParams): void {
        this.tagName = '<ul/>';
        this.childClass = CartItem;
        this.class = 'cart__items';
    }

    protected _renderChilds(): void {
        for (let i in cartManager.products) {
            let options: keyValue = {};
            options.data = cartManager.products[i].data;
            options.data.amount = cartManager.products[i].amount;

            let child = this.createChild(options);

            this._renderChild(child);
        }
    }

    protected createChild(params: BaseItemParams): BaseItem {
        return new CartItem(params);
    }

    protected bindEvents() {
        this.el.on('click', '.delete-cart-item', function (e: any) {
            cartManager.removeItem(e.currentTarget.dataset.id);
        });

        cartManager.addHandler('add', this.render.bind(this));
        cartManager.addHandler('remove', this.render.bind(this));
    }
}

export class CartItem extends BaseItem {
    protected _init(params: BaseItemParams): void {
        this.tagName = '<li/>';
        this.class = 'cart__item cart-item';
    }

    public getLink(): string {
        return 'product.html?product=' + this.get('slug');
    }

    protected template() {
        return '<a href="'+ this.getLink() +'"><img class="cart-item__img" src="' + this.get('thumb') + '" alt="' + this.get('title') + '" height="85"></a>\n' +
            '<div class="cart-item__text">' +
                '<a class="cart-item__head" href="'+ this.getLink() +'">' + this.get('title') + '</a>' +
                '<img class="cart-item__stars" src="img/stars.png" alt="Rating">\n' +
                '<div class="cart-item__count-price">'+
                    '<span class="cart-item__count">' + this.get('amount') + '</span><i> x </i><span class="cart-item__price currency">' + this.get('price') + '</span>'+
                '</div>\n' +
            '</div>' +
            '<a class="cart-item__delete delete-cart-item" data-id="' + this.get('productId') + '" href="#item-delete"><i class="fa fa-times-circle"></i></a>\n';
    }
}

export class CartSumCounter extends BaseItem {
    public hideOnNull: boolean = false;

    protected bindEvents() {
        cartManager.addHandler('calculate', this.render.bind(this));
    }

    protected template() {
        let sum = cartManager.sum;

        if(sum == 0 && this.hideOnNull){
            this.el.hide();
            return '';
        }

        this.el.show();
        return sum.toString();
    }
}

export class CartAmountCounter extends CartSumCounter {
    protected template() {
        let amount = cartManager.amount;

        if(amount == 0 && this.hideOnNull){
            this.el.hide();
            return '';
        }

        this.el.show();
        return amount.toString();
    }
}