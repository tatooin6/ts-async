import PromisePool from "@supercharge/promise-pool/dist";
import { getPokemonList, getPokemon } from "./src/getPokemon";

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

