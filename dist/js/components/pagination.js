"use strict";
// import { PokemonApi } from '../services/api.js';
// import { Component } from './component.js';
// import { PokemonList } from './pokemons.list.js';
// export class Pagination extends Component {
//   template: string;
//   pokemons: any;
//   pokemonsInfo: any;
//   api: PokemonApi;
//   previous: any | null;
//   constructor(public selector: string) {
//     super();
//     this.template = this.createTemplate();
//     this.renderAdd(this.selector, this.template);
//     this.api = new PokemonApi();
//     this.fetching();
//   }
//   async fetching() {
//     this.pokemons = await this.api.getPokemon();
//     const pokemonArray: any = [];
//     this.pokemons.results.forEach((item: any) => {
//       pokemonArray.push(item.url);
//     });
//     this.pokemonsInfo = await Promise.all(
//       pokemonArray.map((url: any) => fetch(url).then((result) => result.json()))
//     );
//     this.manageComponent();
//   }
//   manageComponent() {
//     this.template = this.createTemplate();
//     this.renderAdd(this.selector, this.template);
//   }
//   createTemplate() {
//     this.template = `
//           <div class="main-pagination">`;
//     this.template += `
//          <button class="btn-previous">
//          <a href='${this.pokemons.previous}'><</a>
//         </button>
//         <button class="btn-next">
//          <a href='${this.pokemons.next}'>></a>
//          </button>;
//         `;
//     this.template += `
//         </div>`;
//     return this.template;
//   }
// }
