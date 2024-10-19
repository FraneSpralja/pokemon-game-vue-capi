import PokemonIntro from '@/modules/pokemon/pages/PokemonIntro.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('<PokemonIntro />', () => {

    test('should render with default values', () => {

        const wrapper = mount(PokemonIntro)

        const inputs = wrapper.findAll('input[type="radio"]')
        expect(wrapper.html()).toMatchSnapshot();
        expect(inputs.length).toBe(4)
    })

    test('should correctly emit setupGame', async() => {

        const name = 'Gary'

        const wrapper = mount(PokemonIntro)

        const input = wrapper.find('input[type="text"]')
        await input.setValue(name)

        const radioInput = wrapper.find('input[type="radio"][value="4"]')
        await radioInput.trigger('change')

        const button = wrapper.find('button')
        await button.trigger('click')

        expect(wrapper.emitted('setupGame')?.[0]).toEqual([{
            name: name,
            level: expect.any(Number)
        }])
    })
})