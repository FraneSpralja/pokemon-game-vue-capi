import { flushPromises } from "@vue/test-utils";
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { usePokemonGame } from '../../../../src/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '../../../../src/modules/pokemon/interfaces';
import { withSetup } from '../../../utils/with-setup';
import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";
import { pokemonListFake } from "../../../data/fake-pokemons";
const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
    results: pokemonListFake
})

vi.mock('canvas-confetti', () => ({
    default: vi.fn()
}))

describe('usePokemonGame', () => {

    test('should initialize with the correct default values', async() => {
        
        const [ result ] = withSetup( usePokemonGame )
    
        const {
            gameStatus,
            isLoading,
            pokemonsOptions,
            randomPokemon,
        } = result

        // Valores por defecto
        expect(gameStatus.value).toBe(GameStatus.Playing)
        expect(isLoading.value).toBe(true)
        expect(pokemonsOptions.value.length).toBe(0)
        expect(randomPokemon.value).toBe(undefined)
        
        await flushPromises();
        
        expect(isLoading.value).toBe(false)
        expect(pokemonsOptions.value.length).toBe(4)
        expect(randomPokemon.value).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
        })
    })
    
    test('should correctly handle restartGame', async () => {

        const [ result ] = withSetup( usePokemonGame );
        await flushPromises();

        result.gameStatus.value = GameStatus.Won

        //estimulo
        await result.restartGame(5)

        expect(result.gameStatus.value).toBe(GameStatus.Playing)
        expect(result.pokemonsOptions.value.length).toBe(5)

    })

    test('should correctly handle restartGame differents pokemons', async () => {

        const [ result ] = withSetup( usePokemonGame );
        await flushPromises();

        //estimulo
        await result.restartGame(4)
        const firstRound = result.pokemonsOptions.value

        await result.restartGame(4)
        const nextRound = result.pokemonsOptions.value

        firstRound.forEach((pokemon, index) => {
            expect(pokemon.id !== nextRound[index].id).toBe(true)
        });

    })

    test('should correctly handle an incorrect answer', async () => {

        const userAnswer = {
            name: "fakemon",
            url: 1000000,
        }

        const [ result ] = withSetup( usePokemonGame );
        await flushPromises();

        const { checkAnswer, gameStatus } = result;

        expect(gameStatus.value).toBe(GameStatus.Playing)

        checkAnswer(userAnswer)

        expect(gameStatus.value).toBe(GameStatus.Lost)

    })

    test('should correctly handle a correct answer', async () => {

        const [ result ] = withSetup( usePokemonGame );
        await flushPromises();

        const { checkAnswer, gameStatus, randomPokemon } = result;

        expect(gameStatus.value).toBe(GameStatus.Playing)

        checkAnswer(randomPokemon.value)

        expect(gameStatus.value).toBe(GameStatus.Won)
        expect(confetti).toHaveBeenCalled()
        expect(confetti).toHaveBeenCalledWith({
            particleCount: 300,
            spread: 150,
            origin: {
                y: 0.6
            }
        })

    })

})
