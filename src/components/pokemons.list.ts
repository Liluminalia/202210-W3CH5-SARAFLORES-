import { PokemonApi } from '../services/api.js';
import { Component } from './component.js';

export class PokemonList extends Component {
  template!: string;
  pokemons: any;
  pokemonsInfo: Array<any>;
  api: PokemonApi;
  prevPage: any;
  nextPage: any;
  nextPokemons: any;
  prevPokemons: any[];
  constructor(public selector: string) {
    super();
    this.api = new PokemonApi();
    this.pokemons = '';
    this.pokemonsInfo = [];
    this.prevPokemons = [];
    this.fetching();
  }

  async fetching() {
    this.pokemons = await this.api.getPokemon();
    const pokemonUrlArray: Array<any> = [];
    this.pokemons.results.forEach((item: any) => {
      pokemonUrlArray.push(item.url);
    });

    this.pokemonsInfo = await Promise.all(
      pokemonUrlArray.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );
    // --------------------NEXT PAGE----------------------------
    this.nextPage = await this.api.getNextPage(this.pokemons.next);

    const nextArrayPokemons: any = [];

    this.nextPage.results.forEach((item: any) => {
      nextArrayPokemons.push(item.url);
    });

    this.nextPokemons = await Promise.all(
      nextArrayPokemons.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );
    // ------------------PREV PAGE---------------------------------------
    if (this.prevPage === null)
      this.prevPage = await this.api.getPrevPage(this.pokemons.previous);

    const prevArrayPokemons: any = [];

    this.prevPage.results.forEach((item: any) => {
      prevArrayPokemons.push(item.url);
    });

    this.prevPokemons = await Promise.all(
      prevArrayPokemons.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );
    this.manageComponent();
  }

  manageComponent() {
    this.template = this.createTemplate(this.pokemonsInfo);
    this.render(this.selector, this.template);

    document.querySelector('.btn-next')?.addEventListener('click', () => {
      this.template = this.createTemplate(this.nextPokemons);
      this.render(this.selector, this.template);
    });
    document.querySelector('.btn-previous')?.addEventListener('click', () => {
      this.template = this.createTemplate(this.prevPokemons);
      this.render(this.selector, this.template);
    });
  }

  createTemplate(array: any) {
    this.template = `
    <div class="main-pokemons">`;

    array.forEach((pokemon: any) => {
      this.template += `
      <div class="pokemons-pokemon">
      <p class="pokemon__name">${pokemon.name}</p>`;
      this.template += `<img src="${pokemon.sprites.other.home.front_default}" alt="Imagen de ${pokemon.species.name}" width="300">
      </div>`;
    });
    this.template += `
    </div>
    <div>
        <button class="btn-previous"><
       </button>

       <button class="btn-next">></button></div>
        `;

    return this.template;
  }
}
