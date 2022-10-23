import { Component } from './component.js';

interface menuOptionI {
  path: string;
  label: string;
}

export class MenuHeader extends Component {
  template!: string;
  menuOptions: Array<menuOptionI>;
  constructor(public selector: string) {
    super();
    this.menuOptions = [
      { path: './index.html', label: 'Inicio' },
      { path: '', label: 'My Pokemons' },
      { path: '', label: 'About' },
    ];
    this.manageComponent();
  }

  createTemplate() {
    let template = '<nav><ul class="header-menu">';
    this.menuOptions.forEach(
      (item: menuOptionI) =>
        (template += `<li class ="menu__items"><a href="${item.path}" class ="menu__text">${item.label}  </a></li>
            `)
    );
    template += '</ul></nav>';
    return template;
  }

  manageComponent() {
    this.template = this.createTemplate();
    this.renderOuter(this.selector, this.template);
  }
}
