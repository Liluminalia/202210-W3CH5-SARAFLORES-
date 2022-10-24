import { PokemonApi } from '../services/api.js';
import { Component } from './component.js';

export class PokemonList extends Component {
  template!: string;
  pokemons: any;
  pokemonsInfo: Array<any>;
  api: PokemonApi;
  prevPage: any;
  nextPage: any;
  nextPokemonsInfo: any;
  prevPokemonsInfo: any[];
  constructor(public selector: string) {
    super();
    this.api = new PokemonApi();
    this.pokemons = '';
    this.pokemonsInfo = [];
    this.prevPokemonsInfo = [];
    this.firstFetching();
  }

  async firstFetching() {
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
    this.nextFetching();
    this.prevFetching();
    this.manageComponent();
  }
  async nextFetching() {
    this.nextPage = await this.api.getNextPage(this.pokemons.next);

    const nextArrayPokemons: any = [];

    this.nextPage.results.forEach((item: any) => {
      nextArrayPokemons.push(item.url);
    });

    this.nextPokemonsInfo = await Promise.all(
      nextArrayPokemons.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );
  }
  async prevFetching() {
    this.prevPage = await this.api.getPrevPage(this.pokemons.previous);
    const prevArrayPokemons: any = [];

    this.prevPage.results.forEach((item: any) => {
      prevArrayPokemons.push(item.url);
    });

    this.prevPokemonsInfo = await Promise.all(
      prevArrayPokemons.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );
  }

  manageComponent() {
    this.template = this.createTemplate(this.pokemonsInfo);
    this.render(this.selector, this.template);

    document.querySelector('.btn-next')?.addEventListener('click', () => {
      this.template = this.createTemplate(this.nextPokemonsInfo);
      this.render(this.selector, this.template);
      this.pokemons = this.nextPage;

      this.pokemonsInfo = this.nextPokemonsInfo;
      this.nextFetching();
      this.prevFetching();
      this.manageComponent();
    });

    document.querySelector('.btn-previous')?.addEventListener('click', () => {
      this.template = this.createTemplate(this.prevPokemonsInfo);
      this.render(this.selector, this.template);
      this.pokemons = this.prevPage;
      this.pokemonsInfo = this.prevPokemonsInfo;
      this.nextFetching();
      this.prevFetching();
      this.manageComponent();
    });
  }

  createTemplate(array: any) {
    this.template = `
    <div class="main-pokemons">`;

    array.forEach((pokemon: any) => {
      this.template += `
      <div class="pokemons-pokemon"><a href="./details.html" class="pokemon__button">
      <p class="pokemon__name">${pokemon.name}</p>`;
      this.template += `<img src="${pokemon.sprites.other.home.front_default}" alt="Imagen de ${pokemon.species.name}" width="300">
      </a></div>`;
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
