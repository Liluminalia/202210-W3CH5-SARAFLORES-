import { PokemonApi } from '../services/api.js';
import { Component } from './component.js';

export class PokemonList extends Component {
  template!: string;
  pokemons: any;
  pokemonsInfo: Array<string>;
  api: PokemonApi;
  nextPage: any;
  nextPokemons: any;
  constructor(public selector: string) {
    super();
    this.api = new PokemonApi();
    this.pokemons = '';
    this.pokemonsInfo = [];

    this.fetching();
  }

  async fetching() {
    this.pokemons = await this.api.getPokemon();
    const pokemonUrlArray: Array<string> = [];
    this.pokemons.results.forEach((item: any) => {
      pokemonUrlArray.push(item.url);
    });

    this.pokemonsInfo = await Promise.all(
      pokemonUrlArray.map((url: string) =>
        fetch(url).then((result) => result.json())
      )
    );

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
    this.manageComponent();
  }

  manageComponent() {
    this.template = this.createTemplate(this.pokemonsInfo);
    this.render(this.selector, this.template);
    document.querySelector('.btn-next')?.addEventListener('click', () => {
      this.template = this.createTemplate(this.nextPokemons);
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
        <button class="btn-previous">
        <a href=''><</a>
       </button>

       <button class="btn-next"><a href=''>></a></button></div>
        `;

    return this.template;
  }
}
