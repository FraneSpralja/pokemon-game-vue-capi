import { Pokemon } from '../../../../src/modules/pokemon/interfaces/pokemon.interface';
describe('Pokemon interface', () => {
    const pokemon:Pokemon = { id: 1, name: 'bulbasaur' }
    
    test('should have an id property of type number', () => {
        expect(pokemon.id).toEqual(expect.any(Number))
    })
    
    test('should have a name property of type string', () => {
        expect(pokemon.name).toEqual(expect.any(String))
    })
})