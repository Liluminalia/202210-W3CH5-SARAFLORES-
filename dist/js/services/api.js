export class PokemonApi {
    constructor() {
        this.url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    }
    getPokemon() {
        return fetch(this.url).then((response) => response.json());
    }
    getNextPage(nextUrl) {
        return fetch(nextUrl).then((response) => response.json());
    }
    getPrevPage(prevUrl) {
        if (!prevUrl) {
            return this.getPokemon();
        }
        return fetch(prevUrl).then((response) => response.json());
    }
}
