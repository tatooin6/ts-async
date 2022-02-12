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

export const getPokemonList = (
  cb: (err: Error | undefined, pokemonList: PokemonList | undefined) => void
): void => {
axios.get("https://pokeapi.co/api/v2/pokemon")
.then((resp)=>{return resp.data as PokemonList})
.then((data:PokemonList)=>cb(undefined, data))
.catch((err) => cb(err, undefined));
}

getPokemonList((_err,data) => {
  console.log(data)
})
