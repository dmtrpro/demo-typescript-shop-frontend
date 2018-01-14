import * as $ from 'jquery';
import {BaseItem, BaseItemParams} from './BaseItem';

export class BaseBuilder extends BaseItem {
    protected childContainer: JQuery.Selector = '';
    protected _container: JQuery;
    public children: BaseItem[] = [];

    /**
     * Конструктор
     * @param {object} params
     */
    constructor(params: BaseItemParams = {}) {
        super(params);
    }

    /**
     * Получаем контейнер для добавления дочерних элементов
     * @returns {JQuery}
     */
    protected get container(): JQuery {
        if (this._container) {
            return this._container;
        }

        if (this.childContainer) {
            let result = this.el.find(this.childContainer);

            if (result.length === 1)
                return this.container = result;
        }
        return this.el;
    }

    /**
     * Устанавливаем контейнер для добавления дочерних элементов
     * @param {JQuery} container
     */
    protected set container(container: JQuery) {
        this._container = $(container);
    }

    /**
     * Рендерим дочерний элемент
     * @param child
     * @protected
     */
    protected _renderChild(child: BaseItem): void {
        this.container.append(child.render());
    }

    /**
     * Рендерим дочерние элементы
     * @protected
     */
    protected _renderChilds(): void {
        for (let i in this.children) {
            let child = this.children[i];

            this._renderChild(child);
        }
    }

    /**
     * Рендерим элемент
     * @returns {JQuery}
     */
    public render() {
        super.render();

        this._renderChilds();
        return this.el;
    }

    /**
     * Добавляем дочерний элемент
     * @param element
     * @returns {BaseBuilder}
     */
    public add(element: BaseItem): this {
        if (element instanceof BaseItem) {
            this.children.push(element);
            this._renderChild(element);
        }
        return this;
    }

    /**
     * Удаляем дочерний элемент по ключу
     * @param {string} elementKey
     * @returns {BaseBuilder}
     */
    public remove(elementKey: string): this {
        for (let i in this.children) {
            if (this.children[i].key == elementKey) {
                this.children[i].detach();
                delete this.children[i];
                break;
            }
        }
        return this;
    }
}