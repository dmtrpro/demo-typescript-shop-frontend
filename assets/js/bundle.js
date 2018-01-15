/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
var BaseItem = /** @class */ (function () {
    /**
     * Конструктор
     * @param {object} params
     */
    function BaseItem(params) {
        if (params === void 0) { params = {}; }
        this.data = {};
        this.attrs = {};
        this.class = '';
        this.id = '';
        this.key = '';
        this.tagName = '<div/>';
        this._init(params);
        this._setParams(params);
    }
    /**
     * Инициализация настроек объекта
     * @param {object} params
     * @protected
     */
    BaseItem.prototype._init = function (params) {
    };
    /**
     * Настраиваем объект на основе переданных опций
     * @param {object} params
     * @protected
     */
    BaseItem.prototype._setParams = function (params) {
        this.el = $(this.tagName);
        if (params.attrs)
            this.attrs = __assign({}, this.attrs, params.attrs);
        if (params.data)
            this.data = __assign({}, this.data, params.data);
        if (params.class)
            this.class += ' ' + params.class;
        if (params.id) {
            this.id = params.id;
        }
        if (params.key) {
            this.key = params.key;
        }
        else if (params.id) {
            this.key = params.id;
        }
        else {
            this.key = BaseItem.uniqueId();
        }
    };
    /**
     * Сеттер для параметров
     * @param {string} key
     * @param value
     * @returns {BaseItem}
     */
    BaseItem.prototype.set = function (key, value) {
        this.data['key'] = value;
        return this;
    };
    /**
     * Геттер для параметров
     * @param {string} key
     * @returns {*}
     */
    BaseItem.prototype.get = function (key) {
        if (this.data.hasOwnProperty(key)) {
            return this.data[key];
        }
        return '';
    };
    /**
     * Проверяем существование параметра
     * @param {string} key
     * @returns {boolean}
     */
    BaseItem.prototype.check = function (key) {
        return !!(this.get(key));
    };
    /**
     * Устанавливаем атрибуты элемента
     * @protected
     */
    BaseItem.prototype._renderAttributes = function () {
        this.el.attr(this.attrs);
        this.el.addClass(this.class);
        if (this.id)
            this.el.attr('id', this.id);
    };
    /**
     * Шаблон элемента
     * @returns {string}
     * @protected
     */
    BaseItem.prototype.template = function () {
        return this.get('html');
    };
    /**
     * Рендерим элемент
     * @returns {JQuery}
     */
    BaseItem.prototype.render = function () {
        this._renderAttributes();
        this.el.html(this.template());
        return this.el;
    };
    /**
     * Добавляем элемент в DOM
     * @param {JQuery.Selector} selector
     * @param {boolean} replace
     * @returns {BaseItem}
     */
    BaseItem.prototype.attach = function (selector, replace) {
        if (replace === void 0) { replace = false; }
        if (replace) {
            this.el = $(selector);
        }
        else {
            this.el.appendTo(selector);
        }
        this.bindEvents();
        this.render();
        return this;
    };
    /**
     * Хелпер для биндинга событий к элементу
     */
    BaseItem.prototype.bindEvents = function () { };
    /**
     * Удаляем элемент из DOM
     * @returns {BaseItem}
     */
    BaseItem.prototype.detach = function () {
        this.el.remove();
        return this;
    };
    /**
     * Генератор случайных id
     * @param {string} prefix
     * @returns {string}
     */
    BaseItem.uniqueId = function (prefix) {
        return prefix + '-' + (Date.now() - Math.floor(Math.random() * 10000000000) * 100);
    };
    return BaseItem;
}());
exports.BaseItem = BaseItem;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseItem_1 = __webpack_require__(0);
var BaseBuilder_1 = __webpack_require__(6);
var BaseCollection = /** @class */ (function (_super) {
    __extends(BaseCollection, _super);
    /**
     * Конструктор
     * @param {Object} params
     */
    function BaseCollection(params) {
        if (params === void 0) { params = {}; }
        var _this = _super.call(this, params) || this;
        _this.childClass = BaseItem_1.BaseItem;
        _this.items = [];
        if (params.items) {
            _this.addItems(params);
        }
        if (_this.ajaxUrl) {
            _this.ajaxRequest({}, true);
        }
        return _this;
    }
    /**
     * Создаём дочерний элемент из параметров
     * @param {BaseItemParams} params
     * @returns {BaseItem}
     */
    BaseCollection.prototype.createChild = function (params) {
        return new this.childClass(params);
    };
    /**
     * Рендерим дочерние элементы
     * @protected
     */
    BaseCollection.prototype._renderChilds = function () {
        for (var i in this.items) {
            var options = {};
            options.data = this.items[i];
            var child = this.createChild(options);
            this._renderChild(child);
        }
    };
    BaseCollection.prototype.ajaxRequest = function (settings, addItems) {
        if (settings === void 0) { settings = {}; }
        if (addItems === void 0) { addItems = false; }
        var result;
        settings.context = this;
        if (this.ajaxUrl) {
            result = $.ajax(this.ajaxUrl, settings);
        }
        else {
            result = $.ajax(settings);
        }
        if (addItems) {
            return result.done(this.addItems);
        }
        return result;
    };
    BaseCollection.prototype.addItems = function (data) {
        if (data.hasOwnProperty('items') && data.items.length > 0) {
            this.items.push.apply(this.items, data.items);
        }
        else if (data instanceof Array) {
            this.items.push.apply(this.items, data);
        }
        this.render();
    };
    BaseCollection.prototype.setItems = function (data) {
        if (data.hasOwnProperty('items') && data.items.length > 0) {
            this.items.push.apply(this.items, data.items);
        }
        else if (data instanceof Array) {
            this.items = data;
        }
        this.render();
    };
    BaseCollection.prototype.addItem = function (item) {
        this.items.push(item);
        this.render();
    };
    BaseCollection.prototype.removeItem = function (itemKey) {
        for (var i in this.items) {
            if (this.items[i].key == itemKey) {
                delete this.items[i];
                break;
            }
        }
        this.render();
    };
    return BaseCollection;
}(BaseBuilder_1.BaseBuilder));
exports.BaseCollection = BaseCollection;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
var CartManager = /** @class */ (function () {
    function CartManager() {
        this.items = {};
        this.ajaxUrl = 'json/products.json';
        this.sum = 0;
        this.amount = 0;
        this.handlers = {
            add: [],
            remove: [],
            calculate: [],
        };
    }
    CartManager.prototype.addHandler = function (type, fun) {
        this.handlers[type].push(fun);
    };
    Object.defineProperty(CartManager.prototype, "products", {
        get: function () {
            return this.items;
        },
        set: function (items) {
            this.addItems(items);
        },
        enumerable: true,
        configurable: true
    });
    CartManager.prototype.addItems = function (items) {
        this.items = __assign({}, this.items, items);
        this.onAdd();
    };
    CartManager.prototype.addItem = function (itemKey) {
        if (this.items[itemKey]) {
            this.items[itemKey].amount++;
            this.onAdd();
        }
        else {
            this.items[itemKey] = { amount: 1 };
            this.getItemData(itemKey);
        }
    };
    CartManager.prototype.removeItem = function (itemKey) {
        if (this.items[itemKey]) {
            delete this.items[itemKey];
        }
        this.onRemove();
    };
    /**
     * Получаем с бэка данные о товаре
     * @param {string} productId
     * @param {boolean} useStub Использовать заглушку?
     */
    CartManager.prototype.getItemData = function (productId, useStub) {
        if (useStub === void 0) { useStub = true; }
        var result;
        var settings = {
            method: "GET",
            context: this,
            url: this.ajaxUrl,
            data: { product: productId }
        };
        result = $.ajax(settings);
        if (useStub) {
            return result.done(function (data) {
                var productData = {};
                for (var key in data.items) {
                    if (data.items[key].productId == productId) {
                        productData = data.items[key];
                        break;
                    }
                }
                this.setItemData(productId, productData);
            });
        }
        return result.done(function (data) {
            this.setItemData(productId, data.data);
        });
    };
    CartManager.prototype.setItemData = function (itemKey, data) {
        this.items[itemKey].data = data;
        this.onAdd();
    };
    CartManager.prototype.calculateSum = function () {
        this.sum = 0;
        for (var key in this.items) {
            if (this.items[key].data) {
                this.sum += this.items[key].data.price * this.items[key].amount;
            }
            else {
                this.getItemData(key);
                break;
            }
        }
        this.onCalculate();
        return this.sum;
    };
    CartManager.prototype.calculateAmount = function () {
        this.amount = 0;
        for (var key in this.items) {
            this.amount += this.items[key].amount;
        }
        return this.amount;
    };
    CartManager.prototype.toString = function () {
        var str = '';
        for (var key in this.items) {
            str += key + ':' + this.items[key].amount + ';';
        }
        return str;
    };
    CartManager.prototype.serialize = function () {
        return this.toString();
    };
    CartManager.prototype.unserialize = function (str) {
        var items = str.split(';');
        var result = {};
        items.map(function (item) {
            var i = item.split(':');
            result[i[0]].amount = parseInt(i[1]);
        });
        this.addItems(result);
        return this.items;
    };
    CartManager.prototype.onAdd = function () {
        var _this = this;
        this.calculateSum();
        //console.log(this.items);
        this.handlers.add.forEach(function (fun) { return fun(_this.items); });
    };
    CartManager.prototype.onRemove = function () {
        var _this = this;
        this.calculateSum();
        //console.log(this.items);
        this.handlers.remove.forEach(function (fun) { return fun(_this.items); });
    };
    CartManager.prototype.onCalculate = function () {
        var _this = this;
        this.calculateAmount();
        //console.log(this.items);
        this.handlers.calculate.forEach(function (fun) { return fun(_this.items); });
    };
    return CartManager;
}());
exports.cartManager = new CartManager();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = __webpack_require__(5);
var $ = __webpack_require__(1);
var Cart_1 = __webpack_require__(7);
$(function () {
    var item = new Product_1.ProductCollection();
    var cart = new Cart_1.Cart();
    var cartTotal = new Cart_1.CartSumCounter();
    var cartCounter = new Cart_1.CartAmountCounter();
    item.attach('#products-list', true);
    cart.attach('#main-cart', true);
    cartCounter.hideOnNull = true;
    cartCounter.attach('#cart-counter', true);
    cartTotal.attach('#cart-total', true);
    $('.categories').on('click', '.categories-single', function (e) {
        $(this).toggleClass('active');
    });
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseItem_1 = __webpack_require__(0);
var BaseCollection_1 = __webpack_require__(2);
var CartManager_1 = __webpack_require__(3);
var ProductCollection = /** @class */ (function (_super) {
    __extends(ProductCollection, _super);
    function ProductCollection(params) {
        if (params === void 0) { params = {}; }
        var _this = _super.call(this, params) || this;
        _this.childClass = ProductItem;
        _this.ajaxUrl = 'json/products.json';
        if (_this.ajaxUrl) {
            _this.ajaxRequest({}, true);
        }
        return _this;
    }
    ProductCollection.prototype._init = function (params) {
        this.class = 'products-list';
    };
    ProductCollection.prototype.bindEvents = function () {
        this.el.on('click', '.add-cart-item', function (e) {
            CartManager_1.cartManager.addItem(e.target.dataset.id);
        });
    };
    return ProductCollection;
}(BaseCollection_1.BaseCollection));
exports.ProductCollection = ProductCollection;
var ProductItem = /** @class */ (function (_super) {
    __extends(ProductItem, _super);
    function ProductItem(params) {
        if (params === void 0) { params = {}; }
        var _this = _super.call(this, params) || this;
        _this.addToCartLabel = 'В корзину';
        return _this;
    }
    ProductItem.prototype._init = function (params) {
        this.tagName = '<article/>';
        this.class = 'products-list-item';
    };
    ProductItem.prototype.getLink = function () {
        return 'product.html?product=' + this.get('slug');
    };
    ProductItem.prototype.template = function () {
        return '<a class="products-list-item__link" href="' + this.getLink() + '">' +
            '<img class="products-list-item__image" src="' + this.get('thumb') + '" alt="' + this.get('title') + '">' +
            '<h2 class="products-list-item__name">' + this.get('title') + '</h2>' +
            '<div class="products-list-item__cost currency">' + this.get('price') + '</div>' +
            '</a>' +
            '<a class="products-list-item__cart add-cart-item" data-id="' + this.get('productId') + '" href="#">' + this.addToCartLabel + '</a>';
    };
    return ProductItem;
}(BaseItem_1.BaseItem));
exports.ProductItem = ProductItem;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(1);
var BaseItem_1 = __webpack_require__(0);
var BaseBuilder = /** @class */ (function (_super) {
    __extends(BaseBuilder, _super);
    /**
     * Конструктор
     * @param {object} params
     */
    function BaseBuilder(params) {
        if (params === void 0) { params = {}; }
        var _this = _super.call(this, params) || this;
        _this.childContainer = '';
        _this.children = [];
        return _this;
    }
    Object.defineProperty(BaseBuilder.prototype, "container", {
        /**
         * Получаем контейнер для добавления дочерних элементов
         * @returns {JQuery}
         */
        get: function () {
            if (this._container) {
                return this._container;
            }
            if (this.childContainer) {
                var result = this.el.find(this.childContainer);
                if (result.length === 1)
                    return this.container = result;
            }
            return this.el;
        },
        /**
         * Устанавливаем контейнер для добавления дочерних элементов
         * @param {JQuery} container
         */
        set: function (container) {
            this._container = $(container);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Рендерим дочерний элемент
     * @param child
     * @protected
     */
    BaseBuilder.prototype._renderChild = function (child) {
        this.container.append(child.render());
    };
    /**
     * Рендерим дочерние элементы
     * @protected
     */
    BaseBuilder.prototype._renderChilds = function () {
        for (var i in this.children) {
            var child = this.children[i];
            this._renderChild(child);
        }
    };
    /**
     * Рендерим элемент
     * @returns {JQuery}
     */
    BaseBuilder.prototype.render = function () {
        _super.prototype.render.call(this);
        this._renderChilds();
        return this.el;
    };
    /**
     * Добавляем дочерний элемент
     * @param element
     * @returns {BaseBuilder}
     */
    BaseBuilder.prototype.add = function (element) {
        if (element instanceof BaseItem_1.BaseItem) {
            this.children.push(element);
            this._renderChild(element);
        }
        return this;
    };
    /**
     * Удаляем дочерний элемент по ключу
     * @param {string} elementKey
     * @returns {BaseBuilder}
     */
    BaseBuilder.prototype.remove = function (elementKey) {
        for (var i in this.children) {
            if (this.children[i].key == elementKey) {
                this.children[i].detach();
                delete this.children[i];
                break;
            }
        }
        return this;
    };
    return BaseBuilder;
}(BaseItem_1.BaseItem));
exports.BaseBuilder = BaseBuilder;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseItem_1 = __webpack_require__(0);
var BaseCollection_1 = __webpack_require__(2);
var CartManager_1 = __webpack_require__(3);
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart(params) {
        if (params === void 0) { params = {}; }
        return _super.call(this, params) || this;
    }
    Cart.prototype._init = function (params) {
        this.tagName = '<ul/>';
        this.childClass = CartItem;
        this.class = 'cart__items';
    };
    Cart.prototype._renderChilds = function () {
        for (var i in CartManager_1.cartManager.products) {
            var options = {};
            options.data = CartManager_1.cartManager.products[i].data;
            options.data.amount = CartManager_1.cartManager.products[i].amount;
            var child = this.createChild(options);
            this._renderChild(child);
        }
    };
    Cart.prototype.createChild = function (params) {
        return new CartItem(params);
    };
    Cart.prototype.bindEvents = function () {
        this.el.on('click', '.delete-cart-item', function (e) {
            CartManager_1.cartManager.removeItem(e.currentTarget.dataset.id);
        });
        CartManager_1.cartManager.addHandler('add', this.render.bind(this));
        CartManager_1.cartManager.addHandler('remove', this.render.bind(this));
    };
    return Cart;
}(BaseCollection_1.BaseCollection));
exports.Cart = Cart;
var CartItem = /** @class */ (function (_super) {
    __extends(CartItem, _super);
    function CartItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartItem.prototype._init = function (params) {
        this.tagName = '<li/>';
        this.class = 'cart__item cart-item';
    };
    CartItem.prototype.getLink = function () {
        return 'product.html?product=' + this.get('slug');
    };
    CartItem.prototype.template = function () {
        return '<a href="' + this.getLink() + '"><img class="cart-item__img" src="' + this.get('thumb') + '" alt="' + this.get('title') + '" height="85"></a>\n' +
            '<div class="cart-item__text">' +
            '<a class="cart-item__head" href="' + this.getLink() + '">' + this.get('title') + '</a>' +
            '<img class="cart-item__stars" src="img/stars.png" alt="Rating">\n' +
            '<div class="cart-item__count-price">' +
            '<span class="cart-item__count">' + this.get('amount') + '</span><i> x </i><span class="cart-item__price currency">' + this.get('price') + '</span>' +
            '</div>\n' +
            '</div>' +
            '<a class="cart-item__delete delete-cart-item" data-id="' + this.get('productId') + '" href="#item-delete"><i class="fa fa-times-circle"></i></a>\n';
    };
    return CartItem;
}(BaseItem_1.BaseItem));
exports.CartItem = CartItem;
var CartSumCounter = /** @class */ (function (_super) {
    __extends(CartSumCounter, _super);
    function CartSumCounter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideOnNull = false;
        return _this;
    }
    CartSumCounter.prototype.bindEvents = function () {
        CartManager_1.cartManager.addHandler('calculate', this.render.bind(this));
    };
    CartSumCounter.prototype.template = function () {
        var sum = CartManager_1.cartManager.sum;
        if (sum == 0 && this.hideOnNull) {
            this.el.hide();
            return '';
        }
        this.el.show();
        return sum.toString();
    };
    return CartSumCounter;
}(BaseItem_1.BaseItem));
exports.CartSumCounter = CartSumCounter;
var CartAmountCounter = /** @class */ (function (_super) {
    __extends(CartAmountCounter, _super);
    function CartAmountCounter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartAmountCounter.prototype.template = function () {
        var amount = CartManager_1.cartManager.amount;
        if (amount == 0 && this.hideOnNull) {
            this.el.hide();
            return '';
        }
        this.el.show();
        return amount.toString();
    };
    return CartAmountCounter;
}(CartSumCounter));
exports.CartAmountCounter = CartAmountCounter;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map