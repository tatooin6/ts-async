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

export const getPokemonList = async (): Promise<PokemonList> => {
  const listResp = await axios.get("https://pokeapi.co/api/v2/pokemon")
    return listResp.data as PokemonList;
}

export const getPokemon = async (url: string): Promise<Pokemon> => {
  const dataResp = await axios.get(url) // data.results[0].url
  return dataResp.data as Pokemon;
}

export const getFirstPokemon = async (): Promise<Pokemon> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Getting the list')
    const list = await getPokemonList();
    resolve( await getPokemon(list.results[0].url))
    } catch (error) {
      reject(error)
    }
  });
