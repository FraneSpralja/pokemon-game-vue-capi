import { mount } from "@vue/test-utils"
import { describe, expect, type Mock, test } from 'vitest';
import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame"
import PokemonGame from "@/modules/pokemon/pages/PokemonGame.vue"
import { GameStatus } from "@/modules/pokemon/interfaces";
import PokemonPicture from "@/modules/pokemon/components/PokemonPicture.vue";
import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue";

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
    usePokemonGame: vi.fn(),
}))


describe('<PokemonGame />', () => {

    const setup = {
        name: 'Ash',
        level: 4,
    }

    const pokemonsOptions = [
        {
            name: "Bulbasaur",
            id: 1,
        },
        {
            name: "Ivysaur",
            id: 2,
        },
        {
            name: "Venusaur",
            id: 3,
        },
        {
            name: "Charmander",
            id: 4,
        },
    ]

    const randomPokemon = {
        name: "Bulbasaur",
        id: 1,
    }

    test('should initialize with default values', () => {

        ( usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Playing,
            isLoading: true,
            randomPokemon: undefined,
            pokemonsOptions: [],
            checkAnswer: vi.fn(),
            restartGame: vi.fn(),
        })

        const wrapper = mount(PokemonGame, {
            props: { setup }
        })

        expect(wrapper.get('h1').text()).toBe('Espere por favor')
        expect(wrapper.get('h1').classes()[0]).toBe('text-3xl')

        expect(wrapper.get('h3').text()).toBe('Cargando pokemóns')
        expect(wrapper.get('h3').classes()[0]).toBe('animate-pulse')
    })

    test('should render <PokemonPicture /> and <PokemonOptions />', () => {
        ( usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Playing,
            isLoading: false,
            randomPokemon,
            pokemonsOptions,
            checkAnswer: vi.fn(),
            restartGame: vi.fn(),
        })

        const wrapper = mount(PokemonGame, {
            props: { setup }
        })

        const pokemonPicture = wrapper.findComponent(PokemonPicture)
        const pokemonOptions = wrapper.findComponent(PokemonOptions)

        expect(wrapper.get('h1').text()).toBe('¿Quién es este Pokemón?')
        expect(pokemonPicture.exists()).toBe(true)
        expect(pokemonOptions.exists()).toBe(true)
    })

    test('should render button for a new game', () => {
        ( usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Won,
            isLoading: false,
            randomPokemon,
            pokemonsOptions,
            checkAnswer: vi.fn(),
            restartGame: vi.fn(),
        })

        const wrapper = mount(PokemonGame, {
            props: { setup }
        })

        const button = wrapper.find('.bg-blue-500.text-white.p-2.rounded-md.transition-all.hover\\:bg-blue-600')

        expect(button.text()).toBe('Volver a jugar')
    })

    test('should correctly call restartGame when click on "Volver a jugar" button', async () => {
        const spyRestartGameFn = vi.fn();
        
        ( usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Won,
            isLoading: false,
            randomPokemon,
            pokemonsOptions,
            checkAnswer: vi.fn(),
            restartGame: spyRestartGameFn,
        })

        const wrapper = mount(PokemonGame, {
            props: { setup }
        })

        const button = wrapper.find('.bg-blue-500.text-white.p-2.rounded-md.transition-all.hover\\:bg-blue-600')
        
        await button.trigger('click')

        expect(spyRestartGameFn).toHaveBeenCalled()
        expect(spyRestartGameFn).toHaveBeenCalledWith(setup.level)
    })
})