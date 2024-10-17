<template>
    <section v-if="isLoading || randomPokemon.id === null"
        class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokemóns</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <div class="game-setup flex justify-start items-center gap-3">
            <p class="trainer-name">
                Entrenador: {{ setup.name }}
            </p>
            <p class="current-dificult">
                Cantidad de Pokemons: {{ setup.level }}
            </p>
            <p class="game-score">
                Score: {{ score }}
            </p>
            <button class="bg-gray-200 inline-block p-2 rounded-md hover:bg-gray-500 hover:text-white"
                @click="emit('resetGame', true)">Reset
                Game</button>
        </div>
        <h1 class="m-5">¿Quién es este Pokemón?</h1>
        <div class="h-20">
            <button v-if="newGameStatus" class="bg-blue-500 text-white p-2 rounded-md transition-all hover:bg-blue-600"
                @click="restartGame(setup.level)">Volver a jugar</button>
        </div>

        <!-- Pokemon Picture -->
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="newGameStatus" />
        <!-- Pokemon Options -->
        <PokemonOptions :options @selected-pokemon="onSelectedPokemon" :is-disable="newGameStatus"
            :correctAnswer="randomPokemon.id" />
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus, type Pokemon, type Setup } from '../interfaces';

interface Props {
    setup: Setup
}

const emit = defineEmits<{ resetGame: [boolean] }>()

const props = defineProps<Props>()

const { gameStatus, isLoading, randomPokemon, pokemonsOptions: options, checkAnswer, restartGame } = usePokemonGame(props.setup.level)

const score = ref<number>(0)

const newGameStatus = computed(() => gameStatus.value !== GameStatus.Playing)

const onSelectedPokemon = (pokemon: Pokemon) => {
    checkAnswer(pokemon)

    if (pokemon.id === randomPokemon.value.id) score.value++
    else score.value--
}

</script>