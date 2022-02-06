import { getPokemonList } from '../src/getPokemon';

describe("getPokemonDone", () => {
    it("should get list", (done) => {
        getPokemonList().then(list => { 
            console.log("Actually running test")
            expect(list.results[0].name).toBe("bulbasaur")
            done();
        });
    });
})

describe("getPokemon", () => {
    it("should get list", async () => {
        const list = await getPokemonList();
        console.log("Actually running test")
        expect(list.results[0].name).toBe("bulbasaur")
    });
})