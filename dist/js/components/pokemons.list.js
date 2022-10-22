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
        this.pokemons = '';
        this.pokemonsInfo = '';
        this.fetching();
    }
    fetching() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokemons = yield this.api.getPokemon();
            const pokemonArr = [];
            this.pokemons.results.forEach((item) => {
                pokemonArr.push(item.url);
            });
            this.pokemonsInfo = yield Promise.all(pokemonArr.map((url) => fetch(url).then((result) => result.json())));
        });
    }
    manageComponent() {
        console.log(this.pokemons);
        this.template = this.createTemplate();
        this.renderAdd(this.selector, this.template);
    }
    createTemplate() {
        this.template = ``;
        this.pokemons.results.forEach((pokemon) => {
            this.template += `<p>${pokemon.name}</p>`;
        });
        return this.template;
    }
}
