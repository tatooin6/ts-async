### Run script on the root folder 

npx ts-node index.ts

## Former Async Sections

PROMISE POOLING
```javascript
const list = await getPokemonList();
    const { results, errors } = await PromisePool
      .withConcurrency(10)
      .for(list.results)
      .process(async (data, index, pool) => {
        return await getPokemon(data.url)
      })
    console.log(results.map(p => p.name));
```

REDUCE PATTERN
```javascript
    const data = await Promise.all(list.results.slice(0,5).map( 
        (pokemon) => getPokemon(pokemon.url));
    );
    console.log(data)
```

USING REDUCER
```javascript
    list.results.reduce<Promise<unknown>>(async (pr, pokemon) => {
      await pr;
      return getPokemon(pokemon.url).then((p) => {console.log(p.name)})
    }, Promise.resolve(undefined))
```

FOR LOOP IS COMPATIBLE WITH ASYNC AWAIT AS A SIMPLE SOLUTION
```javascript
    for (const listItem of list.results) {
        const pokemon = await getPokemon(listItem.url)
        console.log(pokemon.name)
    }
```

FOREACH IS INCOPATIBLE WITH ASYNC AWAIT
```javascript
    list.results.slice(0,3).forEach(async (listItem) => {
        const pokemon = await getPokemon(listItem.url)
        console.log(pokemon.name)
    })
```

### Jest configuration

Jest Dependencies
```cmd
yarn add ts-jest jest -D
yarn add @types/jest -D
```

Configuring the environment
```cmd
npx ts-jest config:init
```

Run
```cmd
yarn test
```

### CallBacks run

Run
```cmd
npx ts-node callbacks.ts
```
