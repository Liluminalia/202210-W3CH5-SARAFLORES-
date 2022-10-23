import { Component } from '../component.js';

export class Details extends Component {
  template: string;
  constructor(public selector: string) {
    super();
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
