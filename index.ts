// fetch = require('node-fetch');
// import fetch from "node-fetch"
import axios from "axios";

export interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

const getPokemonList = async (): Promise<PokemonList> => {
  const listResp = await axios.get("https://pokeapi.co/api/v2/pokemon")
    return listResp.data as PokemonList;
}

const getPokemon = async (url: string): Promise<Pokemon> => {
  const dataResp = await axios.get(url) // data.results[0].url
  return dataResp.data as Pokemon;
}

(async function () {
  try {
    const list = await getPokemonList();
    const pokemon = await getPokemon(list.results[0].url)
    console.log(pokemon.name)
  } catch (e) {
    console.error(e);
  }
})();

// .then((res: any) => res.data as Pokemon)
//   .then((data: Pokemon) => console.log(data.stats));

// console.log("typescript works")
