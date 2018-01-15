import * as $ from 'jquery';

export type keyValue = {
    [key: string]: any
};

export interface BaseItemParams {
    attrs?: keyValue,
    data?: keyValue,
    class?: string,
    id?: string,
    key?: string,
}

export class BaseItem {
    protected data: keyValue = {};
    public attrs: keyValue = {};
    public class: string = '';
    public id: string = '';
    public key: string = '';

    protected tagName: JQuery.Selector = '<div/>';
    protected el: JQuery;

    /**
     * Конструктор
     * @param {object} params
     */
    constructor(params: BaseItemParams = {}) {
        this._init(params);

        this._setParams(params);
    }

    /**
     * Инициализация настроек объекта
     * @param {object} params
     * @protected
     */
    protected _init(params: BaseItemParams): void {
    }

    /**
     * Настраиваем объект на основе переданных опций
     * @param {object} params
     * @protected
     */
    protected _setParams(params: BaseItemParams): void {
        this.el = $(this.tagName);

        if (params.attrs)
            this.attrs = {...this.attrs, ...params.attrs};

        if (params.data)
            this.data = {...this.data, ...params.data};

        if (params.class)
            this.class += ' ' + params.class;

        if (params.id) {
            this.id = params.id;
        }

        if (params.key) {
            this.key = params.key;
        } else if (params.id) {
            this.key = params.id;
        } else {
            this.key = BaseItem.uniqueId();
        }
    }

    /**
     * Сеттер для параметров
     * @param {string} key
     * @param value
     * @returns {BaseItem}
     */
    public set(key: string, value: any) {
        this.data['key'] = value;
        return this;
    }

    /**
     * Геттер для параметров
     * @param {string} key
     * @returns {*}
     */
    public get(key: string): any {
        if (this.data.hasOwnProperty(key)) {
            return this.data[key];
        }
        return '';
    }

    /**
     * Проверяем существование параметра
     * @param {string} key
     * @returns {boolean}
     */
    public check(key: string): boolean {
        return !!(this.get(key));
    }

    /**
     * Устанавливаем атрибуты элемента
     * @protected
     */
    protected _renderAttributes(): void {
        this.el.attr(this.attrs);
        this.el.addClass(this.class);

        if (this.id)
            this.el.attr('id', this.id);
    }

    /**
     * Шаблон элемента
     * @returns {string}
     * @protected
     */
    protected template(): string {
        return this.get('html');
    }

    /**
     * Рендерим элемент
     * @returns {JQuery}
     */
    public render() {
        this._renderAttributes();

        this.el.html(this.template());
        return this.el;
    }

    /**
     * Добавляем элемент в DOM
     * @param {JQuery.Selector} selector
     * @param {boolean} replace
     * @returns {BaseItem}
     */
    public attach(selector: JQuery.Selector, replace: boolean = false): this {
        if (replace){
            this.el = $(selector);
        } else {
            this.el.appendTo(selector);
        }

        this.bindEvents();

        this.render();

        return this;
    }

    /**
     * Хелпер для биндинга событий к элементу
     */
    protected bindEvents() {}

    /**
     * Удаляем элемент из DOM
     * @returns {BaseItem}
     */
    public detach(): this {
        this.el.remove();
        return this;
    }

    /**
     * Генератор случайных id
     * @param {string} prefix
     * @returns {string}
     */
    public static uniqueId(prefix?: string): string {
        return prefix + '-' + (Date.now() - Math.floor(Math.random() * 10000000000) * 100);
    }
}