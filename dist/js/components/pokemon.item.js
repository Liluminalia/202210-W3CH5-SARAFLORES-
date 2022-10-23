import { pokemon } from '../services/storage.js';
import { Component } from './component.js';
export class PokemonItem extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.template = this.createTemplate();
        this.renderAdd(this.selector, this.template);
    }
    createTemplate() {
        return `
      <div class="pokemon-container">
      <p class="pokemon__name">${pokemon.name}</p>`;
        this.template += `<img src="${pokemon.sprites.other.home.front_default}" alt="Imagen de ${pokemon.species.name}" width="300">
      </></div>`;
    }
}
