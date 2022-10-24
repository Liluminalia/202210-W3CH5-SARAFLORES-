import { Component } from '../component.js';
import { MenuHeader } from '../menu.header.js';
export class HeaderDetails extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.template = this.createTemplate();
        this.renderAdd(this.selector, this.template);
        new MenuHeader('header>slot');
    }
    createTemplate() {
        return `
        <header class="header">

            <img src="./img/pokemon-logo.svg" alt="logo de pokemon" width="500">

            <slot></slot>
        </header>
        `;
    }
}
