import {BaseCollection, BaseCollectionParams} from '../base/BaseCollection';
import {BaseItem, BaseItemParams} from '../base/BaseItem';

export interface MenuItemParams extends BaseItemParams {
    submenu? : BaseCollectionParams,
    href? : string,
    title? : string
}

export class Menu extends BaseCollection {
    protected tagName: JQuery.Selector = '<ul/>';
    protected childClass = MenuItem;

    protected _init(params: BaseCollectionParams) {
        this.class = 'menu';
    }

    protected createChild(params: MenuItemParams): MenuItem {
        if (params.submenu) {
            return new Submenu(params);
        }

        return new MenuItem(params);
    }
}

export class MenuItem extends BaseItem {
    protected tagName: JQuery.Selector = '<li/>';

    _init(params: MenuItemParams) {
        this.class = 'menu-item';

        if (typeof params.href === 'string') {
            this.set('href', params.href);
        } else {
            this.set('href', '#');
        }

        if (typeof params.title === 'string')
            this.set('title', params.title);
    }

    template() {
        return '<a href="' + this.get('href') + '" class="link">' + this.get('title') + '</a>';
    };
}

export class Submenu extends MenuItem {
    protected tagName: JQuery.Selector = '<li/>';
    child: Menu;

    _init(params: MenuItemParams) {
        super._init(params);
        this.class = 'menu-item dropdown-toggle';

        params.submenu.class = "dropdown-menu";
        this.child = new Menu(params.submenu);
    }

    public render() {
        super.render();

        this.el.append(this.child.render());
        return this.el;
    }
}