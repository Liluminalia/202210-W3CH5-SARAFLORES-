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

    const pokemonArr: any = [];
    this.pokemons.results.forEach((item: any) => {
      pokemonArr.push(item.url);
    });

    this.pokemonsInfo = await Promise.all(
      pokemonArr.map((url: any) => fetch(url).then((result) => result.json()))
    );
  }

  manageComponent() {
    console.log(this.pokemons);
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }

  createTemplate() {
    this.template = ``;

    this.pokemons.results.forEach((pokemon: any) => {
      this.template += `<p>${pokemon.name}</p>`;
    });

    return this.template;
  }
}
