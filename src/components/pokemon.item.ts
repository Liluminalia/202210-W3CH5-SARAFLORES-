import { pokemon } from '../services/storage.js';
import { Component } from './component.js';
import { PokemonList } from './pokemons.list.js';

export class PokemonItem extends Component {
  template: string;
  constructor(public selector: string) {
    super();
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
