import { computed, onMounted, ref } from "vue";
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces";
import { pokemonApi } from "../api/pokemonApi";
import confetti from 'canvas-confetti';

export const usePokemonGame = (level: number) => {

    const gameStatus = ref<GameStatus>(GameStatus.Playing)
    const pokemons = ref<Pokemon[]>([])
    const pokemonsOptions = ref<Pokemon[]>([])

    const isLoading = computed(() => pokemons.value.length === 0)
    const randomPokemon = computed(() => pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)])

    const getPokemons = async() => {

        const { data } = await pokemonApi.get<PokemonListResponse>('/?limit=151');
        const pokemonsArray: Pokemon[] = data.results.map( pokemon => {
            const urlParts = pokemon.url.split('/')
            const pokeId = urlParts.at(-2) ?? 0
            return {
                id: +pokeId,
                name: pokemon.name,
            }
        } )

        return pokemonsArray.sort(() => Math.random() - 0.5);
    }

    const getNextRound = (howMany: number = 4) => {
        gameStatus.value = GameStatus.Playing

        pokemonsOptions.value = pokemons.value.slice(0, howMany)
        pokemons.value = pokemons.value.slice(howMany)
    }

    const checkAnswer = (pokemon: Pokemon) => {
        const { name, id } = pokemon
        const hasWon = randomPokemon.value.id === id

        if(hasWon) {
            gameStatus.value = GameStatus.Won
            confetti({
                particleCount: 300,
                spread: 150,
                origin: {
                    y: 0.6
                }
            })
            return
        }

        gameStatus.value = GameStatus.Lost

    }

    const restartGame = async (howMany: number = 4) => {
        pokemons.value = Array(0)

        await new Promise((r) => setTimeout(r, 500))
        pokemons.value = await getPokemons();

        getNextRound(howMany)
        
    }

    onMounted(async () => {
        pokemons.value = await getPokemons();
        getNextRound(level);
    })

    return {
        gameStatus,
        isLoading,
        randomPokemon,
        pokemonsOptions,
        checkAnswer,
        restartGame,
    }

}