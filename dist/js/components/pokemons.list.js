var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PokemonApi } from '../services/api.js';
import { Component } from './component.js';
export class PokemonList extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.api = new PokemonApi();
        this.pokemonsInfo = [];
        this.pokemons = '';
        this.prevPokemonsInfo = [];
        this.firstFetching();
    }
    firstFetching() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokemons = yield this.api.getPokemon();
            const pokemonUrlArray = [];
            this.pokemons.results.forEach((item) => {
                pokemonUrlArray.push(item.url);
            });
            this.pokemonsInfo = yield Promise.all(pokemonUrlArray.map((url) => fetch(url).then((result) => result.json())));
            this.nextFetching();
            this.prevFetching();
            this.manageComponent();
        });
    }
    nextFetching() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nextPage = yield this.api.getNextPage(this.pokemons.next);
            const nextArrayPokemons = [];
            this.nextPage.results.forEach((item) => {
                nextArrayPokemons.push(item.url);
            });
            this.nextPokemonsInfo = yield Promise.all(nextArrayPokemons.map((url) => fetch(url).then((result) => result.json())));
        });
    }
    prevFetching() {
        return __awaiter(this, void 0, void 0, function* () {
            this.prevPage = yield this.api.getPrevPage(this.pokemons.previous);
            const prevArrayPokemons = [];
            this.prevPage.results.forEach((item) => {
                prevArrayPokemons.push(item.url);
            });
            this.prevPokemonsInfo = yield Promise.all(prevArrayPokemons.map((url) => fetch(url).then((result) => result.json())));
        });
    }
    manageComponent() {
        var _a, _b;
        this.template = this.createTemplate(this.pokemonsInfo);
        this.render(this.selector, this.template);
        (_a = document.querySelector('.btn-next')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.template = this.createTemplate(this.nextPokemonsInfo);
            this.render(this.selector, this.template);
            this.pokemons = this.nextPage;
            this.pokemonsInfo = this.nextPokemonsInfo;
            this.nextFetching();
            this.prevFetching();
            this.manageComponent();
        });
        (_b = document.querySelector('.btn-previous')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.template = this.createTemplate(this.prevPokemonsInfo);
            this.render(this.selector, this.template);
            this.pokemons = this.prevPage;
            this.pokemonsInfo = this.prevPokemonsInfo;
            this.nextFetching();
            this.prevFetching();
            this.manageComponent();
        });
    }
    createTemplate(array) {
        this.template = `
    <div class="main-pokemons">`;
        array.forEach((pokemon) => {
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
