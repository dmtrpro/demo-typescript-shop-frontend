import {keyValue, BaseItem, BaseItemParams} from './BaseItem';
import {BaseBuilder} from './BaseBuilder';


export interface BaseCollectionParams extends BaseItemParams {
    items?: keyValue[],
}

export class BaseCollection extends BaseBuilder {
    protected childClass = BaseItem;
    public items: keyValue[]  = [];
    protected ajaxUrl: string;

    /**
     * Конструктор
     * @param {Object} params
     */
    public constructor(params: BaseCollectionParams = {}) {
        super(params);

        if (params.items) {
            this.addItems(params);
        }

        if (this.ajaxUrl) {
            this.ajaxRequest({}, true);
        }
    }

    /**
     * Создаём дочерний элемент из параметров
     * @param {BaseItemParams} params
     * @returns {BaseItem}
     */
    protected createChild(params: BaseItemParams): BaseItem {
        return new this.childClass(params);
    }

    /**
     * Рендерим дочерние элементы
     * @protected
     */
    protected _renderChilds(): void {
        for (let i in this.items) {
            let options: keyValue = {};
            options.data = this.items[i];

            let child = this.createChild(options);

            this._renderChild(child);
        }
    }

    public ajaxRequest(settings: keyValue = {}, addItems: boolean = false) {
        let result;
        settings.context = this;

        if (this.ajaxUrl) {
            result = $.ajax(this.ajaxUrl, settings);
        } else {
            result = $.ajax(settings);
        }

        if (addItems){
            return result.done(this.addItems);
        }
        return result;
    }

    public addItems(data: any) {
        if (data.hasOwnProperty('items') && data.items.length > 0) {
            this.items.push.apply(this.items, data.items);
        } else if (data instanceof Array) {
            this.items.push.apply(this.items, data);
        }
        this.render();
    }

    public setItems(data: any) {
        if (data.hasOwnProperty('items') && data.items.length > 0) {
            this.items.push.apply(this.items, data.items);
        } else if (data instanceof Array) {
            this.items = data;
        }
        this.render();
    }

    public addItem(item: keyValue) {
        this.items.push(item);
        this.render();
    }

    public removeItem(itemKey: string) {
        for (let i in this.items) {
            if (this.items[i].key == itemKey) {
                delete this.items[i];
                break;
            }
        }
        this.render();
    }
}