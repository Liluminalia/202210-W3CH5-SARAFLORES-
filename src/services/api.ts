export class PokemonApi {
  url: string;
  constructor() {
    this.url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
  }

  getPokemon(): Promise<Array<PokemonApi>> {
    return fetch(this.url).then((response) => response.json());
  }
}
