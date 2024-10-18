import { mount } from "@vue/test-utils"
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'

describe('<PokemonPicture />', () => {

    const id = 25

    test('Should render the hidden image when showPokemon prop is false', () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                pokemonId: id,
                showPokemon: false,
            }
        })

        const hiddeImage = wrapper.find('.brightness-0')
        const showImage = wrapper.find('.fade-in')

        expect(hiddeImage.exists()).toBe(true)
        expect(showImage.exists()).toBe(false)
    })

    test('Should render the image when showPokemon prop is true', () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                pokemonId: id,
                showPokemon: true,
            }
        })

        const hiddeImage = wrapper.find('.brightness-0')
        const showImage = wrapper.find('.fade-in')

        expect(hiddeImage.exists()).toBe(false)
        expect(showImage.exists()).toBe(true)
    })

    test('Image src attribute should contain pokemon id', () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                pokemonId: id,
                showPokemon: true,
            }
        }) 

        const image = wrapper.find('img')

        expect(image.attributes('src')).toContain(`${id}.svg`)
    })

})