// fetch = require('node-fetch');
// import fetch from "node-fetch"
import axios from "axios";
import PromisePool from "@supercharge/promise-pool/dist";

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
    // console.log(list)
    const { results, errors } = await PromisePool
      .withConcurrency(10)
      .for(list.results)
      .process(async (data, index, pool) => {
        return await getPokemon(data.url)
      })

    console.log(results.map(p => p.name));
    
    /* REDUCE PATTERN */

    /* USING REDUCER */

    /* FOR LOOP IS COMPATIBLE WITH ASYNC AWAIT AS A SIMPLE SOLUTION */

    /* FOREACH IS INCOPATIBLE WITH ASYNC AWAIT */
  } catch (e) {
    console.error(e);
  }
})();

