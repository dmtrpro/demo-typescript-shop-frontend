import {BaseItem, BaseItemParams} from '../base/BaseItem';
import {BaseCollection, BaseCollectionParams} from '../base/BaseCollection';
import * as $ from "jquery";
import {cartManager} from "../cart/CartManager";

export class ProductCollection extends BaseCollection {
    protected childClass = ProductItem;
    protected ajaxUrl = 'json/products.json';

    public constructor(params: BaseCollectionParams = {}) {
        super(params);

        if (this.ajaxUrl) {
            this.ajaxRequest({}, true);
        }
    }

    protected _init(params: BaseItemParams): void {
        this.class = 'products-list';
    }

    public attach(selector: JQuery.Selector, replace: boolean = false): this {
        super.attach(selector, replace);
        this.bindCartEvent();

        return this;
    }

    private bindCartEvent(){
        this.el.on('click', '.add-cart-item', function (e: any) {
            cartManager.addItem(e.target.dataset.id);
        });
    }
}

export class ProductItem extends BaseItem {
    protected addToCartLabel: string = 'В корзину';

    constructor(params: BaseItemParams = {}) {
        super(params);
    }

    protected _init(params: BaseItemParams): void {
        this.tagName = '<article/>';
        this.class = 'products-list-item';
    }

    public getLink(): string {
        return 'product.html?product=' + this.get('slug');
    }

    template() {
        return '<a class="products-list-item__link" href="' + this.getLink() + '">' +
                '<img class="products-list-item__image" src="' + this.get('thumb') + '" alt="' + this.get('title') + '">' +
                '<h2 class="products-list-item__name">' + this.get('title') + '</h2>' +
                '<div class="products-list-item__cost currency">' + this.get('price') + '</div>' +
            '</a>' +
            '<a class="products-list-item__cart add-cart-item" data-id="' + this.get('productId') + '" href="#">' + this.addToCartLabel + '</a>';
    }
}