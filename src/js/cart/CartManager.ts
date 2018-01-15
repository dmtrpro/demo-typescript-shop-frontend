import * as $ from 'jquery';

export type cartItems = {
    [key: string]: {
        amount: number,
        data?: any,
    }
};

class CartManager {
    protected items: cartItems = {};
    protected ajaxUrl = 'json/products.json';
    public sum: number = 0;
    public amount: number = 0;

    protected handlers: {
        [key: string]: Array<(data: cartItems) => void>
    } = {
        add: [],
        remove: [],
        calculate: [],
    };

    public addHandler(type:string, fun:(data: cartItems) => void){
        this.handlers[type].push(fun);
    }

    public get products() {
        return this.items;
    }

    public set products(items) {
        this.addItems(items);
    }

    public addItems(items: cartItems) {
        this.items = {...this.items, ...items};

        this.onAdd();
    }

    public addItem(itemKey: string) {
        if (this.items[itemKey]) {
            this.items[itemKey].amount++;
            this.onAdd();
        } else {
            this.items[itemKey] = {amount: 1};
            this.getItemData(itemKey);
        }
    }

    public removeItem(itemKey: string) {
        if (this.items[itemKey]) {
            delete this.items[itemKey];
        }
        this.onRemove();
    }

    /**
     * Получаем с бэка данные о товаре
     * @param {string} productId
     * @param {boolean} useStub Использовать заглушку?
     */
    protected getItemData(productId: string, useStub: boolean = true) {
        let result;

        let settings = {
            method: "GET",
            context: this,
            url: this.ajaxUrl,
            data: {product: productId}
        };

        result = $.ajax(settings);

        if (useStub) {
            return result.done(function (data) {
                let productData: any = {};

                for (let key in data.items) {
                    if (data.items[key].productId == productId) {
                        productData = data.items[key];
                        break;
                    }
                }

                this.setItemData(productId, productData)
            });
        }

        return result.done(function (data) {
            this.setItemData(productId, data.data)
        });
    }

    public setItemData(itemKey: string, data: any) {
        this.items[itemKey].data = data;

        this.onAdd();
    }

    public calculateSum(): number {
        this.sum = 0;
        for (let key in this.items) {
            if (this.items[key].data) {
                this.sum += <number>this.items[key].data.price * this.items[key].amount;
            } else {
                this.getItemData(key);
                break;
            }
        }
        this.onCalculate();

        return this.sum;
    }

    public calculateAmount(): number {
        this.amount = 0;
        for (let key in this.items) {
            this.amount += this.items[key].amount
        }

        return this.amount;
    }

    public toString() {
        let str = '';
        for (let key in this.items) {
            str += key + ':' + this.items[key].amount + ';';
        }
        return str;
    }

    public serialize(): string {
        return this.toString();
    }

    public unserialize(str: string): cartItems {
        let items = str.split(';');
        let result: cartItems = {};

        items.map(function (item) {
            let i = item.split(':');
            result[i[0]].amount = parseInt(i[1]);
        });

        this.addItems(result);

        return this.items;
    }

    public onAdd() {
        this.calculateSum();

        //console.log(this.items);

        this.handlers.add.forEach((fun) => fun(this.items));
    }

    public onRemove() {
        this.calculateSum();

        //console.log(this.items);

        this.handlers.remove.forEach((fun) => fun(this.items));
    }

    public onCalculate() {
        this.calculateAmount();
        //console.log(this.items);

        this.handlers.calculate.forEach((fun) => fun(this.items));
    }
}

export let cartManager = new CartManager();