export class PokemonApi {
    constructor() {
        this.url = 'https://pokeapi.co/api/v2/pokemon/';
    }
    getPokemon() {
        return fetch(this.url).then((response) => response.json());
    }
    getNextPage(nextUrl) {
        return fetch(nextUrl).then((response) => response.json());
    }
}
