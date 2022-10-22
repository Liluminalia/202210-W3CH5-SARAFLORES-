import { PokemonApi } from '../services/api.js';
import { Component } from './component.js';

export class PokemonList extends Component {
  template!: any;
  pokemons: any;
  pokemonsInfo: any;
  api: PokemonApi;
  constructor(public selector: string) {
    super();
    this.api = new PokemonApi();
    this.pokemons = '';
    this.pokemonsInfo = '';

    this.fetching();
  }

  async fetching() {
    this.pokemons = await this.api.getPokemon();

    const pokemonArray: any = [];
    this.pokemons.results.forEach((item: any) => {
      pokemonArray.push(item.url);
    });

    this.pokemonsInfo = await Promise.all(
      pokemonArray.map((url: any) => fetch(url).then((result) => result.json()))
    );
    this.manageComponent();
  }

  manageComponent() {
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }

  createTemplate() {
    this.template = ``;

    this.pokemonsInfo.forEach((pokemon: any) => {
      this.template += `<p>${pokemon.species.name}</p>`;
      this.template += `<img src="${pokemon.sprites.other.home.front_default}" alt="" width="300">`;
    });

    return this.template;
  }
}
