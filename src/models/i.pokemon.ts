export interface IPokemon {
  name: string;
  url: string;
}
export interface IPokemons {
  count: number;
  next: string;
  previous: string;
  results: Array<IPokemon>;
}
//pokemon info interface not finished
//
// export interface IPokemonInfo {
//   abilities: Array<T>;
//   base_experience: number;
//   forms: Array;
//   game_indices: Array;
//   height: number;
//   held_items: Array;
//   id: number;
//   is_default: boolean;
//   location_area_encounters: string;
//   moves: Array;
//   name: string;
//   order: number;
//   past_types: Array;
//   species: IPokemon;
//   sprites: ISprites;
//   stats: Array;
//   types: Array;
//   weight: number;
// }
export interface ISprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
