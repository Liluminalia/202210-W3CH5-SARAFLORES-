import { Component } from './component.js';
export class Details extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.template = this.createTemplate();
        this.renderAdd(this.selector, this.template);
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
