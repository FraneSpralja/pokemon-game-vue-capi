<template>
    <section class="mt-5">
        <div>
            <button v-for="{ name, id } in options" :key="id" @click="selectedPokemon({ name, id })"
                :class="[{ correct: isDisable && id === correctAnswer }, { incorrect: isDisable && id !== correctAnswer }]"
                :disabled="isDisable"> {{ name
                }}
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Pokemon } from '../interfaces';

interface Props {
    options: Pokemon[];
    isDisable: boolean;
    correctAnswer: number;
}

defineProps<Props>();

const emit = defineEmits<{
    selectedPokemon: [pokemon: Pokemon],
}>();

const selectedAnswer = ref<number | undefined>(undefined)

const selectedPokemon = (pokemon: Pokemon) => {
    emit('selectedPokemon', pokemon)
    selectedAnswer.value = pokemon.id
}



</script>

<style scoped>
button {
    @apply bg-white block capitalize shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

button[disabled] {
    @apply bg-gray-200;
}

.incorrect[disabled] {
    @apply bg-red-500;
}

.correct[disabled] {
    @apply bg-blue-500;
}
</style>