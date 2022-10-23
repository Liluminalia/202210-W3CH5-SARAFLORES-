import { IPokemon } from '../models/i.pokemon.js';

export class PokemonApi {
  url: string;
  constructor() {
    this.url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
  }

  getPokemon(): Promise<Array<IPokemon>> {
    return fetch(this.url).then((response) => response.json());
  }
  getNextPage(nextUrl: string): Promise<any> {
    return fetch(nextUrl).then((response) => response.json());
  }
  getPrevPage(prevUrl: string): Promise<any> {
    if (!prevUrl) {
      return this.getPokemon();
    }
    return fetch(prevUrl).then((response) => response.json());
  }
}
