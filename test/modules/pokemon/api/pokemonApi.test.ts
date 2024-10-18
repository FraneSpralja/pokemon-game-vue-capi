import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";


describe('testing pokemon api', () => {
    test('should be configure as expected', () => {
        const baseURL = 'https://pokeapi.co/api/v2/pokemon'

        expect(baseURL).toBe(pokemonApi.defaults.baseURL)

    })
})