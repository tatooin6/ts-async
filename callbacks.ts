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

// Signatures
function getPokemonList (
  cb: (err: Error | undefined, pokemonList: PokemonList | undefined) => void
): void; 
function getPokemonList (): Promise<PokemonList> | void; 

function getPokemonList (
  cb?: (err: Error | undefined, pokemonList: PokemonList | undefined) => void
): Promise<PokemonList> | void {
  if(cb) {
    axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((resp)=>{return resp.data as PokemonList})
      .then((data:PokemonList)=>cb(undefined, data))
      .catch((err) => cb(err, undefined));
    return undefined;
  } else {
    return axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((resp)=>{return resp.data as PokemonList})
  }
}

getPokemonList((_err,data) => {
  console.log(data?.results.length)
});

(async function(){
  const list = await getPokemonList()
  console.log(list?.results.length);
})()
