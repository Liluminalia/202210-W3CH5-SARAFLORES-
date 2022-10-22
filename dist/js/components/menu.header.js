import { Component } from './component.js';
export class MenuHeader extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.menuOptions = [
            { path: '', label: 'Inicio' },
            { path: '', label: 'My Pokemons' },
            { path: '', label: 'About' },
        ];
        this.manageComponent();
    }
    createTemplate() {
        let template = '<nav><ul class="header-menu">';
        this.menuOptions.forEach((item) => (template += `<li class ="menu__items"><a href="${item.path}">${item.label} </a></li>
            `));
        template += '</ul></nav>';
        return template;
    }
    manageComponent() {
        this.template = this.createTemplate();
        this.renderOuter(this.selector, this.template);
    }
}
