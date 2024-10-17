<template>
    <section>
        <img :src="pokemonImage" :class="!showPokemon ? 'brightness-0' : 'fade-in'" alt="">
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    pokemonId: number,
    showPokemon?: boolean,
}

const props = defineProps<Props>()

const pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`)
</script>

<style scoped>
img {
    @apply h-[200px];
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>