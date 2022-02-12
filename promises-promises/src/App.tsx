import React, { useEffect, useState } from 'react';
import PromisePool from "@supercharge/promise-pool";
import { getPokemonList, getPokemon, Pokemon } from "./getPokemon";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  useEffect(() => {
    async function getData() {
      const list = await getPokemonList();
      // console.log(list)
      const { results } = await PromisePool
        .withConcurrency(10)
        .for(list.results)
        .process(async (data) => {
          return await getPokemon(data.url)
        })
        // console.log(results.map(p => p.name));
        setPokemon(results);
    }
    getData();
  }, []);
  return (
  <div className="App">
    <ul>
      {pokemon.map((poke)=>(
        <li key={poke.id}>{poke.name}</li>
      ))}
    </ul>
  </div>);
}

export default App;
