// fetch = require('node-fetch');
// import fetch from "node-fetch"
import axios from "axios";

console.log("INSIDE NPX")

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

const getFirstPokemon = async (): Promise<Pokemon> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Getting the list')
    const list = await getPokemonList();
    resolve( await getPokemon(list.results[0].url))
    } catch (error) {
      reject(error)
    }
  });

(async function () {
  try {
    const list = await getPokemonList();
    console.log("THIS is the list");
    console.log(list)
    list.results.slice(0,3).forEach(async (listItem) => {
        const pokemon = await getPokemon(listItem.url)
        console.log(pokemon.name)
    })
  } catch (e) {
    console.error(e);
  }
})();

