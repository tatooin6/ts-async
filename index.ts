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

axios
  .get("https://pokeapi.co/api/v2/pokemon")
  //.then((data) => data.json())
  .then((res) => res.data as PokemonList)
  .then((data: PokemonList) => {
    console.log(data.results[0].url);
    axios
      .get(data.results[0].url)
      .then((res) => res.data as Pokemon)
      .then((data: Pokemon) => console.log(data.stats));
  })
  .catch((err) => {
      console.error(err);
  });

// console.log("typescript works")
