<template>
    <section class="flex flex-col justify-center items-center w-screen h-screen">
        <div class="intro-form">
            <div class="form__box">
                <label for="name">Entrenador</label>
                <input type="text" name="name" v-model="name">
            </div>
            <div class="form__box">
                <label for="name" class="block">Dificultad</label>
                <div class="form__box--container flex">
                    <label v-for="dif in difficults" :key="dif"> {{ dif }} pokemons
                        <input type="radio" :value="dif" v-model="pokemonLevel">
                    </label>
                </div>
            </div>
            <div class="form__box">
                <button class="bg-blue-500 text-white p-2 rounded-md w-fit mx-auto hover:bg-blue-800"
                    @click="emit('setupGame', { name, level: pokemonLevel })">
                    Iniciar Batalla
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const emit = defineEmits<{
    setupGame: [{ name: string, level: number }]
}>();

const difficults = reactive([3, 4, 5, 7])
const name = ref<string>("Ash")
const pokemonLevel = ref<number>(4)

</script>

<style scoped>
.form__box {
    @apply flex flex-col mb-4;
}

.form__box--container {
    @apply flex gap-4;

    label {
        @apply flex justify-start items-center gap-2;
    }
}
</style>