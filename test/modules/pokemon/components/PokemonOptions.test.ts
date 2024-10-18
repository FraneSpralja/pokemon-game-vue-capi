import { mount } from "@vue/test-utils"
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'

const options = [
    {
        id: 1,
        name: 'Bulbasaur'
    },
    {
        id: 25,
        name: 'Pikachu'
    },
    {
        id: 2,
        name: 'Ivysaur'
    },
]

describe('<PokemonOptions />', () => {
    const correctAnswer = 25

    test('Should render buttons with correct text', () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                isDisable: false,
                correctAnswer,
            }
        })

        const buttons = wrapper.findAll('button')

        expect(buttons.length).toBe(options.length)

        options.forEach((button, index) => {
            expect(buttons[index].text()).toBe(button.name)
        })
    })

    test('should emit selectedOptions event when a buttons is clicked', async () => {

        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                isDisable: false,
                correctAnswer,
            }
        })

        const buttons = wrapper.findAll('button')

        buttons.forEach(async(button, index) => {
            await button.trigger('click')

            expect(wrapper.emitted('selectedPokemon')).toBeTruthy()
            expect(wrapper.emitted().selectedPokemon[index]).toBeTruthy(options[index].id)

        })
    })

    test('should disable buttons when isDisable is true', () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                isDisable: true,
                correctAnswer,
            }
        })

        const buttons = wrapper.findAll('button')

        buttons.forEach(async(button) => {
            const attrs = Object.keys(button.attributes())
            await button.trigger('click')

            expect(attrs).toContain('disabled')
            expect(wrapper.emitted('selectedPokemon')).toBeFalsy()
        })
    })

    test('should apply correct styling on based on correct/incorrect answer', () => {
        const correctIndex = options.findIndex(opt => opt.id === correctAnswer)
        
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                isDisable: true,
                correctAnswer,
            }
        })

        const buttons = wrapper.findAll('button')

        buttons.forEach(async(button, index) => {
            if(index === correctIndex) 
                expect(button.classes()).toContain('correct')
            else 
                expect(button.classes()).toContain('incorrect')

        })
    })

})